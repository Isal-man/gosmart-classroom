package com.gosmart.classroom.file;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/upload")
public class FileController {

    private final FileService fileService;

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) throws IOException {

        FileResponse response = fileService.uploadFile(file);

        return ResponseEntity.ok(response);

    }

}
