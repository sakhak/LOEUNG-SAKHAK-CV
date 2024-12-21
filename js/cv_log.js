const navlist = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("section");
const logolink = document.querySelector(".logo");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});
const activePage = () => {
  const header = document.querySelector("header");
  const barBox = document.querySelector(".bars-box");

  header.classList.remove("active");
  setTimeout(() => {
    header.classList.add("active");
  }, 1100);
  navlist.forEach((link) => {
    link.classList.remove("active");
  });
  barBox.classList.remove("active");
  setTimeout(() => {
    barBox.classList.add("active");
  }, 1100);
  sections.forEach((section) => {
    section.classList.remove("active");
  });
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

navlist.forEach((link, idx) => {
  link.addEventListener("click", () => {
    if (!link.classList.contains("active")) {
      activePage();
      link.classList.add("active");

      setTimeout(() => {
        sections[idx].classList.add("active");
      }, 1100);
    }
  });
});
// =========This is logo=======
logolink.addEventListener("click", () => {
  if (!navlist[0].classList.contains("active")) {
    activePage();
    navlist[0].classList.add("active");
    setTimeout(() => {
      sections[0].classList.add("active");
    }, 1100);
  }
});
const resumeBtns = document.querySelectorAll(".resume-btn");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");

    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");

    resumeDetails.forEach((detail) => {
      detail.classList.remove("active");
    });
    resumeDetails[idx].classList.add("active");
  });
});
// const arrowRight = document.querySelector(
//   ".portfolio-box .navigation .arrow-right"
// );
// const arrowleft = document.querySelector(
//   ".portfolio-box .navigation .arrow-left"
// );
// let idx = 0;
// const activeporfolio = () => {
//   const imgslide = document.querySelector(".portfolio-box .img-slide");
//   imgslide.style.transform = `translateX(calc(${index * 2}rem))`;
// };
// arrowRight.addEventListener("click", () => {
//   if (index < 4) {
//     index++;
//   } else {
//     index = 5;
//   }
//   activeporfolio();
// });
// arrowleft.addEventListener("click", () => {
//   if (index > 1) {
//     index--;
//   } else {
//     index = 0;
//   }
//   activeporfolio();
// });

//  =====This is new =======

const arrowRight = document.querySelector(
  ".portfolio-box .navigation .arrow-right"
);
const arrowLeft = document.querySelector(
  ".portfolio-box .navigation .arrow-left"
);
let index = 0; // Corrected variable name

const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-box .img-slide");
  const portfolioDetails = document.querySelectorAll(
    ".portfolio-box .portfolio-detail"
  );
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`; // Updated for proper horizontal translation
  portfolioDetails.forEach((detail) => {
    detail.classList.remove("active");
  });
  portfolioDetails[index].classList.add("active");
};

arrowRight.addEventListener("click", () => {
  if (index < 3) {
    // Assuming there are 5 slides (0-4)
    index++;
    arrowLeft.classList.remove(`disabled`);
  } else {
    index = 3;
    arrowRight.classList.add(`disabled`);
  }
  activePortfolio();
});

arrowLeft.addEventListener("click", () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove(`disabled`);
  } else {
    index = 0;
    arrowLeft.classList.add(`disabled`);
  }
  activePortfolio();
});
