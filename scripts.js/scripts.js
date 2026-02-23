document.getElementById("all-tab").addEventListener("click", function (event) {
  allTab = this.getElementsByClassName("btn-tab");
  for (let tab of allTab) {
    tab.classList.remove("bg-blue-400", "text-white");
  }
  let selectedTab = event.target;
  selectedTab.classList.add("bg-blue-400", "text-white");
});

