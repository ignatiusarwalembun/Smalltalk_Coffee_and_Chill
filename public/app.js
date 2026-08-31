const root = document.documentElement;
const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const languageSelect = document.getElementById('languageSelect');
const mobileLanguageSelect = document.getElementById('mobileLanguageSelect');
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const mobileThemeLabel = document.getElementById('mobileThemeLabel');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDescription = document.querySelector('meta[property="og:description"]');
const latestMenuLink = document.getElementById('latestMenuLink');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const translations = {
  en: {
    'meta.title':'Smalltalk Coffee & Chill — Pademangan, North Jakarta','meta.description':'Smalltalk Coffee and Chill — a neighborhood coffee spot in Pademangan, North Jakarta.',
    'announcement.open':'OPEN DAILY · 09:30 — 23:00','announcement.location':'PADEMANGAN · NORTH JAKARTA',
    'nav.about':'About','nav.menu':'Menu','nav.gallery':'Moments','nav.visit':'Visit','preferences.language':'Language','preferences.appearance':'Appearance','theme.dark':'Dark','theme.light':'Light','theme.switchDark':'Switch to dark mode','theme.switchLight':'Switch to light mode',
    'hero.eyebrow':'Neighborhood coffee spot · Pademangan','hero.titleA':'Coffee for','hero.titleEm':'unhurried moments.','hero.lead':'A calm place for coffee, a quick pause, or a conversation that lasts longer than planned.','hero.explore':'Explore the menu','hero.directions':'Get directions','hero.rating':'Google rating','hero.hours':'Open daily','hero.price':'Price range','hero.caption':'Good coffee. No rush.','hero.socialLabel':'Daily updates',
    'statement.one':'GOOD COFFEE','statement.two':'CALM SPACE','statement.three':'GOOD COMPANY',
    'story.label':'About Smalltalk','story.titleA':'A neighborhood stop','story.titleB':'made for','story.titleEm':'staying awhile.','story.p1':'Smalltalk is an easygoing coffee spot in Pademangan: simple to drop into, comfortable enough to stay, and open from morning until late.','story.p2':'Come for a quick coffee, catch up with someone, or give yourself a quieter hour between plans.','story.instagram':'See today’s Smalltalk on Instagram',
    'principles.oneTitle':'Easy to enter.','principles.oneText':'No reservation, no ceremony. Just come by.','principles.twoTitle':'Easy to settle in.','principles.twoText':'Coffee and a slower pace in the middle of the city.','principles.threeTitle':'Easy to return to.','principles.threeText':'A neighborhood place built for everyday visits.',
    'menu.label':'What to expect','menu.titleA':'Something for','menu.titleEm':'every kind of pause.','menu.note':'Smalltalk serves coffee, non-coffee drinks, and café bites. For current items and prices, ask the café directly.','menu.ask':'Ask for the latest menu','menu.coffeeLabel':'COFFEE','menu.coffeeTitle':'Coffee','menu.coffeeText':'For the everyday cup, iced break, or slower sit-down.','menu.nonCoffeeLabel':'NON COFFEE','menu.nonCoffeeTitle':'Non-coffee','menu.nonCoffeeText':'A softer option when coffee is not the mood.','menu.bitesLabel':'CAFÉ BITES','menu.bitesTitle':'Bites','menu.bitesText':'Something small to keep the conversation going.',
    'moments.label':'Smalltalk moments','moments.titleA':'The mood is','moments.titleEm':'part of the menu.','moments.note':'For the latest drinks, people, and atmosphere from the café itself, head to Smalltalk’s Instagram.','moments.follow':'Open Instagram','moments.spaceLabel':'A PLACE TO PAUSE','moments.spaceText':'Slow the day down.','moments.pourLabel':'COFFEE FIRST','moments.pourText':'Then let the talk happen.','moments.cardText':'See what is happening today.',
    'visit.label':'Visit Smalltalk','visit.titleA':'Your next coffee','visit.titleEm':'is right here.','visit.address':'ADDRESS','visit.hours':'OPEN DAILY','visit.contact':'CONTACT','visit.maps':'Open Google Maps','visit.neighborhood':'PADEMANGAN · NORTH JAKARTA','visit.cardTitle':'Coffee without the hurry.',
    'closing.kicker':'ONE CUP · ONE TABLE · ONE GOOD TALK','closing.titleA':'See you at','closing.cta':'Start a small talk','footer.location':'Pademangan · North Jakarta','footer.locationLink':'Location','floating.chat':'CHAT'
  },
  id: {
    'meta.title':'Smalltalk Coffee & Chill — Pademangan, Jakarta Utara','meta.description':'Smalltalk Coffee and Chill — kedai kopi santai di Pademangan, Jakarta Utara.',
    'announcement.open':'BUKA SETIAP HARI · 09:30 — 23:00','announcement.location':'PADEMANGAN · JAKARTA UTARA',
    'nav.about':'Tentang','nav.menu':'Menu','nav.gallery':'Momen','nav.visit':'Kunjungi','preferences.language':'Bahasa','preferences.appearance':'Tampilan','theme.dark':'Gelap','theme.light':'Terang','theme.switchDark':'Beralih ke mode gelap','theme.switchLight':'Beralih ke mode terang',
    'hero.eyebrow':'Kedai kopi lingkungan · Pademangan','hero.titleA':'Kopi untuk','hero.titleEm':'momen tanpa terburu-buru.','hero.lead':'Tempat yang tenang untuk ngopi, berhenti sejenak, atau menikmati obrolan yang berlangsung lebih lama dari rencana.','hero.explore':'Lihat menu','hero.directions':'Petunjuk arah','hero.rating':'Rating Google','hero.hours':'Buka setiap hari','hero.price':'Kisaran harga','hero.caption':'Kopi enak. Tanpa buru-buru.','hero.socialLabel':'Update harian',
    'statement.one':'KOPI ENAK','statement.two':'RUANG TENANG','statement.three':'TEMAN YANG BAIK',
    'story.label':'Tentang Smalltalk','story.titleA':'Tempat singgah dekat rumah','story.titleB':'untuk','story.titleEm':'tinggal lebih lama.','story.p1':'Smalltalk adalah kedai kopi santai di Pademangan: mudah untuk mampir, nyaman untuk duduk lebih lama, dan buka dari pagi hingga malam.','story.p2':'Datang untuk kopi singkat, bertemu seseorang, atau memberi diri sendiri satu jam yang lebih tenang di antara kesibukan.','story.instagram':'Lihat Smalltalk hari ini di Instagram',
    'principles.oneTitle':'Mudah mampir.','principles.oneText':'Tanpa reservasi, tanpa ribet. Tinggal datang.','principles.twoTitle':'Mudah betah.','principles.twoText':'Kopi dan ritme yang lebih pelan di tengah kota.','principles.threeTitle':'Mudah kembali.','principles.threeText':'Tempat lingkungan yang cocok untuk kunjungan sehari-hari.',
    'menu.label':'Yang bisa kamu temukan','menu.titleA':'Pilihan untuk','menu.titleEm':'setiap jenis jeda.','menu.note':'Smalltalk menyediakan kopi, minuman non-kopi, dan makanan ringan café. Untuk item dan harga terbaru, tanyakan langsung ke café.','menu.ask':'Minta menu terbaru','menu.coffeeLabel':'KOPI','menu.coffeeTitle':'Coffee','menu.coffeeText':'Untuk kopi harian, jeda dengan es kopi, atau duduk santai lebih lama.','menu.nonCoffeeLabel':'NON KOPI','menu.nonCoffeeTitle':'Non-coffee','menu.nonCoffeeText':'Pilihan yang lebih lembut saat kamu sedang tidak ingin kopi.','menu.bitesLabel':'MAKANAN RINGAN','menu.bitesTitle':'Bites','menu.bitesText':'Sesuatu yang ringan agar obrolan bisa lanjut lebih lama.',
    'moments.label':'Momen Smalltalk','moments.titleA':'Suasana juga','moments.titleEm':'bagian dari menu.','moments.note':'Untuk minuman, orang-orang, dan suasana terbaru langsung dari café, kunjungi Instagram Smalltalk.','moments.follow':'Buka Instagram','moments.spaceLabel':'TEMPAT UNTUK JEDA','moments.spaceText':'Pelankan harimu.','moments.pourLabel':'KOPI DULU','moments.pourText':'Lalu biarkan obrolan mengalir.','moments.cardText':'Lihat apa yang sedang terjadi hari ini.',
    'visit.label':'Kunjungi Smalltalk','visit.titleA':'Kopi berikutnya','visit.titleEm':'ada di sini.','visit.address':'ALAMAT','visit.hours':'BUKA SETIAP HARI','visit.contact':'KONTAK','visit.maps':'Buka Google Maps','visit.neighborhood':'PADEMANGAN · JAKARTA UTARA','visit.cardTitle':'Ngopi tanpa terburu-buru.',
    'closing.kicker':'SATU CANGKIR · SATU MEJA · SATU OBROLAN HANGAT','closing.titleA':'Sampai jumpa di','closing.cta':'Mulai small talk','footer.location':'Pademangan · Jakarta Utara','footer.locationLink':'Lokasi','floating.chat':'CHAT'
  },
  no: {
    'meta.title':'Smalltalk Coffee & Chill — Pademangan, Nord-Jakarta','meta.description':'Smalltalk Coffee and Chill — en avslappet nabolagskafé i Pademangan, Nord-Jakarta.',
    'announcement.open':'ÅPENT HVER DAG · 09:30 — 23:00','announcement.location':'PADEMANGAN · NORD-JAKARTA',
    'nav.about':'Om oss','nav.menu':'Meny','nav.gallery':'Øyeblikk','nav.visit':'Besøk','preferences.language':'Språk','preferences.appearance':'Utseende','theme.dark':'Mørk','theme.light':'Lys','theme.switchDark':'Bytt til mørk modus','theme.switchLight':'Bytt til lys modus',
    'hero.eyebrow':'Nabolagskafé · Pademangan','hero.titleA':'Kaffe for','hero.titleEm':'øyeblikk uten hastverk.','hero.lead':'Et rolig sted for kaffe, en liten pause eller en samtale som varer lenger enn planlagt.','hero.explore':'Se menyen','hero.directions':'Finn veien','hero.rating':'Google-vurdering','hero.hours':'Åpent hver dag','hero.price':'Prisnivå','hero.caption':'God kaffe. Ingen hast.','hero.socialLabel':'Daglige oppdateringer',
    'statement.one':'GOD KAFFE','statement.two':'ROLIG ROM','statement.three':'GODT SELSKAP',
    'story.label':'Om Smalltalk','story.titleA':'Et nabolagssted','story.titleB':'laget for å','story.titleEm':'bli en stund.','story.p1':'Smalltalk er en avslappet kafé i Pademangan: enkel å stikke innom, behagelig å bli på og åpen fra morgen til sent.','story.p2':'Kom for en rask kaffe, møt noen du kjenner, eller gi deg selv en roligere time mellom dagens planer.','story.instagram':'Se dagens Smalltalk på Instagram',
    'principles.oneTitle':'Lett å stikke innom.','principles.oneText':'Ingen reservasjon, ingen seremoni. Bare kom.','principles.twoTitle':'Lett å finne roen.','principles.twoText':'Kaffe og et roligere tempo midt i byen.','principles.threeTitle':'Lett å komme tilbake.','principles.threeText':'Et nabolagssted for hverdagsbesøk.',
    'menu.label':'Hva du kan forvente','menu.titleA':'Noe for','menu.titleEm':'enhver liten pause.','menu.note':'Smalltalk serverer kaffe, drikker uten kaffe og enkle kafébiter. Spør kafeen direkte om dagens utvalg og priser.','menu.ask':'Be om nyeste meny','menu.coffeeLabel':'KAFFE','menu.coffeeTitle':'Kaffe','menu.coffeeText':'For hverdagskoppen, en kald pause eller en roligere stund.','menu.nonCoffeeLabel':'UTEN KAFFE','menu.nonCoffeeTitle':'Uten kaffe','menu.nonCoffeeText':'Et mykere valg når kaffe ikke er det du vil ha.','menu.bitesLabel':'KAFÉBITER','menu.bitesTitle':'Småretter','menu.bitesText':'Noe lite som holder samtalen i gang.',
    'moments.label':'Smalltalk-øyeblikk','moments.titleA':'Stemningen er','moments.titleEm':'en del av menyen.','moments.note':'For de nyeste drinkene, menneskene og stemningen direkte fra kafeen, se Smalltalk på Instagram.','moments.follow':'Åpne Instagram','moments.spaceLabel':'ET STED FOR PAUSE','moments.spaceText':'La dagen gå litt saktere.','moments.pourLabel':'KAFFE FØRST','moments.pourText':'Så kan praten komme.','moments.cardText':'Se hva som skjer i dag.',
    'visit.label':'Besøk Smalltalk','visit.titleA':'Din neste kaffe','visit.titleEm':'er rett her.','visit.address':'ADRESSE','visit.hours':'ÅPENT HVER DAG','visit.contact':'KONTAKT','visit.maps':'Åpne Google Maps','visit.neighborhood':'PADEMANGAN · NORD-JAKARTA','visit.cardTitle':'Kaffe uten hastverk.',
    'closing.kicker':'ÉN KOPP · ETT BORD · ÉN GOD SAMTALE','closing.titleA':'Vi sees på','closing.cta':'Start en liten prat','footer.location':'Pademangan · Nord-Jakarta','footer.locationLink':'Sted','floating.chat':'CHAT'
  },
  zh: {
    'meta.title':'Smalltalk Coffee & Chill — 雅加达北部 Pademangan','meta.description':'Smalltalk Coffee and Chill — 位于雅加达北部 Pademangan 的轻松社区咖啡店。','announcement.open':'每日营业 · 09:30 — 23:00','announcement.location':'PADEMANGAN · 雅加达北部','nav.about':'关于','nav.menu':'菜单','nav.gallery':'日常','nav.visit':'到店','preferences.language':'语言','preferences.appearance':'外观','theme.dark':'深色','theme.light':'浅色','theme.switchDark':'切换到深色模式','theme.switchLight':'切换到浅色模式','hero.eyebrow':'社区咖啡店 · Pademangan','hero.titleA':'给慢一点的','hero.titleEm':'咖啡时光。','hero.lead':'一个适合喝咖啡、短暂休息，或让聊天比计划更久一点的安静空间。','hero.explore':'查看菜单','hero.directions':'获取路线','hero.rating':'Google 评分','hero.hours':'每日营业','hero.price':'价格区间','hero.caption':'好咖啡，不赶时间。','hero.socialLabel':'每日更新','statement.one':'好咖啡','statement.two':'安静空间','statement.three':'舒服陪伴','story.label':'关于 Smalltalk','story.titleA':'一家社区小店','story.titleB':'适合','story.titleEm':'多坐一会儿。','story.p1':'Smalltalk 是 Pademangan 一家轻松的咖啡店：随时可以进来，坐久一点也很自在，从早营业到晚上。','story.p2':'来喝一杯快咖啡、和朋友见面，或在忙碌行程之间给自己一个安静小时。','story.instagram':'在 Instagram 看今天的 Smalltalk','principles.oneTitle':'随时进来。','principles.oneText':'无需预约，也无需复杂安排。','principles.twoTitle':'轻松坐下。','principles.twoText':'在城市里，用咖啡把节奏放慢。','principles.threeTitle':'愿意再来。','principles.threeText':'适合日常反复光顾的社区空间。','menu.label':'这里有什么','menu.titleA':'每一种停顿','menu.titleEm':'都有选择。','menu.note':'Smalltalk 提供咖啡、非咖啡饮品和咖啡馆小食。最新品项与价格请直接联系店家。','menu.ask':'询问最新菜单','menu.coffeeLabel':'咖啡','menu.coffeeTitle':'Coffee','menu.coffeeText':'日常咖啡、冰饮休息，或慢慢坐一会儿。','menu.nonCoffeeLabel':'非咖啡','menu.nonCoffeeTitle':'Non-coffee','menu.nonCoffeeText':'不想喝咖啡时，更柔和的选择。','menu.bitesLabel':'咖啡馆小食','menu.bitesTitle':'Bites','menu.bitesText':'一点小食，让聊天继续。','moments.label':'Smalltalk 日常','moments.titleA':'氛围也是','moments.titleEm':'菜单的一部分。','moments.note':'想看店里最新的饮品、客人和氛围，请前往 Smalltalk Instagram。','moments.follow':'打开 Instagram','moments.spaceLabel':'停一下的地方','moments.spaceText':'让一天慢下来。','moments.pourLabel':'先来杯咖啡','moments.pourText':'再让聊天自然发生。','moments.cardText':'看看今天正在发生什么。','visit.label':'到访 Smalltalk','visit.titleA':'你的下一杯咖啡','visit.titleEm':'就在这里。','visit.address':'地址','visit.hours':'每日营业','visit.contact':'联系方式','visit.maps':'打开 Google Maps','visit.neighborhood':'PADEMANGAN · 雅加达北部','visit.cardTitle':'不赶时间的咖啡。','closing.kicker':'一杯咖啡 · 一张桌子 · 一场好聊天','closing.titleA':'Smalltalk 见','closing.cta':'开始一场小聊天','footer.location':'Pademangan · 雅加达北部','footer.locationLink':'位置','floating.chat':'聊天'
  },
  ja: {
    'meta.title':'Smalltalk Coffee & Chill — 北ジャカルタ・パデマンガン','meta.description':'Smalltalk Coffee and Chill — 北ジャカルタ、パデマンガンの気軽な街のコーヒースポット。','announcement.open':'毎日営業 · 09:30 — 23:00','announcement.location':'PADEMANGAN · NORTH JAKARTA','nav.about':'About','nav.menu':'メニュー','nav.gallery':'日常','nav.visit':'アクセス','preferences.language':'言語','preferences.appearance':'表示','theme.dark':'ダーク','theme.light':'ライト','theme.switchDark':'ダークモードに切り替え','theme.switchLight':'ライトモードに切り替え','hero.eyebrow':'街のコーヒースポット · Pademangan','hero.titleA':'急がない時間の','hero.titleEm':'ためのコーヒー。','hero.lead':'コーヒーを飲む、ひと息つく、予定より少し長く話す。そんな時間のための落ち着いた場所。','hero.explore':'メニューを見る','hero.directions':'ルートを見る','hero.rating':'Google 評価','hero.hours':'毎日営業','hero.price':'価格帯','hero.caption':'いいコーヒー。急がなくていい。','hero.socialLabel':'今日の更新','statement.one':'GOOD COFFEE','statement.two':'CALM SPACE','statement.three':'GOOD COMPANY','story.label':'Smalltalkについて','story.titleA':'街の日常にある場所','story.titleB':'少し長く','story.titleEm':'過ごすために。','story.p1':'Smalltalkはパデマンガンの気軽なコーヒースポット。ふらっと入りやすく、長居もしやすく、朝から夜まで営業しています。','story.p2':'短いコーヒーブレイク、誰かとの待ち合わせ、予定の合間の静かな一時間に。','story.instagram':'今日のSmalltalkをInstagramで見る','principles.oneTitle':'入りやすい。','principles.oneText':'予約も特別な準備も不要です。','principles.twoTitle':'落ち着きやすい。','principles.twoText':'街の真ん中で、コーヒーと少しゆっくりした時間を。','principles.threeTitle':'また来やすい。','principles.threeText':'日常使いしたくなる街の場所。','menu.label':'楽しめるもの','menu.titleA':'どんな休憩にも','menu.titleEm':'ちょうどいい選択を。','menu.note':'Smalltalkではコーヒー、ノンコーヒードリンク、カフェフードを提供しています。最新の商品と価格は店舗へ直接お問い合わせください。','menu.ask':'最新メニューを問い合わせる','menu.coffeeLabel':'COFFEE','menu.coffeeTitle':'Coffee','menu.coffeeText':'毎日の一杯、アイスコーヒー休憩、ゆっくり座る時間に。','menu.nonCoffeeLabel':'NON COFFEE','menu.nonCoffeeTitle':'Non-coffee','menu.nonCoffeeText':'今日はコーヒーじゃない気分、という日に。','menu.bitesLabel':'CAFÉ BITES','menu.bitesTitle':'Bites','menu.bitesText':'会話をもう少し続けるための軽い一皿。','moments.label':'Smalltalkの日常','moments.titleA':'雰囲気も','moments.titleEm':'メニューの一部。','moments.note':'店内の最新ドリンク、人、空気感はSmalltalkのInstagramで。','moments.follow':'Instagramを開く','moments.spaceLabel':'ひと息つける場所','moments.spaceText':'一日を少しゆっくり。','moments.pourLabel':'まずはコーヒー','moments.pourText':'あとは会話のままに。','moments.cardText':'今日のSmalltalkを見る。','visit.label':'Smalltalkへ','visit.titleA':'次のコーヒーは','visit.titleEm':'ここにあります。','visit.address':'住所','visit.hours':'毎日営業','visit.contact':'連絡先','visit.maps':'Google Mapsを開く','visit.neighborhood':'PADEMANGAN · NORTH JAKARTA','visit.cardTitle':'急がないコーヒー。','closing.kicker':'一杯 · 一つのテーブル · いい会話','closing.titleA':'Smalltalkで会いましょう','closing.cta':'Small talkを始める','footer.location':'Pademangan · North Jakarta','footer.locationLink':'場所','floating.chat':'CHAT'
  },
  ko: {
    'meta.title':'Smalltalk Coffee & Chill — 파데망안, 북자카르타','meta.description':'Smalltalk Coffee and Chill — 북자카르타 파데망안의 편안한 동네 커피 스폿.','announcement.open':'매일 영업 · 09:30 — 23:00','announcement.location':'PADEMANGAN · NORTH JAKARTA','nav.about':'소개','nav.menu':'메뉴','nav.gallery':'모먼트','nav.visit':'방문','preferences.language':'언어','preferences.appearance':'화면','theme.dark':'다크','theme.light':'라이트','theme.switchDark':'다크 모드로 전환','theme.switchLight':'라이트 모드로 전환','hero.eyebrow':'동네 커피 스폿 · Pademangan','hero.titleA':'서두르지 않는','hero.titleEm':'커피 시간.','hero.lead':'커피 한 잔, 짧은 휴식, 혹은 계획보다 조금 길어진 대화를 위한 차분한 공간.','hero.explore':'메뉴 보기','hero.directions':'길찾기','hero.rating':'Google 평점','hero.hours':'매일 영업','hero.price':'가격대','hero.caption':'좋은 커피. 서두르지 않기.','hero.socialLabel':'오늘의 업데이트','statement.one':'GOOD COFFEE','statement.two':'CALM SPACE','statement.three':'GOOD COMPANY','story.label':'Smalltalk 소개','story.titleA':'동네에 편하게 들르는 곳','story.titleB':'조금 더','story.titleEm':'머물기 좋은 곳.','story.p1':'Smalltalk는 파데망안의 편안한 커피 스폿입니다. 가볍게 들어오기 쉽고 오래 머물기도 편하며 아침부터 늦은 시간까지 열려 있습니다.','story.p2':'빠른 커피 한 잔, 누군가와의 만남, 또는 일정 사이의 조용한 한 시간을 위해 들러보세요.','story.instagram':'오늘의 Smalltalk를 Instagram에서 보기','principles.oneTitle':'편하게 들어오기.','principles.oneText':'예약도 복잡한 준비도 필요 없습니다.','principles.twoTitle':'편하게 머물기.','principles.twoText':'도시 한가운데서 커피와 함께 속도를 늦추세요.','principles.threeTitle':'편하게 다시 오기.','principles.threeText':'일상적으로 찾기 좋은 동네 공간.','menu.label':'즐길 수 있는 것','menu.titleA':'어떤 휴식에도','menu.titleEm':'맞는 선택.','menu.note':'Smalltalk는 커피, 논커피 음료, 카페 푸드를 제공합니다. 최신 메뉴와 가격은 매장에 직접 문의해 주세요.','menu.ask':'최신 메뉴 문의','menu.coffeeLabel':'COFFEE','menu.coffeeTitle':'Coffee','menu.coffeeText':'매일의 한 잔, 아이스커피 휴식, 천천히 앉아 있고 싶은 시간에.','menu.nonCoffeeLabel':'NON COFFEE','menu.nonCoffeeTitle':'Non-coffee','menu.nonCoffeeText':'오늘은 커피가 아닌 다른 기분일 때.','menu.bitesLabel':'CAFÉ BITES','menu.bitesTitle':'Bites','menu.bitesText':'대화를 조금 더 이어가기 좋은 가벼운 메뉴.','moments.label':'Smalltalk 모먼트','moments.titleA':'분위기도','moments.titleEm':'메뉴의 일부입니다.','moments.note':'매장의 최신 음료, 사람들, 분위기는 Smalltalk Instagram에서 확인하세요.','moments.follow':'Instagram 열기','moments.spaceLabel':'잠시 쉬어가는 곳','moments.spaceText':'하루의 속도를 낮춰보세요.','moments.pourLabel':'커피 먼저','moments.pourText':'그리고 대화는 자연스럽게.','moments.cardText':'오늘의 Smalltalk를 확인하세요.','visit.label':'Smalltalk 방문','visit.titleA':'다음 커피는','visit.titleEm':'바로 여기에.','visit.address':'주소','visit.hours':'매일 영업','visit.contact':'연락처','visit.maps':'Google Maps 열기','visit.neighborhood':'PADEMANGAN · NORTH JAKARTA','visit.cardTitle':'서두르지 않는 커피.','closing.kicker':'한 잔 · 한 테이블 · 좋은 대화','closing.titleA':'Smalltalk에서 만나요','closing.cta':'Small talk 시작하기','footer.location':'Pademangan · North Jakarta','footer.locationLink':'위치','floating.chat':'CHAT'
  }
};

const supported = ['en','id','no','zh','ja','ko'];
let language = 'en';

function getSaved(key){try{return localStorage.getItem(key)}catch{return null}}
function save(key,value){try{localStorage.setItem(key,value)}catch{}}
function normalize(code=''){
  const c=code.toLowerCase();
  if(c==='nb'||c==='nn'||c.startsWith('nb-')||c.startsWith('nn-')) return 'no';
  const short=c.split('-')[0];
  return supported.includes(short)?short:'en';
}
function t(key){return translations[language]?.[key] ?? translations.en[key] ?? key}

function menuMessage(){
  return {
    en:'Hi Smalltalk, may I have your latest menu and prices?',
    id:'Halo Smalltalk, boleh minta menu dan harga terbaru?',
    no:'Hei Smalltalk, kan jeg få den nyeste menyen og prisene?',
    zh:'你好 Smalltalk，可以发我最新菜单和价格吗？',
    ja:'こんにちはSmalltalk、最新のメニューと価格を教えていただけますか？',
    ko:'안녕하세요 Smalltalk, 최신 메뉴와 가격을 알려주실 수 있나요?'
  }[language];
}

function updateThemeControls(){
  const dark=root.dataset.theme==='dark';
  themeToggle?.setAttribute('aria-label',dark?t('theme.switchLight'):t('theme.switchDark'));
  mobileThemeToggle?.setAttribute('aria-label',dark?t('theme.switchLight'):t('theme.switchDark'));
  if(mobileThemeLabel) mobileThemeLabel.textContent=dark?t('theme.dark'):t('theme.light');
}
function applyTheme(value,persist=true){
  const next=value==='dark'?'dark':'light';
  root.dataset.theme=next;
  themeMeta?.setAttribute('content',next==='dark'?'#11100e':'#f3efe7');
  updateThemeControls();
  if(persist) save('smalltalk-theme',next);
}
function toggleTheme(){applyTheme(root.dataset.theme==='dark'?'light':'dark')}

