// import api from "./api";

// const getStoredUser = () => {
//   try {
//     const raw =
//       localStorage.getItem("langloop_user") ||
//       localStorage.getItem("user");

//     return raw ? JSON.parse(raw) : null;
//   } catch (error) {
//     console.error("Unable to read stored user:", error);
//     return null;
//   }
// };

// export const getCurrentUserId = (user = null) => {
//   const storedUser = getStoredUser();

//   return (
//     user?.id ??
//     user?.userId ??
//     user?.user_id ??
//     storedUser?.id ??
//     storedUser?.userId ??
//     storedUser?.user_id ??
//     null
//   );
// };

// const unwrapObject = (data) => {
//   if (
//     data?.data &&
//     typeof data.data === "object" &&
//     !Array.isArray(data.data)
//   ) {
//     return data.data;
//   }

//   return data || {};
// };

// const unwrapList = (data, keys = []) => {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   for (const key of keys) {
//     if (Array.isArray(data?.[key])) {
//       return data[key];
//     }
//   }

//   if (Array.isArray(data?.data)) {
//     return data.data;
//   }

//   return [];
// };

// export const getProgress = async (user = null) => {
//   const userId = getCurrentUserId(user);

//   if (!userId) {
//     throw new Error("No logged-in user ID found.");
//   }

//   const response = await api.get(
//     `/analytics/progress?userId=${encodeURIComponent(userId)}`
//   );

//   const data = unwrapObject(response.data);

//   const totalCards = Math.max(
//     Number(
//       data.totalCards ??
//         data.totalFlashcards ??
//         data.total ??
//         0
//     ) || 0,
//     0
//   );

//   const masteredCards = Math.min(
//     Math.max(
//       Number(
//         data.masteredCards ??
//           data.mastered ??
//           0
//       ) || 0,
//       0
//     ),
//     totalCards
//   );

//   let progressPercentage = Number(
//     data.progressPercentage ??
//       data.percentage ??
//       data.progress ??
//       NaN
//   );

//   if (
//     !Number.isFinite(progressPercentage) &&
//     totalCards > 0
//   ) {
//     progressPercentage =
//       (masteredCards / totalCards) * 100;
//   }

//   if (!Number.isFinite(progressPercentage)) {
//     progressPercentage = 0;
//   }

//   return {
//     totalCards,
//     masteredCards,
//     progressPercentage: Math.min(
//       Math.max(progressPercentage, 0),
//       100
//     ),
//   };
// };

// export const getDueCards = async (user = null) => {
//   const userId = getCurrentUserId(user);

//   if (!userId) {
//     throw new Error("No logged-in user ID found.");
//   }

//   const response = await api.get(
//     `/study/due?userId=${encodeURIComponent(userId)}`
//   );

//   return unwrapList(response.data, [
//     "cards",
//     "flashcards",
//     "items",
//   ]);
// };

// export const getDeckCards = async (deckId) => {
//   if (!deckId) {
//     return [];
//   }

//   const response = await api.get(
//     `/flashcards/deck/${deckId}`
//   );

//   return unwrapList(response.data, [
//     "cards",
//     "flashcards",
//     "items",
//   ]);
// };

// export const getAllDecks = async () => {
//   const response = await api.get("/decks");

//   return unwrapList(response.data, [
//     "decks",
//     "items",
//   ]);
// };
// import api from "./api";

// /*
//  * Get the currently stored user.
//  *
//  * Login.jsx stores the user in both:
//  *   langloop_user
//  *   user
//  */
// const getStoredUser = () => {
//   try {
//     const raw =
//       localStorage.getItem("langloop_user") ||
//       localStorage.getItem("user");

//     return raw ? JSON.parse(raw) : null;
//   } catch (error) {
//     console.error("Unable to read stored user:", error);
//     return null;
//   }
// };


// /*
//  * Get numeric user ID when one is available.
//  *
//  * IMPORTANT:
//  * The current login response contains:
//  *   token
//  *   username
//  *   role
//  *
//  * It does NOT contain a numeric id.
//  *
//  * Therefore this function returns null when an id
//  * is not available instead of throwing an error.
//  */
// export const getCurrentUserId = (user = null) => {
//   const storedUser = getStoredUser();

//   return (
//     user?.id ??
//     user?.userId ??
//     user?.user_id ??
//     storedUser?.id ??
//     storedUser?.userId ??
//     storedUser?.user_id ??
//     null
//   );
// };


// /*
//  * Convert different possible backend response
//  * formats into one object.
//  */
// const unwrapObject = (data) => {
//   if (
//     data?.data &&
//     typeof data.data === "object" &&
//     !Array.isArray(data.data)
//   ) {
//     return data.data;
//   }

//   return data || {};
// };


// /*
//  * Convert different possible backend list
//  * response formats into an array.
//  */
// const unwrapList = (data, keys = []) => {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   for (const key of keys) {
//     if (Array.isArray(data?.[key])) {
//       return data[key];
//     }
//   }

//   if (Array.isArray(data?.data)) {
//     return data.data;
//   }

//   return [];
// };


// /*
//  * =========================================================
//  * PROGRESS
//  * =========================================================
//  *
//  * Backend endpoint:
//  *
//  * GET /api/analytics/progress
//  *
//  * This endpoint does NOT require userId.
//  */
// export const getProgress = async () => {
//   const response = await api.get("/analytics/progress");

//   const data = unwrapObject(response.data);

//   const totalCards = Math.max(
//     Number(
//       data.totalCards ??
//         data.totalFlashcards ??
//         data.total ??
//         0
//     ) || 0,
//     0
//   );

//   const masteredCards = Math.min(
//     Math.max(
//       Number(
//         data.masteredCards ??
//           data.mastered ??
//           0
//       ) || 0,
//       0
//     ),
//     totalCards
//   );

//   let progressPercentage = Number(
//     data.progressPercentage ??
//       data.percentage ??
//       data.progress ??
//       NaN
//   );

//   /*
//    * If backend doesn't provide percentage,
//    * calculate it here.
//    */
//   if (
//     !Number.isFinite(progressPercentage) &&
//     totalCards > 0
//   ) {
//     progressPercentage =
//       (masteredCards / totalCards) * 100;
//   }

//   if (!Number.isFinite(progressPercentage)) {
//     progressPercentage = 0;
//   }

//   return {
//     totalCards,
//     masteredCards,
//     progressPercentage: Math.min(
//       Math.max(progressPercentage, 0),
//       100
//     ),
//   };
// };


// /*
//  * =========================================================
//  * DUE CARDS
//  * =========================================================
//  *
//  * Backend endpoint:
//  *
//  * GET /api/study/due?userId=...
//  *
//  * This endpoint DOES require a numeric userId.
//  *
//  * The current login response doesn't provide one,
//  * so return an empty array instead of breaking
//  * the entire Progress/Mastery page.
//  */
// export const getDueCards = async (user = null) => {
//   const userId = getCurrentUserId(user);

//   if (!userId) {
//     console.warn(
//       "No numeric user ID available. Due cards cannot be loaded."
//     );

//     return [];
//   }

//   try {
//     const response = await api.get(
//       `/study/due?userId=${encodeURIComponent(userId)}`
//     );

//     return unwrapList(response.data, [
//       "cards",
//       "flashcards",
//       "items",
//     ]);
//   } catch (error) {
//     console.error(
//       "Failed to load due cards:",
//       error
//     );

//     return [];
//   }
// };


// /*
//  * =========================================================
//  * DECK CARDS
//  * =========================================================
//  */
// export const getDeckCards = async (deckId) => {
//   if (!deckId) {
//     return [];
//   }

//   try {
//     const response = await api.get(
//       `/flashcards/deck/${deckId}`
//     );

//     return unwrapList(response.data, [
//       "cards",
//       "flashcards",
//       "items",
//     ]);
//   } catch (error) {
//     console.error(
//       `Failed to load cards for deck ${deckId}:`,
//       error
//     );

//     return [];
//   }
// };


// /*
//  * =========================================================
//  * ALL DECKS
//  * =========================================================
//  */
// export const getAllDecks = async () => {
//   try {
//     const response = await api.get("/decks");

//     return unwrapList(response.data, [
//       "decks",
//       "items",
//     ]);
//   } catch (error) {
//     console.error(
//       "Failed to load decks:",
//       error
//     );

//     return [];
//   }
// };
// import api from "./api";

// /*
//  * Gets the logged-in user's numeric ID when the frontend already has one.
//  * The backend's AuthResponse does not currently return an ID, so this
//  * function safely returns null when it is unavailable.
//  */
// export const getUserId = (user) => {
//   const possibleIds = [
//     user?.id,
//     user?.userId,
//     user?.userID,
//     user?.systemUserId,
//   ];

//   for (const value of possibleIds) {
//     if (value !== undefined && value !== null && value !== "") {
//       const numberValue = Number(value);

//       if (Number.isFinite(numberValue)) {
//         return numberValue;
//       }
//     }
//   }

//   return null;
// };

// // Keep compatibility with components that use the old function name.
// export const getCurrentUserId = getUserId;

// const unwrapObject = (data) => {
//   if (
//     data?.data &&
//     typeof data.data === "object" &&
//     !Array.isArray(data.data)
//   ) {
//     return data.data;
//   }

//   return data && typeof data === "object" ? data : {};
// };

// const unwrapList = (data, keys = []) => {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   for (const key of keys) {
//     if (Array.isArray(data?.[key])) {
//       return data[key];
//     }
//   }

//   if (Array.isArray(data?.data)) {
//     return data.data;
//   }

//   return [];
// };

// /*
//  * Backend endpoint:
//  * GET /api/analytics/progress
//  *
//  * This endpoint currently calculates the available global retention
//  * statistics, so do not require a userId here.
//  */
// export const getProgress = async () => {
//   const response = await api.get("/analytics/progress");

