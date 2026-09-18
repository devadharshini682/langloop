package com.example.demo.repository;

import com.example.demo.entity.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudySessionRepository extends JpaRepository<StudySession, Long> {

    List<StudySession> findByUserId(Long userId);

    List<StudySession> findByStudyDeckId(Long deckId);

}
