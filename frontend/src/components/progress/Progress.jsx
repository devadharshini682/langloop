// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import api from "../../services/api";

// // function Progress() {
// //   const auth = useSelector((state) => state.auth || {});
// //   const user = auth.user;

// //   const reduxLang = useSelector(
// //     (state) => state.languages?.selectedLanguage
// //   );

// //   const activeLanguage =
// //     reduxLang ||
// //     user?.learningLanguage ||
// //     user?.nativeLanguage ||
// //     localStorage.getItem("langloop_learning_language") ||
// //     "";

// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const [progressData, setProgressData] = useState({
// //     totalCards: 0,
// //     masteredCards: 0,
// //     progressPercentage: 0,
// //   });

// //   const [decks, setDecks] = useState([]);
// //   const [dueCards, setDueCards] = useState([]);

// //   useEffect(() => {
// //     const fetchProgressData = async () => {
// //       setLoading(true);
// //       setError("");

// //       try {
// //         // 1. Fetch Analytics Progress
// //         try {
// //           const res = await api.get("/analytics/progress");
// //           if (res?.data) {
// //             setProgressData({
// //               totalCards: res.data.totalCards ?? 0,
// //               masteredCards: res.data.masteredCards ?? 0,
// //               progressPercentage: res.data.progressPercentage ?? 0,
// //             });
// //           }
// //         } catch (err) {
// //           console.error("Failed to load progress analytics:", err);
// //         }

// //         // 2. Fetch Decks with card counts
// //         try {
// //           const decksRes = await api.get("/decks");
// //           const loadedDecks = Array.isArray(decksRes.data)
// //             ? decksRes.data
// //             : decksRes.data?.decks || [];

// //           const decksWithCards = await Promise.all(
// //             loadedDecks.map(async (deck) => {
// //               try {
// //                 const cRes = await api.get(`/flashcards/deck/${deck.id}`);
// //                 const cards = Array.isArray(cRes.data) ? cRes.data : [];
// //                 return {
// //                   ...deck,
// //                   cardCount: cards.length,
// //                 };
// //               } catch (e) {
// //                 return {
// //                   ...deck,
// //                   cardCount: 0,
// //                 };
// //               }
// //             })
// //           );

// //           setDecks(decksWithCards);
// //         } catch (err) {
// //           console.error("Failed to load decks in Progress:", err);
// //         }

// //         // 3. Fetch Due Cards
// //         const currentUserId = user?.id || 10;
// //         try {
// //           let dueRes;
// //           try {
// //             dueRes = await api.get(`/study/due?userId=${currentUserId}`);
// //           } catch (e) {
// //             dueRes = await api.get("/study/due?userId=1");
// //           }

// //           if (Array.isArray(dueRes?.data)) {
// //             setDueCards(dueRes.data);
// //           } else if (Array.isArray(dueRes?.data?.cards)) {
// //             setDueCards(dueRes.data.cards);
// //           }
// //         } catch (err) {
// //           console.error("Failed to load due cards in Progress:", err);
// //         }
// //       } catch (err) {
// //         setError("Unable to load progress data.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProgressData();
// //   }, [user?.id]);

// //   const total = progressData.totalCards;
// //   const mastered = progressData.masteredCards;
// //   const learning = Math.max(total - mastered, 0);
// //   const due = dueCards.length;
// //   const percentage = Math.round(progressData.progressPercentage);

// //   if (loading) {
// //     return (
// //       <div className="page-container">
// //         <div className="dashboard-loading">
// //           <h1>Loading progress analytics...</h1>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="page-container">
// //       {/* HEADER */}
// //       <div className="page-header">
// //         <div>
// //           <span className="dashboard-label">LEARNING PROGRESS</span>
// //           <h1>Learning Progress</h1>
// //           <p>Track your retention, flashcard mastery, and study analytics.</p>
// //         </div>

// //         {activeLanguage && (
// //           <div className="active-learning-badge">
// //             <span className="badge-pulse"></span>
// //             <span>Learning: <strong>{activeLanguage}</strong></span>
// //           </div>
// //         )}
// //       </div>

// //       {error && <div className="error-message">{error}</div>}

// //       {/* OVERALL LEARNING PROGRESS */}
// //       <div className="progress-overview-card">
// //         <div className="overview-header">
// //           <div>
// //             <span className="hero-kicker">OVERALL COMPLETION</span>
// //             <h2>{percentage}% Learning Complete</h2>
// //             <p>
// //               Based on <strong>{mastered}</strong> mastered cards out of{" "}
// //               <strong>{total}</strong> total flashcards.
// //             </p>
// //           </div>
// //           <div className="overall-pct-circle">
// //             <span>{percentage}%</span>
// //           </div>
// //         </div>

// //         <div className="dashboard-progress-bar" style={{ height: "14px", marginTop: "16px" }}>
// //           <div
// //             className="dashboard-progress-fill"
// //             style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
// //           />
// //         </div>

// //         <div className="progress-footer" style={{ marginTop: "8px" }}>
// //           <span>{progressData.progressPercentage}% completed</span>
// //           <strong>{percentage}% completed</strong>
// //         </div>
// //       </div>

// //       {/* FLASHCARD PROGRESS STATS */}
// //       <div className="section-head" style={{ marginTop: "32px" }}>
// //         <div>
// //           <span className="dashboard-label">BREAKDOWN</span>
// //           <h3>Flashcard Progress</h3>
// //         </div>
// //       </div>

// //       <div className="stats-grid">
// //         <div className="stat-card flashcard-stat">
// //           <div className="stat-card-top">
// //             <span className="stat-icon">▤</span>
// //             <span className="stat-title">TOTAL FLASHCARDS</span>
// //           </div>
// //           <h3>Total</h3>
// //           <p className="stat-value">{total}</p>
// //           <span className="stat-description">In your collection</span>
// //         </div>

// //         <div className="stat-card mastered-stat">
// //           <div className="stat-card-top">
// //             <span className="stat-icon">✓</span>
// //             <span className="stat-title">MASTERED</span>
// //           </div>
// //           <h3>Mastered</h3>
// //           <p className="stat-value">{mastered}</p>
// //           <span className="stat-description">Retention criteria met</span>
// //         </div>

// //         <div className="stat-card deck-stat">
// //           <div className="stat-card-top">
// //             <span className="stat-icon">⚡</span>
// //             <span className="stat-title">LEARNING</span>
// //           </div>
// //           <h3>Learning</h3>
// //           <p className="stat-value">{learning}</p>
// //           <span className="stat-description">In active review</span>
// //         </div>

// //         <div className="stat-card due-stat">
// //           <div className="stat-card-top">
// //             <span className="stat-icon">!</span>
// //             <span className="stat-title">DUE FOR REVIEW</span>
// //           </div>
// //           <h3>Due Today</h3>
// //           <p className="stat-value">{due}</p>
// //           <span className="stat-description">Awaiting study</span>
// //         </div>
// //       </div>

// //       {/* DECK PROGRESS */}
// //       <div className="progress-section-card" style={{ marginTop: "32px" }}>
// //         <div className="section-head">
// //           <div>
// //             <span className="dashboard-label">COLLECTION STATUS</span>
// //             <h3>Deck Learning Progress</h3>
// //             <p>Flashcards and capacity per study deck</p>
// //           </div>
// //           <Link to="/decks" className="secondary-button">
// //             View All Decks
// //           </Link>
// //         </div>

// //         {decks.length === 0 ? (
// //           <div className="empty-state">
// //             <p>No decks found.</p>
// //           </div>
// //         ) : (
// //           <div className="deck-progress-grid">
// //             {decks.map((deck) => {
// //               const capacity = deck.capacity || 50;
// //               const cardCount = deck.cardCount || 0;
// //               const deckPct = Math.round(
// //                 Math.min((cardCount / capacity) * 100, 100)
// //               );

// //               return (
// //                 <div className="deck-progress-item" key={deck.id}>
// //                   <div className="deck-progress-header">
// //                     <div>
// //                       <span className="deck-tag">
// //                         {activeLanguage || "Study Deck"}
// //                       </span>
// //                       <h4>{deck.title}</h4>
// //                     </div>
// //                     <span className="deck-ratio">
// //                       {cardCount} / {capacity} Cards
// //                     </span>
// //                   </div>

// //                   <p className="deck-desc">
// //                     {deck.description || "Active language learning deck"}
// //                   </p>

// //                   <div className="deck-bar-track">
// //                     <div
// //                       className="deck-bar-fill"
// //                       style={{ width: `${deckPct}%` }}
// //                     />
// //                   </div>

