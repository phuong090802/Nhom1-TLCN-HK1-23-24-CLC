package com.ute.studentconsulting.service;

import com.ute.studentconsulting.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DepartmentService {
    Boolean existsByName(String name);
    void save(Department department);
    Page<Department> findAll(Pageable pageable);
    Page<Department> findByNameContainingOrDescriptionContaining(String value1, String value2, Pageable pageable);
    Department findById(String id);
    Boolean existsByNameAndIdIsNot(String name, String id);
}
