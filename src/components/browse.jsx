// browse.jsx — ADDU Nation · Browse Projects (Donation Hub)
// SolidJS: createSignal, For, Show

import { createSignal, For, Show, createMemo } from "solid-js";

const CATEGORIES = ["All", "STEM", "Arts", "Scholarship", "Agriculture", "Health", "Community"];

const CATEGORY_META = {
  STEM:         { color: "#135BEC", bg: "#EBF1FD" },
  Arts:         { color: "#d97706", bg: "#fffbeb" },
  Scholarship:  { color: "#7c3aed", bg: "#f5f3ff" },
  Agriculture:  { color: "#059669", bg: "#ecfdf5" },
  Health:       { color: "#0891b2", bg: "#ecfeff" },
  Community:    { color: "#E11D48", bg: "#fff1f2" },
};

const projects = [
  {
    id: 1,
    title: "Ateneo Robotics: National Finals 2026",
    category: "STEM",
    goal: 85000,
    raised: 71250,
    supporters: 84,
    daysLeft: 12,
    description: "Help our robotics team compete at the national level with upgraded sensors and travel expenses covered.",
    gradient: "linear-gradient(135deg, #040354 0%, #135BEC 100%)",
    featured: true,
  },
  {
    id: 2,
    title: "Alumni Scholarship Fund 2026",
    category: "Scholarship",
    goal: 500000,
    raised: 215000,
    supporters: 312,
    daysLeft: 45,
    description: "Fund 12 first-generation college students for the full academic year.",
    gradient: "linear-gradient(135deg, #3b0764 0%, #7c3aed 100%)",
    featured: true,
  },
  {
    id: 3,
    title: "Rondalla & Cultural Arts Revival",
    category: "Arts",
    goal: 35000,
    raised: 28700,
    supporters: 63,
    daysLeft: 8,
    description: "Restore our Rondalla instruments and fund performances for the ADDU centennial celebration.",
    gradient: "linear-gradient(135deg, #78350f 0%, #d97706 100%)",
  },
  {
    id: 4,
    title: "Urban Garden Initiative",
    category: "Agriculture",
    goal: 42000,
    raised: 42000,
    supporters: 47,
    daysLeft: 0,
    description: "Transform unused campus space into a productive organic garden serving students and community.",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 100%)",
    completed: true,
  },
  {
    id: 5,
    title: "Campus Health & Wellness Center",
    category: "Health",
    goal: 200000,
    raised: 88000,
    supporters: 156,
    daysLeft: 30,
    description: "Equip a dedicated mental health and wellness space for all ADDU students.",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0891b2 100%)",
  },
  {
    id: 6,
    title: "Community Livelihood Program",
    category: "Community",
    goal: 60000,
    raised: 18400,
    supporters: 29,
    daysLeft: 60,
    description: "Skill-training workshops for communities surrounding the Ateneo campus in Davao.",
    gradient: "linear-gradient(135deg, #881337 0%, #E11D48 100%)",
  },
];

