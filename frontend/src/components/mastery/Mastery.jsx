// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import api from "../../services/api";

// // function Mastery() {
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
// //   const [analytics, setAnalytics] = useState({
// //     totalCards: 0,
// //     masteredCards: 0,
// //     progressPercentage: 0,
// //   });

// //   const [dueCards, setDueCards] = useState([]);
// //   const [allCards, setAllCards] = useState([]);

// //   useEffect(() => {
// //     const fetchMasteryData = async () => {
// //       setLoading(true);
// //       setError("");

// //       try {
// //         // 1. Fetch real analytics progress
// //         let progressData = { totalCards: 0, masteredCards: 0, progressPercentage: 0 };
// //         try {
// //           const res = await api.get("/analytics/progress");
// //           if (res?.data) {
// //             progressData = {
// //               totalCards: res.data.totalCards ?? 0,
// //               masteredCards: res.data.masteredCards ?? 0,
// //               progressPercentage: res.data.progressPercentage ?? 0,
// //             };
// //             setAnalytics(progressData);
// //           }
// //         } catch (err) {
// //           console.error("Failed to load progress in Mastery:", err);
// //         }

// //         // 2. Fetch real due cards with masteryLevel (NEW, LEARNING, MASTERED)
// //         const currentUserId = user?.id || 10;
// //         let dueList = [];
// //         try {
// //           let dueRes;
// //           try {
// //             dueRes = await api.get(`/study/due?userId=${currentUserId}`);
// //           } catch (e) {
// //             dueRes = await api.get("/study/due?userId=1");
// //           }
// //           if (Array.isArray(dueRes?.data)) {
// //             dueList = dueRes.data;
// //           } else if (Array.isArray(dueRes?.data?.cards)) {
// //             dueList = dueRes.data.cards;
// //           }
// //           setDueCards(dueList);
// //         } catch (err) {
// //           console.error("Failed to load due cards in Mastery:", err);
// //         }

// //         // 3. Fetch cards across decks for comprehensive mastery listing
// //         try {
// //           const decksRes = await api.get("/decks");
// //           const decks = Array.isArray(decksRes.data)
// //             ? decksRes.data
// //             : decksRes.data?.decks || [];

// //           const cardsPromises = decks.map(async (d) => {
// //             try {
// //               const cRes = await api.get(`/flashcards/deck/${d.id}`);
// //               const cards = Array.isArray(cRes.data) ? cRes.data : [];
// //               return cards.map((c) => ({
// //                 ...c,
// //                 deckTitle: d.title,
// //                 deckId: d.id,
// //               }));
// //             } catch (e) {
// //               return [];
// //             }
// //           });

// //           const cardsArrays = await Promise.all(cardsPromises);
// //           setAllCards(cardsArrays.flat());
// //         } catch (err) {
// //           console.error("Failed to load deck cards in Mastery:", err);
// //         }
// //       } catch (err) {
// //         setError("Unable to load mastery details.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchMasteryData();
// //   }, [user?.id]);

// //   const masteredCount = analytics.masteredCards;
// //   const learningCount = Math.max(analytics.totalCards - analytics.masteredCards, 0);
// //   const masteryScore = Math.round(analytics.progressPercentage);

// //   if (loading) {
// //     return (
// //       <div className="page-container">
// //         <div className="dashboard-loading">
// //           <h1>Loading mastery data...</h1>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="page-container">
// //       {/* HEADER */}
// //       <div className="page-header">
// //         <div>
// //           <span className="dashboard-label">MASTERY LEVELS</span>
// //           <h1>Your Mastery</h1>
// //           <p>See what you've learned and what needs more practice.</p>
// //         </div>

// //         {activeLanguage && (
// //           <div className="active-learning-badge">
// //             <span className="badge-pulse"></span>
// //             <span>Learning: <strong>{activeLanguage}</strong></span>
// //           </div>
// //         )}
// //       </div>

// //       {error && <div className="error-message">{error}</div>}

// //       {/* MASTERY OVERALL SCORE HERO */}
// //       <div className="mastery-hero-card">
// //         <div className="mastery-hero-content">
// //           <span className="hero-kicker">OVERALL PROFICIENCY</span>
// //           <h2>
// //             {masteryScore}% Mastered
// //           </h2>
// //           <p>
// //             You have mastered <strong>{masteredCount}</strong> out of{" "}
// //             <strong>{analytics.totalCards}</strong> total flashcards in your{" "}
// //             {activeLanguage ? `${activeLanguage} ` : ""}collection.
// //           </p>

// //           <div className="mastery-progress-bar-large">
// //             <div
// //               className="mastery-progress-fill-large"
// //               style={{ width: `${Math.min(Math.max(masteryScore, 0), 100)}%` }}
// //             />
// //           </div>

// //           <div className="mastery-progress-legend">
// //             <span>0% Beginner</span>
// //             <span>Progress: {masteryScore}%</span>
// //             <span>100% Full Mastery</span>
// //           </div>
// //         </div>

// //         <div className="mastery-hero-action">
// //           <Link to="/study" className="primary-button">
// //             Practice Due Cards ({dueCards.length})
// //           </Link>
// //         </div>
// //       </div>

// //       {/* REAL MASTERY CATEGORIES BREAKDOWN */}
// //       <div className="mastery-categories-grid">
// //         <div className="mastery-category-card mastered-cat">
// //           <div className="cat-top">
// //             <span className="cat-badge">MASTERED</span>
// //             <span className="cat-icon">✓</span>
// //           </div>
// //           <strong className="cat-count">{masteredCount}</strong>
// //           <span className="cat-label">Mastered Flashcards</span>
// //           <p className="cat-desc">
// //             Cards that have successfully reached retention criteria.
// //           </p>
// //         </div>

