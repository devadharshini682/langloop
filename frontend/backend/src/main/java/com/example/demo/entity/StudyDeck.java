
package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "study_decks")
public class StudyDeck {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    @NotBlank
    private String title;


    @Column(length = 500)
    private String description;


    @Column(nullable = false)
    @Min(1)
    private Integer capacity;


    @Column(nullable = false)
    @NotBlank
    private String mentorName;

    @Column(name = "language")
    private String language;



    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnore
    private SystemUser owner;



    @OneToMany(mappedBy = "studyDeck",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    @JsonIgnore
    private List<Flashcard> flashcards = new ArrayList<>();



    @OneToMany(mappedBy = "studyDeck",
            cascade = CascadeType.ALL)
    @JsonIgnore
    private List<StudySession> studySessions = new ArrayList<>();



    public StudyDeck() {
    }


    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public String getDescription() {
        return description;
    }


    public void setDescription(String description) {
        this.description = description;
    }


    public Integer getCapacity() {
        return capacity;
    }


    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }


    public String getMentorName() {
        return mentorName;
    }


    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }


    public SystemUser getOwner() {
        return owner;
    }


    public void setOwner(SystemUser owner) {
        this.owner = owner;
    }


    public List<Flashcard> getFlashcards() {
        return flashcards;
    }


    public void setFlashcards(List<Flashcard> flashcards) {
        this.flashcards = flashcards;
    }


    public List<StudySession> getStudySessions() {
        return studySessions;
    }


    public void setStudySessions(List<StudySession> studySessions) {
        this.studySessions = studySessions;
    }


    public String getLanguage() {
        return language;
    }


    public void setLanguage(String language) {
        this.language = language;
    }
}
