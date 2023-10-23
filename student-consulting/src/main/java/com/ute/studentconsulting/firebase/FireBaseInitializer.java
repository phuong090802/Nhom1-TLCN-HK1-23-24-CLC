package com.ute.studentconsulting.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class FireBaseInitializer {
    @Value("${student-consulting.firebase.configuration-file}")
    private String configPath;

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        var options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(new ClassPathResource(configPath).getInputStream()))
                .build();
        if(FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.initializeApp(options);
        }
        return FirebaseApp.getInstance();
    }
}
