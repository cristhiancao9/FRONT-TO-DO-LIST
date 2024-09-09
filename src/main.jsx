import React from "react";
import { createRoot } from "react-dom/client"; 
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <ToastContainer
      position={"top-center"}
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      progress={undefined}
    />
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </>
);
