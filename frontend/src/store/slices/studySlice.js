
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    decks: [],
    cards: [],
    currentCardIndex: 0,
    score: 0,
    loading: false,
};

const studySlice = createSlice({
    name: "study",

    initialState,

    reducers: {
        setDecks: (state, action) => {
            state.decks = action.payload || [];
        },

        setCards: (state, action) => {
            state.cards = action.payload || [];
            state.currentCardIndex = 0;
            state.score = 0;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        increaseScore: (state) => {
            state.score += 1;
        },

        nextCard: (state) => {
            if (
                state.currentCardIndex <
                state.cards.length - 1
            ) {
                state.currentCardIndex += 1;
            }
        },

        resetStudy: (state) => {
            state.cards = [];
            state.currentCardIndex = 0;
            state.score = 0;
            state.loading = false;
        },
    },
});

export const {
    setDecks,
    setCards,
    setLoading,
    increaseScore,
    nextCard,
    resetStudy,
} = studySlice.actions;

export default studySlice.reducer;

