// App.jsx — ADDU Nation Dashboard
// Auth gate: Show toggles between Login and Dashboard.
// SolidJS + Tailwind CSS.

import { createSignal, Show, Switch, Match } from "solid-js";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Login from "./components/login";
import HomeView from "./components/home";
import DonateView from "./components/donate"; 

// ─── Placeholder views ────────────────────────────────────────────────────────

function PlaceholderView(props) {
  return (
    <div
      style="
        padding: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
      "
    >
      <div
        style="
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: #EBF1FD;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        "
      >
        {props.icon}
      </div>
      <h2 style="font-size: 20px; font-weight: 700; color: #040354; margin-bottom: 8px;">{props.title}</h2>
      <p style="font-size: 14px; text-align: center; max-width: 300px; color: #9ca3af;">{props.sub}</p>
    </div>
  );
}

// ─── App Root ────────────────────────────────────────────────────────────────

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [activeView, setActiveView] = createSignal("home");

  return (
    <Show
      when={isLoggedIn()}
      fallback={<Login onLogin={() => setIsLoggedIn(true)} />}
    >
      {/* Authenticated Dashboard Shell */}
      <div
        style="
          display: flex;
          width: 100vw;
          min-height: 100vh;
          background: #F9FAFB;
          font-family: 'DM Sans', system-ui, sans-serif;
          position: relative;
          overflow-x: hidden;
        "
      >
        {/* Fixed Sidebar */}
        <Sidebar
          activeView={activeView()}
          setActiveView={setActiveView}
          onLogout={() => setIsLoggedIn(false)}
        />

        {/* Main content column — full width minus sidebar */}
        <div
          style="
            margin-left: 250px;
            flex: 1;
            min-width: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            width: calc(100vw - 250px);
          "
        >
          {/* Sticky Header */}
          <Header activeView={activeView()} />

          {/* Scrollable content area */}
          <main style="flex: 1; overflow-y: auto;">
            <Switch>
              <Match when={activeView() === "home"}>
                <HomeView />
              </Match>

              <Match when={activeView() === "donate"}>
                <DonateView />
              </Match>

              <Match when={activeView() === "network"}>
                <PlaceholderView
                  title="Alumni Network"
                  sub="Connect with fellow ADDU graduates across industries and generations."
                  icon={
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#135BEC" stroke-width="1.5">
                      <circle cx="17" cy="7" r="3"/>
                      <circle cx="7" cy="17" r="3"/>
                      <circle cx="17" cy="17" r="3"/>
                      <path d="M7 7m-3 0a3 3 0 106 0 3 3 0 00-6 0"/>
                    </svg>
                  }
                />
              </Match>

              <Match when={activeView() === "career"}>
                <PlaceholderView
                  title="Career Opportunities"
                  sub="Browse curated job listings, mentorship programs, and skill workshops."
                  icon={
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#135BEC" stroke-width="1.5">
                      <rect x="2" y="7" width="20" height="14" rx="2"/>
                      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                    </svg>
                  }
                />
              </Match>

              <Match when={activeView() === "documents"}>
                <PlaceholderView
                  title="Documents"
                  sub="Access and download your official ADDU documents and certificates."
                  icon={
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#135BEC" stroke-width="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  }
                />
              </Match>
            </Switch>
          </main>
        </div>
      </div>
    </Show>
  );
}