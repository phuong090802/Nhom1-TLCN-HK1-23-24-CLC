package com.ute.studentconsulting.repository;

import com.ute.studentconsulting.entity.Department;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, String> {
    Boolean existsByName(String name);
    Page<Department> findByNameContainingOrDescriptionContaining(String value1, String value2, Pageable pageable);
    Boolean existsByNameAndIdIsNot(String name, String id);
}
