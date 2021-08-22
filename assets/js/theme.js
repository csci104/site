setThemeName(localStorage.getItem("theme") || "light");

function setThemeName(name) {
  document.documentElement.setAttribute("data-theme", name);
  localStorage.setItem("theme", name);
}

function getThemeName() {
  return document.documentElement.getAttribute("data-theme");
}

window.addEventListener("load", () => {
  for (const toggle of document.getElementsByClassName("theme-toggle")) {
    toggle.addEventListener("click", () => {
      if (getThemeName() !== "dark") {
        setThemeName("dark")
      } else {
        setThemeName("light")
      }
    });
  }
})
