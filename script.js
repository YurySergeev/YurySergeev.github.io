// Cursor spotlight
const root = document.documentElement;
const wantsSpotlight = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');

if (wantsSpotlight.matches) {
  window.addEventListener('pointermove', (event) => {
    root.style.setProperty('--spot-x', `${event.clientX}px`);
    root.style.setProperty('--spot-y', `${event.clientY}px`);
  }, { passive: true });
}

// Highlight the nav link 
const navLinks = new Map(
  [...document.querySelectorAll('.nav a')].map((link) => [link.hash.slice(1), link])
);

const setActive = (id) => {
  navLinks.forEach((link, key) => {
    const isActive = key === id;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
};

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) setActive(entry.target.id);
  }
}, { rootMargin: '-40% 0px -55% 0px' });

navLinks.forEach((_, id) => {
  const section = document.getElementById(id);
  if (section) observer.observe(section);
});


const lastId = [...navLinks.keys()].at(-1);
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive(lastId);
}, { passive: true });