// //         <div className="mastery-category-card learning-cat">
// //           <div className="cat-top">
// //             <span className="cat-badge">LEARNING</span>
// //             <span className="cat-icon">⚡</span>
// //           </div>
// //           <strong className="cat-count">{learningCount}</strong>
// //           <span className="cat-label">Learning in Progress</span>
// //           <p className="cat-desc">
// //             Cards currently undergoing spaced review cycles.
// //           </p>
// //         </div>

// //         <div className="mastery-category-card due-cat">
// //           <div className="cat-top">
// //             <span className="cat-badge">NEW / DUE</span>
// //             <span className="cat-icon">!</span>
// //           </div>
// //           <strong className="cat-count">{dueCards.length}</strong>
// //           <span className="cat-label">Cards Needing Review</span>
// //           <p className="cat-desc">
// //             Cards scheduled for retention practice today.
// //           </p>
// //         </div>
// //       </div>

// //       {/* DUE CARDS & SPACED REPETITION MASTERY */}
// //       {dueCards.length > 0 && (
// //         <div className="mastery-section-card">
// //           <div className="section-head">
// //             <div>
// //               <span className="dashboard-label">SPACED REPETITION QUEUE</span>
// //               <h3>Cards Due for Mastery Review</h3>
// //               <p>Real spaced repetition metrics and ease factors</p>
// //             </div>
// //             <Link to="/study" className="primary-button">
// //               Review Now
// //             </Link>
// //           </div>

// //           <div className="mastery-table-wrapper">
// //             <table className="mastery-table">
// //               <thead>
// //                 <tr>
// //                   <th>Card</th>
// //                   <th>Answer</th>
// //                   <th>Mastery Level</th>
// //                   <th>Ease Factor</th>
// //                   <th>Interval (Days)</th>
// //                   <th>Action</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {dueCards.map((card) => (
// //                   <tr key={card.id}>
// //                     <td>
// //                       <strong>{card.front}</strong>
// //                     </td>
// //                     <td>{card.back}</td>
// //                     <td>
// //                       <span className={`mastery-pill pill-${(card.masteryLevel || "NEW").toLowerCase()}`}>
// //                         {card.masteryLevel || "NEW"}
// //                       </span>
// //                     </td>
// //                     <td>{card.easeFactor ? card.easeFactor.toFixed(1) : "2.5"}</td>
// //                     <td>{card.intervalDays ?? 1} day(s)</td>
// //                     <td>
// //                       <Link to="/study?review=true" className="secondary-button" style={{ padding: "6px 12px" }}>
// //                         Practice
// //                       </Link>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       )}

// //       {/* ALL FLASHCARDS MASTERY STATUS */}
// //       <div className="mastery-section-card">
// //         <div className="section-head">
// //           <div>
// //             <span className="dashboard-label">FLASHCARD MASTERY STATUS</span>
// //             <h3>Flashcard Collection Mastery</h3>
// //             <p>Individual card progress and learning status</p>
// //           </div>
// //           <Link to="/decks" className="secondary-button">
// //             View All Decks
// //           </Link>
// //         </div>

// //         {cardsWithStatus.length === 0 ? (
// //           <div className="empty-state">
// //             <p>No flashcards created yet.</p>
// //           </div>
// //         ) : (
// //           <div className="flashcard-mastery-grid">
// //             {allCards.map((card) => {
// //               const status = card.status || "LEARNING";
// //               const isMastered = status === "MASTERED";
// //               return (
// //                 <div className="card-mastery-item" key={card.id}>
// //                   <div className="item-top">
// //                     <span className="item-deck">{card.deckTitle || "Deck"}</span>
// //                     <span
// //                       className={`mastery-pill pill-${status.toLowerCase()}`}
// //                     >
// //                       {status}
// //                     </span>
// //                   </div>

// //                   <h4>{card.frontContent || card.front || "Card"}</h4>
// //                   <p className="item-answer">{card.backContent || card.back || "-"}</p>

// //                   {card.pronunciation && (
// //                     <div className="item-extra">
// //                       <small>Pronunciation:</small> <span>{card.pronunciation}</span>
// //                     </div>
// //                   )}

// //                   <div className="item-footer">
// //                     <div className="item-progress-track">
// //                       <div
// //                         className="item-progress-fill"
// //                         style={{ width: isMastered ? "100%" : "50%" }}
// //                       />
// //                     </div>
// //                     <span className="item-pct">
// //                       {isMastered ? "100%" : "50%"}
// //                     </span>
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Mastery;


// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// import {
//   getCurrentUserId,
//   getDeckCards,
//   getDueCards,
//   getProgress,
//   getAllDecks,
// } from "../../services/analyticsService";

// function getCardText(card, type) {
//   if (type === "front") {
//     return (
//       card?.frontContent ||
//       card?.frontText ||
//       card?.front ||
//       card?.question ||
//       card?.source ||
//       ""
//     );
//   }

//   return (
//     card?.backContent ||
//     card?.backText ||
//     card?.back ||
//     card?.answer ||
//     card?.translation ||
//     ""
//   );
// }

// function getMasteryStatus(card, dueMap) {
//   const directMastery =
//     card?.masteryLevel ??
//     card?.masteryStatus ??
//     card?.mastery;

//   if (directMastery) {
//     return String(
//       directMastery
//     ).toUpperCase();
//   }

//   const dueCard = dueMap.get(
//     String(card?.id)
//   );

//   if (dueCard) {
//     const dueMastery =
//       dueCard?.masteryLevel ??
//       dueCard?.masteryStatus ??
//       dueCard?.mastery;

//     if (dueMastery) {
//       return String(
//         dueMastery
//       ).toUpperCase();
//     }
//   }