//   const data = unwrapObject(response?.data);

//   return {
//     totalCards: Number(
//       data.totalCards ??
//         data.totalFlashcards ??
//         data.total ??
//         0
//     ),

//     masteredCards: Number(
//       data.masteredCards ??
//         data.mastered ??
//         0
//     ),

//     progressPercentage: Number(
//       data.progressPercentage ??
//         data.percentage ??
//         data.progress ??
//         0
//     ),
//   };
// };

// /*
//  * Backend endpoint:
//  * GET /api/study/due?userId={id}
//  *
//  * This endpoint requires the numeric SystemUser ID.
//  * If the login response does not contain that ID, we return an empty
//  * list instead of sending an invalid request.
//  */
// export const getDueCards = async (user) => {
//   const userId = getUserId(user);

//   if (userId === null) {
//     return [];
//   }

//   try {
//     const response = await api.get(
//       `/study/due?userId=${encodeURIComponent(userId)}`
//     );

//     return unwrapList(response?.data, [
//       "cards",
//       "flashcards",
//       "items",
//     ]);
//   } catch (error) {
//     console.error("Failed to load due cards:", error);
//     return [];
//   }
// };
// const DUE_STORAGE_KEY = "langloop_due_cards";
// const MASTERED_STORAGE_KEY = "langloop_mastered_cards";

// /* =========================================================
//    LOCAL CARD STATUS
//    ========================================================= */

// const readIdSet = (key) => {
//   try {
//     const value = JSON.parse(localStorage.getItem(key) || "[]");

//     return new Set(
//       Array.isArray(value)
//         ? value.map(String)
//         : []
//     );
//   } catch {
//     return new Set();
//   }
// };

// const writeIdSet = (key, ids) => {
//   localStorage.setItem(
//     key,
//     JSON.stringify([...ids])
//   );
// };

// /* =========================================================
//    GET LOCAL STATUS
//    ========================================================= */

// export const getLocalDueIds = () => {
//   return readIdSet(DUE_STORAGE_KEY);
// };

// export const getLocalMasteredIds = () => {
//   return readIdSet(MASTERED_STORAGE_KEY);
// };

// /* =========================================================
//    MARK CARD AS DUE
//    ========================================================= */

// export const markCardDue = (cardId) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return;
//   }

//   const id = String(cardId);

//   const due = readIdSet(DUE_STORAGE_KEY);
//   const mastered = readIdSet(
//     MASTERED_STORAGE_KEY
//   );

//   // A card that becomes due is no longer mastered.
//   mastered.delete(id);

//   due.add(id);

//   writeIdSet(DUE_STORAGE_KEY, due);
//   writeIdSet(
//     MASTERED_STORAGE_KEY,
//     mastered
//   );
// };

// /* =========================================================
//    MARK CARD AS MASTERED
//    ========================================================= */

// export const markCardMastered = (cardId) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return;
//   }

//   const id = String(cardId);

//   const due = readIdSet(DUE_STORAGE_KEY);
//   const mastered = readIdSet(
//     MASTERED_STORAGE_KEY
//   );

//   // A mastered card should not remain due.
//   due.delete(id);

//   mastered.add(id);

//   writeIdSet(DUE_STORAGE_KEY, due);
//   writeIdSet(
//     MASTERED_STORAGE_KEY,
//     mastered
//   );
// };

// /* =========================================================
//    MARK CARD AS LEARNING
//    ========================================================= */

// export const markCardLearning = (cardId) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return;
//   }

//   const id = String(cardId);

//   const due = readIdSet(DUE_STORAGE_KEY);
//   const mastered = readIdSet(
//     MASTERED_STORAGE_KEY
//   );

//   due.delete(id);
//   mastered.delete(id);

//   writeIdSet(DUE_STORAGE_KEY, due);
//   writeIdSet(
//     MASTERED_STORAGE_KEY,
//     mastered
//   );
// };

// /* =========================================================
//    STORED USER
//    ========================================================= */

// const getStoredUser = () => {
//   try {
//     const raw =
//       localStorage.getItem(
//         "langloop_user"
//       ) ||
//       localStorage.getItem("user");

//     return raw
//       ? JSON.parse(raw)
//       : null;
//   } catch (error) {
//     console.error(
//       "Unable to read stored user:",
//       error
//     );

//     return null;
//   }
// };

// /* =========================================================
//    USER ID
//    ========================================================= */

// export const getCurrentUserId = (
//   user = null
// ) => {
//   const storedUser = getStoredUser();

//   const candidates = [
//     user?.id,
//     user?.userId,
//     user?.user_id,
//     user?.systemUserId,

//     storedUser?.id,
//     storedUser?.userId,
//     storedUser?.user_id,
//     storedUser?.systemUserId,
//   ];

//   for (const value of candidates) {
//     const number = Number(value);

//     if (
//       Number.isFinite(number) &&
//       number > 0
//     ) {
//       return number;
//     }
//   }

//   return null;
// };

// /* =========================================================
//    RESOLVE USER ID
//    ========================================================= */

// export const resolveUserId = async (
//   user = null
// ) => {
//   const existingId =
//     getCurrentUserId(user);

//   if (existingId !== null) {
//     return existingId;
//   }

//   /*
//    * The backend login response does not expose
//    * the numeric SystemUser ID.
//    *
//    * Therefore we try to discover it from
//    * deck ownership information when available.
//    */

//   const username = String(
//     user?.username ||
//       getStoredUser()?.username ||
//       ""
//   )
//     .trim()
//     .toLowerCase();

//   if (!username) {
//     return null;
//   }

//   try {
//     const response = await fetch(
//       "/api/decks",
//       {
//         headers: {
//           Authorization: `Bearer ${
//             localStorage.getItem(
//               "token"
//             ) || ""
//           }`,
//         },
//       }
//     );

//     if (!response.ok) {
//       return null;
//     }

//     const data =
//       await response.json();

//     const decks = unwrapList(
//       data,
//       [
//         "decks",
//         "items",
//       ]
//     );

//     for (const deck of decks) {
//       const owner =
//         deck?.owner ||
//         deck?.createdBy ||
//         deck?.mentor ||
//         null;

//       const ownerUsername =
//         String(
//           owner?.username ||
//             deck?.mentorName ||
//             ""
//         )
//           .trim()
//           .toLowerCase();

//       if (
//         ownerUsername === username
//       ) {
//         const id = Number(
//           owner?.id ??
//             owner?.userId ??
//             owner?.user_id
//         );

//         if (
//           Number.isFinite(id) &&
//           id > 0
//         ) {
//           const updatedUser = {
//             ...(user || {}),
//             id,
//             userId: id,
//           };

//           localStorage.setItem(
//             "langloop_user",
//             JSON.stringify(
//               updatedUser
//             )
//           );

//           localStorage.setItem(
//             "user",
//             JSON.stringify(
//               updatedUser
//             )
//           );

//           return id;
//         }
//       }
//     }
//   } catch (error) {
//     console.warn(
//       "Unable to resolve user ID:",
//       error
//     );
//   }

//   return null;
// };

// /* =========================================================
//    UNWRAP OBJECT
//    ========================================================= */

// const unwrapObject = (data) => {
//   if (
//     data?.data &&
//     typeof data.data === "object" &&
//     !Array.isArray(data.data)
//   ) {
//     return data.data;
//   }

//   return data || {};
// };

// /* =========================================================
//    UNWRAP LIST
//    ========================================================= */

// const unwrapList = (
//   data,
//   keys = []
// ) => {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   for (const key of keys) {
//     if (
//       Array.isArray(data?.[key])
//     ) {
//       return data[key];
//     }
//   }

//   if (
//     Array.isArray(data?.data)
//   ) {
//     return data.data;
//   }

//   return [];
// };

// /* =========================================================
//    API HELPER
//    ========================================================= */

// const apiRequest = async (
//   url,
//   options = {}
// ) => {
//   const token =
//     localStorage.getItem(
//       "token"
//     ) ||
//     localStorage.getItem(
//       "langloop_token"
//     );

//   const response = await fetch(
//     url,
//     {
//       ...options,
//       headers: {
//         "Content-Type":
//           "application/json",

//         ...(token
//           ? {
//               Authorization: `Bearer ${token}`,
//             }
//           : {}),

