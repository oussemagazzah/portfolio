// Mobile menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Dark mode
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") toggleSwitch.checked = true;
}

// Auto year
document.getElementById("datee").textContent = new Date().getFullYear();

// Typewriter effect
const words = ["Software Engineer", "MERN Stack Developer", "Full-Stack Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.querySelector(".typed-text");

function typeEffect() {
  const current = words[wordIndex];
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

typeEffect();

// Scroll animations (Intersection Observer)
const animateElements = document.querySelectorAll(
  ".about-content, .skills-content, .project-grid, .timeline, .contact-content, .section-header"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animateElements.forEach((el) => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute("data-width");
        entry.target.style.width = width + "%";
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillBars.forEach((bar) => skillObserver.observe(bar));

// Animated counters
const statNumbers = document.querySelectorAll(".stat-number");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"));
        let count = 0;
        const speed = Math.max(50, Math.floor(2000 / target));

        const updateCount = () => {
          count++;
          el.textContent = count + "+";
          if (count < target) {
            setTimeout(updateCount, speed);
          }
        };
        updateCount();
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((num) => counterObserver.observe(num));

// Contact form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showFormMessage("Please fill in all required fields", "error");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    showFormMessage("Please enter a valid email address", "error");
    return;
  }

  const btn = this.querySelector("button[type='submit']");
  const originalText = btn.innerHTML;
  btn.innerHTML = "Sending... <i class='fas fa-spinner fa-spin'></i>";
  btn.disabled = true;

  const subject = document.getElementById("subject").value.trim() || "Portfolio Contact";
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

  const mailtoLink = `mailto:oussema.gazzeh@polytechnicien.tn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;

  btn.innerHTML = "Sent! <i class='fas fa-check'></i>";
  showFormMessage("Opening your email app...", "success");

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.disabled = false;
    contactForm.reset();
    const existing = document.querySelector(".form-message");
    if (existing) existing.remove();
  }, 3000);
});

function showFormMessage(text, type) {
  const existing = document.querySelector(".form-message");
  if (existing) existing.remove();

  const msg = document.createElement("div");
  msg.className = `form-message form-message--${type}`;
  msg.textContent = text;
  contactForm.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
