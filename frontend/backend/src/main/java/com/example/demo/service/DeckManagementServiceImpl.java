
// package com.example.demo.service;


// import com.example.demo.dto.DeckRequestDto;
// import com.example.demo.entity.StudyDeck;
// import com.example.demo.entity.SystemUser;

// import com.example.demo.repository.StudyDeckRepository;
// import com.example.demo.repository.SystemUserRepository;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;


// import java.util.List;



// @Service
// public class DeckManagementServiceImpl 
//         implements DeckManagementService {



//     @Autowired
//     private StudyDeckRepository studyDeckRepository;



//     @Autowired
//     private SystemUserRepository systemUserRepository;





//     @Override
//     public List<StudyDeck> getAllDecks() {

//         return studyDeckRepository.findAll();
//     }






//     @Override
//     public StudyDeck getDeckById(Long id) {

//         return studyDeckRepository.findById(id)
//                 .orElse(null);
//     }







//     @Override
//     public StudyDeck createDeck(
//             DeckRequestDto dto,
//             String username) {



//         SystemUser user =
//                 systemUserRepository.findByUsername(username)
//                 .orElseThrow(
//                     () -> new RuntimeException("User not found")
//                 );



//         StudyDeck deck = new StudyDeck();



//         deck.setTitle(dto.getTitle());

//         deck.setDescription(dto.getDescription());

//         deck.setMentorName(dto.getMentorName());

//         deck.setCapacity(dto.getCapacity());



//         // Assign logged-in user as owner
//         deck.setOwner(user);



//         return studyDeckRepository.save(deck);
//     }








//     @Override
//     public StudyDeck updateDeck(
//             Long id,
//             DeckRequestDto dto) {



//         StudyDeck deck =
//                 studyDeckRepository.findById(id)
//                 .orElse(null);



//         if(deck != null) {


//             deck.setTitle(dto.getTitle());

//             deck.setDescription(dto.getDescription());

//             deck.setMentorName(dto.getMentorName());

//             deck.setCapacity(dto.getCapacity());



//             return studyDeckRepository.save(deck);
//         }



//         return null;
//     }








//     @Override
//     public void deleteDeck(Long id) {

//         studyDeckRepository.deleteById(id);

//     }

// }
package com.example.demo.service;

import com.example.demo.dto.DeckRequestDto;

import com.example.demo.entity.Flashcard;
import com.example.demo.entity.StudyDeck;
import com.example.demo.entity.SystemUser;

import com.example.demo.repository.FlashcardRepository;
import com.example.demo.repository.StudyDeckRepository;
import com.example.demo.repository.SystemUserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class DeckManagementServiceImpl
        implements DeckManagementService {


    @Autowired
    private StudyDeckRepository studyDeckRepository;


    @Autowired
    private SystemUserRepository systemUserRepository;


    @Autowired
    private FlashcardRepository flashcardRepository;


    // --------------------------------
    // GET ALL
    // --------------------------------

    @Override
    public List<StudyDeck> getAllDecks() {

        return studyDeckRepository.findAll();

    }


    // --------------------------------
    // GET BY ID
    // --------------------------------

    @Override
    public StudyDeck getDeckById(
            Long id) {

        return studyDeckRepository
            .findById(id)
            .orElse(null);

    }


    // --------------------------------
    // CREATE
    // --------------------------------

    @Override
    public StudyDeck createDeck(
            DeckRequestDto dto,
            String username) {


        SystemUser user =
            systemUserRepository
                .findByUsername(username)
                .orElseThrow(
                    () -> new RuntimeException(
                        "User not found"
                    )
                );


        StudyDeck deck =
            new StudyDeck();


        deck.setTitle(
            dto.getTitle()
        );


        deck.setDescription(
            dto.getDescription()
        );


        deck.setMentorName(
            dto.getMentorName()
        );


        deck.setCapacity(
            dto.getCapacity()
        );


        deck.setLanguage(
            dto.getLanguage() != null && !dto.getLanguage().isBlank()
                ? dto.getLanguage()
                : "en"
        );


        deck.setOwner(
            user
        );


        return studyDeckRepository.save(
            deck
        );
    }


    // --------------------------------
    // UPDATE
    // --------------------------------

    @Override
    public StudyDeck updateDeck(
            Long id,
            DeckRequestDto dto) {


        StudyDeck deck =
            studyDeckRepository
                .findById(id)
                .orElse(null);


        if (deck != null) {

            deck.setTitle(
                dto.getTitle()
            );

            deck.setDescription(
                dto.getDescription()
            );

            deck.setMentorName(
                dto.getMentorName()
            );

            deck.setCapacity(
                dto.getCapacity()
            );


            if (dto.getLanguage() != null && !dto.getLanguage().isBlank()) {
                deck.setLanguage(dto.getLanguage());
            }


            return studyDeckRepository.save(
                deck
            );
        }


        return null;
    }


    // --------------------------------
    // DELETE
    // --------------------------------

    @Override
    public void deleteDeck(
            Long id) {

        studyDeckRepository.deleteById(
            id
        );
    }


    // --------------------------------
    // CLONE
    // --------------------------------

    @Override
    @Transactional
    public StudyDeck cloneDeck(
            Long id,
            String username) {


        // Find original deck
        StudyDeck source =
            studyDeckRepository
                .findById(id)
                .orElseThrow(
                    () -> new RuntimeException(
                        "Deck not found"
                    )
                );


        // Find current logged-in user
        SystemUser owner =
            systemUserRepository
                .findByUsername(username)
                .orElseThrow(
                    () -> new RuntimeException(
                        "User not found"
                    )
                );


        // Create new deck
        StudyDeck copy =
            new StudyDeck();


        copy.setTitle(
            source.getTitle() +
            " (Copy)"
        );


        copy.setDescription(
            source.getDescription()
        );


        copy.setMentorName(
            source.getMentorName()
        );


        copy.setCapacity(
            source.getCapacity()
        );


        copy.setLanguage(
            source.getLanguage()
        );


        copy.setOwner(
            owner
        );


        // Save cloned deck first
        StudyDeck savedCopy =
            studyDeckRepository.save(
                copy
            );


        // Copy every flashcard
        for (
            Flashcard sourceCard :
            source.getFlashcards()
        ) {


            Flashcard copyCard =
                new Flashcard();


            copyCard.setFrontContent(
                sourceCard.getFrontContent()
            );


            copyCard.setBackContent(
                sourceCard.getBackContent()
            );


            copyCard.setOrderIndex(
                sourceCard.getOrderIndex()
            );


            copyCard.setPronunciation(
                sourceCard.getPronunciation()
            );


            copyCard.setExampleSentence(
                sourceCard.getExampleSentence()
            );


            copyCard.setStatus(
                sourceCard.getStatus() == null
                    ? "ACTIVE"
                    : sourceCard.getStatus()
            );


            copyCard.setStudyDeck(
                savedCopy
            );


            flashcardRepository.save(
                copyCard
            );
        }


        return savedCopy;
    }
}
