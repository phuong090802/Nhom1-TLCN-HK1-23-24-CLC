package com.ute.studentconsulting.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ute.studentconsulting.entity.RoleName;
import com.ute.studentconsulting.entity.User;
import com.ute.studentconsulting.model.TokenModel;
import com.ute.studentconsulting.model.ValidationErrorModel;
import com.ute.studentconsulting.payloads.request.LoginRequest;
import com.ute.studentconsulting.payloads.request.RegisterRequest;
import com.ute.studentconsulting.model.AuthModel;
import com.ute.studentconsulting.payloads.response.ApiResponse;
import com.ute.studentconsulting.security.service.impl.UserDetailsImpl;
import com.ute.studentconsulting.security.token.TokenUtils;
import com.ute.studentconsulting.service.RefreshTokenService;
import com.ute.studentconsulting.service.RoleService;
import com.ute.studentconsulting.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.regex.Pattern;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final String PHONE_NUMBER_REGEX = "^(0\\d{9})|(\\+84\\d{8})$";

    private final RoleService roleService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenUtils tokenUtils;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return handleRegister(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return handleLogin(request);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        return handleRefreshToken(request);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        return handleLogout(request);
    }

    private ResponseEntity<?> handleLogout(HttpServletRequest request) {
        var tokenValue = tokenUtils.getRefreshTokenByValue(request);
        if (StringUtils.hasText(tokenValue)) {
            var tokenAuth = refreshTokenService.findById(tokenValue);
            refreshTokenService.deleteById(tokenAuth.getParent().getToken());
        }
        var response = tokenUtils.clearCookie();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, response.toString())
                .body(new ApiResponse<>(true, "Đăng xuất thành công."));
    }

    private ResponseEntity<?> handleRefreshToken(HttpServletRequest request) {
        var tokenValue = tokenUtils.getRefreshTokenByValue(request);
        if (!StringUtils.hasText(tokenValue)) {
            return unauthorizedResponse();
        }

        var tokenAuth = refreshTokenService.findById(tokenValue);

        if (tokenAuth != null) {
            var parent = tokenAuth.getParent() != null ? tokenAuth.getParent() : tokenAuth;


            if (tokenAuth.getStatus() && tokenAuth.getExpires().compareTo(new Date()) > 0) {
                if (tokenAuth.getParent() == null) {
                    tokenAuth.setStatus(false);
                    refreshTokenService.save(tokenAuth);
                }

                refreshTokenService.deleteByParent(parent);
                refreshTokenService.save(parent);
                var nextToken = tokenUtils.generateRefreshToken(parent.getToken());
                nextToken.setUser(tokenAuth.getUser());
                nextToken.setParent(parent);
                var savedToken = refreshTokenService.save(nextToken);
                var accessToken = tokenUtils.generateToken(nextToken.getUser().getPhone());
                var cookie = tokenUtils.setCookie(savedToken.getToken());
                var response = new AuthModel(accessToken,
                        nextToken.getUser().getName(),
                        nextToken.getUser().getRole().getName().name(),
                        null);
                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body(new ApiResponse<>(true, response));
            }

            if (!tokenAuth.getStatus() || tokenAuth.getExpires().compareTo(new Date()) <= 0) {
                refreshTokenService.deleteById(parent.getToken());
                return unauthorizedResponse();
            }
        }

        try {
            var bytes = Base64.getUrlDecoder().decode(tokenValue);
            var jsonValue = new String(bytes, StandardCharsets.UTF_8);
            var tokenObj = objectMapper.readValue(jsonValue, TokenModel.class);
            refreshTokenService.deleteById(tokenObj.getP());
        } catch (JsonProcessingException e) {
            log.error("Invalid JSON data in token: {}", e.getMessage());
        }
        return unauthorizedResponse();
    }

    private ResponseEntity<ApiResponse<?>> unauthorizedResponse() {
        var cookie = tokenUtils.clearCookie();
        var headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        return new ResponseEntity<>(new ApiResponse<>(false, "Không đủ quyền truy cập."), headers, HttpStatus.UNAUTHORIZED);
    }

    private ResponseEntity<?> handleLogin(LoginRequest request) {
        var authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var userDetails = (UserDetailsImpl) authentication.getPrincipal();
        var authority = userDetails.getAuthorities().stream().findFirst();

        if (authority.isEmpty()) {
            return new ResponseEntity<>(
                    new ApiResponse<>(false, "Đăng nhập thất bại."),
                    HttpStatus.UNAUTHORIZED);
        }

        var token = tokenUtils.generateToken(userDetails.getUsername());
        var refreshToken = tokenUtils.generateRefreshToken();
        var user = userService.findById(userDetails.getId());
        refreshToken.setUser(user);
        var savedToken = refreshTokenService.save(refreshToken);
        var cookie = tokenUtils.setCookie(savedToken.getToken());
        var response = new AuthModel(token,
                user.getName(),
                authority.get().getAuthority(),
                null);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new ApiResponse<>(true, response));
    }

    private ResponseEntity<?> handleRegister(RegisterRequest request) {
        var error = validationRegister(request);
        if (error != null) {
            return new ResponseEntity<>(new ApiResponse<>(false, error.getMessage()), error.getStatus());
        }
        var role = roleService.findByName(RoleName.ROLE_USER);
        var user = new User(
                request.getName(),
                request.getEmail().toLowerCase(),
                request.getPhone(),
                passwordEncoder.encode(request.getPassword()),
                true,
                request.getOccupation(),
                false,
                role);
        userService.save(user);
        return new ResponseEntity<>(
                new ApiResponse<>(true, "Tạo tài khoản thành công."),
                HttpStatus.CREATED);
    }

    private ValidationErrorModel validationRegister(RegisterRequest request) {
        var fullName = request.getName().trim();
        var email = request.getEmail().trim();
        var phone = request.getPhone().trim();
        var password = request.getPassword().trim();
        var occupation = request.getOccupation();
        var patternEmail = Pattern.compile(EMAIL_REGEX);
        var matcherEmail = patternEmail.matcher(email);
        var patternPhone = Pattern.compile(PHONE_NUMBER_REGEX);
        var matcherPhone = patternPhone.matcher(phone);

        if (fullName.isEmpty()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Tên người dùng không thể để trống.");
        }

        if (email.isEmpty()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Email không thể để trống.");
        }

        if (phone.isEmpty()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Số điện thoại không thể để trống.");
        }

        if (password.isEmpty()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Mật khẩu không thể để trống.");
        }

        if (occupation.isEmpty()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Nghề nghiệp không thể để trống.");
        }

        if (!matcherEmail.matches()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Email không đúng định dạng.");
        }

        if (!matcherPhone.matches()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Số điện thoại không đúng định dạng.");
        }

        if (userService.existsByEmail(request.getEmail())) {
            return new ValidationErrorModel(HttpStatus.CONFLICT, "Email đã tồn tại.");
        }

        if (userService.existsByPhone(request.getPhone())) {
            return new ValidationErrorModel(HttpStatus.CONFLICT, "Số điện thoại đã tồn tại.");
        }
        return null;
    }
}
