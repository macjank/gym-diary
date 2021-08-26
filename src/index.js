import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TrainingsContextProvider } from "./store/trainings-context";

ReactDOM.render(
  <TrainingsContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TrainingsContextProvider>,
  document.getElementById("root")
);
