
package com.example.demo.controller;

import com.example.demo.dto.ProgressResponseDto;
import com.example.demo.repository.FlashcardRepository;
import com.example.demo.repository.RetentionMetricRepository;
import com.example.demo.entity.RetentionMetric;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {


    private final FlashcardRepository flashcardRepository;
    private final RetentionMetricRepository retentionMetricRepository;


    public AnalyticsController(
            FlashcardRepository flashcardRepository,
            RetentionMetricRepository retentionMetricRepository) {

        this.flashcardRepository = flashcardRepository;
        this.retentionMetricRepository = retentionMetricRepository;
    }



    @GetMapping("/progress")
    public ResponseEntity<ProgressResponseDto> getProgress() {


        long totalCards = flashcardRepository.count();


        long masteredCards =
                retentionMetricRepository.findAll()
                .stream()
                .filter(metric ->
                        metric.getMasteryLevel()
                        == RetentionMetric.MasteryLevel.MASTERED)
                .count();



        double progressPercentage = 0;


        if(totalCards > 0){
            progressPercentage =
                    ((double) masteredCards / totalCards) * 100;
        }



        ProgressResponseDto response =
                new ProgressResponseDto();


        response.setTotalCards((int) totalCards);
        response.setMasteredCards((int) masteredCards);
        response.setProgressPercentage(progressPercentage);


        return ResponseEntity.ok(response);
    }

}
