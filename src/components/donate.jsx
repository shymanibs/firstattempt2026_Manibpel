// donate.jsx — ADDU Nation · Module 3: Donate
// Three sub-tabs: Browse Projects | Your Impact | Create Campaign
// SolidJS: createSignal, Show, Switch, Match

import { createSignal } from "solid-js";
import BrowseProjectsView from "./browse";
import ImpactView from "./impact";
import CampaignCreatorView from "./campaign";

const tabs = [
  {
    id: "browse",
    label: "Browse Projects",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    id: "impact",
    label: "Your Impact",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    id: "campaign",
    label: "Create Campaign",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
  },
];

export default function DonateView() {
  const [activeTab, setActiveTab] = createSignal("browse");

  return (
    <div style="min-height: 100%; background: #F9FAFB;">
      {/* Sub-tab bar */}
      <div
        style="
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 0 32px;
          display: flex;
          align-items: center;
          gap: 4px;
          position: sticky;
          top: 0;
          z-index: 30;
        "
      >
        {tabs.map((tab) => {
          const isActive = () => activeTab() === tab.id;
          return (
            <button
              onClick={() => setActiveTab(tab.id)}
              style={`
                display: flex; align-items: center; gap: 7px;
                padding: 16px 18px;
                font-size: 13.5px; font-weight: 600;
                border: none; background: none; cursor: pointer;
                transition: all 0.15s;
                border-bottom: 2.5px solid ${isActive() ? "#135BEC" : "transparent"};
                color: ${isActive() ? "#135BEC" : "#6b7280"};
                margin-bottom: -1px;
              `}
            >
              <span style={`color: ${isActive() ? "#135BEC" : "#9ca3af"};`}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>
        {activeTab() === "browse" && <BrowseProjectsView />}
        {activeTab() === "impact" && <ImpactView />}
        {activeTab() === "campaign" && <CampaignCreatorView />}
      </div>
    </div>
  );
}