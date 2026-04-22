/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.jsx";

const root = document.getElementById("root");

render(() => <App />, root);

// ── Service Worker Registration ──────────────────────────────────────────────
// Runs after the app mounts so it never blocks first render.
// The SW file must be served from the root scope (/sw.js), which is why
// it lives in /public rather than /src.

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("[SW] Registered — scope:", registration.scope);

        // Optional: check for updates every time the page loads
        registration.update();

        // Notify the user when a new version of the SW is waiting
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker?.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // A new SW is ready — you can show a toast here if you like:
              // e.g. "App updated — refresh to get the latest version."
              console.log("[SW] New version available. Refresh to update.");
            }
          });
        });
      })
      .catch((err) => {
        console.error("[SW] Registration failed:", err);
      });
  });
}