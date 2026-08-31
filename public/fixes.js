(() => {
  const cards = [...document.querySelectorAll('.menu-card')];
  const chat = document.querySelector('.floating-chat');
  const footer = document.querySelector('footer');
  let lastTrigger = null;

  const copy = {
    en: { label: 'MENU DETAIL', close: 'Close menu detail', noDescription: 'A detailed description is not listed on Smalltalk’s current menu.', source: 'Smalltalk Coffee & Chill · Current menu' },
    id: { label: 'DETAIL MENU', close: 'Tutup detail menu', noDescription: 'Deskripsi detail belum tercantum pada menu Smalltalk saat ini.', source: 'Smalltalk Coffee & Chill · Menu saat ini' },
    no: { label: 'MENYDETALJER', close: 'Lukk menydetaljer', noDescription: 'En detaljert beskrivelse er ikke oppgitt i Smalltalk sin nåværende meny.', source: 'Smalltalk Coffee & Chill · Gjeldende meny' },
    zh: { label: '菜单详情', close: '关闭菜单详情', noDescription: 'Smalltalk 当前菜单中未列出更详细的说明。', source: 'Smalltalk Coffee & Chill · 当前菜单' },
    ja: { label: 'メニュー詳細', close: 'メニュー詳細を閉じる', noDescription: '現在のSmalltalkメニューには詳しい説明が記載されていません。', source: 'Smalltalk Coffee & Chill · 現在のメニュー' },
    ko: { label: '메뉴 상세', close: '메뉴 상세 닫기', noDescription: '현재 Smalltalk 메뉴에는 자세한 설명이 기재되어 있지 않습니다.', source: 'Smalltalk Coffee & Chill · 현재 메뉴' }
  };

  function currentCopy() {
    const lang = document.documentElement.lang || 'en';
    return copy[lang] || copy.en;
  }

  const overlay = document.createElement('div');
  overlay.className = 'menu-detail-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="menu-detail-panel" role="dialog" aria-modal="true" aria-labelledby="menuDetailName">
      <button class="menu-detail__close" type="button">×</button>
      <div class="menu-detail__image"><img alt="" /></div>
      <div class="menu-detail__content">
        <p class="menu-detail__eyebrow"></p>
        <span class="menu-detail__category"></span>
        <h2 class="menu-detail__name" id="menuDetailName"></h2>
        <strong class="menu-detail__price"></strong>
        <p class="menu-detail__description"></p>
        <small class="menu-detail__source"></small>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const closeButton = overlay.querySelector('.menu-detail__close');
  const detailImage = overlay.querySelector('.menu-detail__image img');
  const detailEyebrow = overlay.querySelector('.menu-detail__eyebrow');
  const detailCategory = overlay.querySelector('.menu-detail__category');
  const detailName = overlay.querySelector('.menu-detail__name');
  const detailPrice = overlay.querySelector('.menu-detail__price');
  const detailDescription = overlay.querySelector('.menu-detail__description');
  const detailSource = overlay.querySelector('.menu-detail__source');

  function openDetail(card) {
    const strings = currentCopy();
    const image = card.querySelector('img');
    const category = card.querySelector('.menu-card__category')?.textContent?.trim() || '';
    const name = card.querySelector('h4')?.textContent?.trim() || '';
    const price = card.querySelector('.menu-card__price')?.textContent?.trim() || '';
    const description = card.querySelector('.menu-card__body > p')?.textContent?.trim() || '';

    lastTrigger = card;
    detailImage.src = image?.currentSrc || image?.src || '';
    detailImage.alt = `${name} visual`;
    detailEyebrow.textContent = strings.label;
    detailCategory.textContent = category;
    detailName.textContent = name;
    detailPrice.textContent = price;
    detailDescription.textContent = description || strings.noDescription;
    detailDescription.classList.toggle('muted', !description);
    detailSource.textContent = strings.source;
    closeButton.setAttribute('aria-label', strings.close);

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-detail-open');
    requestAnimationFrame(() => closeButton.focus());
  }

  function closeDetail() {
    if (!overlay.classList.contains('open')) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-detail-open');
    lastTrigger?.focus?.();
  }

  cards.forEach(card => {
    const name = card.querySelector('h4')?.textContent?.trim() || 'menu';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${name}`);
    card.addEventListener('click', () => openDetail(card));
    card.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openDetail(card);
    });
  });

  closeButton.addEventListener('click', closeDetail);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeDetail();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) closeDetail();
  });

  function positionFloatingChat() {
    if (!chat || !footer) return;
    const footerTop = footer.getBoundingClientRect().top;
    const safeBottom = 20;
    const gapAboveFooter = 16;
    const footerOverlap = Math.max(0, window.innerHeight - footerTop + gapAboveFooter);
    chat.style.bottom = `${Math.max(safeBottom, footerOverlap)}px`;
  }

  let raf = 0;
  function requestChatPosition() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      positionFloatingChat();
      raf = 0;
    });
  }

  window.addEventListener('scroll', requestChatPosition, { passive: true });
  window.addEventListener('resize', requestChatPosition, { passive: true });
  window.addEventListener('load', positionFloatingChat);
  positionFloatingChat();

  const seasonal = document.querySelector('.menu-seasonal > div');
  if (seasonal && !seasonal.querySelector('.menu-seasonal__status')) {
    const status = document.createElement('p');
    status.className = 'menu-seasonal__status';
    status.textContent = 'Menu seasonal belum tersedia saat ini.';
    status.style.margin = '12px 0 0';
    status.style.maxWidth = '440px';
    status.style.fontSize = '12px';
    status.style.lineHeight = '1.6';
    status.style.letterSpacing = '.01em';
    status.style.color = '#bdb2a6';
    seasonal.appendChild(status);
  }
})();
