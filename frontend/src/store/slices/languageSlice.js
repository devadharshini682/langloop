
import { createSlice } from "@reduxjs/toolkit";
import { normalizeLanguage } from "../../utils/languageUtils";

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem("langloop_learning_language");
    if (saved) {
      const normalized = normalizeLanguage(saved);
      if (normalized) return normalized;
    }

    const savedUser = localStorage.getItem("langloop_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      const raw = parsed.learningLanguage || parsed.nativeLanguage || parsed.language || null;
      const normalized = normalizeLanguage(raw);
      if (normalized) return normalized;
    }
  } catch (e) {
    // Ignore JSON parse errors
  }
  return "en";
};

const languageSlice = createSlice({
  name: "language",
  initialState: {
    languages: [],
    selectedLanguage: getInitialLanguage(),
  },
  reducers: {
    setLanguages: (state, action) => {
      state.languages = action.payload || [];
    },

    setSelectedLanguage: (state, action) => {
      const normalized = normalizeLanguage(action.payload);
      state.selectedLanguage = normalized || null;
      if (normalized) {
        localStorage.setItem("langloop_learning_language", normalized);
      } else {
        localStorage.removeItem("langloop_learning_language");
      }
    },
  },
});

export const {
  setLanguages,
  setSelectedLanguage,
} = languageSlice.actions;

export default languageSlice.reducer;