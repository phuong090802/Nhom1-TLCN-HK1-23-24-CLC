package com.ute.studentconsulting.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class AuthModel {
    @NonNull
    private String id;
    @NonNull
    private String token;
    @NonNull
    private String name;
    @NonNull
    private String email;
    @NonNull
    private String phone;
    @NonNull
    private String role;
    private String occupation;
    private String avatar;
    private String departmentName;
}
