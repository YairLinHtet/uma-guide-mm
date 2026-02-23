// Website Navigation bar and tab feature
const openButton = document.getElementById("open-sidebar-button");
const navBar = document.getElementById("navbar");

const media = window.matchMedia("(width<800px");

media.addEventListener("change", (e) => updateNavbar(e));

function updateNavbar(e) {
  const isMobile = e.matches;
  console.log(isMobile);
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
