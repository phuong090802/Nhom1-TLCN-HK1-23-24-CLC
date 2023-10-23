package com.ute.studentconsulting.model;


import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentModel {
    private String id;
    private String name;
    private String description;
    private String logo;
    private Boolean status;
}
