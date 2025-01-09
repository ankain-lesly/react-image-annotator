import React from "react";
import ReactDOM from "react-dom/client";

// import { RouterProvider } from "react-router-dom";

import "./assets/styles/global.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./screens/home";
import NewProjectPage from "./screens/new-project";
import ModalHandler from "./components/modals";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import ListWorkspacesPage from "./screens/workspace";
import WorkspacePage from "./screens/workspace/project";
import Login from "./screens/auth/login";
import Register from "./screens/auth/register";
import Logout from "./screens/auth/logout";
import AuthWrapper from "./components/wrappers/auth-wrapper";
import ContextWrapper from "./components/wrappers/context-wrapper";

// Query Client

const root = ReactDOM.createRoot(
  document.getElementById("app-pub") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ContextWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/new-project"
            element={<AuthWrapper layout={NewProjectPage} />}
          />
          <Route
            path="/workspace"
            element={<AuthWrapper layout={ListWorkspacesPage} />}
          />
          <Route
            path="/workspace/:projectId"
            element={<AuthWrapper layout={WorkspacePage} />}
          />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
      <AnimatePresence mode="wait">
        <ModalHandler />
      </AnimatePresence>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </ContextWrapper>
  </React.StrictMode>
);