// //                   <div className="deck-progress-footer">
// //                     <span>Capacity: {deckPct}% full</span>
// //                     <Link
// //                       to={`/study?deckId=${deck.id}`}
// //                       className="primary-button"
// //                       style={{ padding: "6px 14px", fontSize: "13px" }}
// //                     >
// //                       Study Deck
// //                     </Link>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>

// //       {/* RETENTION METRICS (SPACED REPETITION) */}
// //       {dueCards.length > 0 && (
// //         <div className="progress-section-card" style={{ marginTop: "32px" }}>
// //           <div className="section-head">
// //             <div>
// //               <span className="dashboard-label">SPACED REPETITION</span>
// //               <h3>Retention & Review Metrics</h3>
// //               <p>Active memory retention intervals for due cards</p>
// //             </div>
// //             <Link to="/study" className="primary-button">
// //               Start Review Session
// //             </Link>
// //           </div>

// //           <div className="retention-cards-grid">
// //             {dueCards.map((card) => (
// //               <div className="retention-metric-pill" key={card.id}>
// //                 <div className="metric-info">
// //                   <strong>{card.front}</strong>
// //                   <span>{card.back}</span>
// //                 </div>
// //                 <div className="metric-stats">
// //                   <span className="metric-tag">
// //                     {card.masteryLevel || "NEW"}
// //                   </span>
// //                   <span className="metric-ease">
// //                     Ease: {card.easeFactor ? card.easeFactor.toFixed(1) : "2.5"}
// //                   </span>
// //                   <span className="metric-interval">
// //                     {card.intervalDays ?? 1}d interval
// //                   </span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Progress;


// import React, {
//   useEffect,
//   useState,
// } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// import api from "../../services/api";

// import {
//   getCurrentUserId,
//   getDueCards,
//   getProgress,
// } from "../../services/analyticsService";

// function unwrapList(data, keys = []) {
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
// }

// function Progress() {
//   const auth = useSelector(
//     (state) => state.auth || {}
//   );

//   const user = auth.user;

//   const reduxLang = useSelector(
//     (state) =>
//       state.languages?.selectedLanguage
//   );

//   const activeLanguage =
//     reduxLang ||
//     user?.learningLanguage ||
//     user?.nativeLanguage ||
//     user?.language ||
//     localStorage.getItem(
//       "langloop_learning_language"
//     ) ||
//     "";

//   const userId =
//     getCurrentUserId(user);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   const [progressData, setProgressData] =
//     useState({
//       totalCards: 0,
//       masteredCards: 0,
//       progressPercentage: 0,
//     });

//   const [decks, setDecks] =
//     useState([]);

//   const [dueCards, setDueCards] =
//     useState([]);

//   useEffect(() => {
//     let mounted = true;

//     const fetchProgressData =
//       async () => {
//         if (!userId) {
//           if (mounted) {
//             setError(
//               "Unable to identify the logged-in user. Please log in again."
//             );
//             setLoading(false);
//           }

//           return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//           const progress =
//             await getProgress(user);

//           if (mounted) {
//             setProgressData(
//               progress
//             );
//           }
//         } catch (err) {
//           console.error(
//             "Failed to load progress:",
//             err
//           );

//           if (mounted) {
//             setError(
//               "Progress analytics could not be loaded."
//             );
//           }
//         }

//         try {
//           const response =
//             await api.get("/decks");

//           const loadedDecks =
//             unwrapList(
//               response.data,
//               [
//                 "decks",
//                 "items",
//               ]
//             );

//           const decksWithCards =
//             await Promise.all(
//               loadedDecks.map(
//                 async (deck) => {
//                   try {
//                     const cardResponse =
//                       await api.get(
//                         `/flashcards/deck/${deck.id}`
//                       );

//                     const cards =
//                       unwrapList(
//                         cardResponse.data,
//                         [
//                           "cards",
//                           "flashcards",
//                           "items",
//                         ]
//                       );

//                     return {
//                       ...deck,
//                       cardCount:
//                         cards.length,
//                     };
//                   } catch (err) {
//                     console.error(
//                       `Failed to load cards for deck ${deck.id}:`,
//                       err
//                     );

//                     return {
//                       ...deck,
//                       cardCount: 0,
//                     };
//                   }
//                 }
//               )
//             );

//           if (mounted) {
//             setDecks(
//               decksWithCards
//             );
//           }
//         } catch (err) {
//           console.error(
//             "Failed to load decks:",
//             err
//           );

//           if (mounted) {
//             setDecks([]);
//           }
//         }

//         try {
//           const dueList =
//             await getDueCards(user);

//           if (mounted) {
//             setDueCards(
//               dueList || []
//             );
//           }
//         } catch (err) {
//           console.error(
//             "Failed to load due cards:",
//             err
//           );

//           if (mounted) {
//             setDueCards([]);
//           }
//         }

//         if (mounted) {
//           setLoading(false);
//         }
//       };

//     fetchProgressData();

//     return () => {
//       mounted = false;
//     };
//   }, [user, userId]);

//   const total = Math.max(
//     Number(
//       progressData.totalCards
//     ) || 0,
//     0
//   );

//   const mastered = Math.min(
//     Math.max(
//       Number(
//         progressData.masteredCards
//       ) || 0,
//       0
//     ),
//     total
//   );

//   const learning = Math.max(
//     total - mastered,
//     0
//   );

//   const due = dueCards.length;

//   const percentage = Math.min(
//     Math.max(
//       Math.round(
//         Number(
//           progressData.progressPercentage
//         ) || 0
//       ),
//       0
//     ),
//     100
//   );

//   if (loading) {
//     return (
//       <div className="page-container">
//         <div className="dashboard-loading">
//           <h1>
//             Loading progress
//             analytics...
//           </h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           <span className="dashboard-label">
//             LEARNING PROGRESS
//           </span>

//           <h1>
//             Learning Progress
//           </h1>

//           <p>
//             Track your retention,
//             flashcard mastery, and
//             study analytics.
//           </p>
//         </div>

//         {activeLanguage && (
//           <div className="active-learning-badge">
//             <span className="badge-pulse" />

//             <span>
//               Learning:{" "}
//               <strong>
//                 {activeLanguage}
//               </strong>
//             </span>
//           </div>
//         )}
//       </div>

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       <div className="progress-overview-card">
//         <div className="overview-header">
//           <div>
//             <span className="hero-kicker">
//               OVERALL COMPLETION
//             </span>

//             <h2>
//               {percentage}%
//               Learning Complete
//             </h2>

//             <p>
//               Based on{" "}
//               <strong>
//                 {mastered}
//               </strong>{" "}
//               mastered cards out
//               of{" "}
//               <strong>
//                 {total}
//               </strong>{" "}
//               total flashcards.
//             </p>
//           </div>

//           <div className="overall-pct-circle">
//             <span>
//               {percentage}%
//             </span>
//           </div>
//         </div>

//         <div
//           className="dashboard-progress-bar"
//           style={{
//             height: "14px",
//             marginTop: "16px",
//           }}
//         >
//           <div
//             className="dashboard-progress-fill"
//             style={{
//               width: `${percentage}%`,
//             }}
//           />
//         </div>

//         <div
//           className="progress-footer"
//           style={{
//             marginTop: "8px",
//           }}
//         >
//           <span>
//             {percentage}% completed
//           </span>

//           <strong>
//             {percentage}% completed
//           </strong>
//         </div>
//       </div>

//       <div
//         className="section-head"
//         style={{
//           marginTop: "32px",
//         }}
//       >
//         <div>
//           <span className="dashboard-label">
//             BREAKDOWN
//           </span>

//           <h3>
//             Flashcard Progress
//           </h3>
//         </div>
//       </div>

//       <div className="stats-grid">
//         <div className="stat-card flashcard-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               ▤
//             </span>

//             <span className="stat-title">
//               TOTAL FLASHCARDS
//             </span>
//           </div>

//           <h3>Total</h3>

//           <p className="stat-value">
//             {total}
//           </p>

//           <span className="stat-description">
//             In your collection
//           </span>
//         </div>

//         <div className="stat-card mastered-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               ✓
//             </span>

//             <span className="stat-title">
//               MASTERED
//             </span>
//           </div>

//           <h3>Mastered</h3>

//           <p className="stat-value">
//             {mastered}
//           </p>

//           <span className="stat-description">
//             Retention criteria met
//           </span>
//         </div>

//         <div className="stat-card deck-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               ⚡
//             </span>

//             <span className="stat-title">
//               LEARNING
//             </span>
//           </div>

//           <h3>Learning</h3>

//           <p className="stat-value">
//             {learning}
//           </p>

//           <span className="stat-description">
//             Not yet mastered
//           </span>
//         </div>

//         <div className="stat-card due-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">
//               !
//             </span>

//             <span className="stat-title">
//               DUE FOR REVIEW
//             </span>
//           </div>

