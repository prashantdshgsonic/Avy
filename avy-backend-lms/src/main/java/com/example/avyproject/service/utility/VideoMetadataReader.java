package com.example.avyproject.service.utility;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
@Getter
@Slf4j
public class VideoMetadataReader {
    public static Long extractDurationMetadata(File videoFile) {
        try {
            Metadata metadata = ImageMetadataReader.readMetadata(videoFile);

            // list all dirs and tags in file
            for (Directory directory : metadata.getDirectories()) {
                for (Tag tag : directory.getTags()) {
                    if (tag.getTagName().contains("Duration")) {
                        String durationStr = tag.getDescription();
                        return convertDurationToSeconds(durationStr);
                    }
                }

                if (directory.hasErrors()) {
                    for (String error : directory.getErrors()) {
                        log.info("ERROR: " + error);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private static Long convertDurationToSeconds(String durationStr) {
        try {
            // check format of duration
            if (durationStr.matches("\\d{2}:\\d{2}:\\d{2}")) {
                String[] parts = durationStr.split(":");
                int hours = Integer.parseInt(parts[0]);
                int minutes = Integer.parseInt(parts[1]);
                int seconds = Integer.parseInt(parts[2]);
                return hours * 3600L + minutes * 60L + seconds;
            }
            // check if it is a number
            else if (durationStr.matches("\\d+")) {
                // convert milliseconds to seconds
                return Long.parseLong(durationStr) / 1000;
            } else {
                // unsupported or undefined format
                log.info("Нераспознанный формат длительности: " + durationStr);
                return null;
            }
        } catch (NumberFormatException e) {
            log.info("Ошибка при преобразовании длительности: " + e.getMessage());
            return null;
        }
    }
}