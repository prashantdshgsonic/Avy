package com.example.avyproject.service;

import com.example.avyproject.converter.AvyModuleConverter;
import com.example.avyproject.dto.CreateAvyModuleDto;
import com.example.avyproject.entity.AvyModule;
import com.example.avyproject.entity.AvyUser;
import com.example.avyproject.entity.Course;
import com.example.avyproject.exceptions.CourseNotFoundException;
import com.example.avyproject.exceptions.ModuleNotFoundException;
import com.example.avyproject.repository.AvyModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvyModuleServiceImpl implements AvyModuleService {

    @Autowired
    private AvyModuleRepository avyModuleRepository;
    @Autowired
    private ImageService imageService;
    @Autowired
    private AvyModuleConverter avyModuleConverter;
    @Autowired
    private CourseService courseService;

    @Override
    public AvyModule createModule(CreateAvyModuleDto createAvyModuleDto, AvyUser creator) {
//        String pathToImage = imageService.uploadImage(createAvyModuleDto.getModuleImage());
        if (createAvyModuleDto.getCourseId() == null) {
            throw new CourseNotFoundException("Course ID cannot be null");
        }
        Course course = courseService.getCourseByIdAndCreatorId(createAvyModuleDto.getCourseId(),creator.getId());
        AvyModule avyModule = avyModuleConverter.createModuleDtoToModule(createAvyModuleDto);
//        avyModule.setLinkToImage(pathToImage);
        avyModule.setModuleOrder(checkModuleOrder(course));
        avyModule.setItems(createAvyModuleDto.getItems());
        avyModule.setCourse(course);
        return avyModuleRepository.save(avyModule);
    }

    @Override
    public AvyModule getById(Long moduleId) {
        return avyModuleRepository.findById(moduleId)
                .orElseThrow(() -> new ModuleNotFoundException("Module with id "+moduleId+" not found"));
    }

    @Override
    public AvyModule getByIdAndCreatorId(Long moduleId, Long creatorId) {
        return null;
    }

    private int checkModuleOrder (Course course){
        List<AvyModule> avyModuleList = course.getAvyModuleList();
        int size = avyModuleList.size();
        return size++;
    }
}

