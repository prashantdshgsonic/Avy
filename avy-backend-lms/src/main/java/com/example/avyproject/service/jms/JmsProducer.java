package com.example.avyproject.service.jms;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class JmsProducer {
    private final JmsTemplate jmsTemplate;
    private final ObjectMapper objectMapper;

    // sending url and lesson id to get lesson summary and store its content in chunks
    public void sendLessonUrl(Long lessonId, String filePath) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("lessonId",lessonId);
        payload.put("filePath",filePath);
        try {
            String json = objectMapper.writeValueAsString(payload);
            log.info("sending {}",json);
            jmsTemplate.convertAndSend("lesson_queue", json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public void requestToDeleteLessonChunks(Long lessonId) {
        Map<String,Long> payLoad = new HashMap<>();
        payLoad.put("lessonId",lessonId);
        try {
            String json = objectMapper.writeValueAsString(payLoad);
            jmsTemplate.convertAndSend("delete_lesson_queue",json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
