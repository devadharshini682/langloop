import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import languageReducer from "./slices/languageSlice";
import studyReducer from "./slices/studySlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        language: languageReducer,
        study: studyReducer,
    },
});

export default store;