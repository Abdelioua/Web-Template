let mainColor = localStorage.getItem("main-color");
if (mainColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("main-color")
  );
  document.querySelectorAll(".colors li").forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.colors === mainColor) {
      e.classList.add("active");
    }
  });
}

let page = document.querySelector(".page");
let imgs = ["01", "02", "03", "04", "05", "06", "07", "08"];
let backgroundInterval;
let switchBackground = true;
page.style.backgroundImage = `url("/imgs/01.jpg")`;

let randomBackgroundSwitch = localStorage.getItem("bgk-switch");
if (
  randomBackgroundSwitch ===
  document.querySelector(".backgrounds .no").dataset.back
) {
  switchBackground = false;
  clearInterval(backgroundInterval);
  document.querySelector(".backgrounds .yes").classList.remove("active");
  document.querySelector(".backgrounds .no").classList.add("active");
}
//Settings to change main theme color

document.querySelector(".settings .toggle i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings").classList.toggle("open");
};

let colors = document.querySelectorAll(".colors li");
colors.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");

    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.colors
    );
    //set local storage main theme color
    localStorage.setItem("main-color", e.target.dataset.colors);
    document.querySelector(".option-box h4").style.color =
      e.target.dataset.colors;
  });
});

let backgroundWork = document.querySelectorAll(".backgrounds span");
backgroundWork.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.back === "yes") {
      switchBackground = true;
      randomizeBackground();
      localStorage.setItem("bgk-switch", e.target.dataset.back);
    } else {
      switchBackground = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("bgk-switch", e.target.dataset.back);
    }
  });
});
//change background images

function randomizeBackground() {
  if (switchBackground === true) {
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * imgs.length);
      page.style.backgroundImage = `url("/imgs/${imgs[random]}.jpg")`;
    }, 3000);
  }
}
randomizeBackground();

let skills = document.querySelectorAll(".skill-progress span");
let skillSection = document.querySelector(".skills");

window.onscroll = function () {
  {
    for (let i = 0; i < skills.length; i++) {
      if (window.scrollY > skillSection.offsetTop - 300) {
        skills[i].style.width = skills[i].dataset.skill;
      } else {
        skills[i].style.width = "0";
      }
    }
  }
};

let arrayOfImages = document.querySelectorAll(".image-box img");

arrayOfImages.forEach((e) => {
  e.addEventListener("click", (ele) => {
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);

    let popUp = document.createElement("div");
    popUp.classList = "popUp";
    overlay.appendChild(popUp);
    let popImg = document.createElement("img");
    popImg.src = e.src;
    popUp.appendChild(popImg);
    document.body.appendChild(popUp);

    let alter = document.createElement("div");
    alter.className = "alter";
    alter.appendChild(document.createTextNode(e.alt));
    popUp.prepend(alter);

    let exitBtn = document.createElement("span");
    exitBtn.className = "exit-button";
    exitBtn.appendChild(document.createTextNode("x"));
    popUp.appendChild(exitBtn);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "exit-button" || e.target.className == "overlay") {
    document.querySelector(".overlay").remove();
    document.querySelector(".popUp").remove();
  }
});

let allBullets = document.querySelectorAll(".bullet");

let links = document.querySelectorAll(".links a");

function scrollToData(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToData(links);
scrollToData(allBullets);

document.querySelector(".settings .reset-options").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

let burger = document.querySelector(".burger");
let tLinks = document.querySelector(".header .links");

burger.onclick = function (e) {
  e.stopPropagation();
  burger.classList.toggle("active");
  tLinks.classList.toggle("open");
};
tLinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", function (e) {
  if (e.target !== burger && e.target !== tLinks) {
    if (burger.classList.contains("active")) {
      burger.classList.remove("active");
      tLinks.classList.remove("open");
    }
  }
});
