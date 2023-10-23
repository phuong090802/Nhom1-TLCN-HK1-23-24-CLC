package com.ute.studentconsulting.repository;

import com.ute.studentconsulting.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByPhone(String phone);

    Boolean existsByPhone(String phone);

    Boolean existsByEmail(String email);

}
