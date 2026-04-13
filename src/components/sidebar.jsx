// Sidebar.jsx — ADDU Nation Dashboard
// Fixed left sidebar, 250px wide, SolidJS + Tailwind CSS

import { createSignal, For } from "solid-js";

const navItems = [
  {
    id: "home",
    label: "Home",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "network",
    label: "Network",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="17" cy="7" r="3" />
        <circle cx="7" cy="17" r="3" />
        <circle cx="17" cy="17" r="3" />
        <path d="M7 7m-3 0a3 3 0 106 0 3 3 0 00-6 0" />
        <line x1="10" y1="7" x2="14" y2="7" />
        <line x1="10" y1="17" x2="14" y2="17" />
        <line x1="7" y1="14" x2="7" y2="10" />
        <line x1="17" y1="10" x2="17" y2="14" />
      </svg>
    ),
  },
  {
    id: "donate",
    label: "Donate",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    id: "career",
    label: "Career",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    id: "documents",
    label: "Documents",
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function Sidebar(props) {
  // props.activeView and props.setActiveView come from App.jsx
  const activeView = () => props.activeView || "home";
  const setActiveView = props.setActiveView || (() => {});

  return (
    <aside
      class="fixed top-0 left-0 h-screen bg-white border-r border-gray-200"
      style="width: 250px; z-index: 50; display: flex; flex-direction: column;"
    >
      {/* Logo / Brand */}
      <div
        class="flex items-center gap-3 px-6 py-5"
        style="border-bottom: 1px solid #e5e7eb;"
      >
        <div
          class="flex items-center justify-center rounded-xl"
          style="width: 38px; height: 38px; background: #040354; flex-shrink: 0;"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div>
          <p class="font-bold text-sm leading-tight" style="color: #040354; letter-spacing: -0.01em;">
            ADDU Nation
          </p>
          <p class="text-xs" style="color: #6b7280;">Alumni Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav class="flex-1 px-3 py-4" style="overflow-y: auto;">
        <p
          class="text-xs font-semibold uppercase mb-3 px-3"
          style="color: #9ca3af; letter-spacing: 0.08em;"
        >
          Main Menu
        </p>

        <For each={navItems}>
          {(item) => {
            const isActive = () => activeView() === item.id;
            return (
              <button
                onClick={() => setActiveView(item.id)}
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all duration-150 text-left group"
                style={
                  isActive()
                    ? "background: #EBF1FD; border-left: 3px solid #135BEC; padding-left: calc(0.75rem - 3px); color: #135BEC;"
                    : "background: transparent; border-left: 3px solid transparent; padding-left: calc(0.75rem - 3px); color: #040354;"
                }
              >
                <span
                  style={
                    isActive()
                      ? "color: #135BEC;"
                      : "color: #040354; opacity: 0.75;"
                  }
                >
                  {item.icon(isActive())}
                </span>
                <span
                  class="text-sm font-medium"
                  style={isActive() ? "color: #135BEC;" : "color: #040354;"}
                >
                  {item.label}
                </span>
                {item.id === "network" && (
                  <span
                    class="ml-auto text-xs font-semibold px-1.5 py-0.5 rounded-full"
                    style="background: #135BEC; color: white; font-size: 10px;"
                  >
                    3
                  </span>
                )}
              </button>
            );
          }}
        </For>
      </nav>

      {/* Profile card at bottom */}
      <div
        class="mx-3 mb-2 p-3 rounded-xl flex items-center gap-3"
        style="background: #f0f4ff; border: 1px solid #dce5fb;"
      >
        <div
          class="rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style="width: 36px; height: 36px; background: #040354; color: white;"
        >
          AX
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold truncate" style="color: #040354;">
            Alex Reyes
          </p>
          <p class="text-xs truncate" style="color: #6b7280;">
            Class of 2018
          </p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
          <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
        </svg>
      </div>

      {/* Logout button */}
      <button
        onClick={() => props.onLogout && props.onLogout()}
        class="mx-3 mb-4 w-auto flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-150"
        style="background: transparent; border: 1px solid #fecdd3; color: #E11D48; font-size: 12px; font-weight: 600; cursor: pointer; width: calc(100% - 24px);"
        onMouseEnter={e => { e.currentTarget.style.background = "#fff1f2"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E11D48" stroke-width="2" stroke-linecap="round">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Sign Out
      </button>
    </aside>
  );
}