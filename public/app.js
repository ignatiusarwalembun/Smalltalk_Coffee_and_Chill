const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const preloader = document.getElementById('preloader');
const progress = document.getElementById('scrollProgress');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const menuCards = [...document.querySelectorAll('.menu-card')];
const menuSearch = document.getElementById('menuSearch');
const emptyState = document.getElementById('emptyState');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => {
  setTimeout(() => preloader?.classList.add('done'), 280);
});

function updateScrollUI() {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 18);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

  if (!reduceMotion) {
    document.querySelectorAll('[data-parallax-image]').forEach(img => {
      const parent = img.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.018;
      img.style.transform = `scale(1.055) translate3d(0, ${offset}px, 0)`;
    });
  }
}

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

menuToggle?.addEventListener('click', () => {
  const open = mobileMenu?.classList.toggle('open');
  menuToggle.classList.toggle('active', Boolean(open));
  menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
  document.body.classList.toggle('menu-open', Boolean(open));
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

let activeFilter = 'all';
function applyMenuFilter() {
  const query = menuSearch?.value.trim().toLowerCase() || '';
  let visible = 0;

  menuCards.forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const text = `${card.dataset.name || ''} ${card.textContent || ''}`.toLowerCase();
    const textMatch = text.includes(query);
    const show = categoryMatch && textMatch;
    card.classList.toggle('hidden', !show);
    if (show) visible += 1;
  });

  emptyState?.classList.toggle('show', visible === 0);
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    applyMenuFilter();
  });
});

menuSearch?.addEventListener('input', applyMenuFilter);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    entry.target.style.transitionDelay = `${delay}ms`;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
