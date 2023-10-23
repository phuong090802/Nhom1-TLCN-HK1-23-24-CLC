package com.ute.studentconsulting.service.impl;

import com.ute.studentconsulting.entity.Department;
import com.ute.studentconsulting.exception.DepartmentException;
import com.ute.studentconsulting.repository.DepartmentRepository;
import com.ute.studentconsulting.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {
    private final DepartmentRepository departmentRepository;

    @Override
    public Boolean existsByName(String name) {
        return departmentRepository.existsByName(name);
    }

    @Override
    public void save(Department department) {
        departmentRepository.save(department);
    }

    @Override
    public Page<Department> findAll(Pageable pageable) {
        return departmentRepository.findAll(pageable);
    }

    @Override
    public Page<Department> findByNameContainingOrDescriptionContaining(String value1, String value2, Pageable pageable) {
        return departmentRepository.findByNameContainingOrDescriptionContaining(value1, value2, pageable);
    }

    @Override
    public Department findById(String id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new DepartmentException("Không tìm thấy phòng ban."));
    }

    @Override
    public Boolean existsByNameAndIdIsNot(String name, String id) {
        return departmentRepository.existsByNameAndIdIsNot(name, id);
    }
}
