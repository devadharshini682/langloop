package com.example.demo.dto;

public class ProgressResponseDto {

    private int totalCards;
    private int masteredCards;
    private double progressPercentage;

    public ProgressResponseDto() {
    }

    public ProgressResponseDto(int totalCards, int masteredCards, double progressPercentage) {
        this.totalCards = totalCards;
        this.masteredCards = masteredCards;
        this.progressPercentage = progressPercentage;
    }

    public int getTotalCards() {
        return totalCards;
    }

    public void setTotalCards(int totalCards) {
        this.totalCards = totalCards;
    }

    public int getMasteredCards() {
        return masteredCards;
    }

    public void setMasteredCards(int masteredCards) {
        this.masteredCards = masteredCards;
    }

    public double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(double progressPercentage) {
        this.progressPercentage = progressPercentage;
    }
}