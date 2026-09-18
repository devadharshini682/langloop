package com.example.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "language_track")
public class LanguageTrack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String languageName;

    @Column(length = 500)
    private String description;

    public LanguageTrack() {
    }

    public LanguageTrack(Long id, String languageName, String description) {
        this.id = id;
        this.languageName = languageName;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguageName() {
        return languageName;
    }

    public void setLanguageName(String languageName) {
        this.languageName = languageName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
