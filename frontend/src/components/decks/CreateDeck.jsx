// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";

// function CreateDeck() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [languageTrack, setLanguageTrack] = useState("");
//   const [isPublic, setIsPublic] = useState(false);

//   const [languages, setLanguages] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const loadLanguages = async () => {
//       try {
//         const response = await api.get("/languages");
//         setLanguages(response.data || []);
//       } catch (err) {
//         setLanguages([]);
//       }
//     };

//     loadLanguages();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       await api.post("/decks", {
//         title,
//         description,
//         languageTrackId: languageTrack,
//         isPublic,
//       });

//       alert("Deck created successfully.");
//       navigate("/decks");
//     } catch (err) {
//       setError("Failed to create deck");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page-container">
//       <div className="form-container">
//         {/* IMPORTANT:
//             Do NOT use "Create Deck" here.
//             The tests use getByText(/Create Deck/i),
//             so only the button should contain that text.
//         */}
//         <span className="dashboard-label">DECK CREATOR</span>
//         <h1>New Study Deck</h1>

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="deckTitle">Deck Title</label>
//             <input
//               id="deckTitle"
//               name="title"
//               type="text"
//               placeholder="Enter deck title"
//               value={title}
//               onChange={(event) => setTitle(event.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               placeholder="Enter deck description"
//               rows={4}
//               value={description}
//               onChange={(event) => setDescription(event.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="languageTrack">Language Track</label>
//             <select
//               id="languageTrack"
//               name="languageTrack"
//               value={languageTrack}
//               onChange={(event) => setLanguageTrack(event.target.value)}
//               required
//             >
//               <option value="">Select Language</option>
//               {languages.map((language) => (
//                 <option key={language.id} value={language.id}>
//                   {language.languageName || language.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               margin: "6px 0",
//             }}
//           >
//             <input
//               id="publicToggle"
//               name="public"
//               type="checkbox"
//               checked={isPublic}
//               onChange={(event) => setIsPublic(event.target.checked)}
//             />
//             <label
//               htmlFor="publicToggle"
//               style={{ margin: 0, cursor: "pointer" }}
//             >
//               Make this deck public
//             </label>
//           </div>

//           {error && <p className="error-message">{error}</p>}

//           <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
//             <button
//               className="primary-button"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Creating..." : "Create Deck"}
//             </button>

//             <button
//               type="button"
//               className="secondary-button"
//               onClick={() => navigate("/decks")}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateDeck;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/api";
import {
  SUPPORTED_LANGUAGES,
  normalizeLanguage,
} from "../../utils/languageUtils";

function CreateDeck() {
  const navigate = useNavigate();

  const reduxUser = useSelector((state) => state.auth?.user);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [languageTrack, setLanguageTrack] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const response = await api.get("/languages");
        setLanguages(response.data || []);
      } catch (err) {
        console.error("Failed to load languages:", err);
        setLanguages([]);
      }
    };

    loadLanguages();
  }, []);

  const getLoggedInUsername = () => {
    // 1. Try Redux user
    if (reduxUser?.username) {
      return reduxUser.username;
    }

    // 2. Try Redux nested user
    if (reduxUser?.user?.username) {
      return reduxUser.user.username;
    }

    // 3. Try localStorage langloop_user
    try {
      const savedUser = localStorage.getItem("langloop_user");

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);

        if (parsedUser?.username) {
          return parsedUser.username;
        }

        if (parsedUser?.user?.username) {
          return parsedUser.user.username;
        }
      }
    } catch (err) {
      console.error("Could not read saved user:", err);
    }

    // 4. Try old localStorage user
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);

        if (parsedUser?.username) {
          return parsedUser.username;
        }

        if (parsedUser?.user?.username) {
          return parsedUser.user.username;
        }
      }
    } catch (err) {
      console.error("Could not read saved user:", err);
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const mentorName = getLoggedInUsername();

    // Backend requires mentorName.
    if (!mentorName) {
      setError(
        "Unable to identify the logged-in user. Please logout and login again."
      );
      return;
    }

    if (!title.trim()) {
      setError("Deck title is required.");
      return;
    }

    if (!languageTrack) {
      setError("Please select a language.");
      return;
    }

    setLoading(true);

    try {
      const normalizedLanguage = normalizeLanguage(languageTrack) || "en";
      const deckData = {
        title: title.trim(),
        language: normalizedLanguage,
        description: description.trim(),
        mentorName: mentorName,
        capacity: 50,
      };

      console.log("Creating deck:", deckData);

      await api.post("/decks", deckData);

      alert("Deck created successfully.");

      navigate("/decks");
    } catch (err) {
      console.error("Failed to create deck:", err);

      const responseData = err?.response?.data;

      if (typeof responseData === "string") {
        setError(responseData);
      } else if (responseData?.message) {
        setError(responseData.message);
      } else {
        setError("Failed to create deck.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <span className="dashboard-label">
          DECK CREATOR
        </span>

        <h1>New Study Deck</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="deckTitle">
              Deck Title
            </label>

            <input
              id="deckTitle"
              name="title"
              type="text"
              placeholder="Enter deck title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter deck description"
              rows={4}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="languageTrack">
              Language
            </label>

            <select
              id="languageTrack"
              name="languageTrack"
              value={languageTrack}
              onChange={(event) =>
                setLanguageTrack(event.target.value)
              }
              required
            >
              <option value="">
                Select Language
              </option>

              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                >
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "6px 0",
            }}
          >
            <input
              id="publicToggle"
              name="public"
              type="checkbox"
              checked={isPublic}
              onChange={(event) =>
                setIsPublic(event.target.checked)
              }
            />

            <label
              htmlFor="publicToggle"
              style={{
                margin: 0,
                cursor: "pointer",
              }}
            >
              Make this deck public
            </label>
          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "10px",
            }}
          >
            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Deck"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate("/decks")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;