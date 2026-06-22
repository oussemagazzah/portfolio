// Hamburger menu
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
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// Dark mode
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);
if (currentTheme === "dark") toggleSwitch.checked = true;

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

// Scroll progress bar
const progressBar = document.getElementById("scroll-progress");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
  });
}

// Back to top button
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Staggered card reveal
const staggerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(".project-card, .cert-card");
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("revealed");
          }, i * 100);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".project-grid, .cert-grid").forEach((grid) => {
  staggerObserver.observe(grid);
});

// Magnetic hover on social icons
const magneticElements = document.querySelectorAll(
  ".hero-social a, .contact-social a, .footer-social a"
);

magneticElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0, 0)";
  });
});

// 3D Mouse Tilt on hero image
const heroWrapper = document.querySelector(".hero-image-wrapper");
if (heroWrapper) {
  const heroInner = heroWrapper.querySelector(".hero-image-inner");

  heroWrapper.addEventListener("mousemove", (e) => {
    const rect = heroWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    heroInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  heroWrapper.addEventListener("mouseleave", () => {
    heroInner.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

// Particles canvas with mouse interaction and OG morph
const canvas = document.getElementById("particles-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animationId;
  let mouse = { x: null, y: null, radius: 150 };
  let morphTargets = [];
  let isMorphing = false;
  let morphPhase = 0;
  const MORPH_DURATION = 120;
  const HOLD_DURATION = 90;
  let morphTimer = 0;

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  function generateOGShape() {
    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");
    const size = Math.min(canvas.width, canvas.height) * 0.6;
    const fontSize = Math.floor(size * 0.5);
    offscreen.width = Math.ceil(fontSize * 3.2);
    offscreen.height = Math.ceil(fontSize * 1.6);

    offCtx.fillStyle = "#000";
    offCtx.fillRect(0, 0, offscreen.width, offscreen.height);
    offCtx.fillStyle = "#fff";
    offCtx.font = `900 ${fontSize}px "Inter", "Raleway", sans-serif`;
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillText("OG", offscreen.width / 2, offscreen.height / 2);

    const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imageData.data;
    const positions = [];

    const step = 2;
    for (let y = 0; y < offscreen.height; y += step) {
      for (let x = 0; x < offscreen.width; x += step) {
        const i = (y * offscreen.width + x) * 4;
        if (data[i] > 200) {
          positions.push({
            x: x - offscreen.width / 2,
            y: y - offscreen.height / 2,
          });
        }
      }
    }
    return positions;
  }

  function triggerMorph() {
    const raw = generateOGShape();
    if (raw.length < 20) return;

    const angle = -Math.PI / 4;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const cx = canvas.width * 0.18;
    const cy = canvas.height * 0.15;
    const maxExtent = raw.reduce((m, p) => Math.max(m, Math.abs(p.x), Math.abs(p.y)), 0) || 1;
    const scale = Math.min(canvas.width * 0.22, canvas.height * 0.22) / maxExtent;

    const targets = raw.map((p) => {
      const rx = p.x * scale;
      const ry = p.y * scale;
      return {
        x: cx + rx * cos - ry * sin + (Math.random() - 0.5) * 6,
        y: cy + rx * sin + ry * cos + (Math.random() - 0.5) * 6,
      };
    });

    morphTargets = targets;
    for (let i = 0; i < particles.length; i++) {
      const idx = Math.floor((i / particles.length) * targets.length);
      const t = targets[idx];
      particles[i].morphTx = t.x + (Math.random() - 0.5) * 4;
      particles[i].morphTy = t.y + (Math.random() - 0.5) * 4;
    }
    isMorphing = true;
    morphPhase = 0;
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.morphTx = null;
      this.morphTy = null;
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.4 + 0.2;
      this.baseSpeedX = Math.cos(angle) * speed;
      this.baseSpeedY = Math.sin(angle) * speed;
      this.speedX = this.baseSpeedX;
      this.speedY = this.baseSpeedY;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      if (isMorphing && this.morphTx !== null) {
        const dx = this.morphTx - this.x;
        const dy = this.morphTy - this.y;
        this.speedX += dx * 0.03;
        this.speedY += dy * 0.03;
        this.speedX *= 0.92;
        this.speedY *= 0.92;
      } else {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.speedX -= Math.cos(angle) * force * 1.2;
            this.speedY -= Math.sin(angle) * force * 1.2;
          }
        }
        this.speedX += (this.baseSpeedX - this.speedX) * 0.02;
        this.speedY += (this.baseSpeedY - this.speedY) * 0.02;
      }

      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) {
        this.speedX *= -1;
        this.baseSpeedX *= -1;
        this.x = this.x < 0 ? 0 : canvas.width;
      }
      if (this.y < 0 || this.y > canvas.height) {
        this.speedY *= -1;
        this.baseSpeedY *= -1;
        this.y = this.y < 0 ? 0 : canvas.height;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 205, 66, ${this.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = 100;
    particles = Array.from({ length: count }, () => new Particle());
  }

  function connectParticles() {
    const maxDist = 160;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = 0.1 * (1 - dist / maxDist);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 205, 66, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isMorphing) {
      morphPhase++;
      if (morphPhase > MORPH_DURATION + HOLD_DURATION) {
        isMorphing = false;
        morphPhase = 0;
        particles.forEach((p) => { p.morphTx = null; p.morphTy = null; });
      }
    } else {
      morphTimer++;
      if (morphTimer > 1800 + Math.random() * 300) {
        morphTimer = 0;
        triggerMorph();
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connectParticles();
    animationId = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });
}

// Split-text character reveal
const splitTexts = document.querySelectorAll(".split-text");

const splitObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const text = entry.target;
        const original = text.textContent;
        text.textContent = "";
        text.style.opacity = "1";
        [...original].forEach((char, i) => {
          const span = document.createElement("span");
          span.className = "split-char";
          span.textContent = char === " " ? "\u00A0" : char;
          span.style.animationDelay = `${i * 0.035}s`;
          text.appendChild(span);
        });
        splitObserver.unobserve(text);
      }
    });
  },
  { threshold: 0.5 }
);

splitTexts.forEach((el) => splitObserver.observe(el));

// Scroll animations (IntersectionObserver)
const animateElements = document.querySelectorAll(
  ".fade-in, .fade-left, .fade-right, .fade-up"
);

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animateElements.forEach((el) => scrollObserver.observe(el));

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

  const mailtoLink = `mailto:oussema.gazzeh@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

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
