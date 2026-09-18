// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import api from "../../services/api";

// function Dashboard() {
//   const auth = useSelector((state) => state.auth || {});
//   const user = auth.user;

//   const reduxLang = useSelector(
//     (state) => state.languages?.selectedLanguage
//   );

//   const activeLanguage =
//     reduxLang ||
//     user?.learningLanguage ||
//     user?.nativeLanguage ||
//     user?.language ||
//     localStorage.getItem("langloop_learning_language") ||
//     "";

//   const [stats, setStats] = useState({
//     totalDecks: 0,
//     totalFlashcards: 0,
//     masteredCards: 0,
//     dueCards: 0,
//     streak: 0,
//     progressPercentage: 0,
//   });

//   const [decks, setDecks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadDashboard = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         // 1. Load Total Decks
//         let totalDecks = 0;
//         let loadedDecks = [];
//         try {
//           const decksResponse = await api.get("/decks");
//           loadedDecks = Array.isArray(decksResponse.data)
//             ? decksResponse.data
//             : decksResponse.data?.decks || [];
//           totalDecks = loadedDecks.length;
//           setDecks(loadedDecks);
//         } catch (err) {
//           console.error("Failed to load decks:", err);
//         }

//         // 2. Load Progress
//         let totalFlashcards = 0;
//         let masteredCards = 0;
//         let progressPercentage = 0;
//         try {
//           const progressResponse = await api.get("/analytics/progress");
//           const progressData = progressResponse.data || {};
//           totalFlashcards = progressData.totalCards ?? 0;
//           masteredCards = progressData.masteredCards ?? 0;
//           progressPercentage = progressData.progressPercentage ?? 0;
//         } catch (err) {
//           console.error("Failed to load progress:", err);
//         }

//         // 3. Load Due Cards
//         let dueCards = 0;
//         try {
//           const currentUserId = user?.id || 10;
//           let dueResponse;
//           try {
//             dueResponse = await api.get(`/study/due?userId=${currentUserId}`);
//           } catch (e) {
//             dueResponse = await api.get("/study/due?userId=1");
//           }

//           if (Array.isArray(dueResponse?.data)) {
//             dueCards = dueResponse.data.length;
//           } else if (Array.isArray(dueResponse?.data?.cards)) {
//             dueCards = dueResponse.data.cards.length;
//           } else if (typeof dueResponse?.data?.count === "number") {
//             dueCards = dueResponse.data.count;
//           }
//         } catch (err) {
//           console.error("Failed to load due cards:", err);
//           dueCards = 0;
//         }

//         // 4. Update Dashboard State
//         setStats({
//           totalDecks,
//           totalFlashcards,
//           masteredCards,
//           dueCards,
//           streak: 0,
//           progressPercentage,
//         });
//       } catch (err) {
//         console.error("Dashboard error:", err);
//         setError("Unable to load dashboard data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, [user?.id]);

//   const primaryDeck = decks.length > 0 ? decks[0] : null;
//   const username = user?.username || "User";

//   if (loading) {
//     return (
//       <div className="page-container">
//         <div className="dashboard-loading">
//           <h1>Loading dashboard...</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       {/* HEADER */}
//       <div className="page-header">
//         <div>
//           <span className="dashboard-label">LEARNING DASHBOARD</span>
//           <h1>Hello, {username}!</h1>
//           <p>Welcome back to your language journey.</p>
//         </div>

//         {activeLanguage && (
//           <div className="active-learning-badge">
//             <span className="badge-pulse"></span>
//             <span>Learning: <strong>{activeLanguage}</strong></span>
//           </div>
//         )}
//       </div>

//       {/* ACTIVE LEARNING BANNER */}
//       {activeLanguage && (
//         <div className="learning-context-banner">
//           <div className="context-left">
//             <span className="context-icon">🌐</span>
//             <div>
//               <span className="context-subtitle">Active Learning Language</span>
//               <h2>You're learning {activeLanguage}</h2>
//               <p>
//                 All your study decks, spaced repetition cards, and mastery
//                 metrics are tuned to your {activeLanguage} progress.
//               </p>
//             </div>
//           </div>
//           <Link to="/study" className="primary-button context-cta">
//             Practice Now
//           </Link>
//         </div>
//       )}

//       {/* ERROR MESSAGE */}
//       {error && <div className="error-message">{error}</div>}

//       {/* STUDY HERO CARD / CONTINUE LEARNING */}
//       <div className="study-card">
//         <div>
//           <span className="study-card-label">READY TO LEARN?</span>
//           <h2>Ready to study?</h2>
//           <p>
//             {primaryDeck ? (
//               <>
//                 Continue with <strong>{primaryDeck.title}</strong> — You have{" "}
//                 <strong>{stats.dueCards}</strong> cards waiting for review.
//               </>
//             ) : (
//               <>
//                 You have <strong>{stats.dueCards}</strong> cards waiting for review.
//               </>
//             )}
//           </p>
//         </div>

//         <div className="study-hero-actions">
//           <Link
//             to={primaryDeck ? `/study?deckId=${primaryDeck.id}` : "/study?all=true"}
//             className="primary-button"
//           >
//             Start Session
//           </Link>
//         </div>
//       </div>

//       {/* STAT CARDS */}
//       <div className="stats-grid">
//         <div className="stat-card deck-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">▣</span>
//             <span className="stat-title">TOTAL DECKS</span>
//           </div>
//           <h3>Total Decks</h3>
//           <p className="stat-value">{stats.totalDecks}</p>
//           <span className="stat-description">Learning collections</span>
//         </div>

//         <div className="stat-card flashcard-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">▤</span>
//             <span className="stat-title">FLASHCARDS</span>
//           </div>
//           <h3>Total Flashcards</h3>
//           <p className="stat-value">{stats.totalFlashcards}</p>
//           <span className="stat-description">Total cards</span>
//         </div>

//         <div className="stat-card mastered-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">✓</span>
//             <span className="stat-title">MASTERED</span>
//           </div>
//           <h3>Mastered Cards</h3>
//           <p className="stat-value">{stats.masteredCards}</p>
//           <span className="stat-description">Cards completed</span>
//         </div>

//         <div className="stat-card due-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">!</span>
//             <span className="stat-title">DUE FOR REVIEW</span>
//           </div>
//           <h3>Due Cards</h3>
//           <p className="stat-value">{stats.dueCards}</p>
//           <span className="stat-description">Cards to review</span>
//         </div>

//         <div className="stat-card streak-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">★</span>
//             <span className="stat-title">STREAK</span>
//           </div>
//           <h3>Streak</h3>
//           <p className="stat-value">{stats.streak}</p>
//           <span className="stat-description">Days of learning</span>
//         </div>
//       </div>

//       {/* LEARNING PROGRESS SECTION */}
//       <div className="progress-section">
//         <div className="progress-header">
//           <div>
//             <span className="dashboard-label">LEARNING GOAL</span>
//             <h3>Learning Progress</h3>
//             <p>Keep reviewing your cards to improve your progress.</p>
//           </div>
//           <strong className="progress-percentage">
//             {Math.round(stats.progressPercentage)}%
//           </strong>
//         </div>

//         <div className="dashboard-progress-bar">
//           <div
//             className="dashboard-progress-fill"
//             style={{
//               width: `${Math.min(Math.max(stats.progressPercentage, 0), 100)}%`,
//             }}
//           />
//         </div>

//         <div className="progress-footer">
//           <span>{stats.progressPercentage}% completed</span>
//           <strong>{Math.round(stats.progressPercentage)}% completed</strong>
//         </div>
//       </div>

//       {/* MASTERY PREVIEW SECTION */}
//       <div className="dashboard-mastery-card">
//         <div className="section-head">
//           <div>
//             <span className="dashboard-label">MASTERY OVERVIEW</span>
//             <h3>Mastery Status</h3>
//             <p>Cards broken down by backend mastery state</p>
//           </div>
//           <Link to="/mastery" className="secondary-button">
//             View All Mastery →
//           </Link>
//         </div>

//         <div className="mastery-summary-grid">
//           <div className="mastery-summary-box mastered-box">
//             <span className="box-badge">MASTERED</span>
//             <strong className="box-val">{stats.masteredCards}</strong>
//             <span className="box-desc">Completed retention</span>
//           </div>
//           <div className="mastery-summary-box learning-box">
//             <span className="box-badge">LEARNING</span>
//             <strong className="box-val">
//               {Math.max(stats.totalFlashcards - stats.masteredCards, 0)}
//             </strong>
//             <span className="box-desc">In active study</span>
//           </div>
//           <div className="mastery-summary-box due-box">
//             <span className="box-badge">DUE NOW</span>
//             <strong className="box-val">{stats.dueCards}</strong>
//             <span className="box-desc">Ready for review</span>
//           </div>
//         </div>
//       </div>

//       {/* MY LEARNING DECKS SECTION */}
//       <div className="my-learning-section">
//         <div className="section-head">
//           <div>
//             <span className="dashboard-label">MY COLLECTIONS</span>
//             <h3>My Learning Decks</h3>
//             <p>Your current active learning collections</p>
//           </div>
//           <Link to="/decks" className="secondary-button">
//             Browse All Decks →
//           </Link>
//         </div>

