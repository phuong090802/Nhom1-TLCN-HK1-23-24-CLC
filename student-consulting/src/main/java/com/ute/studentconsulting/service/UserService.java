package com.ute.studentconsulting.service;

import com.ute.studentconsulting.entity.User;

public interface UserService {
    void save(User user);
    User findByPhone(String phone);
    boolean existsByPhone(String phone);
    boolean existsByEmail(String email);
    User findById(String id);
}
