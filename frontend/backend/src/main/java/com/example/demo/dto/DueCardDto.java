package com.example.demo.dto;

public class DueCardDto {

    private Long id;
    private String front;
    private String back;
    private Double easeFactor;
    private Integer intervalDays;
    private String masteryLevel;

    public DueCardDto() {
    }

    public DueCardDto(
            Long id,
            String front,
            String back,
            Double easeFactor,
            Integer intervalDays,
            String masteryLevel) {

        this.id = id;
        this.front = front;
        this.back = back;
        this.easeFactor = easeFactor;
        this.intervalDays = intervalDays;
        this.masteryLevel = masteryLevel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFront() {
        return front;
    }

    public void setFront(String front) {
        this.front = front;
    }

    public String getBack() {
        return back;
    }

    public void setBack(String back) {
        this.back = back;
    }

    public Double getEaseFactor() {
        return easeFactor;
    }

    public void setEaseFactor(Double easeFactor) {
        this.easeFactor = easeFactor;
    }

    public Integer getIntervalDays() {
        return intervalDays;
    }

    public void setIntervalDays(Integer intervalDays) {
        this.intervalDays = intervalDays;
    }

    public String getMasteryLevel() {
        return masteryLevel;
    }

    public void setMasteryLevel(String masteryLevel) {
        this.masteryLevel = masteryLevel;
    }
}