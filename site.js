let banner = document.querySelector(".Header_Banner");
let menu = banner.querySelector("nav");
banner.addEventListener("click", (e) => {
  menu.style.display =
    window.getComputedStyle(menu).display == "none" ? "block" : "none";
});
let cards = document.querySelectorAll(".Card");
let asides = document.querySelectorAll(".Card_Aside");

let games = [
  "https://itch.io/embed-upload/11714188?color=ffffff",
  "https://itch.io/embed-upload/5559068?color=333333",
  "https://itch.io/embed-upload/8098606?color=333333",
];
let plays = document.querySelectorAll(".Display i");
let closes = document.querySelectorAll(".fa-circle-xmark");

let displaying = null;

let dist = "65vw";
if (window.innerWidth >= 768) {
  dist = "40vw";
}

window.addEventListener("resize", (e) => {
  if (window.innerWidth >= 992) {
    plays.forEach((item) => {
      if (
        item.style.display != "flex" &&
        item.parentNode != null &&
        item.parentNode.classList.length > 0
      ) {
        item.style.display = "flex";
      }
    });
  } else {
    plays.forEach((item) => {
      if (
        item.style.display != "none" &&
        item.parentNode != null &&
        item.parentNode.classList.length > 0
      ) {
        console.log("remove");

        item.style.display = "none";
      }
    });
  }
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
    let exit = false;
    let dont_show = (item) => {
      if (item == e.target) {
        exit = true;
      }
    };
    plays.forEach(dont_show);
    closes.forEach(dont_show);

    if (exit) {
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

// Game Functionality

//  '<iframe class="Game" frameborder="0" src="https://itch.io/embed-upload/11714188?color=ffffff" allowfullscreen="" width="1152" height="668"></iframe>',
//   '<iframe class="Game" frameborder="0" src="https://itch.io/embed-upload/5559068?color=333333" allowfullscreen="" width="640" height="380"></iframe>',
//   '<iframe class="Game" frameborder="0" src="https://itch.io/embed-upload/8098606?color=333333" allowfullscreen="" width="640" height="380"></iframe>'

const add_play_listener = (item, index) => {
  item.addEventListener("click", (e) => {
    item.style.display = "none";
    let game = document.createElement("iframe");
    game.src = games[index];
    game.classList = ["Game"];
    game.frameborder = "0";
    game.allowFullscreen = "true";
    game.width = "640";
    game.height = "380";
    item.parentNode.replaceChild(game, item);

    closes[index].style.display = "block";
    let closeEvent = (e) => {
      game.parentNode.replaceChild(item, game);
      item.style.display = "flex";
      game.remove();
      closes[index].style.display = "none";
      closes[index].removeEventListener("click", closeEvent);
    };
    closes[index].addEventListener("click", closeEvent);
  });
};

plays.forEach(add_play_listener);

let copyables = document.querySelectorAll(".Copyable");
// Copy text

function Copy(e) {
  var copyText = e.currentTarget.querySelector("span");
  navigator.clipboard.writeText(copyText.innerHTML);
  alert("Copied the text: " + copyText.innerHTML);
}

copyables.forEach((item) => {
  item.addEventListener("click", Copy);
});
