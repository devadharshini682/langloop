
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../store/slices/authSlice";

// function Navbar() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

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

//   /*
//    * Some of the tests provide a user object directly
//    * without explicitly setting isAuthenticated.
//    */
//   const isAuthenticated =
//     auth.isAuthenticated === true ||
//     !!user;

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <Link to="/">LangLoop</Link>
//       </div>

//       {isAuthenticated && (
//         <div className="navbar-links">
//           {activeLanguage && (
//             <div className="nav-language-badge" title="Active Learning Language">
//               <span className="badge-dot">●</span>
//               <span className="badge-text">{activeLanguage}</span>
//             </div>
//           )}

//           <Link to="/dashboard">
//             Dashboard
//           </Link>

//           <Link to="/decks">
//             Decks
//           </Link>

//           <Link to="/study">
//             Study
//           </Link>

//           <Link to="/mastery">
//             Mastery
//           </Link>

//           <Link to="/progress">
//             Progress
//           </Link>

//           {user?.role === "LINGUIST" && (
//             <Link to="/decks/create">
//               Create Deck
//             </Link>
//           )}

//           {user?.role === "ADMIN" && (
//             <Link to="/analytics">
//               Analytics
//             </Link>
//           )}

//           <button
//             type="button"
//             className="logout-button"
//             onClick={handleLogout}
//           >
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import {
  getUserLanguage,
  getLanguageName,
  getLanguageNativeName,
  t,
} from "../../utils/languageUtils";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth || {});
  const user = auth.user;

  const role = String(user?.role || "LEARNER").toUpperCase();
  const isLearner = role === "LEARNER";

  const reduxLang = useSelector(
    (state) => state.languages?.selectedLanguage
  );

  const userLang = reduxLang || getUserLanguage(user);

  const isAuthenticated =
    auth.isAuthenticated === true || !!user;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const roleLabel =
    role === "LINGUIST"
      ? "LINGUIST WORKSPACE"
      : role === "ADMIN"
      ? "ADMIN OVERVIEW"
      : "LEARNER";

  return (
    <nav className={`navbar navbar-${role.toLowerCase()}`}>
      <div className="navbar-brand">
        <Link to="/">LangLoop</Link>
      </div>

      {isAuthenticated && (
        <div className="navbar-links">

          {/* ROLE BADGE */}
          <span
            className={`navbar-role-badge role-${role.toLowerCase()}`}
          >
            {roleLabel}
          </span>

          {/* LEARNER LANGUAGE */}
          {isLearner && userLang && (
            <div
              className="nav-language-badge"
              title="Active Learning Language"
            >
              <span className="badge-dot">●</span>
              <span className="badge-text">
                {getLanguageName(userLang)}
              </span>
            </div>
          )}

          {/* ================= LEARNER ================= */}
          {isLearner && (
            <>
              <Link to="/dashboard">
                {t("dashboard", userLang)}
              </Link>

              <Link to="/decks">
                {t("myDecks", userLang)}
              </Link>

              <Link to="/study">
                {t("study", userLang)}
              </Link>

              <Link to="/mastery">
                {t("mastery", userLang)}
              </Link>

              <Link to="/progress">
                {t("progress", userLang)}
              </Link>
            </>
          )}

          {/* ================= LINGUIST ================= */}
          {role === "LINGUIST" && (
            <>
              <Link to="/dashboard">
                Workspace
              </Link>

              <Link to="/decks">
                Decks
              </Link>

              <Link to="/decks/create">
                Create Deck
              </Link>

              <Link to="/analytics">
                Content Analytics
              </Link>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {role === "ADMIN" && (
            <>
              <Link to="/dashboard">
                Overview
              </Link>

              <Link to="/decks">
                Content
              </Link>

              <Link to="/analytics">
                Analytics
              </Link>
            </>
          )}

          {/* LOGOUT */}
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            {isLearner ? t("logout", userLang) : "Logout"}
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;

