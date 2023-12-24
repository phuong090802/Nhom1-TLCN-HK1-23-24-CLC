package com.ute.studentconsulting.controller;

import com.ute.studentconsulting.entity.Field;
import com.ute.studentconsulting.entity.Role;
import com.ute.studentconsulting.entity.RoleName;
import com.ute.studentconsulting.entity.User;
import com.ute.studentconsulting.model.PaginationModel;
import com.ute.studentconsulting.payload.response.ApiSuccessResponse;
import com.ute.studentconsulting.service.*;
import com.ute.studentconsulting.util.AuthUtils;
import com.ute.studentconsulting.util.FieldUtils;
import com.ute.studentconsulting.util.SortUtils;
import com.ute.studentconsulting.util.UserUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@Slf4j
public class DepartmentController {
    private final DepartmentService departmentService;
    private final SortUtils sortUtils;
    private final AuthUtils authUtils;
    private final FieldUtils fieldUtils;
    private final QuestionService questionService;
    private final FieldService fieldService;
    private final UserService userService;
    private final RoleService roleService;
    private final UserUtils userUtils;

    @GetMapping("/staffs")
    public ResponseEntity<?> getAllStaff(
            @RequestParam(required = false, name = "value") String value,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "3") int size,
            @RequestParam(defaultValue = "name, asc", name = "sort") String[] sort,
            @RequestParam(name = "departmentId", defaultValue = "all") String departmentId
    ) {
        return handleGetAllStaff(value, page, size, sort, departmentId);
    }

    private ResponseEntity<?> handleGetAllStaff(String value, int page, int size, String[] sort, String departmentId) {
        var orders = sortUtils.sortOrders(sort);
        var pageable = PageRequest.of(page, size, Sort.by(orders));
        var roles = List.of(roleService.findByName(RoleName.ROLE_COUNSELLOR),
                roleService.findByName(RoleName.ROLE_DEPARTMENT_HEAD));
        var staffPage = (value == null)
                ? getStaffByDepartmentIs(roles, departmentId, pageable)
                : getStaffByDepartmentIsAllAndSearch(roles, value, departmentId, pageable);
        var staffs = userUtils.mapUserPageToStaffModels(staffPage);
        var response = new PaginationModel<>(staffs,
                staffPage.getNumber(), staffPage.getTotalPages());
        return ResponseEntity.ok(new ApiSuccessResponse<>(response));
    }

    private Page<User> getStaffByDepartmentIsAllAndSearch
            (List<Role> roles, String value, String departmentId, Pageable pageable) {
        return departmentId.equals("all")
                // value = value, department = all
                ? userService.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContainingAndRoleInAndEnabledIs
                (value, roles, true, pageable)
                // value = value, department = value,
                : userService.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneContainingAndRoleInAndEnabledIsAndDepartmentIs
                (value, roles, true, departmentService.findById(departmentId), pageable);
    }

    private Page<User> getStaffByDepartmentIs
            (List<Role> roles, String departmentId, Pageable pageable) {
        return departmentId.equals("all")
                // value = null, department = all,
                ? userService.findAllByRoleNotInAndEnabledIs(roles, true, pageable)
                // value = null, department = value, field = all
                : userService.findAllByRoleNotInAndEnabledIsAndDepartmentIs
                (roles, true, departmentService.findByIdAndStatusIs(departmentId, true), pageable);
    }


    @GetMapping("/questions/{id}")
    public ResponseEntity<?> getFieldByQuestion(@PathVariable("id") String id) {
        return handleGetFieldByQuestion(id);
    }

    @PreAuthorize("hasRole('COUNSELLOR') or hasRole('DEPARTMENT_HEAD')")
    private ResponseEntity<?> handleGetFieldByQuestion(String id) {
        var user = authUtils.getCurrentUser();
        var question = questionService.findById(id);
        var field = fieldService.findById(question.getField().getId());
        var departments = departmentService.findAllByStatusIsAndIdIsNotAndFieldIs
                (true, user.getDepartment().getId(), field);
        return ResponseEntity.ok(new ApiSuccessResponse<>(departments));
    }

    @PreAuthorize("hasRole('COUNSELLOR') or hasRole('DEPARTMENT_HEAD')")
    @GetMapping("/fields/my")
    public ResponseEntity<?> getFieldsInDepartment(
            @RequestParam(required = false, name = "value") String value,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "3") int size,
            @RequestParam(defaultValue = "name, asc", name = "sort") String[] sort) {
        return handleGetFieldsInDepartment(value, page, size, sort);
    }

    private ResponseEntity<?> handleGetFieldsInDepartment(String value, int page, int size, String[] sort) {
        var user = authUtils.getCurrentUser();
        var ids = user.getDepartment().getFields().stream().map(Field::getId).toList();
        return fieldUtils.getFieldsByIds(ids, value, page, size, sort);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllDepartment() {
        return handleGetAllDepartment();
    }

    private ResponseEntity<?> handleGetAllDepartment() {
        var departments = departmentService.findAllByStatusIs(true);
        return ResponseEntity.ok(new ApiSuccessResponse<>(departments));
    }

    @PreAuthorize("hasRole('COUNSELLOR') or hasRole('DEPARTMENT_HEAD')")
    @GetMapping("/my")
    public ResponseEntity<?> getMyDepartment() {
        return handleGetMyDepartment();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDepartment(@PathVariable("id") String id) {
        return handleGetDepartment(id);
    }

    @GetMapping
    public ResponseEntity<?> getDepartments(
            @RequestParam(required = false, name = "value") String value,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "3") int size,
            @RequestParam(defaultValue = "name, asc", name = "sort") String[] sort,
            @RequestParam(name = "status", defaultValue = "all") String status) {
        return handleGetDepartments(value, page, size, sort, status);
    }

    private ResponseEntity<?> handleGetDepartments(String value, int page, int size, String[] sort, String status) {
        var orders = sortUtils.sortOrders(sort);
        var pageable = PageRequest.of(page, size, Sort.by(orders));
        var departmentPage = switch (status) {
            case "active" -> (value == null)
                    ? departmentService.findAllByStatusIs(true, pageable)
                    : departmentService.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseAndStatusIs(value, true, pageable);
            case "inactive" -> (value == null)
                    ? departmentService.findAllByStatusIs(false, pageable)
                    : departmentService.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseAndStatusIs(value, false, pageable);
            default -> (value == null)
                    ? departmentService.findAll(pageable)
                    : departmentService.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(value, pageable);
        };

        var response = new PaginationModel<>(
                departmentPage.getContent(), departmentPage.getNumber(),
                departmentPage.getTotalPages());
        return ResponseEntity.ok(new ApiSuccessResponse<>(response));
    }


    private ResponseEntity<?> handleGetDepartment(String id) {
        var department = departmentService.findById(id);
        return ResponseEntity.ok(new ApiSuccessResponse<>(department));
    }

    private ResponseEntity<?> handleGetMyDepartment() {
        var user = authUtils.getCurrentUser();
        var department = departmentService.findById(user.getDepartment().getId());
        return ResponseEntity.ok(new ApiSuccessResponse<>(department));
    }
}
