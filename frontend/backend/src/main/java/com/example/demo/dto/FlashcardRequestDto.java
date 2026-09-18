// package com.example.demo.dto;

// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;

// public class FlashcardRequestDto {

//     @NotBlank
//     private String frontContent;

//     @NotBlank
//     private String backContent;

//     @NotNull
//     private Integer orderIndex;

//     @NotNull
//     private Long deckId;

//     public FlashcardRequestDto() {
//     }

//     public String getFrontContent() {
//         return frontContent;
//     }

//     public void setFrontContent(String frontContent) {
//         this.frontContent = frontContent;
//     }

//     public String getBackContent() {
//         return backContent;
//     }

//     public void setBackContent(String backContent) {
//         this.backContent = backContent;
//     }

//     public Integer getOrderIndex() {
//         return orderIndex;
//     }

//     public void setOrderIndex(Integer orderIndex) {
//         this.orderIndex = orderIndex;
//     }

//     public Long getDeckId() {
//         return deckId;
//     }

//     public void setDeckId(Long deckId) {
//         this.deckId = deckId;
//     }
// }
package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FlashcardRequestDto {

    @NotBlank
    @JsonAlias({
        "frontText",
        "front"
    })
    private String frontContent;


    @NotBlank
    @JsonAlias({
        "backText",
        "back"
    })
    private String backContent;


    @NotNull
    private Integer orderIndex;


    @NotNull
    private Long deckId;


    private String pronunciation;


    private String exampleSentence;


    public FlashcardRequestDto() {
    }


    public String getFrontContent() {
        return frontContent;
    }


    public void setFrontContent(
            String frontContent) {

        this.frontContent =
            frontContent;
    }


    public String getBackContent() {
        return backContent;
    }


    public void setBackContent(
            String backContent) {

        this.backContent =
            backContent;
    }


    public Integer getOrderIndex() {
        return orderIndex;
    }


    public void setOrderIndex(
            Integer orderIndex) {

        this.orderIndex =
            orderIndex;
    }


    public Long getDeckId() {
        return deckId;
    }


    public void setDeckId(
            Long deckId) {

        this.deckId = deckId;
    }


    public String getPronunciation() {
        return pronunciation;
    }


    public void setPronunciation(
            String pronunciation) {

        this.pronunciation =
            pronunciation;
    }


    public String getExampleSentence() {
        return exampleSentence;
    }


    public void setExampleSentence(
            String exampleSentence) {

        this.exampleSentence =
            exampleSentence;
    }
}