const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const preloader = document.getElementById('preloader');
const progress = document.getElementById('scrollProgress');
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const menuCards = [...document.querySelectorAll('.menu-card')];
const menuSearch = document.getElementById('menuSearch');
const emptyState = document.getElementById('emptyState');
const languageSelect = document.getElementById('languageSelect');
const mobileLanguageSelect = document.getElementById('mobileLanguageSelect');
const themeToggle = document.getElementById('themeToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');
const mobileThemeLabel = document.getElementById('mobileThemeLabel');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const descriptionMeta = document.querySelector('meta[name="description"]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const translations = {
  en: {
    'meta.title':'Smalltalk Coffee & Chill — Coffee, Calm, Conversation',
    'meta.description':'Smalltalk Coffee and Chill — coffee, comfort and conversation in Pademangan, North Jakarta.',
    'announcement.open':'OPEN DAILY · 09:30 — 23:00','announcement.location':'PADEMANGAN · NORTH JAKARTA','announcement.mood':'COFFEE · CALM · CONVERSATION',
    'nav.about':'About','nav.menu':'Menu','nav.gallery':'Gallery','nav.visit':'Visit',
    'preferences.language':'Language','preferences.appearance':'Appearance','theme.dark':'Dark','theme.light':'Light','theme.switchDark':'Switch to dark mode','theme.switchLight':'Switch to light mode',
    'hero.eyebrow':'Neighborhood coffee spot · Pademangan','hero.titleA':'A quiet place','hero.titleB':'for','hero.titleEm':'good talk.','hero.lead':'Coffee, comfort, and the kind of conversation that makes you forget to check the time.','hero.explore':'Explore menu','hero.directions':'Get directions','hero.rating':'Google rating','hero.open':'Open daily','hero.close':'Close daily','hero.pause':'Your everyday pause.','hero.followMood':'Follow the daily mood','hero.scroll':'Scroll',
    'band.coffee':'GOOD COFFEE','band.light':'SOFT LIGHT','band.talks':'LONG TALKS',
    'story.label':'About Smalltalk','story.titleA':'Designed for people','story.titleB':'who like to','story.titleEm':'stay awhile.','story.p1':'Smalltalk sits between a quick coffee stop and an unofficial second living room — relaxed, familiar, and easy to return to.','story.p2':'The visual direction is intentionally quiet: warm neutrals, generous spacing, editorial type, and photography that does most of the talking.','story.instagram':'See Smalltalk on Instagram',
    'principles.oneTitle':'Drop in.','principles.oneText':'No big plan required. One cup is enough reason.','principles.twoTitle':'Slow down.','principles.twoText':'A soft pause between the noise of the city.','principles.threeTitle':'Stay longer.','principles.threeText':'Because the best small talks rarely stay small.',
    'menu.label':'Menu preview','menu.titleA':'Pick a reason','menu.titleB':'to','menu.titleEm':'stay longer.','menu.note':'This is a visual menu preview. Official items and prices can replace the demo catalog when the latest café menu is available.','menu.ask':'Ask for latest menu','menu.search':'Search menu preview','menu.demo':'DEMO','menu.price':'Ask latest price','menu.empty':'No menu preview matched that search.',
    'filters.all':'All','filters.coffee':'Coffee','filters.nonCoffee':'Non coffee','filters.bites':'Bites',
    'items.latte':'Soft espresso character, creamy texture, easy everyday profile.','items.brownSugar':'Cold, smooth and caramel-forward for a hot Jakarta afternoon.','items.matcha':'Earthy matcha, soft milk and an easy clean finish.','items.chocolate':'Comfort-first chocolate with a smooth, velvety mouthfeel.','items.croffle':'Crisp edges and buttery layers made to sit beside an iced coffee.','items.toast':'Simple café comfort food for longer conversations and work sessions.',
    'moments.label':'Smalltalk moments','moments.titleA':'A café should feel','moments.titleB':'as good as it','moments.titleEm':'looks.','moments.note':'A quieter gallery inspired by the pace of the café: space, coffee, details, people.','moments.spaceLabel':'THE SPACE','moments.spaceText':'Slow down here.','moments.pourLabel':'THE POUR','moments.pourText':'Fresh, then slow.','moments.textA':'Good coffee.','moments.textB':'Soft light.','moments.textC':'Stay awhile.','moments.talkLabel':'THE TALK','moments.talkText':'Come for coffee. Stay for the story.','moments.instagram':'More daily moments on Instagram.','moments.follow':'Follow @smalltalkcoffeechill',
    'visit.label':'Visit Smalltalk','visit.titleA':'Your next coffee','visit.titleB':'is','visit.titleEm':'right here.','visit.address':'ADDRESS','visit.hours':'OPEN DAILY','visit.contact':'CONTACT','visit.maps':'Open Google Maps','visit.rating':'Google rating · Pademangan',
    'closing.kicker':'ONE CUP · ONE TABLE · ONE GOOD TALK','closing.titleA':'See you at','closing.cta':'Start a small talk','footer.location':'Smalltalk Coffee & Chill · Pademangan, North Jakarta','footer.locationLink':'Location','floating.chat':'CHAT'
  },
  id: {
    'meta.title':'Smalltalk Coffee & Chill — Kopi, Tenang, Percakapan','meta.description':'Smalltalk Coffee and Chill — kopi, kenyamanan, dan percakapan di Pademangan, Jakarta Utara.',
    'announcement.open':'BUKA SETIAP HARI · 09:30 — 23:00','announcement.location':'PADEMANGAN · JAKARTA UTARA','announcement.mood':'KOPI · TENANG · PERCAKAPAN',
    'nav.about':'Tentang','nav.menu':'Menu','nav.gallery':'Galeri','nav.visit':'Kunjungi',
    'preferences.language':'Bahasa','preferences.appearance':'Tampilan','theme.dark':'Gelap','theme.light':'Terang','theme.switchDark':'Beralih ke mode gelap','theme.switchLight':'Beralih ke mode terang',
    'hero.eyebrow':'Kedai kopi lingkungan · Pademangan','hero.titleA':'Tempat yang tenang','hero.titleB':'untuk','hero.titleEm':'obrolan hangat.','hero.lead':'Kopi, kenyamanan, dan percakapan yang membuat kamu lupa melihat waktu.','hero.explore':'Lihat menu','hero.directions':'Petunjuk arah','hero.rating':'Rating Google','hero.open':'Buka setiap hari','hero.close':'Tutup setiap hari','hero.pause':'Jeda harianmu.','hero.followMood':'Ikuti suasana hari ini','hero.scroll':'Geser',
    'band.coffee':'KOPI YANG ENAK','band.light':'CAHAYA HANGAT','band.talks':'OBROLAN PANJANG',
    'story.label':'Tentang Smalltalk','story.titleA':'Dibuat untuk mereka','story.titleB':'yang ingin','story.titleEm':'tinggal lebih lama.','story.p1':'Smalltalk berada di antara tempat singgah untuk minum kopi dan ruang keluarga kedua yang tidak resmi — santai, akrab, dan selalu nyaman untuk kembali.','story.p2':'Arah visualnya sengaja dibuat tenang: warna netral hangat, ruang yang lega, tipografi editorial, dan fotografi yang berbicara lebih banyak.','story.instagram':'Lihat Smalltalk di Instagram',
    'principles.oneTitle':'Mampir.','principles.oneText':'Tidak perlu rencana besar. Satu cangkir sudah cukup menjadi alasan.','principles.twoTitle':'Pelankan ritme.','principles.twoText':'Jeda lembut di tengah ramainya kota.','principles.threeTitle':'Tinggal lebih lama.','principles.threeText':'Karena obrolan terbaik jarang tetap singkat.',
    'menu.label':'Preview menu','menu.titleA':'Pilih alasan','menu.titleB':'untuk','menu.titleEm':'tinggal lebih lama.','menu.note':'Ini adalah preview visual menu. Produk dan harga resmi dapat menggantikan katalog demo setelah menu terbaru tersedia.','menu.ask':'Minta menu terbaru','menu.search':'Cari preview menu','menu.demo':'DEMO','menu.price':'Tanya harga terbaru','menu.empty':'Tidak ada menu yang cocok dengan pencarian ini.',
    'filters.all':'Semua','filters.coffee':'Kopi','filters.nonCoffee':'Non kopi','filters.bites':'Makanan',
    'items.latte':'Karakter espresso lembut, tekstur creamy, dan nyaman untuk dinikmati setiap hari.','items.brownSugar':'Dingin, lembut, dengan rasa karamel yang cocok untuk siang Jakarta yang panas.','items.matcha':'Matcha earthy, susu lembut, dan akhir rasa yang bersih.','items.chocolate':'Cokelat yang comforting dengan tekstur halus dan velvety.','items.croffle':'Pinggiran renyah dan lapisan buttery yang pas ditemani es kopi.','items.toast':'Comfort food café sederhana untuk obrolan panjang dan sesi kerja.',
    'moments.label':'Momen Smalltalk','moments.titleA':'Sebuah café seharusnya','moments.titleB':'terasa sebaik','moments.titleEm':'tampilannya.','moments.note':'Galeri yang tenang, mengikuti ritme café: ruang, kopi, detail, dan orang-orang.','moments.spaceLabel':'RUANGNYA','moments.spaceText':'Pelankan ritme di sini.','moments.pourLabel':'SEDUHAN','moments.pourText':'Segar, lalu santai.','moments.textA':'Kopi yang enak.','moments.textB':'Cahaya hangat.','moments.textC':'Tinggal sebentar lagi.','moments.talkLabel':'OBROLANNYA','moments.talkText':'Datang untuk kopi. Tinggal untuk ceritanya.','moments.instagram':'Momen harian lainnya ada di Instagram.','moments.follow':'Ikuti @smalltalkcoffeechill',
    'visit.label':'Kunjungi Smalltalk','visit.titleA':'Kopi berikutnya','visit.titleB':'ada','visit.titleEm':'di sini.','visit.address':'ALAMAT','visit.hours':'BUKA SETIAP HARI','visit.contact':'KONTAK','visit.maps':'Buka Google Maps','visit.rating':'Rating Google · Pademangan',
    'closing.kicker':'SATU CANGKIR · SATU MEJA · SATU OBROLAN HANGAT','closing.titleA':'Sampai jumpa di','closing.cta':'Mulai small talk','footer.location':'Smalltalk Coffee & Chill · Pademangan, Jakarta Utara','footer.locationLink':'Lokasi','floating.chat':'CHAT'
  },
  no: {
    'meta.title':'Smalltalk Coffee & Chill — Kaffe, ro, samtaler','meta.description':'Smalltalk Coffee and Chill — kaffe, komfort og gode samtaler i Pademangan, Nord-Jakarta.',
    'announcement.open':'ÅPENT HVER DAG · 09:30 — 23:00','announcement.location':'PADEMANGAN · NORD-JAKARTA','announcement.mood':'KAFFE · RO · SAMTALER',
    'nav.about':'Om oss','nav.menu':'Meny','nav.gallery':'Galleri','nav.visit':'Besøk',
    'preferences.language':'Språk','preferences.appearance':'Utseende','theme.dark':'Mørk','theme.light':'Lys','theme.switchDark':'Bytt til mørk modus','theme.switchLight':'Bytt til lys modus',
    'hero.eyebrow':'Nabolagskafé · Pademangan','hero.titleA':'Et rolig sted','hero.titleB':'for','hero.titleEm':'gode samtaler.','hero.lead':'Kaffe, komfort og samtaler som får deg til å glemme å se på klokken.','hero.explore':'Se menyen','hero.directions':'Finn veien','hero.rating':'Google-vurdering','hero.open':'Åpent hver dag','hero.close':'Stenger hver dag','hero.pause':'Din daglige pause.','hero.followMood':'Følg dagens stemning','hero.scroll':'Bla',
    'band.coffee':'GOD KAFFE','band.light':'MYKT LYS','band.talks':'LANGE SAMTALER',
    'story.label':'Om Smalltalk','story.titleA':'Laget for mennesker','story.titleB':'som liker å','story.titleEm':'bli en stund.','story.p1':'Smalltalk ligger et sted mellom et raskt kaffestopp og en uoffisiell stue nummer to — avslappet, kjent og lett å komme tilbake til.','story.p2':'Det visuelle uttrykket er bevisst rolig: varme nøytrale toner, god plass, redaksjonell typografi og fotografier som får snakke for seg selv.','story.instagram':'Se Smalltalk på Instagram',
    'principles.oneTitle':'Kom innom.','principles.oneText':'Ingen stor plan nødvendig. Én kopp er grunn nok.','principles.twoTitle':'Ta det rolig.','principles.twoText':'En myk pause fra byens støy.','principles.threeTitle':'Bli litt lenger.','principles.threeText':'Fordi de beste småpratene sjelden forblir små.',
    'menu.label':'Menyforhåndsvisning','menu.titleA':'Finn en grunn','menu.titleB':'til å','menu.titleEm':'bli lenger.','menu.note':'Dette er en visuell forhåndsvisning av menyen. Offisielle varer og priser kan erstatte demokatalogen når den nyeste kafémenyen er tilgjengelig.','menu.ask':'Be om nyeste meny','menu.search':'Søk i menyen','menu.demo':'DEMO','menu.price':'Spør om siste pris','menu.empty':'Ingen menyvalg samsvarte med søket.',
    'filters.all':'Alle','filters.coffee':'Kaffe','filters.nonCoffee':'Uten kaffe','filters.bites':'Småretter',
    'items.latte':'Myk espresso, kremet tekstur og en profil som passer hver dag.','items.brownSugar':'Kald, myk og karamellpreget — perfekt for en varm ettermiddag i Jakarta.','items.matcha':'Jordlig matcha, myk melk og en ren avslutning.','items.chocolate':'Fyldig og behagelig sjokolade med silkemyk tekstur.','items.croffle':'Sprø kanter og smøraktige lag som passer perfekt til iskaffe.','items.toast':'Enkel kafémat for lengre samtaler og arbeidsøkter.',
    'moments.label':'Smalltalk-øyeblikk','moments.titleA':'En kafé bør føles','moments.titleB':'like bra som den','moments.titleEm':'ser ut.','moments.note':'Et roligere galleri inspirert av kaféens rytme: rom, kaffe, detaljer og mennesker.','moments.spaceLabel':'ROMMET','moments.spaceText':'Ta det rolig her.','moments.pourLabel':'BRYGGINGEN','moments.pourText':'Ferskt, så rolig.','moments.textA':'God kaffe.','moments.textB':'Mykt lys.','moments.textC':'Bli en stund.','moments.talkLabel':'SAMTALEN','moments.talkText':'Kom for kaffen. Bli for historien.','moments.instagram':'Flere daglige øyeblikk på Instagram.','moments.follow':'Følg @smalltalkcoffeechill',
    'visit.label':'Besøk Smalltalk','visit.titleA':'Din neste kaffe','visit.titleB':'er','visit.titleEm':'rett her.','visit.address':'ADRESSE','visit.hours':'ÅPENT HVER DAG','visit.contact':'KONTAKT','visit.maps':'Åpne Google Maps','visit.rating':'Google-vurdering · Pademangan',
    'closing.kicker':'ÉN KOPP · ETT BORD · ÉN GOD SAMTALE','closing.titleA':'Vi sees på','closing.cta':'Start en liten prat','footer.location':'Smalltalk Coffee & Chill · Pademangan, Nord-Jakarta','footer.locationLink':'Sted','floating.chat':'CHAT'
  },
  zh: {
    'meta.title':'Smalltalk Coffee & Chill — 咖啡、宁静与交流','meta.description':'Smalltalk Coffee and Chill — 位于雅加达北部 Pademangan 的咖啡、舒适与交流空间。',
    'announcement.open':'每日营业 · 09:30 — 23:00','announcement.location':'PADEMANGAN · 雅加达北部','announcement.mood':'咖啡 · 宁静 · 交流',
    'nav.about':'关于','nav.menu':'菜单','nav.gallery':'画廊','nav.visit':'到店',
    'preferences.language':'语言','preferences.appearance':'外观','theme.dark':'深色','theme.light':'浅色','theme.switchDark':'切换到深色模式','theme.switchLight':'切换到浅色模式',
    'hero.eyebrow':'社区咖啡馆 · Pademangan','hero.titleA':'一处安静的地方','hero.titleB':'适合','hero.titleEm':'好好聊天。','hero.lead':'咖啡、舒适，还有让你忘记看时间的那些对话。','hero.explore':'查看菜单','hero.directions':'获取路线','hero.rating':'Google 评分','hero.open':'每日开门','hero.close':'每日打烊','hero.pause':'你每天的小憩。','hero.followMood':'关注今日氛围','hero.scroll':'向下浏览',
    'band.coffee':'好咖啡','band.light':'柔和灯光','band.talks':'长久交谈',
    'story.label':'关于 Smalltalk','story.titleA':'为那些喜欢','story.titleB':'多坐一会的人','story.titleEm':'而设计。','story.p1':'Smalltalk 介于快速喝杯咖啡的地方和非正式的第二客厅之间——放松、熟悉，也总让人想再次回来。','story.p2':'视觉方向刻意保持安静：温暖的中性色、充足的留白、编辑感字体，以及让照片自己说话的布局。','story.instagram':'在 Instagram 查看 Smalltalk',
    'principles.oneTitle':'随时来坐坐。','principles.oneText':'不需要特别计划，一杯咖啡就是足够的理由。','principles.twoTitle':'慢下来。','principles.twoText':'在城市喧嚣之间给自己一个柔和的暂停。','principles.threeTitle':'多待一会。','principles.threeText':'因为最好的闲聊往往不会只是几句话。',
    'menu.label':'菜单预览','menu.titleA':'找一个理由','menu.titleB':'让自己','menu.titleEm':'多待一会。','menu.note':'这里展示的是视觉菜单预览。拿到咖啡馆最新菜单后，可替换为正式商品和价格。','menu.ask':'索取最新菜单','menu.search':'搜索菜单预览','menu.demo':'示例','menu.price':'询问最新价格','menu.empty':'没有找到符合搜索的菜单项目。',
    'filters.all':'全部','filters.coffee':'咖啡','filters.nonCoffee':'非咖啡','filters.bites':'小食',
    'items.latte':'柔和的浓缩咖啡风味、顺滑奶香，适合每天轻松享用。','items.brownSugar':'冰凉顺滑，带有焦糖般的甜香，很适合炎热的雅加达午后。','items.matcha':'清新的抹茶香、柔和牛奶与干净的尾韵。','items.chocolate':'让人放松的浓郁巧克力，口感丝滑柔顺。','items.croffle':'酥脆边缘与黄油层次，非常适合搭配冰咖啡。','items.toast':'简单舒适的咖啡馆小食，适合长谈或工作时享用。',
    'moments.label':'Smalltalk 时刻','moments.titleA':'一家咖啡馆应该','moments.titleB':'既好看也','moments.titleEm':'让人舒服。','moments.note':'更安静的画廊，跟随咖啡馆的节奏：空间、咖啡、细节与人。','moments.spaceLabel':'空间','moments.spaceText':'在这里慢下来。','moments.pourLabel':'冲煮','moments.pourText':'新鲜，然后慢慢享受。','moments.textA':'好咖啡。','moments.textB':'柔和灯光。','moments.textC':'多坐一会。','moments.talkLabel':'交流','moments.talkText':'为咖啡而来，为故事而留下。','moments.instagram':'更多日常时刻都在 Instagram。','moments.follow':'关注 @smalltalkcoffeechill',
    'visit.label':'到访 Smalltalk','visit.titleA':'你的下一杯咖啡','visit.titleB':'就在','visit.titleEm':'这里。','visit.address':'地址','visit.hours':'每日营业','visit.contact':'联系方式','visit.maps':'打开 Google Maps','visit.rating':'Google 评分 · Pademangan',
    'closing.kicker':'一杯咖啡 · 一张桌子 · 一场好聊','closing.titleA':'Smalltalk 见','closing.cta':'开始一场闲聊','footer.location':'Smalltalk Coffee & Chill · Pademangan，雅加达北部','footer.locationLink':'位置','floating.chat':'聊天'
  },
  ja: {
    'meta.title':'Smalltalk Coffee & Chill — コーヒー、静けさ、会話','meta.description':'Smalltalk Coffee and Chill — 北ジャカルタ、パデマンガンでコーヒーと心地よい会話を。',
    'announcement.open':'毎日営業 · 09:30 — 23:00','announcement.location':'PADEMANGAN · 北ジャカルタ','announcement.mood':'コーヒー · 静けさ · 会話',
    'nav.about':'私たちについて','nav.menu':'メニュー','nav.gallery':'ギャラリー','nav.visit':'アクセス',
    'preferences.language':'言語','preferences.appearance':'表示','theme.dark':'ダーク','theme.light':'ライト','theme.switchDark':'ダークモードに切り替え','theme.switchLight':'ライトモードに切り替え',
    'hero.eyebrow':'街のコーヒースポット · Pademangan','hero.titleA':'静かな場所','hero.titleB':'心地よい','hero.titleEm':'会話のために。','hero.lead':'コーヒーと心地よさ、そして時間を忘れるほどの会話を。','hero.explore':'メニューを見る','hero.directions':'道順を見る','hero.rating':'Google 評価','hero.open':'毎日オープン','hero.close':'毎日クローズ','hero.pause':'毎日の小さな休息。','hero.followMood':'今日の雰囲気を見る','hero.scroll':'スクロール',
    'band.coffee':'おいしいコーヒー','band.light':'やわらかな光','band.talks':'長い会話',
    'story.label':'Smalltalk について','story.titleA':'ゆっくり過ごしたい','story.titleB':'人のために','story.titleEm':'つくられた場所。','story.p1':'Smalltalk は、気軽なコーヒーストップともう一つのリビングルームの間にあるような場所。リラックスできて、親しみやすく、また戻りたくなります。','story.p2':'ビジュアルはあえて静かに。温かいニュートラルカラー、ゆったりした余白、エディトリアルな書体、そして写真を主役にしています。','story.instagram':'Instagram で Smalltalk を見る',
    'principles.oneTitle':'ふらっと立ち寄る。','principles.oneText':'大きな予定は不要。一杯のコーヒーだけで十分です。','principles.twoTitle':'少しゆっくり。','principles.twoText':'街のにぎわいの中にある、やさしい休息。','principles.threeTitle':'もう少し長く。','principles.threeText':'良いスモールトークは、たいてい短く終わりません。',
    'menu.label':'メニュープレビュー','menu.titleA':'もう少し長くいる','menu.titleB':'理由を','menu.titleEm':'見つけよう。','menu.note':'こちらはメニューのビジュアルプレビューです。最新メニューが確認でき次第、正式な商品と価格に差し替えられます。','menu.ask':'最新メニューを問い合わせる','menu.search':'メニューを検索','menu.demo':'デモ','menu.price':'最新価格を問い合わせる','menu.empty':'検索に一致するメニューがありません。',
    'filters.all':'すべて','filters.coffee':'コーヒー','filters.nonCoffee':'ノンコーヒー','filters.bites':'フード',
    'items.latte':'やさしいエスプレッソ、クリーミーな口当たり。毎日飲みたくなるバランス。','items.brownSugar':'冷たくなめらかで、キャラメルのような甘さ。暑いジャカルタの午後にぴったり。','items.matcha':'香り豊かな抹茶、やわらかなミルク、すっきりした余韻。','items.chocolate':'ほっとする濃厚なチョコレートと、なめらかな口当たり。','items.croffle':'サクッとした縁とバターの層。アイスコーヒーとの相性も抜群。','items.toast':'長い会話や作業時間にちょうどいい、シンプルなカフェフード。',
    'moments.label':'Smalltalk の時間','moments.titleA':'カフェは見た目だけでなく','moments.titleB':'居心地も','moments.titleEm':'美しく。','moments.note':'空間、コーヒー、ディテール、人。カフェのペースを感じる静かなギャラリーです。','moments.spaceLabel':'空間','moments.spaceText':'ここでは、ゆっくり。','moments.pourLabel':'抽出','moments.pourText':'淹れたてを、ゆっくり。','moments.textA':'おいしいコーヒー。','moments.textB':'やわらかな光。','moments.textC':'もう少しここに。','moments.talkLabel':'会話','moments.talkText':'コーヒーを飲みに来て、物語のために残る。','moments.instagram':'日々の Smalltalk は Instagram で。','moments.follow':'@smalltalkcoffeechill をフォロー',
    'visit.label':'Smalltalk へ','visit.titleA':'次の一杯は','visit.titleB':'すぐ','visit.titleEm':'ここに。','visit.address':'住所','visit.hours':'毎日営業','visit.contact':'連絡先','visit.maps':'Google Maps を開く','visit.rating':'Google 評価 · Pademangan',
    'closing.kicker':'一杯 · 一つのテーブル · 心地よい会話','closing.titleA':'Smalltalk で会いましょう','closing.cta':'スモールトークを始める','footer.location':'Smalltalk Coffee & Chill · Pademangan, 北ジャカルタ','footer.locationLink':'場所','floating.chat':'CHAT'
  },
  ko: {
    'meta.title':'Smalltalk Coffee & Chill — 커피, 여유, 대화','meta.description':'Smalltalk Coffee and Chill — 북자카르타 파데망안에서 즐기는 커피, 편안함 그리고 대화.',
    'announcement.open':'매일 영업 · 09:30 — 23:00','announcement.location':'PADEMANGAN · 북자카르타','announcement.mood':'커피 · 여유 · 대화',
    'nav.about':'소개','nav.menu':'메뉴','nav.gallery':'갤러리','nav.visit':'방문',
    'preferences.language':'언어','preferences.appearance':'화면','theme.dark':'다크','theme.light':'라이트','theme.switchDark':'다크 모드로 전환','theme.switchLight':'라이트 모드로 전환',
    'hero.eyebrow':'동네 커피 스팟 · Pademangan','hero.titleA':'조용한 공간','hero.titleB':'좋은','hero.titleEm':'대화를 위해.','hero.lead':'커피와 편안함, 그리고 시간 가는 줄 모르게 만드는 대화.','hero.explore':'메뉴 보기','hero.directions':'길찾기','hero.rating':'Google 평점','hero.open':'매일 오픈','hero.close':'매일 마감','hero.pause':'당신의 일상 속 작은 쉼표.','hero.followMood':'오늘의 분위기 보기','hero.scroll':'스크롤',
    'band.coffee':'좋은 커피','band.light':'부드러운 빛','band.talks':'긴 대화',
    'story.label':'Smalltalk 소개','story.titleA':'조금 더 머물고 싶은','story.titleB':'사람들을 위해','story.titleEm':'만든 공간.','story.p1':'Smalltalk는 잠깐 들르는 커피숍과 비공식적인 두 번째 거실 사이에 있는 공간입니다. 편안하고 익숙하며 언제든 다시 찾기 좋습니다.','story.p2':'비주얼은 의도적으로 차분합니다. 따뜻한 뉴트럴 컬러, 넉넉한 여백, 에디토리얼 타이포그래피, 그리고 사진이 중심이 되는 구성입니다.','story.instagram':'Instagram에서 Smalltalk 보기',
    'principles.oneTitle':'가볍게 들르기.','principles.oneText':'거창한 계획은 필요 없습니다. 커피 한 잔이면 충분합니다.','principles.twoTitle':'조금 천천히.','principles.twoText':'도시의 소음 사이에서 누리는 부드러운 휴식.','principles.threeTitle':'조금 더 오래.','principles.threeText':'좋은 스몰토크는 대개 짧게 끝나지 않으니까요.',
    'menu.label':'메뉴 미리보기','menu.titleA':'조금 더 머물','menu.titleB':'이유를','menu.titleEm':'골라보세요.','menu.note':'이곳은 메뉴의 비주얼 미리보기입니다. 최신 카페 메뉴가 준비되면 공식 상품과 가격으로 교체할 수 있습니다.','menu.ask':'최신 메뉴 문의','menu.search':'메뉴 검색','menu.demo':'데모','menu.price':'최신 가격 문의','menu.empty':'검색과 일치하는 메뉴가 없습니다.',
    'filters.all':'전체','filters.coffee':'커피','filters.nonCoffee':'논커피','filters.bites':'푸드',
    'items.latte':'부드러운 에스프레소와 크리미한 질감, 매일 즐기기 좋은 밸런스.','items.brownSugar':'차갑고 부드러우며 카라멜 풍미가 살아 있어 더운 자카르타 오후에 잘 어울립니다.','items.matcha':'깊은 말차 풍미, 부드러운 우유, 깔끔한 마무리.','items.chocolate':'편안하고 진한 초콜릿과 벨벳처럼 부드러운 질감.','items.croffle':'바삭한 가장자리와 버터리한 레이어가 아이스커피와 잘 어울립니다.','items.toast':'긴 대화나 작업 시간에 어울리는 심플한 카페 컴포트 푸드.','moments.label':'Smalltalk 순간들','moments.titleA':'카페는 보기만 좋은 게 아니라','moments.titleB':'머무는 느낌도','moments.titleEm':'좋아야 합니다.','moments.note':'공간, 커피, 디테일, 사람. 카페의 리듬을 담은 차분한 갤러리입니다.','moments.spaceLabel':'공간','moments.spaceText':'여기서는 천천히.','moments.pourLabel':'브루잉','moments.pourText':'신선하게, 그리고 천천히.','moments.textA':'좋은 커피.','moments.textB':'부드러운 빛.','moments.textC':'조금 더 머물기.','moments.talkLabel':'대화','moments.talkText':'커피를 위해 오고, 이야기를 위해 머무세요.','moments.instagram':'더 많은 일상은 Instagram에서.','moments.follow':'@smalltalkcoffeechill 팔로우',
    'visit.label':'Smalltalk 방문','visit.titleA':'다음 커피는','visit.titleB':'바로','visit.titleEm':'여기에.','visit.address':'주소','visit.hours':'매일 영업','visit.contact':'연락처','visit.maps':'Google Maps 열기','visit.rating':'Google 평점 · Pademangan',
    'closing.kicker':'한 잔 · 한 테이블 · 좋은 대화 하나','closing.titleA':'Smalltalk에서 만나요','closing.cta':'스몰토크 시작하기','footer.location':'Smalltalk Coffee & Chill · Pademangan, 북자카르타','footer.locationLink':'위치','floating.chat':'CHAT'
  }
};

