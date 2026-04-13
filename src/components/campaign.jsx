// campaign.jsx — ADDU Nation · Create Campaign
// Split-screen: left form + right live preview card
// SolidJS: createSignal, Show, For

import { createSignal, Show, For, createMemo } from "solid-js";

const categories = [
  { id: "stem",         label: "STEM",         color: "#135BEC", bg: "#EBF1FD",  gradient: "linear-gradient(135deg,#040354,#135BEC)" },
  { id: "arts",         label: "Arts",         color: "#d97706", bg: "#fffbeb",  gradient: "linear-gradient(135deg,#78350f,#d97706)" },
  { id: "scholarship",  label: "Scholarship",  color: "#7c3aed", bg: "#f5f3ff",  gradient: "linear-gradient(135deg,#3b0764,#7c3aed)" },
  { id: "agriculture",  label: "Agriculture",  color: "#059669", bg: "#ecfdf5",  gradient: "linear-gradient(135deg,#064e3b,#059669)" },
  { id: "health",       label: "Health",       color: "#0891b2", bg: "#ecfeff",  gradient: "linear-gradient(135deg,#0c4a6e,#0891b2)" },
  { id: "community",    label: "Community",    color: "#E11D48", bg: "#fff1f2",  gradient: "linear-gradient(135deg,#881337,#E11D48)" },
];

function StepBadge(props) {
  const isActive = () => props.currentStep === props.step;
  const isDone = () => props.currentStep > props.step;

  return (
    <div style="display:flex;align-items:center;gap:10px;">
      <div style={`width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;transition:all 0.2s;${isDone() ? "background:#059669;color:white;" : isActive() ? "background:#040354;color:white;" : "background:#f3f4f6;color:#9ca3af;"}`}>
        <Show when={isDone()} fallback={props.step}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </Show>
      </div>
      <span style={`font-size:12.5px;font-weight:600;color:${isActive() ? "#040354" : isDone() ? "#059669" : "#9ca3af"};`}>{props.label}</span>
    </div>
  );
}

const inputStyle = (focused) => `
  width:100%;box-sizing:border-box;padding:11px 13px;border-radius:11px;
  background:${focused ? "#fff" : "#F3F4F6"};
  border:1.5px solid ${focused ? "#135BEC" : "transparent"};
  box-shadow:${focused ? "0 0 0 3px rgba(19,91,236,0.1)" : "none"};
  font-size:13.5px;color:#111827;outline:none;transition:all 0.15s;
`;

// ── Live Preview Card ────────────────────────────────────────────────────────

