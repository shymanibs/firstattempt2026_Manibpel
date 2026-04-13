// Header.jsx — ADDU Nation Dashboard
// Top bar for main content area. SolidJS + Tailwind CSS.

import { createSignal } from "solid-js";

export default function Header(props) {
  const [searchValue, setSearchValue] = createSignal("");
  const [notifOpen, setNotifOpen] = createSignal(false);

  return (
    <header
      class="flex items-center gap-4 px-8 bg-white"
      style="height: 72px; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 40; width: 100%;"
    >
      {/* Left: Greeting */}
      <div class="flex-shrink-0">
        <p class="text-xs" style="color: #9ca3af; line-height: 1;">
          Monday, April 13
        </p>
        <p class="text-base font-semibold mt-0.5" style="color: #040354; line-height: 1;">
          Welcome back,{" "}
          <span style="color: #135BEC;">Alex!</span>
        </p>
      </div>

      {/* Center: Search bar */}
      <div class="flex-1 flex justify-center px-4">
        <div
          class="relative w-full"
          style="max-width: 480px;"
        >
          {/* Search icon */}
          <span
            class="absolute inset-y-0 left-4 flex items-center pointer-events-none"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search alumni, jobs, documents..."
            value={searchValue()}
            onInput={(e) => setSearchValue(e.currentTarget.value)}
            class="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all duration-150"
            style="
              background: #F3F4F6;
              color: #111827;
              border: 1.5px solid transparent;
              font-size: 13.5px;
            "
            onFocus={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.borderColor = "#135BEC";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(19,91,236,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.background = "#F3F4F6";
              e.currentTarget.style.borderColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          {/* Keyboard shortcut hint */}
          <span
            class="absolute inset-y-0 right-3 flex items-center gap-1 pointer-events-none"
          >
            <kbd
              class="text-xs px-1.5 py-0.5 rounded"
              style="background: #e5e7eb; color: #6b7280; font-family: monospace; font-size: 10px;"
            >
              ⌘K
            </kbd>
          </span>
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div class="flex items-center gap-3 flex-shrink-0">
        {/* Notification bell */}
        <div class="relative">
          <button
            class="relative flex items-center justify-center rounded-xl transition-all duration-150"
            style="width: 40px; height: 40px; background: #F3F4F6; border: 1px solid #e5e7eb;"
            onClick={() => setNotifOpen(!notifOpen())}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#040354"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            {/* Badge */}
            <span
              class="absolute top-1.5 right-1.5 rounded-full"
              style="width: 8px; height: 8px; background: #E11D48; border: 2px solid white;"
            />
          </button>

          {/* Dropdown panel */}
          {notifOpen() && (
            <div
              class="absolute right-0 mt-2 rounded-2xl shadow-lg p-4"
              style="
                width: 300px;
                background: white;
                border: 1px solid #e5e7eb;
                top: 100%;
                z-index: 100;
              "
            >
              <p class="font-semibold text-sm mb-3" style="color: #040354;">
                Notifications
              </p>
              {[
                { icon: "💬", title: "New Mentor Message", time: "15m ago", sub: "Dr. Reyes replied to your inquiry" },
                { icon: "📄", title: "Donation Receipt Ready", time: "2h ago", sub: "Thank you for your contribution" },
                { icon: "💼", title: "Job Application Update", time: "1d ago", sub: "Your application for Project Manager" },
              ].map((n) => (
                <div
                  class="flex gap-3 py-2.5 border-b last:border-0"
                  style="border-color: #f3f4f6; cursor: pointer;"
                >
                  <span class="text-lg">{n.icon}</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-start">
                      <p class="text-xs font-semibold" style="color: #111827;">{n.title}</p>
                      <p class="text-xs ml-2 flex-shrink-0" style="color: #9ca3af;">{n.time}</p>
                    </div>
                    <p class="text-xs mt-0.5 truncate" style="color: #6b7280;">{n.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style="width: 1px; height: 24px; background: #e5e7eb;" />

        {/* Profile avatar */}
        <button class="flex items-center gap-2.5 group">
          <div
            class="rounded-full flex items-center justify-center font-bold text-sm"
            style="width: 38px; height: 38px; background: linear-gradient(135deg, #040354 0%, #135BEC 100%); color: white; flex-shrink: 0;"
          >
            AX
          </div>
          <div class="hidden md:block text-left">
            <p class="text-xs font-semibold" style="color: #040354; line-height: 1.2;">Alex Reyes</p>
            <p class="text-xs" style="color: #9ca3af; line-height: 1.2;">Alumni · Class '18</p>
          </div>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            stroke-width="2.5"
            class="hidden md:block"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </header>
  );
}