let currentTab = "all";

const tabActive   = ["bg-blue-900", "text-white"];
const tabInactive = ["bg-white", "text-gray-700"];

// ─── Badge config ────────────────────────────────────────────────
const badgeConfig = {
  all:       { text: "NOT APPLIED", textCls: "text-blue-900",  bgCls: "bg-blue-50"  },
  interview: { text: "INTERVIEW",   textCls: "text-green-700", bgCls: "bg-green-50" },
  rejected:  { text: "REJECTED",    textCls: "text-red-700",   bgCls: "bg-red-50"   },
};

// ─── Tab switching ───────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  ["all", "interview", "rejected"].forEach(t => {
    const el = document.getElementById("tab-" + t);
    if (!el) return;
    el.classList.remove(...tabActive, ...tabInactive);
    el.classList.add(...(t === tab ? tabActive : tabInactive));
  });
  filterCards();
}

// ─── Filter + empty state ────────────────────────────────────────
function filterCards() {
  const cards = document.querySelectorAll(".card");
  let visibleCount = 0;

  cards.forEach(card => {
    const show = currentTab === "all" || card.dataset.status === currentTab;
    card.style.display = show ? "flex" : "none";
    if (show) visibleCount++;
  });

  // Empty state
  const emptyState = document.getElementById("emptyState");
  if (visibleCount === 0) {
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
  } else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
  }

  updateCounts(visibleCount);
}

// ─── Count updates ───────────────────────────────────────────────
function updateCounts(visibleCount) {
  const cards = [...document.querySelectorAll(".card")];
  const total      = cards.length;
  const interview  = cards.filter(c => c.dataset.status === "interview").length;
  const rejected   = cards.filter(c => c.dataset.status === "rejected").length;

  document.getElementById("total").innerText         = total;
  document.getElementById("interviewCount").innerText = interview;
  document.getElementById("rejectedCount").innerText  = rejected;

  // Tab header count: reflects current tab scope
  const tabCount =
    currentTab === "interview" ? interview :
    currentTab === "rejected"  ? rejected  :
    total;

  document.getElementById("tabJobCount").innerText = tabCount;
}

// ─── Badge update ────────────────────────────────────────────────
function updateBadge(card, status) {
  const badge = card.querySelector(".status-badge");
  if (!badge) return;
  const cfg = badgeConfig[status] || badgeConfig.all;

  // Reset colour classes
  badge.classList.remove(
    "text-blue-900", "bg-blue-50",
    "text-green-700", "bg-green-50",
    "text-red-700", "bg-red-50"
  );
  badge.classList.add(cfg.textCls, cfg.bgCls);
  badge.textContent = cfg.text;
}

// ─── Event delegation ────────────────────────────────────────────
document.addEventListener("click", function (e) {
  const card = e.target.closest(".card");

  if (e.target.classList.contains("interview-btn") && card) {
    card.dataset.status = "interview";
    updateBadge(card, "interview");
    filterCards();
  }

  if (e.target.classList.contains("rejected-btn") && card) {
    card.dataset.status = "rejected";
    updateBadge(card, "rejected");
    filterCards();
  }

  if (e.target.closest(".btn-delete") && card) {
    card.remove();
    filterCards();
  }
});

// ─── Init ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => switchTab("all"));