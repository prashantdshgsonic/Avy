package com.example.avyproject.service;

import com.example.avyproject.exceptions.ImageCreationException;
import com.example.avyproject.exceptions.NoImageAttachedException;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Slf4j
@Service
@Primary
public class ImageServiceImpl implements ImageService {

    @Override
    public String uploadImage(MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                // String imageURI = "avy-backend/src/main/resources/images/";
                String ext = "png";
                String currentWorkingDir = System.getProperty("user.dir");
                Path path = Paths.get(currentWorkingDir, "avy-backend", "src", "main", "resources", "static", "images",
                        generateImageName() + "." + ext);
                // Path path = Paths.get(imageURI, generateImageName() + "." + ext);
                File fileToSave = new File(path.toString());
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fileToSave));
                stream.write(bytes);
                stream.close();
                System.out.println("saved at " + path);
                return path.toString();
            } catch (Exception e) {
                return "File upload ERROR! " + e.getMessage();
            }
        } else {
            throw new NoImageAttachedException("No image attached");
        }
    }

    @SneakyThrows
    @Override
    public void deleteImage(String path) {
        Files.deleteIfExists(Path.of(path));
        log.info("file at the requested path has been deleted");
    }

    // @Override
    public String saveImage(byte[] data) {
        // final String separator = File.separator;
        // String imageURI = "avy-backend/src/main/resources/images/";
        String ext = "png";
        try {
            ByteArrayInputStream dataStream = new ByteArrayInputStream(data);
            BufferedImage image = ImageIO.read(dataStream);
            // Path path = Paths.get(imageURI, generateImageName() + "." + ext);
            Path path = Paths.get("avy-backend", "src", "main", "resources", "images", "static", generateImageName() + "." + ext);
            File file = new File(path.toString());

            if (!file.exists()) {
                file.getParentFile().mkdirs();
            }

            boolean isSaved = ImageIO.write(image, ext, file);
            if (isSaved) {
                return path.toString();
            }
            return "Image not found!";
        } catch (IOException e) {
            String message = "Image creation exception " + e.getMessage();
            log.error(message);
            throw new ImageCreationException(message);
        }
    }

    private String generateImageName() {
        return UUID.randomUUID().toString();
    }
}
