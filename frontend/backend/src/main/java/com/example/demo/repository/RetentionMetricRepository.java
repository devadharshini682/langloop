// package com.example.demo.repository;
// import com.example.demo.entity.RetentionMetric;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// @Repository
// public interface RetentionMetricRepository extends JpaRepository<RetentionMetric, Long> {

// }
package com.example.demo.repository;

import com.example.demo.entity.RetentionMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RetentionMetricRepository
        extends JpaRepository<RetentionMetric, Long> {

    @Query("""
        SELECT r
        FROM RetentionMetric r
        WHERE r.user.id = :userId
        AND r.nextReviewDate <= :now
    """)
    List<RetentionMetric> findDueReviews(
            Long userId,
            LocalDateTime now
    );
}
