import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  decks: [],
  selectedDeck: null,
  loading: false,
  error: null,
};

const deckSlice = createSlice({
  name: "decks",

  initialState,

  reducers: {
    setDecks: (state, action) => {
      state.decks = action.payload;
      state.loading = false;
      state.error = null;
    },

    setSelectedDeck: (state, action) => {
      state.selectedDeck = action.payload;
    },

    addDeck: (state, action) => {
      state.decks.push(action.payload);
    },

    updateDeck: (state, action) => {
      const index = state.decks.findIndex(
        (deck) => deck.id === action.payload.id
      );

      if (index !== -1) {
        state.decks[index] = action.payload;
      }

      if (
        state.selectedDeck &&
        state.selectedDeck.id === action.payload.id
      ) {
        state.selectedDeck = action.payload;
      }
    },

    removeDeck: (state, action) => {
      state.decks = state.decks.filter(
        (deck) => deck.id !== action.payload
      );

      if (
        state.selectedDeck &&
        state.selectedDeck.id === action.payload
      ) {
        state.selectedDeck = null;
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setDecks,
  setSelectedDeck,
  addDeck,
  updateDeck,
  removeDeck,
  setLoading,
  setError,
} = deckSlice.actions;

export default deckSlice.reducer;