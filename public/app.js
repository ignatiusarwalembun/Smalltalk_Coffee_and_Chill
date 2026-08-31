const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const menuCards = [...document.querySelectorAll('.menu-card')];
const menuSearch = document.getElementById('menuSearch');
const emptyState = document.getElementById('emptyState');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24));

menuToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});

document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

let activeFilter = 'all';
function applyMenuFilter() {
  const query = menuSearch.value.trim().toLowerCase();
  let visible = 0;
  menuCards.forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const textMatch = card.dataset.name.includes(query) || card.textContent.toLowerCase().includes(query);
    const show = categoryMatch && textMatch;
    card.classList.toggle('hidden', !show);
    if (show) visible += 1;
  });
  emptyState.classList.toggle('show', visible === 0);
}

filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
  applyMenuFilter();
}));

menuSearch.addEventListener('input', applyMenuFilter);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
