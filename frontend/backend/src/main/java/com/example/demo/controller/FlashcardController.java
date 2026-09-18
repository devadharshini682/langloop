// package com.example.demo.controller;

// import com.example.demo.dto.FlashcardRequestDto;
// import com.example.demo.entity.Flashcard;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.repository.FlashcardRepository;
// import com.example.demo.repository.StudyDeckRepository;

// import jakarta.validation.Valid;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/flashcards")
// @CrossOrigin(origins = "*")
// public class FlashcardController {

//     @Autowired
//     private FlashcardRepository flashcardRepository;

//     @Autowired
//     private StudyDeckRepository studyDeckRepository;

//     @PostMapping
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<Flashcard> createFlashcard(
//             @Valid @RequestBody FlashcardRequestDto dto) {

//         StudyDeck deck = studyDeckRepository
//                 .findById(dto.getDeckId())
//                 .orElseThrow(() ->
//                         new RuntimeException("Deck not found"));

//         Flashcard flashcard = new Flashcard();

//         flashcard.setFrontContent(dto.getFrontContent());
//         flashcard.setBackContent(dto.getBackContent());
//         flashcard.setOrderIndex(dto.getOrderIndex());
//         flashcard.setStudyDeck(deck);

//         Flashcard saved =
//                 flashcardRepository.save(flashcard);

//         return new ResponseEntity<>(
//                 saved,
//                 HttpStatus.CREATED
//         );
//     }

//     @GetMapping("/deck/{deckId}")
//     public ResponseEntity<List<Flashcard>> getFlashcardsByDeck(
//             @PathVariable Long deckId) {

//         return ResponseEntity.ok(
//                 flashcardRepository
//                         .findByStudyDeckIdOrderByOrderIndexAsc(deckId)
//         );
//     }
// }
// package com.example.demo.controller;

// import com.example.demo.dto.FlashcardRequestDto;
// import com.example.demo.entity.Flashcard;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.repository.FlashcardRepository;
// import com.example.demo.repository.StudyDeckRepository;

// import jakarta.validation.Valid;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/flashcards")
// @CrossOrigin(origins = "*")
// public class FlashcardController {

//     @Autowired
//     private FlashcardRepository flashcardRepository;

//     @Autowired
//     private StudyDeckRepository studyDeckRepository;

//     @PostMapping
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<Flashcard> createFlashcard(
//             @Valid @RequestBody FlashcardRequestDto dto) {

//         StudyDeck deck = studyDeckRepository
//                 .findById(dto.getDeckId())
//                 .orElseThrow(() ->
//                         new RuntimeException("Deck not found"));

//         Flashcard flashcard = new Flashcard();

//         flashcard.setFrontContent(dto.getFrontContent());
//         flashcard.setBackContent(dto.getBackContent());
//         flashcard.setOrderIndex(dto.getOrderIndex());
//         flashcard.setStudyDeck(deck);

//         Flashcard saved =
//                 flashcardRepository.save(flashcard);

//         return new ResponseEntity<>(
//                 saved,
//                 HttpStatus.CREATED
//         );
//     }

//     @GetMapping("/deck/{deckId}")
//     public ResponseEntity<List<Flashcard>> getFlashcardsByDeck(
//             @PathVariable Long deckId) {

//         return ResponseEntity.ok(
//                 flashcardRepository
//                         .findByStudyDeckIdOrderByOrderIndexAsc(deckId)
//         );
//     }

//     // DELETE A SPECIFIC FLASHCARD
//     @DeleteMapping("/{id}")
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<String> deleteFlashcard(
//             @PathVariable Long id) {

//         Flashcard flashcard = flashcardRepository
//                 .findById(id)
//                 .orElseThrow(() ->
//                         new RuntimeException("Flashcard not found"));

//         flashcardRepository.delete(flashcard);

//         return ResponseEntity.ok(
//                 "Flashcard deleted successfully."
//         );
//     }
// }
// package com.example.demo.controller;

// import com.example.demo.dto.FlashcardRequestDto;
// import com.example.demo.entity.Flashcard;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.repository.FlashcardRepository;
// import com.example.demo.repository.StudyDeckRepository;

// import jakarta.validation.Valid;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/flashcards")
// @CrossOrigin(origins = "*")
// public class FlashcardController {

//     @Autowired
//     private FlashcardRepository flashcardRepository;

//     @Autowired
//     private StudyDeckRepository studyDeckRepository;


//     // CREATE FLASHCARD
//     @PostMapping
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<Flashcard> createFlashcard(
//             @Valid @RequestBody FlashcardRequestDto dto) {

//         StudyDeck deck = studyDeckRepository
//                 .findById(dto.getDeckId())
//                 .orElseThrow(() ->
//                         new RuntimeException("Deck not found"));

//         Flashcard flashcard = new Flashcard();

//         flashcard.setFrontContent(
//                 dto.getFrontContent()
//         );

//         flashcard.setBackContent(
//                 dto.getBackContent()
//         );

//         flashcard.setOrderIndex(
//                 dto.getOrderIndex()
//         );

//         flashcard.setStudyDeck(deck);

//         Flashcard saved =
//                 flashcardRepository.save(flashcard);

//         return new ResponseEntity<>(
//                 saved,
//                 HttpStatus.CREATED
//         );
//     }


//     // GET FLASHCARDS OF A DECK
//     @GetMapping("/deck/{deckId}")
//     public ResponseEntity<List<Flashcard>> getFlashcardsByDeck(
//             @PathVariable Long deckId) {

//         return ResponseEntity.ok(
//                 flashcardRepository
//                         .findByStudyDeckIdOrderByOrderIndexAsc(
//                                 deckId
//                         )
//         );
//     }


//     // DELETE SPECIFIC FLASHCARD
//     @DeleteMapping("/{id}")
//     @PreAuthorize("hasAnyRole('LINGUIST','ADMIN')")
//     public ResponseEntity<String> deleteFlashcard(
//             @PathVariable Long id) {

//         Flashcard flashcard =
//                 flashcardRepository
//                         .findById(id)
//                         .orElseThrow(() ->
//                                 new RuntimeException(
//                                         "Flashcard not found"
//                                 ));

//         flashcardRepository.delete(flashcard);

//         return ResponseEntity.ok(
//                 "Flashcard deleted successfully."
//         );
//     }
// }
// package com.example.demo.controller;

// import com.example.demo.dto.FlashcardRequestDto;
// import com.example.demo.entity.Flashcard;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.repository.FlashcardRepository;
// import com.example.demo.repository.StudyDeckRepository;

// import jakarta.validation.Valid;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import org.springframework.security.access.prepost.PreAuthorize;

// import org.springframework.web.bind.annotation.*;

// import java.util.List;


// @RestController
// @RequestMapping("/api/flashcards")
// @CrossOrigin(origins = "*")
// public class FlashcardController {


//     @Autowired
//     private FlashcardRepository flashcardRepository;


//     @Autowired
//     private StudyDeckRepository studyDeckRepository;


//     // --------------------------------
//     // CREATE FLASHCARD
//     // --------------------------------

//     @PostMapping
//     @PreAuthorize(
//         "hasAnyRole('LINGUIST','ADMIN')"
//     )
//     public ResponseEntity<Flashcard>
//     createFlashcard(
//             @Valid
//             @RequestBody
//             FlashcardRequestDto dto) {


//         StudyDeck deck =
//             studyDeckRepository
//                 .findById(dto.getDeckId())
//                 .orElseThrow(
//                     () -> new RuntimeException(
//                         "Deck not found"
//                     )
//                 );


//         Flashcard flashcard =
//             new Flashcard();


//         flashcard.setFrontContent(
//             dto.getFrontContent()
//         );


//         flashcard.setBackContent(
//             dto.getBackContent()
//         );


//         flashcard.setOrderIndex(
//             dto.getOrderIndex()
//         );


//         flashcard.setPronunciation(
//             dto.getPronunciation()
//         );


//         flashcard.setExampleSentence(
//             dto.getExampleSentence()
//         );


//         flashcard.setStatus(
//             "ACTIVE"
//         );


//         flashcard.setStudyDeck(
//             deck
//         );


//         return new ResponseEntity<>(
//             flashcardRepository.save(
//                 flashcard
//             ),
//             HttpStatus.CREATED
//         );
//     }


//     // --------------------------------
//     // GET FLASHCARDS OF DECK
//     // --------------------------------

//     @GetMapping("/deck/{deckId}")
//     public ResponseEntity<
//         List<Flashcard>
//     > getFlashcardsByDeck(
//             @PathVariable Long deckId) {


//         return ResponseEntity.ok(

//             flashcardRepository
//                 .findByStudyDeckIdOrderByOrderIndexAsc(
//                     deckId
//                 )

//         );
//     }


//     // --------------------------------
//     // DELETE SPECIFIC FLASHCARD
//     // --------------------------------

//     @DeleteMapping("/{id}")
//     @PreAuthorize(
//         "hasAnyRole('LINGUIST','ADMIN')"
//     )
//     public ResponseEntity<String>
//     deleteFlashcard(
//             @PathVariable Long id) {


//         Flashcard flashcard =
//             flashcardRepository
//                 .findById(id)
//                 .orElseThrow(
//                     () -> new RuntimeException(
//                         "Flashcard not found"
//                     )
//                 );


//         flashcardRepository.delete(
//             flashcard
//         );


//         return ResponseEntity.ok(
//             "Flashcard deleted successfully."
//         );
//     }
// }
package com.example.demo.controller;
 
import com.example.demo.dto.FlashcardRequestDto;
import com.example.demo.entity.Flashcard;
import com.example.demo.entity.StudyDeck;
import com.example.demo.repository.FlashcardRepository;
import com.example.demo.repository.StudyDeckRepository;
 
import jakarta.validation.Valid;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
 
import org.springframework.security.access.prepost.PreAuthorize;
 
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
 
@RestController
@RequestMapping("/api/flashcards")
@CrossOrigin(origins = "*")
public class FlashcardController {
 
 
    @Autowired
    private FlashcardRepository flashcardRepository;
 
 
    @Autowired
    private StudyDeckRepository studyDeckRepository;
 
 
    // --------------------------------
    // CREATE FLASHCARD
    // --------------------------------
 
    @PostMapping
    @PreAuthorize(
        "hasAnyRole('LINGUIST','ADMIN')"
    )
    public ResponseEntity<Flashcard>
    createFlashcard(
            @Valid
            @RequestBody
            FlashcardRequestDto dto) {
 
 
        StudyDeck deck =
            studyDeckRepository
                .findById(dto.getDeckId())
                .orElseThrow(
                    () -> new RuntimeException(
                        "Deck not found"
                    )
                );
 
 
        Flashcard flashcard =
            new Flashcard();
 
 
        flashcard.setFrontContent(
            dto.getFrontContent()
        );
 
 
        flashcard.setBackContent(
            dto.getBackContent()
        );
 
 
        flashcard.setOrderIndex(
            dto.getOrderIndex()
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
 
 
        return new ResponseEntity<>(
            flashcardRepository.save(
                flashcard
            ),
            HttpStatus.CREATED
        );
    }
 
 
    // --------------------------------
    // GET FLASHCARDS OF DECK
    // --------------------------------
 
    @GetMapping("/deck/{deckId}")
    public ResponseEntity<
        List<Flashcard>
    > getFlashcardsByDeck(
            @PathVariable Long deckId) {
 
 
        return ResponseEntity.ok(
 
            flashcardRepository
                .findByStudyDeckIdOrderByOrderIndexAsc(
                    deckId
                )
 
        );
    }
 
 
    // --------------------------------
    // UPDATE SPECIFIC FLASHCARD
    // --------------------------------
 
    @PutMapping("/{id}")
    @PreAuthorize(
        "hasAnyRole('LINGUIST','ADMIN')"
    )
    public ResponseEntity<Flashcard>
    updateFlashcard(
            @PathVariable Long id,
            @Valid
            @RequestBody
            FlashcardRequestDto dto) {
 
 
        Flashcard flashcard =
            flashcardRepository
                .findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Flashcard not found"
                    )
                );
 
 
        flashcard.setFrontContent(
            dto.getFrontContent()
        );
 
 
        flashcard.setBackContent(
            dto.getBackContent()
        );
 
 
        if (dto.getOrderIndex() != null) {
            flashcard.setOrderIndex(
                dto.getOrderIndex()
            );
        }
 
 
        flashcard.setPronunciation(
            dto.getPronunciation()
        );
 
 
        flashcard.setExampleSentence(
            dto.getExampleSentence()
        );
 
 
        return ResponseEntity.ok(
            flashcardRepository.save(
                flashcard
            )
        );
    }
 
 
    // --------------------------------
    // DELETE SPECIFIC FLASHCARD
    // --------------------------------
    // Restricted to ADMIN only, per role matrix
    // (Linguist can create/update but not delete).
 
    @DeleteMapping("/{id}")
    @PreAuthorize(
        "hasRole('ADMIN')"
    )
    public ResponseEntity<String>
    deleteFlashcard(
            @PathVariable Long id) {
 
 
        Flashcard flashcard =
            flashcardRepository
                .findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Flashcard not found"
                    )
                );
 
 
        flashcardRepository.delete(
            flashcard
        );
 
 
        return ResponseEntity.ok(
            "Flashcard deleted successfully."
        );
    }
}
