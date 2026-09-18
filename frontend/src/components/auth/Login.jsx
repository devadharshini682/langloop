import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { loginSuccess } from "../../store/slices/authSlice";
import { setSelectedLanguage } from "../../store/slices/languageSlice";
import { normalizeLanguage } from "../../utils/languageUtils";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const data = response.data;
      const token = data.token || data.accessToken;
      let user = data.user || data;

      // Automatically retrieve the user's saved learning language
      const rawSavedLang =
        user.learningLanguage ||
        user.nativeLanguage ||
        user.language ||
        localStorage.getItem(
          `langloop_user_lang_${username.toLowerCase().trim()}`
        ) ||
        localStorage.getItem("langloop_learning_language") ||
        "en";

      const savedLang = normalizeLanguage(rawSavedLang) || "en";

      user = {
        ...user,
        learningLanguage: savedLang,
        nativeLanguage: savedLang,
        language: savedLang,
      };

      if (token) {
        localStorage.setItem("langloop_token", token);
      }

      if (user.role) {
        localStorage.setItem("langloop_role", user.role);
      }

      localStorage.setItem("langloop_learning_language", savedLang);
      dispatch(setSelectedLanguage(savedLang));

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("langloop_user", JSON.stringify(user));

      dispatch(
        loginSuccess({
          token,
          user,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container-split">
        {/* Left Branding Showcase */}
        <div className="auth-showcase">
          <div className="showcase-badge">LangLoop Learning Platform</div>
          <h2>Master Any Language, One Loop at a Time</h2>
          <p>
            Supercharge your retention with spaced repetition flashcards, real
            mastery analytics, and structured language tracks.
          </p>

          <div className="showcase-features">
            <div className="showcase-feature-item">
              <span className="feature-icon">🌐</span>
              <div>
                <strong>Active Language Context</strong>
                <span>Learn in Malayalam, Tamil, Hindi, or English</span>
              </div>
            </div>
            <div className="showcase-feature-item">
              <span className="feature-icon">⚡</span>
              <div>
                <strong>Smart Spaced Repetition</strong>
                <span>Review cards right when your brain needs them</span>
              </div>
            </div>
            <div className="showcase-feature-item">
              <span className="feature-icon">📈</span>
              <div>
                <strong>Real Mastery Tracking</strong>
                <span>Track progress from New to Learning to Mastered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-badge">LangLoop</div>
            <h1>Welcome Back</h1>
            <p>Login to continue to LangLoop</p>
          </div>

          {error && <div className="error-message">{error}</div>}

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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="primary-button auth-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            <span>Don't have an account?</span>{" "}
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