//   /*
//    * Do NOT use card.status here.
//    * Backend card status such as ACTIVE/LEARNING
//    * is content status, not necessarily mastery.
//    */
//   return "NEW";
// }

// function Mastery() {
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

//   const userId = useMemo(
//     () => getCurrentUserId(user),
//     [user]
//   );

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   const [analytics, setAnalytics] =
//     useState({
//       totalCards: 0,
//       masteredCards: 0,
//       progressPercentage: 0,
//     });

//   const [dueCards, setDueCards] =
//     useState([]);

//   const [allCards, setAllCards] =
//     useState([]);

//   useEffect(() => {
//     let mounted = true;

//     const fetchMasteryData = async () => {
//       if (!userId) {
//         if (mounted) {
//           setError(
//             "Unable to identify the logged-in user. Please log in again."
//           );
//           setLoading(false);
//         }

//         return;
//       }

//       setLoading(true);
//       setError("");

//       try {
//         const [
//           progressResult,
//           dueResult,
//           decksResult,
//         ] = await Promise.allSettled([
//           getProgress(user),
//           getDueCards(user),
//           getAllDecks(),
//         ]);

//         if (!mounted) {
//           return;
//         }

//         if (
//           progressResult.status ===
//           "fulfilled"
//         ) {
//           setAnalytics(
//             progressResult.value
//           );
//         }

//         if (
//           dueResult.status ===
//           "fulfilled"
//         ) {
//           setDueCards(
//             dueResult.value || []
//           );
//         }

//         if (
//           decksResult.status ===
//           "fulfilled"
//         ) {
//           const decks =
//             decksResult.value || [];

//           const cardArrays =
//             await Promise.all(
//               decks
//                 .filter(
//                   (deck) => deck?.id
//                 )
//                 .map(async (deck) => {
//                   try {
//                     const cards =
//                       await getDeckCards(
//                         deck.id
//                       );

//                     return cards.map(
//                       (card) => ({
//                         ...card,
//                         deckId:
//                           deck.id,
//                         deckTitle:
//                           deck.title,
//                       })
//                     );
//                   } catch (err) {
//                     console.error(
//                       `Failed to load cards for deck ${deck.id}:`,
//                       err
//                     );

//                     return [];
//                   }
//                 })
//             );

//           if (mounted) {
//             setAllCards(
//               cardArrays.flat()
//             );
//           }
//         }
//       } catch (err) {
//         console.error(
//           "Failed to load mastery data:",
//           err
//         );

//         if (mounted) {
//           setError(
//             "Unable to load mastery details."
//           );
//         }
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchMasteryData();

//     return () => {
//       mounted = false;
//     };
//   }, [user, userId]);

//   const dueMap = useMemo(() => {
//     const map = new Map();

//     dueCards.forEach((card) => {
//       if (card?.id != null) {
//         map.set(
//           String(card.id),
//           card
//         );
//       }
//     });

//     return map;
//   }, [dueCards]);

//   const totalCards = Math.max(
//     Number(
//       analytics.totalCards
//     ) || allCards.length || 0,
//     0
//   );

//   const masteredCards = Math.min(
//     Math.max(
//       Number(
//         analytics.masteredCards
//       ) || 0,
//       0
//     ),
//     totalCards
//   );

//   const learningCards = Math.max(
//     totalCards - masteredCards,
//     0
//   );

//   const masteryPercentage = Math.min(
//     Math.max(
//       Math.round(
//         Number(
//           analytics.progressPercentage
//         ) || 0
//       ),
//       0
//     ),
//     100
//   );

//   const displayedCards = useMemo(
//     () =>
//       allCards.map((card) => ({
//         ...card,
//         masteryStatus:
//           getMasteryStatus(
//             card,
//             dueMap
//           ),
//       })),
//     [allCards, dueMap]
//   );

//   if (loading) {
//     return (
//       <div className="page-container">
//         <div className="dashboard-loading">
//           <h1>
//             Loading mastery data...
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
//             MASTERY LEVELS
//           </span>

//           <h1>Your Mastery</h1>

//           <p>
//             See what you've learned and
//             what needs more practice.
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

//       <div className="mastery-hero-card">
//         <div className="mastery-hero-content">
//           <span className="hero-kicker">
//             OVERALL PROFICIENCY
//           </span>

//           <h2>
//             {masteryPercentage}%
//             Mastered
//           </h2>

//           <p>
//             You have mastered{" "}
//             <strong>
//               {masteredCards}
//             </strong>{" "}
//             out of{" "}
//             <strong>
//               {totalCards}
//             </strong>{" "}
//             total flashcards
//             {activeLanguage
//               ? ` in your ${activeLanguage} collection.`
//               : "."}
//           </p>

//           <div className="mastery-progress-bar-large">
//             <div
//               className="mastery-progress-fill-large"
//               style={{
//                 width: `${masteryPercentage}%`,
//               }}
//             />
//           </div>

//           <div className="mastery-progress-legend">
//             <span>
//               0% Beginner
//             </span>

//             <span>
//               Progress:{" "}
//               {masteryPercentage}%
//             </span>

//             <span>
//               100% Full Mastery
//             </span>
//           </div>
//         </div>

//         <div className="mastery-hero-action">
//           <Link
//             to="/study"
//             className="primary-button"
//           >
//             Practice Due Cards (
//             {dueCards.length})
//           </Link>
//         </div>
//       </div>

//       <div className="mastery-categories-grid">
//         <div className="mastery-category-card mastered-cat">
//           <div className="cat-top">
//             <span className="cat-badge">
//               MASTERED
//             </span>

//             <span className="cat-icon">
//               ✓
//             </span>
//           </div>

//           <strong className="cat-count">
//             {masteredCards}
//           </strong>

