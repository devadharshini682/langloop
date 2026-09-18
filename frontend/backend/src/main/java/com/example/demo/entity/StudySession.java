
package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import java.time.LocalDateTime;


@Entity
@Table(name = "study_session")
public class StudySession {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDateTime startTime;


    private LocalDateTime endTime;


    @Min(0)
    @Max(100)
    private Integer score;



    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private SystemUser user;



    @ManyToOne
    @JoinColumn(name = "deck_id", nullable = false)
    @JsonIgnore
    private StudyDeck studyDeck;



    public StudySession() {
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public LocalDateTime getStartTime() {
        return startTime;
    }


    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }


    public LocalDateTime getEndTime() {
        return endTime;
    }


    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }


    public Integer getScore() {
        return score;
    }


    public void setScore(Integer score) {
        this.score = score;
    }


    public SystemUser getUser() {
        return user;
    }


    public void setUser(SystemUser user) {
        this.user = user;
    }


    public StudyDeck getStudyDeck() {
        return studyDeck;
    }


    public void setStudyDeck(StudyDeck studyDeck) {
        this.studyDeck = studyDeck;
    }
}