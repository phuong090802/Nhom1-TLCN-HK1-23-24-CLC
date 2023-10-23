package com.ute.studentconsulting.payloads.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String email;
    private String phone;
    private String password;
    private String occupation;
}
