// import api from "./api";

// const studyService = {
//   getDueCards: (userId) => {
//     return api.get(`/study/due?userId=${userId}`);
//   },

//   startSession: (data) => {
//     return api.post("/study/session/start", data);
//   },

//   submitAnswer: (data) => {
//     return api.post("/study/session/answer", data);
//   },

//   completeSession: (data) => {
//     return api.post("/study/session/complete", data);
//   },

//   getProgress: (userId) => {
//     return api.get(`/analytics/progress?userId=${userId}`);
//   },

//   getLinguistAnalytics: (userId) => {
//     return api.get(`/analytics/linguist?userId=${userId}`);
//   },
// };

// export default studyService;
import api from "./api";

const studyService = {
  getDueCards: (userId) => {
    return api.get(`/study/due?userId=${userId}`);
  },

  startSession: (data) => {
    return api.post("/study/session/start", data);
  },

  submitAnswer: (data) => {
    return api.post("/study/session/answer", data);
  },

  completeSession: (data) => {
    return api.post("/study/session/complete", data);
  },

  getProgress: (userId) => {
    return api.get(`/analytics/progress?userId=${userId}`);
  },

  getAnalyticsProgress: () => {
    return api.get("/analytics/progress");
  },

  getLanguages: () => {
    return api.get("/languages");
  },

  getLinguistAnalytics: (userId) => {
    return api.get(`/analytics/linguist?userId=${userId}`);
  },
};

export default studyService;