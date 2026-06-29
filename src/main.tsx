import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import App from "./App.tsx";
import "./index.css";

// Apply theme before render
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.documentElement.classList.add("light-mode");
  document.documentElement.classList.remove("dark-mode");
} else if (savedTheme === "dark") {
  document.documentElement.classList.add("dark-mode");
  document.documentElement.classList.remove("light-mode");
} else {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.add("light-mode");
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