//           <h3>Due Today</h3>

//           <p className="stat-value">
//             {due}
//           </p>

//           <span className="stat-description">
//             Awaiting study
//           </span>
//         </div>
//       </div>

//       <div
//         className="progress-section-card"
//         style={{
//           marginTop: "32px",
//         }}
//       >
//         <div className="section-head">
//           <div>
//             <span className="dashboard-label">
//               YOUR DECKS
//             </span>

//             <h3>
//               Deck Learning Progress
//             </h3>

//             <p>
//               Card count for each
//               learning deck.
//             </p>
//           </div>

//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             View All Decks
//           </Link>
//         </div>

//         {decks.length === 0 ? (
//           <div className="empty-state">
//             <p>
//               No decks found.
//             </p>
//           </div>
//         ) : (
//           <div className="deck-progress-grid">
//             {decks.map((deck) => {
//               const cardCount =
//                 Number(
//                   deck.cardCount
//                 ) || 0;

//               const capacity =
//                 Number(
//                   deck.capacity
//                 ) || null;

//               return (
//                 <div
//                   className="deck-progress-item"
//                   key={deck.id}
//                 >
//                   <div className="deck-progress-header">
//                     <div>
//                       <span className="deck-tag">
//                         {deck.language ||
//                           deck.languageName ||
//                           activeLanguage ||
//                           "Study Deck"}
//                       </span>

//                       <h4>
//                         {deck.title}
//                       </h4>
//                     </div>

//                     <span className="deck-ratio">
//                       {cardCount} Cards
//                       {capacity
//                         ? ` / ${capacity}`
//                         : ""}
//                     </span>
//                   </div>

//                   <p className="deck-desc">
//                     {deck.description ||
//                       "Language-learning collection"}
//                   </p>

//                   <div className="deck-bar-track">
//                     <div
//                       className="deck-bar-fill"
//                       style={{
//                         width: capacity
//                           ? `${Math.min(
//                               Math.round(
//                                 (cardCount /
//                                   capacity) *
//                                   100
//                               ),
//                               100
//                             )}%`
//                           : cardCount > 0
//                           ? "100%"
//                           : "0%",
//                       }}
//                     />
//                   </div>

//                   <div className="deck-progress-footer">
//                     <span>
//                       {capacity
//                         ? `${cardCount} of ${capacity} card capacity used`
//                         : `${cardCount} cards available`}
//                     </span>

