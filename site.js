let banner = document.querySelector(".Header_Banner");
let menu = banner.querySelector("nav");
banner.addEventListener("click", (e) => {
  menu.style.display =
    window.getComputedStyle(menu).display == "none" ? "block" : "none";
});
let cards = document.querySelectorAll(".Card");
let asides = document.querySelectorAll(".Card_Aside");
let displaying = null;

let dist = "65vw";
if (window.innerWidth >= 768) {
  dist = "40vw";
}

window.addEventListener("resize", (e) => {
  if (window.innerWidth >= 768) {
    dist = "40vw";
  } else {
    dist = "65vw";
  }
});
const slide_time = 500;

const check_outside = (e) => {
  console.log("called");
  let target = e.target;

  do {
    if (displaying != null && target == displaying) {
      return;
    }
    target = target.parentNode;
  } while (target);

  displaying.animate([{ transform: `translateX(${dist})` }], {
    duration: slide_time,
    easing: "ease-in",
    fill: "forwards",
  });
  displaying = null;
  document.removeEventListener("click", check_outside);
};

const add_card_listener = (item, index) => {
  item.addEventListener("click", (e) => {
    if (displaying != null) {
      return;
    }
    console.log("confirm");
    let negdisp = "-" + dist;
    asides[index].animate([{ transform: `translateX(${negdisp})` }], {
      duration: slide_time,
      easing: "ease-in",
      fill: "forwards",
    });
    window.setTimeout(() => {
      document.addEventListener("click", check_outside);
    }, slide_time);
    displaying = asides[index];
  });
};

cards.forEach(add_card_listener);
asides.forEach((item) => {
  item.style.left = "100vw";
});
