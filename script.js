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

// Countdown timer — target: May 5, 2026 8:00 PM IST (UTC+5:30)
const target = new Date('2026-04-27T14:30:00Z'); // 8PM IST = 14:30 UTC
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