//                     <Link
//                       to={`/study?deckId=${deck.id}`}
//                       className="primary-button"
//                       style={{
//                         padding:
//                           "6px 14px",
//                         fontSize:
//                           "13px",
//                       }}
//                     >
//                       Study Deck
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {dueCards.length > 0 && (
//         <div
//           className="progress-section-card"
//           style={{
//             marginTop: "32px",
//           }}
//         >
//           <div className="section-head">
//             <div>
//               <span className="dashboard-label">
//                 SPACED REPETITION
//               </span>

//               <h3>
//                 Retention & Review
//                 Queue
//               </h3>

//               <p>
//                 Cards currently
//                 scheduled for review.
//               </p>
//             </div>

//             <Link
//               to="/study"
//               className="primary-button"
//             >
//               Start Review
//             </Link>
//           </div>

//           <div className="retention-cards-grid">
//             {dueCards.map(
//               (card) => (
//                 <div
//                   className="retention-metric-pill"
//                   key={card.id}
//                 >
//                   <div className="metric-info">
//                     <strong>
//                       {card.frontContent ||
//                         card.frontText ||
//                         card.front ||
//                         "Flashcard"}
//                     </strong>

//                     <span>
//                       {card.backContent ||
//                         card.backText ||
//                         card.back ||
//                         "—"}
//                     </span>
//                   </div>

//                   <div className="metric-stats">
//                     <span className="metric-tag">
//                       {card.masteryLevel ||
//                         "NEW"}
//                     </span>

//                     <span className="metric-ease">
//                       Ease:{" "}
//                       {Number.isFinite(
//                         Number(
//                           card.easeFactor
//                         )
//                       )
//                         ? Number(
//                             card.easeFactor
//                           ).toFixed(1)
//                         : "—"}
//                     </span>

//                     <span className="metric-interval">
//                       {card.intervalDays ??
//                         "—"}
//                       d interval
//                     </span>
//                   </div>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Progress;
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// import api from "../../services/api";

// import {
//   getDueCards,
//   getProgress,
// } from "../../services/analyticsService";


// function unwrapList(data, keys = []) {
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
// }


// function Progress() {
//   const auth = useSelector(
//     (state) => state.auth || {}
//   );

//   const user = auth.user;


//   const reduxLang = useSelector(
//     (state) =>
//       state.languages?.selectedLanguage
//   );


//   const activeLanguage =
//     reduxLang ||
//     user?.learningLanguage ||
//     user?.nativeLanguage ||
//     user?.language ||
//     localStorage.getItem(
//       "langloop_learning_language"
//     ) ||
//     "";


//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");


//   const [progressData, setProgressData] =
//     useState({
//       totalCards: 0,
//       masteredCards: 0,
//       progressPercentage: 0,
//     });


//   const [decks, setDecks] =
//     useState([]);


//   const [dueCards, setDueCards] =
//     useState([]);


//   useEffect(() => {
//     let mounted = true;


//     const fetchProgressData =
//       async () => {

//         setLoading(true);
//         setError("");


//         /*
//          * =================================================
//          * 1. ANALYTICS PROGRESS
//          * =================================================
//          *
//          * IMPORTANT:
//          * No userId is required here.
//          */
//         try {
//           const progress =
//             await getProgress();

//           if (mounted) {
//             setProgressData(
//               progress
//             );
//           }
//         } catch (err) {
//           console.error(
//             "Failed to load progress analytics:",
//             err
//           );

//           /*
//            * Don't destroy the whole page if
//            * analytics temporarily fails.
//            */
//           if (mounted) {
//             setError(
//               "Progress analytics could not be loaded."
//             );
//           }
//         }


//         /*
//          * =================================================
//          * 2. LOAD DECKS
//          * =================================================
//          */
//         try {
//           const response =
//             await api.get("/decks");


//           const loadedDecks =
//             unwrapList(
//               response.data,
//               [
//                 "decks",
//                 "items",
//               ]
//             );


//           const decksWithCards =
//             await Promise.all(
//               loadedDecks.map(
//                 async (deck) => {

//                   try {
//                     const cardResponse =
//                       await api.get(
//                         `/flashcards/deck/${deck.id}`
//                       );


//                     const cards =
//                       unwrapList(
//                         cardResponse.data,
//                         [
//                           "cards",
//                           "flashcards",
//                           "items",
//                         ]
//                       );


//                     return {
//                       ...deck,
//                       cardCount:
//                         cards.length,
//                     };

//                   } catch (err) {

//                     console.error(
//                       `Failed to load cards for deck ${deck.id}:`,
//                       err
//                     );


//                     return {
//                       ...deck,
//                       cardCount: 0,
//                     };
//                   }
//                 }
//               )
//             );


//           if (mounted) {
//             setDecks(
//               decksWithCards
//             );
//           }

//         } catch (err) {

//           console.error(
//             "Failed to load decks:",
//             err
//           );


//           if (mounted) {
//             setDecks([]);
//           }
//         }


//         /*
//          * =================================================
//          * 3. LOAD DUE CARDS
//          * =================================================
//          *
//          * If numeric userId is unavailable,
//          * getDueCards simply returns [].
//          *
//          * It does NOT break the page.
//          */
//         try {
//           const dueList =
//             await getDueCards(user);


//           if (mounted) {
//             setDueCards(
//               dueList || []
//             );
//           }

//         } catch (err) {

//           console.error(
//             "Failed to load due cards:",
//             err
//           );


//           if (mounted) {
//             setDueCards([]);
//           }
//         }


//         if (mounted) {
//           setLoading(false);
//         }
//       };


//     fetchProgressData();


//     return () => {
//       mounted = false;
//     };

//   }, [user]);


//   const total = Math.max(
//     Number(
//       progressData.totalCards
//     ) || 0,
//     0
//   );


//   const mastered = Math.min(
//     Math.max(
//       Number(
//         progressData.masteredCards
//       ) || 0,
//       0
//     ),
//     total
//   );


//   const learning = Math.max(
//     total - mastered,
//     0
//   );


//   const due =
//     dueCards.length;


//   const percentage = Math.min(
//     Math.max(
//       Math.round(
//         Number(
//           progressData.progressPercentage
//         ) || 0
//       ),
//       0
//     ),
//     100
//   );


//   if (loading) {
//     return (
//       <div className="page-container">
//         <div className="dashboard-loading">
//           <h1>
//             Loading progress
//             analytics...
//           </h1>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="page-container">

//       {/* HEADER */}
//       <div className="page-header">

//         <div>

//           <span className="dashboard-label">
//             LEARNING PROGRESS
//           </span>

//           <h1>
//             Learning Progress
//           </h1>

//           <p>
//             Track your retention,
//             flashcard mastery, and
//             study analytics.
//           </p>

//         </div>


//         {activeLanguage && (
//           <div className="active-learning-badge">

//             <span className="badge-pulse" />

//             <span>
//               Learning:{" "}
//               <strong>
//                 {activeLanguage}
//               </strong>
//             </span>

//           </div>
//         )}

//       </div>


//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}


//       {/* OVERALL PROGRESS */}
//       <div className="progress-overview-card">

//         <div className="overview-header">

//           <div>

//             <span className="hero-kicker">
//               OVERALL COMPLETION
//             </span>

//             <h2>
//               {percentage}%
//               Learning Complete
//             </h2>

//             <p>
//               Based on{" "}
//               <strong>
//                 {mastered}
//               </strong>{" "}
//               mastered cards out of{" "}
//               <strong>
//                 {total}
//               </strong>{" "}
//               total flashcards.
//             </p>

//           </div>


//           <div className="overall-pct-circle">
//             <span>
//               {percentage}%
//             </span>
//           </div>

//         </div>


//         <div
//           className="dashboard-progress-bar"
//           style={{
//             height: "14px",
//             marginTop: "16px",
//           }}
//         >

//           <div
//             className="dashboard-progress-fill"
//             style={{
//               width: `${percentage}%`,
//             }}
//           />

//         </div>


//         <div
//           className="progress-footer"
//           style={{
//             marginTop: "8px",
//           }}
//         >

//           <span>
//             {percentage}% completed
//           </span>

//           <strong>
//             {percentage}% completed
//           </strong>

//         </div>

//       </div>


//       {/* BREAKDOWN */}
//       <div
//         className="section-head"
//         style={{
//           marginTop: "32px",
//         }}
//       >

//         <div>

//           <span className="dashboard-label">
//             BREAKDOWN
//           </span>

//           <h3>
//             Flashcard Progress
//           </h3>

//         </div>

//       </div>


//       {/* STATS */}
//       <div className="stats-grid">

//         <div className="stat-card flashcard-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               ▤
//             </span>

//             <span className="stat-title">
//               TOTAL FLASHCARDS
//             </span>

//           </div>

//           <h3>
//             Total
//           </h3>

//           <p className="stat-value">
//             {total}
//           </p>

//           <span className="stat-description">
//             In your collection
//           </span>

//         </div>


//         <div className="stat-card mastered-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               ✓
//             </span>

//             <span className="stat-title">
//               MASTERED
//             </span>

//           </div>

//           <h3>
//             Mastered
//           </h3>

//           <p className="stat-value">
//             {mastered}
//           </p>

//           <span className="stat-description">
//             Retention criteria met
//           </span>

//         </div>


//         <div className="stat-card deck-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               ⚡
//             </span>

//             <span className="stat-title">
//               LEARNING
//             </span>

//           </div>

//           <h3>
//             Learning
//           </h3>

//           <p className="stat-value">
//             {learning}
//           </p>

//           <span className="stat-description">
//             Not yet mastered
//           </span>

//         </div>


//         <div className="stat-card due-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               !
//             </span>

//             <span className="stat-title">
//               DUE FOR REVIEW
//             </span>

//           </div>

//           <h3>
//             Due Today
//           </h3>

//           <p className="stat-value">
//             {due}
//           </p>

//           <span className="stat-description">
//             Awaiting study
//           </span>

//         </div>

//       </div>


//       {/* DECK PROGRESS */}
//       <div
//         className="progress-section-card"
//         style={{
//           marginTop: "32px",
//         }}
//       >

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               YOUR DECKS
//             </span>

//             <h3>
//               Deck Learning Progress
//             </h3>

//             <p>
//               Card count for each
//               learning deck.
//             </p>

//           </div>


//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             View All Decks
//           </Link>

//         </div>


//         {decks.length === 0 ? (

//           <div className="empty-state">
//             <p>
//               No decks found.
//             </p>
//           </div>

//         ) : (

//           <div className="deck-progress-grid">

//             {decks.map((deck) => {

//               const cardCount =
//                 Number(
//                   deck.cardCount
//                 ) || 0;


//               const capacity =
//                 Number(
//                   deck.capacity
//                 ) || null;


//               const percentageFull =
//                 capacity
//                   ? Math.min(
//                       Math.round(
//                         (cardCount /
//                           capacity) *
//                           100
//                       ),
//                       100
//                     )
//                   : cardCount > 0
//                   ? 100
//                   : 0;


//               return (
//                 <div
//                   className="deck-progress-item"
//                   key={deck.id}
//                 >

//                   <div className="deck-progress-header">

//                     <div>

//                       <span className="deck-tag">
//                         {deck.language ||
//                           deck.languageName ||
//                           activeLanguage ||
//                           "Study Deck"}
//                       </span>

//                       <h4>
//                         {deck.title}
//                       </h4>

//                     </div>


//                     <span className="deck-ratio">
//                       {cardCount} Cards
//                       {capacity
//                         ? ` / ${capacity}`
//                         : ""}
//                     </span>

//                   </div>


//                   <p className="deck-desc">
//                     {deck.description ||
//                       "Language-learning collection"}
//                   </p>


//                   <div className="deck-bar-track">

//                     <div
//                       className="deck-bar-fill"
//                       style={{
//                         width: `${percentageFull}%`,
//                       }}
//                     />

//                   </div>


//                   <div className="deck-progress-footer">

//                     <span>
//                       {capacity
//                         ? `${cardCount} of ${capacity} card capacity used`
//                         : `${cardCount} cards available`}
//                     </span>


//                     <Link
//                       to={`/study?deckId=${deck.id}`}
//                       className="primary-button"
//                       style={{
//                         padding:
//                           "6px 14px",
//                         fontSize:
//                           "13px",
//                       }}
//                     >
//                       Study Deck
//                     </Link>

//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         )}

//       </div>


//       {/* DUE CARDS */}
//       {dueCards.length > 0 && (

//         <div
//           className="progress-section-card"
//           style={{
//             marginTop: "32px",
//           }}
//         >

//           <div className="section-head">

//             <div>

//               <span className="dashboard-label">
//                 SPACED REPETITION
//               </span>

//               <h3>
//                 Retention & Review Queue
//               </h3>

//               <p>
//                 Cards currently scheduled
//                 for review.
//               </p>

//             </div>


//             <Link
//               to="/study"
//               className="primary-button"
//             >
//               Start Review
//             </Link>

//           </div>


//           <div className="retention-cards-grid">

//             {dueCards.map((card) => (

//               <div
//                 className="retention-metric-pill"
//                 key={card.id}
//               >

//                 <div className="metric-info">

//                   <strong>
//                     {card.frontContent ||
//                       card.frontText ||
//                       card.front ||
//                       "Flashcard"}
//                   </strong>

//                   <span>
//                     {card.backContent ||
//                       card.backText ||
//                       card.back ||
//                       "—"}
//                   </span>

//                 </div>


//                 <div className="metric-stats">

//                   <span className="metric-tag">
//                     {card.masteryLevel ||
//                       "NEW"}
//                   </span>

//                   <span className="metric-ease">
//                     Ease:{" "}
//                     {Number.isFinite(
//                       Number(
//                         card.easeFactor
//                       )
//                     )
//                       ? Number(
//                           card.easeFactor
//                         ).toFixed(1)
//                       : "—"}
//                   </span>

//                   <span className="metric-interval">
//                     {card.intervalDays ??
//                       "—"}
//                     d interval
//                   </span>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


// export default Progress;
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import { Link } from "react-router-dom";

// import { useSelector } from "react-redux";

// import api from "../../services/api";

// import {
//   getDueCards,
//   getProgress,
//   getLocalDueIds,
//   getLocalMasteredIds,
// } from "../../services/analyticsService";


// const listFrom = (
//   data,
//   keys = []
// ) => {

//   if (Array.isArray(data)) {
//     return data;
//   }


//   for (const key of keys) {

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


// function Progress() {

//   const auth =
//     useSelector(
//       (state) =>
//         state.auth || {}
//     );


//   const user =
//     auth.user;


//   const reduxLang =
//     useSelector(
//       (state) =>
//         state.languages
//           ?.selectedLanguage
//     );


//   const activeLanguage =
//     reduxLang ||
//     user?.learningLanguage ||
//     user?.nativeLanguage ||
//     user?.language ||
//     localStorage.getItem(
//       "langloop_learning_language"
//     ) ||
//     "";


//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     error,
//     setError,
//   ] = useState("");


//   const [
//     progressData,
//     setProgressData,
//   ] = useState({
//     totalCards: 0,
//     masteredCards: 0,
//     progressPercentage: 0,
//   });


//   const [
//     decks,
//     setDecks,
//   ] = useState([]);


//   const [
//     dueCards,
//     setDueCards,
//   ] = useState([]);


//   useEffect(() => {

//     let mounted = true;


//     const fetchProgressData =
//       async () => {

//         setLoading(true);
//         setError("");


//         /*
//          * =================================================
//          * 1. GET ANALYTICS
//          * =================================================
//          */
//         let analytics = {
//           totalCards: 0,
//           masteredCards: 0,
//           progressPercentage: 0,
//         };


//         try {

//           analytics =
//             await getProgress(
//               user
//             );

//         } catch (err) {

//           console.error(
//             "Failed to load progress analytics:",
//             err
//           );

//         }


//         /*
//          * =================================================
//          * 2. GET DECKS
//          * =================================================
//          *
//          * We use the actual deck/card collection as a
//          * reliable fallback for TOTAL FLASHCARDS.
//          */
//         let loadedDecks = [];


//         try {

//           const decksRes =
//             await api.get(
//               "/decks"
//             );


//           const rawDecks =
//             listFrom(
//               decksRes?.data,
//               [
//                 "decks",
//                 "items",
//               ]
//             );


//           loadedDecks =
//             await Promise.all(
//               rawDecks.map(
//                 async (deck) => {

//                   try {

//                     const cardRes =
//                       await api.get(
//                         `/flashcards/deck/${deck.id}`
//                       );


//                     const cards =
//                       listFrom(
//                         cardRes?.data,
//                         [
//                           "cards",
//                           "flashcards",
//                           "items",
//                         ]
//                       );


//                     return {
//                       ...deck,
//                       cardCount:
//                         cards.length,
//                     };

//                   } catch (err) {

//                     console.error(
//                       `Failed to load cards for deck ${deck.id}:`,
//                       err
//                     );


//                     return {
//                       ...deck,
//                       cardCount: 0,
//                     };

//                   }

//                 }
//               )
//             );

//         } catch (err) {

//           console.error(
//             "Failed to load decks:",
//             err
//           );


//           loadedDecks = [];

//         }


//         /*
//          * =================================================
//          * 3. GET DUE CARDS
//          * =================================================
//          */
//         let dueList = [];


//         try {

//           dueList =
//             await getDueCards(
//               user
//             );

//         } catch (err) {

//           console.error(
//             "Failed to load due cards:",
//             err
//           );


//           dueList = [];

//         }


//         if (!mounted) {
//           return;
//         }


//         /*
//          * =================================================
//          * 4. CALCULATE TOTAL CARDS
//          * =================================================
//          */
//         const contentCardCount =
//           loadedDecks.reduce(
//             (
//               sum,
//               deck
//             ) =>
//               sum +
//               Number(
//                 deck.cardCount || 0
//               ),
//             0
//           );


//         /*
//          * If analytics gives a real total, use it.
//          *
//          * Otherwise use actual deck content.
//          */
//         const totalCards =
//           Number(
//             analytics.totalCards
//           ) > 0
//             ? Number(
//                 analytics.totalCards
//               )
//             : contentCardCount;


//         /*
//          * =================================================
//          * 5. MASTERED CARDS
//          * =================================================
//          */
//         const localMasteredIds = getLocalMasteredIds(user);
//         const localMasteredCount = localMasteredIds.size;

//         const masteredCards =
//           Math.min(
//             Math.max(
//               Number(analytics.masteredCards) || 0,
//               localMasteredCount,
//               0
//             ),
//             totalCards
//           );


//         /*
//          * =================================================
//          * 6. PERCENTAGE
//          * =================================================
//          */
//         let progressPercentage =
//           Number(
//             analytics.progressPercentage
//           );


//         /*
//          * If backend gives 0 or no percentage,
//          * calculate it from mastered / total.
//          */
//         if (
//           !Number.isFinite(
//             progressPercentage
//           ) ||
//           progressPercentage < 0
//         ) {

//           progressPercentage = 0;

//         }


//         /*
//          * If mastered cards exist but backend did not
//          * provide a percentage, calculate it ourselves.
//          */
//         if (
//           progressPercentage === 0 &&
//           masteredCards > 0 &&
//           totalCards > 0
//         ) {

//           progressPercentage =
//             (
//               masteredCards /
//               totalCards
//             ) *
//             100;

//         }


//         progressPercentage =
//           Math.min(
//             Math.max(
//               progressPercentage,
//               0
//             ),
//             100
//           );


//         /*
//          * =================================================
//          * 7. UPDATE STATE
//          * =================================================
//          */
//         setProgressData({
//           totalCards,
//           masteredCards,
//           progressPercentage,
//         });


//         setDecks(
//           loadedDecks
//         );


//         // Use backend due cards when available, and fall back to the
//         // frontend-only due list created by StudyMode for Again/Hard.
//         const localDueIds = Array.from(
//           getLocalDueIds(user)
//         ).map(String);

//         const backendDueCards = Array.isArray(dueList)
//           ? dueList
//           : [];

//         const backendDueIds = new Set(
//           backendDueCards
//             .map((card) =>
//               card?.id ?? card?.flashcardId ?? card?.cardId
//             )
//             .filter((id) => id != null)
//             .map(String)
//         );

//         const mergedDueCards = [...backendDueCards];

//         // Add lightweight local entries so the existing UI can display
//         // the correct Due count even when the backend has no due endpoint
//         // that can update the review state.
//         localDueIds.forEach((id) => {
//           if (!backendDueIds.has(id)) {
//             mergedDueCards.push({
//               id,
//               flashcardId: id,
//               frontContent: "Card due for review",
//               backContent: "Review this card again",
//             });
//           }
//         });

//         setDueCards(mergedDueCards);


//         setLoading(false);

//       };


//     fetchProgressData();


//     return () => {

//       mounted = false;

//     };

//   }, [user]);


//   /*
//    * =====================================================
//    * DISPLAY VALUES
//    * =====================================================
//    */
//   const total =
//     progressData.totalCards;


//   const mastered =
//     progressData.masteredCards;


//   const learning =
//     Math.max(
//       total -
//         mastered,
//       0
//     );


//   const due =
//     dueCards.length;


//   const percentage =
//     Math.round(
//       progressData.progressPercentage
//     );


//   const hasCards =
//     total > 0;


//   /*
//    * =====================================================
//    * LOADING
//    * =====================================================
//    */
//   if (loading) {

//     return (

//       <div className="page-container">

//         <div className="dashboard-loading">

//           <h1>
//             Loading progress analytics...
//           </h1>

//         </div>

//       </div>

//     );

//   }


//   /*
//    * =====================================================
//    * PAGE
//    * =====================================================
//    */
//   return (

//     <div className="page-container">

//       {/* HEADER */}

//       <div className="page-header">

//         <div>

//           <span className="dashboard-label">
//             LEARNING PROGRESS
//           </span>


//           <h1>
//             Learning Progress
//           </h1>


//           <p>
//             Track your retention,
//             flashcard mastery, and
//             study analytics.
//           </p>

//         </div>


//         {activeLanguage && (

//           <div className="active-learning-badge">

//             <span className="badge-pulse"></span>


//             <span>

//               Learning:{" "}

//               <strong>
//                 {activeLanguage}
//               </strong>

//             </span>

//           </div>

//         )}

//       </div>


//       {/* ERROR */}

//       {error && (

//         <div className="error-message">

//           {error}

//         </div>

//       )}


//       {/* OVERALL COMPLETION */}

//       <div className="progress-overview-card">

//         <div className="overview-header">

//           <div>

//             <span className="hero-kicker">
//               OVERALL COMPLETION
//             </span>


//             <h2>

//               {hasCards
//                 ? `${percentage}% Learning Complete`
//                 : "No learning progress yet"}

//             </h2>


//             <p>

//               {hasCards
//                 ? `Based on ${mastered} mastered cards out of ${total} total flashcards.`
//                 : "Add or join a study deck to start learning."}

//             </p>

//           </div>


//           <div className="overall-pct-circle">

//             <span>
//               {percentage}%
//             </span>

//           </div>

//         </div>


//         <div
//           className="dashboard-progress-bar"
//           style={{
//             height: "14px",
//             marginTop: "16px",
//           }}
//         >

//           <div
//             className="dashboard-progress-fill"
//             style={{
//               width:
//                 `${percentage}%`,
//             }}
//           />

//         </div>


//         <div
//           className="progress-footer"
//           style={{
//             marginTop: "8px",
//           }}
//         >

//           <span>

//             {hasCards
//               ? `${mastered} mastered`
//               : "No cards yet"}

//           </span>


//           <strong>
//             {percentage}% completed
//           </strong>

//         </div>

//       </div>


//       {/* BREAKDOWN */}

//       <div
//         className="section-head"
//         style={{
//           marginTop: "32px",
//         }}
//       >

//         <div>

//           <span className="dashboard-label">
//             BREAKDOWN
//           </span>


//           <h3>
//             Flashcard Progress
//           </h3>

//         </div>

//       </div>


//       {/* STAT CARDS */}

//       <div className="stats-grid">

//         {/* TOTAL */}

//         <div className="stat-card flashcard-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               ▤
//             </span>


//             <span className="stat-title">
//               TOTAL FLASHCARDS
//             </span>

//           </div>


//           <h3>
//             Total
//           </h3>


//           <p className="stat-value">
//             {total}
//           </p>


//           <span className="stat-description">
//             In your collection
//           </span>

//         </div>


//         {/* MASTERED */}

//         <div className="stat-card mastered-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               ✓
//             </span>


//             <span className="stat-title">
//               MASTERED
//             </span>

//           </div>


//           <h3>
//             Mastered
//           </h3>


//           <p className="stat-value">
//             {mastered}
//           </p>


//           <span className="stat-description">
//             Retention criteria met
//           </span>

//         </div>


//         {/* LEARNING */}

//         <div className="stat-card deck-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               ⚡
//             </span>


//             <span className="stat-title">
//               LEARNING
//             </span>

//           </div>


//           <h3>
//             Learning
//           </h3>


//           <p className="stat-value">
//             {learning}
//           </p>


//           <span className="stat-description">
//             Not yet mastered
//           </span>

//         </div>


//         {/* DUE */}

//         <div className="stat-card due-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               !
//             </span>


//             <span className="stat-title">
//               DUE FOR REVIEW
//             </span>

//           </div>


//           <h3>
//             Due Today
//           </h3>


//           <p className="stat-value">
//             {due}
//           </p>


//           <span className="stat-description">
//             Awaiting study
//           </span>

//         </div>

//       </div>


//       {/* DECK CONTENT */}

//       <div
//         className="progress-section-card"
//         style={{
//           marginTop: "32px",
//         }}
//       >

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               COLLECTION STATUS
//             </span>


//             <h3>
//               Deck Content Coverage
//             </h3>


//             <p>
//               Flashcard count compared with
//               each deck's stated capacity.
//             </p>

//           </div>


//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             View All Decks
//           </Link>

//         </div>


//         {decks.length === 0 ? (

//           <div className="empty-state">

//             <p>
//               No decks found.
//             </p>

//           </div>

//         ) : (

//           <div className="deck-progress-grid">

//             {decks.map(
//               (deck) => {

//                 const capacity =
//                   Number(
//                     deck.capacity ||
//                       50
//                   );


//                 const cardCount =
//                   Number(
//                     deck.cardCount ||
//                       0
//                   );


//                 const deckPct =
//                   capacity > 0
//                     ? Math.round(
//                         Math.min(
//                           (
//                             cardCount /
//                             capacity
//                           ) *
//                             100,
//                           100
//                         )
//                       )
//                     : 0;


//                 return (

//                   <div
//                     className="deck-progress-item"
//                     key={deck.id}
//                   >

//                     <div className="deck-progress-header">

//                       <div>

//                         <span className="deck-tag">

//                           {deck.language ||
//                             deck.languageName ||
//                             activeLanguage ||
//                             "Study Deck"}

//                         </span>


//                         <h4>
//                           {deck.title}
//                         </h4>

//                       </div>


//                       <span className="deck-ratio">

//                         {cardCount} /{" "}
//                         {capacity} Cards

//                       </span>

//                     </div>


//                     <p className="deck-desc">

//                       {deck.description ||
//                         "Active language learning deck"}

//                     </p>


//                     <div className="deck-bar-track">

//                       <div
//                         className="deck-bar-fill"
//                         style={{
//                           width:
//                             `${deckPct}%`,
//                         }}
//                       />

//                     </div>


//                     <div className="deck-progress-footer">

//                       <span>
//                         Capacity:{" "}
//                         {deckPct}% full
//                       </span>


//                       <Link
//                         to={`/study?deckId=${deck.id}`}
//                         className="primary-button"
//                         style={{
//                           padding:
//                             "6px 14px",
//                           fontSize:
//                             "13px",
//                         }}
//                       >
//                         Study Deck
//                       </Link>

//                     </div>

//                   </div>

//                 );

//               }
//             )}

//           </div>

//         )}

//       </div>


//       {/* DUE CARDS */}

//       {dueCards.length > 0 && (

//         <div
//           className="progress-section-card"
//           style={{
//             marginTop: "32px",
//           }}
//         >

//           <div className="section-head">

//             <div>

//               <span className="dashboard-label">
//                 SPACED REPETITION
//               </span>


//               <h3>
//                 Retention & Review Metrics
//               </h3>


//               <p>
//                 Active memory retention
//                 intervals for due cards.
//               </p>

//             </div>


//             <Link
//               to="/study"
//               className="primary-button"
//             >
//               Start Review Session
//             </Link>

//           </div>


//           <div className="retention-cards-grid">

//             {dueCards.map(
//               (card, index) => (

//                 <div
//                   className="retention-metric-pill"
//                   key={
//                     card.id ??
//                     `${card.front}-${index}`
//                   }
//                 >

//                   <div className="metric-info">

//                     <strong>

//                       {card.frontContent ||
//                         card.frontText ||
//                         card.front ||
//                         "Card"}

//                     </strong>


//                     <span>

//                       {card.backContent ||
//                         card.backText ||
//                         card.back ||
//                         "—"}

//                     </span>

//                   </div>


//                   <div className="metric-stats">

//                     <span className="metric-tag">

//                       {card.masteryLevel ||
//                         "NEW"}

//                     </span>


//                     <span className="metric-ease">

//                       Ease:{" "}

//                       {card.easeFactor
//                         ? Number(
//                             card.easeFactor
//                           ).toFixed(1)
//                         : "2.5"}

//                     </span>


//                     <span className="metric-interval">

//                       {card.intervalDays ??
//                         1}
//                       d interval

//                     </span>

//                   </div>

//                 </div>

//               )
//             )}

//           </div>

//         </div>

//       )}

//     </div>

//   );
// }


// export default Progress;

import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import api from "../../services/api";

import {
  getDueCards,
  getProgress,
  getLocalDueIds,
  getLocalMasteredIds,
} from "../../services/analyticsService";


/* =========================================================
   HELPERS
========================================================= */

const listFrom = (
  data,
  keys = []
) => {

  if (Array.isArray(data)) {
    return data;
  }

  for (const key of keys) {

    if (
      Array.isArray(
        data?.[key]
      )
    ) {
      return data[key];
    }

  }

  if (
    Array.isArray(
      data?.data
    )
  ) {
    return data.data;
  }

  return [];
};


/* =========================================================
   PROGRESS
========================================================= */

function Progress() {

  const auth =
    useSelector(
      (state) =>
        state.auth || {}
    );

  const user =
    auth.user;


  /* =======================================================
     ROLE
  ======================================================= */

  const role =
    String(
      user?.role ||
      localStorage.getItem(
        "langloop_role"
      ) ||
      "LEARNER"
    ).toUpperCase();

  const isLearner =
    role === "LEARNER";

  const isLinguist =
    role === "LINGUIST";


  /* =======================================================
     LANGUAGE
  ======================================================= */

  const reduxLang =
    useSelector(
      (state) =>
        state.languages
          ?.selectedLanguage
    );


  const activeLanguage =
    reduxLang ||
    user?.learningLanguage ||
    user?.nativeLanguage ||
    user?.language ||
    localStorage.getItem(
      "langloop_learning_language"
    ) ||
    "";


  /* =======================================================
     STATE
  ======================================================= */

  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  const [
    progressData,
    setProgressData,
  ] = useState({
    totalCards: 0,
    masteredCards: 0,
    progressPercentage: 0,
  });


  const [
    decks,
    setDecks,
  ] = useState([]);


  const [
    dueCards,
    setDueCards,
  ] = useState([]);


  /* =======================================================
     LOAD DATA
  ======================================================= */

  useEffect(() => {

    let mounted = true;


    const fetchProgressData =
      async () => {

        setLoading(true);
        setError("");


        /* =================================================
           LOAD DECKS
        ================================================= */

        let loadedDecks = [];


        try {

          const decksRes =
            await api.get(
              "/decks"
            );


          const rawDecks =
            listFrom(
              decksRes?.data,
              [
                "decks",
                "items",
              ]
            );


          loadedDecks =
            await Promise.all(
              rawDecks.map(
                async (deck) => {

                  try {

                    const cardRes =
                      await api.get(
                        `/flashcards/deck/${deck.id}`
                      );


                    const cards =
                      listFrom(
                        cardRes?.data,
                        [
                          "cards",
                          "flashcards",
                          "items",
                        ]
                      );


                    return {
                      ...deck,
                      cardCount:
                        cards.length,
                    };

                  } catch (err) {

                    console.warn(
                      `Failed to load cards for deck ${deck.id}:`,
                      err
                    );


                    return {
                      ...deck,
                      cardCount: 0,
                    };

                  }

                }
              )
            );

        } catch (err) {

          console.error(
            "Failed to load decks:",
            err
          );

          loadedDecks = [];

        }


        if (!mounted) {
          return;
        }


        /* =================================================
           ADMIN / LINGUIST
           
           DO NOT REQUEST:
             /analytics/progress
             /study/due
           
           They don't need learner review analytics.
        ================================================= */

        if (!isLearner) {

          setProgressData({
            totalCards:
              loadedDecks.reduce(
                (
                  sum,
                  deck
                ) =>
                  sum +
                  Number(
                    deck.cardCount ||
                    0
                  ),
                0
              ),

            masteredCards: 0,

            progressPercentage: 0,
          });


          setDueCards([]);


          setDecks(
            loadedDecks
          );


          setLoading(false);

          return;

        }


        /* =================================================
           LEARNER ANALYTICS
        ================================================= */

        let analytics = {
          totalCards: 0,
          masteredCards: 0,
          progressPercentage: 0,
        };


        try {

          analytics =
            await getProgress(
              user
            );

        } catch (err) {

          console.error(
            "Failed to load progress analytics:",
            err
          );

        }


        /* =================================================
           TOTAL CARDS
        ================================================= */

        const contentCardCount =
          loadedDecks.reduce(
            (
              sum,
              deck
            ) =>
              sum +
              Number(
                deck.cardCount ||
                0
              ),
            0
          );


        const backendTotal =
          Number(
            analytics.totalCards
          ) || 0;


        const totalCards =
          backendTotal > 0
            ? backendTotal
            : contentCardCount;


        /* =================================================
           MASTERED
        ================================================= */

        const localMasteredIds =
          getLocalMasteredIds(
            user
          );


        const localMasteredCount =
          localMasteredIds.size;


        const masteredCards =
          Math.min(
            Math.max(
              Number(
                analytics.masteredCards
              ) || 0,

              localMasteredCount,

              0
            ),

            totalCards
          );


        /* =================================================
           PERCENTAGE
        ================================================= */

        let progressPercentage =
          Number(
            analytics.progressPercentage
          );


        if (
          !Number.isFinite(
            progressPercentage
          )
        ) {

          progressPercentage = 0;

        }


        if (
          progressPercentage === 0 &&
          masteredCards > 0 &&
          totalCards > 0
        ) {

          progressPercentage =
            (
              masteredCards /
              totalCards
            ) *
            100;

        }


        progressPercentage =
          Math.min(
            Math.max(
              progressPercentage,
              0
            ),
            100
          );


        /* =================================================
           DUE CARDS
        ================================================= */

        let dueList = [];


        try {

          dueList =
            await getDueCards(
              user
            );

        } catch (err) {

          console.error(
            "Failed to load due cards:",
            err
          );

          dueList = [];

        }


        /* =================================================
           MERGE LOCAL DUE STATUS
           
           Keeps existing learner review system working.
        ================================================= */

        const localDueIds =
          Array.from(
            getLocalDueIds(
              user
            )
          ).map(String);


        const backendDueCards =
          Array.isArray(
            dueList
          )
            ? dueList
            : [];


        const backendDueIds =
          new Set(
            backendDueCards
              .map(
                (card) =>
                  card?.id ??
                  card?.flashcardId ??
                  card?.cardId
              )
              .filter(
                (id) =>
                  id != null
              )
              .map(String)
          );


        const mergedDueCards =
          [
            ...backendDueCards,
          ];


        localDueIds.forEach(
          (id) => {

            if (
              !backendDueIds.has(
                id
              )
            ) {

              mergedDueCards.push({
                id,
                flashcardId:
                  id,
                frontContent:
                  "Card due for review",
                backContent:
                  "Review this card again",
              });

            }

          }
        );


        if (!mounted) {
          return;
        }


        /* =================================================
           UPDATE LEARNER STATE
        ================================================= */

        setProgressData({
          totalCards,
          masteredCards,
          progressPercentage,
        });


        setDecks(
          loadedDecks
        );


        setDueCards(
          mergedDueCards
        );


        setLoading(false);

      };


    fetchProgressData();


    return () => {

      mounted = false;

    };

  }, [
    user,
    role,
    isLearner,
  ]);


  /* =======================================================
     DISPLAY VALUES
  ======================================================= */

  const total =
    progressData.totalCards;


  const mastered =
    progressData.masteredCards;


  const learning =
    Math.max(
      total -
      mastered,
      0
    );


  const due =
    dueCards.length;


  const percentage =
    Math.round(
      progressData.progressPercentage
    );


  const hasCards =
    total > 0;


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (

      <div className="page-container">

        <div className="dashboard-loading">

          <h1>
            Loading progress analytics...
          </h1>

        </div>

      </div>

    );

  }


  /* =======================================================
     ADMIN / LINGUIST PAGE
     
     NO learner progress metrics.
  ======================================================= */

  if (!isLearner) {

    const totalDecks =
      decks.length;


    const totalFlashcards =
      decks.reduce(
        (
          sum,
          deck
        ) =>
          sum +
          Number(
            deck.cardCount ||
            0
          ),
        0
      );


    return (

      <div
        className={
          `page-container role-progress role-progress-${role.toLowerCase()}`
        }
      >

        {/* HEADER */}

        <div className="page-header">

          <div>

            <span className="dashboard-label">

              {isLinguist
                ? "LINGUIST CONTENT"
                : "ADMIN CONTENT"}

            </span>


            <h1>
              Content Overview
            </h1>


            <p>

              {isLinguist
                ? "Review available learning content and deck coverage."
                : "Monitor available learning content and platform deck coverage."}

            </p>

          </div>

        </div>


        {/* CONTENT STATS */}

        <div className="stats-grid">

          {/* DECKS */}

          <div className="stat-card deck-stat">

            <div className="stat-card-top">

              <span className="stat-icon">
                ▣
              </span>


              <span className="stat-title">
                TOTAL DECKS
              </span>

            </div>


            <h3>
              Total Decks
            </h3>


            <p className="stat-value">
              {totalDecks}
            </p>


            <span className="stat-description">
              Available learning collections
            </span>

          </div>


          {/* FLASHCARDS */}

          <div className="stat-card flashcard-stat">

            <div className="stat-card-top">

              <span className="stat-icon">
                ▤
              </span>


              <span className="stat-title">
                TOTAL FLASHCARDS
              </span>

            </div>


            <h3>
              Total Flashcards
            </h3>


            <p className="stat-value">
              {totalFlashcards}
            </p>


            <span className="stat-description">
              Cards across available decks
            </span>

          </div>

        </div>


        {/* DECK CONTENT */}

        <div
          className="progress-section-card"
          style={{
            marginTop: "32px",
          }}
        >

          <div className="section-head">

            <div>

              <span className="dashboard-label">
                COLLECTION STATUS
              </span>


              <h3>
                Deck Content Coverage
              </h3>


              <p>
                Flashcard count compared with
                each deck's stated capacity.
              </p>

            </div>


            <Link
              to="/decks"
              className="secondary-button"
            >
              View All Decks
            </Link>

          </div>


          {decks.length === 0 ? (

            <div className="empty-state">

              <p>
                No decks found.
              </p>

            </div>

          ) : (

            <div className="deck-progress-grid">

              {decks.map(
                (deck) => {

                  const capacity =
                    Number(
                      deck.capacity ||
                      50
                    );


                  const cardCount =
                    Number(
                      deck.cardCount ||
                      0
                    );


                  const deckPct =
                    capacity > 0
                      ? Math.round(
                          Math.min(
                            (
                              cardCount /
                              capacity
                            ) *
                            100,
                            100
                          )
                        )
                      : 0;


                  return (

                    <div
                      className="deck-progress-item"
                      key={deck.id}
                    >

                      <div className="deck-progress-header">

                        <div>

                          <span className="deck-tag">

                            {deck.language ||
                              deck.languageName ||
                              activeLanguage ||
                              "Study Deck"}

                          </span>


                          <h4>
                            {deck.title}
                          </h4>

                        </div>


                        <span className="deck-ratio">

                          {cardCount} /{" "}
                          {capacity} Cards

                        </span>

                      </div>


                      <p className="deck-desc">

                        {deck.description ||
                          "Learning content deck"}

                      </p>


                      <div className="deck-bar-track">

                        <div
                          className="deck-bar-fill"
                          style={{
                            width:
                              `${deckPct}%`,
                          }}
                        />

                      </div>


                      <div className="deck-progress-footer">

                        <span>
                          Capacity:{" "}
                          {deckPct}% full
                        </span>


                        <Link
                          to={`/study?deckId=${deck.id}`}
                          className="primary-button"
                          style={{
                            padding:
                              "6px 14px",
                            fontSize:
                              "13px",
                          }}
                        >
                          View Deck
                        </Link>

                      </div>

                    </div>

                  );

                }
              )}

            </div>

          )}

        </div>

      </div>

    );

  }


  /* =======================================================
     LEARNER PAGE
     
     EXISTING PROGRESS + REVIEW SYSTEM
  ======================================================= */

  return (

    <div className="page-container">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <span className="dashboard-label">
            LEARNING PROGRESS
          </span>


          <h1>
            Learning Progress
          </h1>


          <p>
            Track your retention,
            flashcard mastery, and
            study analytics.
          </p>

        </div>


        {activeLanguage && (

          <div className="active-learning-badge">

            <span className="badge-pulse"></span>


            <span>

              Learning:{" "}

              <strong>
                {activeLanguage}
              </strong>

            </span>

          </div>

        )}

      </div>


      {/* ERROR */}

      {error && (

        <div className="error-message">
          {error}
        </div>

      )}


      {/* OVERALL COMPLETION */}

      <div className="progress-overview-card">

        <div className="progress-overview-content">

          <div>

            <span className="dashboard-label">
              OVERALL COMPLETION
            </span>


            <h2>

              {hasCards
                ? `${percentage}% Learning Complete`
                : "No learning progress yet"}

            </h2>


            <p>

              {hasCards
                ? `Based on ${mastered} mastered cards out of ${total} total flashcards.`
                : "Add or join a study deck to start learning."}

            </p>

          </div>


          <div className="overall-pct-circle">

            <span>
              {percentage}%
            </span>

          </div>

        </div>


        <div
          className="dashboard-progress-bar"
          style={{
            height: "14px",
            marginTop: "16px",
          }}
        >

          <div
            className="dashboard-progress-fill"
            style={{
              width:
                `${percentage}%`,
            }}
          />

        </div>


        <div
          className="progress-footer"
          style={{
            marginTop: "8px",
          }}
        >

          <span>

            {hasCards
              ? `${mastered} mastered`
              : "No cards yet"}

          </span>


          <strong>
            {percentage}% completed
          </strong>

        </div>

      </div>


      {/* BREAKDOWN */}

      <div
        className="section-head"
        style={{
          marginTop: "32px",
        }}
      >

        <div>

          <span className="dashboard-label">
            BREAKDOWN
          </span>


          <h3>
            Flashcard Progress
          </h3>

        </div>

      </div>


      {/* STAT CARDS */}

      <div className="stats-grid">

        {/* TOTAL */}

        <div className="stat-card flashcard-stat">

          <div className="stat-card-top">

            <span className="stat-icon">
              ▤
            </span>


            <span className="stat-title">
              TOTAL FLASHCARDS
            </span>

          </div>


          <h3>
            Total
          </h3>


          <p className="stat-value">
            {total}
          </p>


          <span className="stat-description">
            In your collection
          </span>

        </div>


        {/* MASTERED */}

        <div className="stat-card mastered-stat">

          <div className="stat-card-top">

            <span className="stat-icon">
              ✓
            </span>


            <span className="stat-title">
              MASTERED
            </span>

          </div>


          <h3>
            Mastered
          </h3>


          <p className="stat-value">
            {mastered}
          </p>


          <span className="stat-description">
            Retention criteria met
          </span>

        </div>


        {/* LEARNING */}

        <div className="stat-card deck-stat">

          <div className="stat-card-top">

            <span className="stat-icon">
              ⚡
            </span>


            <span className="stat-title">
              LEARNING
            </span>

          </div>


          <h3>
            Learning
          </h3>


          <p className="stat-value">
            {learning}
          </p>


          <span className="stat-description">
            Not yet mastered
          </span>

        </div>


        {/* DUE */}

        <div className="stat-card due-stat">

          <div className="stat-card-top">

            <span className="stat-icon">
              !
            </span>


            <span className="stat-title">
              DUE FOR REVIEW
            </span>

          </div>


          <h3>
            Due Today
          </h3>


          <p className="stat-value">
            {due}
          </p>


          <span className="stat-description">
            Awaiting study
          </span>

        </div>

      </div>


      {/* DECK CONTENT */}

      <div
        className="progress-section-card"
        style={{
          marginTop: "32px",
        }}
      >

        <div className="section-head">

          <div>

            <span className="dashboard-label">
              COLLECTION STATUS
            </span>


            <h3>
              Deck Content Coverage
            </h3>


            <p>
              Flashcard count compared with
              each deck's stated capacity.
            </p>

          </div>


          <Link
            to="/decks"
            className="secondary-button"
          >
            View All Decks
          </Link>

        </div>


        {decks.length === 0 ? (

          <div className="empty-state">

            <p>
              No decks found.
            </p>

          </div>

        ) : (

          <div className="deck-progress-grid">

            {decks.map(
              (deck) => {

                const capacity =
                  Number(
                    deck.capacity ||
                    50
                  );


                const cardCount =
                  Number(
                    deck.cardCount ||
                    0
                  );


                const deckPct =
                  capacity > 0
                    ? Math.round(
                        Math.min(
                          (
                            cardCount /
                            capacity
                          ) *
                            100,
                          100
                        )
                      )
                    : 0;


                return (

                  <div
                    className="deck-progress-item"
                    key={deck.id}
                  >

                    <div className="deck-progress-header">

                      <div>

                        <span className="deck-tag">

                          {deck.language ||
                            deck.languageName ||
                            activeLanguage ||
                            "Study Deck"}

                        </span>


                        <h4>
                          {deck.title}
                        </h4>

                      </div>


                      <span className="deck-ratio">

                        {cardCount} /{" "}
                        {capacity} Cards

                      </span>

                    </div>


                    <p className="deck-desc">

                      {deck.description ||
                        "Active language learning deck"}

                    </p>


                    <div className="deck-bar-track">

                      <div
                        className="deck-bar-fill"
                        style={{
                          width:
                            `${deckPct}%`,
                        }}
                      />

                    </div>


                    <div className="deck-progress-footer">

                      <span>
                        Capacity:{" "}
                        {deckPct}% full
                      </span>


                      <Link
                        to={`/study?deckId=${deck.id}`}
                        className="primary-button"
                        style={{
                          padding:
                            "6px 14px",
                          fontSize:
                            "13px",
                        }}
                      >
                        Study Deck
                      </Link>

                    </div>

                  </div>

                );

              }
            )}

          </div>

        )}

      </div>


      {/* DUE CARDS */}

      {dueCards.length > 0 && (

        <div
          className="progress-section-card"
          style={{
            marginTop: "32px",
          }}
        >

          <div className="section-head">

            <div>

              <span className="dashboard-label">
                SPACED REPETITION
              </span>


              <h3>
                Retention & Review Metrics
              </h3>


              <p>
                Active memory retention
                intervals for due cards.
              </p>

            </div>


            <Link
              to="/study?review=true"
              className="primary-button"
            >
              Start Review Session
            </Link>

          </div>


          <div className="retention-cards-grid">

            {dueCards.map(
              (
                card,
                index
              ) => (

                <div
                  className="retention-metric-pill"
                  key={
                    card.id ??
                    `${card.front}-${index}`
                  }
                >

                  <div className="metric-info">

                    <strong>

                      {card.frontContent ||
                        card.frontText ||
                        card.front ||
                        "Card"}

                    </strong>


                    <span>

                      {card.backContent ||
                        card.backText ||
                        card.back ||
                        "—"}

                    </span>

                  </div>


                  <div className="metric-stats">

                    <span className="metric-tag">

                      {card.masteryLevel ||
                        "NEW"}

                    </span>


                    <span className="metric-ease">

                      Ease:{" "}

                      {card.easeFactor
                        ? Number(
                            card.easeFactor
                          ).toFixed(1)
                        : "2.5"}

                    </span>


                    <span className="metric-interval">

                      {card.intervalDays ??
                        1}
                      d interval

                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>

  );
}


export default Progress;