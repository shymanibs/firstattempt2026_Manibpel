// Home.jsx — ADDU Nation Alumni Home View
// 3-column Daily Snapshot + Recent Activity
// SolidJS: For loop, Show, createSignal

import { createSignal, For, Show } from "solid-js";

// ── Sample data ──────────────────────────────────────────────────────────────

const jobRecommendations = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    salary: "$140k–$180k",
    tag: "Remote",
    tagColor: "#059669",
    tagBg: "#ecfdf5",
    logo: "G",
    logoBg: "#4285F4",
  },
  {
    id: 2,
    title: "UX Researcher",
    company: "Spotify",
    location: "New York, NY",
    type: "Contract",
    salary: "$110k–$145k",
    tag: "Hybrid",
    tagColor: "#d97706",
    tagBg: "#fffbeb",
    logo: "S",
    logoBg: "#1DB954",
  },
  {
    id: 3,
    title: "Frontend Engineer",
    company: "Figma",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k–$160k",
    tag: "On-site",
    tagColor: "#7c3aed",
    tagBg: "#f5f3ff",
    logo: "F",
    logoBg: "#F24E1E",
  },
];

const activityItems = [
  {
    id: 1,
    icon: "message",
    iconBg: "#EBF1FD",
    iconColor: "#135BEC",
    title: "New Mentor Message",
    sub: "Dr. Reyes replied to your inquiry about career transitions",
    time: "15m ago",
    dot: true,
  },
  {
    id: 2,
    icon: "donate",
    iconBg: "#fff1f2",
    iconColor: "#E11D48",
    title: "Donation Opportunity",
    sub: "Support the Robotics Team — ₱5,000 goal remaining",
    time: "1h ago",
    dot: true,
  },
  {
    id: 3,
    icon: "job",
    iconBg: "#fffbeb",
    iconColor: "#f59e0b",
    title: "Job Application Update",
    sub: 'Your application for "Project Manager" was viewed',
    time: "1d ago",
    dot: false,
  },
  {
    id: 4,
    icon: "doc",
    iconBg: "#ecfdf5",
    iconColor: "#059669",
    title: "Donation Receipt Ready",
    sub: "Thank you for your contribution to the ADDU Scholarship Fund",
    time: "2d ago",
    dot: false,
  },
];

// ── Icon helper ───────────────────────────────────────────────────────────────

function ActivityIcon(props) {
  const icons = {
    message: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    donate: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
    job: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      </svg>
    ),
    doc: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={props.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  };
  return icons[props.type] || null;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function JobCard(props) {
  return (
    <div
      style="
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        transition: box-shadow 0.15s;
      "
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Company + bookmark */}
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style={`width:38px;height:38px;border-radius:10px;background:${props.job.logoBg};display:flex;align-items:center;justify-content:center;color:white;font-size:15px;font-weight:700;`}>
          {props.job.logo}
        </div>
        <button style="background:none;border:none;cursor:pointer;padding:4px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
          </svg>
        </button>
      </div>

      {/* Title + company */}
      <div>
        <p style="font-size:13px;font-weight:700;color:#111827;line-height:1.3;margin-bottom:2px;">{props.job.title}</p>
        <p style="font-size:11.5px;color:#6b7280;">{props.job.company} · {props.job.location}</p>
      </div>

      {/* Tags */}
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <span style="font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px;background:#f3f4f6;color:#374151;">{props.job.salary}</span>
        <span style="font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px;background:#f3f4f6;color:#374151;">{props.job.type}</span>
        <span style={`font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px;background:${props.job.tagBg};color:${props.job.tagColor};`}>{props.job.tag}</span>
      </div>

      {/* Apply button */}
      <button
        style="
          width:100%;
          padding:9px;
          background:#040354;
          color:white;
          border:none;
          border-radius:10px;
          font-size:12px;
          font-weight:600;
          cursor:pointer;
          transition:background 0.15s;
          margin-top:2px;
        "
        onMouseEnter={e => e.currentTarget.style.background = "#135BEC"}
        onMouseLeave={e => e.currentTarget.style.background = "#040354"}
      >
        Apply Now
      </button>
    </div>
  );
}

// ── Main HomeView export ──────────────────────────────────────────────────────

