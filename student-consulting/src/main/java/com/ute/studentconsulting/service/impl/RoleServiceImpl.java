package com.ute.studentconsulting.service.impl;

import com.ute.studentconsulting.entity.Role;
import com.ute.studentconsulting.entity.RoleName;
import com.ute.studentconsulting.exception.RoleException;
import com.ute.studentconsulting.repository.RoleRepository;
import com.ute.studentconsulting.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role findByName(RoleName name) {
        return roleRepository.findByName(name)
                .orElseThrow(() -> new RoleException("Quyền truy không hợp lệ."));
    }
}
