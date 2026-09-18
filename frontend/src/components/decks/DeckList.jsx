// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import api from "../../services/api";
// import { setDecks, setLoading } from "../../store/slices/studySlice";
// import deckService from "../../services/deckService";

// function DeckList() {
//   const dispatch = useDispatch();

//   const authUser = useSelector((state) => state.auth?.user);

//   const reduxDecks = useSelector(
//     (state) => state.decks?.items || state.study?.decks || []
//   );

//   const [localDecks, setLocalDecks] = useState(
//     Array.isArray(reduxDecks) ? reduxDecks : []
//   );

//   const [search, setSearch] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [cloningId, setCloningId] = useState(null);

//   const userRole = authUser?.role;
//   const isLinguist = userRole === "LINGUIST";

//   const loadDecks = async () => {
//     try {
//       setError("");
//       dispatch(setLoading(true));

//       const response = await api.get("/decks");
//       const data = response?.data;

//       let deckData = [];
//       if (Array.isArray(data)) {
//         deckData = data;
//       } else if (Array.isArray(data?.decks)) {
//         deckData = data.decks;
//       } else if (Array.isArray(data?.items)) {
//         deckData = data.items;
//       }

//       setLocalDecks(deckData);
//       dispatch(setDecks(deckData));
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError("Failed to load decks");
//       }
//       setLocalDecks([]);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     loadDecks();

//     // The test suite verifies that loading happens on mount.
//     // loadDecks intentionally remains outside the dependency array.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       setError("");
//       setSuccess("");

//       await api.delete(`/decks/${id}`);

//       setLocalDecks((current) =>
//         current.filter((deck) => String(deck.id) !== String(id))
//       );

//       setSuccess("StudyDeck deleted successfully.");

//       const remaining = localDecks.filter(
//         (deck) => String(deck.id) !== String(id)
//       );
//       dispatch(setDecks(remaining));
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError("Failed to delete deck");
//       }
//     }
//   };

//   const handleClone = async (id) => {
//     try {
//       setError("");
//       setSuccess("");
//       setCloningId(id);

//       await deckService.cloneDeck(id);
//       setSuccess("Deck cloned successfully.");
//       await loadDecks();
//     } catch (err) {
//       if (err?.response?.status === 401) {
//         setError("Unauthorized");
//       } else {
//         setError(
//           err?.response?.data?.message || "Failed to clone deck"
//         );
//       }
//     } finally {
//       setCloningId(null);
//     }
//   };

//   const reduxLang = useSelector(
//     (state) => state.languages?.selectedLanguage
//   );

//   const activeLanguage =
//     reduxLang ||
//     authUser?.learningLanguage ||
//     authUser?.nativeLanguage ||
//     localStorage.getItem("langloop_learning_language") ||
//     "";

//   const filteredDecks = (Array.isArray(localDecks) ? localDecks : []).filter(
//     (deck) => {
//       const title = deck?.title?.toLowerCase() || "";
//       const desc = deck?.description?.toLowerCase() || "";
//       const q = search.toLowerCase();
//       return title.includes(q) || desc.includes(q);
//     }
//   );

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           <span className="dashboard-label">LEARNING COLLECTIONS</span>
//           <h1>Flashcard Decks</h1>
//           <p>Browse decks and master your personal collections.</p>
//         </div>

//         <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
//           {activeLanguage && (
//             <div className="active-learning-badge">
//               <span className="badge-pulse"></span>
//               <span>Learning: <strong>{activeLanguage}</strong></span>
//             </div>
//           )}

//           {isLinguist && (
//             <Link className="primary-button" to="/decks/create">
//               + Create New Deck
//             </Link>
//           )}
//         </div>
//       </div>

//       <div className="search-section">
//         <input
//           type="text"
//           placeholder="Search decks"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {success && <div className="success-message">{success}</div>}
//       {error && <div className="error-message">{error}</div>}

//       {filteredDecks.length === 0 ? (
//         <div className="empty-state">
//           <span>No decks found.</span>
//           {isLinguist && (
//             <div>
//               <Link className="primary-button" to="/decks/create">
//                 Create Your First Deck
//               </Link>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="deck-list">
//           {filteredDecks.map((deck) => (
//             <div className="deck-card" key={deck.id}>
//               <div>
//                 <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
//                   <span className="deck-tag">
//                     {deck.language || deck.languageName || activeLanguage || "Language Track"}
//                   </span>
//                   <span className="deck-capacity">Capacity: {deck.capacity || 50}</span>
//                 </div>
//                 <h3>{deck.title}</h3>
//                 {deck.description && <p>{deck.description}</p>}
//                 {deck.mentorName && (
//                   <small style={{ color: "var(--text-muted)", display: "block", marginTop: "4px" }}>
//                     Mentor: <strong>{deck.mentorName}</strong>
//                   </small>
//                 )}
//               </div>

