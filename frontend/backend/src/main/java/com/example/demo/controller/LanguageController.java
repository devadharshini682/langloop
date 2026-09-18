package com.example.demo.controller;
import com.example.demo.entity.LanguageTrack;
import com.example.demo.service.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/languages")
@CrossOrigin(origins = "*")
public class LanguageController {

    @Autowired
    private LanguageService languageService;

    @GetMapping
    public List<LanguageTrack> getAllLanguages() {
        return languageService.getAllLanguages();
    }

    @GetMapping("/{id}")
    public LanguageTrack getLanguage(@PathVariable Long id) {
        return languageService.getLanguageById(id);
    }
}
