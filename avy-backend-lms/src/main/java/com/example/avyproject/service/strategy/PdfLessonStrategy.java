package com.example.avyproject.service.strategy;

import com.example.avyproject.converter.LessonConverter;
import com.example.avyproject.dto.lesson.*;
import com.example.avyproject.entity.AvyModule;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.entity.PdfLesson;
import com.example.avyproject.exceptions.CourseNotFoundException;
import com.example.avyproject.exceptions.NoPdfAttachedException;
import com.example.avyproject.repository.LessonRepository;
import com.example.avyproject.service.AvyModuleService;
import com.example.avyproject.service.PdfService;
import com.example.avyproject.service.jms.JmsProducer;
import com.example.avyproject.service.utility.RelativePathConverter;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@Slf4j
public class PdfLessonStrategy implements LessonStrategy {
    private final ModelMapper mapper;
    private final LessonConverter lessonConverter;
    private final AvyModuleService avyModuleService;
    private final PdfService pdfService;
    private final LessonRepository lessonRepository;
    private final JmsProducer jmsProducer;

    public PdfLessonStrategy(ModelMapper mapper,
                             LessonConverter lessonConverter,
                             AvyModuleService avyModuleService,
                             PdfService pdfService,
                             LessonRepository lessonRepository,
                             JmsProducer jmsProducer) {
        this.mapper = mapper;
        this.lessonConverter = lessonConverter;
        this.avyModuleService = avyModuleService;
        this.pdfService = pdfService;
        this.lessonRepository = lessonRepository;
        this.jmsProducer = jmsProducer;
    }

    @Override
    public boolean supports(String lessonType) {
        return "pdf".equals(lessonType);
    }

    @Override
    public boolean requiredFile() {
        return true;
    }

    @Override
    public CreateLessonDto processFile(CreateLessonDto createLessonDto, MultipartFile file) {
        if(file != null && !file.isEmpty()) {
            CreatePdfLessonDto createPdfLessonDto = (CreatePdfLessonDto) createLessonDto;
            createPdfLessonDto.setLessonPdf(file);
            log.info("Here I get the incoming file {}", file.getOriginalFilename());
            return createPdfLessonDto;
        }
        throw new NoPdfAttachedException("No pdf file attached");
    }

    @Override
    public String getLessonType() {
        return "pdf";
    }

    @Override
    public Lesson createLesson(CreateLessonDto createLessonDto) {
        CreatePdfLessonDto createPdfLessonDto = (CreatePdfLessonDto) createLessonDto;
        PdfLesson pdfLesson = lessonConverter.convertToEntity(createPdfLessonDto, PdfLesson.class);
        if(createPdfLessonDto.getModuleId() == null) {
            throw new CourseNotFoundException("Module ID cannot be null");
        }
        AvyModule avyModule = avyModuleService.getById(createLessonDto.getModuleId());
        String pdfFilePath = pdfService.uploadPdf(((CreatePdfLessonDto) createLessonDto).getLessonPdf());
        pdfLesson.setAvyModule(avyModule);
        pdfLesson.setFileLink(pdfFilePath);
        pdfLesson.setItemOrder(checkLessonOrder(avyModule));
        pdfLesson.setModuleId(createLessonDto.getModuleId());
        PdfLesson savedLesson = lessonRepository.save(pdfLesson);
        jmsProducer.sendLessonUrl(savedLesson.getId(), pdfFilePath);
        return savedLesson;
    }

    @Override
    public Class<? extends CreateLessonDto> getSupportedDtoClass() {
        return CreatePdfLessonDto.class;
    }

    @Override
    public LessonDto convertToDto(Lesson lesson) {
        PdfLesson pdfLesson = (PdfLesson) lesson;
        PdfLessonDto pdfLessonDto = mapper.map(pdfLesson, PdfLessonDto.class);
        String relativePath = RelativePathConverter.getRelativePath(pdfLesson.getFileLink());
        pdfLessonDto.setPdfFileLink(relativePath);
        return pdfLessonDto;
    }

    @Override
    public Lesson updateLesson(Lesson existingLesson, CreateLessonDto replacingLesson) {
        PdfLesson pdfLesson = (PdfLesson) existingLesson;
        CreatePdfLessonDto replacingPdfLesson = (CreatePdfLessonDto) replacingLesson;
        String pdfFilePath = pdfService.uploadPdf(replacingPdfLesson.getLessonPdf());
        pdfLesson.setFileLink(pdfFilePath);
        pdfLesson.setFileName(replacingPdfLesson.getFileName());
        pdfLesson.setTitle(replacingLesson.getTitle());
        pdfLesson.getLessonProgresses().removeAll(pdfLesson.getLessonProgresses());
        PdfLesson savedLesson = lessonRepository.save(pdfLesson);
        jmsProducer.sendLessonUrl(savedLesson.getId(),savedLesson.getFileLink());
        return savedLesson;
    }

}
