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

  /* 7) Public news feed — injected directly below GOOD COFFEE · CALM SPACE · GOOD COMPANY. */
  const NEWS_API = 'https://smalltalk-coffee-and-chill-production.up.railway.app/api/news';
  const newsCopy = {
    en: { eyebrow: 'LATEST FROM SMALLTALK', title: 'News & updates.', empty: 'No new updates at the moment.', error: 'Latest updates are temporarily unavailable.', read: 'Read more' },
    id: { eyebrow: 'KABAR DARI SMALLTALK', title: 'News & update.', empty: 'Belum ada kabar terbaru saat ini.', error: 'Kabar terbaru sedang tidak dapat dimuat.', read: 'Selengkapnya' },
    no: { eyebrow: 'SISTE FRA SMALLTALK', title: 'Nyheter & oppdateringer.', empty: 'Ingen nye oppdateringer akkurat nå.', error: 'De siste oppdateringene er midlertidig utilgjengelige.', read: 'Les mer' },
    zh: { eyebrow: 'SMALLTALK 最新消息', title: '新闻与动态。', empty: '目前暂无最新动态。', error: '暂时无法加载最新动态。', read: '了解更多' },
    ja: { eyebrow: 'SMALLTALK 最新情報', title: 'ニュース & アップデート。', empty: '現在、新しいお知らせはありません。', error: '最新情報を一時的に読み込めません。', read: '詳しく見る' },
    ko: { eyebrow: 'SMALLTALK 최신 소식', title: '뉴스 & 업데이트.', empty: '현재 새로운 소식이 없습니다.', error: '최신 소식을 일시적으로 불러올 수 없습니다.', read: '더 보기' }
  };
  const localeMap = { en: 'en-US', id: 'id-ID', no: 'nb-NO', zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR' };
  let latestNews = [];
  let newsLoadState = 'loading';

  function newsStrings() {
    const lang = document.documentElement.lang || 'en';
    return newsCopy[lang] || newsCopy.en;
  }

  function buildNewsSection() {
    const statement = document.querySelector('.statement');
    if (!statement || document.querySelector('.news-feed-section')) return null;
    const section = document.createElement('section');
    section.className = 'news-feed-section';
    section.setAttribute('aria-label', 'Smalltalk news and updates');
    section.innerHTML = `
      <div class="news-feed__head">
        <div>
          <small class="news-feed__eyebrow"></small>
          <h2 class="news-feed__title"></h2>
        </div>
        <span class="news-feed__live"><i></i>LIVE</span>
      </div>
      <div class="news-feed__grid" aria-live="polite"></div>`;
    statement.insertAdjacentElement('afterend', section);
    return section;
  }

  const newsSection = buildNewsSection();

  function formatNewsDate(value) {
    if (!value) return '';
    const lang = document.documentElement.lang || 'en';
    try {
      return new Intl.DateTimeFormat(localeMap[lang] || 'en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));
    } catch (_) {
      return '';
    }
  }

  function renderNews() {
    if (!newsSection) return;
    const strings = newsStrings();
    newsSection.querySelector('.news-feed__eyebrow').textContent = strings.eyebrow;
    newsSection.querySelector('.news-feed__title').textContent = strings.title;
    const grid = newsSection.querySelector('.news-feed__grid');
    grid.innerHTML = '';

    if (newsLoadState === 'loading') {
      for (let i = 0; i < 3; i += 1) {
        const skeleton = document.createElement('div');
        skeleton.className = 'news-card news-card--skeleton';
        skeleton.innerHTML = '<span></span><b></b><p></p><p></p>';
        grid.appendChild(skeleton);
      }
      return;
    }

    if (newsLoadState === 'error') {
      const state = document.createElement('div');
      state.className = 'news-feed__state';
      state.textContent = strings.error;
      grid.appendChild(state);
      return;
    }

    if (!latestNews.length) {
      const state = document.createElement('div');
      state.className = 'news-feed__state';
      state.textContent = strings.empty;
      grid.appendChild(state);
      return;
    }

    latestNews.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'news-card';

      const meta = document.createElement('div');
      meta.className = 'news-card__meta';
      const number = document.createElement('span');
      number.textContent = String(index + 1).padStart(2, '0');
      const date = document.createElement('time');
      date.dateTime = item.publishedAt || '';
      date.textContent = formatNewsDate(item.publishedAt);
      meta.append(number, date);

      const title = document.createElement('h3');
      title.textContent = item.title || '';
      const body = document.createElement('p');
      body.textContent = item.content || '';
      article.append(meta, title, body);

      if (item.link) {
        const link = document.createElement('a');
        link.className = 'news-card__link';
        link.href = item.link;
        link.target = '_blank';
        link.rel = 'noreferrer';
        link.innerHTML = `<span>${strings.read}</span><b>↗</b>`;
        article.appendChild(link);
      }
      grid.appendChild(article);
    });
  }

  async function loadPublicNews() {
    if (!newsSection) return;
    newsLoadState = 'loading';
    renderNews();
    try {
      const response = await fetch(`${NEWS_API}?v=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      latestNews = Array.isArray(payload.news) ? payload.news.slice(0, 6) : [];
      newsLoadState = 'ready';
    } catch (_) {
      latestNews = [];
      newsLoadState = 'error';
    }
    renderNews();
  }

  if (newsSection) {
    renderNews();
    loadPublicNews();
    const languageObserver = new MutationObserver(records => {
      if (records.some(record => record.attributeName === 'lang')) renderNews();
    });
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
})();
