package com.example.demo.dto;

public class SessionResultDto {

    private Long sessionId;
    private int correctAnswers;
    private int incorrectAnswers;
    private double accuracy;

    public SessionResultDto() {
    }

    public SessionResultDto(Long sessionId, int correctAnswers, int incorrectAnswers, double accuracy) {
        this.sessionId = sessionId;
        this.correctAnswers = correctAnswers;
        this.incorrectAnswers = incorrectAnswers;
        this.accuracy = accuracy;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public int getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setIncorrectAnswers(int incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }

    public double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(double accuracy) {
        this.accuracy = accuracy;
    }
}