//           <span className="cat-label">
//             Mastered Flashcards
//           </span>

//           <p className="cat-desc">
//             Cards that have reached the
//             available mastery criteria.
//           </p>
//         </div>

//         <div className="mastery-category-card learning-cat">
//           <div className="cat-top">
//             <span className="cat-badge">
//               LEARNING
//             </span>

//             <span className="cat-icon">
//               ⚡
//             </span>
//           </div>

//           <strong className="cat-count">
//             {learningCards}
//           </strong>

//           <span className="cat-label">
//             Learning in Progress
//           </span>

//           <p className="cat-desc">
//             Cards that are not yet
//             counted as mastered.
//           </p>
//         </div>

//         <div className="mastery-category-card due-cat">
//           <div className="cat-top">
//             <span className="cat-badge">
//               NEW / DUE
//             </span>

//             <span className="cat-icon">
//               !
//             </span>
//           </div>

//           <strong className="cat-count">
//             {dueCards.length}
//           </strong>

//           <span className="cat-label">
//             Cards Needing Review
//           </span>

//           <p className="cat-desc">
//             Cards currently returned by
//             the review queue.
//           </p>
//         </div>
//       </div>

//       {dueCards.length > 0 && (
//         <div className="mastery-section-card">
//           <div className="section-head">
//             <div>
//               <span className="dashboard-label">
//                 SPACED REPETITION QUEUE
//               </span>

//               <h3>
//                 Cards Due for Mastery
//                 Review
//               </h3>

//               <p>
//                 Current review information
//                 returned by the study
//                 service.
//               </p>
//             </div>

//             <Link
//               to="/study"
//               className="primary-button"
//             >
//               Review Now
//             </Link>
//           </div>

//           <div className="mastery-table-wrapper">
//             <table className="mastery-table">
//               <thead>
//                 <tr>
//                   <th>Card</th>
//                   <th>Answer</th>
//                   <th>Mastery Level</th>
//                   <th>Ease Factor</th>
//                   <th>Interval</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {dueCards.map(
//                   (card) => {
//                     const level =
//                       String(
//                         card?.masteryLevel ||
//                           "NEW"
//                       ).toUpperCase();

//                     const ease =
//                       Number(
//                         card?.easeFactor
//                       );

//                     return (
//                       <tr
//                         key={card.id}
//                       >
//                         <td>
//                           <strong>
//                             {getCardText(
//                               card,
//                               "front"
//                             ) ||
//                               "Flashcard"}
//                           </strong>
//                         </td>

//                         <td>
//                           {getCardText(
//                             card,
//                             "back"
//                           ) || "—"}
//                         </td>

//                         <td>
//                           <span
//                             className={`mastery-pill pill-${level.toLowerCase()}`}
//                           >
//                             {level}
//                           </span>
//                         </td>

//                         <td>
//                           {Number.isFinite(
//                             ease
//                           )
//                             ? ease.toFixed(
//                                 1
//                               )
//                             : "—"}
//                         </td>

//                         <td>
//                           {card?.intervalDays ??
//                             "—"}{" "}
//                           day(s)
//                         </td>

//                         <td>
//                           <Link
//                             to="/study"
//                             className="secondary-button"
//                             style={{
//                               padding:
//                                 "6px 12px",
//                             }}
//                           >
//                             Practice
//                           </Link>
//                         </td>
//                       </tr>
//                     );
//                   }
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       <div className="mastery-section-card">
//         <div className="section-head">
//           <div>
//             <span className="dashboard-label">
//               FLASHCARD MASTERY STATUS
//             </span>

//             <h3>
//               Flashcard Collection
//               Mastery
//             </h3>

//             <p>
//               Individual cards and
//               available mastery
//               information.
//             </p>
//           </div>

//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             View All Decks
//           </Link>
//         </div>

//         {displayedCards.length === 0 ? (
//           <div className="empty-state">
//             <p>
//               No flashcards created
//               yet.
//             </p>
//           </div>
//         ) : (
//           <div className="flashcard-mastery-grid">
//             {displayedCards.map(
//               (card) => {
//                 const status =
//                   card.masteryStatus;

//                 const isMastered =
//                   status ===
//                   "MASTERED";

//                 return (
//                   <div
//                     className="card-mastery-item"
//                     key={card.id}
//                   >
//                     <div className="item-top">
//                       <span className="item-deck">
//                         {card.deckTitle ||
//                           "Deck"}
//                       </span>

//                       <span
//                         className={`mastery-pill pill-${status.toLowerCase()}`}
//                       >
//                         {status}
//                       </span>
//                     </div>

//                     <h4>
//                       {getCardText(
//                         card,
//                         "front"
//                       ) || "Card"}
//                     </h4>

//                     <p className="item-answer">
//                       {getCardText(
//                         card,
//                         "back"
//                       ) || "—"}
//                     </p>

//                     {card.pronunciation && (
//                       <div className="item-extra">
//                         <small>
//                           Pronunciation:
//                         </small>{" "}
//                         <span>
//                           {
//                             card.pronunciation
//                           }
//                         </span>
//                       </div>
//                     )}

//                     <div className="item-footer">
//                       <div className="item-progress-track">
//                         <div
//                           className="item-progress-fill"
//                           style={{
//                             width:
//                               isMastered
//                                 ? "100%"
//                                 : "0%",
//                           }}
//                         />
//                       </div>

//                       <span className="item-pct">
//                         {isMastered
//                           ? "100%"
//                           : "Not mastered"}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               }
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Mastery;
// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

// import {
//   getDeckCards,
//   getDueCards,
//   getProgress,
//   getAllDecks,
// } from "../../services/analyticsService";


