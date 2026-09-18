import React, { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/api";
import {
  getDueCards,
  getLocalDueIds,
  markCardDue,
  markCardLearning,
  markCardMastered,
} from "../../services/analyticsService";

const listFrom = (data, keys = []) => {
  if (Array.isArray(data)) return data;
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

function StudyMode() {
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId");
  const allCards = searchParams.get("all");
  const reviewMode = searchParams.get("review") === "true";
  const requestedCardId = searchParams.get("cardId");

  const auth = useSelector((state) => state.auth || {});
  const user = auth.user;
  const reduxLang = useSelector(
    (state) => state.languages?.selectedLanguage
  );

  const activeLanguage =
    reduxLang ||
    user?.learningLanguage ||
    user?.nativeLanguage ||
    user?.language ||
    localStorage.getItem("langloop_learning_language") ||
    "";

  const [cards, setCards] = useState([]);
  const [deckInfo, setDeckInfo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [sessionSummary, setSessionSummary] = useState({
    answered: 0,
    correct: 0,
    incorrect: 0,
    accuracy: 0,
  });

  const getLanguageValue = (item) =>
    item?.language ||
    item?.languageName ||
    item?.learningLanguage ||
    item?.targetLanguage ||
    item?.lang ||
    item?.locale ||
    item?.languageCode ||
    item?.targetLanguageCode ||
    "";

  const normalizeLanguage = (language) => {
    const value = String(language || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, "-");

    if (!value) return "";
    if (value === "english" || value.startsWith("en-")) return "en";
    if (value === "tamil" || value.startsWith("ta-")) return "ta";
    if (value === "hindi" || value.startsWith("hi-")) return "hi";
    if (value === "french" || value.startsWith("fr-")) return "fr";
    if (value === "spanish" || value.startsWith("es-")) return "es";
    return value;
  };

  const sameLanguage = (a, b) => {
    const left = normalizeLanguage(a);
    const right = normalizeLanguage(b);
    return !left || !right || left === right;
  };

  const getCardId = (card) =>
    card?.id ?? card?.cardId ?? card?.flashcardId ?? null;

  const loadAllLearningCards = async () => {
    const decksResponse = await api.get("/decks");
    const decks = listFrom(decksResponse?.data, ["decks", "items"]);

    const cardArrays = await Promise.all(
      decks
        .filter((deck) => deck?.id !== undefined && deck?.id !== null)
        .filter((deck) => sameLanguage(getLanguageValue(deck), activeLanguage))
        .map(async (deck) => {
          try {
            const response = await api.get(
              `/flashcards/deck/${deck.id}`
            );

            return listFrom(response?.data, [
              "cards",
              "flashcards",
              "items",
            ]).map((card) => ({
              ...card,
              deckTitle: deck.title,
              deckId: deck.id,
              language:
                getLanguageValue(card) || getLanguageValue(deck),
            }));
          } catch (err) {
            console.error(
              `Failed to load cards for deck ${deck.id}:`,
              err
            );
            return [];
          }
        })
    );

    return cardArrays
      .flat()
      .filter((card) => sameLanguage(getLanguageValue(card), activeLanguage));
  };

  const loadReviewCards = async () => {
    let due = [];

    try {
      due = await getDueCards(user);
    } catch (err) {
      console.warn("Backend due-card request failed:", err);
    }

    due = (Array.isArray(due) ? due : [])
      .map((item) => (item?.card ? item.card : item))
      .filter(Boolean);

    /*
     * The backend due endpoint can be empty even when the frontend has
     * already marked a card as due. Build the review queue from the actual
     * learner cards as a fallback.
     */
    if (due.length === 0) {
      const localDueIds = getLocalDueIds();

      if (localDueIds.size > 0) {
        const all = await loadAllLearningCards();
        due = all.filter((card) => {
          const id = getCardId(card);
          return id !== null && localDueIds.has(String(id));
        });
      }
    }

    if (requestedCardId) {
      const requested = due.find(
        (card) => String(getCardId(card)) === String(requestedCardId)
      );

      if (requested) {
        return [requested];
      }
    }

    return due;
  };

  const loadCards = useCallback(async () => {
    setLoading(true);
    setError("");
    setDeckInfo(null);

    try {
      let result = [];

      if (deckId) {
        try {
          const deckRes = await api.get(`/decks/${deckId}`);
          if (deckRes?.data) setDeckInfo(deckRes.data);
        } catch (err) {
          console.error("Failed to load deck details:", err);
        }

        const response = await api.get(`/flashcards/deck/${deckId}`);
        result = listFrom(response?.data, [
          "cards",
          "flashcards",
          "items",
        ]);
      } else if (reviewMode) {
        result = await loadReviewCards();
      } else {
        /*
         * Normal Study mode must show the learner's cards, not only cards
         * currently due. The previous implementation used getDueCards()
         * here, which is why Study showed "No Cards Available".
         */
        result = await loadAllLearningCards();
      }

      result = result
        .map((item) => (item?.card ? item.card : item))
        .filter(Boolean);

      setCards(result);
      setCurrentIndex(0);
      setShowAnswer(false);
      setSessionCompleted(false);
      setAnswers([]);
      setSessionSummary({
        answered: 0,
        correct: 0,
        incorrect: 0,
        accuracy: 0,
      });
    } catch (err) {
      console.error("Failed to load study cards:", err);
      setCards([]);
      setError(
        err?.response?.data?.message ||
          "Failed to load study cards."
      );
    } finally {
      setLoading(false);
    }
  }, [
    activeLanguage,
    allCards,
    deckId,
    requestedCardId,
    reviewMode,
    user,
  ]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const currentCard = cards[currentIndex];

  const finishSession = (updatedAnswers = answers) => {
    const correct = updatedAnswers.filter((answer) => answer.correct).length;
    const incorrect = updatedAnswers.filter((answer) => !answer.correct).length;
    const answered = updatedAnswers.length;

    setSessionSummary({
      answered,
      correct,
      incorrect,
      accuracy: answered > 0 ? Math.round((correct / answered) * 100) : 0,
    });
    setSessionCompleted(true);
    setShowAnswer(false);
  };

  const nextCard = (rating = "Good") => {
    const cardId = getCardId(currentCard) ?? currentIndex;

    /*
     * Keep frontend mastery/review state in sync with the study action.
     * This is intentionally local because the current backend does not
     * expose a reliable card-answer update endpoint in this frontend.
     */
    if (rating === "Again" || rating === "Hard") {
      markCardDue(cardId, user);
    } else if (rating === "Easy") {
      markCardMastered(cardId, user);
    } else {
      markCardLearning(cardId, user);
    }

    const nextAnswer = {
      cardId,
      rating,
      correct: rating !== "Again",
    };
    const updatedAnswers = [...answers, nextAnswer];
    setAnswers(updatedAnswers);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex((index) => index + 1);
      setShowAnswer(false);
    } else {
      finishSession(updatedAnswers);
    }
  };

  const correctAnswers = sessionSummary.correct;
  const incorrectAnswers = sessionSummary.incorrect;
  const answeredCount = sessionSummary.answered;
  const sessionAccuracy = sessionSummary.accuracy;

  if (loading) {
    return (
      <div className="study-page">
        <div className="study-card">
          <div className="dashboard-loading">Loading study session...</div>
        </div>
      </div>
    );
  }

  if (error && !cards.length) {
    return (
      <div className="study-page">
        <div className="study-card">
          <h1>Study Mode</h1>
          <p>{error}</p>
          <button type="button" className="primary-button" onClick={loadCards}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (sessionCompleted) {
    return (
      <div className="study-page">
        <div className="study-card" style={{ textAlign: "center" }}>
          <span className="dashboard-label">SESSION COMPLETE</span>
          <h1>Study Completed</h1>
          <p>
            You reviewed <strong>{answeredCount}</strong> card{answeredCount === 1 ? "" : "s"}.
          </p>

          <div className="stats-grid" style={{ marginTop: "20px" }}>
            <div className="stat-card mastered-stat">
              <span className="stat-title">CORRECT</span>
              <p className="stat-value">{correctAnswers}</p>
            </div>
            <div className="stat-card due-stat">
              <span className="stat-title">AGAIN</span>
              <p className="stat-value">{incorrectAnswers}</p>
            </div>
            <div className="stat-card flashcard-stat">
              <span className="stat-title">ACCURACY</span>
              <p className="stat-value">{sessionAccuracy}%</p>
            </div>
          </div>

          <div className="error-message" style={{ marginTop: "16px" }}>
            This session was completed in the frontend. The current backend does not expose an active answer/update endpoint, so no unsupported mastery update request was sent.
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <Link to="/dashboard" className="primary-button" style={{ flex: 1 }}>
              Back to Dashboard
            </Link>
            <Link to="/progress" className="secondary-button" style={{ flex: 1 }}>
              View Progress
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="study-page">
        <div className="study-card" style={{ textAlign: "center" }}>
          <span className="dashboard-label">STUDY STATUS</span>
          <h1>{deckId ? "No Cards in This Deck" : reviewMode ? "No Cards Available" : "No Cards Available"}</h1>
          <p>
            {deckId
              ? "This deck does not contain any flashcards yet."
              : reviewMode
                ? "There are currently no cards waiting for review."
                : "No flashcards are available for your learning language."}
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            <Link to="/dashboard" className="secondary-button" style={{ flex: 1 }}>
              Back to Dashboard
            </Link>
            <Link to="/decks" className="secondary-button" style={{ flex: 1 }}>
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progressPct = Math.round(((currentIndex + 1) / cards.length) * 100);

  return (
    <div className="study-page">
      <div className="study-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div className="study-progress">
            Question {currentIndex + 1} of {cards.length}
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            {deckInfo?.title && (
              <span className="deck-capacity">{deckInfo.title}</span>
            )}
            {activeLanguage && (
              <span className="deck-tag" title="Active Learning Language">
                🌐 {activeLanguage}
              </span>
            )}
            <span className="dashboard-label">STUDY MODE</span>
          </div>
        </div>

        <div className="study-bar-track" style={{ margin: "10px 0 16px" }}>
          <div className="study-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>

        <h1>Q{currentIndex + 1}</h1>

        <div className="question-card">
          {currentCard?.masteryLevel && (
            <div style={{ marginBottom: "10px" }}>
              <span className={`mastery-pill pill-${String(currentCard.masteryLevel).toLowerCase()}`}>
                {currentCard.masteryLevel}
              </span>
            </div>
          )}

          <p className="question-text">
            {currentCard?.frontContent ||
              currentCard?.frontText ||
              currentCard?.front ||
              currentCard?.question ||
              currentCard?.source ||
              ""}
          </p>

          {currentCard?.pronunciation && (
            <div className="study-pronunciation">
              <small>Pronunciation:</small> <span>/{currentCard.pronunciation}/</span>
            </div>
          )}

          {showAnswer && (
            <div className="answer">
              <strong>Answer</strong>
              <p>
                {currentCard?.backContent ||
                  currentCard?.backText ||
                  currentCard?.back ||
                  currentCard?.answer ||
                  currentCard?.translation ||
                  ""}
              </p>

              {currentCard?.exampleSentence && (
                <div className="study-example">
                  <small>Example:</small> "{currentCard.exampleSentence}"
                </div>
              )}
            </div>
          )}
        </div>

        {!showAnswer ? (
          <button
            type="button"
            className="primary-button"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <div className="spaced-review-buttons">
              <button type="button" className="difficulty-btn diff-again" onClick={() => nextCard("Again")}>
                Again
              </button>
              <button type="button" className="difficulty-btn diff-hard" onClick={() => nextCard("Hard")}>
                Hard
              </button>
              <button type="button" className="difficulty-btn diff-good" onClick={() => nextCard("Good")}>
                Good
              </button>
              <button type="button" className="difficulty-btn diff-easy" onClick={() => nextCard("Easy")}>
                Easy
              </button>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => nextCard("Good")}
            >
              {currentIndex < cards.length - 1 ? "Next Card" : "Finish Study"}
            </button>
          </div>
        )}

        <div style={{ display: "flex", gap: "12px" }}>
          <Link to="/dashboard" className="secondary-button" style={{ flex: 1 }}>
            Back to Dashboard
          </Link>
          <Link to="/decks" className="secondary-button" style={{ flex: 1 }}>
            Back to Decks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudyMode;
