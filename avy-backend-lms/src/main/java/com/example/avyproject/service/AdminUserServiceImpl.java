package com.example.avyproject.service;

import com.example.avyproject.dto.CreateNftDto;
import com.example.avyproject.entity.AdminUser;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import com.example.avyproject.entity.embeddable.Asset;
import com.example.avyproject.exceptions.InvalidFormatException;
import com.example.avyproject.exceptions.UserNotFoundException;
import com.example.avyproject.repository.AdminUserRepository;
import com.example.avyproject.service.utility.FormatChecker;
import com.example.avyproject.service.utility.RestUtil;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final AdminUserRepository adminUserRepository;
    private final ImageService imageService;
    private final FormatChecker formatChecker;
    private final AvyUserService avyUserService;
    private final CourseService courseService;
    private final WebClient webClient;
    @Value("${issue.nft.url}")
    private String createAssetUrl;

    @Override
    public List<AdminUser> getAll() {
        return adminUserRepository.findAll();
    }

    @Override
    public AdminUser findById(Long id) {
        return adminUserRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with ID %d not found", id)));
    }

    @Override
    public AdminUser findByEmail(String email) {
        return adminUserRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with email \"%s\"" + " not found", email)));
    }

    @Override
    public AdminUser save(AdminUser adminUser) {
        if (formatChecker.checkEmail(adminUser.getEmail())) {
            if (formatChecker.checkPassword(adminUser.getPassword())) {
                return adminUserRepository.save(adminUser);
            }
            throw new InvalidFormatException("Invalid password format");
        }
        throw new InvalidFormatException("Invalid email format");
    }

    @Override
    public void delete() {
        //
    }

    @Override
    public void issueNft(Long userId,Long courseId,CreateNftDto createNftDto) {
        AvyUser avyUser = avyUserService.getEntityById(userId);
        Course course = courseService.getEntityById(courseId);
        Map mintedNftData = createAsset(createNftDto);
        String address = String.valueOf(mintedNftData.get("assetAddress"));
        avyUserService.createAsset(avyUser,new Asset(course.getId(),address));
//        avyUserService.createAsset(avyUser,new Asset(course.getId(),avyUser.getId(),UUID.randomUUID().toString()));
    }

    public Map createAsset(CreateNftDto createNftDto) {
        String pathToNftImage = imageService.uploadImage(createNftDto.getNftImage());
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("holder", createNftDto.getHolder());
        requestData.put("holderEmail", createNftDto.getHolderEmail());
        requestData.put("titleCourse", createNftDto.getTitleCourse());
        requestData.put("description", createNftDto.getDescription());
        requestData.put("courseCode", createNftDto.getCourseCode());
        requestData.put("category", createNftDto.getCategory());
        requestData.put("level", createNftDto.getLevel());
        requestData.put("collectionMintAddress", createNftDto.getCollectionMintAddress());
        requestData.put("nftImage", pathToNftImage);
        try {
            return webClient.post()
                    .uri(createAssetUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestData)
                    .retrieve().bodyToMono(Map.class).block();
        } catch (RuntimeException e) {
            imageService.deleteImage(pathToNftImage);
            throw new RuntimeException("Failed to create asset: " + e.getMessage(),e);
        }
    }
}