//         {decks.length === 0 ? (
//           <div className="empty-state">
//             <span>No study decks available yet.</span>
//             {user?.role === "LINGUIST" && (
//               <div style={{ marginTop: "12px" }}>
//                 <Link to="/decks/create" className="primary-button">
//                   Create Your First Deck
//                 </Link>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="dashboard-decks-grid">
//             {decks.slice(0, 4).map((deck) => (
//               <div className="deck-preview-card" key={deck.id}>
//                 <div className="preview-top">
//                   <span className="deck-tag">
//                     {activeLanguage || "Language Deck"}
//                   </span>
//                   <span className="deck-capacity">Cap: {deck.capacity || 50}</span>
//                 </div>
//                 <h4>{deck.title}</h4>
//                 <p>{deck.description || "Structured language learning collection"}</p>
//                 <div className="preview-mentor">
//                   Mentor: <strong>{deck.mentorName || "LangLoop Mentor"}</strong>
//                 </div>
//                 <div className="preview-actions">
//                   <Link
//                     to={`/study?deckId=${deck.id}`}
//                     className="primary-button preview-study-btn"
//                   >
//                     Study Deck
//                   </Link>
//                   <Link
//                     to={`/decks/${deck.id}`}
//                     className="secondary-button"
//                   >
//                     View
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import {
//   Link,
// } from "react-router-dom";

// import {
//   useSelector,
// } from "react-redux";

// import api from "../../services/api";


// /* =========================================================
//    GET CURRENT USER ID
//    ========================================================= */

// function getUserId(user) {

//   if (
//     user?.id ??
//     user?.userId ??
//     user?.user_id
//   ) {
//     return (
//       user.id ??
//       user.userId ??
//       user.user_id
//     );
//   }

//   try {

//     const stored =
//       localStorage.getItem(
//         "langloop_user"
//       ) ||
//       localStorage.getItem(
//         "user"
//       );

//     if (!stored) {
//       return null;
//     }

//     const parsed =
//       JSON.parse(stored);

//     return (
//       parsed?.id ??
//       parsed?.userId ??
//       parsed?.user_id ??
//       null
//     );

//   } catch {
//     return null;
//   }
// }


// /* =========================================================
//    FLEXIBLE LIST RESPONSE
//    ========================================================= */

// function unwrapList(
//   data,
//   keys = []
// ) {

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
// }


// /* =========================================================
//    DASHBOARD
//    ========================================================= */

// function Dashboard() {

//   const auth =
//     useSelector(
//       (state) =>
//         state.auth || {}
//     );

//   const user =
//     auth.user;


//   /* =======================================================
//      ROLE
//      ======================================================= */

//   const role =
//     String(
//       user?.role ||
//         "LEARNER"
//     ).toUpperCase();


//   /* =======================================================
//      LANGUAGE
//      ======================================================= */

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


//   /* =======================================================
//      STATE
//      ======================================================= */

//   const [
//     decks,
//     setDecks,
//   ] = useState([]);


//   const [
//     stats,
//     setStats,
//   ] = useState({

//     totalDecks: 0,

//     totalFlashcards: 0,

//     masteredCards: 0,

//     dueCards: 0,

//     progressPercentage: 0,

//   });


//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     error,
//     setError,
//   ] = useState("");


//   /* =======================================================
//      LOAD DASHBOARD
//      ======================================================= */

//   useEffect(() => {

//     let mounted = true;


//     const loadDashboard =
//       async () => {

//         setLoading(true);

//         setError("");


//         const currentUserId =
//           getUserId(user);


//         let loadedDecks = [];


//         /* ================================================
//            LOAD DECKS
//            ================================================ */

//         try {

//           const response =
//             await api.get(
//               "/decks"
//             );


//           loadedDecks =
//             unwrapList(
//               response.data,
//               ["decks"]
//             );

//         } catch (err) {

//           console.error(
//             "Failed to load decks:",
//             err
//           );


//           if (mounted) {

//             setError(
//               "Some dashboard content could not be loaded."
//             );

//           }

//         }


//         /* =================================================
//            LEARNER
//            ================================================= */

//         if (
//           role === "LEARNER"
//         ) {

//           let totalFlashcards =
//             0;

//           let masteredCards =
//             0;

//           let progressPercentage =
//             0;

//           let dueCards =
//             0;


//           /* ===============================================
//              USER PROGRESS
//              =============================================== */

//           if (
//             currentUserId
//           ) {

//             try {

//               const progressResponse =
//                 await api.get(
//                   `/analytics/progress?userId=${encodeURIComponent(
//                     currentUserId
//                   )}`
//                 );


//               const progressData =
//                 progressResponse
//                   ?.data
//                   ?.data ??
//                 progressResponse
//                   ?.data ??
//                 {};


//               totalFlashcards =
//                 Number(
//                   progressData.totalCards ??
//                     progressData.totalFlashcards ??
//                     progressData.total ??
//                     0
//                 );


//               masteredCards =
//                 Number(
//                   progressData.masteredCards ??
//                     progressData.mastered ??
//                     0
//                 );


//               progressPercentage =
//                 Number(
//                   progressData.progressPercentage ??
//                     progressData.percentage ??
//                     progressData.progress ??
//                     0
//                 );

//             } catch (err) {

//               console.error(
//                 "Failed to load learner progress:",
//                 err
//               );

//             }


//             /* =============================================
//                DUE CARDS
//                ============================================= */

//             try {

//               const dueResponse =
//                 await api.get(
//                   `/study/due?userId=${encodeURIComponent(
//                     currentUserId
//                   )}`
//                 );


//               const dueData =
//                 dueResponse?.data;


//               const dueList =
//                 unwrapList(
//                   dueData,
//                   [
//                     "cards",
//                     "flashcards",
//                     "items",
//                   ]
//                 );


//               dueCards =
//                 dueList.length;


//               if (
//                 !dueCards &&
//                 typeof dueData?.count ===
//                   "number"
//               ) {

//                 dueCards =
//                   dueData.count;

//               }

//             } catch (err) {

//               console.error(
//                 "Failed to load due cards:",
//                 err
//               );

//             }

//           }


//           /* ===============================================
//              SET LEARNER STATS
//              =============================================== */

//           if (mounted) {

//             setStats({

//               totalDecks:
//                 loadedDecks.length,

//               totalFlashcards,

//               masteredCards,

//               dueCards,

//               progressPercentage,

//             });

//           }

//         }


//         /* =================================================
//            LINGUIST / ADMIN
//            ================================================= */

//         else {

//           let totalFlashcards =
//             0;


//           try {

//             const cardCounts =
//               await Promise.all(

//                 loadedDecks
//                   .slice(0, 12)
//                   .map(
//                     async (deck) => {

//                       try {

//                         const response =
//                           await api.get(
//                             `/flashcards/deck/${deck.id}`
//                           );


//                         return unwrapList(
//                           response.data,
//                           [
//                             "cards",
//                             "flashcards",
//                             "items",
//                           ]
//                         ).length;

//                       } catch {

//                         return 0;

//                       }

//                     }
//                   )

//               );


//             totalFlashcards =
//               cardCounts.reduce(
//                 (
//                   sum,
//                   count
//                 ) =>
//                   sum + count,
//                 0
//               );

//           } catch (err) {

//             console.error(
//               "Failed to load content counts:",
//               err
//             );

//           }


//           if (mounted) {

//             setStats({

//               totalDecks:
//                 loadedDecks.length,

//               totalFlashcards,

//               masteredCards: 0,

//               dueCards: 0,

//               progressPercentage: 0,

//             });

//           }

//         }


//         /* =================================================
//            FINISH
//            ================================================= */

//         if (mounted) {

//           setDecks(
//             loadedDecks
//           );

//           setLoading(false);

//         }

//       };


//     loadDashboard();


//     return () => {

//       mounted = false;

//     };

//   }, [
//     user,
//     role,
//   ]);


//   /* =======================================================
//      USERNAME
//      ======================================================= */

//   const username =
//     user?.username ||
//     user?.name ||
//     "User";


//   const primaryDeck =
//     decks[0] || null;


//   /* =======================================================
//      LOADING
//      ======================================================= */

//   if (loading) {

//     return (

//       <div
//         className={`page-container role-page role-page-${role.toLowerCase()}`}
//       >

//         <div className="dashboard-loading">

//           <h1>
//             Loading dashboard...
//           </h1>

//         </div>

//       </div>

//     );

//   }


//   /* =======================================================
//      LINGUIST DASHBOARD
//      ======================================================= */

//   if (
//     role === "LINGUIST"
//   ) {

//     return (

//       <div className="page-container role-page role-page-linguist">

//         {/* HERO */}

//         <div className="role-hero">

//           <div>

//             <span className="dashboard-label">
//               LINGUIST WORKSPACE
//             </span>

//             <h1>
//               Welcome, {username}!
//             </h1>

//             <p>
//               Build, manage, and improve
//               language-learning content.
//             </p>

//           </div>


//           <Link
//             to="/decks/create"
//             className="role-primary-button"
//           >
//             + Create Deck
//           </Link>

//         </div>


//         {error && (
//           <div className="error-message">
//             {error}
//           </div>
//         )}


//         {/* WORKSPACE BANNER */}

//         <div className="workspace-banner linguist-banner">

//           <div>

//             <span className="workspace-kicker">
//               CONTENT CREATION
//             </span>

//             <h2>
//               Your content workspace
//             </h2>

//             <p>
//               Manage your language decks
//               and keep your learning content
//               useful, structured, and ready
//               for learners.
//             </p>

//           </div>


//           <div className="workspace-icon">
//             ✦
//           </div>

//         </div>


//         {/* STATS */}

//         <div className="stats-grid role-stats-grid">

//           <div className="stat-card role-stat-card linguist-stat">

//             <span className="stat-title">
//               MY DECKS
//             </span>

//             <p className="stat-value">
//               {stats.totalDecks}
//             </p>

//             <span className="stat-description">
//               Content collections
//             </span>

//           </div>


//           <div className="stat-card role-stat-card linguist-stat">

//             <span className="stat-title">
//               FLASHCARDS
//             </span>

//             <p className="stat-value">
//               {stats.totalFlashcards}
//             </p>

//             <span className="stat-description">
//               Cards across loaded decks
//             </span>

//           </div>


//           <div className="stat-card role-stat-card linguist-stat">

//             <span className="stat-title">
//               CONTENT ACTIONS
//             </span>

//             <p className="stat-value">
//               2
//             </p>

//             <span className="stat-description">
//               Create and manage
//             </span>

//           </div>

//         </div>


//         {/* MANAGEMENT */}

//         <div className="role-section-card">

//           <div className="section-head">

//             <div>

//               <span className="dashboard-label">
//                 CONTENT MANAGEMENT
//               </span>

//               <h3>
//                 Manage your content
//               </h3>

//               <p>
//                 Jump directly into the
//                 tools you use most.
//               </p>

//             </div>

//           </div>


//           <div className="role-action-grid">

//             <Link
//               to="/decks/create"
//               className="role-action-card"
//             >

//               <span className="action-icon">
//                 ＋
//               </span>

//               <strong>
//                 Create Deck
//               </strong>

//               <span>
//                 Create a new language-learning
//                 collection.
//               </span>

//             </Link>


//             <Link
//               to="/decks"
//               className="role-action-card"
//             >

//               <span className="action-icon">
//                 ▣
//               </span>

//               <strong>
//                 Manage Decks
//               </strong>

//               <span>
//                 Review and manage your
//                 existing content.
//               </span>

//             </Link>


//             <Link
//               to="/analytics"
//               className="role-action-card"
//             >

//               <span className="action-icon">
//                 ↗
//               </span>

//               <strong>
//                 Content Analytics
//               </strong>

//               <span>
//                 Review content-related
//                 analytics available to you.
//               </span>

//             </Link>

//           </div>

//         </div>


//         {/* DECKS */}

//         <div className="role-section-card">

//           <div className="section-head">

//             <div>

//               <span className="dashboard-label">
//                 RECENT CONTENT
//               </span>

//               <h3>
//                 Your decks
//               </h3>

//             </div>


//             <Link
//               to="/decks"
//               className="role-secondary-button"
//             >
//               View All →
//             </Link>

//           </div>


//           {primaryDeck ? (

//             <div className="role-deck-grid">

//               {decks
//                 .slice(0, 4)
//                 .map((deck) => (

//                   <div
//                     className="role-deck-card"
//                     key={deck.id}
//                   >

//                     <span className="role-deck-tag">
//                       CONTENT
//                     </span>

//                     <h4>
//                       {deck.title}
//                     </h4>

//                     <p>
//                       {deck.description ||
//                         "Language-learning content collection"}
//                     </p>

//                     <Link
//                       to={`/decks/${deck.id}`}
//                       className="role-secondary-button"
//                     >
//                       Open Deck
//                     </Link>

//                   </div>

//                 ))}

//             </div>

//           ) : (

//             <div className="empty-state">

//               <span>
//                 No decks available yet.
//               </span>

//               <Link
//                 to="/decks/create"
//                 className="role-primary-button"
//               >
//                 Create Your First Deck
//               </Link>

//             </div>

//           )}

//         </div>

//       </div>

//     );

//   }


//   /* =======================================================
//      ADMIN DASHBOARD
//      ======================================================= */

//   if (
//     role === "ADMIN"
//   ) {

//     return (

//       <div className="page-container role-page role-page-admin">

//         {/* HERO */}

//         <div className="role-hero">

//           <div>

//             <span className="dashboard-label">
//               ADMIN OVERVIEW
//             </span>

//             <h1>
//               Platform Overview
//             </h1>

//             <p>
//               Monitor content and platform
//               activity from one place.
//             </p>

//           </div>

//         </div>


//         {error && (
//           <div className="error-message">
//             {error}
//           </div>
//         )}


//         {/* BANNER */}

//         <div className="workspace-banner admin-banner">

//           <div>

//             <span className="workspace-kicker">
//               PLATFORM MANAGEMENT
//             </span>

//             <h2>
//               LangLoop control center
//             </h2>

//             <p>
//               Review platform content and
//               access the administrative
//               analytics available to you.
//             </p>

//           </div>


//           <div className="workspace-icon">
//             ◆
//           </div>

//         </div>


//         {/* STATS */}

//         <div className="stats-grid role-stats-grid">

//           <div className="stat-card role-stat-card admin-stat">

//             <span className="stat-title">
//               CONTENT DECKS
//             </span>

//             <p className="stat-value">
//               {stats.totalDecks}
//             </p>

//             <span className="stat-description">
//               Available collections
//             </span>

//           </div>


//           <div className="stat-card role-stat-card admin-stat">

//             <span className="stat-title">
//               FLASHCARDS
//             </span>

//             <p className="stat-value">
//               {stats.totalFlashcards}
//             </p>

//             <span className="stat-description">
//               Loaded platform content
//             </span>

//           </div>


//           <div className="stat-card role-stat-card admin-stat">

//             <span className="stat-title">
//               MANAGEMENT
//             </span>

//             <p className="stat-value">
//               3
//             </p>

//             <span className="stat-description">
//               Overview, content, analytics
//             </span>

//           </div>

//         </div>


//         {/* MANAGEMENT ACTIONS */}

//         <div className="role-section-card">

//           <div className="section-head">

//             <div>

//               <span className="dashboard-label">
//                 PLATFORM MANAGEMENT
//               </span>

//               <h3>
//                 Management actions
//               </h3>

//               <p>
//                 Navigate to the main
//                 administrative areas.
//               </p>

//             </div>

//           </div>


//           <div className="role-action-grid">

//             <Link
//               to="/decks"
//               className="role-action-card"
//             >

//               <span className="action-icon">
//                 ▣
//               </span>

//               <strong>
//                 Content
//               </strong>

//               <span>
//                 Review and manage platform
//                 learning content.
//               </span>

//             </Link>


//             <Link
//               to="/analytics"
//               className="role-action-card"
//             >

//               <span className="action-icon">
//                 ↗
//               </span>

//               <strong>
//                 Analytics
//               </strong>

//               <span>
//                 Open platform analytics
//                 and progress information.
//               </span>

//             </Link>


//             <Link
//               to="/dashboard"
//               className="role-action-card"
//             >

//               <span className="action-icon">
//                 ⌂
//               </span>

//               <strong>
//                 Overview
//               </strong>

//               <span>
//                 Return to the main platform
//                 control center.
//               </span>

//             </Link>

//           </div>

//         </div>


//         {/* CONTENT SNAPSHOT */}

//         <div className="role-section-card">

//           <div className="section-head">

//             <div>

//               <span className="dashboard-label">
//                 CONTENT SNAPSHOT
//               </span>

//               <h3>
//                 Recent platform content
//               </h3>

//             </div>


//             <Link
//               to="/decks"
//               className="role-secondary-button"
//             >
//               View Content →
//             </Link>

//           </div>


//           {decks.length > 0 ? (

//             <div className="role-deck-grid">

//               {decks
//                 .slice(0, 4)
//                 .map((deck) => (

//                   <div
//                     className="role-deck-card"
//                     key={deck.id}
//                   >

//                     <span className="role-deck-tag">
//                       PLATFORM CONTENT
//                     </span>

//                     <h4>
//                       {deck.title}
//                     </h4>

//                     <p>
//                       {deck.description ||
//                         "Language-learning content collection"}
//                     </p>

//                     <Link
//                       to={`/decks/${deck.id}`}
//                       className="role-secondary-button"
//                     >
//                       Inspect
//                     </Link>

//                   </div>

//                 ))}

//             </div>

//           ) : (

//             <div className="empty-state">
//               No platform content available.
//             </div>

//           )}

//         </div>

//       </div>

//     );

//   }


//   /* =======================================================
//      LEARNER DASHBOARD
//      ======================================================= */

//   return (

//     <div className="page-container role-page role-page-learner">

//       {/* HEADER */}

//       <div className="page-header">

//         <div>

//           <span className="dashboard-label">
//             LEARNING DASHBOARD
//           </span>

//           <h1>
//             Hello, {username}!
//           </h1>

//           <p>
//             Welcome back to your
//             language journey.
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


//       {/* LANGUAGE BANNER */}

//       {activeLanguage && (

//         <div className="learning-context-banner">

//           <div className="context-left">

//             <span className="context-icon">
//               🌐
//             </span>

//             <div>

//               <span className="context-subtitle">
//                 Active Learning Language
//               </span>

//               <h2>
//                 You're learning{" "}
//                 {activeLanguage}
//               </h2>

//               <p>
//                 Your study decks, spaced
//                 repetition cards, and mastery
//                 metrics are tuned to your{" "}
//                 {activeLanguage} progress.
//               </p>

//             </div>

//           </div>


//           <Link
//             to="/study"
//             className="primary-button context-cta"
//           >
//             Practice Now
//           </Link>

//         </div>

//       )}


//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}


//       {/* STUDY CARD */}

//       <div className="study-card">

//         <div>

//           <span className="study-card-label">
//             READY TO LEARN?
//           </span>

//           <h2>
//             Ready to study?
//           </h2>

//           <p>

//             {primaryDeck ? (

//               <>
//                 Continue with{" "}
//                 <strong>
//                   {primaryDeck.title}
//                 </strong>{" "}
//                 — You have{" "}
//                 <strong>
//                   {stats.dueCards}
//                 </strong>{" "}
//                 cards waiting for review.
//               </>

//             ) : (

//               <>
//                 You have{" "}
//                 <strong>
//                   {stats.dueCards}
//                 </strong>{" "}
//                 cards waiting for review.
//               </>

//             )}

//           </p>

//         </div>


//         <div className="study-hero-actions">

//           <Link
//             to={
//               primaryDeck
//                 ? `/study?deckId=${primaryDeck.id}`
//                 : "/study?all=true"
//             }
//             className="primary-button"
//           >
//             Start Session
//           </Link>

//         </div>

//       </div>


//       {/* STATS */}

//       <div className="stats-grid">

//         <div className="stat-card deck-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               ▣
//             </span>

//             <span className="stat-title">
//               TOTAL DECKS
//             </span>

//           </div>

//           <h3>
//             Total Decks
//           </h3>

//           <p className="stat-value">
//             {stats.totalDecks}
//           </p>

//           <span className="stat-description">
//             Learning collections
//           </span>

//         </div>


//         <div className="stat-card flashcard-stat">

//           <div className="stat-card-top">

//             <span className="stat-icon">
//               ▤
//             </span>

//             <span className="stat-title">
//               FLASHCARDS
//             </span>

//           </div>

//           <h3>
//             Total Flashcards
//           </h3>

//           <p className="stat-value">
//             {stats.totalFlashcards}
//           </p>

//           <span className="stat-description">
//             Total cards
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
//             Mastered Cards
//           </h3>

//           <p className="stat-value">
//             {stats.masteredCards}
//           </p>

//           <span className="stat-description">
//             Cards completed
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
//             Due Cards
//           </h3>

//           <p className="stat-value">
//             {stats.dueCards}
//           </p>

//           <span className="stat-description">
//             Cards to review
//           </span>

//         </div>

//       </div>


//       {/* PROGRESS */}

//       <div className="progress-section">

//         <div className="progress-header">

//           <div>

//             <span className="dashboard-label">
//               LEARNING GOAL
//             </span>

//             <h3>
//               Learning Progress
//             </h3>

//             <p>
//               Keep reviewing your cards
//               to improve your progress.
//             </p>

//           </div>


//           <strong className="progress-percentage">
//             {Math.round(
//               stats.progressPercentage
//             )}
//             %
//           </strong>

//         </div>


//         <div className="dashboard-progress-bar">

//           <div
//             className="dashboard-progress-fill"
//             style={{
//               width: `${Math.min(
//                 Math.max(
//                   stats.progressPercentage,
//                   0
//                 ),
//                 100
//               )}%`,
//             }}
//           />

//         </div>


//         <div className="progress-footer">

//           <span>
//             {stats.progressPercentage}%
//             completed
//           </span>

//           <strong>
//             {Math.round(
//               stats.progressPercentage
//             )}
//             % completed
//           </strong>

//         </div>

//       </div>


//       {/* MASTERY */}

//       <div className="dashboard-mastery-card">

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               MASTERY OVERVIEW
//             </span>

//             <h3>
//               Mastery Status
//             </h3>

//             <p>
//               Cards broken down by
//               mastery state
//             </p>

//           </div>


//           <Link
//             to="/mastery"
//             className="secondary-button"
//           >
//             View All Mastery →
//           </Link>

//         </div>


//         <div className="mastery-summary-grid">

//           <div className="mastery-summary-box mastered-box">

//             <span className="box-badge">
//               MASTERED
//             </span>

//             <strong className="box-val">
//               {stats.masteredCards}
//             </strong>

//             <span className="box-desc">
//               Completed retention
//             </span>

//           </div>


//           <div className="mastery-summary-box learning-box">

//             <span className="box-badge">
//               LEARNING
//             </span>

//             <strong className="box-val">
//               {Math.max(
//                 stats.totalFlashcards -
//                   stats.masteredCards,
//                 0
//               )}
//             </strong>

//             <span className="box-desc">
//               In active study
//             </span>

//           </div>


//           <div className="mastery-summary-box due-box">

//             <span className="box-badge">
//               DUE NOW
//             </span>

//             <strong className="box-val">
//               {stats.dueCards}
//             </strong>

//             <span className="box-desc">
//               Ready for review
//             </span>

//           </div>

//         </div>

//       </div>


//       {/* LEARNING DECKS */}

//       <div className="my-learning-section">

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               MY COLLECTIONS
//             </span>

//             <h3>
//               My Learning Decks
//             </h3>

//             <p>
//               Your current active
//               learning collections
//             </p>

//           </div>


//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             Browse All Decks →
//           </Link>

//         </div>


//         {decks.length === 0 ? (

//           <div className="empty-state">
//             No study decks available yet.
//           </div>

//         ) : (

//           <div className="dashboard-decks-grid">

//             {decks
//               .slice(0, 4)
//               .map((deck) => (

//                 <div
//                   className="deck-preview-card"
//                   key={deck.id}
//                 >

//                   <div className="preview-top">

//                     <span className="deck-tag">
//                       {activeLanguage ||
//                         "Language Deck"}
//                     </span>

//                     <span className="deck-capacity">
//                       Cap:{" "}
//                       {deck.capacity ||
//                         50}
//                     </span>

//                   </div>


//                   <h4>
//                     {deck.title}
//                   </h4>


//                   <p>
//                     {deck.description ||
//                       "Structured language learning collection"}
//                   </p>


//                   <div className="preview-mentor">

//                     Mentor:{" "}

//                     <strong>
//                       {deck.mentorName ||
//                         "LangLoop Mentor"}
//                     </strong>

//                   </div>


//                   <div className="preview-actions">

//                     <Link
//                       to={`/study?deckId=${deck.id}`}
//                       className="primary-button preview-study-btn"
//                     >
//                       Study Deck
//                     </Link>

//                     <Link
//                       to={`/decks/${deck.id}`}
//                       className="secondary-button"
//                     >
//                       View
//                     </Link>

//                   </div>

//                 </div>

//               ))}

//           </div>

//         )}

//       </div>

//     </div>

//   );

// }


// export default Dashboard;
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import { Link } from "react-router-dom";

// import { useSelector } from "react-redux";

// import api from "../../services/api";

// import {
//   getProgress,
//   getDueCards,
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
//     if (Array.isArray(data?.[key])) {
//       return data[key];
//     }
//   }

//   if (Array.isArray(data?.data)) {
//     return data.data;
//   }

//   return [];
// };


// const getCardId = (card) =>
//   card?.id ??
//   card?.flashcardId ??
//   card?.cardId ??
//   null;


// const getFront = (card) =>
//   card?.frontContent ||
//   card?.frontText ||
//   card?.front ||
//   card?.question ||
//   "Flashcard";


// const getBack = (card) =>
//   card?.backContent ||
//   card?.backText ||
//   card?.back ||
//   card?.answer ||
//   card?.translation ||
//   "";


// function Dashboard() {

//   const auth =
//     useSelector(
//       (state) =>
//         state.auth || {}
//     );

//   const user =
//     auth.user;


//   const selectedLanguage =
//     useSelector(
//       (state) =>
//         state.languages
//           ?.selectedLanguage
//     );


//   const learningLanguage =
//     selectedLanguage ||
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
//     progress,
//     setProgress,
//   ] = useState({
//     totalCards: 0,
//     masteredCards: 0,
//     progressPercentage: 0,
//   });


//   const [
//     dueCards,
//     setDueCards,
//   ] = useState([]);


//   const [
//     decks,
//     setDecks,
//   ] = useState([]);


//   useEffect(() => {

//     let mounted = true;


//     const loadDashboard =
//       async () => {

//         setLoading(true);
//         setError("");


//         /*
//          * =================================================
//          * BACKEND PROGRESS
//          * =================================================
//          */

//         let backendProgress = {
//           totalCards: 0,
//           masteredCards: 0,
//           progressPercentage: 0,
//         };


//         try {

//           backendProgress =
//             await getProgress(
//               user
//             );

//         } catch (err) {

//           console.warn(
//             "Dashboard progress request failed:",
//             err
//           );

//         }


//         /*
//          * =================================================
//          * BACKEND DUE CARDS
//          * =================================================
//          */

//         let backendDueCards =
//           [];


//         try {

//           backendDueCards =
//             await getDueCards(
//               user
//             );

//         } catch (err) {

//           console.warn(
//             "Dashboard due-card request failed:",
//             err
//           );

//         }


//         /*
//          * =================================================
//          * LOCAL LEARNER STATUS
//          * =================================================
//          */

//         const localMasteredIds =
//           getLocalMasteredIds();


//         const localDueIds =
//           getLocalDueIds();


//         /*
//          * =================================================
//          * LOAD DECKS
//          * =================================================
//          */

//         let loadedDecks =
//           [];


//         try {

//           const response =
//             await api.get(
//               "/decks"
//             );


//           const rawDecks =
//             listFrom(
//               response?.data,
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

//                     const cardsResponse =
//                       await api.get(
//                         `/flashcards/deck/${deck.id}`
//                       );


//                     const cards =
//                       listFrom(
//                         cardsResponse?.data,
//                         [
//                           "cards",
//                           "flashcards",
//                           "items",
//                         ]
//                       );


//                     return {
//                       ...deck,
//                       cards,
//                     };

//                   } catch {

//                     return {
//                       ...deck,
//                       cards: [],
//                     };

//                   }

//                 }
//               )
//             );

//         } catch (err) {

//           console.warn(
//             "Dashboard decks request failed:",
//             err
//           );

//         }


//         /*
//          * =================================================
//          * ALL CARDS
//          * =================================================
//          */

//         const allCards =
//           loadedDecks.flatMap(
//             (deck) =>
//               deck.cards || []
//           );


//         /*
//          * =================================================
//          * TOTAL
//          * =================================================
//          */

//         const backendTotal =
//           Number(
//             backendProgress?.totalCards ||
//               0
//           );


//         const actualTotal =
//           allCards.length;


//         const totalCards =
//           backendTotal > 0
//             ? backendTotal
//             : actualTotal;


//         /*
//          * =================================================
//          * MASTERED
//          * =================================================
//          */

//         const backendMastered =
//           Number(
//             backendProgress?.masteredCards ||
//               0
//           );


//         const localMastered =
//           localMasteredIds.size;


//         const masteredCards =
//           Math.min(
//             Math.max(
//               backendMastered,
//               localMastered
//             ),
//             totalCards
//           );


//         /*
//          * =================================================
//          * DUE
//          * =================================================
//          */

//         const dueMap =
//           new Map();


//         (
//           Array.isArray(
//             backendDueCards
//           )
//             ? backendDueCards
//             : []
//         ).forEach(
//           (card) => {

//             const id =
//               getCardId(
//                 card
//               );


//             if (
//               id !== null
//             ) {

//               dueMap.set(
//                 String(id),
//                 card
//               );

//             }

//           }
//         );


//         allCards.forEach(
//           (card) => {

//             const id =
//               getCardId(
//                 card
//               );


//             if (
//               id !== null &&
//               localDueIds.has(
//                 String(id)
//               )
//             ) {

//               dueMap.set(
//                 String(id),
//                 {
//                   ...(dueMap.get(
//                     String(id)
//                   ) || {}),
//                   ...card,
//                   masteryLevel:
//                     "DUE",
//                 }
//               );

//             }

//           }
//         );


//         const mergedDueCards =
//           Array.from(
//             dueMap.values()
//           );


//         /*
//          * =================================================
//          * PERCENTAGE
//          * =================================================
//          */

//         let percentage =
//           Number(
//             backendProgress?.progressPercentage ||
//               0
//           );


//         if (
//           totalCards > 0
//         ) {

//           const calculated =
//             (
//               masteredCards /
//               totalCards
//             ) *
//             100;


//           percentage =
//             Math.max(
//               percentage,
//               calculated
//             );

//         }


//         percentage =
//           Math.min(
//             Math.max(
//               percentage,
//               0
//             ),
//             100
//           );


//         if (!mounted) {
//           return;
//         }


//         setProgress({
//           totalCards,
//           masteredCards,
//           progressPercentage:
//             percentage,
//         });


//         setDueCards(
//           mergedDueCards
//         );


//         setDecks(
//           loadedDecks
//         );


//         setLoading(false);

//       };


//     loadDashboard();


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
//     progress.totalCards;


//   const mastered =
//     progress.masteredCards;


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
//       progress.progressPercentage
//     );


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
//             Loading dashboard...
//           </h1>

//         </div>

//       </div>

//     );

//   }


//   /*
//    * =====================================================
//    * DASHBOARD
//    * =====================================================
//    */

//   return (

//     <div className="page-container">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="page-header">

//         <div>

//           <span className="dashboard-label">
//             LEARNER DASHBOARD
//           </span>


//           <h1>
//             Welcome back
//             {user?.username
//               ? `, ${user.username}`
//               : ""}
//           </h1>


//           <p>
//             Keep your learning
//             streak going and
//             review your cards
//             before they are
//             forgotten.
//           </p>

//         </div>


//         {learningLanguage && (

//           <div className="active-learning-badge">

//             <span className="badge-pulse"></span>

//             <span>

//               Learning:{" "}

//               <strong>
//                 {learningLanguage}
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


//       {/* =================================================
//           QUICK STATS
//       ================================================= */}

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
//             Total Cards
//           </h3>


//           <p className="stat-value">
//             {total}
//           </p>


//           <span className="stat-description">
//             In your learning collection
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
//             Cards fully retained
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
//             Cards still in progress
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
//             Review Now
//           </h3>


//           <p className="stat-value">
//             {due}
//           </p>


//           <span className="stat-description">
//             Cards waiting for review
//           </span>

//         </div>

//       </div>


//       {/* =================================================
//           PROGRESS
//       ================================================= */}

//       <div className="dashboard-section-card">

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               LEARNING PROGRESS
//             </span>


//             <h3>
//               Your Mastery Progress
//             </h3>


//             <p>
//               Continue building your
//               long-term retention.
//             </p>

//           </div>


//           <Link
//             to="/progress"
//             className="secondary-button"
//           >
//             View Progress
//           </Link>

//         </div>


//         <div className="dashboard-progress-wrapper">

//           <div className="dashboard-progress-info">

//             <strong>
//               {percentage}%
//             </strong>


//             <span>
//               {mastered} of {total} cards mastered
//             </span>

//           </div>


//           <div className="dashboard-progress-bar">

//             <div
//               className="dashboard-progress-fill"
//               style={{
//                 width:
//                   `${percentage}%`,
//               }}
//             />

//           </div>


//           <div className="progress-footer">

//             <span>
//               Keep practicing
//             </span>


//             <span>
//               {percentage}% complete
//             </span>

//           </div>

//         </div>

//       </div>


//       {/* =================================================
//           DUE REVIEW
//       ================================================= */}

//       <div
//         className="dashboard-section-card"
//         style={{
//           marginTop: "32px",
//         }}
//       >

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               SPACED REPETITION
//             </span>


//             <h3>
//               Review Queue
//             </h3>


//             <p>
//               Cards that need your
//               attention today.
//             </p>

//           </div>


//           {due > 0 && (

//             <Link
//               to="/study"
//               className="primary-button"
//             >
//               Start Review
//             </Link>

//           )}

//         </div>


//         {due === 0 ? (

//           <div className="empty-state">

//             <div className="empty-icon">
//               ✓
//             </div>


//             <h4>
//               You're all caught up!
//             </h4>


//             <p>
//               There are no cards
//               currently waiting for
//               review.
//             </p>


//             <Link
//               to="/study"
//               className="secondary-button"
//             >
//               Practice Learning Cards
//             </Link>

//           </div>

//         ) : (

//           <div className="dashboard-due-grid">

//             {dueCards
//               .slice(0, 6)
//               .map(
//                 (
//                   card,
//                   index
//                 ) => {

//                   const id =
//                     getCardId(
//                       card
//                     );


//                   return (

//                     <div
//                       className="dashboard-due-card"
//                       key={
//                         id ??
//                         `${getFront(
//                           card
//                         )}-${index}`
//                       }
//                     >

//                       <div className="due-card-header">

//                         <span className="due-card-label">
//                           DUE
//                         </span>


//                         <span className="due-card-icon">
//                           !
//                         </span>

//                       </div>


//                       <h4>
//                         {getFront(
//                           card
//                         )}
//                       </h4>


//                       <p>
//                         {getBack(
//                           card
//                         )}
//                       </p>


//                       <Link
//                         to={
//                           id !==
//                           null
//                             ? `/study?cardId=${encodeURIComponent(
//                                 id
//                               )}`
//                             : "/study"
//                         }
//                         className="secondary-button"
//                       >
//                         Practice
//                       </Link>

//                     </div>

//                   );

//                 }
//               )}

//           </div>

//         )}

//       </div>


//       {/* =================================================
//           DECKS
//       ================================================= */}

//       <div
//         className="dashboard-section-card"
//         style={{
//           marginTop: "32px",
//         }}
//       >

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               YOUR LEARNING
//             </span>


//             <h3>
//               Study Decks
//             </h3>


//             <p>
//               Continue learning from
//               your available decks.
//             </p>

//           </div>


//           <Link
//             to="/decks"
//             className="secondary-button"
//           >
//             View Decks
//           </Link>

//         </div>


//         {decks.length === 0 ? (

//           <div className="empty-state">

//             <p>
//               No study decks available.
//             </p>

//           </div>

//         ) : (

//           <div className="dashboard-deck-grid">

//             {decks
//               .slice(0, 6)
//               .map(
//                 (deck) => {

//                   const cardCount =
//                     Number(
//                       deck.cards?.length ||
//                         0
//                     );


//                   return (

//                     <div
//                       className="dashboard-deck-card"
//                       key={deck.id}
//                     >

//                       <span className="deck-tag">
//                         {deck.language ||
//                           learningLanguage ||
//                           "LANGUAGE"}
//                       </span>


//                       <h4>
//                         {deck.title}
//                       </h4>


//                       <p>
//                         {deck.description ||
//                           "Continue learning with this study deck."}
//                       </p>


//                       <div className="deck-card-footer">

//                         <span>
//                           {cardCount} cards
//                         </span>


//                         <Link
//                           to={`/study?deckId=${deck.id}`}
//                           className="primary-button"
//                         >
//                           Study
//                         </Link>

//                       </div>

//                     </div>

//                   );

//                 }
//               )}

//           </div>

//         )}

//       </div>


//       {/* =================================================
//           QUICK ACTIONS
//       ================================================= */}

//       <div
//         className="quick-actions-section"
//         style={{
//           marginTop: "32px",
//         }}
//       >

//         <div className="section-head">

//           <div>

//             <span className="dashboard-label">
//               QUICK ACTIONS
//             </span>


//             <h3>
//               Keep Learning
//             </h3>

//           </div>

//         </div>


//         <div className="quick-actions-grid">

//           <Link
//             to="/study"
//             className="quick-action-card"
//           >

//             <span className="quick-action-icon">
//               ▶
//             </span>


//             <div>

//               <strong>
//                 Study Now
//               </strong>


//               <span>
//                 Start a learning session
//               </span>

//             </div>

//           </Link>


//           <Link
//             to="/mastery"
//             className="quick-action-card"
//           >

//             <span className="quick-action-icon">
//               ★
//             </span>


//             <div>

//               <strong>
//                 Check Mastery
//               </strong>


//               <span>
//                 See your flashcard mastery
//               </span>

//             </div>

//           </Link>


//           <Link
//             to="/progress"
//             className="quick-action-card"
//           >

//             <span className="quick-action-icon">
//               ↗
//             </span>


//             <div>

//               <strong>
//                 View Progress
//               </strong>


//               <span>
//                 Track your learning analytics
//               </span>

//             </div>

//           </Link>

//         </div>

//       </div>

//     </div>

//   );
// }


// export default Dashboard;
// import React, {
//   useEffect,
//   useState,
// } from "react";

// import { Link } from "react-router-dom";

// import { useSelector } from "react-redux";

// import api from "../../services/api";

// import {
//   getProgress,
//   getDueCards,
//   getLocalDueIds,
//   getLocalMasteredIds,
// } from "../../services/analyticsService";

// import {
//   getUserLanguage,
//   getLanguageName,
//   isSameLanguage,
//   t,
// } from "../../utils/languageUtils";


// /* =========================================================
//    HELPERS
// ========================================================= */

// const listFrom = (
//   data,
//   keys = []
// ) => {
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


// const getCardId = (card) =>
//   card?.id ??
//   card?.flashcardId ??
//   card?.cardId ??
//   null;


// const getFront = (card) =>
//   card?.frontContent ||
//   card?.frontText ||
//   card?.front ||
//   card?.question ||
//   "Flashcard";


// const getBack = (card) =>
//   card?.backContent ||
//   card?.backText ||
//   card?.back ||
//   card?.answer ||
//   card?.translation ||
//   "";


// const getDeckLanguage = (deck) =>
//   deck?.language ||
//   deck?.languageName ||
//   deck?.languageCode ||
//   deck?.lang ||
//   deck?.locale ||
//   deck?.learningLanguage ||
//   deck?.targetLanguage ||
//   deck?.targetLanguageCode ||
//   deck?.language?.name ||
//   deck?.language?.code ||
//   deck?.language?.language ||
//   deck?.metadata?.language ||
//   deck?.metadata?.languageName ||
//   deck?.metadata?.languageCode ||
//   "";


// /* =========================================================
//    DASHBOARD
// ========================================================= */

// function Dashboard() {

//   const auth =
//     useSelector(
//       (state) =>
//         state.auth || {}
//     );

//   const user =
//     auth.user;


//   /*
//    * ROLE
//    *
//    * Supported:
//    * LEARNER
//    * LINGUIST
//    * ADMIN
//    */

//   const role =
//     String(
//       user?.role ||
//       "LEARNER"
//     ).toUpperCase();

//   const isLearner = role === "LEARNER";


//   /*
//    * LANGUAGE
//    */

//   const selectedLanguage =
//     useSelector(
//       (state) =>
//         state.languages
//           ?.selectedLanguage
//     );


//   const userLang =
//     selectedLanguage ||
//     getUserLanguage(user);

//   const learningLanguage = userLang;


//   /*
//    * STATE
//    */

//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     error,
//     setError,
//   ] = useState("");


//   const [
//     progress,
//     setProgress,
//   ] = useState({
//     totalCards: 0,
//     masteredCards: 0,
//     progressPercentage: 0,
//   });


//   const [
//     dueCards,
//     setDueCards,
//   ] = useState([]);


//   const [
//     decks,
//     setDecks,
//   ] = useState([]);


//   /* =======================================================
//      LOAD DASHBOARD DATA
//   ======================================================= */

//   useEffect(() => {

//     let mounted = true;


//     const loadDashboard =
//       async () => {

//         setLoading(true);
//         setError("");


//         /*
//          * ---------------------------------------------------
//          * BACKEND PROGRESS
//          * ---------------------------------------------------
//          */

//         let backendProgress = {
//           totalCards: 0,
//           masteredCards: 0,
//           progressPercentage: 0,
//         };


//         try {

//           backendProgress =
//             await getProgress(
//               user
//             );

//         } catch (err) {

//           console.warn(
//             "Dashboard progress request failed:",
//             err
//           );

//         }


//         /*
//          * ---------------------------------------------------
//          * BACKEND DUE CARDS
//          * ---------------------------------------------------
//          */

//         let backendDueCards =
//           [];


//         try {

//           backendDueCards =
//             await getDueCards(
//               user
//             );

//         } catch (err) {

//           console.warn(
//             "Dashboard due-card request failed:",
//             err
//           );

//         }


//         /*
//          * ---------------------------------------------------
//          * LOCAL STATUS
//          * ---------------------------------------------------
//          */

//         const localMasteredIds =
//           getLocalMasteredIds();


//         const localDueIds =
//           getLocalDueIds();


//         /*
//          * ---------------------------------------------------
//          * LOAD DECKS
//          * ---------------------------------------------------
//          */

//         let loadedDecks =
//           [];


//         try {

//           const response =
//             await api.get(
//               "/decks"
//             );


//           const rawDecks =
//             listFrom(
//               response?.data,
//               [
//                 "decks",
//                 "items",
//               ]
//             );

//           const filteredDecks = isLearner
//             ? rawDecks.filter((deck) => {
//                 const deckLanguage = getDeckLanguage(deck);

//                 // Match all common backend language formats:
//                 // English / en / en-US, etc.
//                 // If the endpoint does not expose language metadata,
//                 // keep the deck instead of incorrectly showing zero data.
//                 return (
//                   !deckLanguage ||
//                   isSameLanguage(
//                     deckLanguage,
//                     userLang
//                   )
//                 );
//               })
//             : rawDecks;

//           loadedDecks =
//             await Promise.all(
//               filteredDecks.map(
//                 async (deck) => {

//                   try {

//                     const cardsResponse =
//                       await api.get(
//                         `/flashcards/deck/${deck.id}`
//                       );


//                     const cards =
//                       listFrom(
//                         cardsResponse?.data,
//                         [
//                           "cards",
//                           "flashcards",
//                           "items",
//                         ]
//                       );


//                     return {
//                       ...deck,
//                       cards,
//                     };

//                   } catch {

//                     return {
//                       ...deck,
//                       cards: [],
//                     };

//                   }

//                 }
//               )
//             );

//         } catch (err) {

//           console.warn(
//             "Dashboard decks request failed:",
//             err
//           );

//         }


//         /*
//          * ---------------------------------------------------
//          * ALL CARDS
//          * ---------------------------------------------------
//          */

//         const allCards =
//           loadedDecks.flatMap(
//             (deck) =>
//               deck.cards || []
//           );


//         /*
//          * ---------------------------------------------------
//          * TOTAL CARDS
//          * ---------------------------------------------------
//          */

//         const backendTotal =
//           Number(
//             backendProgress?.totalCards ||
//             0
//           );


//         const actualTotal =
//           allCards.length;


//         const totalCards =
//           backendTotal > 0
//             ? backendTotal
//             : actualTotal;


//         /*
//          * ---------------------------------------------------
//          * MASTERED CARDS
//          * ---------------------------------------------------
//          */

//         const backendMastered =
//           Number(
//             backendProgress?.masteredCards ||
//             0
//           );


//         const localMastered =
//           localMasteredIds.size;


//         const masteredCards =
//           Math.min(
//             Math.max(
//               backendMastered,
//               localMastered
//             ),
//             totalCards
//           );


//         /*
//          * ---------------------------------------------------
//          * DUE CARDS
//          * ---------------------------------------------------
//          */

//         const dueMap =
//           new Map();


//         (
//           Array.isArray(
//             backendDueCards
//           )
//             ? backendDueCards
//             : []
//         ).forEach(
//           (card) => {

//             const id =
//               getCardId(
//                 card
//               );


//             if (
//               id !== null
//             ) {

//               dueMap.set(
//                 String(id),
//                 card
//               );

//             }

//           }
//         );


//         allCards.forEach(
//           (card) => {

//             const id =
//               getCardId(
//                 card
//               );


//             if (
//               id !== null &&
//               localDueIds.has(
//                 String(id)
//               )
//             ) {

//               dueMap.set(
//                 String(id),
//                 {
//                   ...(dueMap.get(
//                     String(id)
//                   ) || {}),
//                   ...card,
//                   masteryLevel:
//                     "DUE",
//                 }
//               );

//             }

//           }
//         );


//         const mergedDueCards =
//           Array.from(
//             dueMap.values()
//           );


//         /*
//          * ---------------------------------------------------
//          * PROGRESS PERCENTAGE
//          * ---------------------------------------------------
//          */

//         let percentage =
//           Number(
//             backendProgress?.progressPercentage ||
//             0
//           );


//         if (
//           totalCards > 0
//         ) {

//           const calculated =
//             (
//               masteredCards /
//               totalCards
//             ) *
//             100;


//           percentage =
//             Math.max(
//               percentage,
//               calculated
//             );

//         }


//         percentage =
//           Math.min(
//             Math.max(
//               percentage,
//               0
//             ),
//             100
//           );


//         /*
//          * ---------------------------------------------------
//          * UPDATE STATE
//          * ---------------------------------------------------
//          */

//         if (!mounted) {
//           return;
//         }


//         setProgress({
//           totalCards,
//           masteredCards,
//           progressPercentage:
//             percentage,
//         });


//         setDueCards(
//           mergedDueCards
//         );


//         setDecks(
//           loadedDecks
//         );


//         setLoading(false);

//       };


//     loadDashboard();


//     return () => {
//       mounted = false;
//     };

//   }, [user, isLearner, userLang]);


//   /* =======================================================
//      DISPLAY VALUES
//   ======================================================= */

//   const total =
//     progress.totalCards;


//   const mastered =
//     progress.masteredCards;


//   const learning =
//     Math.max(
//       total -
//       mastered,
//       0
//     );


//   const due =
//     dueCards.length;


//   const percentage =
//     Math.round(
//       progress.progressPercentage
//     );


//   const displayedDecks = isLearner
//     ? decks.filter((deck) => {
//         const deckLanguage = getDeckLanguage(deck);
//         return !deckLanguage || isSameLanguage(deckLanguage, userLang);
//       })
//     : decks;

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <div className="page-container">
//         <div className="dashboard-loading">
//           <h1>{isLearner ? t("loadingDashboard", userLang) : "Loading dashboard..."}</h1>
//         </div>
//       </div>
//     );
//   }

//   /* =======================================================
//      DASHBOARD
//   ======================================================= */

//   return (
//     <div
//       className={
//         `page-container role-dashboard role-dashboard-${role.toLowerCase()}`
//       }
//     >
//       {/* ===================================================
//           HEADER
//       =================================================== */}

//       <div className="page-header">
//         <div>
//           <span className="dashboard-label">
//             {isLearner
//               ? t("learnerDashboard", userLang)
//               : role === "LINGUIST"
//               ? "LINGUIST WORKSPACE"
//               : "ADMIN DASHBOARD"}
//           </span>

//           <h1>
//             {isLearner
//               ? `${t("welcomeBack", userLang)}${user?.username ? `, ${user.username}` : ""}`
//               : `Welcome back${user?.username ? `, ${user.username}` : ""}`}
//           </h1>

//           <p>
//             {isLearner
//               ? t("learningStreakNotice", userLang)
//               : "Keep your learning streak going and review your cards before they are forgotten."}
//           </p>
//         </div>

//         {userLang && isLearner && (
//           <div className="active-learning-badge">
//             <span className="badge-pulse"></span>
//             <span>
//               {t("learning", userLang)}:{" "}
//               <strong>
//                 {getLanguageName(userLang)}
//               </strong>
//             </span>
//           </div>
//         )}
//       </div>

//       {/* ===================================================
//           ERROR
//       =================================================== */}

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       {/* ===================================================
//           QUICK STATS
//       =================================================== */}

//       <div className="stats-grid">
//         {/* TOTAL CARDS */}
//         <div className="stat-card flashcard-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">▤</span>
//             <span className="stat-title">
//               {isLearner ? t("totalFlashcards", userLang) : "TOTAL FLASHCARDS"}
//             </span>
//           </div>
//           <h3>
//             {isLearner ? t("totalFlashcards", userLang) : "Total Cards"}
//           </h3>
//           <p className="stat-value">{total}</p>
//           <span className="stat-description">
//             {isLearner ? t("inActiveStudy", userLang) : "In your learning collection"}
//           </span>
//         </div>

//         {/* MASTERED */}
//         <div className="stat-card mastered-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">✓</span>
//             <span className="stat-title">
//               {isLearner ? t("mastered", userLang) : "MASTERED"}
//             </span>
//           </div>
//           <h3>
//             {isLearner ? t("mastered", userLang) : "Mastered"}
//           </h3>
//           <p className="stat-value">{mastered}</p>
//           <span className="stat-description">
//             {isLearner ? t("completedRetention", userLang) : "Cards fully retained"}
//           </span>
//         </div>

//         {/* LEARNING */}
//         <div className="stat-card deck-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">⚡</span>
//             <span className="stat-title">
//               {isLearner ? t("learning", userLang) : "LEARNING"}
//             </span>
//           </div>
//           <h3>
//             {isLearner ? t("learning", userLang) : "Learning"}
//           </h3>
//           <p className="stat-value">{learning}</p>
//           <span className="stat-description">
//             {isLearner ? t("inActiveStudy", userLang) : "Cards still in progress"}
//           </span>
//         </div>

//         {/* DUE */}
//         <div className="stat-card due-stat">
//           <div className="stat-card-top">
//             <span className="stat-icon">!</span>
//             <span className="stat-title">
//               {isLearner ? t("dueForReview", userLang) : "DUE FOR REVIEW"}
//             </span>
//           </div>
//           <h3>
//             {isLearner ? t("dueCards", userLang) : "Review Now"}
//           </h3>
//           <p className="stat-value">{due}</p>
//           <span className="stat-description">
//             {isLearner ? t("readyForReview", userLang) : "Cards waiting for review"}
//           </span>
//         </div>
//       </div>

//       {/* ===================================================
//           PROGRESS
//       =================================================== */}

//       <div className="dashboard-section-card">
//         <div className="section-head">
//           <div>
//             <span className="dashboard-label">
//               {isLearner ? t("learningGoal", userLang) : "LEARNING PROGRESS"}
//             </span>
//             <h3>
//               {isLearner ? t("learningProgress", userLang) : "Your Mastery Progress"}
//             </h3>
//             <p>
//               {isLearner
//                 ? t("progressGoalNotice", userLang)
//                 : "Continue building your long-term retention."}
//             </p>
//           </div>

//           <Link to="/progress" className="secondary-button">
//             {isLearner ? t("viewProgress", userLang) : "View Progress"}
//           </Link>
//         </div>

//         <div className="dashboard-progress-wrapper">
//           <div className="dashboard-progress-info">
//             <strong>{percentage}%</strong>
//             <span>
//               {mastered} of {total} {isLearner ? t("masteredCards", userLang) : "cards mastered"}
//             </span>
//           </div>

//           <div className="dashboard-progress-bar">
//             <div
//               className="dashboard-progress-fill"
//               style={{
//                 width: `${percentage}%`,
//               }}
//             />
//           </div>

//           <div className="progress-footer">
//             <span>
//               {isLearner ? t("continueLearning", userLang) : "Keep practicing"}
//             </span>
//             <span>
//               {percentage}% {isLearner ? t("completed", userLang) : "complete"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ===================================================
//           REVIEW QUEUE
//       =================================================== */}

//       <div
//         className="dashboard-section-card"
//         style={{
//           marginTop: "32px",
//         }}
//       >
//         <div className="section-head">
//           <div>
//             <span className="dashboard-label">
//               {isLearner ? t("spacedRepetition", userLang) : "SPACED REPETITION"}
//             </span>
//             <h3>
//               {isLearner ? t("reviewQueue", userLang) : "Review Queue"}
//             </h3>
//             <p>
//               {isLearner
//                 ? t("reviewNotice", userLang)
//                 : "Cards that need your attention today."}
//             </p>
//           </div>

//           {due > 0 && (
//             <Link to="/study?review=true" className="primary-button">
//               {isLearner ? t("startReview", userLang) : "Start Review"}
//             </Link>
//           )}
//         </div>

//         {due === 0 ? (
//           <div className="empty-state">
//             <div className="empty-icon">✓</div>
//             <h4>
//               {isLearner ? t("allCaughtUp", userLang) : "You're all caught up!"}
//             </h4>
//             <p>
//               {isLearner
//                 ? t("noCardsWaiting", userLang)
//                 : "There are no cards currently waiting for review."}
//             </p>
//             <Link to="/study" className="secondary-button">
//               {isLearner ? t("practiceLearningCards", userLang) : "Practice Learning Cards"}
//             </Link>
//           </div>
//         ) : (
//           <div className="dashboard-due-grid">
//             {dueCards.slice(0, 6).map((card, index) => {
//               const id = getCardId(card);
//               return (
//                 <div
//                   className="dashboard-due-card"
//                   key={id ?? `${getFront(card)}-${index}`}
//                 >
//                   <div className="due-card-header">
//                     <span className="due-card-label">
//                       {isLearner ? t("dueCards", userLang) : "DUE"}
//                     </span>
//                     <span className="due-card-icon">!</span>
//                   </div>
//                   <h4>{getFront(card)}</h4>
//                   <p>{getBack(card)}</p>
//                   <Link
//                     to={
//                       id !== null
//                         ? `/study?review=true&cardId=${encodeURIComponent(id)}`
//                         : "/study?review=true"
//                     }
//                     className="secondary-button"
//                   >
//                     {isLearner ? t("practice", userLang) : "Practice"}
//                   </Link>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* ===================================================
//           STUDY DECKS
//       =================================================== */}

//       <div
//         className="dashboard-section-card"
//         style={{
//           marginTop: "32px",
//         }}
//       >
//         <div className="section-head">
//           <div>
//             <span className="dashboard-label">
//               {isLearner ? t("learningCollections", userLang) : "YOUR LEARNING"}
//             </span>
//             <h3>
//               {isLearner
//                 ? t("studyDecks", userLang)
//                 : role === "LINGUIST"
//                 ? "Content Decks"
//                 : "Platform Decks"}
//             </h3>
//             <p>
//               {isLearner
//                 ? t("continueLearning", userLang)
//                 : "Continue learning from your available decks."}
//             </p>
//           </div>

//           <Link to="/decks" className="secondary-button">
//             {isLearner ? t("viewDecks", userLang) : "View Decks"}
//           </Link>
//         </div>

//         {displayedDecks.length === 0 ? (
//           <div className="empty-state">
//             <p>
//               {isLearner ? t("noDecksFound", userLang) : "No study decks available."}
//             </p>
//           </div>
//         ) : (
//           <div className="dashboard-deck-grid">
//             {displayedDecks.slice(0, 6).map((deck) => {
//               const cardCount = Number(deck.cards?.length || 0);
//               return (
//                 <div className="dashboard-deck-card" key={deck.id}>
//                   <span className="deck-tag">
//                     {getLanguageName(deck.language || userLang)}
//                   </span>
//                   <h4>{deck.title}</h4>
//                   <p>
//                     {deck.description ||
//                       (isLearner
//                         ? t("continueLearning", userLang)
//                         : "Continue learning with this study deck.")}
//                   </p>
//                   <div className="deck-card-footer">
//                     <span>
//                       {cardCount} {isLearner ? t("cards", userLang) : "cards"}
//                     </span>
//                     <Link
//                       to={`/study?deckId=${deck.id}`}
//                       className="primary-button"
//                     >
//                       {isLearner ? t("study", userLang) : "Study"}
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* ===================================================
//           QUICK ACTIONS
//       =================================================== */}

//       <div
//         className="quick-actions-section"
//         style={{
//           marginTop: "32px",
//         }}
//       >
//         <div className="section-head">
//           <div>
//             <span className="dashboard-label">
//               {isLearner ? t("quickActions", userLang) : "QUICK ACTIONS"}
//             </span>
//             <h3>
//               {isLearner ? t("keepLearning", userLang) : "Keep Learning"}
//             </h3>
//           </div>
//         </div>

//         <div className="quick-actions-grid">
//           {/* STUDY NOW */}
//           <Link to="/study" className="quick-action-card">
//             <span className="quick-action-icon">▶</span>
//             <div>
//               <strong>
//                 {isLearner ? t("studyNow", userLang) : "Study Now"}
//               </strong>
//               <span>
//                 {isLearner ? t("startLearningSession", userLang) : "Start a learning session"}
//               </span>
//             </div>
//           </Link>

//           {/* CHECK MASTERY */}
//           <Link to="/mastery" className="quick-action-card">
//             <span className="quick-action-icon">★</span>
//             <div>
//               <strong>
//                 {isLearner ? t("checkMastery", userLang) : "Check Mastery"}
//               </strong>
//               <span>
//                 {isLearner ? t("seeFlashcardMastery", userLang) : "See your flashcard mastery"}
//               </span>
//             </div>
//           </Link>

//           {/* VIEW PROGRESS */}
//           <Link to="/progress" className="quick-action-card">
//             <span className="quick-action-icon">↗</span>
//             <div>
//               <strong>
//                 {isLearner ? t("viewProgress", userLang) : "View Progress"}
//               </strong>
//               <span>
//                 {isLearner ? t("trackLearningAnalytics", userLang) : "Track your learning analytics"}
//               </span>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import api from "../../services/api";

import {
  getProgress,
  getDueCards,
  getLocalDueIds,
  getLocalMasteredIds,
} from "../../services/analyticsService";

import {
  getUserLanguage,
  getLanguageName,
  isSameLanguage,
  t,
} from "../../utils/languageUtils";


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
    if (Array.isArray(data?.[key])) {
      return data[key];
    }
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
};