const supportedLanguages = ['en','id','no','zh','ja','ko'];
let activeFilter = 'all';
let currentLanguage = 'en';

function storageGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

function normalizeLanguage(code = '') {
  const lower = code.toLowerCase();
  if (lower === 'nb' || lower === 'nn') return 'no';
  const short = lower.split('-')[0];
  return supportedLanguages.includes(short) ? short : 'en';
}

function t(key) {
  return translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
}

function applyLanguage(language, persist = true) {
  currentLanguage = normalizeLanguage(language);
  document.documentElement.lang = currentLanguage;
  if (languageSelect) languageSelect.value = currentLanguage;
  if (mobileLanguageSelect) mobileLanguageSelect.value = currentLanguage;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const value = t(el.dataset.i18n);
    if (value !== undefined) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const value = t(el.dataset.i18nPlaceholder);
    if (value !== undefined) el.setAttribute('placeholder', value);
  });

  document.title = t('meta.title');
  descriptionMeta?.setAttribute('content', t('meta.description'));
  updateThemeControls();
  applyMenuFilter();
  if (persist) storageSet('smalltalk-language', currentLanguage);
}

function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function updateThemeControls() {
  const dark = currentTheme() === 'dark';
  if (themeToggle) themeToggle.setAttribute('aria-label', dark ? t('theme.switchLight') : t('theme.switchDark'));
  if (mobileThemeLabel) mobileThemeLabel.textContent = dark ? t('theme.dark') : t('theme.light');
  if (mobileThemeToggle) mobileThemeToggle.setAttribute('aria-label', dark ? t('theme.switchLight') : t('theme.switchDark'));
}

function applyTheme(theme, persist = true) {
  const next = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  themeMeta?.setAttribute('content', next === 'dark' ? '#11100e' : '#f4f0e8');
  updateThemeControls();
  if (persist) storageSet('smalltalk-theme', next);
}

function toggleTheme() {
  applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
}

const savedTheme = storageGet('smalltalk-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemDark ? 'dark' : 'light'), false);

const savedLanguage = storageGet('smalltalk-language');
applyLanguage(savedLanguage || normalizeLanguage(navigator.language), false);

languageSelect?.addEventListener('change', event => applyLanguage(event.target.value));
mobileLanguageSelect?.addEventListener('change', event => applyLanguage(event.target.value));
themeToggle?.addEventListener('click', toggleTheme);
mobileThemeToggle?.addEventListener('click', toggleTheme);

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

document.querySelectorAll('.mobile-menu nav a, .mobile-menu__footer a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu?.classList.remove('open');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

function applyMenuFilter() {
  const query = menuSearch?.value.trim().toLowerCase() || '';
  let visible = 0;
  menuCards.forEach(card => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const text = `${card.dataset.name || ''} ${card.textContent || ''}`.toLowerCase();
    const show = categoryMatch && text.includes(query);
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
