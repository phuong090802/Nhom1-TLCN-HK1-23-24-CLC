package com.ute.studentconsulting.controller;

import com.ute.studentconsulting.entity.Department;
import com.ute.studentconsulting.model.DepartmentModel;
import com.ute.studentconsulting.model.ValidationErrorModel;
import com.ute.studentconsulting.payloads.request.CreateDepartmentRequest;
import com.ute.studentconsulting.payloads.request.UpdateDepartmentRequest;
import com.ute.studentconsulting.model.PaginationModel;
import com.ute.studentconsulting.payloads.response.ApiResponse;
import com.ute.studentconsulting.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final DepartmentService departmentService;

    @PostMapping("/departments")
    public ResponseEntity<?> createDepartment(@RequestBody CreateDepartmentRequest request) {
        return handleCreateDepartment(request);
    }


    @GetMapping("/departments")
    public ResponseEntity<?> getAllDepartmentPagination(
            @RequestParam(required = false, name = "value") String value,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "3") int size,
            @RequestParam(defaultValue = "name, asc", name = "sort") String[] sort) {
        return handleGetAllDepartmentPagination(value, page, size, sort);
    }

    @PutMapping("/departments/{id}")
    public ResponseEntity<?> updateDepartment(@PathVariable("id") String id, @RequestBody UpdateDepartmentRequest request) {
        return handleUpdateDepartment(id, request);
    }

    @PatchMapping("/departments/{id}")
    public ResponseEntity<?> updateStatusDepartment(@PathVariable("id") String id) {
        return handleUpdateStatusDepartment(id);
    }

    private ResponseEntity<?> handleUpdateStatusDepartment(String id) {
        var department = departmentService.findById(id);
        var status = !department.getStatus();
        department.setStatus(status);
        departmentService.save(department);
        var message = status ? "Mở khóa phòng ban thành công." : "Khóa phòng ban thành công.";
        return new ResponseEntity<>(
                new ApiResponse<>(true, message),
                HttpStatus.OK);
    }

    private ResponseEntity<?> handleUpdateDepartment(String id, UpdateDepartmentRequest request) {
        var error = validationUpdateDepartment(id, request);
        if (error != null) {
            return new ResponseEntity<>(new ApiResponse<>(false, error.getMessage()), error.getStatus());
        }

        var department = departmentService.findById(id);
        department.setName(request.getName());
        department.setDescription(request.getDescription());
        department.setBlobId(request.getBlobId());
        department.setLogo(request.getUrl());

        departmentService.save(department);
        return new ResponseEntity<>(
                new ApiResponse<>(true, "Cập nhật phòng ban thành công."),
                HttpStatus.OK);
    }

    private Sort.Direction sortDirection(String direction) {
        if (direction.equals("asc")) {
            return Sort.Direction.ASC;
        } else if (direction.equals("desc")) {
            return Sort.Direction.DESC;
        }
        return Sort.Direction.ASC;
    }

    private List<Sort.Order> sortOrders(String[] sort) {
        var orders = new ArrayList<Sort.Order>();
        if (sort[0].contains(",")) {
            for (var tempSort : sort) {
                var current = tempSort.split(",");
                var direction = sortDirection(current[1]);
                var order = new Sort.Order(direction, current[0]);
                orders.add(order);
            }
        } else {
            var direction = sortDirection(sort[1]);
            var order = new Sort.Order(direction, sort[0]);
            orders.add(order);
        }
        return orders;
    }


    private ResponseEntity<?> handleGetAllDepartmentPagination(String value, int page, int size, String[] sort) {
        var orders = sortOrders(sort);
        var pageable = PageRequest.of(page, size, Sort.by(orders));
        var departmentPage = (value == null)
                ? departmentService.findAll(pageable)
                : departmentService.findByNameContainingOrDescriptionContaining(value, value, pageable);
        var departments = departmentPage.getContent().stream().map(department ->
                DepartmentModel.builder()
                        .id(department.getId())
                        .name(department.getName())
                        .description(department.getDescription())
                        .status(department.getStatus())
                        .build()
        ).toList();
        var response =
                new PaginationModel<>(
                        departments,
                        departmentPage.getNumber(),
                        departmentPage.getTotalPages()
                );
        return ResponseEntity.ok(new ApiResponse<>(true, response));
    }


    private ResponseEntity<?> handleCreateDepartment(CreateDepartmentRequest request) {
        var error = validationCreateDepartment(request);
        if (error != null) {
            return new ResponseEntity<>(new ApiResponse<>(false, error.getMessage()), error.getStatus());
        }
        var department = new Department(
                request.getName(),
                request.getDescription()
        );
        departmentService.save(department);
        return new ResponseEntity<>(
                new ApiResponse<>(true, "Thêm phòng ban thành công."),
                HttpStatus.CREATED);
    }

    private ValidationErrorModel validationCreateDepartment(CreateDepartmentRequest request) {
        var name = request.getName().trim();
        if (name.isEmpty()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Tên phòng ban không thể để trống.");
        }
        if (departmentService.existsByName(name)) {
            return new ValidationErrorModel(HttpStatus.CONFLICT, "Phòng ban đã tồn tại.");
        }
        return null;
    }

    public ValidationErrorModel validationUpdateDepartment(String id, UpdateDepartmentRequest request) {
        String name = request.getName().trim();
        if (name.isEmpty()) {
            return new ValidationErrorModel(HttpStatus.BAD_REQUEST, "Tên phòng ban không để thể trống.");
        } else if (departmentService.existsByNameAndIdIsNot(name, id)) {
            return new ValidationErrorModel(HttpStatus.CONFLICT, "Phòng ban đã tồn tại.");
        }
        return null;
    }
}
