package com.gosmart.classroom.file;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileResponse {

    private String fileName;
    private String url;
    private String type;
    private Long size;

}
