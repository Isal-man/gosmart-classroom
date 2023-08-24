package com.gosmart.classroom.file.firebase;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class FirebaseConfigProperties {

    @Value("${firebase.apiKey}")
    private String apiKey;

    @Value("${firebase.authDomain}")
    private String authDomain;

    @Value("${firebase.projectId}")
    private String projectId;

    @Value("${firebase.storageBucket}")
    private String storageBucket;

    @Value("${firebase.messagingSenderId}")
    private String messagingSenderId;

    @Value("${firebase.appId}")
    private String appId;

}
