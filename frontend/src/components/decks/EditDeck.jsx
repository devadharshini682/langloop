import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import deckService from "../../services/deckService";
import {
  SUPPORTED_LANGUAGES,
  normalizeLanguage,
} from "../../utils/languageUtils";

function EditDeck() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [mentorName, setMentorName] = useState("");
  const [capacity, setCapacity] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const response = await deckService.getDeckById(id);
        const deck = response.data;

        setTitle(deck.title || "");
        const rawLang = deck.language || deck.languageName || "";
        const normalized = normalizeLanguage(rawLang) || rawLang;
        setLanguage(normalized || "en");
        setDescription(deck.description || "");
        setMentorName(deck.mentorName || "");
        setCapacity(deck.capacity ?? "");
      } catch (err) {
        console.error("Failed to load deck:", err);
        setError("Failed to load deck");
      } finally {
        setLoading(false);
      }
    };

    loadDeck();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const normalizedLang = normalizeLanguage(language) || "en";

    if (
      !title.trim() ||
      !normalizedLang ||
      !mentorName.trim() ||
      !capacity
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);
      await deckService.updateDeck(id, {
        title: title,
        language: normalizedLang,
        description: description,
        mentorName: mentorName,
        capacity: Number(capacity),
      });

      setSuccess("Deck updated successfully.");
      setTimeout(() => {
        navigate(`/decks/${id}`);
      }, 500);
    } catch (err) {
      console.error("Failed to update deck:", err);
      setError(
        err?.response?.data?.message || "Failed to update deck"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="dashboard-loading">Loading deck...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <span className="dashboard-label">DECK SETTINGS</span>
        <h1>Edit Deck</h1>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Deck Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              required
            >
              <option value="">Select Language</option>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mentorName">Mentor Name</label>
            <input
              id="mentorName"
              name="mentorName"
              type="text"
              value={mentorName}
              onChange={(event) => setMentorName(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(event) => setCapacity(event.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Deck"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate(`/decks/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDeck;