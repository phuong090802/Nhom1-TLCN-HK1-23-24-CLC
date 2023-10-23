package com.ute.studentconsulting.controller;

import com.ute.studentconsulting.model.DepartmentModel;
import com.ute.studentconsulting.payloads.response.ApiResponse;
import com.ute.studentconsulting.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getDepartment(@PathVariable("id") String id) {
        return handleGetDepartment(id);
    }

    private ResponseEntity<?> handleGetDepartment(String id) {
        var department = departmentService.findById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, new DepartmentModel(
                department.getId(),
                department.getName(),
                department.getDescription(),
                department.getLogo(),
                department.getStatus()
        )));
    }
}
