import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SplitBillProvider } from "./contexts/SplitBillContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SplitBillProvider>
      <App />
    </SplitBillProvider>
  </React.StrictMode>
);
