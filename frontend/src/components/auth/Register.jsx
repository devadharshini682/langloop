import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  SUPPORTED_LANGUAGES,
  normalizeLanguage,
  getLanguageName,
  getLanguageNativeName,
} from "../../utils/languageUtils";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("en");
  const [role, setRole] = useState("LEARNER");
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await api.get("/languages");
        const data = response?.data;
        if (Array.isArray(data) && data.length > 0) {
          setLanguages(data);
        }
      } catch (err) {
        // Fallback languages handled in UI
      }
    };
    fetchLanguages();
  }, []);

  const availableLanguages = SUPPORTED_LANGUAGES;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const normalizedLang = normalizeLanguage(nativeLanguage) || "en";

    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
        nativeLanguage: normalizedLang,
        learningLanguage: normalizedLang,
        role,
      });

      // Save user's selected language so it automatically initializes on login
      localStorage.setItem(
        `langloop_user_lang_${username.toLowerCase().trim()}`,
        normalizedLang
      );
      localStorage.setItem("langloop_learning_language", normalizedLang);

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-logo-badge">LangLoop</div>
          <h1>Create Account</h1>
          <p>Choose your learning language and start your journey</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password (min 6 characters)"
              minLength={6}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nativeLanguage">
              Native Language / Learning Language
            </label>

            {/* Visual Language Chips */}
            <div className="language-chips-grid">
              {availableLanguages.map((lang) => {
                const isSelected =
                  normalizeLanguage(nativeLanguage) === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    className={`lang-chip ${isSelected ? "selected" : ""}`}
                    onClick={() => setNativeLanguage(lang.code)}
                  >
                    <span className="lang-chip-icon">{lang.flag}</span>
                    <span className="lang-chip-text">
                      {lang.name} ({lang.nativeName})
                    </span>
                    {isSelected && <span className="lang-chip-check">✓</span>}
                  </button>
                );
              })}
            </div>

            <select
              id="nativeLanguage"
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              required
            >
              <option value="">Select your language</option>
              {availableLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="LEARNER">Learner</option>
              <option value="LINGUIST">Linguist</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="primary-button auth-submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>{" "}
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