// function getCardText(card, type) {
//   if (type === "front") {
//     return (
//       card?.frontContent ||
//       card?.frontText ||
//       card?.front ||
//       card?.question ||
//       card?.source ||
//       ""
//     );
//   }

//   return (
//     card?.backContent ||
//     card?.backText ||
//     card?.back ||
//     card?.answer ||
//     card?.translation ||
//     ""
//   );
// }


// function getMasteryStatus(card, dueMap) {
//   const directMastery =
//     card?.masteryLevel ??
//     card?.masteryStatus ??
//     card?.mastery;


//   if (directMastery) {
//     return String(
//       directMastery
//     ).toUpperCase();
//   }


//   const dueCard = dueMap.get(
//     String(card?.id)
//   );


//   if (dueCard) {
//     const dueMastery =
//       dueCard?.masteryLevel ??
//       dueCard?.masteryStatus ??
//       dueCard?.mastery;


//     if (dueMastery) {
//       return String(
//         dueMastery
//       ).toUpperCase();
//     }
//   }


//   return "NEW";
// }


// function Mastery() {
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


//   const [analytics, setAnalytics] =
//     useState({
//       totalCards: 0,
//       masteredCards: 0,
//       progressPercentage: 0,
//     });


//   const [dueCards, setDueCards] =
//     useState([]);


//   const [allCards, setAllCards] =
//     useState([]);


//   useEffect(() => {
//     let mounted = true;


//     const fetchMasteryData =
//       async () => {

//         /*
//          * IMPORTANT:
//          *
//          * Do NOT check for userId here.
//          *
//          * The current login response has username,
//          * role and token, but no numeric userId.
//          *
//          * Progress and decks can still load normally.
//          */
//         setLoading(true);
//         setError("");


//         try {

//           /*
//            * =============================================
//            * PROGRESS
//            * =============================================
//            */
//           try {
//             const progress =
//               await getProgress();


//             if (mounted) {
//               setAnalytics(
//                 progress
//               );
//             }

//           } catch (err) {

//             console.error(
//               "Failed to load mastery analytics:",
//               err
//             );

//           }


//           /*
//            * =============================================
//            * DUE CARDS
//            * =============================================
//            *
//            * getDueCards() returns [] when there
//            * is no numeric userId.
//            */
//           try {
//             const due =
//               await getDueCards(user);


//             if (mounted) {
//               setDueCards(
//                 due || []
//               );
//             }

//           } catch (err) {

//             console.error(
//               "Failed to load due cards:",
//               err
//             );


//             if (mounted) {
//               setDueCards([]);
//             }

//           }


//           /*
//            * =============================================
//            * DECKS + FLASHCARDS
//            * =============================================
//            */
//           try {

//             const decks =
//               await getAllDecks();


//             const cardArrays =
//               await Promise.all(

//                 decks
//                   .filter(
//                     (deck) => deck?.id
//                   )
//                   .map(
//                     async (deck) => {

//                       try {

//                         const cards =
//                           await getDeckCards(
//                             deck.id
//                           );


//                         return cards.map(
//                           (card) => ({
//                             ...card,

//                             deckId:
//                               deck.id,

//                             deckTitle:
//                               deck.title,
//                           })
//                         );

//                       } catch (err) {

//                         console.error(
//                           `Failed to load cards for deck ${deck.id}:`,
//                           err
//                         );


//                         return [];
//                       }
//                     }
//                   )
//               );


//             if (mounted) {
//               setAllCards(
//                 cardArrays.flat()
//               );
//             }

//           } catch (err) {

//             console.error(
//               "Failed to load decks:",
//               err
//             );


//             if (mounted) {
//               setAllCards([]);
//             }
//           }


//         } catch (err) {

//           console.error(
//             "Failed to load mastery data:",
//             err
//           );


//           if (mounted) {
//             setError(
//               "Unable to load mastery details."
//             );
//           }

//         } finally {

//           if (mounted) {
//             setLoading(false);
//           }

//         }
//       };


//     fetchMasteryData();


//     return () => {
//       mounted = false;
//     };

//   }, [user]);


//   /*
//    * Map due cards by ID.
//    */
//   const dueMap = useMemo(() => {

//     const map = new Map();


//     dueCards.forEach((card) => {

//       if (card?.id != null) {

//         map.set(
//           String(card.id),
//           card
//         );

//       }

//     });


//     return map;

//   }, [dueCards]);


//   /*
//    * TOTAL CARDS
//    */
//   const totalCards = Math.max(
//     Number(
//       analytics.totalCards
//     ) || allCards.length || 0,
//     0
//   );


//   /*
//    * MASTERED
//    */
//   const masteredCards = Math.min(
//     Math.max(
//       Number(
//         analytics.masteredCards
//       ) || 0,
//       0
//     ),
//     totalCards
//   );


//   /*
//    * LEARNING
//    */
//   const learningCards = Math.max(
//     totalCards -
//       masteredCards,
//     0
//   );


//   /*
//    * MASTERY PERCENTAGE
//    */
//   const masteryPercentage =
//     Math.min(
//       Math.max(
//         Math.round(
//           Number(
//             analytics.progressPercentage
//           ) || 0
//         ),
//         0
//       ),
//       100
//     );


//   /*
//    * Add masteryStatus to every card.
//    */
//   const displayedCards =
//     useMemo(
//       () =>
//         allCards.map(
//           (card) => ({
//             ...card,

//             masteryStatus:
//               getMasteryStatus(
//                 card,
//                 dueMap
//               ),
//           })
//         ),

//       [allCards, dueMap]
//     );


//   if (loading) {

//     return (
//       <div className="page-container">

//         <div className="dashboard-loading">

//           <h1>
//             Loading mastery data...
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
//             MASTERY LEVELS
//           </span>

//           <h1>
//             Your Mastery
//           </h1>

//           <p>
//             See what you've learned and
//             what needs more practice.
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


//       {/* HERO */}
//       <div className="mastery-hero-card">

//         <div className="mastery-hero-content">

//           <span className="hero-kicker">
//             OVERALL PROFICIENCY
//           </span>


//           <h2>
//             {masteryPercentage}%
//             Mastered
//           </h2>


//           <p>

//             You have mastered{" "}

//             <strong>
//               {masteredCards}
//             </strong>{" "}

//             out of{" "}

//             <strong>
//               {totalCards}
//             </strong>{" "}

//             total flashcards

//             {activeLanguage
//               ? ` in your ${activeLanguage} collection.`
//               : "."}

//           </p>


//           <div className="mastery-progress-bar-large">

//             <div
//               className="mastery-progress-fill-large"
//               style={{
//                 width: `${masteryPercentage}%`,
//               }}
//             />

//           </div>


//           <div className="mastery-progress-legend">

//             <span>
//               0% Beginner
//             </span>

//             <span>
//               Progress:{" "}
//               {masteryPercentage}%
//             </span>

//             <span>
//               100% Full Mastery
//             </span>

//           </div>

//         </div>


//         <div className="mastery-hero-action">

//           <Link
//             to="/study"
//             className="primary-button"
//           >
//             Practice Due Cards (
//             {dueCards.length})
//           </Link>

//         </div>

//       </div>


//       {/* CATEGORY BREAKDOWN */}
//       <div className="mastery-categories-grid">

//         <div className="mastery-category-card mastered-cat">

//           <div className="cat-top">

//             <span className="cat-badge">
//               MASTERED
//             </span>

//             <span className="cat-icon">
//               ✓
//             </span>

//           </div>


//           <strong className="cat-count">
//             {masteredCards}
//           </strong>


//           <span className="cat-label">
//             Mastered Flashcards
//           </span>


//           <p className="cat-desc">
//             Cards that have reached the
//             available mastery criteria.
//           </p>

//         </div>


//         <div className="mastery-category-card learning-cat">

//           <div className="cat-top">

//             <span className="cat-badge">
//               LEARNING
//             </span>

//             <span className="cat-icon">
//               ⚡
//             </span>

//           </div>


//           <strong className="cat-count">
//             {learningCards}
//           </strong>


//           <span className="cat-label">
//             Learning in Progress
//           </span>


//           <p className="cat-desc">
//             Cards that are not yet
//             counted as mastered.
//           </p>

//         </div>


//         <div className="mastery-category-card due-cat">

//           <div className="cat-top">

//             <span className="cat-badge">
//               NEW / DUE
//             </span>

//             <span className="cat-icon">
//               !
//             </span>

//           </div>


//           <strong className="cat-count">
//             {dueCards.length}
//           </strong>


//           <span className="cat-label">
//             Cards Needing Review
//           </span>


//           <p className="cat-desc">
//             Cards currently returned by
//             the review queue.
//           </p>

//         </div>

//       </div>


//       {/* DUE CARDS */}
//       {dueCards.length > 0 && (

//         <div className="mastery-section-card">

//           <div className="section-head">

//             <div>

//               <span className="dashboard-label">
//                 SPACED REPETITION QUEUE
//               </span>

//               <h3>
//                 Cards Due for Mastery Review
//               </h3>

//               <p>
//                 Current review information
//                 returned by the study service.
//               </p>

//             </div>


//             <Link
//               to="/study"
//               className="primary-button"
//             >
//               Review Now
//             </Link>

//           </div>


//           <div className="mastery-table-wrapper">

//             <table className="mastery-table">

//               <thead>

//                 <tr>
//                   <th>Card</th>
//                   <th>Answer</th>
//                   <th>Mastery Level</th>
//                   <th>Ease Factor</th>
//                   <th>Interval</th>
//                   <th>Action</th>
//                 </tr>

//               </thead>


//               <tbody>

//                 {dueCards.map(
//                   (card) => {

//                     const level =
//                       String(
//                         card?.masteryLevel ||
//                           "NEW"
//                       ).toUpperCase();


//                     const ease =
//                       Number(
//                         card?.easeFactor
//                       );


//                     return (

//                       <tr
//                         key={card.id}
//                       >

//                         <td>

//                           <strong>
//                             {getCardText(
//                               card,
//                               "front"
//                             ) ||
//                               "Flashcard"}
//                           </strong>

//                         </td>


//                         <td>
//                           {getCardText(
//                             card,
//                             "back"
//                           ) || "—"}
//                         </td>


//                         <td>

//                           <span
//                             className={`mastery-pill pill-${level.toLowerCase()}`}
//                           >
//                             {level}
//                           </span>

//                         </td>


//                         <td>

//                           {Number.isFinite(
//                             ease
//                           )
//                             ? ease.toFixed(1)
//                             : "—"}

//                         </td>


//                         <td>

//                           {card?.intervalDays ??
//                             "—"}{" "}
//                           day(s)

//                         </td>


//                         <td>

//                           <Link
//                             to="/study"
//                             className="secondary-button"
//                             style={{
//                               padding:
//                                 "6px 12px",
//                             }}
//                           >
//                             Practice
//                           </Link>

//                         </td>

//                       </tr>

//                     );
//                   }
//                 )}

//               </tbody>

//             </table>

//           </div>

//         </div>

//       )}


//       {/* ALL FLASHCARDS */}
//       <div className="mastery-section-card">

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               FLASHCARD MASTERY STATUS
//             </span>

//             <h3>
//               Flashcard Collection Mastery
//             </h3>

//             <p>
//               Individual cards and available
//               mastery information.
//             </p>

//           </div>


