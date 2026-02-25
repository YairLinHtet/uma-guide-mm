// Website Navigation bar and tab feature
const openButton = document.getElementById("open-sidebar-button");
const navBar = document.getElementById("navbar");

const media = window.matchMedia("(width<800px");

media.addEventListener("change", (e) => updateNavbar(e));

function updateNavbar(e) {
  const isMobile = e.matches;
  if (isMobile) {
    navBar.setAttribute("inert", "");
  } else {
    navBar.removeAttribute("inert");
  }
}

function openSideBar() {
  navBar.classList.add("show");
  openButton.setAttribute("aria-expended", "true");
  navBar.removeAttribute("inert");
}

function closeSideBar() {
  navBar.classList.remove("show");
  openButton.setAttribute("aria-expended", "false");
  navBar.setAttribute("inert", "");
}

updateNavbar(media);

// Character Search Function

function searchUma() {
  let input = document.getElementById("characterSearch");
  let filter = input.value.toLowerCase();

  let cards = document.getElementsByClassName("character-card");

  for (let i = 0; i < cards.length; i++) {
    let name = cards[i].getElementsByTagName("h3")[0];

    if (name) {
      let textValue = name.textContent || name.innerText;

      if (textValue.toLowerCase().indexOf(filter) > -1) {
        cards[i].style.display = "";
      } else {
        cards[i].style.display = "none";
      }
    }
  }
}

// Race Search and Filter Function

let currentGrade = "all";
let racesData = []; 

async function initRaces() {
  try {
    
    const response = await fetch("/data/jra-race.json");
    const jsonObject = await response.json();
    racesData = [
      ...jsonObject.G1_Races,
      ...jsonObject.G2_Races,
      ...jsonObject.G3_Races
    ]
    displayRaces(racesData); // 
  } catch (error) {
    console.error("Data loading error:", error);
  }
}

// Open Data file only on races page
if (window.location.pathname.includes("races.html")) {
  initRaces();
}

function displayRaces(data) {
  const container = document.getElementById("raceContainer");
  if (!container) return;
  container.innerHTML = ""; // Clear Html

  data.forEach((race) => {
    // Backticks ( ` ) 
    const raceCard = `
      <div class="race-card" data-category="${race.grade}">
        <img src="${race.image}" alt="${race.name}" class="race-img" />
        <div class="race-name-date">
          <p>${race.name}</p>
          <p>${race.date}</p>
        </div>
        <div class="race-track-location">
          <p>${race.track}</p>
          <p>${race.location}</p>
        </div>
        <div class="race-distance">
          <p>${race.distance}</p>
          <p>${race.length}</p>
        </div>
        <div class="race-grade">
          <p class="${race.grade}">${race.grade}</p>
        </div>
      </div>
    `;
    container.innerHTML += raceCard;
  });
}

function filterByGrade(grade, btnElement) {
  currentGrade = grade;

  // Button active class ပြောင်းခြင်း
  let raceButtons = document.querySelectorAll(".filter-button");
  raceButtons.forEach((btn) => btn.classList.remove("active"));
  btnElement.classList.add("active");

  applyAllFilters();
}

function searchRaces() {
  applyAllFilters();
}

// Search ရော Filter ရော ပေါင်းစပ်ပေးမယ့် function
function applyAllFilters() {
  const term = document.getElementById("characterSearch").value.toLowerCase();

  const filtered = racesData.filter((race) => {
    const matchesSearch =
      race.name.toLowerCase().includes(term) ||
      race.location.toLowerCase().includes(term);
    const matchesGrade =
      currentGrade === "all" ||
      race.grade.toLowerCase() === currentGrade.toLowerCase();

    return matchesSearch && matchesGrade;
  });

  displayRaces(filtered);
}
