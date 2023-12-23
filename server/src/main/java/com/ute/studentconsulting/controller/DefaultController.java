package com.ute.studentconsulting.controller;

import com.ute.studentconsulting.payload.response.ErrorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
@Slf4j
public class DefaultController {
    @RequestMapping("/**")
    public ResponseEntity<?> handleDefaultMapping() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorResponse("Không tìm thấy tài nguyên", "Đường dẫn không hợp lệ", 10086));
    }
}
