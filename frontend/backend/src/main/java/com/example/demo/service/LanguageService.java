package com.example.demo.service;

import com.example.demo.entity.LanguageTrack;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.LanguageTrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageService {

    @Autowired
    private LanguageTrackRepository languageTrackRepository;

    public List<LanguageTrack> getAllLanguages() {
        return languageTrackRepository.findAll();
    }

    public LanguageTrack getLanguageById(Long id) {
        return languageTrackRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Language track not found with id: " + id));
    }
}