function LivePreviewCard(props) {
  const { name, goal, description, category, deadline, thankYouMsg } = props;
  const meta = createMemo(() => categories.find(c => c.id === category()) || null);

  const pct = createMemo(() => {
    const g = Number(goal());
    return g > 0 ? Math.min(85, Math.round((g * 0.43 / g) * 100)) : 0;
  });

  const hasContent = createMemo(() => name() || category() || goal() || description());

  return (
    <div style="position:sticky;top:88px;">
      {/* Label */}
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">
        <div style="width:6px;height:6px;border-radius:50%;background:#059669;"/>
        <p style="font-size:11px;font-weight:700;color:#6b7280;letter-spacing:0.06em;">LIVE PREVIEW</p>
        <span style="font-size:10px;padding:2px 8px;border-radius:20px;background:#ecfdf5;color:#059669;font-weight:600;margin-left:4px;">Updates as you type</span>
      </div>

      {/* Preview card */}
      <div style="background:white;border-radius:20px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 4px 16px rgba(4,3,84,0.08);">

        {/* Gradient header */}
        <div
          style={`
            height:130px;
            background:${meta() ? meta().gradient : "linear-gradient(135deg,#d1d5db,#e5e7eb)"};
            position:relative;overflow:hidden;
            display:flex;align-items:center;justify-content:center;
            transition:background 0.4s;
          `}
        >
          <div style="position:absolute;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,0.07);top:-60px;right:-40px;"/>
          <div style="position:absolute;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,0.05);bottom:-30px;left:-20px;"/>

          {/* Category badge */}
          {meta() && (
            <div style={`position:absolute;top:12px;right:12px;background:${meta().bg};color:${meta().color};font-size:9px;font-weight:700;letter-spacing:0.06em;padding:4px 10px;border-radius:20px;`}>
              {meta().label.toUpperCase()}
            </div>
          )}

          {/* Placeholder icon when empty */}
          {!hasContent() && (
            <div style="text-align:center;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>
              <p style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:6px;font-weight:500;">Your card preview will<br/>appear here</p>
            </div>
          )}

          {/* Draft badge */}
          {hasContent() && (
            <div style="position:absolute;top:12px;left:12px;background:rgba(0,0,0,0.35);padding:3px 9px;border-radius:20px;font-size:9px;font-weight:700;color:rgba(255,255,255,0.8);letter-spacing:0.04em;">
              DRAFT
            </div>
          )}
        </div>

        {/* Body */}
        <div style="padding:16px 18px;display:flex;flex-direction:column;gap:10px;">
          {/* Title */}
          <h3 style={`font-size:15px;font-weight:700;color:${name() ? "#040354" : "#d1d5db"};line-height:1.35;min-height:20px;transition:color 0.2s;`}>
            {name() || "Your Campaign Title"}
          </h3>

          {/* Description */}
          <p style={`font-size:12px;color:${description() ? "#6b7280" : "#d1d5db"};line-height:1.6;min-height:36px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;transition:color 0.2s;`}>
            {description() || "Your campaign description will appear here as you type..."}
          </p>

          {/* Progress */}
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
              <span style={`font-size:12px;font-weight:700;color:${goal() ? "#040354" : "#d1d5db"};`}>
                {goal() ? `₱${Math.round(Number(goal()) * 0.43).toLocaleString()} raised` : "₱0 raised"}
              </span>
              <span style={`font-size:11px;color:${goal() ? "#9ca3af" : "#e5e7eb"};`}>
                {goal() ? `of ₱${Number(goal()).toLocaleString()}` : "of ₱0"}
              </span>
            </div>
            <div style="height:5px;background:#f3f4f6;border-radius:99px;overflow:hidden;">
              <div
                style={`
                  height:100%;border-radius:99px;
                  background:${meta() ? `linear-gradient(90deg,${meta().color},${meta().color}99)` : "#e5e7eb"};
                  width:${goal() ? pct() : 0}%;
                  transition:width 0.4s, background 0.4s;
                `}
              />
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:4px;">
              <span style={`font-size:11px;font-weight:600;color:${meta() ? meta().color : "#d1d5db"};`}>{goal() ? pct() : 0}% funded</span>
              <span style="font-size:11px;color:#9ca3af;">43 supporters</span>
            </div>
          </div>

          {/* Deadline row */}
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid #f3f4f6;">
            <div style="display:flex;align-items:center;gap:5px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <span style={`font-size:11px;color:${deadline() ? "#6b7280" : "#d1d5db"};`}>
                {deadline() ? `Deadline: ${deadline()}` : "No deadline set"}
              </span>
            </div>
            {meta() && (
              <span style={`font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;background:${meta().bg};color:${meta().color};`}>{meta().label}</span>
            )}
          </div>

          {/* CTA button preview */}
          <div
            style={`
              width:100%;padding:11px;border-radius:11px;
              background:${meta() ? meta().color : "#e5e7eb"};
              color:white;
              font-size:13px;font-weight:600;text-align:center;
              transition:background 0.4s;
              opacity:${hasContent() ? 1 : 0.4};
            `}
          >
            Donate to this Project
          </div>

          {/* Thank you preview */}
          {thankYouMsg() && (
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-left:3px solid #135BEC;border-radius:0 10px 10px 0;padding:10px 12px;">
              <p style="font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.06em;margin-bottom:4px;">THANK YOU MESSAGE</p>
              <p style="font-size:11.5px;color:#6b7280;line-height:1.6;font-style:italic;">"{thankYouMsg()}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview note */}
      <p style="font-size:10.5px;color:#9ca3af;text-align:center;margin-top:10px;">
        This is how your campaign will appear in Browse Projects
      </p>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function CampaignCreatorView() {
  const [name, setName] = createSignal("");
  const [goal, setGoal] = createSignal("");
  const [description, setDescription] = createSignal("");
  const [category, setCategory] = createSignal("");
  const [deadline, setDeadline] = createSignal("");
  const [thankYouMsg, setThankYouMsg] = createSignal("");
  const [realTimeAlerts, setRealTimeAlerts] = createSignal(true);
  const [currentStep, setCurrentStep] = createSignal(1);
  const [submitted, setSubmitted] = createSignal(false);
  const [errors, setErrors] = createSignal({});
  const [focused, setFocused] = createSignal("");

  const steps = [
    { step: 1, label: "Purpose & Details" },
    { step: 2, label: "Set Your Goal" },
    { step: 3, label: "Engagement" },
  ];

  const validateStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (!name().trim()) errs.name = "Campaign title is required";
      if (!category()) errs.category = "Please select a category";
      if (!description().trim()) errs.description = "Please describe your campaign";
    }
    if (step === 2) {
      if (!goal() || isNaN(Number(goal())) || Number(goal()) <= 0)
        errs.goal = "Please enter a valid funding goal";
      if (!deadline()) errs.deadline = "Please set a deadline";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => { if (validateStep(currentStep())) setCurrentStep(currentStep() + 1); };
  const handleSubmit = () => { if (validateStep(currentStep())) setSubmitted(true); };
  const handleReset = () => {
    setName(""); setGoal(""); setDescription(""); setCategory("");
    setDeadline(""); setThankYouMsg(""); setErrors({});
    setCurrentStep(1); setSubmitted(false);
  };

  const selCat = () => categories.find(c => c.id === category());

  // ── Success screen ────────────────────────────────────────────────────────

  if (submitted()) {
    return (
      <div style="padding:32px;background:#F9FAFB;min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
        <div style="background:white;border-radius:24px;border:1px solid #e5e7eb;padding:48px 40px;max-width:520px;width:100%;text-align:center;box-shadow:0 8px 32px rgba(4,3,84,0.08);">
          <div style="width:68px;height:68px;border-radius:50%;background:#EBF1FD;border:2px solid #135BEC;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#135BEC" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h2 style="font-size:21px;font-weight:700;color:#135BEC;margin-bottom:8px;">Campaign Submitted!</h2>
          <p style="font-size:13.5px;color:#6b7280;line-height:1.7;margin-bottom:22px;">
            Your campaign <strong style="color:#040354;">"{name()}"</strong> has been sent for verification by the Alumni Office. You'll receive an email confirmation within 24–48 hours.
          </p>
          <div style="background:#F9FAFB;border:1px solid #e5e7eb;border-radius:14px;padding:16px;text-align:left;margin-bottom:22px;">
            {[
              { label: "Project Name", value: name() },
              { label: "Category", value: selCat()?.label || category() },
              { label: "Funding Goal", value: `₱${Number(goal()).toLocaleString()}` },
              { label: "Deadline", value: deadline() },
            ].map((row) => (
              <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #f3f4f6;">
                <span style="font-size:12px;color:#9ca3af;">{row.label}</span>
                <span style="font-size:12px;font-weight:600;color:#040354;">{row.value}</span>
              </div>
            ))}
          </div>
          <div style="display:inline-flex;align-items:center;gap:6px;background:#EBF1FD;border:1px solid #dce5fb;padding:7px 15px;border-radius:20px;margin-bottom:26px;">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#135BEC" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style="font-size:11.5px;font-weight:600;color:#135BEC;">Pending Alumni Office Review</span>
          </div>
          <button onClick={handleReset} style="width:100%;padding:13px;border-radius:12px;border:none;background:#040354;color:white;font-size:14px;font-weight:600;cursor:pointer;transition:background 0.15s;" onMouseEnter={(e) => { e.currentTarget.style.background="#135BEC"; }} onMouseLeave={(e) => { e.currentTarget.style.background="#040354"; }}>
            Start Another Campaign
          </button>
        </div>
      </div>
    );
  }

  // ── Main layout ───────────────────────────────────────────────────────────

  return (
    <div style="padding:32px;background:#F9FAFB;min-height:100%;">

      {/* Header banner */}
      <div style="background:#040354;border-radius:20px;padding:26px 34px;margin-bottom:28px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden;">
        <div style="position:absolute;right:-40px;top:-40px;width:220px;height:220px;border-radius:50%;background:rgba(19,91,236,0.2);"/>
        <div style="position:absolute;right:90px;bottom:-60px;width:150px;height:150px;border-radius:50%;background:rgba(19,91,236,0.12);"/>
        <div style="position:relative;z-index:1;">
          <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(225,29,72,0.2);border:1px solid rgba(225,29,72,0.3);padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;color:#fda4af;letter-spacing:0.05em;margin-bottom:10px;">★ START A CAMPAIGN</div>
          <h1 style="color:white;font-size:22px;font-weight:700;letter-spacing:-0.02em;margin-bottom:6px;">Launch Your Student Project</h1>
          <p style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.6;max-width:400px;">Create a campaign to connect with ADDU alumni who care about your cause. Funds go directly to your project.</p>
        </div>
        <div style="width:58px;height:58px;border-radius:16px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;flex-shrink:0;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
      </div>

      {/* Split-screen */}
      <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:24px;align-items:start;">

        {/* Left: Step sidebar + Form */}
        <div style="display:flex;flex-direction:column;gap:18px;">

          {/* Step sidebar card */}
          <div style="background:white;border-radius:18px;border:1px solid #e5e7eb;padding:22px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
            <p style="font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.08em;margin-bottom:14px;">STEPS</p>
            <div style="display:flex;flex-direction:column;gap:11px;">
              <For each={steps}>
                {(s) => <StepBadge step={s.step} label={s.label} currentStep={currentStep()} />}
              </For>
            </div>
            <div style="margin-top:18px;padding-top:16px;border-top:1px solid #f3f4f6;">
              <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                <span style="font-size:10px;color:#9ca3af;">Progress</span>
                <span style="font-size:10px;font-weight:700;color:#135BEC;">{Math.round(((currentStep()-1)/3)*100)}%</span>
              </div>
              <div style="height:4px;background:#f3f4f6;border-radius:99px;overflow:hidden;">
                <div style={`height:100%;border-radius:99px;background:linear-gradient(90deg,#135BEC,#3b82f6);transition:width 0.3s;width:${Math.round(((currentStep()-1)/3)*100)}%;`}/>
              </div>
            </div>
            <div style="margin-top:16px;background:#EBF1FD;border-radius:11px;padding:12px;">
              <p style="font-size:10px;font-weight:700;color:#040354;margin-bottom:3px;">Verification Required</p>
              <p style="font-size:9.5px;color:#6b7280;line-height:1.5;">All campaigns are reviewed by the Alumni Office within 24–48 hours before going live.</p>
            </div>
          </div>

          {/* Form card */}
          <div style="background:white;border-radius:18px;border:1px solid #e5e7eb;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">

            {/* ── Step 1 ── */}
            <Show when={currentStep() === 1}>
              <div>
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
                  <div style="width:30px;height:30px;border-radius:50%;background:#040354;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white;">1</div>
                  <h2 style="font-size:16px;font-weight:700;color:#040354;">Purpose & Details</h2>
                </div>

                {/* Campaign title */}
                <div style="margin-bottom:18px;">
                  <label style="display:block;font-size:10.5px;font-weight:700;color:#040354;letter-spacing:0.08em;margin-bottom:7px;">CAMPAIGN TITLE <span style="color:#E11D48;">*</span></label>
                  <input type="text" placeholder="e.g. Ateneo Robotics: National Finals 2026" value={name()} onInput={(e) => setName(e.currentTarget.value)} onFocus={() => setFocused("name")} onBlur={() => setFocused("")} style={inputStyle(focused()==="name")} />
                  {errors().name && <p style="font-size:10.5px;color:#E11D48;margin-top:4px;">{errors().name}</p>}
                </div>

                {/* Category */}
                <div style="margin-bottom:18px;">
                  <label style="display:block;font-size:10.5px;font-weight:700;color:#040354;letter-spacing:0.08em;margin-bottom:7px;">SELECT CATEGORY <span style="color:#E11D48;">*</span></label>
                  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
                    <For each={categories}>
                      {(cat) => (
                        <button onClick={() => setCategory(cat.id)} style={`padding:12px 8px;border-radius:12px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;transition:all 0.15s;${category()===cat.id ? `background:${cat.bg};border:2px solid ${cat.color};` : "background:#f9fafb;border:2px solid #e5e7eb;"}`}>
                          <span style={`font-size:10.5px;font-weight:600;color:${category()===cat.id ? cat.color : "#6b7280"};`}>{cat.label}</span>
                        </button>
                      )}
                    </For>
                  </div>
                  {errors().category && <p style="font-size:10.5px;color:#E11D48;margin-top:5px;">{errors().category}</p>}
                </div>

                {/* Description */}
                <div style="margin-bottom:20px;">
                  <label style="display:block;font-size:10.5px;font-weight:700;color:#040354;letter-spacing:0.08em;margin-bottom:7px;">PURPOSE & DESCRIPTION <span style="color:#E11D48;">*</span></label>
                  <textarea placeholder="Tell your story — what problem are you solving? How will the funds be used?" value={description()} onInput={(e) => setDescription(e.currentTarget.value)} onFocus={() => setFocused("desc")} onBlur={() => setFocused("")} rows="4" style={`${inputStyle(focused()==="desc")} resize:vertical;font-family:inherit;line-height:1.6;`}/>
                  {errors().description && <p style="font-size:10.5px;color:#E11D48;margin-top:4px;">{errors().description}</p>}
                </div>

                <button onClick={handleNext} style="width:100%;padding:13px;border-radius:11px;border:none;background:#040354;color:white;font-size:13.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;transition:background 0.15s;" onMouseEnter={(e) => { e.currentTarget.style.background="#135BEC"; }} onMouseLeave={(e) => { e.currentTarget.style.background="#040354"; }}>
                  Continue to Goal Setting →
                </button>
              </div>
            </Show>

            {/* ── Step 2 ── */}
            <Show when={currentStep() === 2}>
              <div>
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
                  <div style="width:30px;height:30px;border-radius:50%;background:#040354;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white;">2</div>
                  <h2 style="font-size:16px;font-weight:700;color:#040354;">Set Your Goal</h2>
                </div>

                {/* Goal */}
                <div style="margin-bottom:18px;">
                  <label style="display:block;font-size:10.5px;font-weight:700;color:#040354;letter-spacing:0.08em;margin-bottom:7px;">FUNDING GOAL (₱) <span style="color:#E11D48;">*</span></label>
                  <div style="position:relative;">
                    <span style="position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:15px;font-weight:700;color:#6b7280;">₱</span>
                    <input type="number" placeholder="0" value={goal()} onInput={(e) => setGoal(e.currentTarget.value)} onFocus={() => setFocused("goal")} onBlur={() => setFocused("")} style={`${inputStyle(focused()==="goal")} padding-left:28px;`}/>
                  </div>
                  {goal() && !isNaN(Number(goal())) && <p style="font-size:10.5px;color:#135BEC;margin-top:4px;font-weight:600;">Goal: ₱{Number(goal()).toLocaleString()}</p>}
                  {errors().goal && <p style="font-size:10.5px;color:#E11D48;margin-top:4px;">{errors().goal}</p>}
                </div>

                {/* Quick presets */}
                <div style="margin-bottom:18px;">
                  <label style="display:block;font-size:10.5px;font-weight:700;color:#040354;letter-spacing:0.08em;margin-bottom:7px;">QUICK PRESETS</label>
                  <div style="display:flex;gap:7px;flex-wrap:wrap;">
                    {[10000,25000,50000,100000,150000,500000].map((p) => (
                      <button onClick={() => setGoal(String(p))} style={`padding:6px 13px;border-radius:20px;font-size:11.5px;font-weight:600;cursor:pointer;transition:all 0.12s;${Number(goal())===p ? "background:#040354;color:white;border:1.5px solid #040354;" : "background:#f9fafb;color:#374151;border:1.5px solid #e5e7eb;"}`}>
                        ₱{p>=1000?`${(p/1000).toFixed(0)}k`:p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                <div style="margin-bottom:20px;">
                  <label style="display:block;font-size:10.5px;font-weight:700;color:#040354;letter-spacing:0.08em;margin-bottom:7px;">CAMPAIGN DEADLINE <span style="color:#E11D48;">*</span></label>
                  <input type="date" value={deadline()} onInput={(e) => setDeadline(e.currentTarget.value)} onFocus={() => setFocused("deadline")} onBlur={() => setFocused("")} style={inputStyle(focused()==="deadline")}/>
                  {errors().deadline && <p style="font-size:10.5px;color:#E11D48;margin-top:4px;">{errors().deadline}</p>}
                </div>

                <div style="display:flex;gap:9px;">
                  <button onClick={() => setCurrentStep(1)} style="flex:1;padding:13px;border-radius:11px;background:#f9fafb;color:#374151;border:1.5px solid #e5e7eb;font-size:13.5px;font-weight:600;cursor:pointer;">← Back</button>
                  <button onClick={handleNext} style="flex:2;padding:13px;border-radius:11px;border:none;background:#040354;color:white;font-size:13.5px;font-weight:600;cursor:pointer;transition:background 0.15s;" onMouseEnter={(e) => { e.currentTarget.style.background="#135BEC"; }} onMouseLeave={(e) => { e.currentTarget.style.background="#040354"; }}>Continue to Engagement →</button>
                </div>
              </div>
            </Show>

            {/* ── Step 3 ── */}
            <Show when={currentStep() === 3}>
              <div>
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
                  <div style="width:30px;height:30px;border-radius:50%;background:#040354;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white;">3</div>
                  <h2 style="font-size:16px;font-weight:700;color:#040354;">Engagement & Appreciation</h2>
                </div>

                {/* Real-time alerts toggle */}
                <div style="display:flex;align-items:center;justify-content:space-between;background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:13px 15px;margin-bottom:18px;">
                  <div style="display:flex;align-items:center;gap:11px;">
                    <div style="width:34px;height:34px;border-radius:10px;background:#ecfdf5;display:flex;align-items:center;justify-content:center;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                    </div>
                    <div>
                      <p style="font-size:12.5px;font-weight:600;color:#040354;">Real-time Alerts</p>
                      <p style="font-size:10.5px;color:#9ca3af;">Get notified for every donation</p>
                    </div>
                  </div>
                  <button onClick={() => setRealTimeAlerts(!realTimeAlerts())} style={`width:42px;height:22px;border-radius:11px;border:none;cursor:pointer;position:relative;transition:background 0.2s;background:${realTimeAlerts() ? "#040354" : "#d1d5db"};`}>
                    <div style={`position:absolute;top:2px;width:18px;height:18px;border-radius:50%;background:white;transition:left 0.2s;left:${realTimeAlerts()?"22px":"2px"};box-shadow:0 1px 3px rgba(0,0,0,0.2);`}/>
                  </button>
                </div>

                {/* Thank you message */}
                <div style="margin-bottom:18px;">
                  <label style="display:block;font-size:10.5px;font-weight:700;color:#040354;letter-spacing:0.08em;margin-bottom:7px;">THANK YOU MESSAGE</label>
                  <p style="font-size:10.5px;color:#9ca3af;margin-bottom:7px;">Sent automatically to every donor after contributing.</p>
                  <textarea placeholder="Write a heartfelt thank you message to your donors..." value={thankYouMsg()} onInput={(e) => setThankYouMsg(e.currentTarget.value)} onFocus={() => setFocused("thanks")} onBlur={() => setFocused("")} rows="4" style={`${inputStyle(focused()==="thanks")} resize:vertical;font-family:inherit;line-height:1.6;`}/>
                </div>

                {/* Summary */}
                <div style="background:#F9FAFB;border:1px solid #e5e7eb;border-radius:13px;padding:16px;margin-bottom:18px;">
                  <p style="font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:0.06em;margin-bottom:10px;">CAMPAIGN SUMMARY</p>
                  {[
                    { label: "Project Name", value: name() || "—" },
                    { label: "Category", value: selCat()?.label || "—" },
                    { label: "Funding Goal", value: goal() ? `₱${Number(goal()).toLocaleString()}` : "—" },
                    { label: "Deadline", value: deadline() || "—" },
                    { label: "Real-time Alerts", value: realTimeAlerts() ? "Enabled ✓" : "Disabled" },
                  ].map((row) => (
                    <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #f3f4f6;">
                      <span style="font-size:11.5px;color:#9ca3af;">{row.label}</span>
                      <span style="font-size:11.5px;font-weight:600;color:#040354;">{row.value}</span>
                    </div>
                  ))}
                </div>

                <div style="display:flex;gap:9px;">
                  <button onClick={() => setCurrentStep(2)} style="flex:1;padding:13px;border-radius:11px;background:#f9fafb;color:#374151;border:1.5px solid #e5e7eb;font-size:13.5px;font-weight:600;cursor:pointer;">← Back</button>
                  <button onClick={handleSubmit} style="flex:2;padding:13px;border-radius:11px;border:none;background:#E11D48;color:white;font-size:13.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;transition:background 0.15s;" onMouseEnter={(e) => { e.currentTarget.style.background="#be123c"; }} onMouseLeave={(e) => { e.currentTarget.style.background="#E11D48"; }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Send for Verification
                  </button>
                </div>
              </div>
            </Show>
          </div>
        </div>

        {/* Right: Live Preview Card */}
        <LivePreviewCard
          name={name}
          goal={goal}
          description={description}
          category={category}
          deadline={deadline}
          thankYouMsg={thankYouMsg}
        />
      </div>
    </div>
  );
}