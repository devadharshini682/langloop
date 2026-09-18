// package com.example.demo.controller;
// import com.example.demo.dto.SessionResultDto;
// import com.example.demo.entity.RetentionMetric;
// import com.example.demo.entity.StudySession;
// import com.example.demo.service.SpacedRepetitionService;
// import com.example.demo.service.StudySessionService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/study")
// @CrossOrigin(origins = "*")
// public class StudyController {

//     @Autowired
//     private SpacedRepetitionService spacedRepetitionService;

//     @Autowired
//     private StudySessionService studySessionService;

//     @GetMapping("/due")
//     public List<RetentionMetric> getDueReviews(
//             @RequestParam Long userId) {

//         return spacedRepetitionService.getDueReviews(userId);
//     }

//     @PostMapping("/complete")
//     public StudySession completeSession(
//             @RequestBody SessionResultDto dto) {

//         return studySessionService.completeSession(dto);
//     }

// }
package com.example.demo.controller;

import com.example.demo.dto.DueCardDto;
import com.example.demo.dto.SessionResultDto;
import com.example.demo.entity.RetentionMetric;
import com.example.demo.entity.StudySession;
import com.example.demo.service.SpacedRepetitionService;
import com.example.demo.service.StudySessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/study")
@CrossOrigin(origins = "*")
public class StudyController {

    @Autowired
    private SpacedRepetitionService spacedRepetitionService;

    @Autowired
    private StudySessionService studySessionService;

    @GetMapping("/due")
    public List<DueCardDto> getDueReviews(
            @RequestParam Long userId) {

        List<RetentionMetric> metrics =
                spacedRepetitionService.getDueReviews(userId);

        return metrics.stream()
                .filter(metric -> metric.getFlashcard() != null)
                .map(metric -> new DueCardDto(
                        metric.getFlashcard().getId(),
                        metric.getFlashcard().getFrontContent(),
                        metric.getFlashcard().getBackContent(),
                        metric.getEaseFactor(),
                        metric.getIntervalDays(),
                        metric.getMasteryLevel().name()
                ))
                .collect(Collectors.toList());
    }

    @PostMapping("/complete")
    public StudySession completeSession(
            @RequestBody SessionResultDto dto) {

        return studySessionService.completeSession(dto);
    }
}