//         ...(options.headers || {}),
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(
//       `Request failed: ${response.status}`
//     );
//   }

//   const text =
//     await response.text();

//   if (!text) {
//     return null;
//   }

//   try {
//     return JSON.parse(text);
//   } catch {
//     return text;
//   }
// };

// /* =========================================================
//    GET PROGRESS
//    ========================================================= */

// export const getProgress = async (
//   user = null
// ) => {
//   let backendProgress = {
//     totalCards: 0,
//     masteredCards: 0,
//     progressPercentage: 0,
//   };

//   try {
//     const data =
//       await apiRequest(
//         "/api/analytics/progress"
//       );

//     const progress =
//       unwrapObject(data);

//     const totalCards = Math.max(
//       Number(
//         progress.totalCards ??
//           progress.totalFlashcards ??
//           progress.total ??
//           0
//       ) || 0,
//       0
//     );

//     const backendMastered =
//       Math.max(
//         Number(
//           progress.masteredCards ??
//             progress.mastered ??
//             0
//         ) || 0,
//         0
//       );

//     let progressPercentage =
//       Number(
//         progress.progressPercentage ??
//           progress.percentage ??
//           progress.progress ??
//           NaN
//       );

//     if (
//       !Number.isFinite(
//         progressPercentage
//       ) &&
//       totalCards > 0
//     ) {
//       progressPercentage =
//         (backendMastered /
//           totalCards) *
//         100;
//     }

//     if (
//       !Number.isFinite(
//         progressPercentage
//       )
//     ) {
//       progressPercentage = 0;
//     }

//     backendProgress = {
//       totalCards,
//       masteredCards:
//         Math.min(
//           backendMastered,
//           totalCards
//         ),
//       progressPercentage:
//         Math.min(
//           Math.max(
//             progressPercentage,
//             0
//           ),
//           100
//         ),
//     };
//   } catch (error) {
//     console.warn(
//       "Unable to load backend progress:",
//       error
//     );
//   }

//   /*
//    * Frontend mastered cards are used as an
//    * additional source because the current backend
//    * does not expose a mastery-update endpoint.
//    */

//   const localMastered =
//     getLocalMasteredIds();

//   const localDue =
//     getLocalDueIds();

//   const masteredCards = Math.min(
//     Math.max(
//       Math.max(
//         backendProgress.masteredCards,
//         localMastered.size
//       ),
//       0
//     ),
//     backendProgress.totalCards ||
//       Number.MAX_SAFE_INTEGER
//   );

//   const progressPercentage =
//     backendProgress.totalCards > 0
//       ? Math.min(
//           Math.max(
//             (masteredCards /
//               backendProgress.totalCards) *
//               100,
//             0
//           ),
//           100
//         )
//       : 0;

//   return {
//     totalCards:
//       backendProgress.totalCards,

//     masteredCards,

//     progressPercentage,

//     dueCards:
//       localDue.size,
//   };
// };

// /* =========================================================
//    GET DUE CARDS
//    ========================================================= */

// export const getDueCards = async (
//   user = null
// ) => {
//   let backendCards = [];

//   try {
//     const userId =
//       await resolveUserId(user);

//     if (userId !== null) {
//       const data =
//         await apiRequest(
//           `/api/study/due?userId=${encodeURIComponent(
//             userId
//           )}`
//         );

//       backendCards =
//         unwrapList(
//           data,
//           [
//             "cards",
//             "flashcards",
//             "items",
//           ]
//         );
//     }
//   } catch (error) {
//     console.warn(
//       "Unable to load backend due cards:",
//       error
//     );
//   }

//   /*
//    * Local due IDs are the frontend fallback.
//    *
//    * If backend cards exist, use them.
//    * Otherwise the calling component can use
//    * locally tracked card IDs.
//    */

//   return backendCards;
// };

// /* =========================================================
//    GET DECK CARDS
//    ========================================================= */

// export const getDeckCards = async (
//   deckId
// ) => {
//   if (
//     deckId === null ||
//     deckId === undefined ||
//     deckId === ""
//   ) {
//     return [];
//   }

//   try {
//     const data =
//       await apiRequest(
//         `/api/flashcards/deck/${encodeURIComponent(
//           deckId
//         )}`
//       );

//     return unwrapList(
//       data,
//       [
//         "cards",
//         "flashcards",
//         "items",
//       ]
//     );
//   } catch (error) {
//     console.warn(
//       "Unable to load deck cards:",
//       error
//     );

//     return [];
//   }
// };

// /* =========================================================
//    GET ALL DECKS
//    ========================================================= */

// export const getAllDecks = async () => {
//   try {
//     const data =
//       await apiRequest(
//         "/api/decks"
//       );

//     return unwrapList(
//       data,
//       [
//         "decks",
//         "items",
//       ]
//     );
//   } catch (error) {
//     console.warn(
//       "Unable to load decks:",
//       error
//     );

//     return [];
//   }
// };

// /* =========================================================
//    CREATE DUE RETENTION METRIC
//    ========================================================= */

// export const createDueMetric = async (
//   user,
//   cardId
// ) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return null;
//   }

//   /*
//    * Always keep the frontend due state.
//    * This allows the UI to work even when the
//    * backend user ID is unavailable.
//    */

//   markCardDue(cardId);

//   try {
//     const userId =
//       await resolveUserId(user);

//     if (userId === null) {
//       return null;
//     }

//     const data =
//       await apiRequest(
//         `/api/retention/due?userId=${encodeURIComponent(
//           userId
//         )}&cardId=${encodeURIComponent(
//           Number(cardId)
//         )}`,
//         {
//           method: "POST",
//         }
//       );

//     return data;
//   } catch (error) {
//     console.warn(
//       "Retention metric could not be created:",
//       error
//     );

//     return null;
//   }
// };

// /* =========================================================
//    CARD STATUS HELPERS
//    ========================================================= */

// export const setCardStatus = (
//   cardId,
//   status
// ) => {
//   if (
//     status === "MASTERED"
//   ) {
//     markCardMastered(
//       cardId
//     );

//     return;
//   }

//   if (
//     status === "DUE"
//   ) {
//     markCardDue(cardId);

//     return;
//   }

//   if (
//     status === "LEARNING"
//   ) {
//     markCardLearning(
//       cardId
//     );
//   }
// };

// /* =========================================================
//    CLEAR LOCAL CARD STATUS
//    ========================================================= */

// export const clearLocalCardStatus = (
//   cardId
// ) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return;
//   }

//   const id = String(cardId);

//   const due =
//     readIdSet(
//       DUE_STORAGE_KEY
//     );

//   const mastered =
//     readIdSet(
//       MASTERED_STORAGE_KEY
//     );

//   due.delete(id);
//   mastered.delete(id);

//   writeIdSet(
//     DUE_STORAGE_KEY,
//     due
//   );

//   writeIdSet(
//     MASTERED_STORAGE_KEY,
//     mastered
//   );
// };

// /* =========================================================
//    CLEAR ALL LOCAL STATUS
//    ========================================================= */

// export const clearAllLocalCardStatus =
//   () => {
//     localStorage.removeItem(
//       DUE_STORAGE_KEY
//     );

//     localStorage.removeItem(
//       MASTERED_STORAGE_KEY
//     );
//   };


// src/services/analyticsService.js

// import api from "./api";

// /* =========================================================
//    LOCAL STORAGE KEYS
//    ========================================================= */

// const DUE_STORAGE_KEY =
//   "langloop_due_cards";

// const MASTERED_STORAGE_KEY =
//   "langloop_mastered_cards";


// /* =========================================================
//    GET STORED USER
//    ========================================================= */

// const getStoredUser = () => {
//   try {
//     const raw =
//       localStorage.getItem(
//         "langloop_user"
//       ) ||
//       localStorage.getItem(
//         "user"
//       );

//     if (!raw) {
//       return null;
//     }

//     return JSON.parse(raw);
//   } catch (error) {
//     console.warn(
//       "Unable to read stored user:",
//       error
//     );

//     return null;
//   }
// };


// /* =========================================================
//    GET TOKEN
//    ========================================================= */

// const getToken = () => {
//   return (
//     localStorage.getItem(
//       "token"
//     ) ||
//     localStorage.getItem(
//       "langloop_token"
//     ) ||
//     localStorage.getItem(
//       "accessToken"
//     ) ||
//     null
//   );
// };


// /* =========================================================
//    DECODE JWT
//    ========================================================= */

// const decodeJwtPayload = (
//   token
// ) => {
//   try {
//     if (!token) {
//       return null;
//     }

//     const parts =
//       token.split(".");

//     if (
//       parts.length !== 3
//     ) {
//       return null;
//     }

//     const base64 =
//       parts[1]
//         .replace(/-/g, "+")
//         .replace(/_/g, "/");

//     const padded =
//       base64.padEnd(
//         Math.ceil(
//           base64.length / 4
//         ) * 4,
//         "="
//       );

//     return JSON.parse(
//       atob(padded)
//     );
//   } catch (error) {
//     console.warn(
//       "Unable to decode token:",
//       error
//     );

//     return null;
//   }
// };


// /* =========================================================
//    GET CURRENT USER ID
//    ========================================================= */

// export const getCurrentUserId =
//   (user = null) => {
//     const storedUser =
//       getStoredUser();

//     const token =
//       getToken();

//     const tokenPayload =
//       decodeJwtPayload(
//         token
//       );

//     const possibleIds = [
//       user?.id,
//       user?.userId,
//       user?.user_id,
//       user?.userID,
//       user?.systemUserId,

//       storedUser?.id,
//       storedUser?.userId,
//       storedUser?.user_id,
//       storedUser?.userID,
//       storedUser?.systemUserId,

//       tokenPayload?.id,
//       tokenPayload?.userId,
//       tokenPayload?.user_id,
//       tokenPayload?.userID,
//       tokenPayload?.systemUserId,
//       tokenPayload?.sub,
//     ];

//     for (
//       const value of possibleIds
//     ) {
//       if (
//         value !== undefined &&
//         value !== null &&
//         value !== ""
//       ) {
//         const numberValue =
//           Number(value);

//         if (
//           Number.isFinite(
//             numberValue
//           ) &&
//           numberValue > 0
//         ) {
//           return numberValue;
//         }
//       }
//     }

//     return null;
//   };


// /* =========================================================
//    GET USER ID
//    =========================================================

//    Compatibility export required by:

//    Mastery.jsx
//    Progress.jsx
//    ========================================================= */

// export const getUserId =
//   (user = null) => {
//     return getCurrentUserId(
//       user
//     );
//   };


// /* =========================================================
//    RESOLVE USER ID
//    ========================================================= */

// export const resolveUserId =
//   async (user = null) => {
//     const existingId =
//       getUserId(user);

//     if (
//       existingId !== null
//     ) {
//       return existingId;
//     }

//     const storedUser =
//       getStoredUser();

//     const username =
//       String(
//         user?.username ||
//         storedUser?.username ||
//         ""
//       )
//         .trim()
//         .toLowerCase();

//     if (!username) {
//       return null;
//     }

//     try {
//       const response =
//         await api.get(
//           "/decks"
//         );

//       const decks =
//         unwrapList(
//           response?.data,
//           [
//             "decks",
//             "items",
//           ]
//         );

//       for (
//         const deck of decks
//       ) {
//         const owner =
//           deck?.owner ||
//           deck?.createdBy ||
//           deck?.createdByUser ||
//           deck?.mentor ||
//           null;

//         const ownerUsername =
//           String(
//             owner?.username ||
//             owner?.userName ||
//             deck?.mentorName ||
//             deck?.ownerUsername ||
//             ""
//           )
//             .trim()
//             .toLowerCase();

//         if (
//           ownerUsername !==
//           username
//         ) {
//           continue;
//         }

//         const id =
//           Number(
//             owner?.id ??
//             owner?.userId ??
//             owner?.user_id ??
//             deck?.ownerId ??
//             deck?.createdById ??
//             deck?.mentorId
//           );

//         if (
//           Number.isFinite(id) &&
//           id > 0
//         ) {
//           const updatedUser = {
//             ...(storedUser || {}),
//             ...(user || {}),
//             id,
//             userId: id,
//           };

//           try {
//             localStorage.setItem(
//               "langloop_user",
//               JSON.stringify(
//                 updatedUser
//               )
//             );

//             localStorage.setItem(
//               "user",
//               JSON.stringify(
//                 updatedUser
//               )
//             );
//           } catch {
//             // Ignore storage errors.
//           }

//           return id;
//         }
//       }
//     } catch (error) {
//       console.warn(
//         "Unable to resolve user ID:",
//         error
//       );
//     }

//     return null;
//   };


// /* =========================================================
//    UNWRAP OBJECT
//    ========================================================= */

// const unwrapObject = (
//   data
// ) => {
//   if (
//     data?.data &&
//     typeof data.data ===
//       "object" &&
//     !Array.isArray(
//       data.data
//     )
//   ) {
//     return data.data;
//   }

//   return (
//     data &&
//     typeof data ===
//       "object"
//       ? data
//       : {}
//   );
// };


// /* =========================================================
//    UNWRAP LIST
//    ========================================================= */

// const unwrapList = (
//   data,
//   keys = []
// ) => {
//   if (
//     Array.isArray(data)
//   ) {
//     return data;
//   }

//   for (
//     const key of keys
//   ) {
//     if (
//       Array.isArray(
//         data?.[key]
//       )
//     ) {
//       return data[key];
//     }
//   }

//   if (
//     Array.isArray(
//       data?.data
//     )
//   ) {
//     return data.data;
//   }

//   return [];
// };


// /* =========================================================
//    LOCAL STORAGE SCOPE
//    ========================================================= */

// const getStorageScope =
//   () => {
//     const user =
//       getStoredUser();

//     const userId =
//       user?.id ??
//       user?.userId ??
//       user?.user_id ??
//       user?.username ??
//       "anonymous";

//     const language =
//       user?.learningLanguage ??
//       user?.targetLanguage ??
//       user?.language ??
//       localStorage.getItem(
//         "langloop_learning_language"
//       ) ??
//       localStorage.getItem(
//         "selectedLanguage"
//       ) ??
//       "default";

//     const normalize =
//       (value) =>
//         String(value)
//           .trim()
//           .toLowerCase()
//           .replace(
//             /[^a-z0-9_-]/g,
//             "_"
//           );

//     return `${normalize(
//       userId
//     )}_${normalize(
//       language
//     )}`;
//   };


// const getScopedKey =
//   (key) => {
//     return `${key}_${getStorageScope()}`;
//   };


// /* =========================================================
//    READ LOCAL IDS
//    ========================================================= */

// const readIdSet =
//   (key) => {
//     try {
//       const raw =
//         localStorage.getItem(
//           getScopedKey(key)
//         );

//       const parsed =
//         JSON.parse(
//           raw || "[]"
//         );

//       return new Set(
//         Array.isArray(parsed)
//           ? parsed.map(
//               String
//             )
//           : []
//       );
//     } catch {
//       return new Set();
//     }
//   };


// /* =========================================================
//    WRITE LOCAL IDS
//    ========================================================= */

// const writeIdSet =
//   (
//     key,
//     ids
//   ) => {
//     try {
//       localStorage.setItem(
//         getScopedKey(key),
//         JSON.stringify(
//           Array.from(ids)
//         )
//       );
//     } catch (error) {
//       console.warn(
//         "Unable to save local card state:",
//         error
//       );
//     }
//   };


// /* =========================================================
//    GET LOCAL DUE IDS
//    ========================================================= */

// export const getLocalDueIds =
//   () => {
//     return readIdSet(
//       DUE_STORAGE_KEY
//     );
//   };


// /* =========================================================
//    GET LOCAL MASTERED IDS
//    ========================================================= */

// export const getLocalMasteredIds =
//   () => {
//     return readIdSet(
//       MASTERED_STORAGE_KEY
//     );
//   };


// /* =========================================================
//    MARK CARD DUE
//    ========================================================= */

// export const markCardDue =
//   (cardId) => {
//     if (
//       cardId === null ||
//       cardId === undefined ||
//       cardId === ""
//     ) {
//       return;
//     }

//     const id =
//       String(cardId);

//     const due =
//       readIdSet(
//         DUE_STORAGE_KEY
//       );

//     const mastered =
//       readIdSet(
//         MASTERED_STORAGE_KEY
//       );

//     due.add(id);
//     mastered.delete(id);

//     writeIdSet(
//       DUE_STORAGE_KEY,
//       due
//     );

//     writeIdSet(
//       MASTERED_STORAGE_KEY,
//       mastered
//     );
//   };


// /* =========================================================
//    MARK CARD MASTERED
//    ========================================================= */

// export const markCardMastered =
//   (cardId) => {
//     if (
//       cardId === null ||
//       cardId === undefined ||
//       cardId === ""
//     ) {
//       return;
//     }

//     const id =
//       String(cardId);

//     const due =
//       readIdSet(
//         DUE_STORAGE_KEY
//       );

//     const mastered =
//       readIdSet(
//         MASTERED_STORAGE_KEY
//       );

//     mastered.add(id);
//     due.delete(id);

//     writeIdSet(
//       DUE_STORAGE_KEY,
//       due
//     );

//     writeIdSet(
//       MASTERED_STORAGE_KEY,
//       mastered
//     );
//   };


// /* =========================================================
//    MARK CARD LEARNING
//    ========================================================= */

// export const markCardLearning =
//   (cardId) => {
//     if (
//       cardId === null ||
//       cardId === undefined ||
//       cardId === ""
//     ) {
//       return;
//     }

//     const id =
//       String(cardId);

//     const due =
//       readIdSet(
//         DUE_STORAGE_KEY
//       );

//     const mastered =
//       readIdSet(
//         MASTERED_STORAGE_KEY
//       );

//     due.delete(id);
//     mastered.delete(id);

//     writeIdSet(
//       DUE_STORAGE_KEY,
//       due
//     );

//     writeIdSet(
//       MASTERED_STORAGE_KEY,
//       mastered
//     );
//   };


// /* =========================================================
//    GET PROGRESS
//    ========================================================= */

// export const getProgress =
//   async (user = null) => {
//     try {
//       const response =
//         await api.get(
//           "/analytics/progress"
//         );

//       const data =
//         unwrapObject(
//           response?.data
//         );

//       const totalCards =
//         Math.max(
//           Number(
//             data.totalCards ??
//             data.totalFlashcards ??
//             data.total ??
//             0
//           ) || 0,
//           0
//         );

//       const backendMastered =
//         Math.max(
//           Number(
//             data.masteredCards ??
//             data.mastered ??
//             0
//           ) || 0,
//           0
//         );

//       const localMastered =
//         getLocalMasteredIds();

//       const masteredCards =
//         Math.min(
//           Math.max(
//             backendMastered,
//             localMastered.size
//           ),
//           totalCards ||
//             Number.MAX_SAFE_INTEGER
//         );

//       let progressPercentage =
//         Number(
//           data.progressPercentage ??
//           data.percentage ??
//           data.progress ??
//           NaN
//         );

//       if (
//         !Number.isFinite(
//           progressPercentage
//         ) &&
//         totalCards > 0
//       ) {
//         progressPercentage =
//           (
//             masteredCards /
//             totalCards
//           ) *
//           100;
//       }

//       if (
//         !Number.isFinite(
//           progressPercentage
//         )
//       ) {
//         progressPercentage =
//           0;
//       }

//       return {
//         totalCards,

//         masteredCards,

//         progressPercentage:
//           Math.min(
//             Math.max(
//               progressPercentage,
//               0
//             ),
//             100
//           ),
//       };
//     } catch (error) {
//       console.error(
//         "Failed to load progress:",
//         error
//       );

//       /*
//        * Do not crash Mastery/Progress completely.
//        * Return locally available information.
//        */

//       const localMastered =
//         getLocalMasteredIds();

//       return {
//         totalCards: 0,

//         masteredCards:
//           localMastered.size,

//         progressPercentage: 0,
//       };
//     }
//   };


// /* =========================================================
//    GET DUE CARDS
//    ========================================================= */

// export const getDueCards =
//   async (user = null) => {
//     try {
//       const userId =
//         await resolveUserId(
//           user
//         );

//       if (
//         userId === null ||
//         userId === undefined ||
//         userId === ""
//       ) {
//         console.warn(
//           "No numeric user ID available for due cards."
//         );

//         return [];
//       }

//       const response =
//         await api.get(
//           `/study/due?userId=${encodeURIComponent(
//             userId
//           )}`
//         );

//       return unwrapList(
//         response?.data,
//         [
//           "cards",
//           "flashcards",
//           "items",
//         ]
//       );
//     } catch (error) {
//       console.error(
//         "Failed to load due cards:",
//         error
//       );

//       return [];
//     }
//   };


// /* =========================================================
//    GET DECK CARDS
//    ========================================================= */

// export const getDeckCards =
//   async (deckId) => {
//     if (
//       deckId === null ||
//       deckId === undefined ||
//       deckId === ""
//     ) {
//       return [];
//     }

//     try {
//       const response =
//         await api.get(
//           `/flashcards/deck/${encodeURIComponent(
//             deckId
//           )}`
//         );

//       return unwrapList(
//         response?.data,
//         [
//           "cards",
//           "flashcards",
//           "items",
//         ]
//       );
//     } catch (error) {
//       console.error(
//         `Failed to load cards for deck ${deckId}:`,
//         error
//       );

//       return [];
//     }
//   };


// /* =========================================================
//    GET ALL DECKS
//    ========================================================= */

// export const getAllDecks =
//   async () => {
//     try {
//       const response =
//         await api.get(
//           "/decks"
//         );

//       return unwrapList(
//         response?.data,
//         [
//           "decks",
//           "items",
//         ]
//       );
//     } catch (error) {
//       console.error(
//         "Failed to load decks:",
//         error
//       );

//       return [];
//     }
//   };


// /* =========================================================
//    CREATE DUE METRIC
//    ========================================================= */

// export const createDueMetric =
//   async (
//     user,
//     cardId
//   ) => {
//     if (
//       cardId === null ||
//       cardId === undefined ||
//       cardId === ""
//     ) {
//       return null;
//     }

//     /*
//      * Keep local state immediately.
//      */

//     markCardDue(
//       cardId
//     );

//     try {
//       const userId =
//         await resolveUserId(
//           user
//         );

//       if (
//         userId === null ||
//         userId === undefined ||
//         userId === ""
//       ) {
//         return null;
//       }

//       const response =
//         await api.post(
//           "/retention/due",
//           {
//             userId,

//             cardId:
//               Number(cardId),
//           }
//         );

//       return response?.data;
//     } catch (error) {
//       console.warn(
//         "Unable to create due metric:",
//         error
//       );

//       return null;
//     }
//   };


// /* =========================================================
//    SET CARD STATUS
//    ========================================================= */

// export const setCardStatus =
//   (
//     cardId,
//     status
//   ) => {
//     const normalizedStatus =
//       String(
//         status || ""
//       ).toUpperCase();

//     if (
//       normalizedStatus ===
//       "MASTERED"
//     ) {
//       markCardMastered(
//         cardId
//       );

//       return;
//     }

//     if (
//       normalizedStatus ===
//       "DUE"
//     ) {
//       markCardDue(
//         cardId
//       );

//       return;
//     }

//     if (
//       normalizedStatus ===
//       "LEARNING"
//     ) {
//       markCardLearning(
//         cardId
//       );
//     }
//   };


// /* =========================================================
//    CLEAR LOCAL CARD STATUS
//    ========================================================= */

// export const clearLocalCardStatus =
//   (cardId) => {
//     if (
//       cardId === null ||
//       cardId === undefined ||
//       cardId === ""
//     ) {
//       return;
//     }

//     const id =
//       String(cardId);

//     const due =
//       readIdSet(
//         DUE_STORAGE_KEY
//       );

//     const mastered =
//       readIdSet(
//         MASTERED_STORAGE_KEY
//       );

//     due.delete(id);
//     mastered.delete(id);

//     writeIdSet(
//       DUE_STORAGE_KEY,
//       due
//     );

//     writeIdSet(
//       MASTERED_STORAGE_KEY,
//       mastered
//     );
//   };


// /* =========================================================
//    CLEAR ALL LOCAL CARD STATUS
//    ========================================================= */

// export const clearAllLocalCardStatus =
//   () => {
//     try {
//       localStorage.removeItem(
//         getScopedKey(
//           DUE_STORAGE_KEY
//         )
//       );

//       localStorage.removeItem(
//         getScopedKey(
//           MASTERED_STORAGE_KEY
//         )
//       );
//     } catch (error) {
//       console.warn(
//         "Unable to clear local card status:",
//         error
//       );
//     }
//   };



// import api from "./api";

// /* =========================================================
//    STORAGE KEYS
//    ========================================================= */

// const DUE_STORAGE_KEY = "langloop_due_cards";
// const MASTERED_STORAGE_KEY = "langloop_mastered_cards";

// /* =========================================================
//    RESPONSE HELPERS
//    ========================================================= */

// const unwrapObject = (data) => {
//   if (
//     data?.data &&
//     typeof data.data === "object" &&
//     !Array.isArray(data.data)
//   ) {
//     return data.data;
//   }

//   return data && typeof data === "object" ? data : {};
// };

// const unwrapList = (data, keys = []) => {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   for (const key of keys) {
//     if (Array.isArray(data?.[key])) {
//       return data[key];
//     }
//   }

//   if (Array.isArray(data?.data)) {
//     return data.data;
//   }

//   return [];
// };

// /* =========================================================
//    STORED USER
//    ========================================================= */

// const getStoredUser = () => {
//   try {
//     const raw =
//       localStorage.getItem("langloop_user") ||
//       localStorage.getItem("user");

//     if (!raw) {
//       return null;
//     }

//     return JSON.parse(raw);
//   } catch (error) {
//     console.warn("Unable to read stored user:", error);
//     return null;
//   }
// };

// /* =========================================================
//    USER ID
//    ========================================================= */

// export const getCurrentUserId = (user = null) => {
//   const storedUser = getStoredUser();

//   const candidates = [
//     user?.id,
//     user?.userId,
//     user?.user_id,
//     user?.systemUserId,

//     storedUser?.id,
//     storedUser?.userId,
//     storedUser?.user_id,
//     storedUser?.systemUserId,
//   ];

//   for (const value of candidates) {
//     if (
//       value !== null &&
//       value !== undefined &&
//       value !== ""
//     ) {
//       const numericId = Number(value);

//       if (
//         Number.isFinite(numericId) &&
//         numericId > 0
//       ) {
//         return numericId;
//       }
//     }
//   }

//   return null;
// };

// /*
//  * IMPORTANT:
//  * Existing Mastery.jsx, Progress.jsx and StudyMode.jsx
//  * import getUserId().
//  *
//  * Keep this export so those components compile.
//  */
// export const getUserId = (user = null) => {
//   return getCurrentUserId(user);
// };

// /* =========================================================
//    RESOLVE USER ID
//    ========================================================= */

// export const resolveUserId = async (user = null) => {
//   const existingId = getCurrentUserId(user);

//   if (existingId !== null) {
//     return existingId;
//   }

//   const storedUser = getStoredUser();

//   const username = String(
//     user?.username ||
//       storedUser?.username ||
//       ""
//   )
//     .trim()
//     .toLowerCase();

//   if (!username) {
//     return null;
//   }

//   try {
//     const response = await api.get("/decks");

//     const decks = unwrapList(
//       response?.data,
//       ["decks", "items"]
//     );

//     for (const deck of decks) {
//       const owner =
//         deck?.owner ||
//         deck?.createdBy ||
//         deck?.mentor ||
//         deck?.user ||
//         null;

//       const ownerUsername = String(
//         owner?.username ||
//           deck?.username ||
//           deck?.mentorName ||
//           deck?.createdByUsername ||
//           ""
//       )
//         .trim()
//         .toLowerCase();

//       if (
//         ownerUsername &&
//         ownerUsername === username
//       ) {
//         const possibleId =
//           owner?.id ??
//           owner?.userId ??
//           owner?.user_id ??
//           deck?.ownerId ??
//           deck?.userId ??
//           deck?.user_id;

//         const numericId = Number(possibleId);

//         if (
//           Number.isFinite(numericId) &&
//           numericId > 0
//         ) {
//           const updatedUser = {
//             ...(user || {}),
//             id: numericId,
//             userId: numericId,
//           };

//           try {
//             localStorage.setItem(
//               "langloop_user",
//               JSON.stringify(updatedUser)
//             );

//             localStorage.setItem(
//               "user",
//               JSON.stringify(updatedUser)
//             );
//           } catch {
//             // Ignore localStorage errors.
//           }

//           return numericId;
//         }
//       }
//     }
//   } catch (error) {
//     console.warn(
//       "Unable to resolve user ID from decks:",
//       error
//     );
//   }

//   return null;
// };

// /* =========================================================
//    LOCAL STATUS STORAGE
//    ========================================================= */

// const readIdSet = (key) => {
//   try {
//     const value = JSON.parse(
//       localStorage.getItem(key) || "[]"
//     );

//     if (!Array.isArray(value)) {
//       return new Set();
//     }

//     return new Set(
//       value
//         .filter(
//           (id) =>
//             id !== null &&
//             id !== undefined &&
//             id !== ""
//         )
//         .map(String)
//     );
//   } catch {
//     return new Set();
//   }
// };

// const writeIdSet = (key, ids) => {
//   try {
//     localStorage.setItem(
//       key,
//       JSON.stringify([...ids])
//     );
//   } catch (error) {
//     console.warn(
//       "Unable to save card status:",
//       error
//     );
//   }
// };

// /* =========================================================
//    LOCAL DUE IDS
//    ========================================================= */

// export const getLocalDueIds = () => {
//   return readIdSet(DUE_STORAGE_KEY);
// };

// /* =========================================================
//    LOCAL MASTERED IDS
//    ========================================================= */

// export const getLocalMasteredIds = () => {
//   return readIdSet(MASTERED_STORAGE_KEY);
// };

// /* =========================================================
//    MARK DUE
//    ========================================================= */

// export const markCardDue = (cardId) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return;
//   }

//   const id = String(cardId);

//   const due = readIdSet(DUE_STORAGE_KEY);
//   const mastered = readIdSet(
//     MASTERED_STORAGE_KEY
//   );

//   mastered.delete(id);
//   due.add(id);

//   writeIdSet(
//     DUE_STORAGE_KEY,
//     due
//   );

//   writeIdSet(
//     MASTERED_STORAGE_KEY,
//     mastered
//   );
// };

// /* =========================================================
//    MARK MASTERED
//    ========================================================= */

// export const markCardMastered = (cardId) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return;
//   }

//   const id = String(cardId);

//   const due = readIdSet(DUE_STORAGE_KEY);
//   const mastered = readIdSet(
//     MASTERED_STORAGE_KEY
//   );

//   due.delete(id);
//   mastered.add(id);

//   writeIdSet(
//     DUE_STORAGE_KEY,
//     due
//   );

//   writeIdSet(
//     MASTERED_STORAGE_KEY,
//     mastered
//   );
// };

// /* =========================================================
//    MARK LEARNING
//    ========================================================= */

// export const markCardLearning = (cardId) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return;
//   }

//   const id = String(cardId);

//   const due = readIdSet(DUE_STORAGE_KEY);
//   const mastered = readIdSet(
//     MASTERED_STORAGE_KEY
//   );

//   due.delete(id);
//   mastered.delete(id);

//   writeIdSet(
//     DUE_STORAGE_KEY,
//     due
//   );

//   writeIdSet(
//     MASTERED_STORAGE_KEY,
//     mastered
//   );
// };

// /* =========================================================
//    API REQUEST
//    ========================================================= */

// const apiRequest = async (
//   url,
//   options = {}
// ) => {
//   const token =
//     localStorage.getItem("token") ||
//     localStorage.getItem("langloop_token");

//   const response = await fetch(
//     url,
//     {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",

//         ...(token
//           ? {
//               Authorization: `Bearer ${token}`,
//             }
//           : {}),

//         ...(options.headers || {}),
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(
//       `Request failed: ${response.status}`
//     );
//   }

//   const text = await response.text();

//   if (!text) {
//     return null;
//   }

//   try {
//     return JSON.parse(text);
//   } catch {
//     return text;
//   }
// };

// /* =========================================================
//    GET PROGRESS
//    ========================================================= */

// export const getProgress = async (
//   user = null
// ) => {
//   let backendProgress = {
//     totalCards: 0,
//     masteredCards: 0,
//     progressPercentage: 0,
//   };

//   try {
//     /*
//      * Do not require a user ID here.
//      *
//      * The dashboard can still calculate progress from
//      * the cards returned by /decks and /flashcards/deck.
//      */
//     const data = await apiRequest(
//       "/api/analytics/progress"
//     );

//     const progress = unwrapObject(data);

//     const totalCards = Math.max(
//       Number(
//         progress.totalCards ??
//           progress.totalFlashcards ??
//           progress.total ??
//           0
//       ) || 0,
//       0
//     );

//     const masteredCards = Math.max(
//       Number(
//         progress.masteredCards ??
//           progress.mastered ??
//           0
//       ) || 0,
//       0
//     );

//     let percentage = Number(
//       progress.progressPercentage ??
//         progress.percentage ??
//         progress.progress ??
//         NaN
//     );

//     if (
//       !Number.isFinite(percentage) &&
//       totalCards > 0
//     ) {
//       percentage =
//         (masteredCards / totalCards) * 100;
//     }

//     if (!Number.isFinite(percentage)) {
//       percentage = 0;
//     }

//     backendProgress = {
//       totalCards,
//       masteredCards: Math.min(
//         masteredCards,
//         totalCards
//       ),
//       progressPercentage: Math.min(
//         Math.max(percentage, 0),
//         100
//       ),
//     };
//   } catch (error) {
//     console.warn(
//       "Unable to load backend progress:",
//       error
//     );
//   }

//   const localMastered =
//     getLocalMasteredIds();

//   const localDue =
//     getLocalDueIds();

//   const masteredCards = Math.min(
//     Math.max(
//       backendProgress.masteredCards,
//       localMastered.size
//     ),
//     backendProgress.totalCards ||
//       Number.MAX_SAFE_INTEGER
//   );

//   const progressPercentage =
//     backendProgress.totalCards > 0
//       ? Math.min(
//           Math.max(
//             (masteredCards /
//               backendProgress.totalCards) *
//               100,
//             0
//           ),
//           100
//         )
//       : 0;

//   return {
//     totalCards:
//       backendProgress.totalCards,

//     masteredCards,

//     progressPercentage,

//     dueCards: localDue.size,
//   };
// };

// /* =========================================================
//    GET DUE CARDS
//    ========================================================= */

// export const getDueCards = async (
//   user = null
// ) => {
//   let backendCards = [];

//   try {
//     const userId =
//       await resolveUserId(user);

//     if (userId !== null) {
//       const data = await apiRequest(
//         `/api/study/due?userId=${encodeURIComponent(
//           userId
//         )}`
//       );

//       backendCards = unwrapList(
//         data,
//         [
//           "cards",
//           "flashcards",
//           "items",
//         ]
//       );
//     }
//   } catch (error) {
//     console.warn(
//       "Unable to load backend due cards:",
//       error
//     );
//   }

//   return backendCards;
// };

// /* =========================================================
//    GET DECK CARDS
//    ========================================================= */

// export const getDeckCards = async (
//   deckId
// ) => {
//   if (
//     deckId === null ||
//     deckId === undefined ||
//     deckId === ""
//   ) {
//     return [];
//   }

//   try {
//     const data = await apiRequest(
//       `/api/flashcards/deck/${encodeURIComponent(
//         deckId
//       )}`
//     );

//     return unwrapList(
//       data,
//       [
//         "cards",
//         "flashcards",
//         "items",
//       ]
//     );
//   } catch (error) {
//     console.warn(
//       `Unable to load cards for deck ${deckId}:`,
//       error
//     );

//     return [];
//   }
// };

// /* =========================================================
//    GET ALL DECKS
//    ========================================================= */

// export const getAllDecks = async () => {
//   try {
//     const data = await apiRequest(
//       "/api/decks"
//     );

//     return unwrapList(
//       data,
//       [
//         "decks",
//         "items",
//       ]
//     );
//   } catch (error) {
//     console.warn(
//       "Unable to load decks:",
//       error
//     );

//     return [];
//   }
// };

// /* =========================================================
//    CREATE DUE METRIC
//    ========================================================= */

// export const createDueMetric = async (
//   user,
//   cardId
// ) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return null;
//   }

//   /*
//    * Always update local state first.
//    * This makes Review work even when the backend
//    * cannot resolve the user ID.
//    */
//   markCardDue(cardId);

//   try {
//     const userId =
//       await resolveUserId(user);

//     if (userId === null) {
//       return null;
//     }

//     const data = await apiRequest(
//       `/api/retention/due?userId=${encodeURIComponent(
//         userId
//       )}&cardId=${encodeURIComponent(
//         Number(cardId)
//       )}`,
//       {
//         method: "POST",
//       }
//     );

//     return data;
//   } catch (error) {
//     console.warn(
//       "Retention metric could not be created:",
//       error
//     );

//     return null;
//   }
// };

// /* =========================================================
//    CARD STATUS
//    ========================================================= */

// export const setCardStatus = (
//   cardId,
//   status
// ) => {
//   const normalizedStatus =
//     String(status || "")
//       .trim()
//       .toUpperCase();

//   if (
//     normalizedStatus === "MASTERED"
//   ) {
//     markCardMastered(cardId);
//     return;
//   }

//   if (
//     normalizedStatus === "DUE"
//   ) {
//     markCardDue(cardId);
//     return;
//   }

//   if (
//     normalizedStatus === "LEARNING"
//   ) {
//     markCardLearning(cardId);
//   }
// };

// /* =========================================================
//    CLEAR ONE CARD
//    ========================================================= */

// export const clearLocalCardStatus = (
//   cardId
// ) => {
//   if (
//     cardId === null ||
//     cardId === undefined ||
//     cardId === ""
//   ) {
//     return;
//   }

//   const id = String(cardId);

//   const due =
//     readIdSet(DUE_STORAGE_KEY);

//   const mastered =
//     readIdSet(
//       MASTERED_STORAGE_KEY
//     );

//   due.delete(id);
//   mastered.delete(id);

//   writeIdSet(
//     DUE_STORAGE_KEY,
//     due
//   );

//   writeIdSet(
//     MASTERED_STORAGE_KEY,
//     mastered
//   );
// };

// /* =========================================================
//    CLEAR ALL
//    ========================================================= */

// export const clearAllLocalCardStatus =
//   () => {
//     try {
//       localStorage.removeItem(
//         DUE_STORAGE_KEY
//       );

//       localStorage.removeItem(
//         MASTERED_STORAGE_KEY
//       );
//     } catch (error) {
//       console.warn(
//         "Unable to clear local card status:",
//         error
//       );
//     }
//   };



import {
  getUserLanguage,
  isSameLanguage,
} from "../utils/languageUtils";

/* =========================================================
   LEGACY STORAGE KEYS
   ========================================================= */

const LEGACY_DUE_STORAGE_KEY = "langloop_due_cards";
const LEGACY_MASTERED_STORAGE_KEY = "langloop_mastered_cards";
const LEGACY_LEARNING_STORAGE_KEY = "langloop_learning_cards";

/* =========================================================
   BASIC HELPERS
   ========================================================= */

const safeString = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_")
    .slice(0, 80);

const getStoredUser = () => {
  try {
    const raw =
      localStorage.getItem("langloop_user") ||
      localStorage.getItem("user");

    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Unable to read stored user:", error);
    return null;
  }
};

/* =========================================================
   USER-SCOPED STORAGE
   ========================================================= */

const getUserStorageScope = (user = null) => {
  const storedUser = getStoredUser();
  const currentUser = user || storedUser || {};

  const id =
    currentUser?.id ??
    currentUser?.userId ??
    currentUser?.user_id ??
    currentUser?.systemUserId ??
    "";

  const username =
    currentUser?.username ??
    currentUser?.userName ??
    currentUser?.email ??
    "anonymous";

  const role = safeString(currentUser?.role || "LEARNER");
  const language = safeString(getUserLanguage(currentUser));

  const identity = safeString(id || username) || "anonymous";

  return `${identity}_${role}_${language}`;
};

const getStorageKey = (type, user = null) =>
  `langloop_${type}_${getUserStorageScope(user)}`;

const readIdSet = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");

    return new Set(
      Array.isArray(value) ? value.map(String) : []
    );
  } catch {
    return new Set();
  }
};

