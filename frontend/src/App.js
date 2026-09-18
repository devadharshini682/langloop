// import React from "react";
// import {
//   BrowserRouter,
//   Navigate,
//   Route,
//   Routes,
// } from "react-router-dom";
// import { useSelector } from "react-redux";

// import "./App.css";

// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import Dashboard from "./components/dashboard/Dashboard";

// import DeckList from "./components/decks/DeckList";
// import DeckDetails from "./components/decks/DeckDetails";
// import CreateDeck from "./components/decks/CreateDeck";
// import EditDeck from "./components/decks/EditDeck";

// import StudyMode from "./components/study/StudyMode";
// import Mastery from "./components/mastery/Mastery";
// import Progress from "./components/progress/Progress";
// import Navbar from "./components/layout/NavBar";

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useSelector(
//     (state) => state.auth
//   );

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// function App() {
//   return (
//     <BrowserRouter
//       future={{
//         v7_startTransition: true,
//         v7_relativeSplatPath: true,
//       }}
//     >
//       <Navbar />

//       <Routes>
//         {/* Home */}
//         <Route
//           path="/"
//           element={
//             <Navigate
//               to="/dashboard"
//               replace
//             />
//           }
//         />

//         {/* Login */}
//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         {/* Register */}
//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         {/* Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Deck List */}
//         <Route
//           path="/decks"
//           element={
//             <ProtectedRoute>
//               <DeckList />
//             </ProtectedRoute>
//           }
//         />

//         {/* Create Deck */}
//         <Route
//           path="/decks/create"
//           element={
//             <ProtectedRoute>
//               <CreateDeck />
//             </ProtectedRoute>
//           }
//         />

//         {/* Deck Details */}
//         <Route
//           path="/decks/:id"
//           element={
//             <ProtectedRoute>
//               <DeckDetails />
//             </ProtectedRoute>
//           }
//         />

//         {/* Edit Deck */}
//         <Route
//           path="/decks/:id/edit"
//           element={
//             <ProtectedRoute>
//               <EditDeck />
//             </ProtectedRoute>
//           }
//         />

//         {/* Study Mode */}
//         <Route
//           path="/study"
//           element={
//             <ProtectedRoute>
//               <StudyMode />
//             </ProtectedRoute>
//           }
//         />

//         {/* Mastery */}
//         <Route
//           path="/mastery"
//           element={
//             <ProtectedRoute>
//               <Mastery />
//             </ProtectedRoute>
//           }
//         />

//         {/* Progress */}
//         <Route
//           path="/progress"
//           element={
//             <ProtectedRoute>
//               <Progress />
//             </ProtectedRoute>
//           }
//         />

//         {/* Analytics */}
//         <Route
//           path="/analytics"
//           element={
//             <ProtectedRoute>
//               <Progress />
//             </ProtectedRoute>
//           }
//         />

//         {/* Fallback Route */}
//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/dashboard"
//               replace
//             />
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import React from "react";
// import {
//   BrowserRouter,
//   Navigate,
//   Route,
//   Routes,
// } from "react-router-dom";
// import { useSelector } from "react-redux";

// import "./App.css";

// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";

// import Dashboard from "./components/dashboard/Dashboard";

// import DeckList from "./components/decks/DeckList";
// import DeckDetails from "./components/decks/DeckDetails";
// import CreateDeck from "./components/decks/CreateDeck";
// import EditDeck from "./components/decks/EditDeck";

// import StudyMode from "./components/study/StudyMode";
// import Mastery from "./components/mastery/Mastery";
// import Progress from "./components/progress/Progress";

// import Navbar from "./components/layout/NavBar";

// function ProtectedRoute({
//   children,
//   roles,
// }) {
//   const auth = useSelector(
//     (state) => state.auth || {}
//   );

//   const isAuthenticated =
//     auth.isAuthenticated;

//   const role = String(
//     auth.user?.role ||
//       "LEARNER"
//   ).toUpperCase();

//   if (!isAuthenticated) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//       />
//     );
//   }

//   if (
//     roles &&
//     !roles.includes(role)
//   ) {
//     return (
//       <Navigate
//         to="/dashboard"
//         replace
//       />
//     );
//   }

//   return children;
// }

// function App() {
//   return (
//     <BrowserRouter
//       future={{
//         v7_startTransition:
//           true,
//         v7_relativeSplatPath:
//           true,
//       }}
//     >
//       <Navbar />

//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Navigate
//               to="/dashboard"
//               replace
//             />
//           }
//         />

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks"
//           element={
//             <ProtectedRoute
//               roles={[
//                 "LEARNER",
//                 "LINGUIST",
//                 "ADMIN",
//               ]}
//             >
//               <DeckList />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks/create"
//           element={
//             <ProtectedRoute
//               roles={[
//                 "LINGUIST",
//                 "ADMIN",
//               ]}
//             >
//               <CreateDeck />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks/:id"
//           element={
//             <ProtectedRoute
//               roles={[
//                 "LEARNER",
//                 "LINGUIST",
//                 "ADMIN",
//               ]}
//             >
//               <DeckDetails />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/decks/:id/edit"
//           element={
//             <ProtectedRoute
//               roles={[
//                 "LINGUIST",
//                 "ADMIN",
//               ]}
//             >
//               <EditDeck />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/study"
//           element={
//             <ProtectedRoute
//               roles={[
//                 "LEARNER",
//               ]}
//             >
//               <StudyMode />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/mastery"
//           element={
//             <ProtectedRoute
//               roles={[
//                 "LEARNER",
//               ]}
//             >
//               <Mastery />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/progress"
//           element={
//             <ProtectedRoute
//               roles={[
//                 "LEARNER",
//               ]}
//             >
//               <Progress />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/analytics"
//           element={
//             <ProtectedRoute
//               roles={[
//                 "LINGUIST",
//                 "ADMIN",
//               ]}
//             >
//               <Progress />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/dashboard"
//               replace
//             />
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import React from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useSelector } from "react-redux";

