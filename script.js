// Animation d'apparition fluide des sections et cards
function animateOnScroll() {
  const elements = document.querySelectorAll("[data-animate]");
  const windowHeight = window.innerHeight;
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);
});

// Effet d'ondulation sur hover des cards
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Opacité réduite et transition plus douce
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, #e9e9ff22 0%, #fff0 100%)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.background = "";
  });
});

// Suppression du JS EmailJS et retour à un mailto simple
const form = document.getElementById("lead");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const subject = encodeURIComponent("Contact via landing page");
    const body = encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\n\nBonjour Grégory,\n\nJe souhaite en savoir plus sur les connecteurs personnalisés.\nMerci de me recontacter !`
    );
    window.location.href = `mailto:gregorydernaucourt@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

// === Effet de particules animées dans le header ===
function headerParticles() {
  const header = document.querySelector("header.hero");
  const canvas = document.getElementById("header-bg-canvas");
  if (!header || !canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height, particles;
  const PARTICLE_COUNT = 48;
  const COLORS = ["#a100ff", "#ff5700", "#fff", "#4b00ae", "#ffe082"];

  function resize() {
    width = header.offsetWidth;
    height = header.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function randomParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: 8 + Math.random() * 18,
      dx: -0.5 + Math.random(),
      dy: -0.5 + Math.random(),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: 0.18 + Math.random() * 0.22,
    };
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(randomParticle());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.restore();
    }
    // Lignes entre particules proches
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i],
          b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = 0.1;
          ctx.strokeStyle = a.color;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    for (let p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -20 || p.x > width + 20) p.dx *= -1;
      if (p.y < -20 || p.y > height + 20) p.dy *= -1;
    }
    draw();
    requestAnimationFrame(animate);
  }

  // Interaction souris : attraction douce
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    for (let p of particles) {
      const dist = Math.hypot(p.x - mx, p.y - my);
      if (dist < 120) {
        p.dx += (mx - p.x) * 0.0005;
        p.dy += (my - p.y) * 0.0005;
      }
    }
  });

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });

  resize();
  createParticles();
  animate();
}

document.addEventListener("DOMContentLoaded", () => {
  headerParticles();
  // Scroll fluide pour le bouton scroll-down
  const scrollBtn = document.querySelector(".scroll-down");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