const writeIdSet = (key, ids) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify([...ids])
    );
  } catch (error) {
    console.warn(
      "Unable to persist local card status:",
      error
    );
  }
};

/* =========================================================
   ROLE HELPERS
   ========================================================= */

const normalizeRole = (user = null) =>
  String(
    user?.role ||
      getStoredUser()?.role ||
      "LEARNER"
  )
    .toUpperCase()
    .replace(/^ROLE_/, "");

const isLearnerUser = (user = null) =>
  normalizeRole(user) === "LEARNER";

/* =========================================================
   LOCAL STATUS GETTERS
   ========================================================= */

export const getLocalDueIds = (user = null) =>
  readIdSet(
    getStorageKey("due_cards", user)
  );

export const getLocalMasteredIds = (user = null) =>
  readIdSet(
    getStorageKey("mastered_cards", user)
  );

export const getLocalLearningIds = (user = null) =>
  readIdSet(
    getStorageKey("learning_cards", user)
  );

/* =========================================================
   MARK CARD AS DUE
   ========================================================= */

export const markCardDue = (
  cardId,
  user = null
) => {
  if (
    cardId === null ||
    cardId === undefined ||
    cardId === ""
  ) {
    return;
  }

  const id = String(cardId);

  const dueKey =
    getStorageKey("due_cards", user);

  const masteredKey =
    getStorageKey("mastered_cards", user);

  const learningKey =
    getStorageKey("learning_cards", user);

  const due = readIdSet(dueKey);
  const mastered = readIdSet(masteredKey);
  const learning = readIdSet(learningKey);

  mastered.delete(id);
  learning.delete(id);
  due.add(id);

  writeIdSet(dueKey, due);
  writeIdSet(masteredKey, mastered);
  writeIdSet(learningKey, learning);
};