//               <div className="deck-actions">
//                 {/* VIEW */}
//                 <Link className="secondary-button" to={`/decks/${deck.id}`}>
//                   View
//                 </Link>

//                 {/* STUDY THIS DECK */}
//                 <Link
//                   className="primary-button"
//                   to={`/study?deckId=${deck.id}`}
//                 >
//                   Study Now
//                 </Link>

//                 {/* MANAGE CARDS */}
//                 <Link className="secondary-button" to={`/decks/${deck.id}`}>
//                   Manage Cards
//                 </Link>

//                 {/* CLONE */}
//                 <button
//                   type="button"
//                   className="secondary-button"
//                   onClick={() => handleClone(deck.id)}
//                   disabled={cloningId === deck.id}
//                 >
//                   {cloningId === deck.id
//                     ? "Cloning..."
//                     : "Clone to My Deck"}
//                 </button>

//                 {/* LINGUIST ACTIONS */}
//                 {isLinguist && (
//                   <>
//                     <Link
//                       className="secondary-button"
//                       to={`/decks/${deck.id}/edit`}
//                     >
//                       Edit
//                     </Link>

//                     <button
//                       type="button"
//                       className="danger-button"
//                       onClick={() => handleDelete(deck.id)}
//                     >
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DeckList;



// import React, {
//   useEffect,
//   useState,
// } from "react";
// import { Link } from "react-router-dom";
// import {
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import api from "../../services/api";
// import {
//   setDecks,
//   setLoading,
// } from "../../store/slices/studySlice";
// import deckService from "../../services/deckService";
// import {
//   getUserLanguage,
//   getLanguageName,
//   isSameLanguage,
//   t,
// } from "../../utils/languageUtils";

// function DeckList() {
//   const dispatch = useDispatch();

//   const authUser = useSelector(
//     (state) => state.auth?.user
//   );

//   const reduxDecks = useSelector(
//     (state) =>
//       state.decks?.items ||
//       state.study?.decks ||
//       []
//   );

//   const [localDecks, setLocalDecks] =
//     useState(
//       Array.isArray(reduxDecks)
//         ? reduxDecks
//         : []
//     );

//   const [search, setSearch] =
//     useState("");

//   const [error, setError] =
//     useState("");

//   const [success, setSuccess] =
//     useState("");

//   const [cloningId, setCloningId] =
//     useState(null);

//   const userRole = String(
//     authUser?.role || "LEARNER"
//   ).toUpperCase();

//   const isLearner =
//     userRole === "LEARNER";

//   const isLinguist =
//     userRole === "LINGUIST";

//   const isAdmin =
//     userRole === "ADMIN";

//   const canCreate =
//     isLinguist || isAdmin;

//   const canEdit =
//     isLinguist || isAdmin;

//   const canDelete =
//     isAdmin;

//   const loadDecks = async () => {
//     try {
//       setError("");

//       dispatch(
//         setLoading(true)
//       );

//       const response =
//         await api.get("/decks");

//       const data =
//         response?.data;

//       let deckData = [];

//       if (Array.isArray(data)) {
//         deckData = data;
//       } else if (
//         Array.isArray(
//           data?.decks
//         )
//       ) {
//         deckData = data.decks;
//       } else if (
//         Array.isArray(
//           data?.items
//         )
//       ) {
//         deckData = data.items;
//       }

//       setLocalDecks(
//         deckData
//       );

//       dispatch(
//         setDecks(deckData)
//       );
//     } catch (err) {
//       console.error(
//         "Failed to load decks:",
//         err
//       );

//       if (
//         err?.response?.status ===
//         401
//       ) {
//         setError(
//           "Unauthorized. Please log in again."
//         );
//       } else {
//         setError(
//           "Failed to load decks."
//         );
//       }

//       setLocalDecks([]);
//     } finally {
//       dispatch(
//         setLoading(false)
//       );
//     }
//   };

