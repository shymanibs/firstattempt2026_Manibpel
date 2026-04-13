// impact.jsx — ADDU Nation · Your Impact
// Donation Timeline + Total Impact Card + Project Updates
// SolidJS: For, Show, createSignal

import { createSignal, For, Show } from "solid-js";

const CATEGORY_META = {
  STEM:         { color: "#135BEC", bg: "#EBF1FD", abbr: "ST" },
  Arts:         { color: "#d97706", bg: "#fffbeb", abbr: "AR" },
  Scholarship:  { color: "#7c3aed", bg: "#f5f3ff", abbr: "SC" },
  Agriculture:  { color: "#059669", bg: "#ecfdf5", abbr: "AG" },
  Health:       { color: "#0891b2", bg: "#ecfeff", abbr: "HL" },
  Community:    { color: "#E11D48", bg: "#fff1f2", abbr: "CM" },
};

const pastDonations = [
  { id: 1, project: "Ateneo Robotics: National Competition", category: "STEM",        amount: 5000, date: "March 28, 2026",   dateShort: "Mar 28",  receipt: "TXN-2026-0328-001", status: "Milestone Met",  statusColor: "#059669", statusBg: "#ecfdf5", studentsHelped: 12 },
  { id: 2, project: "Alumni Scholarship Fund 2026",         category: "Scholarship",  amount: 3500, date: "Feb 14, 2026",     dateShort: "Feb 14",  receipt: "TXN-2026-0214-007", status: "Active",         statusColor: "#135BEC", statusBg: "#EBF1FD", studentsHelped: 3  },
  { id: 3, project: "Urban Garden Initiative",              category: "Agriculture",  amount: 2000, date: "Jan 5, 2026",      dateShort: "Jan 5",   receipt: "TXN-2026-0105-003", status: "Completed",      statusColor: "#059669", statusBg: "#ecfdf5", studentsHelped: 8  },
  { id: 4, project: "Rondalla & Cultural Arts Revival",     category: "Arts",         amount: 1500, date: "Dec 10, 2025",     dateShort: "Dec 10",  receipt: "TXN-2025-1210-012", status: "Active",         statusColor: "#135BEC", statusBg: "#EBF1FD", studentsHelped: 5  },
  { id: 5, project: "Campus Health & Wellness Center",      category: "Health",       amount: 500,  date: "Nov 22, 2025",     dateShort: "Nov 22",  receipt: "TXN-2025-1122-008", status: "Milestone Met",  statusColor: "#059669", statusBg: "#ecfdf5", studentsHelped: 20 },
];

const projectUpdates = [
  {
    id: 1,
    project: "Ateneo Robotics: National Competition",
    category: "STEM",
    gradient: "linear-gradient(135deg, #040354 0%, #135BEC 100%)",
    headline: "🎉 Goal Reached! We're Going to Nationals!",
    message: "Thanks to 84 incredible alumni donors like you, our Robotics Team has secured full funding for the National Competition in Manila. Your ₱5,000 directly funded our sensor array upgrade. We qualified in the top 3 regionally — this wouldn't have happened without you!",
    author: "Maria Santos",
    role: "Team Lead · Class of 2027",
    date: "April 2, 2026",
    milestone: "MILESTONE MET",
    milestoneColor: "#059669",
    supporters: 84,
  },
  {
    id: 2,
    project: "Alumni Scholarship Fund 2026",
    category: "Scholarship",
    gradient: "linear-gradient(135deg, #3b0764 0%, #7c3aed 100%)",
    headline: "12 Scholars Selected for AY 2026–2027",
    message: "We are proud to announce the 12 recipients of the Alumni Scholarship Fund for this academic year. Your generosity made it possible for first-generation college students from Davao to pursue their dreams.",
    author: "Office of Alumni Affairs",
    role: "ADDU Scholarship Committee",
    date: "March 15, 2026",
    milestone: "IN PROGRESS — 43% FUNDED",
    milestoneColor: "#7c3aed",
    supporters: 312,
  },
  {
    id: 3,
    project: "Urban Garden Initiative",
    category: "Agriculture",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
    headline: "First Harvest Complete — 68kg of Fresh Produce!",
    message: "The Urban Garden is officially thriving! Our first harvest yielded 68 kilograms of vegetables now being distributed to the campus cafeteria and nearby communities. Your contribution helped purchase seedlings, soil, and irrigation tools.",
    author: "Lena Gomez",
    role: "Project Coordinator · BS Agriculture '28",
    date: "February 28, 2026",
    milestone: "COMPLETED",
    milestoneColor: "#059669",
    supporters: 47,
  },
];

