let currentTab = "all";

const tabActive = ["bg-blue-900", "text-white"];
const tabInactive = ["bg-white", "text-gray-700"];

function switchTab(tab) {
    currentTab = tab;

    const tabs = ["all", "interview", "rejected"];

    tabs.forEach(t => {
        const el = document.getElementById("tab-" + t);
        if (!el) return;

        el.classList.remove(...tabActive, ...tabInactive);

        if (t === tab) {
            el.classList.add(...tabActive);
        } else {
            el.classList.add(...tabInactive);
        }
    });

    filterCards();
}

function filterCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const status = card.dataset.status;

        if (currentTab === "all" || currentTab === status) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });

    updateCounts();
}

function updateCounts() {
    const cards = document.querySelectorAll(".card");

    let total = cards.length;
    let interview = 0;
    let rejected = 0;

    cards.forEach(card => {
        if (card.dataset.status === "interview") interview++;
        if (card.dataset.status === "rejected") rejected++;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("interviewCount").innerText = interview;
    document.getElementById("rejectedCount").innerText = rejected;
    document.getElementById("tabJobCount").innerText = total;
}

// Buttons
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("interview-btn")) {
        const card = e.target.closest(".card");
        card.dataset.status = "interview";
        filterCards();
    }

    if (e.target.classList.contains("rejected-btn")) {
        const card = e.target.closest(".card");
        card.dataset.status = "rejected";
        filterCards();
    }

    if (e.target.closest(".delete-btn")) {
        const card = e.target.closest(".card");
        card.remove();
        filterCards();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    switchTab("all");
});