// Enrollment notification popup
(function () {
  const cities = [
    'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Chennai',
    'Kolkata', 'Ahmedabad', 'Jaipur', 'Noida', 'Gurgaon', 'Indore',
    'Chandigarh', 'Bhopal', 'Lucknow', 'Surat', 'Kochi', 'Coimbatore',
    'New York', 'San Francisco', 'Seattle', 'Austin', 'Chicago', 'Boston',
    'Toronto', 'Vancouver', 'Calgary', 'London', 'Dubai', 'Singapore',
    'Sydney', 'Berlin', 'Amsterdam',
  ];
  const flags = {
    'New York': '🇺🇸', 'San Francisco': '🇺🇸', 'Seattle': '🇺🇸',
    'Austin': '🇺🇸', 'Chicago': '🇺🇸', 'Boston': '🇺🇸',
    'Toronto': '🇨🇦', 'Vancouver': '🇨🇦', 'Calgary': '🇨🇦',
    'London': '🇬🇧', 'Dubai': '🇦🇪', 'Singapore': '🇸🇬',
    'Sydney': '🇦🇺', 'Berlin': '🇩🇪', 'Amsterdam': '🇳🇱',
  };

  const el = document.createElement('div');
  el.id = 'enroll-popup';
  el.innerHTML = `
    <div class="enroll-popup__icon">🎓</div>
    <div class="enroll-popup__body">
      <span class="enroll-popup__tag">Just Enrolled</span>
      <p class="enroll-popup__city"></p>
    </div>
    <div class="enroll-popup__pulse"></div>
  `;
  document.body.appendChild(el);

  const cityEl = el.querySelector('.enroll-popup__city');
  let shown = [];

  function pickCity() {
    if (shown.length === cities.length) shown = [];
    let city;
    do { city = cities[Math.floor(Math.random() * cities.length)]; } while (shown.includes(city));
    shown.push(city);
    return city;
  }

  function show() {
    const city = pickCity();
    const flag = flags[city] || '🇮🇳';
    cityEl.textContent = flag + ' ' + city;
    el.classList.add('visible');
    setTimeout(() => el.classList.remove('visible'), 3800);
  }

  // Start after 4s, then every 6–10s
  setTimeout(() => {
    show();
    setInterval(show, Math.random() * 4000 + 6000);
  }, 4000);
})();

// Confetti celebration
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const COLORS = ['#22d3ee','#818cf8','#f472b6','#fb923c','#4ade80','#facc15','#fff','#f87171'];
  const SHAPES = ['rect','circle','ribbon'];
  const TOTAL = 180;
  let particles = [];
  let animId;

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function rand(a, b) { return Math.random() * (b - a) + a; }
  function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function spawn() {
    for (let i = 0; i < TOTAL; i++) {
      const angle = rand(-0.5, Math.PI + 0.5);
      const speed = rand(4, 14);
      particles.push({
        x: rand(canvas.width * 0.1, canvas.width * 0.9),
        y: rand(-20, 0),
        vx: Math.cos(angle) * rand(1, 4) * (Math.random() > 0.5 ? 1 : -1),
        vy: speed,
        rot: rand(0, Math.PI * 2),
        rotV: rand(-0.12, 0.12),
        w: rand(7, 14),
        h: rand(4, 9),
        color: randItem(COLORS),
        shape: randItem(SHAPES),
        alpha: 1,
        gravity: rand(0.12, 0.22),
        wobble: rand(0, Math.PI * 2),
        wobbleV: rand(0.05, 0.12),
      });
    }
  }

  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    if (p.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === 'ribbon') {
      ctx.fillRect(-p.w / 2, -p.h / 8, p.w, p.h / 4);
    } else {
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.wobble += p.wobbleV;
      p.x += p.vx + Math.sin(p.wobble) * 0.8;
      p.vy += p.gravity;
      p.y += p.vy;
      p.rot += p.rotV;
      if (p.y > canvas.height * 0.6) p.alpha -= 0.018;
      drawParticle(p);
    });
    particles = particles.filter(p => p.alpha > 0);
    if (particles.length > 0) {
      animId = requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  }

  // First burst on load
  spawn();
  animId = requestAnimationFrame(tick);

  // Second burst after 800ms for extra pop
  setTimeout(() => { spawn(); }, 800);
})();

// Launch banner close
const launchBanner = document.getElementById('launchBanner');
const launchBannerClose = document.getElementById('launchBannerClose');
const launchBannerCTA = document.getElementById('launchBannerCTA');
if (launchBannerClose) {
  launchBannerClose.addEventListener('click', () => {
    launchBanner.style.transition = 'opacity .3s, max-height .4s, padding .4s';
    launchBanner.style.opacity = '0';
    launchBanner.style.maxHeight = '0';
    launchBanner.style.padding = '0';
    launchBanner.style.overflow = 'hidden';
  });
}
if (launchBannerCTA) {
  launchBannerCTA.addEventListener('click', () => {
    launchBanner.style.transition = 'opacity .3s, max-height .4s, padding .4s';
    launchBanner.style.opacity = '0';
    launchBanner.style.maxHeight = '0';
    launchBanner.style.padding = '0';
    launchBanner.style.overflow = 'hidden';
  });
}

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  fab.classList.toggle('visible', window.scrollY > 500);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// FAB
const fab = document.getElementById('fab');

// Countdown timer — target: May 15, 2026 10:00 AM IST (UTC+5:30)
const target = new Date('2026-05-18T04:30:00Z'); // 10AM IST = 04:30 UTC
function updateCountdown() {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<span style="color:var(--green);font-weight:700">Batch has started! 🎉</span>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent  = String(d).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Smooth anchor scroll (offset for fixed nav)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// Intersection observer — fade-in sections
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.curriculum__week, .problem__card, .testimonial-card, .perk, .faq__item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});
document.addEventListener('animationiteration', () => {}, false);
// Reuse observer callback
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }, i * 80);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.curriculum__week, .problem__card, .testimonial-card, .perk, .faq__item').forEach(el => {
  fadeObserver.observe(el);
});
