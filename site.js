let banner = document.querySelector(".Header_Banner");
let menu = banner.querySelector("nav");
banner.addEventListener("click", (e) => {
  menu.style.display =
    window.getComputedStyle(menu).display == "none" ? "block" : "none";
});