function applyLanguage(value,persist=true){
  language=normalize(value);
  root.lang=language;
  if(languageSelect) languageSelect.value=language;
  if(mobileLanguageSelect) mobileLanguageSelect.value=language;
  document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n)});
  document.title=t('meta.title');
  descriptionMeta?.setAttribute('content',t('meta.description'));
  ogTitle?.setAttribute('content',t('meta.title'));
  ogDescription?.setAttribute('content',t('meta.description'));
  if(latestMenuLink) latestMenuLink.href=`https://wa.me/6285117828229?text=${encodeURIComponent(menuMessage())}`;
  updateThemeControls();
  if(persist) save('smalltalk-language',language);
}

applyTheme(root.dataset.theme || 'light',false);
applyLanguage(getSaved('smalltalk-language') || normalize(navigator.language),false);

languageSelect?.addEventListener('change',e=>applyLanguage(e.target.value));
mobileLanguageSelect?.addEventListener('change',e=>applyLanguage(e.target.value));
themeToggle?.addEventListener('click',toggleTheme);
mobileThemeToggle?.addEventListener('click',toggleTheme);

const systemTheme=window.matchMedia('(prefers-color-scheme: dark)');
systemTheme.addEventListener?.('change',e=>{if(!getSaved('smalltalk-theme')) applyTheme(e.matches?'dark':'light',false)});

