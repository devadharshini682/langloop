
import { createSlice } from "@reduxjs/toolkit";
import { normalizeLanguage } from "../../utils/languageUtils";

const token = localStorage.getItem("langloop_token");
const savedUser = localStorage.getItem("langloop_user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: token || null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const payload = action.payload || {};
      const userData = payload.user && typeof payload.user === "object" ? payload.user : payload;

      state.user = userData;
      state.token = payload.token || (userData && userData.token) || null;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      const tokenToSave = state.token;
      if (tokenToSave) {
        localStorage.setItem("langloop_token", tokenToSave);
      }

      const roleToSave = userData?.role || payload?.role;
      if (roleToSave) {
        localStorage.setItem("langloop_role", roleToSave);
      }

      const rawLang = userData?.learningLanguage || userData?.nativeLanguage || userData?.language || payload?.learningLanguage || payload?.nativeLanguage || payload?.language;
      const normalizedLang = normalizeLanguage(rawLang) || "en";
      if (userData && typeof userData === "object") {
        userData.learningLanguage = normalizedLang;
        userData.nativeLanguage = normalizedLang;
        userData.language = normalizedLang;
      }
      localStorage.setItem("langloop_learning_language", normalizedLang);

      localStorage.setItem(
        "langloop_user",
        JSON.stringify(userData)
      );
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("langloop_token");
      localStorage.removeItem("langloop_role");
      localStorage.removeItem("langloop_user");
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem(
        "langloop_user",
        JSON.stringify(action.payload)
      );
    },

    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;

      if (action.payload) {
        localStorage.setItem(
          "langloop_token",
          action.payload
        );
      } else {
        localStorage.removeItem("langloop_token");
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase("auth/login/pending", (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase("auth/login/fulfilled", (state, action) => {
        const payload = action.payload || {};

        state.loading = false;
        state.error = null;

        // T29: Redux must contain the login payload
        state.user = payload;
        state.isAuthenticated = true;

        if (payload.token) {
          state.token = payload.token;

          localStorage.setItem(
            "langloop_token",
            payload.token
          );
        }

        if (payload.role) {
          localStorage.setItem(
            "langloop_role",
            payload.role
          );
        }

        localStorage.setItem(
          "langloop_user",
          JSON.stringify(payload)
        );
      })

      .addCase("auth/login/rejected", (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error =
          action.payload || "Login failed";
      });
  },
});

export const {
  loginSuccess,
  logout,
  setUser,
  setToken,
} = authSlice.actions;

export default authSlice.reducer;