export default function HomeView() {
  const [savedJobs, setSavedJobs] = createSignal([]);

  return (
    <div style="padding: 32px; background: #F9FAFB; min-height: 100%;">

      {/* Welcome banner */}
      <div
        style="
          background: #040354;
          border-radius: 20px;
          padding: 28px 36px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        "
      >
        <div style="position:absolute;right:-30px;top:-30px;width:200px;height:200px;border-radius:50%;background:rgba(19,91,236,0.25);" />
        <div style="position:absolute;right:80px;bottom:-50px;width:150px;height:150px;border-radius:50%;background:rgba(19,91,236,0.15);" />
        <div style="position:relative;z-index:1;">
          <p style="color:rgba(255,255,255,0.6);font-size:13px;margin-bottom:4px;">Welcome back,</p>
          <h1 style="color:white;font-size:28px;font-weight:700;letter-spacing:-0.02em;margin-bottom:6px;">Hello, Alex!</h1>
          <p style="color:rgba(255,255,255,0.5);font-size:13px;">Your alumni community awaits. Here's your daily snapshot.</p>
        </div>
        <div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.1);border:2px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;color:white;font-size:18px;font-weight:700;position:relative;z-index:1;flex-shrink:0;">
          AX
        </div>
      </div>

      {/* Section header */}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h2 style="font-size:18px;font-weight:700;color:#040354;letter-spacing:-0.01em;">Your Daily Snapshot</h2>
        <button style="font-size:12px;color:#135BEC;font-weight:500;background:none;border:none;cursor:pointer;">View All →</button>
      </div>

      {/* ── 3-Column Snapshot Grid ── */}
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;margin-bottom:32px;align-items:start;">

        {/* Column 1 — Jobs */}
        <div
          style="
            background: white;
            border-radius: 20px;
            border: 1px solid #e5e7eb;
            padding: 20px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          "
        >
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px;">
                <div style="width:32px;height:32px;border-radius:9px;background:#EBF1FD;display:flex;align-items:center;justify-content:center;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#135BEC" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                </div>
                <p style="font-size:13px;font-weight:700;color:#040354;">Jobs for You</p>
              </div>
              <p style="font-size:11px;color:#9ca3af;padding-left:40px;">Based on your major</p>
            </div>
            <span style="background:#EBF1FD;color:#135BEC;font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;">
              {jobRecommendations.length} new
            </span>
          </div>

          {/* Job cards via <For> */}
          <div style="display:flex;flex-direction:column;gap:10px;">
            <For each={jobRecommendations}>
              {(job) => <JobCard job={job} />}
            </For>
          </div>

          <button style="width:100%;padding:10px;background:#f9fafb;border:1px dashed #e5e7eb;border-radius:12px;font-size:12px;color:#6b7280;cursor:pointer;margin-top:10px;font-weight:500;">
            Browse All Jobs →
          </button>
        </div>

        {/* Column 2 — Verification */}
        <div
          style="
            background: white;
            border-radius: 20px;
            border: 1px solid #e5e7eb;
            padding: 20px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
            display: flex;
            flex-direction: column;
            gap: 20px;
          "
        >
          {/* Verified Badge */}
          <div style="text-align:center;padding:24px 16px;background:linear-gradient(135deg,#fffbeb,#fef3c7);border-radius:16px;border:1px solid #fde68a;">
            <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <p style="font-size:16px;font-weight:700;color:#92400e;margin-bottom:4px;">Verified Alumni</p>
            <p style="font-size:11px;color:#b45309;">Ateneo de Davao University</p>
            <div style="margin-top:12px;background:rgba(0,0,0,0.06);border-radius:20px;padding:4px 14px;display:inline-block;">
              <p style="font-size:10px;font-weight:700;color:#78350f;letter-spacing:0.04em;">CLASS OF 2018</p>
            </div>
          </div>

          {/* Profile completion */}
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <p style="font-size:13px;font-weight:600;color:#040354;">Profile Completion</p>
              <p style="font-size:18px;font-weight:700;color:#f59e0b;">95%</p>
            </div>
            <div style="height:8px;background:#f3f4f6;border-radius:99px;overflow:hidden;margin-bottom:8px;">
              <div style="height:100%;width:95%;background:linear-gradient(90deg,#f59e0b,#fbbf24);border-radius:99px;" />
            </div>
            <p style="font-size:11px;color:#9ca3af;">Add your bio to reach 100%</p>
          </div>

          {/* Profile stats */}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            {[
              { label: "Connections", value: "142", icon: "👥" },
              { label: "Posts", value: "18", icon: "📝" },
              { label: "Donations", value: "₱3,200", icon: "💝" },
              { label: "Events", value: "7", icon: "📅" },
            ].map(s => (
              <div style="background:#f9fafb;border-radius:12px;padding:12px;text-align:center;">
                <p style="font-size:16px;margin-bottom:2px;">{s.icon}</p>
                <p style="font-size:14px;font-weight:700;color:#040354;">{s.value}</p>
                <p style="font-size:10px;color:#9ca3af;">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Complete profile CTA */}
          <button style="width:100%;padding:11px;background:#040354;color:white;border:none;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;">
            Complete Profile
          </button>
        </div>

        {/* Column 3 — Activity */}
        <div
          style="
            background: white;
            border-radius: 20px;
            border: 1px solid #e5e7eb;
            padding: 20px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          "
        >
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:32px;height:32px;border-radius:9px;background:#fff1f2;display:flex;align-items:center;justify-content:center;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E11D48" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <p style="font-size:13px;font-weight:700;color:#040354;">Recent Activity</p>
            </div>
            <button style="font-size:11px;color:#135BEC;font-weight:600;background:none;border:none;cursor:pointer;">See All</button>
          </div>

          {/* Activity list via <For> */}
          <div style="display:flex;flex-direction:column;gap:2px;">
            <For each={activityItems}>
              {(item) => (
                <div
                  style="
                    display:flex;
                    align-items:flex-start;
                    gap:12px;
                    padding:12px;
                    border-radius:12px;
                    cursor:pointer;
                    transition:background 0.1s;
                    position:relative;
                  "
                  onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Icon */}
                  <div
                    style={`
                      width:38px;height:38px;border-radius:11px;
                      background:${item.iconBg};
                      display:flex;align-items:center;justify-content:center;
                      flex-shrink:0;
                    `}
                  >
                    <ActivityIcon type={item.icon} color={item.iconColor} />
                  </div>

                  {/* Content */}
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;justify-content:space-between;align-items:start;gap:6px;">
                      <p style="font-size:12.5px;font-weight:600;color:#111827;line-height:1.3;">{item.title}</p>
                      <p style="font-size:10px;color:#d1d5db;flex-shrink:0;">{item.time}</p>
                    </div>
                    <p style="font-size:11px;color:#9ca3af;margin-top:2px;line-height:1.4;">{item.sub}</p>
                  </div>

                  {/* Rose notification dot */}
                  <Show when={item.dot}>
                    <div style="position:absolute;top:14px;right:12px;width:7px;height:7px;border-radius:50%;background:#E11D48;" />
                  </Show>
                </div>
              )}
            </For>
          </div>

          {/* Donation opportunity highlight */}
          <div
            style="
              margin-top:14px;
              background:#fff1f2;
              border:1px solid #fecdd3;
              border-radius:14px;
              padding:14px;
            "
          >
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#E11D48"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
              <p style="font-size:11px;font-weight:700;color:#E11D48;letter-spacing:0.03em;">FEATURED CAUSE</p>
            </div>
            <p style="font-size:12.5px;font-weight:600;color:#9f1239;margin-bottom:4px;">Robotics Team — Regional Competition</p>
            <p style="font-size:11px;color:#be123c;margin-bottom:10px;">₱5,000 goal · 68% funded</p>
            <div style="height:5px;background:rgba(225,29,72,0.15);border-radius:99px;overflow:hidden;margin-bottom:10px;">
              <div style="height:100%;width:68%;background:#E11D48;border-radius:99px;" />
            </div>
            <button style="width:100%;padding:8px;background:#E11D48;color:white;border:none;border-radius:9px;font-size:12px;font-weight:600;cursor:pointer;">
              Donate Now
            </button>
          </div>
        </div>

      </div>{/* end 3-col grid */}
    </div>
  );
}