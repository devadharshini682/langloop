
// // import axios from "axios";

// // const api = axios.create({
// //     baseURL: "http://localhost:8080/api",
// //     headers: {
// //         "Content-Type": "application/json",
// //     },
// // });

// // api.interceptors.request.use(
// //     (config) => {
// //         const token = localStorage.getItem("langloop_token");

// //         if (token) {
// //             config.headers.Authorization = `Bearer ${token}`;
// //         }

// //         return config;
// //     },
// //     (error) => Promise.reject(error)
// // );

// // api.interceptors.response.use(
// //     (response) => response,
// //     (error) => {
// //         if (error.response?.status === 401) {
// //             localStorage.removeItem("langloop_token");
// //             localStorage.removeItem("user");
// //         }

// //         return Promise.reject(error);
// //     }
// // );

// // export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL:
//     process.env.REACT_APP_API_URL ||
//     "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token =
//       localStorage.getItem("langloop_token");

//     if (token) {
//       config.headers.Authorization =
//         `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(
//       "API Error:",
//       error?.response?.status,
//       error?.response?.data || error.message
//     );

//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "http://localhost:8080/api",

  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("langloop_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error?.response?.status,
      error?.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default api;