/* =========================================================
   MARK CARD AS MASTERED
   ========================================================= */

export const markCardMastered = (
  cardId,
  user = null
) => {
  if (
    cardId === null ||
    cardId === undefined ||
    cardId === ""
  ) {
    return;
  }

  const id = String(cardId);

  const dueKey =
    getStorageKey("due_cards", user);

  const masteredKey =
    getStorageKey("mastered_cards", user);

  const learningKey =
    getStorageKey("learning_cards", user);

  const due = readIdSet(dueKey);
  const mastered = readIdSet(masteredKey);
  const learning = readIdSet(learningKey);

  due.delete(id);
  learning.delete(id);
  mastered.add(id);

  writeIdSet(dueKey, due);
  writeIdSet(masteredKey, mastered);
  writeIdSet(learningKey, learning);
};

/* =========================================================
   MARK CARD AS LEARNING
   ========================================================= */

export const markCardLearning = (
  cardId,
  user = null
) => {
  if (
    cardId === null ||
    cardId === undefined ||
    cardId === ""
  ) {
    return;
  }

  const id = String(cardId);

  const dueKey =
    getStorageKey("due_cards", user);

  const masteredKey =
    getStorageKey("mastered_cards", user);

  const learningKey =
    getStorageKey("learning_cards", user);

  const due = readIdSet(dueKey);
  const mastered = readIdSet(masteredKey);
  const learning = readIdSet(learningKey);

  due.delete(id);
  mastered.delete(id);
  learning.add(id);

  writeIdSet(dueKey, due);
  writeIdSet(masteredKey, mastered);
  writeIdSet(learningKey, learning);
};

