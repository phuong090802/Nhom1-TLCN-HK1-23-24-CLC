package com.ute.studentconsulting.firebase;

import com.google.cloud.storage.BlobId;
import com.google.firebase.cloud.StorageClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FireBaseService {
    @Value("${student-consulting.firebase.bucket}")
    private String firebaseBucket;

    public String uploadFiles(MultipartFile file, String folderName) throws IOException {
        var fileName = UUID.randomUUID().toString();
        var bucket = StorageClient.getInstance().bucket(firebaseBucket);
        String objectName = folderName + fileName;
        try (var content = new ByteArrayInputStream(file.getBytes())) {
            var blob = bucket.create(objectName, content, file.getContentType());
            return blob.getBlobId().toGsUtilUri();
        }
    }

    public String downloadFiles(String id) {
        var blobId = BlobId.fromGsUtilUri(id);
        var bucket = StorageClient.getInstance().bucket(firebaseBucket);
        return bucket.getStorage().get(blobId).getMediaLink();
    }

    public void deleteFiles(String id) {
        var blobId = BlobId.fromGsUtilUri(id);
        var bucket = StorageClient.getInstance().bucket(firebaseBucket);
        bucket.getStorage().delete(blobId);
    }
}
