const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const preloader = document.getElementById('preloader');
const progress = document.getElementById('scrollProgress');
const cursorGlow = document.getElementById('cursorGlow');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const menuCards = [...document.querySelectorAll('.menu-card')];
const menuSearch = document.getElementById('menuSearch');
const emptyState = document.getElementById('emptyState');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => {
  setTimeout(() => preloader?.classList.add('done'), 420);
});

function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 22);

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${scrollable > 0 ? (y / scrollable) * 100 : 0}%`;

  if (!reduceMotion) {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = Number(el.dataset.parallax || 0);
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${centerOffset * speed}px, 0)`;
    });

    document.querySelectorAll('[data-parallax-image]').forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      const amount = (rect.top - window.innerHeight) * 0.025;
      img.style.transform = `scale(1.1) translate3d(0, ${amount}px, 0)`;
    });
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuToggle?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
});

document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuToggle?.classList.remove('active');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

let activeFilter = 'all';
function applyMenuFilter() {
  const query = menuSearch?.value.trim().toLowerCase() || '';
  let visible = 0;

  menuCards.forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const searchable = `${card.dataset.name || ''} ${card.textContent}`.toLowerCase();
    const textMatch = searchable.includes(query);
    const show = categoryMatch && textMatch;
    card.classList.toggle('hidden', !show);
    if (show) visible += 1;
  });

  emptyState?.classList.toggle('show', visible === 0);
}

filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
  applyMenuFilter();
}));

menuSearch?.addEventListener('input', applyMenuFilter);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    entry.target.style.transitionDelay = `${delay}ms`;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', event => {
    if (!cursorGlow) return;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = '1';
  });

  document.documentElement.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0';
  });

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateX = y * -5;
      const rotateY = x * 6;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', event => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.09}px, ${y * 0.09}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
}

const heroVisual = document.querySelector('.hero-visual');
if (!reduceMotion && heroVisual && window.matchMedia('(pointer:fine)').matches) {
  heroVisual.addEventListener('mousemove', event => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const main = heroVisual.querySelector('.hero-photo-main');
    const small = heroVisual.querySelector('.hero-photo-small');
    if (main) main.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
    if (small) small.style.transform = `rotate(4deg) translate(${x * -12}px, ${y * -12}px)`;
  });
  heroVisual.addEventListener('mouseleave', () => {
    const main = heroVisual.querySelector('.hero-photo-main');
    const small = heroVisual.querySelector('.hero-photo-small');
    if (main) main.style.transform = '';
    if (small) small.style.transform = 'rotate(4deg)';
  });
}
