// package com.example.demo.service;

// import com.example.demo.entity.RetentionMetric;
// import com.example.demo.repository.RetentionMetricRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class SpacedRepetitionService {

//     @Autowired
//     private RetentionMetricRepository retentionMetricRepository;

//     public void updateRetentionMetric(Long userId, Long cardId, Integer quality) {

//         // NOTE: RetentionMetric currently has no user/flashcard relation,
//         // so a specific learner's specific card metric cannot be looked up.
//         // Implemented as a no-op placeholder until the entity supports it.

//     }

//     public List<RetentionMetric> getDueReviews(Long userId) {

//         // NOTE: filtering ignores userId since RetentionMetric has no user field yet.
//         // Returns all metrics currently due for review.
//         LocalDateTime now = LocalDateTime.now();

//         return retentionMetricRepository.findAll().stream()
//                 .filter(metric -> metric.getNextReviewDate() != null
//                         && !metric.getNextReviewDate().isAfter(now))
//                 .collect(Collectors.toList());
//     }
// }
package com.example.demo.service;

import com.example.demo.entity.RetentionMetric;
import com.example.demo.repository.RetentionMetricRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SpacedRepetitionService {

    @Autowired
    private RetentionMetricRepository retentionMetricRepository;

    public void updateRetentionMetric(
            Long userId,
            Long cardId,
            Integer quality) {

        // Existing method preserved.
    }

    public List<RetentionMetric> getDueReviews(Long userId) {

        return retentionMetricRepository.findDueReviews(
                userId,
                LocalDateTime.now()
        );
    }
}
