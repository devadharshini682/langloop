import api from "./api";

const deckService = {
  getDecks: () => {
    return api.get("/decks");
  },

  getDeckById: (id) => {
    return api.get(`/decks/${id}`);
  },

  createDeck: (deck) => {
    return api.post("/decks", deck);
  },

  updateDeck: (id, deck) => {
    return api.put(`/decks/${id}`, deck);
  },

  deleteDeck: (id) => {
    return api.delete(`/decks/${id}`);
  },

  cloneDeck: (id) => {
    return api.post(`/decks/${id}/clone`);
  },
};

export default deckService;