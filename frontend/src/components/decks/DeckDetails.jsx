// import React, { useCallback, useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import deckService from "../../services/deckService";
// import api from "../../services/api";

// function DeckDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const auth = useSelector((state) => state.auth || {});
//   const user = auth.user;

//   const reduxLang = useSelector(
//     (state) => state.languages?.selectedLanguage
//   );

//   const activeLanguage =
//     reduxLang ||
//     user?.learningLanguage ||
//     user?.nativeLanguage ||
//     localStorage.getItem("langloop_learning_language") ||
//     "";

//   const [deck, setDeck] = useState(null);
//   const [flashcards, setFlashcards] = useState([]);

//   const [front, setFront] = useState("");
//   const [back, setBack] = useState("");
//   const [pronunciation, setPronunciation] = useState("");
//   const [exampleSentence, setExampleSentence] = useState("");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);

//   const loadDeck = useCallback(async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const deckResponse = await deckService.getDeckById(id);
//       setDeck(deckResponse?.data || null);

//       const cardResponse = await api.get(`/flashcards/deck/${id}`);
//       setFlashcards(
//         Array.isArray(cardResponse?.data) ? cardResponse.data : []
//       );
//     } catch (err) {
//       setDeck(null);
//       setFlashcards([]);
//       setError("Failed to load deck details");
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     loadDeck();
//   }, [loadDeck]);

//   const handleAddFlashcard = async (event) => {
//     event.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!front.trim() || !back.trim()) {
//       setError("Front and Back are required.");
//       return;
//     }

//     try {
//       await api.post(`/decks/${id}/cards`, {
//         frontText: front,
//         backText: back,
//         pronunciation: pronunciation,
//         exampleSentence: exampleSentence,
//         deckId: Number(id),
//         orderIndex: flashcards.length + 1,
//       });

//       setSuccess("Flashcard added successfully.");
//       setFront("");
//       setBack("");
//       setPronunciation("");
//       setExampleSentence("");

//       await loadDeck();
//     } catch (err) {
//       setError(
//         err?.response?.data?.message || "Unable to add flashcard."
//       );
//     }
//   };

//   const handleDeleteFlashcard = async (flashcardId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this flashcard?"
//     );
//     if (!confirmed) {
//       return;
//     }

//     try {
//       await api.delete(`/flashcards/${flashcardId}`);
//       setSuccess("Flashcard deleted successfully.");
//       await loadDeck();
//     } catch (err) {
//       setError("Unable to delete flashcard.");
//     }
//   };

//   const handleDeleteDeck = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this deck?"
//     );
//     if (!confirmed) {
//       return;
//     }

//     try {
//       await deckService.deleteDeck(id);
//       alert("StudyDeck deleted successfully.");
//       navigate("/decks");
//     } catch (err) {
//       setError("Unable to delete deck.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="page-container">
//         <div className="dashboard-loading">Loading deck...</div>
//       </div>
//     );
//   }

//   if (error && !deck) {
//     return (
//       <div className="page-container">
//         <div className="error-message">{error}</div>
//       </div>
//     );
//   }

//   if (!deck) {
//     return (
//       <div className="page-container">
//         <div className="error-message">Failed to load deck details</div>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <Link to="/decks" className="back-link">
//         ← Back to Decks
//       </Link>

//       {/* DECK HEADER */}
//       <div className="deck-detail-header">
//         <div>
//           <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
//             <span className="deck-tag">
//               {deck.language || deck.languageName || activeLanguage || "Language Track"}
//             </span>
//             <span className="deck-capacity">Capacity: {deck.capacity || 50}</span>
//             {deck.mentorName && (
//               <span className="deck-mentor-tag">Mentor: {deck.mentorName}</span>
//             )}
//           </div>
//           <h1>{deck.title}</h1>
//           <p>{deck.description || "No description provided."}</p>
//         </div>

