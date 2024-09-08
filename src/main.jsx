import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <>
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <App />
      </Router>
    </Suspense>
  </>
);
