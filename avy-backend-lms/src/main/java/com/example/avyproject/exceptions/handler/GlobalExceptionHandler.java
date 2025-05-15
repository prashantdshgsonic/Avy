package com.example.avyproject.exceptions.handler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<Map<String,String>> handle(Exception exception) {
        log.error(exception.getMessage());
        return new ResponseEntity<>(Map.of("message", exception.getMessage()),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> methodArgumentNotValidException(MethodArgumentNotValidException exception) {
        Map<String,String> errorsMap = new HashMap<>();
        exception.getBindingResult()
                .getAllErrors().forEach(error -> {
                    String key = ((FieldError) error).getField();
                    String value = error.getDefaultMessage();
                    errorsMap.put(key,value);
                });
        return new ResponseEntity<>(errorsMap,HttpStatus.BAD_REQUEST);
    }


//    @ExceptionHandler(UserNotFoundException.class)
//    public ResponseEntity<String> UserNotFoundException(UserNotFoundException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
//    }
//
//    @ExceptionHandler(InvalidFormatException.class)
//    public ResponseEntity<String> InvalidFormatException(InvalidFormatException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(AccountNotFoundException.class)
//    public ResponseEntity<String> AccountNotFoundException(AccountNotFoundException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(PasswordIncorrectException.class)
//    public ResponseEntity<String> PasswordIncorrectException(PasswordIncorrectException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(RoleNotFoundException.class)
//    public ResponseEntity<String> RoleNotFoundException(RoleNotFoundException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(CourseNotFoundException.class)
//    public ResponseEntity<String> CourseNotFoundException (CourseNotFoundException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(NoImageAttachedException.class)
//    public ResponseEntity<String> NoImageAttachedException (NoImageAttachedException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(NoVideoAttachedException.class)
//    public ResponseEntity<String> NoVideoAttached (NoVideoAttachedException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(NoFileAttachedException.class)
//    public ResponseEntity<String> NoFileAttached (NoFileAttachedException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(ModuleNotFoundException.class)
//    public ResponseEntity<String> ModuleNotFound (ModuleNotFoundException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_ACCEPTABLE);
//    }
//
//    @ExceptionHandler(LessonProgressNotFoundException.class)
//    public ResponseEntity<String> LessonProgressNotFound (LessonProgressNotFoundException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
//    }
//
//    @ExceptionHandler(CourseProgressNotFoundException.class)
//    public ResponseEntity<String> CourseProgressNotFound (CourseProgressNotFoundException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
//    }
//
//    @ExceptionHandler(SubscriptionNotFoundException.class)
//    public ResponseEntity<String> SubscriptionNotFound (SubscriptionNotFoundException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
//    }
//
//    @ExceptionHandler(SubscriptionNotActivatedException.class)
//    public ResponseEntity<String> SubscriptionNotActivated (SubscriptionNotActivatedException exception) {
//        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
//    }
//    @ExceptionHandler(FileNotCVException.class)
//    public ResponseEntity<Map<String,String>> fileNotCV(FileNotCVException exception) {
//        return new ResponseEntity<>(Map.of("message",exception.getMessage()),HttpStatus.BAD_REQUEST);
//    }
}
