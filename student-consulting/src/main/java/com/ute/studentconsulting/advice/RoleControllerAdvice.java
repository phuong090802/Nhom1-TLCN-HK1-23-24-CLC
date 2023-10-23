package com.ute.studentconsulting.advice;

import com.ute.studentconsulting.exception.RoleException;
import com.ute.studentconsulting.payloads.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class RoleControllerAdvice {
    @ExceptionHandler(value = RoleException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleRoleException(RoleException exception) {
        return new ApiResponse<>(false, exception.getMessage());
    }
}
