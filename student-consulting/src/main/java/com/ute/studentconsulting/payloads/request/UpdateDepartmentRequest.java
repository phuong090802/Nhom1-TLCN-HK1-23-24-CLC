package com.ute.studentconsulting.payloads.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDepartmentRequest {
    private String name;
    private String description;
    private String blobId;
    private String url;
}