//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             View All Decks
//           </Link>

//         </div>


//         {displayedCards.length === 0 ? (

//           <div className="empty-state">

//             <p>
//               No flashcards created yet.
//             </p>

//           </div>

//         ) : (

//           <div className="flashcard-mastery-grid">

//             {displayedCards.map(
//               (card) => {

//                 const status =
//                   card.masteryStatus ||
//                   "NEW";


//                 const isMastered =
//                   status ===
//                   "MASTERED";


//                 return (

//                   <div
//                     className="card-mastery-item"
//                     key={card.id}
//                   >

//                     <div className="item-top">

//                       <span className="item-deck">
//                         {card.deckTitle ||
//                           "Deck"}
//                       </span>


//                       <span
//                         className={`mastery-pill pill-${status.toLowerCase()}`}
//                       >
//                         {status}
//                       </span>

//                     </div>


//                     <h4>

//                       {getCardText(
//                         card,
//                         "front"
//                       ) || "Card"}

//                     </h4>


//                     <p className="item-answer">

//                       {getCardText(
//                         card,
//                         "back"
//                       ) || "—"}

//                     </p>


//                     {card.pronunciation && (

//                       <div className="item-extra">

//                         <small>
//                           Pronunciation:
//                         </small>{" "}

//                         <span>
//                           {
//                             card.pronunciation
//                           }
//                         </span>

//                       </div>

//                     )}


//                     <div className="item-footer">

//                       <div className="item-progress-track">

//                         <div
//                           className="item-progress-fill"
//                           style={{
//                             width:
//                               isMastered
//                                 ? "100%"
//                                 : "0%",
//                           }}
//                         />

//                       </div>


//                       <span className="item-pct">

//                         {isMastered
//                           ? "100%"
//                           : "Not mastered"}

//                       </span>

//                     </div>

//                   </div>

//                 );
//               }
//             )}

//           </div>

//         )}

//       </div>

//     </div>
//   );
// }


// export default Mastery;
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/api";
import {
  getProgress,
  getDueCards,
  getLocalDueIds,
  getLocalLearningIds,
  getLocalMasteredIds,
} from "../../services/analyticsService";

