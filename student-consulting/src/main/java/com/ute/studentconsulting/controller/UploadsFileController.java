package com.ute.studentconsulting.controller;

import com.ute.studentconsulting.firebase.FireBaseService;
import com.ute.studentconsulting.model.UploadsFileModel;
import com.ute.studentconsulting.payloads.response.ApiResponse;
import com.ute.studentconsulting.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/uploads")
@RequiredArgsConstructor
public class UploadsFileController {
    private static final String FOLDER_NAME = "departments/";
    private final FireBaseService fireBaseService;
    private final DepartmentService departmentService;

    @PostMapping("/images/{id}")
    public ResponseEntity<?> uploadsFile(@PathVariable("id") String id, @RequestParam("image") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse<>(false, "File không hợp lệ."), HttpStatus.BAD_REQUEST);
        }

        if(!isImageFile(file)) {
            return new ResponseEntity<>(new ApiResponse<>(false, "Định dạng file không hợp lệ."), HttpStatus.BAD_REQUEST);
        }
        var department = departmentService.findById(id);
        if (department.getBlobId() != null) {
            fireBaseService.deleteFiles(department.getBlobId());
        }
        var blobId = fireBaseService.uploadFiles(file, FOLDER_NAME);
        var url = fireBaseService.downloadFiles(blobId);
        return new ResponseEntity<>(
                new ApiResponse<>(true, new UploadsFileModel(blobId, url)),
                HttpStatus.OK);
    }

    public boolean isImageFile(MultipartFile file) {
        var fileName = file.getOriginalFilename();
        if (fileName != null &&
                (fileName.toLowerCase().endsWith(".jpg")
                        || fileName.toLowerCase().endsWith(".jpeg")
                        || fileName.toLowerCase().endsWith(".png"))) {
            return file.getContentType() != null &&
                    (file.getContentType().startsWith("image/jpeg")
                            || file.getContentType().startsWith("image/png"));
        }
        return false;
    }
}