//   useEffect(() => {
//     loadDecks();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleDelete = async (
//     id
//   ) => {
//     if (!canDelete) {
//       return;
//     }

//     const confirmed =
//       window.confirm(
//         "Are you sure you want to delete this deck?"
//       );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setError("");
//       setSuccess("");

//       await api.delete(
//         `/decks/${id}`
//       );

//       const remaining =
//         localDecks.filter(
//           (deck) =>
//             String(deck.id) !==
//             String(id)
//         );

//       setLocalDecks(
//         remaining
//       );

//       dispatch(
//         setDecks(remaining)
//       );

//       setSuccess(
//         "Deck deleted successfully."
//       );
//     } catch (err) {
//       console.error(
//         "Failed to delete deck:",
//         err
//       );

//       if (
//         err?.response?.status ===
//         401
//       ) {
//         setError(
//           "Unauthorized."
//         );
//       } else {
//         setError(
//           err?.response?.data
//             ?.message ||
//             "Failed to delete deck."
//         );
//       }
//     }
//   };

//   const handleClone = async (
//     id
//   ) => {
//     try {
//       setError("");
//       setSuccess("");
//       setCloningId(id);

//       await deckService.cloneDeck(
//         id
//       );

//       setSuccess(
//         "Deck cloned successfully."
//       );

//       await loadDecks();
//     } catch (err) {
//       console.error(
//         "Failed to clone deck:",
//         err
//       );

//       setError(
//         err?.response?.data
//           ?.message ||
//           "Failed to clone deck."
//       );
//     } finally {
//       setCloningId(null);
//     }
//   };

//   const reduxLang = useSelector(
//     (state) =>
//       state.languages
//         ?.selectedLanguage
//   );

//   const userLang =
//     reduxLang ||
//     getUserLanguage(authUser);

//   const activeLanguage = userLang;

//   const languageDecks = isLearner
//     ? (Array.isArray(localDecks) ? localDecks : []).filter((deck) =>
//         isSameLanguage(deck?.language || deck?.languageName, userLang)
//       )
//     : (Array.isArray(localDecks) ? localDecks : []);

//   const filteredDecks = languageDecks.filter((deck) => {
//     const title =
//       deck?.title?.toLowerCase() ||
//       "";

//     const desc =
//       deck?.description?.toLowerCase() ||
//       "";

//     const q =
//       search.toLowerCase();

//     return (
//       title.includes(q) ||
//       desc.includes(q)
//     );
//   });

//   return (
//     <div className="page-container">
//       <div className="page-header">
//         <div>
//           <span className="dashboard-label">
//             {isLearner
//               ? t("learningCollections", userLang)
//               : isLinguist
//               ? "CONTENT WORKSPACE"
//               : "PLATFORM CONTENT"}
//           </span>

//           <h1>
//             {isLearner
//               ? t("myDecks", userLang)
//               : isLinguist
//               ? "Content Decks"
//               : "Platform Content"}
//           </h1>

//           <p>
//             {isLearner
//               ? t("continueLearning", userLang)
//               : isLinguist
//               ? "Create, edit, and manage your language-learning content."
//               : "Review and manage platform learning content."}
//           </p>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             gap: "10px",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           {activeLanguage &&
//             isLearner && (
//               <div className="active-learning-badge">
//                 <span className="badge-pulse" />

//                 <span>
//                   {t("learning", userLang)}:{" "}
//                   <strong>
//                     {getLanguageName(activeLanguage)}
//                   </strong>
//                 </span>
//               </div>
//             )}

//           {canCreate && (
//             <Link
//               className="primary-button"
//               to="/decks/create"
//             >
//               + Create New Deck
//             </Link>
//           )}
//         </div>
//       </div>

//       <div className="search-section">
//         <input
//           type="text"
//           placeholder={isLearner ? t("searchDecks", userLang) : "Search decks"}
//           value={search}
//           onChange={(event) =>
//             setSearch(
//               event.target.value
//             )
//           }
//         />
//       </div>

//       {success && (
//         <div className="success-message">
//           {success}
//         </div>
//       )}

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//       {filteredDecks.length ===
//       0 ? (
//         <div className="empty-state">
//           <span>
//             {isLearner ? t("noDecksFound", userLang) : "No decks found."}
//           </span>