const getCardId = (card) =>
  card?.id ??
  card?.flashcardId ??
  card?.cardId ??
  null;


const getFront = (card) =>
  card?.frontContent ||
  card?.frontText ||
  card?.front ||
  card?.question ||
  "Flashcard";


const getBack = (card) =>
  card?.backContent ||
  card?.backText ||
  card?.back ||
  card?.answer ||
  card?.translation ||
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
  deck?.language?.name ||
  deck?.language?.code ||
  deck?.language?.language ||
  deck?.metadata?.language ||
  deck?.metadata?.languageName ||
  deck?.metadata?.languageCode ||
  "";


/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard() {

  const auth = useSelector(
    (state) => state.auth || {}
  );

  const user = auth.user;


  /* =======================================================
     ROLE
  ======================================================= */

  const role = String(
    user?.role ||
    localStorage.getItem("langloop_role") ||
    "LEARNER"
  ).toUpperCase();

  const isLearner = role === "LEARNER";
  const isAdmin = role === "ADMIN";
  const isLinguist = role === "LINGUIST";


  /* =======================================================
     LANGUAGE
  ======================================================= */

  const selectedLanguage = useSelector(
    (state) =>
      state.languages?.selectedLanguage
  );

  const userLang =
    selectedLanguage ||
    getUserLanguage(user) ||
    localStorage.getItem(
      "langloop_learning_language"
    ) ||
    "";

  const learningLanguage = userLang;


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
    progress,
    setProgress,
  ] = useState({
    totalCards: 0,
    masteredCards: 0,
    progressPercentage: 0,
  });

  const [
    dueCards,
    setDueCards,
  ] = useState([]);

  const [
    decks,
    setDecks,
  ] = useState([]);


  /* =======================================================
     LOAD DASHBOARD
  ======================================================= */

  useEffect(() => {

    let mounted = true;


    const loadDashboard = async () => {

      setLoading(true);
      setError("");


      /* ===================================================
         1. LOAD DECKS
      =================================================== */

      let loadedDecks = [];

      try {

        const response = await api.get(
          "/decks"
        );

        const rawDecks = listFrom(
          response?.data,
          [
            "decks",
            "items",
          ]
        );


        const filteredDecks = isLearner
          ? rawDecks.filter((deck) => {

              const deckLanguage =
                getDeckLanguage(deck);

              return (
                !deckLanguage ||
                isSameLanguage(
                  deckLanguage,
                  learningLanguage
                )
              );

            })
          : rawDecks;


        loadedDecks =
          await Promise.all(
            filteredDecks.map(
              async (deck) => {

                try {

                  const cardsResponse =
                    await api.get(
                      `/flashcards/deck/${deck.id}`
                    );

                  const cards =
                    listFrom(
                      cardsResponse?.data,
                      [
                        "cards",
                        "flashcards",
                        "items",
                      ]
                    );

                  return {
                    ...deck,
                    cards,
                  };

                } catch (err) {

                  console.warn(
                    `Failed to load cards for deck ${deck.id}:`,
                    err
                  );

                  return {
                    ...deck,
                    cards: [],
                  };

                }

              }
            )
          );

      } catch (err) {

        console.warn(
          "Dashboard decks request failed:",
          err
        );

      }


      if (!mounted) {
        return;
      }


      /* ===================================================
         2. ALL CARDS
      =================================================== */

      const allCards =
        loadedDecks.flatMap(
          (deck) =>
            deck.cards || []
        );


      const actualTotal =
        allCards.length;


      /* ===================================================
         3. LEARNER-ONLY DATA
         
         IMPORTANT:
         Admin and Linguist DO NOT call:
           /analytics/progress
           /study/due
         
         This prevents learner review statistics from
         appearing in Admin/Linguist dashboards.
      =================================================== */

      if (isLearner) {

        let backendProgress = {
          totalCards: 0,
          masteredCards: 0,
          progressPercentage: 0,
        };


        try {

          backendProgress =
            await getProgress(
              user
            );

        } catch (err) {

          console.warn(
            "Dashboard progress request failed:",
            err
          );

        }


        /* =================================================
           LOCAL MASTERED STATUS
        ================================================= */

        const localMasteredIds =
          getLocalMasteredIds(user);


        const backendTotal =
          Number(
            backendProgress?.totalCards || 0
          );


        const totalCards =
          backendTotal > 0
            ? backendTotal
            : actualTotal;


        const backendMastered =
          Number(
            backendProgress?.masteredCards || 0
          );


        const localMastered =
          localMasteredIds.size;


        const masteredCards =
          Math.min(
            Math.max(
              backendMastered,
              localMastered
            ),
            totalCards
          );


        /* =================================================
           LEARNER DUE CARDS
        ================================================= */

        let backendDueCards = [];

        try {

          backendDueCards =
            await getDueCards(
              user
            );

        } catch (err) {

          console.warn(
            "Dashboard due-card request failed:",
            err
          );

        }


        const localDueIds =
          getLocalDueIds(user);


        const dueMap =
          new Map();


        (
          Array.isArray(
            backendDueCards
          )
            ? backendDueCards
            : []
        ).forEach(
          (card) => {

            const id =
              getCardId(card);

            if (id !== null) {

              dueMap.set(
                String(id),
                card
              );

            }

          }
        );


        allCards.forEach(
          (card) => {

            const id =
              getCardId(card);

            if (
              id !== null &&
              localDueIds.has(
                String(id)
              )
            ) {

              dueMap.set(
                String(id),
                {
                  ...(dueMap.get(
                    String(id)
                  ) || {}),
                  ...card,
                  masteryLevel:
                    "DUE",
                }
              );

            }

          }
        );


        const mergedDueCards =
          Array.from(
            dueMap.values()
          );


        /* =================================================
           LEARNER PROGRESS
        ================================================= */

        let percentage =
          Number(
            backendProgress?.progressPercentage || 0
          );


        if (
          totalCards > 0
        ) {

          const calculated =
            (
              masteredCards /
              totalCards
            ) * 100;


          percentage =
            Math.max(
              percentage,
              calculated
            );

        }


        percentage =
          Math.min(
            Math.max(
              percentage,
              0
            ),
            100
          );


        if (!mounted) {
          return;
        }


        setProgress({
          totalCards,
          masteredCards,
          progressPercentage:
            percentage,
        });


        setDueCards(
          mergedDueCards
        );

      } else {

        /* =================================================
           ADMIN / LINGUIST
           
           Explicitly reset learner-only state.
        ================================================= */

        setProgress({
          totalCards: actualTotal,
          masteredCards: 0,
          progressPercentage: 0,
        });

        setDueCards([]);

      }


      /* ===================================================
         SAVE DECKS
      =================================================== */

      if (mounted) {

        setDecks(
          loadedDecks
        );

        setLoading(false);

      }

    };


    loadDashboard();


    return () => {
      mounted = false;
    };

  }, [
    user,
    role,
    isLearner,
    learningLanguage,
  ]);


  /* =======================================================
     DISPLAY VALUES
  ======================================================= */

  const total =
    progress.totalCards;


  const mastered =
    progress.masteredCards;


  const learning =
    Math.max(
      total - mastered,
      0
    );


  const due =
    dueCards.length;


  const percentage =
    Math.round(
      progress.progressPercentage
    );


  const displayedDecks =
    isLearner
      ? decks.filter((deck) => {

          const deckLanguage =
            getDeckLanguage(deck);

          return (
            !deckLanguage ||
            isSameLanguage(
              deckLanguage,
              userLang
            )
          );

        })
      : decks;


  const totalDecks =
    displayedDecks.length;


  const totalFlashcards =
    displayedDecks.reduce(
      (sum, deck) =>
        sum +
        Number(
          deck.cards?.length || 0
        ),
      0
    );


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {

    return (
      <div className="page-container">

        <div className="dashboard-loading">

          <h1>
            {isLearner
              ? t(
                  "loadingDashboard",
                  userLang
                )
              : "Loading dashboard..."}
          </h1>

        </div>

      </div>
    );

  }


  /* =======================================================
     DASHBOARD
  ======================================================= */

  return (

    <div
      className={
        `page-container role-dashboard role-dashboard-${role.toLowerCase()}`
      }
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="page-header">

        <div>

          <span className="dashboard-label">

            {isLearner
              ? t(
                  "learnerDashboard",
                  userLang
                )
              : isLinguist
              ? "LINGUIST WORKSPACE"
              : "ADMIN DASHBOARD"}

          </span>


          <h1>

            {isLearner
              ? `${t(
                  "welcomeBack",
                  userLang
                )}${
                  user?.username
                    ? `, ${user.username}`
                    : ""
                }`
              : `Welcome back${
                  user?.username
                    ? `, ${user.username}`
                    : ""
                }`}

          </h1>


          <p>

            {isLearner
              ? t(
                  "learningStreakNotice",
                  userLang
                )
              : isLinguist
              ? "Manage and review learning content across available decks."
              : "Manage learning content and monitor platform resources."}

          </p>

        </div>


        {userLang && isLearner && (

          <div className="active-learning-badge">

            <span className="badge-pulse"></span>

            <span>

              {t(
                "learning",
                userLang
              )}:{" "}

              <strong>
                {getLanguageName(
                  userLang
                )}
              </strong>

            </span>

          </div>

        )}

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}


      {/* =================================================
          LEARNER STATS
          
          ONLY LEARNER GETS:
          Mastered
          Learning
          Due for Review
      ================================================= */}

      {isLearner ? (

        <div className="stats-grid">

          {/* TOTAL */}

          <div className="stat-card flashcard-stat">

            <div className="stat-card-top">

              <span className="stat-icon">
                ▤
              </span>

              <span className="stat-title">
                {t(
                  "totalFlashcards",
                  userLang
                )}
              </span>

            </div>


            <h3>
              {t(
                "totalFlashcards",
                userLang
              )}
            </h3>


            <p className="stat-value">
              {total}
            </p>


            <span className="stat-description">
              {t(
                "inActiveStudy",
                userLang
              )}
            </span>

          </div>


          {/* MASTERED */}

          <div className="stat-card mastered-stat">

            <div className="stat-card-top">

              <span className="stat-icon">
                ✓
              </span>

              <span className="stat-title">
                {t(
                  "mastered",
                  userLang
                )}
              </span>

            </div>


            <h3>
              {t(
                "mastered",
                userLang
              )}
            </h3>


            <p className="stat-value">
              {mastered}
            </p>


            <span className="stat-description">
              {t(
                "completedRetention",
                userLang
              )}
            </span>

          </div>


          {/* LEARNING */}

          <div className="stat-card deck-stat">

            <div className="stat-card-top">

              <span className="stat-icon">
                ⚡
              </span>

              <span className="stat-title">
                {t(
                  "learning",
                  userLang
                )}
              </span>

            </div>


            <h3>
              {t(
                "learning",
                userLang
              )}
            </h3>


            <p className="stat-value">
              {learning}
            </p>


            <span className="stat-description">
              {t(
                "inActiveStudy",
                userLang
              )}
            </span>

          </div>


          {/* DUE */}

          <div className="stat-card due-stat">

            <div className="stat-card-top">

              <span className="stat-icon">
                !
              </span>

              <span className="stat-title">
                {t(
                  "dueForReview",
                  userLang
                )}
              </span>

            </div>


            <h3>
              {t(
                "dueCards",
                userLang
              )}
            </h3>


            <p className="stat-value">
              {due}
            </p>


            <span className="stat-description">
              {t(
                "readyForReview",
                userLang
              )}
            </span>

          </div>

        </div>

      ) : (

        /* =================================================
           ADMIN / LINGUIST STATS
           
           NO MASTERED
           NO DUE
           NO REVIEW
        ================================================= */

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


          {/* CONTENT */}

          <div className="stat-card mastered-stat">

            <div className="stat-card-top">

              <span className="stat-icon">
                ✓
              </span>

              <span className="stat-title">
                CONTENT
              </span>

            </div>


            <h3>
              Learning Content
            </h3>


            <p className="stat-value">
              {totalDecks}
            </p>


            <span className="stat-description">
              Active content collections
            </span>

          </div>


          {/* ROLE */}

          <div className="stat-card due-stat">

            <div className="stat-card-top">

              <span className="stat-icon">
                !
              </span>

              <span className="stat-title">
                ROLE
              </span>

            </div>


            <h3>
              {isLinguist
                ? "Linguist"
                : "Admin"}
            </h3>


            <p
              className="stat-value"
              style={{
                fontSize: "22px",
              }}
            >
              {isLinguist
                ? "Content"
                : "Admin"}
            </p>


            <span className="stat-description">
              Current workspace
            </span>

          </div>

        </div>

      )}


      {/* =================================================
          LEARNER PROGRESS
          
          IMPORTANT:
          This entire section is NOT rendered for
          Admin/Linguist.
      ================================================= */}

      {isLearner && (

        <div className="dashboard-section-card">

          <div className="section-head">

            <div>

              <span className="dashboard-label">
                {t(
                  "learningGoal",
                  userLang
                )}
              </span>


              <h3>
                {t(
                  "learningProgress",
                  userLang
                )}
              </h3>


              <p>
                {t(
                  "progressGoalNotice",
                  userLang
                )}
              </p>

            </div>


            <Link
              to="/progress"
              className="secondary-button"
            >
              {t(
                "viewProgress",
                userLang
              )}
            </Link>

          </div>


          <div className="dashboard-progress-wrapper">

            <div className="dashboard-progress-info">

              <strong>
                {percentage}%
              </strong>

              <span>
                {mastered} of {total}{" "}
                {t(
                  "masteredCards",
                  userLang
                )}
              </span>

            </div>


            <div className="dashboard-progress-bar">

              <div
                className="dashboard-progress-fill"
                style={{
                  width:
                    `${percentage}%`,
                }}
              />

            </div>


            <div className="progress-footer">

              <span>
                {t(
                  "continueLearning",
                  userLang
                )}
              </span>

              <span>
                {percentage}%{" "}
                {t(
                  "completed",
                  userLang
                )}
              </span>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          LEARNER REVIEW QUEUE
          
          IMPORTANT:
          Admin/Linguist NEVER see this.
      ================================================= */}

      {isLearner && (

        <div
          className="dashboard-section-card"
          style={{
            marginTop: "32px",
          }}
        >

          <div className="section-head">

            <div>

              <span className="dashboard-label">
                {t(
                  "spacedRepetition",
                  userLang
                )}
              </span>


              <h3>
                {t(
                  "reviewQueue",
                  userLang
                )}
              </h3>


              <p>
                {t(
                  "reviewNotice",
                  userLang
                )}
              </p>

            </div>


            {due > 0 && (

              <Link
                to="/study?review=true"
                className="primary-button"
              >
                {t(
                  "startReview",
                  userLang
                )}
              </Link>

            )}

          </div>


          {due === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                ✓
              </div>


              <h4>
                {t(
                  "allCaughtUp",
                  userLang
                )}
              </h4>


              <p>
                {t(
                  "noCardsWaiting",
                  userLang
                )}
              </p>


              <Link
                to="/study"
                className="secondary-button"
              >
                {t(
                  "practiceLearningCards",
                  userLang
                )}
              </Link>

            </div>

          ) : (

            <div className="dashboard-due-grid">

              {dueCards
                .slice(0, 6)
                .map(
                  (
                    card,
                    index
                  ) => {

                    const id =
                      getCardId(
                        card
                      );


                    return (

                      <div
                        className="dashboard-due-card"
                        key={
                          id ??
                          `${getFront(
                            card
                          )}-${index}`
                        }
                      >

                        <div className="due-card-header">

                          <span className="due-card-label">
                            {t(
                              "dueCards",
                              userLang
                            )}
                          </span>


                          <span className="due-card-icon">
                            !
                          </span>

                        </div>


                        <h4>
                          {getFront(
                            card
                          )}
                        </h4>


                        <p>
                          {getBack(
                            card
                          )}
                        </p>


                        <Link
                          to={
                            id !== null
                              ? `/study?review=true&cardId=${encodeURIComponent(
                                  id
                                )}`
                              : "/study?review=true"
                          }
                          className="secondary-button"
                        >
                          {t(
                            "practice",
                            userLang
                          )}
                        </Link>

                      </div>

                    );

                  }
                )}

            </div>

          )}

        </div>

      )}


      {/* =================================================
          DECKS
          
          ALL ROLES CAN SEE THEIR AVAILABLE DECKS.
      ================================================= */}

      <div
        className="dashboard-section-card"
        style={{
          marginTop: "32px",
        }}
      >

        <div className="section-head">

          <div>

            <span className="dashboard-label">

              {isLearner
                ? t(
                    "learningCollections",
                    userLang
                  )
                : "CONTENT"}

            </span>


            <h3>

              {isLearner
                ? t(
                    "studyDecks",
                    userLang
                  )
                : isLinguist
                ? "Content Decks"
                : "Platform Decks"}

            </h3>


            <p>

              {isLearner
                ? t(
                    "continueLearning",
                    userLang
                  )
                : "Available learning content and decks."}

            </p>

          </div>


          <Link
            to="/decks"
            className="secondary-button"
          >
            {isLearner
              ? t(
                  "viewDecks",
                  userLang
                )
              : "View Decks"}
          </Link>

        </div>


        {displayedDecks.length === 0 ? (

          <div className="empty-state">

            <p>

              {isLearner
                ? t(
                    "noDecksFound",
                    userLang
                  )
                : "No study decks available."}

            </p>

          </div>

        ) : (

          <div className="dashboard-deck-grid">

            {displayedDecks
              .slice(0, 6)
              .map(
                (deck) => {

                  const cardCount =
                    Number(
                      deck.cards?.length ||
                      0
                    );


                  return (

                    <div
                      className="dashboard-deck-card"
                      key={deck.id}
                    >

                      <span className="deck-tag">

                        {getLanguageName(
                          deck.language ||
                          userLang
                        )}

                      </span>


                      <h4>
                        {deck.title}
                      </h4>


                      <p>

                        {deck.description ||
                          (
                            isLearner
                              ? t(
                                  "continueLearning",
                                  userLang
                                )
                              : "Learning content deck."
                          )}

                      </p>


                      <div className="deck-card-footer">

                        <span>

                          {cardCount}{" "}

                          {isLearner
                            ? t(
                                "cards",
                                userLang
                              )
                            : "cards"}

                        </span>


                        <Link
                          to={
                            `/study?deckId=${deck.id}`
                          }
                          className="primary-button"
                        >
                          {isLearner
                            ? t(
                                "study",
                                userLang
                              )
                            : "View Deck"}
                        </Link>

                      </div>

                    </div>

                  );

                }
              )}

          </div>

        )}

      </div>


      {/* =================================================
          QUICK ACTIONS
      ================================================= */}

      <div
        className="quick-actions-section"
        style={{
          marginTop: "32px",
        }}
      >

        <div className="section-head">

          <div>

            <span className="dashboard-label">

              {isLearner
                ? t(
                    "quickActions",
                    userLang
                  )
                : "QUICK ACTIONS"}

            </span>


            <h3>

              {isLearner
                ? t(
                    "keepLearning",
                    userLang
                  )
                : "Content Actions"}

            </h3>

          </div>

        </div>


        <div className="quick-actions-grid">

          {isLearner && (

            <Link
              to="/study"
              className="quick-action-card"
            >

              <span className="quick-action-icon">
                ▶
              </span>


              <div>

                <strong>
                  {t(
                    "studyNow",
                    userLang
                  )}
                </strong>


                <span>
                  {t(
                    "startLearningSession",
                    userLang
                  )}
                </span>

              </div>

            </Link>

          )}


          <Link
            to="/decks"
            className="quick-action-card"
          >

            <span className="quick-action-icon">
              ▣
            </span>


            <div>

              <strong>
                {isLearner
                  ? t(
                      "viewDecks",
                      userLang
                    )
                  : "View Decks"}
              </strong>


              <span>
                {isLearner
                  ? t(
                      "continueLearning",
                      userLang
                    )
                  : "Manage available learning content."}
              </span>

            </div>

          </Link>


          {isLearner && (

            <Link
              to="/mastery"
              className="quick-action-card"
            >

              <span className="quick-action-icon">
                ★
              </span>


              <div>

                <strong>
                  {t(
                    "checkMastery",
                    userLang
                  )}
                </strong>


                <span>
                  {t(
                    "seeFlashcardMastery",
                    userLang
                  )}
                </span>

              </div>

            </Link>

          )}


          {isLearner && (

            <Link
              to="/progress"
              className="quick-action-card"
            >

              <span className="quick-action-icon">
                ↗
              </span>


              <div>

                <strong>
                  {t(
                    "viewProgress",
                    userLang
                  )}
                </strong>


                <span>
                  {t(
                    "trackLearningAnalytics",
                    userLang
                  )}
                </span>

              </div>

            </Link>

          )}

        </div>

      </div>

    </div>

  );
}


export default Dashboard;