/* =========================================================
   USER ID
   ========================================================= */

export const getCurrentUserId = (
  user = null
) => {
  const storedUser = getStoredUser();

  const candidates = [
    user?.id,
    user?.userId,
    user?.user_id,
    user?.systemUserId,
    storedUser?.id,
    storedUser?.userId,
    storedUser?.user_id,
    storedUser?.systemUserId,
  ];

  for (const value of candidates) {
    const number = Number(value);

    if (
      Number.isFinite(number) &&
      number > 0
    ) {
      return number;
    }
  }

  return null;
};

/* =========================================================
   BACKWARD COMPATIBILITY
   ========================================================= */

export const getUserId =
  getCurrentUserId;

/* =========================================================
   RESPONSE HELPERS
   ========================================================= */

const unwrapObject = (data) => {
  if (
    data?.data &&
    typeof data.data === "object" &&
    !Array.isArray(data.data)
  ) {
    return data.data;
  }

  return data &&
    typeof data === "object"
    ? data
    : {};
};

const unwrapList = (
  data,
  keys = []
) => {
  if (Array.isArray(data)) {
    return data;
  }

  for (const key of keys) {
    if (Array.isArray(data?.[key])) {
      return data[key];
    }
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};

/* =========================================================
   API HELPER
   ========================================================= */

const apiRequest = async (
  url,
  options = {}
) => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem(
      "langloop_token"
    );

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type":
        "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status}`
    );
  }

  const text =
    await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

