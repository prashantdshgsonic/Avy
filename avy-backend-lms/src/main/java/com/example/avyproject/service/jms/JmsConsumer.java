package com.example.avyproject.service.jms;
import com.example.avyproject.entity.Lesson;
import com.example.avyproject.entity.PdfLesson;
import com.example.avyproject.entity.VideoLesson;
import com.example.avyproject.exceptions.EntityNotFoundException;
import com.example.avyproject.repository.LessonRepository;
import com.example.avyproject.service.strategy.LessonHandler;
import com.example.avyproject.service.strategy.LessonStrategy;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.json.JsonMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.util.Map;


@Component
@RequiredArgsConstructor
@Slf4j
public class JmsConsumer {
    private final LessonRepository lessonRepository;

    // listening to the messages sent from the LLM service to the queue to retrieve summary of a certain lesson
    @JmsListener(destination = "lesson_summary")
    public void getLessonSummary(byte[] jsonBytes) throws JsonProcessingException {
        String json = new String(jsonBytes,StandardCharsets.UTF_8);
        JsonMapper jsonMapper = new JsonMapper();
        Map<String,Object> map = jsonMapper.readValue(json, Map.class);

        String summary = (String) map.get("summary");
        Long lessonId = Long.valueOf((Integer) map.get("lessonId"));

        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(
                () -> new EntityNotFoundException("Requested lesson was not found"));

        if(lesson instanceof VideoLesson videoLesson) {
            videoLesson.setSummary(summary);
            lessonRepository.save(videoLesson);
        } else if(lesson instanceof PdfLesson pdfLesson) {
            pdfLesson.setSummary(summary);
            lessonRepository.save(pdfLesson);
        }
        log.info("summary for lesson {} saved",lessonId);
    }
}