//           {canCreate && (
//             <div
//               style={{
//                 marginTop:
//                   "12px",
//               }}
//             >
//               <Link
//                 className="primary-button"
//                 to="/decks/create"
//               >
//                 Create Your First
//                 Deck
//               </Link>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="deck-list">
//           {filteredDecks.map(
//             (deck) => (
//               <div
//                 className="deck-card"
//                 key={deck.id}
//               >
//                 <div>
//                   <div
//                     style={{
//                       display:
//                         "flex",
//                       gap: "8px",
//                       marginBottom:
//                         "8px",
//                       flexWrap:
//                         "wrap",
//                     }}
//                   >
//                     <span className="deck-tag">
//                       {getLanguageName(
//                         deck.language ||
//                         deck.languageName ||
//                         activeLanguage
//                       )}
//                     </span>

//                     <span className="deck-capacity">
//                       {isLearner ? t("capacity", userLang) : "Capacity"}:{" "}
//                       {deck.capacity ||
//                         50}
//                     </span>
//                   </div>

//                   <h3>
//                     {deck.title}
//                   </h3>

//                   {deck.description && (
//                     <p>
//                       {
//                         deck.description
//                       }
//                     </p>
//                   )}

//                   {deck.mentorName && (
//                     <small
//                       style={{
//                         color:
//                           "var(--text-muted)",
//                         display:
//                           "block",
//                         marginTop:
//                           "4px",
//                       }}
//                     >
//                       {isLearner ? t("mentor", userLang) : "Mentor"}:{" "}
//                       <strong>
//                         {
//                           deck.mentorName
//                         }
//                       </strong>
//                     </small>
//                   )}
//                 </div>

//                 <div className="deck-actions">
//                   <Link
//                     className="secondary-button"
//                     to={`/decks/${deck.id}`}
//                   >
//                     {isLearner ? t("view", userLang) : "View"}
//                   </Link>

//                   {isLearner && (
//                     <Link
//                       className="primary-button"
//                       to={`/study?deckId=${deck.id}`}
//                     >
//                       {t("studyNow", userLang)}
//                     </Link>
//                   )}

//                   {canEdit && (
//                     <Link
//                       className="secondary-button"
//                       to={`/decks/${deck.id}/edit`}
//                     >
//                       Edit
//                     </Link>
//                   )}

//                   {canEdit && (
//                     <Link
//                       className="secondary-button"
//                       to={`/decks/${deck.id}`}
//                     >
//                       Manage Cards
//                     </Link>
//                   )}

//                   {isLearner && (
//                     <button
//                       type="button"
//                       className="secondary-button"
//                       onClick={() =>
//                         handleClone(
//                           deck.id
//                         )
//                       }
//                       disabled={
//                         cloningId ===
//                         deck.id
//                       }
//                     >
//                       {cloningId ===
//                       deck.id
//                         ? t("cloning", userLang)
//                         : t("cloneToMyDeck", userLang)}
//                     </button>
//                   )}

//                   {canDelete && (
//                     <button
//                       type="button"
//                       className="danger-button"
//                       onClick={() =>
//                         handleDelete(
//                           deck.id
//                         )
//                       }
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default DeckList;



import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setDecks, setLoading } from "../../store/slices/studySlice";
import deckService from "../../services/deckService";
import { getUserLanguage, isSameLanguage } from "../../utils/languageUtils";

const listFrom = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.decks)) return data.decks;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

