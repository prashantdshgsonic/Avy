package com.example.avyproject.service;

import com.example.avyproject.exceptions.NoImageAttachedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
public class LocalImageServiceImpl implements ImageService {

    @Override
    public String uploadImage(MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
//                String imageURI = "avy-backend/src/main/resources/images/";
                String ext = "png";
                String currentWorkingDir = System.getProperty("user.dir");
                Path path = Paths.get(currentWorkingDir,"avy-backend","src","main","resources", "static", "images", generateImageName() + "." + ext);
//                Path path = Paths.get(imageURI, generateImageName() + "." + ext);
                File fileToSave = new File(path.toString());
                BufferedOutputStream stream =
                        new BufferedOutputStream(new FileOutputStream(fileToSave));
                stream.write(bytes);
                stream.close();
                System.out.println("сохранено по адресу "+ path);
                return path.toString();
            } catch (Exception e) {
                return "File upload ERROR! " + e.getMessage();
            }
        } else {
//            return "File is empty! Couldn't load a file!";
            throw new NoImageAttachedException("No image attached");
        }
    }

    @Override
    public void deleteImage(String path) {

    }

    private String generateImageName() {
        return UUID.randomUUID().toString();
    }
}