/* =========================================================
   CARD HELPERS
   ========================================================= */

const getCardId = (card) =>
  card?.id ??
  card?.flashcardId ??
  card?.cardId ??
  null;

const getCardLanguage = (card) =>
  card?.language ||
  card?.languageName ||
  card?.languageCode ||
  card?.learningLanguage ||
  card?.targetLanguage ||
  card?.targetLanguageCode ||
  card?.lang ||
  card?.locale ||
  card?.metadata?.language ||
  card?.metadata?.languageName ||
  card?.metadata?.languageCode ||
  "";

const getDeckLanguage = (deck) =>
  deck?.language ||
  deck?.languageName ||
  deck?.languageCode ||
  deck?.lang ||
  deck?.locale ||
  deck?.learningLanguage ||
  deck?.targetLanguage ||
  deck?.targetLanguageCode ||
  deck?.metadata?.language ||
  deck?.metadata?.languageName ||
  deck?.metadata?.languageCode ||
  "";

/* =========================================================
   LOAD LEARNER-SCOPED CARDS
   ========================================================= */

const loadLearnerScopedCards =
  async (user = null) => {
    const currentUser =
      user ||
      getStoredUser() ||
      {};

    if (
      !isLearnerUser(
        currentUser
      )
    ) {
      return [];
    }

    const userLanguage =
      getUserLanguage(
        currentUser
      );

    try {
      const decksData =
        await apiRequest(
          "/api/decks"
        );

      const rawDecks =
        unwrapList(
          decksData,
          [
            "decks",
            "items",
          ]
        );

      const languageDecks =
        rawDecks.filter(
          (deck) => {
            const deckLanguage =
              getDeckLanguage(
                deck
              );

            /*
             * Some backend deck responses do not
             * expose language on the deck object.
             *
             * Do not hide those decks from a learner.
             * The cards themselves can still be loaded.
             */
            if (
              !deckLanguage
            ) {
              return true;
            }

            return isSameLanguage(
              deckLanguage,
              userLanguage
            );
          }
        );

      const cardArrays =
        await Promise.all(
          languageDecks.map(
            async (deck) => {
              if (
                deck?.id ===
                  null ||
                deck?.id ===
                  undefined ||
                deck?.id === ""
              ) {
                return [];
              }

              try {
                const data =
                  await apiRequest(
                    `/api/flashcards/deck/${encodeURIComponent(
                      deck.id
                    )}`
                  );

                return unwrapList(
                  data,
                  [
                    "cards",
                    "flashcards",
                    "items",
                  ]
                );
              } catch (error) {
                console.warn(
                  `Unable to load cards for deck ${deck.id}:`,
                  error
                );

                return [];
              }
            }
          )
        );

      const cards =
        cardArrays.flat();

      /*
       * If a card has its own language metadata,
       * apply the same language protection here.
       *
       * Cards without language metadata are retained.
       */
      return cards.filter(
        (card) => {
          const cardLanguage =
            getCardLanguage(
              card
            );

          if (
            !cardLanguage
          ) {
            return true;
          }

          return isSameLanguage(
            cardLanguage,
            userLanguage
          );
        }
      );
    } catch (error) {
      console.warn(
        "Unable to load learner-scoped cards:",
        error
      );

      return [];
    }
  };

/* =========================================================
   RESOLVE USER ID
   ========================================================= */

export const resolveUserId =
  async (user = null) => {
    const existingId =
      getCurrentUserId(
        user
      );

    if (
      existingId !== null
    ) {
      return existingId;
    }

    const currentUser =
      user ||
      getStoredUser() ||
      {};

    const username = String(
      currentUser?.username ||
        currentUser?.userName ||
        currentUser?.email ||
        ""
    )
      .trim()
      .toLowerCase();

    if (!username) {
      return null;
    }

    try {
      const data =
        await apiRequest(
          "/api/decks"
        );

      const decks =
        unwrapList(
          data,
          [
            "decks",
            "items",
          ]
        );

      for (
        const deck of decks
      ) {
        const owner =
          deck?.owner ||
          deck?.createdBy ||
          deck?.mentor ||
          null;

        const ownerUsername =
          String(
            owner?.username ||
              owner?.userName ||
              owner?.email ||
              deck?.mentorName ||
              ""
          )
            .trim()
            .toLowerCase();

        if (
          ownerUsername !==
          username
        ) {
          continue;
        }

        const id =
          Number(
            owner?.id ??
              owner?.userId ??
              owner?.user_id
          );

        if (
          Number.isFinite(id) &&
          id > 0
        ) {
          const updatedUser =
            {
              ...currentUser,
              id,
              userId: id,
            };

          try {
            localStorage.setItem(
              "langloop_user",
              JSON.stringify(
                updatedUser
              )
            );

            localStorage.setItem(
              "user",
              JSON.stringify(
                updatedUser
              )
            );
          } catch (storageError) {
            console.warn(
              "Unable to persist resolved user ID:",
              storageError
            );
          }

          return id;
        }
      }
    } catch (error) {
      console.warn(
        "Unable to resolve user ID:",
        error
      );
    }

    return null;
  };

