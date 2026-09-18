package com.example.demo.controller;

import com.example.demo.entity.Flashcard;
import com.example.demo.entity.RetentionMetric;
import com.example.demo.entity.SystemUser;
import com.example.demo.repository.FlashcardRepository;
import com.example.demo.repository.RetentionMetricRepository;
import com.example.demo.repository.SystemUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/retention")
@CrossOrigin(origins = "*")
public class RetentionMetricController {

    @Autowired
    private RetentionMetricRepository retentionMetricRepository;

    @Autowired
    private FlashcardRepository flashcardRepository;

    @Autowired
    private SystemUserRepository systemUserRepository;

    @PostMapping("/due")
    public ResponseEntity<RetentionMetric> createDueMetric(
            @RequestParam Long userId,
            @RequestParam Long cardId) {

        SystemUser user = systemUserRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Flashcard flashcard = flashcardRepository
                .findById(cardId)
                .orElseThrow(() ->
                        new RuntimeException("Flashcard not found"));

        RetentionMetric metric = new RetentionMetric();

        metric.setEaseFactor(2.5);
        metric.setIntervalDays(1);
        metric.setNextReviewDate(LocalDateTime.now());
        metric.setMasteryLevel(
                RetentionMetric.MasteryLevel.NEW
        );
        metric.setUser(user);
        metric.setFlashcard(flashcard);

        RetentionMetric saved =
                retentionMetricRepository.save(metric);

        return new ResponseEntity<>(
                saved,
                HttpStatus.CREATED
        );
    }
}
