import React from "react";
import ReactDOM from "react-dom/client";

// import { RouterProvider } from "react-router-dom";

import "./assets/styles/global.css";

import { ContextProvider } from "./store/context-provider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./screens/home";
import NewProjectPage from "./screens/new-project";
import ModalHandler from "./components/modals";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import ListWorkspacesPage from "./screens/workspace";
import WorkspacePage from "./screens/workspace/project";

// Query Client

const root = ReactDOM.createRoot(
  document.getElementById("app-pub") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-project" element={<NewProjectPage />} />
          <Route path="/workspace" element={<ListWorkspacesPage />} />
          <Route path="/workspace/:projectId" element={<WorkspacePage />} />
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
    </ContextProvider>
  </React.StrictMode>
);
