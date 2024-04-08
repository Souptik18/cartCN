import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import rootReducer from "./reducers"; // Assuming rootReducer is the combined reducer
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

// Import any other necessary modules or setup here

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer, // Pass the combined reducer here
});

// Create the root element for React
const root = createRoot(document.getElementById("root"));

// Render the App component wrapped in the Redux Provider
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
