package com.example.avyproject.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Setter
@Getter
@AllArgsConstructor
@Builder
@ToString
@NoArgsConstructor
@Table(name = "pdf_module_item")
public class PdfLesson extends Lesson {
    private String fileName;
    private String fileType;
    private String fileLink;
    @Column(length = 2048)
    private String summary;
}