/* =========================================================
   GET PROGRESS
   ========================================================= */

export const getProgress =
  async (user = null) => {
    const currentUser =
      user ||
      getStoredUser() ||
      {};

    /*
     * Learner progress is calculated only from
     * cards available to this learner's language.
     */
    if (
      isLearnerUser(
        currentUser
      )
    ) {
      const scopedCards =
        await loadLearnerScopedCards(
          currentUser
        );

      const validCardIds =
        new Set(
          scopedCards
            .map(getCardId)
            .filter(
              (id) =>
                id !== null &&
                id !==
                  undefined &&
                id !== ""
            )
            .map(String)
        );

      const localMastered =
        getLocalMasteredIds(
          currentUser
        );

      const localDue =
        getLocalDueIds(
          currentUser
        );

      const masteredCards =
        [
          ...localMastered,
        ].filter(
          (id) =>
            validCardIds.has(
              String(id)
            )
        ).length;

      const dueCards =
        [
          ...localDue,
        ].filter(
          (id) =>
            validCardIds.has(
              String(id)
            )
        ).length;

      const totalCards =
        scopedCards.length;

      const progressPercentage =
        totalCards > 0
          ? Math.min(
              Math.max(
                (masteredCards /
                  totalCards) *
                  100,
                0
              ),
              100
            )
          : 0;

      return {
        totalCards,
        masteredCards,
        progressPercentage,
        dueCards,
      };
    }

    /*
     * Preserve backend analytics behavior
     * for non-learners.
     */
    try {
      const data =
        await apiRequest(
          "/api/analytics/progress"
        );

      const progress =
        unwrapObject(data);

      const totalCards =
        Math.max(
          Number(
            progress.totalCards ??
              progress.totalFlashcards ??
              progress.total ??
              0
          ) || 0,
          0
        );

      const masteredCards =
        Math.min(
          Math.max(
            Number(
              progress.masteredCards ??
                progress.mastered ??
                0
            ) || 0,
            0
          ),
          totalCards
        );

      let progressPercentage =
        Number(
          progress.progressPercentage ??
            progress.percentage ??
            progress.progress ??
            NaN
        );

      if (
        !Number.isFinite(
          progressPercentage
        ) &&
        totalCards > 0
      ) {
        progressPercentage =
          (masteredCards /
            totalCards) *
          100;
      }

      if (
        !Number.isFinite(
          progressPercentage
        )
      ) {
        progressPercentage = 0;
      }

      return {
        totalCards,
        masteredCards,
        progressPercentage:
          Math.min(
            Math.max(
              progressPercentage,
              0
            ),
            100
          ),
        dueCards: 0,
      };
    } catch (error) {
      console.warn(
        "Unable to load backend progress:",
        error
      );

      return {
        totalCards: 0,
        masteredCards: 0,
        progressPercentage: 0,
        dueCards: 0,
      };
    }
  };

/* =========================================================
   GET DUE CARDS
   ========================================================= */

export const getDueCards =
  async (user = null) => {
    const currentUser =
      user ||
      getStoredUser() ||
      {};

    let backendCards = [];

    try {
      const userId =
        await resolveUserId(
          currentUser
        );

      if (
        userId !== null
      ) {
        const data =
          await apiRequest(
            `/api/study/due?userId=${encodeURIComponent(
              userId
            )}`
          );

        backendCards =
          unwrapList(
            data,
            [
              "cards",
              "flashcards",
              "items",
            ]
          );
      }
    } catch (error) {
      console.warn(
        "Unable to load backend due cards:",
        error
      );
    }

    if (
      !isLearnerUser(
        currentUser
      )
    ) {
      return backendCards;
    }

    /*
     * Always scope learner review cards
     * to cards available to the learner.
     */
    const scopedCards =
      await loadLearnerScopedCards(
        currentUser
      );

    const validCardMap =
      new Map();

    scopedCards.forEach(
      (card) => {
        const id =
          getCardId(card);

        if (
          id !== null &&
          id !== undefined &&
          id !== ""
        ) {
          validCardMap.set(
            String(id),
            card
          );
        }
      }
    );

    const localDueIds =
      getLocalDueIds(
        currentUser
      );

    const merged =
      new Map();

    /*
     * Backend due cards.
     */
    backendCards.forEach(
      (card) => {
        const id =
          getCardId(card);

        if (
          id === null ||
          id === undefined ||
          id === ""
        ) {
          return;
        }

        const scopedCard =
          validCardMap.get(
            String(id)
          );

        if (
          scopedCard
        ) {
          merged.set(
            String(id),
            {
              ...card,
              ...scopedCard,
              masteryLevel:
                card?.masteryLevel ||
                "DUE",
            }
          );
        }
      }
    );

    /*
     * Locally marked due cards.
     */
    localDueIds.forEach(
      (id) => {
        const scopedCard =
          validCardMap.get(
            String(id)
          );

        if (
          scopedCard
        ) {
          merged.set(
            String(id),
            {
              ...scopedCard,
              masteryLevel:
                "DUE",
            }
          );
        }
      }
    );

    return Array.from(
      merged.values()
    );
  };

/* =========================================================
   GET DECK CARDS
   ========================================================= */

export const getDeckCards =
  async (deckId) => {
    if (
      deckId === null ||
      deckId === undefined ||
      deckId === ""
    ) {
      return [];
    }

    try {
      const data =
        await apiRequest(
          `/api/flashcards/deck/${encodeURIComponent(
            deckId
          )}`
        );

      return unwrapList(
        data,
        [
          "cards",
          "flashcards",
          "items",
        ]
      );
    } catch (error) {
      console.warn(
        "Unable to load deck cards:",
        error
      );

      return [];
    }
  };

/* =========================================================
   GET ALL DECKS
   ========================================================= */

export const getAllDecks =
  async () => {
    try {
      const data =
        await apiRequest(
          "/api/decks"
        );

      return unwrapList(
        data,
        [
          "decks",
          "items",
        ]
      );
    } catch (error) {
      console.warn(
        "Unable to load decks:",
        error
      );

      return [];
    }
  };

/* =========================================================
   CREATE DUE RETENTION METRIC
   ========================================================= */

export const createDueMetric =
  async (
    user,
    cardId
  ) => {
    if (
      cardId === null ||
      cardId === undefined ||
      cardId === ""
    ) {
      return null;
    }

    /*
     * Persist locally immediately.
     * This means the review queue can work even
     * when the backend does not return a numeric ID.
     */
    markCardDue(
      cardId,
      user
    );

    try {
      const userId =
        await resolveUserId(
          user
        );

      if (
        userId === null
      ) {
        return null;
      }

      return await apiRequest(
        `/api/retention/due?userId=${encodeURIComponent(
          userId
        )}&cardId=${encodeURIComponent(
          Number(cardId)
        )}`,
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.warn(
        "Retention metric could not be created:",
        error
      );

      return null;
    }
  };

/* =========================================================
   CARD STATUS HELPER
   ========================================================= */

export const setCardStatus =
  (
    cardId,
    status,
    user = null
  ) => {
    if (
      status ===
      "MASTERED"
    ) {
      markCardMastered(
        cardId,
        user
      );

      return;
    }

    if (
      status === "DUE"
    ) {
      markCardDue(
        cardId,
        user
      );

      return;
    }

    if (
      status === "LEARNING"
    ) {
      markCardLearning(
        cardId,
        user
      );
    }
  };

/* =========================================================
   CLEAR ONE CARD STATUS
   ========================================================= */

export const clearLocalCardStatus =
  (
    cardId,
    user = null
  ) => {
    if (
      cardId === null ||
      cardId === undefined ||
      cardId === ""
    ) {
      return;
    }

    const id =
      String(cardId);

    const dueKey =
      getStorageKey(
        "due_cards",
        user
      );

    const masteredKey =
      getStorageKey(
        "mastered_cards",
        user
      );

    const learningKey =
      getStorageKey(
        "learning_cards",
        user
      );

    const due =
      readIdSet(
        dueKey
      );

    const mastered =
      readIdSet(
        masteredKey
      );

    const learning =
      readIdSet(
        learningKey
      );

    due.delete(id);
    mastered.delete(id);
    learning.delete(id);

    writeIdSet(
      dueKey,
      due
    );

    writeIdSet(
      masteredKey,
      mastered
    );

    writeIdSet(
      learningKey,
      learning
    );
  };

/* =========================================================
   CLEAR ALL LOCAL STATUS
   ========================================================= */

export const clearAllLocalCardStatus =
  (user = null) => {
    try {
      localStorage.removeItem(
        getStorageKey(
          "due_cards",
          user
        )
      );

      localStorage.removeItem(
        getStorageKey(
          "mastered_cards",
          user
        )
      );

      localStorage.removeItem(
        getStorageKey(
          "learning_cards",
          user
        )
      );

      /*
       * Remove old global keys so status from
       * previous users cannot leak into another
       * learner account.
       */
      localStorage.removeItem(
        LEGACY_DUE_STORAGE_KEY
      );

      localStorage.removeItem(
        LEGACY_MASTERED_STORAGE_KEY
      );

      localStorage.removeItem(
        LEGACY_LEARNING_STORAGE_KEY
      );
    } catch (error) {
      console.warn(
        "Unable to clear local card status:",
        error
      );
    }
  };