let interviewCount = [];
let rejectedCount = [];

function init() {
  initCounts();
  setupTabListeners();
  setupStatusUpdateListeners();
  setupDeleteListener();
}

function initCounts() {
  const totalCount = document.querySelectorAll(
    "#all-cards .single-card",
  ).length;
  document.getElementById("total-count").innerText = totalCount;
  document.getElementById("total-jobs").innerText = `${totalCount} jobs`;
  document.getElementById("interview-count").innerText = interviewCount.length;
  document.getElementById("rejected-count").innerText = rejectedCount.length;
}

function setupTabListeners() {
  const allTabEl = document.getElementById("all-tab");
  if (!allTabEl) return;
  allTabEl.addEventListener("click", function (event) {
    const allTab = this.getElementsByClassName("btn-tab");
    for (let tab of allTab) {
      tab.classList.remove("bg-blue-400", "text-white");
    }
    const selectedTab = event.target;
    selectedTab.classList.add("bg-blue-400", "text-white");

    const status = selectedTab.textContent.trim().toLowerCase();
    filterByStatus(status);
  });
}

function filterByStatus(status) {
  const cards = document.querySelectorAll("#all-cards .single-card");
  cards.forEach((card) => {
    if (status === "all") {
      card.classList.remove("hidden");
      return;
    }

    if (status === "interview") {
      const interviewBtn = card.querySelector(".card-status-interview");
      if (interviewBtn && !interviewBtn.classList.contains("hidden")) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
      return;
    }

    if (status === "rejected") {
      const rejectedBtn = card.querySelector(".card-status-rejected");
      if (rejectedBtn && !rejectedBtn.classList.contains("hidden")) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
      return;
    }
  });

  const visibleCards = Array.from(
    document.querySelectorAll("#all-cards .single-card"),
  ).filter(function (card) {
    return !card.classList.contains("hidden");
  });
  const visibleCount = visibleCards.length;
  document.getElementById("total-jobs").innerText = `${visibleCount} jobs`;

  const noJobsEl = document.getElementById("no-jobs");
  if (noJobsEl) {
    if (visibleCount === 0) {
      noJobsEl.classList.remove("hidden");
    } else {
      noJobsEl.classList.add("hidden");
    }
  }
}

function setupStatusUpdateListeners() {
  const cards = document.getElementsByClassName("update-status");

  for (let card of cards) {
    card.addEventListener("click", function (event) {
      const parentCard = event.target.closest(".single-card");
      if (!parentCard) return;

      const notApplied = parentCard.querySelector(".card-status");
      const interview = parentCard.querySelector(".card-status-interview");
      const rejected = parentCard.querySelector(".card-status-rejected");

      const action = event.target.innerText.trim().toLowerCase();
      const company = (
        parentCard.querySelector("h3") || parentCard.querySelector("h2")
      )?.innerText.trim();
      const role = parentCard.querySelector("p")?.innerText.trim() || "";
      const jobObj = { company, role };

      if (action === "interview") {
        notApplied.classList.add("hidden");
        rejected.classList.add("hidden");
        interview.classList.remove("hidden");

        if (company) {
          const exists = interviewCount.find(function (job) {
            return job.company === company;
          });
          if (!exists) {
            interviewCount.push(jobObj);
          }

          rejectedCount = rejectedCount.filter(function (job) {
            return job.company !== company;
          });
        }
      }

      if (action === "rejected") {
        notApplied.classList.add("hidden");
        interview.classList.add("hidden");
        rejected.classList.remove("hidden");

        if (company) {
          const exists = rejectedCount.find(function (job) {
            return job.company === company;
          });
          if (!exists) {
            rejectedCount.push(jobObj);
          }

          interviewCount = interviewCount.filter(function (job) {
            return job.company !== company;
          });
        }
      }

      document.getElementById("interview-count").innerText =
        interviewCount.length;
      document.getElementById("rejected-count").innerText =
        rejectedCount.length;
    });
  }
}

function setupDeleteListener() {
  document.addEventListener("click", function (event) {
    const trash = event.target.closest(".fa-trash-can");
    if (!trash) return;

    const card = trash.closest(".single-card");
    if (!card) return;

    // get company name to remove from arrays
    const company = (
      card.querySelector("h3") || card.querySelector("h2")
    )?.innerText.trim();

    if (company) {
      interviewCount = interviewCount.filter(function (job) {
        return job.company !== company;
      });
      rejectedCount = rejectedCount.filter(function (job) {
        return job.company !== company;
      });
    }

    card.remove();

    const totalCards = document.querySelectorAll(
      "#all-cards .single-card",
    ).length;
    document.getElementById("total-count").innerText = totalCards;

    document.getElementById("interview-count").innerText =
      interviewCount.length;
    document.getElementById("rejected-count").innerText = rejectedCount.length;

    const activeTab =
      document
        .querySelector("#all-tab .bg-blue-400")
        ?.textContent.trim()
        .toLowerCase() || "all";
    filterByStatus(activeTab);
  });
}

init();
