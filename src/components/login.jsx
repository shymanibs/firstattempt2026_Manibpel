// Login.jsx — ADDU Nation Alumni Login
// Matches the PDF mockup: Navy hero + crest + biometric + form
// SolidJS + Tailwind CSS

import { createSignal } from "solid-js";

export default function Login(props) {
  // props.onLogin — called when Log In is clicked
  const [alumniId, setAlumniId] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPass, setShowPass] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal("");

  const handleLogin = () => {
    if (!alumniId() || !password()) {
      setError("Please enter your Alumni ID and password.");
      return;
    }
    setError("");
    setLoading(true);
    // Simulate a brief auth delay then grant access
    setTimeout(() => {
      setLoading(false);
      props.onLogin();
    }, 800);
  };

  const handleBiometric = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.onLogin();
    }, 1000);
  };

  return (
    <div
      style="
        display: flex;
        width: 100vw;
        min-height: 100vh;
        background: #F9FAFB;
        font-family: 'DM Sans', system-ui, sans-serif;
      "
    >
      {/* ── Left hero panel ── */}
      <div
        style="
          width: 45%;
          min-height: 100vh;
          background: #040354;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        "
      >
        {/* Decorative circles */}
        <div style="position:absolute;width:400px;height:400px;border-radius:50%;border:1px solid rgba(255,255,255,0.06);top:-80px;left:-80px;" />
        <div style="position:absolute;width:300px;height:300px;border-radius:50%;border:1px solid rgba(255,255,255,0.05);bottom:-60px;right:-60px;" />
        <div style="position:absolute;width:200px;height:200px;border-radius:50%;background:rgba(19,91,236,0.15);bottom:80px;left:40px;" />

        {/* Crest SVG (simplified ADDU-style shield) */}
        <div style="position:relative;z-index:1;text-align:center;padding:40px;">
          <div style="margin-bottom:24px;">
            <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shield outline */}
              <path d="M60 4L8 24V72C8 102 30 128 60 136C90 128 112 102 112 72V24L60 4Z"
                fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>
              {/* IHS circle at top */}
              <circle cx="60" cy="22" r="12" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1"/>
              <text x="60" y="27" text-anchor="middle" fill="white" font-size="9" font-weight="600"
                font-family="serif" opacity="0.9">IHS</text>
              {/* Quadrant dividers */}
              <line x1="60" y1="36" x2="60" y2="120" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
              <line x1="20" y1="78" x2="100" y2="78" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
              {/* Top-left: keys (cross shape) */}
              <line x1="32" y1="50" x2="32" y2="70" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/>
              <line x1="26" y1="56" x2="38" y2="56" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/>
              <circle cx="32" cy="48" r="3" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
              {/* Top-right: mountain */}
              <polyline points="72,72 85,52 98,72" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" stroke-linejoin="round"/>
              <polyline points="76,72 85,58 94,72" fill="rgba(255,255,255,0.08)" stroke="none"/>
              {/* Bottom-left: diagonal stripes */}
              <line x1="18" y1="82" x2="36" y2="118" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
              <line x1="26" y1="82" x2="44" y2="118" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
              <line x1="34" y1="82" x2="52" y2="118" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
              {/* Bottom-right: lion silhouette (simplified) */}
              <ellipse cx="82" cy="100" rx="12" ry="10" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>
              <circle cx="82" cy="90" r="6" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.2"/>
            </svg>
          </div>

          {/* Brand name */}
          <div style="display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:32px;">
            <span style="color:rgba(255,255,255,0.85);font-size:22px;font-weight:300;letter-spacing:0.25em;">ADDU</span>
            <div style="width:1px;height:24px;background:rgba(255,255,255,0.2);" />
            <span style="color:rgba(255,255,255,0.85);font-size:22px;font-weight:300;letter-spacing:0.25em;">NATION</span>
          </div>

          {/* Tagline */}
          <p style="color:rgba(255,255,255,0.45);font-size:13px;letter-spacing:0.05em;line-height:1.7;max-width:260px;margin:0 auto;">
            Ateneo de Davao University<br/>Alumni Portal — Connect, Grow, Give Back
          </p>

          {/* Stats row */}
          <div style="display:flex;gap:32px;justify-content:center;margin-top:48px;">
            {[["12K+","Alumni"], ["340","Scholars"], ["₱2.4M","Raised"]].map(([val, label]) => (
              <div style="text-align:center;">
                <p style="color:white;font-size:20px;font-weight:700;line-height:1;">{val}</p>
                <p style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:4px;">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div
        style="
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 32px;
          background: #F9FAFB;
        "
      >
        <div style="width:100%;max-width:420px;">

          {/* Header */}
          <div style="margin-bottom:36px;">
            <p style="font-size:13px;color:#9ca3af;margin-bottom:6px;letter-spacing:0.02em;">
              Welcome to
            </p>
            <h1 style="font-size:28px;font-weight:700;color:#040354;letter-spacing:-0.02em;line-height:1.1;margin-bottom:8px;">
              ADDU Nation
            </h1>
            <p style="font-size:14px;color:#6b7280;line-height:1.6;">
              Sign in to access your alumni dashboard, career tools, and community.
            </p>
          </div>

          {/* Biometric button — matches PDF style */}
          <button
            onClick={handleBiometric}
            style="
              width:100%;
              display:flex;
              align-items:center;
              gap:14px;
              padding:14px 18px;
              background:#EBF1FD;
              border:1.5px solid #dce5fb;
              border-radius:14px;
              cursor:pointer;
              margin-bottom:24px;
              transition:all 0.15s;
              text-align:left;
            "
            onMouseEnter={e => e.currentTarget.style.background = "#d8e8fc"}
            onMouseLeave={e => e.currentTarget.style.background = "#EBF1FD"}
          >
            {/* Face-scan icon */}
            <div style="width:44px;height:44px;border-radius:12px;background:white;border:1px solid #e5e7eb;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#135BEC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 3H5a2 2 0 00-2 2v4"/>
                <path d="M15 3h4a2 2 0 012 2v4"/>
                <path d="M9 21H5a2 2 0 01-2-2v-4"/>
                <path d="M15 21h4a2 2 0 002-2v-4"/>
                <circle cx="12" cy="11" r="2"/>
                <path d="M8 15s1.5-2 4-2 4 2 4 2"/>
              </svg>
            </div>
            <div style="flex:1;">
              <p style="font-size:14px;font-weight:600;color:#040354;margin-bottom:2px;">Biometric Login</p>
              <p style="font-size:12px;color:#6b7280;">Use Biometric Link to retrieve record</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Divider */}
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
            <div style="flex:1;height:1px;background:#e5e7eb;" />
            <p style="font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:0.08em;">OR LOGIN WITH</p>
            <div style="flex:1;height:1px;background:#e5e7eb;" />
          </div>

          {/* Alumni ID field */}
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:11px;font-weight:700;color:#040354;letter-spacing:0.08em;margin-bottom:8px;">
              UNIVERSITY ID / EMAIL
            </label>
            <div style="position:relative;">
              <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.8" stroke-linecap="round">
                  <rect x="3" y="4" width="18" height="16" rx="2"/>
                  <line x1="3" y1="9" x2="21" y2="9"/>
                  <line x1="9" y1="4" x2="9" y2="9"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="20XX-XXXXX"
                value={alumniId()}
                onInput={e => setAlumniId(e.currentTarget.value)}
                style="
                  width:100%;
                  padding:12px 14px 12px 42px;
                  background:#F3F4F6;
                  border:1.5px solid transparent;
                  border-radius:12px;
                  font-size:14px;
                  color:#111827;
                  outline:none;
                  box-sizing:border-box;
                  transition:all 0.15s;
                "
                onFocus={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="#135BEC"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(19,91,236,0.1)"; }}
                onBlur={e => { e.currentTarget.style.background="#F3F4F6"; e.currentTarget.style.borderColor="transparent"; e.currentTarget.style.boxShadow="none"; }}
              />
            </div>
          </div>

          {/* Password field */}
          <div style="margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <label style="font-size:11px;font-weight:700;color:#040354;letter-spacing:0.08em;">PASSWORD</label>
              <button style="font-size:12px;color:#135BEC;background:none;border:none;cursor:pointer;font-weight:500;">Forgot?</button>
            </div>
            <div style="position:relative;">
              <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.8" stroke-linecap="round">
                  <rect x="5" y="11" width="14" height="10" rx="2"/>
                  <path d="M8 11V7a4 4 0 018 0v4"/>
                  <circle cx="12" cy="16" r="1" fill="#9ca3af"/>
                </svg>
              </span>
              <input
                type={showPass() ? "text" : "password"}
                placeholder="••••••••"
                value={password()}
                onInput={e => setPassword(e.currentTarget.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style="
                  width:100%;
                  padding:12px 44px 12px 42px;
                  background:#F3F4F6;
                  border:1.5px solid transparent;
                  border-radius:12px;
                  font-size:14px;
                  color:#111827;
                  outline:none;
                  box-sizing:border-box;
                  transition:all 0.15s;
                "
                onFocus={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="#135BEC"; e.currentTarget.style.boxShadow="0 0 0 3px rgba(19,91,236,0.1)"; }}
                onBlur={e => { e.currentTarget.style.background="#F3F4F6"; e.currentTarget.style.borderColor="transparent"; e.currentTarget.style.boxShadow="none"; }}
              />
              {/* Show/hide toggle */}
              <button
                onClick={() => setShowPass(!showPass())}
                style="position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:0;"
              >
                {showPass()
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.8"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Error message */}
          {error() && (
            <div style="background:#fff1f2;border:1px solid #fecdd3;border-radius:10px;padding:10px 14px;margin-bottom:16px;">
              <p style="font-size:12px;color:#e11d48;">{error()}</p>
            </div>
          )}

          {/* Log In button */}
          <button
            onClick={handleLogin}
            disabled={loading()}
            style={`
              width:100%;
              padding:14px;
              background:${loading() ? "#6b7280" : "#040354"};
              color:white;
              border:none;
              border-radius:14px;
              font-size:15px;
              font-weight:600;
              cursor:${loading() ? "not-allowed" : "pointer"};
              display:flex;
              align-items:center;
              justify-content:center;
              gap:8px;
              transition:all 0.15s;
              margin-bottom:24px;
            `}
            onMouseEnter={e => { if (!loading()) e.currentTarget.style.background="#135BEC"; }}
            onMouseLeave={e => { if (!loading()) e.currentTarget.style.background="#040354"; }}
          >
            {loading()
              ? <><span style="width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;display:inline-block;animation:spin 0.7s linear infinite;" />Signing in...</>
              : <>Log In <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
            }
          </button>

          {/* Footer links */}
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <button style="font-size:13px;color:#6b7280;background:none;border:none;cursor:pointer;">Need Help?</button>
            <button style="font-size:13px;color:#135BEC;font-weight:600;background:none;border:none;cursor:pointer;">Create Account</button>
          </div>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}