import "./App.css";


/* =========================================================
   AUTH
========================================================= */

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";


/* =========================================================
   DASHBOARD
========================================================= */

import Dashboard from "./components/dashboard/Dashboard";


/* =========================================================
   DECKS
========================================================= */

import DeckList from "./components/decks/DeckList";
import DeckDetails from "./components/decks/DeckDetails";
import CreateDeck from "./components/decks/CreateDeck";
import EditDeck from "./components/decks/EditDeck";


/* =========================================================
   LEARNING
========================================================= */

import StudyMode from "./components/study/StudyMode";
import Mastery from "./components/mastery/Mastery";
import Progress from "./components/progress/Progress";


/* =========================================================
   LAYOUT
========================================================= */

import Navbar from "./components/layout/NavBar";
import VideoBackground from "./components/layout/VideoBackground";


/* =========================================================
   PROTECTED ROUTE
========================================================= */

function ProtectedRoute({
  children,
  roles,
}) {

  const auth = useSelector(
    (state) =>
      state.auth || {}
  );


  const isAuthenticated =
    auth.isAuthenticated;


  const role =
    String(
      auth.user?.role ||
      "LEARNER"
    ).toUpperCase();


  /* -------------------------------------------------------
     NOT LOGGED IN
  ------------------------------------------------------- */

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  /* -------------------------------------------------------
     ROLE CHECK
  ------------------------------------------------------- */

  if (
    roles &&
    !roles.includes(role)
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  return children;
}


/* =========================================================
   APP
========================================================= */

function App() {

  return (

    <BrowserRouter
      future={{
        v7_startTransition:
          true,

        v7_relativeSplatPath:
          true,
      }}
    >

      {/* ===================================================
          GLOBAL VIDEO BACKGROUND

          This is outside Routes so it appears on
          the complete website.
      =================================================== */}

      <VideoBackground />


      {/* ===================================================
          ALL WEBSITE CONTENT
      =================================================== */}

      <div className="site-content">

        {/* NAVBAR */}

        <Navbar />


        {/* =================================================
            ROUTES
        ================================================= */}

        <Routes>

          {/* =================================================
              HOME
          ================================================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />


          {/* =================================================
              LOGIN
          ================================================= */}

          <Route
            path="/login"
            element={
              <Login />
            }
          />


          {/* =================================================
              REGISTER
          ================================================= */}

          <Route
            path="/register"
            element={
              <Register />
            }
          />


          {/* =================================================
              DASHBOARD

              Learner
              Linguist
              Admin
          ================================================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>

                <Dashboard />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              DECK LIST

              All roles
          ================================================= */}

          <Route
            path="/decks"
            element={
              <ProtectedRoute
                roles={[
                  "LEARNER",
                  "LINGUIST",
                  "ADMIN",
                ]}
              >

                <DeckList />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              CREATE DECK

              Linguist
              Admin
          ================================================= */}

          <Route
            path="/decks/create"
            element={
              <ProtectedRoute
                roles={[
                  "LINGUIST",
                  "ADMIN",
                ]}
              >

                <CreateDeck />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              DECK DETAILS

              All roles
          ================================================= */}

          <Route
            path="/decks/:id"
            element={
              <ProtectedRoute
                roles={[
                  "LEARNER",
                  "LINGUIST",
                  "ADMIN",
                ]}
              >

                <DeckDetails />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              EDIT DECK

              Linguist
              Admin
          ================================================= */}

          <Route
            path="/decks/:id/edit"
            element={
              <ProtectedRoute
                roles={[
                  "LINGUIST",
                  "ADMIN",
                ]}
              >

                <EditDeck />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              STUDY

              Learner
          ================================================= */}

          <Route
            path="/study"
            element={
              <ProtectedRoute
                roles={[
                  "LEARNER",
                ]}
              >

                <StudyMode />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              MASTERY

              Learner
          ================================================= */}

          <Route
            path="/mastery"
            element={
              <ProtectedRoute
                roles={[
                  "LEARNER",
                ]}
              >

                <Mastery />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              PROGRESS

              Learner
          ================================================= */}

          <Route
            path="/progress"
            element={
              <ProtectedRoute
                roles={[
                  "LEARNER",
                ]}
              >

                <Progress />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              ANALYTICS

              Linguist
              Admin
          ================================================= */}

          <Route
            path="/analytics"
            element={
              <ProtectedRoute
                roles={[
                  "LINGUIST",
                  "ADMIN",
                ]}
              >

                <Progress />

              </ProtectedRoute>
            }
          />


          {/* =================================================
              FALLBACK
          ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}


export default App;


