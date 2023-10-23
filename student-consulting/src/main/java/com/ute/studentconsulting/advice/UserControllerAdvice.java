package com.ute.studentconsulting.advice;

import com.ute.studentconsulting.exception.UserException;
import com.ute.studentconsulting.payloads.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestControllerAdvice
public class UserControllerAdvice {
    @ExceptionHandler(value = UserException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse<?> handleUserException(UserException exception) {
        return new ApiResponse<>(false, exception.getMessage());
    }
}
