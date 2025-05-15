package com.example.avyproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateNftDto {
    private String holder;
    private String holderEmail;
    private String titleCourse;
    private String description;
    private String courseCode;
    private String category;
    private String level;
    private String collectionMintAddress;
    private MultipartFile nftImage;
}
