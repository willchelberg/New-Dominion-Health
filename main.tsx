import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./src/App";
import "./src/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>
);