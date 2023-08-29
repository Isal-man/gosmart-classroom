package com.gosmart.classroom.attachments;

import lombok.Data;

@Data
public class AttachmentRequest {

    private String fileName;
    private String url;
    private String type;
    private Long size;

}
