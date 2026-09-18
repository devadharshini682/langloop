
// package com.example.demo.service;

// import com.example.demo.dto.DeckRequestDto;
// import com.example.demo.entity.StudyDeck;

// import java.util.List;


// public interface DeckManagementService {


//     List<StudyDeck> getAllDecks();


//     StudyDeck getDeckById(Long id);


//     StudyDeck createDeck(
//             DeckRequestDto dto,
//             String username);



//     StudyDeck updateDeck(
//             Long id,
//             DeckRequestDto dto);



//     void deleteDeck(Long id);

// }
package com.example.demo.service;

import com.example.demo.dto.DeckRequestDto;
import com.example.demo.entity.StudyDeck;

import java.util.List;


public interface DeckManagementService {


    List<StudyDeck> getAllDecks();


    StudyDeck getDeckById(
            Long id);


    StudyDeck createDeck(
            DeckRequestDto dto,
            String username);


    StudyDeck updateDeck(
            Long id,
            DeckRequestDto dto);


    void deleteDeck(
            Long id);


    StudyDeck cloneDeck(
            Long id,
            String username);
}