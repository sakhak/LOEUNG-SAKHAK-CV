const loading = document.querySelector(".loading");

window.addEventListener("load", () => {
  setTimeout(() => {
    loading.classList.add("hidden");
    setTimeout(() => {
      loading.remove();
      initAnimations();
    }, 500);
  }, 1500);
});

function initAnimations() {
  const header = document.querySelector("header");
  const homeSection = document.querySelector(".home");

  setTimeout(() => {
    header.classList.add("active");
  }, 200);

  setTimeout(() => {
    homeSection.classList.add("active");
  }, 500);

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add("active");
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll("section:not(.home)").forEach((section) => {
    observer.observe(section);
  });
}

const navlist = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("section");
const logolink = document.querySelector(".logo");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
  document.body.style.overflow = navbar.classList.contains("active")
    ? "hidden"
    : "auto";
});

document.addEventListener("click", (e) => {
  if (
    window.innerWidth <= 768 &&
    !e.target.closest("header nav") &&
    !e.target.closest("#menu-icon") &&
    navbar.classList.contains("active")
  ) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

navlist.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

navlist.forEach((link, idx) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    navlist.forEach((l) => l.classList.remove("active"));

    link.classList.add("active");

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 20,
        behavior: "smooth",
      });
    }
  });
});

logolink.addEventListener("click", (e) => {
  e.preventDefault();

  navlist.forEach((l) => l.classList.remove("active"));

  navlist[0].classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (window.innerWidth <= 768) {
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

const resumeBtns = document.querySelectorAll(".resume-btn");
const resumeDetails = document.querySelectorAll(".resume-detail");

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    btn.classList.add("active");

    const activeDetail = document.querySelector(".resume-detail.active");
    if (activeDetail) {
      activeDetail.style.opacity = "0";
      activeDetail.style.transform = "translateX(20px)";

      setTimeout(() => {
        activeDetail.classList.remove("active");

        resumeDetails[idx].classList.add("active");
        setTimeout(() => {
          resumeDetails[idx].style.opacity = "1";
          resumeDetails[idx].style.transform = "translateX(0)";
        }, 50);
      }, 300);
    }
  });
});
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
let currentSlide = 0;
const totalSlides = document.querySelectorAll(".portfolio-detail").length;
const portfolioDetails = document.querySelectorAll(".portfolio-detail");
const imgSlide = document.querySelector(".img-slide");

function updateCarousel() {
  imgSlide.style.transform = `translateX(-${currentSlide * 100}%)`;

  portfolioDetails.forEach((detail, index) => {
    detail.classList.remove("active");
    if (index === currentSlide) {
      detail.classList.add("active");
    }
  });

  arrowLeft.classList.toggle("disabled", currentSlide === 0);
  arrowRight.classList.toggle("disabled", currentSlide === totalSlides - 1);
}

arrowRight.addEventListener("click", () => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateCarousel();
  }
});

arrowLeft.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
});

let carouselInterval = setInterval(() => {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  updateCarousel();
}, 5000);

const carouselContainer = document.querySelector(".porfolio-carousel");
carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(carouselInterval);
});

carouselContainer.addEventListener("mouseleave", () => {
  carouselInterval = setInterval(() => {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    updateCarousel();
  }, 5000);
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const submitBtn = contactForm.querySelector(".btn");

  submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
    submitBtn.innerHTML = "Send Message";
    submitBtn.disabled = false;
  }, 1500);
});

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.querySelector("#current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const serviceBoxes = document.querySelectorAll(".service-box");
  serviceBoxes.forEach((box, index) => {
    box.style.animationDelay = `${index * 0.1}s`;
  });
});

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mouseenter", (e) => {
    const x = e.pageX - button.offsetLeft;
    const y = e.pageY - button.offsetTop;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    arrowRight.click();
  } else if (e.key === "ArrowLeft") {
    arrowLeft.click();
  }
});

let touchStartX = 0;
let touchEndX = 0;

carouselContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carouselContainer.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    arrowRight.click();
  }

  if (touchEndX > touchStartX + swipeThreshold) {
    arrowLeft.click();
  }
}