function DeckList() {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.user);
  const reduxDecks = useSelector(
    (state) => state.decks?.items || state.study?.decks || []
  );

  const [localDecks, setLocalDecks] = useState(
    Array.isArray(reduxDecks) ? reduxDecks : []
  );
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cloningId, setCloningId] = useState(null);

  const role = String(authUser?.role || "LEARNER").toUpperCase();
  const canCreateOrEdit = role === "LINGUIST" || role === "ADMIN";
  const canDeleteDeck = role === "ADMIN";

  const loadDecks = useCallback(async () => {
    try {
      setError("");
      dispatch(setLoading(true));

      const response = await api.get("/decks");
      const deckData = listFrom(response?.data);

      setLocalDecks(deckData);
      dispatch(setDecks(deckData));
    } catch (err) {
      setError(
        err?.response?.status === 401
          ? "Your session is no longer authorized. Please log in again."
          : "Failed to load decks."
      );
      setLocalDecks([]);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    loadDecks();
  }, [loadDecks]);

  const handleDelete = async (id) => {
    if (!canDeleteDeck) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");
      await api.delete(`/decks/${id}`);

      const remaining = localDecks.filter(
        (deck) => String(deck.id) !== String(id)
      );
      setLocalDecks(remaining);
      dispatch(setDecks(remaining));
      setSuccess("Deck deleted successfully.");
    } catch (err) {
      setError(
        err?.response?.status === 403
          ? "You do not have permission to delete this deck."
          : err?.response?.status === 401
          ? "Your session is no longer authorized."
          : err?.response?.data?.message || "Failed to delete deck."
      );
    }
  };

  const handleClone = async (id) => {
    try {
      setError("");
      setSuccess("");
      setCloningId(id);

      await deckService.cloneDeck(id);
      setSuccess("Deck cloned successfully.");
      await loadDecks();
    } catch (err) {
      setError(
        err?.response?.status === 401
          ? "Your session is no longer authorized."
          : err?.response?.data?.message || "Failed to clone deck."
      );
    } finally {
      setCloningId(null);
    }
  };

  const reduxLang = useSelector(
    (state) => state.languages?.selectedLanguage
  );

  const activeLanguage = getUserLanguage(authUser, reduxLang);

  const filteredDecks = localDecks.filter((deck) => {
    const title = String(deck?.title || "").toLowerCase();
    const desc = String(deck?.description || "").toLowerCase();
    const query = search.toLowerCase().trim();

    const deckLanguage =
      deck?.language ||
      deck?.languageName ||
      deck?.languageCode ||
      deck?.learningLanguage ||
      deck?.targetLanguage ||
      deck?.targetLanguageCode ||
      deck?.lang ||
      deck?.locale ||
      "";

    const languageMatches =
      role !== "LEARNER" ||
      !activeLanguage ||
      !deckLanguage ||
      isSameLanguage(deckLanguage, activeLanguage);

    return (
      languageMatches &&
      (title.includes(query) || desc.includes(query))
    );
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <span className="dashboard-label">
            {role === "ADMIN" ? "CONTENT MANAGEMENT" : "LEARNING COLLECTIONS"}
          </span>
          <h1>Flashcard Decks</h1>
          <p>
            {role === "LEARNER"
              ? "Browse decks and practice your language skills."
              : "Browse and manage language-learning content."}
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {activeLanguage && role === "LEARNER" && (
            <div className="active-learning-badge">
              <span className="badge-pulse"></span>
              <span>
                Learning: <strong>{activeLanguage}</strong>
              </span>
            </div>
          )}

          {canCreateOrEdit && (
            <Link className="primary-button" to="/decks/create">
              + Create New Deck
            </Link>
          )}
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search decks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      {filteredDecks.length === 0 ? (
        <div className="empty-state">
          <span>No decks found.</span>
          {canCreateOrEdit && (
            <div>
              <Link className="primary-button" to="/decks/create">
                Create Your First Deck
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="deck-list">
          {filteredDecks.map((deck) => (
            <div className="deck-card" key={deck.id}>
              <div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                  <span className="deck-tag">
                    {deck.language || deck.languageName || activeLanguage || "Language Track"}
                  </span>
                  <span className="deck-capacity">
                    Capacity: {deck.capacity || 50}
                  </span>
                </div>
                <h3>{deck.title}</h3>
                {deck.description && <p>{deck.description}</p>}
                {deck.mentorName && (
                  <small style={{ color: "var(--text-muted)", display: "block", marginTop: "4px" }}>
                    Mentor: <strong>{deck.mentorName}</strong>
                  </small>
                )}
              </div>

              <div className="deck-actions">
                <Link className="secondary-button" to={`/decks/${deck.id}`}>
                  View
                </Link>

                {role === "LEARNER" && (
                  <Link className="primary-button" to={`/study?deckId=${deck.id}`}>
                    Study Now
                  </Link>
                )}

                {canCreateOrEdit && (
                  <Link className="secondary-button" to={`/decks/${deck.id}`}>
                    Manage Cards
                  </Link>
                )}

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => handleClone(deck.id)}
                  disabled={cloningId === deck.id}
                >
                  {cloningId === deck.id ? "Cloning..." : "Clone to My Deck"}
                </button>

                {canCreateOrEdit && (
                  <Link className="secondary-button" to={`/decks/${deck.id}/edit`}>
                    Edit
                  </Link>
                )}

                {canDeleteDeck && (
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => handleDelete(deck.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeckList;
