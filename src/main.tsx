import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import "@/i18n";
import { applyTheme, readStoredTheme } from "@/lib/theme";
import "@/index.css";

applyTheme(readStoredTheme());

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
