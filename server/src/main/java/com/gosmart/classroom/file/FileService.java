package com.gosmart.classroom.file;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.firebase.FirebaseApp;
import com.google.firebase.cloud.StorageClient;
import com.gosmart.classroom.file.firebase.FirebaseConfigProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FirebaseApp firebaseApp;
    private final FirebaseConfigProperties firebaseConfigProperties;

    public FileResponse uploadFile(MultipartFile file) throws IOException {

        Storage storage = StorageClient.getInstance().bucket(firebaseConfigProperties.getStorageBucket()).getStorage();

        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        String mimeType = file.getContentType();
        Long fileSize = file.getSize();

        BlobId blobId = BlobId.of(firebaseConfigProperties.getStorageBucket(), fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(mimeType).build();

        FileResponse response = new FileResponse();
        response.setFileName(fileName);
        response.setUrl("https://storage.googleapis.com/" + firebaseConfigProperties.getStorageBucket() + "/" + fileName);
        response.setType(mimeType);
        response.setSize(fileSize);

        return response;
    }

}
