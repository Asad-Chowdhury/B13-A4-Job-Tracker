document.getElementById("all-tab").addEventListener("click", function (event) {
  allTab = this.getElementsByClassName("btn-tab");
  for (let tab of allTab) {
    tab.classList.remove("bg-blue-400", "text-white");
  }
  let selectedTab = event.target;
  selectedTab.classList.add("bg-blue-400", "text-white");

  const status = selectedTab.textContent.trim().toLowerCase();
  filterByStatus(status);
});

let totalCount = document.getElementById("all-cards").children.length;
document.getElementById("total-count").innerText = totalCount;
document.getElementById("total-jobs").innerText = `${totalCount} jobs`;
let interviewCount = [];
document.getElementById("interview-count").innerText = interviewCount.length;
let rejectedCount = [];
document.getElementById("rejected-count").innerText = rejectedCount.length;

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
}

let cards = document.getElementsByClassName("update-status");

for (let card of cards) {
  card.addEventListener("click", function (event) {
    let parentCard = event.target.closest(".single-card");

    let notApplied = parentCard.querySelector(".card-status");
    let interview = parentCard.querySelector(".card-status-interview");
    let rejected = parentCard.querySelector(".card-status-rejected");

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
    document.getElementById("rejected-count").innerText = rejectedCount.length;
  });
}
