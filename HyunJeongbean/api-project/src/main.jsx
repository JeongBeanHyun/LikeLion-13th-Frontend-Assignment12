import "./index.css";
import App from "./App.jsx";
import React from "react";
import { ShoppingInsightProvider } from "./context/ShoppingInsightProvider.jsx";
import ReactDom from "react-dom/client";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShoppingInsightProvider>
      <App />
    </ShoppingInsightProvider>
  </React.StrictMode>
);
