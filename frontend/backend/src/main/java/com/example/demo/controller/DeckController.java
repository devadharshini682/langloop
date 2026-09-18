
// package com.example.demo.controller;

// import com.example.demo.dto.DeckRequestDto;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.service.DeckManagementService;

// import jakarta.validation.Valid;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.security.Principal;
// import java.util.List;


// @RestController
// @RequestMapping("/api/decks")
// @CrossOrigin(origins = "*")
// public class DeckController {


//     @Autowired
//     private DeckManagementService deckManagementService;



//     @GetMapping
//     public ResponseEntity<List<StudyDeck>> getAllDecks() {

//         return ResponseEntity.ok(
//                 deckManagementService.getAllDecks()
//         );
//     }



//     @GetMapping("/{id}")
//     public ResponseEntity<StudyDeck> getDeckById(
//             @PathVariable Long id) {

//         return ResponseEntity.ok(
//                 deckManagementService.getDeckById(id)
//         );
//     }



//     @PostMapping
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<String> createDeck(
//             @Valid @RequestBody DeckRequestDto dto,
//             Principal principal) {


//         deckManagementService.createDeck(
//                 dto,
//                 principal.getName()
//         );


//         return new ResponseEntity<>(
//                 "StudyDeck created successfully.",
//                 HttpStatus.CREATED
//         );
//     }




//     @PutMapping("/{id}")
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<StudyDeck> updateDeck(
//             @PathVariable Long id,
//             @Valid @RequestBody DeckRequestDto dto) {


//         return ResponseEntity.ok(
//                 deckManagementService.updateDeck(id, dto)
//         );
//     }




//     @DeleteMapping("/{id}")
//     @PreAuthorize("hasRole('ADMIN')")
//     public ResponseEntity<String> deleteDeck(
//             @PathVariable Long id) {


//         deckManagementService.deleteDeck(id);


//         return ResponseEntity.ok(
//                 "StudyDeck deleted successfully."
//         );
//     }

// }
// package com.example.demo.controller;

// import com.example.demo.dto.DeckRequestDto;
// import com.example.demo.entity.Flashcard;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.repository.FlashcardRepository;
// import com.example.demo.repository.StudyDeckRepository;
// import com.example.demo.service.DeckManagementService;

// import jakarta.validation.Valid;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.security.Principal;
// import java.util.List;

// @RestController
// @RequestMapping("/api/decks")
// @CrossOrigin(origins = "*")
// public class DeckController {

//     @Autowired
//     private DeckManagementService deckManagementService;

//     @Autowired
//     private FlashcardRepository flashcardRepository;

//     @Autowired
//     private StudyDeckRepository studyDeckRepository;


//     // GET ALL DECKS
//     @GetMapping
//     public ResponseEntity<List<StudyDeck>> getAllDecks() {

//         return ResponseEntity.ok(
//                 deckManagementService.getAllDecks()
//         );
//     }


//     // GET DECK BY ID
//     @GetMapping("/{id}")
//     public ResponseEntity<StudyDeck> getDeckById(
//             @PathVariable Long id) {

//         return ResponseEntity.ok(
//                 deckManagementService.getDeckById(id)
//         );
//     }


//     // CREATE DECK
//     @PostMapping
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<String> createDeck(
//             @Valid @RequestBody DeckRequestDto dto,
//             Principal principal) {

//         deckManagementService.createDeck(
//                 dto,
//                 principal.getName()
//         );

//         return new ResponseEntity<>(
//                 "StudyDeck created successfully.",
//                 HttpStatus.CREATED
//         );
//     }


//     // UPDATE DECK
//     @PutMapping("/{id}")
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<StudyDeck> updateDeck(
//             @PathVariable Long id,
//             @Valid @RequestBody DeckRequestDto dto) {

//         return ResponseEntity.ok(
//                 deckManagementService.updateDeck(id, dto)
//         );
//     }


//     // DELETE DECK
//     @DeleteMapping("/{id}")
//     @PreAuthorize("hasRole('ADMIN')")
//     public ResponseEntity<String> deleteDeck(
//             @PathVariable Long id) {

//         deckManagementService.deleteDeck(id);

//         return ResponseEntity.ok(
//                 "StudyDeck deleted successfully."
//         );
//     }


//     // ADD FLASHCARD TO A DECK
//     @PostMapping("/{deckId}/cards")
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<Flashcard> createFlashcardForDeck(
//             @PathVariable Long deckId,
//             @RequestBody LegacyFlashcardRequest request) {

//         StudyDeck deck = studyDeckRepository
//                 .findById(deckId)
//                 .orElseThrow(() ->
//                         new RuntimeException("Deck not found"));

//         Flashcard flashcard = new Flashcard();

//         flashcard.setFrontContent(
//                 request.getFrontText()
//         );

//         flashcard.setBackContent(
//                 request.getBackText()
//         );

//         Integer orderIndex =
//                 request.getOrderIndex() != null
//                         ? request.getOrderIndex()
//                         : flashcardRepository
//                                 .findByStudyDeckIdOrderByOrderIndexAsc(deckId)
//                                 .size() + 1;

//         flashcard.setOrderIndex(orderIndex);

//         flashcard.setStudyDeck(deck);

//         Flashcard saved =
//                 flashcardRepository.save(flashcard);

//         return new ResponseEntity<>(
//                 saved,
//                 HttpStatus.CREATED
//         );
//     }


//     // DELETE SPECIFIC FLASHCARD FROM A DECK
//     @DeleteMapping("/{deckId}/cards/{cardId}")
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<String> deleteFlashcard(
//             @PathVariable Long deckId,
//             @PathVariable Long cardId) {

//         Flashcard flashcard =
//                 flashcardRepository
//                         .findById(cardId)
//                         .orElseThrow(() ->
//                                 new RuntimeException(
//                                         "Flashcard not found"
//                                 ));

//         if (flashcard.getStudyDeck() == null ||
//                 !flashcard.getStudyDeck()
//                         .getId()
//                         .equals(deckId)) {

//             return ResponseEntity
//                     .badRequest()
//                     .body(
//                             "Flashcard does not belong to this deck."
//                     );
//         }

//         flashcardRepository.delete(flashcard);

//         return ResponseEntity.ok(
//                 "Flashcard deleted successfully."
//         );
//     }


//     // REQUEST CLASS FOR ADDING FLASHCARD
//     public static class LegacyFlashcardRequest {

//         private String frontText;
//         private String backText;
//         private Integer orderIndex;


//         public String getFrontText() {
//             return frontText;
//         }

//         public void setFrontText(String frontText) {
//             this.frontText = frontText;
//         }


//         public String getBackText() {
//             return backText;
//         }

//         public void setBackText(String backText) {
//             this.backText = backText;
//         }


//         public Integer getOrderIndex() {
//             return orderIndex;
//         }

//         public void setOrderIndex(Integer orderIndex) {
//             this.orderIndex = orderIndex;
//         }
//     }
// }
package com.example.demo.controller;

import com.example.demo.dto.DeckRequestDto;
import com.example.demo.dto.FlashcardRequestDto;

import com.example.demo.entity.Flashcard;
import com.example.demo.entity.StudyDeck;

import com.example.demo.repository.FlashcardRepository;
import com.example.demo.repository.StudyDeckRepository;

import com.example.demo.service.DeckManagementService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/api/decks")
@CrossOrigin(origins = "*")
public class DeckController {


    @Autowired
    private DeckManagementService deckManagementService;


    @Autowired
    private StudyDeckRepository studyDeckRepository;


    @Autowired
    private FlashcardRepository flashcardRepository;


    // --------------------------------
    // GET ALL DECKS
    // --------------------------------

    @GetMapping
    public ResponseEntity<
        List<StudyDeck>
    > getAllDecks() {

        return ResponseEntity.ok(
            deckManagementService.getAllDecks()
        );
    }


    // --------------------------------
    // GET DECK BY ID
    // --------------------------------

    @GetMapping("/{id}")
    public ResponseEntity<StudyDeck>
    getDeckById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
            deckManagementService.getDeckById(id)
        );
    }


    // --------------------------------
    // CREATE DECK
    // --------------------------------

    @PostMapping
    @PreAuthorize(
        "hasAnyRole('LINGUIST','ADMIN')"
    )
    public ResponseEntity<String>
    createDeck(
            @Valid
            @RequestBody
            DeckRequestDto dto,
            Principal principal) {


        deckManagementService.createDeck(
            dto,
            principal.getName()
        );


        return new ResponseEntity<>(
            "StudyDeck created successfully.",
            HttpStatus.CREATED
        );
    }


    // --------------------------------
    // UPDATE DECK
    // --------------------------------

    @PutMapping("/{id}")
    @PreAuthorize(
        "hasAnyRole('LINGUIST','ADMIN')"
    )
    public ResponseEntity<StudyDeck>
    updateDeck(
            @PathVariable Long id,
            @Valid
            @RequestBody
            DeckRequestDto dto) {


        return ResponseEntity.ok(
            deckManagementService.updateDeck(
                id,
                dto
            )
        );
    }


    // --------------------------------
    // DELETE DECK
    // --------------------------------

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String>
    deleteDeck(
            @PathVariable Long id) {


        deckManagementService.deleteDeck(
            id
        );


        return ResponseEntity.ok(
            "StudyDeck deleted successfully."
        );
    }


    // --------------------------------
    // CLONE DECK
    // --------------------------------

    @PostMapping("/{id}/clone")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<StudyDeck>
    cloneDeck(
            @PathVariable Long id,
            Principal principal) {


        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(
                deckManagementService.cloneDeck(
                    id,
                    principal.getName()
                )
            );
    }


    // --------------------------------
    // ADD CARD TO SPECIFIC DECK
    // --------------------------------

    @PostMapping("/{deckId}/cards")
    @PreAuthorize(
        "hasAnyRole('LINGUIST','ADMIN')"
    )
    public ResponseEntity<Flashcard>
    addCardToDeck(
            @PathVariable Long deckId,
            @Valid
            @RequestBody
            FlashcardRequestDto dto) {


        StudyDeck deck =
            studyDeckRepository
                .findById(deckId)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Deck not found"
                    )
                );


        int nextOrder =
            flashcardRepository
                .findByStudyDeckIdOrderByOrderIndexAsc(
                    deckId
                )
                .size() + 1;


        Flashcard flashcard =
            new Flashcard();


        flashcard.setFrontContent(
            dto.getFrontContent()
        );


        flashcard.setBackContent(
            dto.getBackContent()
        );


        flashcard.setOrderIndex(
            nextOrder
        );


        flashcard.setPronunciation(
            dto.getPronunciation()
        );


        flashcard.setExampleSentence(
            dto.getExampleSentence()
        );


        flashcard.setStatus(
            "ACTIVE"
        );


        flashcard.setStudyDeck(
            deck
        );


        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(
                flashcardRepository.save(
                    flashcard
                )
            );
    }
}
