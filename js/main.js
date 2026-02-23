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