function setMenu(open){
  mobileMenu?.classList.toggle('open',open);
  mobileMenu?.setAttribute('aria-hidden',String(!open));
  menuToggle?.classList.toggle('active',open);
  menuToggle?.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('menu-open',open);
}
menuToggle?.addEventListener('click',()=>setMenu(!mobileMenu?.classList.contains('open')));
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape') setMenu(false)});

let ticking=false;
function updateScroll(){
  header?.classList.toggle('scrolled',window.scrollY>16);
  if(!reduceMotion){
    document.querySelectorAll('[data-parallax-image]').forEach(img=>{
      const rect=img.parentElement?.getBoundingClientRect();
      if(!rect) return;
      const offset=(rect.top+rect.height/2-window.innerHeight/2)*-0.012;
      img.style.transform=`scale(1.04) translate3d(0,${offset}px,0)`;
    });
  }
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});
updateScroll();

if('IntersectionObserver' in window){
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const delay=Number(entry.target.dataset.delay||0);
      entry.target.style.transitionDelay=`${delay}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },{threshold:.1,rootMargin:'0px 0px -4% 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>revealObserver.observe(el));

  const navLinks=[...document.querySelectorAll('[data-nav]')];
  const sectionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      navLinks.forEach(link=>link.classList.toggle('active',link.dataset.nav===entry.target.id));
    });
  },{rootMargin:'-35% 0px -55% 0px',threshold:0});
  document.querySelectorAll('#story,#menu,#moments,#visit').forEach(section=>sectionObserver.observe(section));
}else{
  document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('visible'));
}
