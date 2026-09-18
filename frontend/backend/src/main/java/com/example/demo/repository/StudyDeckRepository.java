package com.example.demo.repository;

import com.example.demo.entity.StudyDeck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyDeckRepository extends JpaRepository<StudyDeck, Long> {

    List<StudyDeck> findByMentorName(String mentorName);

    List<StudyDeck> findByTitleContainingIgnoreCase(String title);

    @Query("SELECT d FROM StudyDeck d")
    List<StudyDeck> getAllStudyDecks();

    @Query("SELECT d FROM StudyDeck d WHERE d.mentorName = ?1")
    List<StudyDeck> findDecksByMentor(String mentorName);

}