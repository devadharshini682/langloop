// package com.example.demo.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "retention_metric")
// public class RetentionMetric {

//     public enum MasteryLevel {
//         NEW,
//         LEARNING,
//         MASTERED
//     }

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private Double easeFactor = 2.5;

//     @Column(nullable = false)
//     private Integer intervalDays = 1;

//     @Column(nullable = false)
//     private LocalDateTime nextReviewDate;

//     @Enumerated(EnumType.STRING)
//     @Column(nullable = false)
//     private MasteryLevel masteryLevel = MasteryLevel.NEW;

//     public RetentionMetric() {
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public Double getEaseFactor() {
//         return easeFactor;
//     }

//     public void setEaseFactor(Double easeFactor) {
//         this.easeFactor = easeFactor;
//     }

//     public Integer getIntervalDays() {
//         return intervalDays;
//     }

//     public void setIntervalDays(Integer intervalDays) {
//         this.intervalDays = intervalDays;
//     }

//     public LocalDateTime getNextReviewDate() {
//         return nextReviewDate;
//     }

//     public void setNextReviewDate(LocalDateTime nextReviewDate) {
//         this.nextReviewDate = nextReviewDate;
//     }

//     public MasteryLevel getMasteryLevel() {
//         return masteryLevel;
//     }

//     public void setMasteryLevel(MasteryLevel masteryLevel) {
//         this.masteryLevel = masteryLevel;
//     }
// }

package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "retention_metric")
public class RetentionMetric {

    public enum MasteryLevel {
        NEW,
        LEARNING,
        MASTERED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double easeFactor = 2.5;

    @Column(nullable = false)
    private Integer intervalDays = 1;

    @Column(nullable = false)
    private LocalDateTime nextReviewDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MasteryLevel masteryLevel = MasteryLevel.NEW;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flashcard_id")
    private Flashcard flashcard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private SystemUser user;

    public RetentionMetric() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getEaseFactor() {
        return easeFactor;
    }

    public void setEaseFactor(Double easeFactor) {
        this.easeFactor = easeFactor;
    }

    public Integer getIntervalDays() {
        return intervalDays;
    }

    public void setIntervalDays(Integer intervalDays) {
        this.intervalDays = intervalDays;
    }

    public LocalDateTime getNextReviewDate() {
        return nextReviewDate;
    }

    public void setNextReviewDate(LocalDateTime nextReviewDate) {
        this.nextReviewDate = nextReviewDate;
    }

    public MasteryLevel getMasteryLevel() {
        return masteryLevel;
    }

    public void setMasteryLevel(MasteryLevel masteryLevel) {
        this.masteryLevel = masteryLevel;
    }

    public Flashcard getFlashcard() {
        return flashcard;
    }

    public void setFlashcard(Flashcard flashcard) {
        this.flashcard = flashcard;
    }

    public SystemUser getUser() {
        return user;
    }

    public void setUser(SystemUser user) {
        this.user = user;
    }
}
