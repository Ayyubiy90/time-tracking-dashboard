document.addEventListener("DOMContentLoaded", () => {
  const timeFrameBtns = document.querySelectorAll(".time-frame-btn");
  const activityCards = document.querySelectorAll(".card");

  let data = [];

  // Fetch data from JSON file
  fetch("data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
      updateDashboard("weekly"); // Set initial view to weekly
    })
    .catch((error) => console.error("Error loading data:", error));

  // Add click event listeners to time frame buttons
  timeFrameBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const timeFrame = btn.getAttribute("data-timeframe");
      updateDashboard(timeFrame);
      setActiveButton(btn);
    });
  });

  function updateDashboard(timeFrame) {
    activityCards.forEach((card) => {
      const title = card.querySelector("h2").textContent;
      const activityData = data.find((item) => item.title === title);

      if (activityData) {
        const hours = card.querySelector(".hours");
        const previous = card.querySelector(".previous");

        const currentHours = activityData.timeframes[timeFrame].current;
        const previousHours = activityData.timeframes[timeFrame].previous;

        hours.textContent = `${currentHours}hrs`;
        previous.textContent = getPreviousText(timeFrame, previousHours);
      }
    });
  }

  function getPreviousText(timeFrame, hours) {
    switch (timeFrame) {
      case "daily":
        return `Yesterday - ${hours}hrs`;
      case "weekly":
        return `Last Week - ${hours}hrs`;
      case "monthly":
        return `Last Month - ${hours}hrs`;
      default:
        return `Previous - ${hours}hrs`;
    }
  }

  function setActiveButton(clickedBtn) {
    timeFrameBtns.forEach((btn) => btn.classList.remove("active"));
    clickedBtn.classList.add("active");
  }
});