const listFrom = (
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

const cardId = (card) =>
  card?.id ??
  card?.flashcardId ??
  card?.cardId ??
  null;

const cardText = (
  card,
  side
) => {
  if (side === "front") {
    return (
      card?.frontContent ||
      card?.frontText ||
      card?.front ||
      card?.question ||
      ""
    );
  }

  return (
    card?.backContent ||
    card?.backText ||
    card?.back ||
    card?.answer ||
    card?.translation ||
    ""
  );
};

function Mastery() {
  const user = useSelector(
    (state) => state.auth?.user
  );

  const [allCards, setAllCards] =
    useState([]);

  const [dueCards, setDueCards] =
    useState([]);

  const [masteredCards, setMasteredCards] =
    useState(0);

  const [progressPercentage, setProgressPercentage] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    const loadMastery = async () => {
      setLoading(true);
      setError("");

      try {
        const [
          progress,
          due,
          decksResponse,
        ] = await Promise.all([
          getProgress().catch(() => ({
            totalCards: 0,
            masteredCards: 0,
            progressPercentage: 0,
          })),

          getDueCards(user).catch(
            () => []
          ),

          api.get("/decks"),
        ]);

        const decks = listFrom(
          decksResponse?.data,
          ["decks", "items"]
        );

        const cardResults =
          await Promise.all(
            decks.map(async (deck) => {
              try {
                const response =
                  await api.get(
                    `/flashcards/deck/${deck.id}`
                  );

                const cards =
                  listFrom(
                    response?.data,
                    [
                      "cards",
                      "flashcards",
                      "items",
                    ]
                  );

                return cards.map(
                  (card) => ({
                    ...card,
                    deckTitle:
                      deck.title,
                    deckId:
                      deck.id,
                  })
                );
              } catch {
                return [];
              }
            })
          );

        const cards =
          cardResults.flat();

        if (!mounted) {
          return;
        }

        setAllCards(cards);
        const localDueIds = getLocalDueIds(user);
        const localMasteredIds = getLocalMasteredIds(user);

        const localDueCards = cards.filter((card) => {
          const id = cardId(card);
          return id !== null && localDueIds.has(String(id));
        });

        const mergedDueCards = [
          ...(Array.isArray(due) ? due : []),
          ...localDueCards,
        ].filter((card, index, array) => {
          const id = cardId(card);
          if (id === null) return index === array.indexOf(card);
          return index === array.findIndex((item) => String(cardId(item)) === String(id));
        });

        setDueCards(mergedDueCards);

        const localMasteredCount = cards.filter((card) => {
          const id = cardId(card);
          return id !== null && localMasteredIds.has(String(id));
        }).length;

        const totalCards = cards.length;
        const backendMasteredCount = Number(
          progress?.masteredCards || 0
        );

        const effectiveMasteredCount = Math.min(
          Math.max(backendMasteredCount, localMasteredCount, 0),
          totalCards
        );

        let effectiveProgressPercentage = Number(
          progress?.progressPercentage || 0
        );

        if (
          totalCards > 0 &&
          effectiveProgressPercentage === 0 &&
          effectiveMasteredCount > 0
        ) {
          effectiveProgressPercentage =
            (effectiveMasteredCount / totalCards) * 100;
        }

        setMasteredCards(effectiveMasteredCount);
        setProgressPercentage(
          Math.min(Math.max(effectiveProgressPercentage, 0), 100)
        );
      } catch (err) {
        console.error(
          "Failed to load mastery:",
          err
        );

        if (mounted) {
          setError(
            "Unable to load mastery information."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadMastery();

    return () => {
      mounted = false;
    };
  }, [user]);

  const masteryByCardId =
    useMemo(() => {
      const map = new Map();

      for (const card of allCards) {
        const id = cardId(card);

        if (
          id !== null &&
          card?.masteryLevel
        ) {
          map.set(
            String(id),
            card
          );
        }
      }

      return map;
    }, [allCards]);

  const localMasteredIds = useMemo(
    () => getLocalMasteredIds(user),
    [allCards, masteredCards, user]
  );

  const localDueIds = useMemo(
    () => getLocalDueIds(user),
    [allCards, dueCards, user]
  );

  const localLearningIds = useMemo(
    () => getLocalLearningIds(user),
    [allCards, dueCards, masteredCards, user]
  );

  const cardsWithMastery =
    useMemo(() => {
      return allCards.map(
        (card) => {
          const existing =
            masteryByCardId.get(
              String(cardId(card))
            );

          return {
            ...card,
            masteryLevel:
              card.masteryLevel ||
              existing?.masteryLevel ||
              (localMasteredIds.has(String(cardId(card)))
                ? "MASTERED"
                : localDueIds.has(String(cardId(card)))
                  ? "DUE"
                  : localLearningIds.has(String(cardId(card)))
                    ? "LEARNING"
                    : "NOT_REVIEWED"),
          };
        }
      );
    }, [
      allCards,
      masteryByCardId,
      localMasteredIds,
      localDueIds,
      localLearningIds,
    ]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="dashboard-loading">
          <h1>
            Loading mastery...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="progress-header">
        <div>
          <span className="dashboard-label">
            MASTERY
          </span>

          <h1>
            Flashcard Mastery
          </h1>

          <p>
            Review the retention information
            currently available for your cards.
          </p>
        </div>

        <Link
          to="/study"
          className="primary-button"
        >
          Practice
        </Link>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card mastered-stat">
          <span className="stat-title">
            MASTERED
          </span>

          <p className="stat-value">
            {masteredCards}
          </p>

          <span className="stat-description">
            Completed retention
          </span>
        </div>

        <div className="stat-card flashcard-stat">
          <span className="stat-title">
            FLASHCARDS
          </span>

          <p className="stat-value">
            {allCards.length}
          </p>

          <span className="stat-description">
            Cards in available decks
          </span>
        </div>

        <div className="stat-card due-stat">
          <span className="stat-title">
            DUE NOW
          </span>

          <p className="stat-value">
            {dueCards.length}
          </p>

          <span className="stat-description">
            Cards ready for review
          </span>
        </div>
      </div>

      <div
        className="mastery-section-card"
        style={{ marginTop: "32px" }}
      >
        <div className="section-head">
          <div>
            <span className="dashboard-label">
              FLASHCARD MASTERY STATUS
            </span>

            <h3>
              Flashcard Collection Mastery
            </h3>

            <p>
              Only retention information
              actually available from the
              backend is shown.
            </p>
          </div>

          <Link
            to="/decks"
            className="secondary-button"
          >
            View All Decks
          </Link>
        </div>

        {cardsWithMastery.length ===
        0 ? (
          <div className="empty-state">
            <p>
              No flashcards created yet.
            </p>
          </div>
        ) : (
          <div className="flashcard-mastery-grid">
            {cardsWithMastery.map(
              (card, index) => {
                const level =
                  String(
                    card.masteryLevel ||
                      "NOT_REVIEWED"
                  ).toUpperCase();

                const isMastered =
                  level ===
                  "MASTERED";

                return (
                  <div
                    className="card-mastery-item"
                    key={
                      cardId(card) ??
                      `${cardText(
                        card,
                        "front"
                      )}-${index}`
                    }
                  >
                    <div className="item-top">
                      <span className="item-deck">
                        {card.deckTitle ||
                          "Deck"}
                      </span>

                      <span
                        className={`mastery-pill pill-${level.toLowerCase()}`}
                      >
                        {level}
                      </span>
                    </div>

                    <h4>
                      {cardText(
                        card,
                        "front"
                      )}
                    </h4>

                    <p className="item-answer">
                      {cardText(
                        card,
                        "back"
                      )}
                    </p>

                    {card.pronunciation && (
                      <div className="item-extra">
                        <small>
                          Pronunciation:
                        </small>{" "}
                        <span>
                          {
                            card.pronunciation
                          }
                        </span>
                      </div>
                    )}

                    <div className="item-footer">
                      <div className="item-progress-track">
                        <div
                          className="item-progress-fill"
                          style={{
                            width:
                              isMastered
                                ? "100%"
                                : "0%",
                          }}
                        />
                      </div>

                      <span className="item-pct">
                        {isMastered
                          ? "100%"
                          : "Not reviewed"}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>

      {dueCards.length > 0 && (
        <div
          className="mastery-section-card"
          style={{ marginTop: "32px" }}
        >
          <div className="section-head">
            <div>
              <span className="dashboard-label">
                DUE FOR REVIEW
              </span>

              <h3>
                Spaced Repetition Queue
              </h3>

              <p>
                Cards currently returned by
                the review endpoint.
              </p>
            </div>

            <Link
              to="/study?review=true"
              className="primary-button"
            >
              Start Review
            </Link>
          </div>

          <div className="retention-cards-grid">
            {dueCards.map(
              (card, index) => (
                <div
                  className="retention-metric-pill"
                  key={
                    cardId(card) ??
                    `${cardText(
                      card,
                      "front"
                    )}-${index}`
                  }
                >
                  <div className="metric-info">
                    <strong>
                      {cardText(
                        card,
                        "front"
                      ) || "Card"}
                    </strong>

                    <span>
                      {cardText(
                        card,
                        "back"
                      ) || "—"}
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

export default Mastery;