//         <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
//           {flashcards.length > 0 && (
//             <Link to={`/study?deckId=${id}`} className="primary-button">
//               Study Deck ({flashcards.length})
//             </Link>
//           )}

//           <button
//             type="button"
//             onClick={handleDeleteDeck}
//             className="danger-button"
//           >
//             Delete Deck
//           </button>
//         </div>
//       </div>

//       {/* FLASHCARDS LIST */}
//       <section>
//         <h2>Current Flashcards ({flashcards.length})</h2>

//         {success && <div className="success-message">{success}</div>}
//         {error && <p className="error-message">{error}</p>}

//         <div className="flashcard-list">
//           {flashcards.length === 0 ? (
//             <div className="empty-state">
//               <p>No flashcards available.</p>
//             </div>
//           ) : (
//             flashcards.map((card) => (
//               <div className="flashcard-row" key={card.id}>
//                 <div>
//                   <strong>Front</strong>
//                   <p>
//                     {card.frontText ||
//                       card.frontContent ||
//                       card.front ||
//                       "-"}
//                   </p>
//                 </div>

//                 <div>
//                   <strong>Back</strong>
//                   <p>
//                     {card.backText ||
//                       card.backContent ||
//                       card.back ||
//                       "-"}
//                   </p>
//                 </div>

//                 <div>
//                   <strong>Status</strong>
//                   <p>{card.status || "LEARNING"}</p>
//                 </div>

//                 <div>
//                   <strong>Pronunciation</strong>
//                   <p>{card.pronunciation || "-"}</p>
//                 </div>

//                 <div>
//                   <strong>Example Sentence</strong>
//                   <p>{card.exampleSentence || "-"}</p>
//                 </div>

//                 <button
//                   type="button"
//                   className="danger-button"
//                   onClick={() => handleDeleteFlashcard(card.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       {/* ADD FLASHCARD */}
//       <section className="form-card">
//         <h2>Add New Flashcard</h2>

//         {success && <div className="success-message">{success}</div>}

//         <form onSubmit={handleAddFlashcard}>
//           <label htmlFor="front">Front (Source)</label>
//           <input
//             id="front"
//             name="front"
//             type="text"
//             placeholder="e.g., Hello"
//             value={front}
//             onChange={(e) => setFront(e.target.value)}
//           />

//           <label htmlFor="back">Back (Translation)</label>
//           <input
//             id="back"
//             name="back"
//             type="text"
//             placeholder="e.g., Hola"
//             value={back}
//             onChange={(e) => setBack(e.target.value)}
//           />

//           <label htmlFor="pronunciation">Pronunciation (Optional)</label>
//           <input
//             id="pronunciation"
//             name="pronunciation"
//             type="text"
//             placeholder="e.g., həˈləʊ"
//             value={pronunciation}
//             onChange={(e) => setPronunciation(e.target.value)}
//           />

//           <label htmlFor="exampleSentence">Example Sentence (Optional)</label>
//           <input
//             id="exampleSentence"
//             name="exampleSentence"
//             type="text"
//             placeholder="e.g., This is a sample sentence"
//             value={exampleSentence}
//             onChange={(e) => setExampleSentence(e.target.value)}
//           />

//           {error && <p className="error-message">{error}</p>}

//           <button type="submit" className="primary-button">
//             + Add to Deck
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

// export default DeckDetails;


import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

import deckService from "../../services/deckService";
import api from "../../services/api";

function unwrapList(data, keys = []) {
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
}

function DeckDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const auth = useSelector(
    (state) => state.auth || {}
  );

  const user = auth.user;

  const role = String(
    user?.role || "LEARNER"
  ).toUpperCase();

  const isLearner =
    role === "LEARNER";

  const canEdit =
    role === "LINGUIST" ||
    role === "ADMIN";

  const canDelete =
    role === "ADMIN";

  const canManageCards =
    role === "LINGUIST" ||
    role === "ADMIN";

  const reduxLang = useSelector(
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

  const [deck, setDeck] =
    useState(null);

  const [flashcards, setFlashcards] =
    useState([]);

  const [front, setFront] =
    useState("");

  const [back, setBack] =
    useState("");

  const [pronunciation, setPronunciation] =
    useState("");

  const [exampleSentence, setExampleSentence] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const loadDeck =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        const deckResponse =
          await deckService.getDeckById(
            id
          );

        const deckData =
          deckResponse?.data;

        setDeck(
          deckData || null
        );

        const cardResponse =
          await api.get(
            `/flashcards/deck/${id}`
          );

        setFlashcards(
          unwrapList(
            cardResponse.data,
            [
              "cards",
              "flashcards",
              "items",
            ]
          )
        );
      } catch (err) {
        console.error(
          "Failed to load deck details:",
          err
        );

        setDeck(null);
        setFlashcards([]);

        setError(
          err?.response?.data
            ?.message ||
            "Failed to load deck details."
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    loadDeck();
  }, [loadDeck]);

  const handleAddFlashcard =
    async (event) => {
      event.preventDefault();

      if (!canManageCards) {
        return;
      }

      setError("");
      setSuccess("");

      if (
        !front.trim() ||
        !back.trim()
      ) {
        setError(
          "Front and Back are required."
        );

        return;
      }

      try {
        await api.post(
          `/decks/${id}/cards`,
          {
            frontText:
              front.trim(),

            backText:
              back.trim(),

            pronunciation:
              pronunciation.trim(),

            exampleSentence:
              exampleSentence.trim(),

            deckId: Number(id),

            orderIndex:
              flashcards.length +
              1,
          }
        );

        setSuccess(
          "Flashcard added successfully."
        );

        setFront("");
        setBack("");
        setPronunciation("");
        setExampleSentence("");

        await loadDeck();
      } catch (err) {
        console.error(
          "Unable to add flashcard:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Unable to add flashcard."
        );
      }
    };

  const handleDeleteFlashcard =
    async (flashcardId) => {
      if (!canManageCards) {
        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this flashcard?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setError("");
        setSuccess("");

        await api.delete(
          `/flashcards/${flashcardId}`
        );

        setSuccess(
          "Flashcard deleted successfully."
        );

        await loadDeck();
      } catch (err) {
        console.error(
          "Unable to delete flashcard:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Unable to delete flashcard."
        );
      }
    };

  const handleDeleteDeck =
    async () => {
      if (!canDelete) {
        return;
      }

      const confirmed =
        window.confirm(
          "Are you sure you want to delete this deck?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setError("");

        await deckService.deleteDeck(
          id
        );

        navigate("/decks");
      } catch (err) {
        console.error(
          "Unable to delete deck:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Unable to delete deck."
        );
      }
    };

  if (loading) {
    return (
      <div className="page-container">
        <div className="dashboard-loading">
          Loading deck...
        </div>
      </div>
    );
  }

  if (error && !deck) {
    return (
      <div className="page-container">
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="page-container">
        <div className="error-message">
          Failed to load deck
          details.
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link
        to="/decks"
        className="back-link"
      >
        ← Back to Decks
      </Link>

      <div className="deck-detail-header">
        <div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom:
                "8px",
              flexWrap:
                "wrap",
            }}
          >
            <span className="deck-tag">
              {deck.language ||
                deck.languageName ||
                activeLanguage ||
                "Language Track"}
            </span>

            <span className="deck-capacity">
              Capacity:{" "}
              {deck.capacity ||
                50}
            </span>

            {deck.mentorName && (
              <span className="deck-mentor-tag">
                Mentor:{" "}
                {
                  deck.mentorName
                }
              </span>
            )}
          </div>

          <h1>
            {deck.title}
          </h1>

          <p>
            {deck.description ||
              "No description provided."}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems:
              "center",
            flexWrap:
              "wrap",
          }}
        >
          {isLearner &&
            flashcards.length >
              0 && (
              <Link
                to={`/study?deckId=${id}`}
                className="primary-button"
              >
                Study Deck (
                {
                  flashcards.length
                }
                )
              </Link>
            )}

          {canEdit && (
            <Link
              to={`/decks/${id}/edit`}
              className="secondary-button"
            >
              Edit Deck
            </Link>
          )}

          {canDelete && (
            <button
              type="button"
              onClick={
                handleDeleteDeck
              }
              className="danger-button"
            >
              Delete Deck
            </button>
          )}
        </div>
      </div>

      <section>
        <div
          className="section-head"
          style={{
            marginTop:
              "28px",
          }}
        >
          <div>
            <span className="dashboard-label">
              DECK CONTENT
            </span>

            <h2>
              Current Flashcards (
              {
                flashcards.length
              }
              )
            </h2>

            <p>
              {isLearner
                ? "Review the flashcards available in this deck."
                : "Manage the learning content in this deck."}
            </p>
          </div>
        </div>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <div className="flashcard-list">
          {flashcards.length ===
          0 ? (
            <div className="empty-state">
              <p>
                No flashcards
                available.
              </p>
            </div>
          ) : (
            flashcards.map(
              (card) => (
                <div
                  className="flashcard-row"
                  key={card.id}
                >
                  <div>
                    <strong>
                      Front
                    </strong>

                    <p>
                      {card.frontText ||
                        card.frontContent ||
                        card.front ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <strong>
                      Back
                    </strong>

                    <p>
                      {card.backText ||
                        card.backContent ||
                        card.back ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <strong>
                      Status
                    </strong>

                    <p>
                      {card.status ||
                        "ACTIVE"}
                    </p>
                  </div>

                  <div>
                    <strong>
                      Pronunciation
                    </strong>

                    <p>
                      {card.pronunciation ||
                        "-"}
                    </p>
                  </div>

                  <div>
                    <strong>
                      Example Sentence
                    </strong>

                    <p>
                      {card.exampleSentence ||
                        "-"}
                    </p>
                  </div>

                  {canManageCards && (
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() =>
                        handleDeleteFlashcard(
                          card.id
                        )
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>
              )
            )
          )}
        </div>
      </section>

      {canManageCards && (
        <section className="form-card">
          <h2>
            Add New Flashcard
          </h2>

          <p>
            Add language-learning
            content to this deck.
          </p>

          <form
            onSubmit={
              handleAddFlashcard
            }
          >
            <label htmlFor="front">
              Front (Source)
            </label>

            <input
              id="front"
              name="front"
              type="text"
              placeholder="e.g., Hello"
              value={front}
              onChange={(event) =>
                setFront(
                  event.target
                    .value
                )
              }
            />

            <label htmlFor="back">
              Back (Translation)
            </label>

            <input
              id="back"
              name="back"
              type="text"
              placeholder="e.g., Hola"
              value={back}
              onChange={(event) =>
                setBack(
                  event.target
                    .value
                )
              }
            />

            <label htmlFor="pronunciation">
              Pronunciation
              (Optional)
            </label>

            <input
              id="pronunciation"
              name="pronunciation"
              type="text"
              placeholder="e.g., həˈləʊ"
              value={
                pronunciation
              }
              onChange={(
                event
              ) =>
                setPronunciation(
                  event.target
                    .value
                )
              }
            />

            <label htmlFor="exampleSentence">
              Example Sentence
              (Optional)
            </label>

            <input
              id="exampleSentence"
              name="exampleSentence"
              type="text"
              placeholder="e.g., This is a sample sentence"
              value={
                exampleSentence
              }
              onChange={(
                event
              ) =>
                setExampleSentence(
                  event.target
                    .value
                )
              }
            />

            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="primary-button"
            >
              + Add to Deck
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default DeckDetails;