// ── Stat card ────────────────────────────────────────────────────────────────

function ImpactStat(props) {
  return (
    <div style={`background:${props.bg || "white"};border:1px solid ${props.borderColor || "#e5e7eb"};border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:6px;flex:1;min-width:0;`}>
      <div style={`width:38px;height:38px;border-radius:10px;background:${props.iconBg};display:flex;align-items:center;justify-content:center;margin-bottom:4px;`}>
        {props.icon}
      </div>
      <p style={`font-size:22px;font-weight:800;color:${props.valueColor || "#040354"};letter-spacing:-0.03em;line-height:1;`}>{props.value}</p>
      <p style="font-size:12px;color:#6b7280;line-height:1.4;">{props.label}</p>
    </div>
  );
}

// ── Update card ──────────────────────────────────────────────────────────────

function UpdateCard(props) {
  const u = props.update;
  const meta = CATEGORY_META[u.category] || { color: "#135BEC", bg: "#EBF1FD" };
  const [expanded, setExpanded] = createSignal(false);

  return (
    <div style="background:white;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
      <div style={`height:120px;background:${u.gradient};position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;`}>
        <div style="position:absolute;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,0.07);top:-50px;right:-30px;"/>
        <div style="position:absolute;top:10px;left:10px;display:flex;align-items:center;gap:5px;background:rgba(0,0,0,0.35);padding:4px 10px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);">
          <span style={`font-size:9px;font-weight:800;letter-spacing:0.06em;color:white;`}>{u.milestone}</span>
        </div>
        <div style={`position:absolute;top:10px;right:10px;background:${meta.bg};color:${meta.color};font-size:9px;font-weight:700;letter-spacing:0.05em;padding:4px 10px;border-radius:20px;`}>
          {u.category}
        </div>
      </div>

      <div style="padding:16px 18px;">
        <p style="font-size:11px;color:#9ca3af;margin-bottom:5px;">{u.project}</p>
        <h3 style="font-size:13.5px;font-weight:700;color:#040354;line-height:1.35;margin-bottom:10px;">{u.headline}</h3>
        <p style={`font-size:12px;color:#6b7280;line-height:1.7;margin-bottom:8px;${!expanded() ? "display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;" : ""}`}>
          {u.message}
        </p>
        <button onClick={() => setExpanded(!expanded())} style="font-size:11px;font-weight:600;color:#135BEC;background:none;border:none;cursor:pointer;padding:0;margin-bottom:12px;">
          {expanded() ? "Show less ↑" : "Read more →"}
        </button>

        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid #f3f4f6;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#040354,#135BEC);display:flex;align-items:center;justify-content:center;color:white;font-size:10px;font-weight:700;">
              {u.author.split(" ").map(w => w[0]).join("").slice(0,2)}
            </div>
            <div>
              <p style="font-size:12px;font-weight:600;color:#111827;line-height:1.2;">{u.author}</p>
              <p style="font-size:10px;color:#9ca3af;line-height:1.2;">{u.role}</p>
            </div>
          </div>
          <div style="text-align:right;">
            <p style="font-size:10px;color:#9ca3af;">{u.date}</p>
            <p style="font-size:10px;color:#6b7280;margin-top:2px;">{u.supporters} supporters</p>
          </div>
        </div>

        <button
          style="width:100%;margin-top:12px;padding:10px;border-radius:10px;background:#040354;color:white;border:none;cursor:pointer;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;transition:background 0.15s;"
          onMouseEnter={(e) => { e.currentTarget.style.background = "#135BEC"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#040354"; }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          Send a Good Luck Message
        </button>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function ImpactView() {
  const totalAmount = pastDonations.reduce((s, d) => s + d.amount, 0);
  const totalStudents = pastDonations.reduce((s, d) => s + d.studentsHelped, 0);
  const projectCount = new Set(pastDonations.map(d => d.project)).size;
  const milestonesmet = pastDonations.filter(d => d.status === "Milestone Met").length;

  return (
    <div style="padding:32px;background:#F9FAFB;min-height:100%;">

      {/* Hero */}
      <div style="background:#040354;border-radius:20px;padding:32px 36px;margin-bottom:28px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden;">
        <div style="position:absolute;right:-40px;top:-40px;width:260px;height:260px;border-radius:50%;background:rgba(19,91,236,0.2);"/>
        <div style="position:absolute;right:100px;bottom:-70px;width:180px;height:180px;border-radius:50%;background:rgba(19,91,236,0.12);"/>
        <div style="position:relative;z-index:1;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
            <div style="width:30px;height:30px;border-radius:50%;background:rgba(5,150,105,0.25);border:1px solid rgba(5,150,105,0.4);display:flex;align-items:center;justify-content:center;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span style="font-size:11px;font-weight:700;color:#34d399;letter-spacing:0.06em;">YOUR IMPACT RECORD</span>
          </div>
          <h1 style="color:white;font-size:24px;font-weight:700;letter-spacing:-0.02em;margin-bottom:8px;line-height:1.2;">
            You Made a Difference,<br/>Alex!
          </h1>
          <p style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.6;max-width:380px;">
            Your contributions are fueling real change for ADDU students. Here's a look at the impact your generosity has made.
          </p>
        </div>
        <div style="position:relative;z-index:1;flex-shrink:0;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:24px 28px;text-align:center;">
          <p style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:0.06em;margin-bottom:6px;">TOTAL CONTRIBUTED</p>
          <p style="font-size:30px;font-weight:800;color:white;letter-spacing:-0.03em;line-height:1;">₱{totalAmount.toLocaleString()}</p>
          <p style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:6px;">across {pastDonations.length} donations</p>
        </div>
      </div>

      {/* Stats row */}
      <div style="display:flex;gap:14px;margin-bottom:28px;">
        <ImpactStat value={`₱${totalAmount.toLocaleString()}`} label="Total amount contributed" iconBg="#EBF1FD" valueColor="#040354"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#135BEC" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>} />
        <ImpactStat value={projectCount} label="Student projects supported" iconBg="#fff1f2" valueColor="#040354"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E11D48" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>} />
        <ImpactStat value={totalStudents} label="Students directly helped" iconBg="#ecfdf5" valueColor="#059669"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>} />
        <ImpactStat value={milestonesmet} label="Milestones reached with your help" iconBg="#ecfdf5" valueColor="#059669"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>} />
      </div>

      {/* Main 2-col layout: Timeline left, Impact card right */}
      <div style="display:grid;grid-template-columns:1fr 1.5fr;gap:22px;margin-bottom:28px;align-items:start;">

        {/* ── Donation Timeline ── */}
        <div style="background:white;border-radius:20px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
          <div style="padding:18px 20px 14px;border-bottom:1px solid #f3f4f6;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <h2 style="font-size:14px;font-weight:700;color:#040354;margin:0 0 2px;">Donation Timeline</h2>
              <p style="font-size:11px;color:#9ca3af;margin:0;">{pastDonations.length} contributions</p>
            </div>
            <button style="font-size:11px;color:#135BEC;font-weight:600;background:none;border:none;cursor:pointer;">
              Download All
            </button>
          </div>

          {/* Timeline list */}
          <div style="padding:18px 20px;">
            <div style="position:relative;">
              {/* Vertical line */}
              <div style="position:absolute;left:17px;top:4px;bottom:4px;width:1.5px;background:#f3f4f6;border-radius:99px;"/>

              <For each={pastDonations}>
                {(d, i) => {
                  const meta = CATEGORY_META[d.category];
                  return (
                    <div style={`display:flex;gap:14px;align-items:flex-start;${i() < pastDonations.length - 1 ? "margin-bottom:20px;" : ""}`}>
                      {/* Timeline dot */}
                      <div
                        style={`
                          width:34px;height:34px;border-radius:10px;flex-shrink:0;
                          background:${meta.bg};
                          border:2px solid ${meta.color}40;
                          display:flex;align-items:center;justify-content:center;
                          font-size:9px;font-weight:800;color:${meta.color};
                          position:relative;z-index:1;
                        `}
                      >
                        {meta.abbr}
                      </div>

                      <div style="flex:1;min-width:0;">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                          <div style="flex:1;min-width:0;">
                            <p style="font-size:12.5px;font-weight:600;color:#040354;line-height:1.3;margin:0 0 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                              {d.project.split(":")[0].trim()}
                            </p>
                            <p style="font-size:10.5px;color:#9ca3af;margin:0;">{d.date}</p>
                          </div>
                          <div style="text-align:right;flex-shrink:0;">
                            <p style="font-size:13px;font-weight:700;color:#135BEC;margin:0;">₱{d.amount.toLocaleString()}</p>
                            <span style={`font-size:9px;font-weight:700;padding:2px 7px;border-radius:20px;background:${d.statusBg};color:${d.statusColor};display:inline-block;margin-top:3px;`}>
                              {d.status}
                            </span>
                          </div>
                        </div>
                        {/* Receipt */}
                        <p style="font-size:9.5px;color:#d1d5db;margin:4px 0 0;font-family:monospace;">{d.receipt}</p>
                        {/* Students helped indicator */}
                        <div style="display:flex;align-items:center;gap:4px;margin-top:5px;">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                          <span style="font-size:10px;color:#059669;font-weight:600;">{d.studentsHelped} students helped</span>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>
          </div>
        </div>

        {/* ── Total Impact card ── */}
        <div
          style="
            background: linear-gradient(135deg, #040354 0%, #0d1b7a 100%);
            border-radius: 20px; padding: 28px;
            box-shadow: 0 8px 32px rgba(4,3,84,0.2);
          "
        >
          <div style="width:52px;height:52px;border-radius:14px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;margin-bottom:18px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10" stroke-width="2"/>
            </svg>
          </div>

          <h3 style="color:white;font-size:19px;font-weight:700;letter-spacing:-0.02em;margin-bottom:6px;line-height:1.3;">
            Impact Achieved:<br/>₱{totalAmount.toLocaleString()} Given
          </h3>
          <p style="color:rgba(255,255,255,0.5);font-size:12.5px;line-height:1.7;margin-bottom:20px;">
            Your generosity funded sensor arrays, scholarship slots, a thriving garden, and wellness resources — impacting <strong style="color:white;">{totalStudents} students</strong> directly.
          </p>

          {/* Students helped visual bar */}
          <div style="background:rgba(255,255,255,0.06);border-radius:14px;padding:16px;margin-bottom:18px;">
            <p style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.06em;margin-bottom:12px;">STUDENTS HELPED BY PROJECT</p>
            {pastDonations.map((d) => {
              const meta = CATEGORY_META[d.category];
              const pct = Math.round((d.studentsHelped / totalStudents) * 100);
              return (
                <div style="margin-bottom:10px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                    <span style="font-size:10.5px;color:rgba(255,255,255,0.65);font-weight:500;">{d.project.split(":")[0].trim()}</span>
                    <span style={`font-size:10px;font-weight:700;color:${meta.color};`}>{d.studentsHelped} students</span>
                  </div>
                  <div style="height:5px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;">
                    <div style={`height:100%;border-radius:99px;background:${meta.color};width:${pct}%;transition:width 0.5s;`}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Donor avatars */}
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
            <div style="display:flex;">
              {["AR", "MG", "JL", "KP"].map((initials, i) => (
                <div style={`width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,hsl(${i*60+200},70%,45%),hsl(${i*60+220},70%,55%));border:2px solid #040354;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:white;margin-left:${i>0?"-8px":"0"};position:relative;z-index:${4-i};`}>
                  {initials}
                </div>
              ))}
              <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.15);border:2px solid #040354;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:white;margin-left:-8px;">+28</div>
            </div>
            <p style="color:rgba(255,255,255,0.45);font-size:11px;">fellow alumni also donated</p>
          </div>

          {/* Breakdown pills */}
          <div style="display:flex;flex-direction:column;gap:8px;">
            {pastDonations.slice(0,3).map((d) => (
              <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.07);border-radius:10px;padding:10px 14px;">
                <div>
                  <p style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.85);line-height:1.2;">{d.project.split(":")[0].trim()}</p>
                  <p style="font-size:9.5px;color:rgba(255,255,255,0.35);margin-top:1px;">{d.dateShort}</p>
                </div>
                <span style="font-size:13px;font-weight:700;color:#60a5fa;">₱{d.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Updates */}
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <h2 style="font-size:18px;font-weight:700;color:#040354;letter-spacing:-0.01em;">Project Updates</h2>
          <span style="font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;background:#EBF1FD;color:#135BEC;">{projectUpdates.length} new updates</span>
        </div>
        <p style="font-size:13px;color:#9ca3af;margin-bottom:18px;">Messages from the students and teams you've supported.</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;">
          <For each={projectUpdates}>
            {(update) => <UpdateCard update={update} />}
          </For>
        </div>
      </div>

    </div>
  );
}