function ProjectCard(props) {
  const p = props.project;
  const meta = CATEGORY_META[p.category] || { color: "#135BEC", bg: "#EBF1FD" };
  const pct = Math.min(100, Math.round((p.raised / p.goal) * 100));
  const [donating, setDonating] = createSignal(false);
  const [amount, setAmount] = createSignal("");
  const [donated, setDonated] = createSignal(false);

  const handleDonate = () => {
    if (!amount() || isNaN(Number(amount())) || Number(amount()) <= 0) return;
    setDonated(true);
    setDonating(false);
  };

  return (
    <div
      style="
        background: white;
        border-radius: 20px;
        border: 1px solid #e5e7eb;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: box-shadow 0.2s, transform 0.15s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      "
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(4,3,84,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {/* Gradient header */}
      <div style={`height: 120px; background: ${p.gradient}; position: relative; overflow: hidden;`}>
        <div style="position:absolute;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,0.07);top:-60px;right:-40px;"/>
        <div style="position:absolute;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,0.05);bottom:-30px;left:-20px;"/>

        {/* Featured badge */}
        {p.featured && (
          <div style="position:absolute;top:10px;left:10px;background:rgba(225,29,72,0.85);padding:3px 9px;border-radius:20px;font-size:9px;font-weight:800;color:white;letter-spacing:0.06em;">
            ★ FEATURED
          </div>
        )}
        {p.completed && (
          <div style="position:absolute;top:10px;left:10px;background:rgba(5,150,105,0.85);padding:3px 9px;border-radius:20px;font-size:9px;font-weight:800;color:white;letter-spacing:0.06em;">
            ✓ COMPLETED
          </div>
        )}

        {/* Category */}
        <div style={`position:absolute;top:10px;right:10px;background:${meta.bg};color:${meta.color};font-size:9px;font-weight:700;letter-spacing:0.05em;padding:3px 9px;border-radius:20px;`}>
          {p.category.toUpperCase()}
        </div>

        {/* Days left */}
        {!p.completed && (
          <div style="position:absolute;bottom:10px;right:10px;background:rgba(0,0,0,0.35);padding:3px 9px;border-radius:20px;font-size:10px;font-weight:600;color:white;">
            {p.daysLeft}d left
          </div>
        )}
      </div>

      {/* Body */}
      <div style="padding: 16px 18px; flex: 1; display: flex; flex-direction: column; gap: 10px;">
        <h3 style="font-size: 14px; font-weight: 700; color: #040354; line-height: 1.35; margin: 0;">{p.title}</h3>
        <p style="font-size: 12px; color: #6b7280; line-height: 1.6; margin: 0; flex: 1;">{p.description}</p>

        {/* Progress */}
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
            <span style="font-size:12px;font-weight:700;color:#040354;">₱{p.raised.toLocaleString()}</span>
            <span style="font-size:11px;color:#9ca3af;">of ₱{p.goal.toLocaleString()}</span>
          </div>
          <div style="height:5px;background:#f3f4f6;border-radius:99px;overflow:hidden;">
            <div style={`height:100%;border-radius:99px;background:${p.completed ? "#059669" : "linear-gradient(90deg,#135BEC,#3b82f6)"};width:${pct}%;transition:width 0.5s;`}/>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:5px;">
            <span style={`font-size:11px;font-weight:600;color:${p.completed ? "#059669" : "#135BEC"};`}>{pct}% funded</span>
            <span style="font-size:11px;color:#9ca3af;">{p.supporters} supporters</span>
          </div>
        </div>

        {/* Donate area */}
        {!p.completed && !donated() && !donating() && (
          <button
            onClick={() => setDonating(true)}
            style="
              width:100%;padding:11px;border-radius:12px;border:none;
              background:#040354;color:white;
              font-size:13px;font-weight:600;cursor:pointer;
              transition:background 0.15s;
            "
            onMouseEnter={(e) => { e.currentTarget.style.background = "#135BEC"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#040354"; }}
          >
            Donate Now
          </button>
        )}

        {donating() && (
          <div style="display:flex;gap:7px;">
            <div style="position:relative;flex:1;">
              <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:13px;font-weight:700;color:#6b7280;">₱</span>
              <input
                type="number"
                placeholder="Amount"
                value={amount()}
                onInput={(e) => setAmount(e.currentTarget.value)}
                style="width:100%;box-sizing:border-box;padding:10px 10px 10px 26px;border-radius:10px;border:1.5px solid #135BEC;background:white;font-size:13px;color:#040354;outline:none;"
                autofocus
              />
            </div>
            <button
              onClick={handleDonate}
              style="padding:10px 14px;border-radius:10px;border:none;background:#135BEC;color:white;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;"
            >
              Send ↗
            </button>
            <button
              onClick={() => { setDonating(false); setAmount(""); }}
              style="padding:10px 12px;border-radius:10px;border:1.5px solid #e5e7eb;background:white;color:#6b7280;font-size:12px;cursor:pointer;"
            >
              ✕
            </button>
          </div>
        )}

        {donated() && (
          <div style="background:#ecfdf5;border:1px solid #bbf7d0;border-radius:12px;padding:12px;text-align:center;">
            <p style="font-size:13px;font-weight:700;color:#059669;margin:0;">Thank you for your donation! 🎉</p>
            <p style="font-size:11px;color:#6b7280;margin:4px 0 0;">You'll receive a receipt by email.</p>
          </div>
        )}

        {p.completed && (
          <div style="background:#ecfdf5;border:1px solid #bbf7d0;border-radius:12px;padding:10px;text-align:center;">
            <p style="font-size:12px;font-weight:600;color:#059669;margin:0;">Goal reached — project completed!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrowseProjectsView() {
  const [activeCategory, setActiveCategory] = createSignal("All");
  const [search, setSearch] = createSignal("");

  const filtered = createMemo(() =>
    projects.filter((p) => {
      const catMatch = activeCategory() === "All" || p.category === activeCategory();
      const q = search().toLowerCase();
      const searchMatch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return catMatch && searchMatch;
    })
  );

  const totalRaised = projects.reduce((s, p) => s + p.raised, 0);
  const totalSupporters = projects.reduce((s, p) => s + p.supporters, 0);

  return (
    <div style="padding: 32px; background: #F9FAFB; min-height: 100%;">

      {/* Banner */}
      <div
        style="
          background: #040354; border-radius: 20px;
          padding: 28px 36px; margin-bottom: 28px;
          display: flex; align-items: center; justify-content: space-between;
          position: relative; overflow: hidden;
        "
      >
        <div style="position:absolute;right:-40px;top:-40px;width:240px;height:240px;border-radius:50%;background:rgba(19,91,236,0.2);"/>
        <div style="position:absolute;right:90px;bottom:-60px;width:160px;height:160px;border-radius:50%;background:rgba(19,91,236,0.12);"/>
        <div style="position:relative;z-index:1;">
          <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(225,29,72,0.2);border:1px solid rgba(225,29,72,0.3);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;color:#fda4af;letter-spacing:0.05em;margin-bottom:12px;">
            ♥ DONATE
          </div>
          <h1 style="color:white;font-size:22px;font-weight:700;letter-spacing:-0.02em;margin-bottom:6px;">
            Support Student Projects
          </h1>
          <p style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.6;max-width:360px;">
            Every peso you give directly funds a student's dream. Browse active campaigns and make your gift today.
          </p>
        </div>

        {/* Stats */}
        <div style="position:relative;z-index:1;display:flex;gap:16px;flex-shrink:0;">
          {[
            { value: `₱${(totalRaised / 1000).toFixed(0)}k`, label: "raised total" },
            { value: totalSupporters, label: "donors" },
            { value: projects.length, label: "live projects" },
          ].map((s) => (
            <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:16px 20px;text-align:center;">
              <p style="font-size:22px;font-weight:800;color:white;line-height:1;">{s.value}</p>
              <p style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:4px;">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search + Filter */}
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
        {/* Search */}
        <div style="position:relative;flex:1;min-width:200px;max-width:320px;">
          <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            value={search()}
            onInput={(e) => setSearch(e.currentTarget.value)}
            style="width:100%;box-sizing:border-box;padding:10px 12px 10px 34px;border-radius:12px;border:1.5px solid #e5e7eb;background:white;font-size:13px;color:#040354;outline:none;transition:border-color 0.15s;"
            onFocus={(e) => { e.currentTarget.style.borderColor = "#135BEC"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
          />
        </div>

        {/* Category pills */}
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          {CATEGORIES.map((cat) => {
            const isActive = () => activeCategory() === cat;
            const meta = cat !== "All" ? CATEGORY_META[cat] : null;
            return (
              <button
                onClick={() => setActiveCategory(cat)}
                style={`
                  padding: 7px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1.5px solid;
                  transition: all 0.12s;
                  ${isActive()
                    ? `background: ${meta?.bg || "#EBF1FD"}; color: ${meta?.color || "#135BEC"}; border-color: ${meta?.color || "#135BEC"};`
                    : "background: white; color: #6b7280; border-color: #e5e7eb;"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      {filtered().length > 0 ? (
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
          <For each={filtered()}>
            {(project) => <ProjectCard project={project} />}
          </For>
        </div>
      ) : (
        <div style="text-align:center;padding:60px 20px;">
          <p style="font-size:16px;font-weight:600;color:#040354;margin-bottom:6px;">No projects found</p>
          <p style="font-size:13px;color:#9ca3af;">Try a different category or search term.</p>
        </div>
      )}
    </div>
  );
}