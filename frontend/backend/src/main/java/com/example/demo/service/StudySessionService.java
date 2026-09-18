package com.example.demo.service;

import com.example.demo.dto.SessionResultDto;
import com.example.demo.entity.StudySession;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.StudySessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StudySessionService {

    @Autowired
    private StudySessionRepository studySessionRepository;

    public StudySession completeSession(SessionResultDto dto) {

        StudySession session = studySessionRepository.findById(dto.getSessionId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Study session not found with id: " + dto.getSessionId()));

        session.setEndTime(LocalDateTime.now());
        session.setScore((int) Math.round(dto.getAccuracy()));

        return studySessionRepository.save(session);
    }

    public List<StudySession> getUserSessions(Long userId) {
        return studySessionRepository.findByUserId(userId);
    }
}

