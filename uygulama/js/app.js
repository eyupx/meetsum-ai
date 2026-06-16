/* =============================================
   MeetSum AI — SPA Application Core (Firebase)
   ============================================= */

const AppState = { user: null, profile: null, meetings: [], isLoading: false };

// ── SPA Router ──
const Router = {
  routes: {},
  init() {
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('load', () => this.resolve());
  },
  register(path, handler) { this.routes[path] = handler; },
  navigate(path) { window.location.hash = path; },
  resolve() {
    const hash = window.location.hash.slice(1) || '';
    const [path, ...params] = hash.split('/');
    const publicPages = ['', 'login', 'register', 'forgot', 'privacy', 'terms', 'contact'];
    const isPublic = publicPages.includes(path);
    if (!isPublic && !AppState.user) { this.navigate('login'); return; }
    if (AppState.user && ['login', 'register', ''].includes(path)) { this.navigate('dashboard'); return; }
    const handler = this.routes[path] || this.routes['404'];
    if (handler) {
      const app = document.getElementById('app');
      app.innerHTML = ''; app.className = '';
      handler(params);
      window.scrollTo(0, 0);
    }
  }
};

// ── Component Helpers ──
function renderNavbar() {
  const themeIcon = (localStorage.getItem('meetsum_theme') || 'dark') === 'dark' ? 'dark_mode' : 'light_mode';
  const mobileThemeText = (localStorage.getItem('meetsum_theme') || 'dark') === 'dark' ? t('dark') + ' ' + t('theme') : t('light') + ' ' + t('theme');
  return `
    <nav class="navbar">
      <div class="navbar-inner">
        <a href="#" class="navbar-logo">MeetSum AI</a>
        <div class="navbar-links">
          <a href="#">${t('home')}</a>
          <a href="#features" onclick="event.preventDefault();document.getElementById('features')?.scrollIntoView({behavior:'smooth'})">${t('features')}</a>
                  </div>
        <div class="navbar-actions">
          <button class="btn" style="color:#94a3b8;padding:0.5rem 1rem" onclick="Router.navigate('login')">${t('login')}</button>
          <button class="btn" style="color:#94a3b8;padding:0.5rem 1rem" onclick="Router.navigate('register')">${t('register')}</button>
          <button class="navbar-theme-toggle" onclick="toggleThemeBtn()" title="Tema">
            <span class="material-symbols-outlined" style="font-size:20px" id="navThemeIcon">${themeIcon}</span>
          </button>
          <button class="navbar-hamburger" onclick="toggleMobileNav()">
            <span class="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-nav" id="mobileNav">
      <div class="mobile-nav-header">
        <a href="#" class="mobile-nav-brand" onclick="toggleMobileNav()">MeetSum AI</a>
        <button class="mobile-nav-close" onclick="toggleMobileNav()"><span class="material-symbols-outlined">close</span></button>
      </div>
      <nav class="mobile-nav-links">
        <a href="#" onclick="toggleMobileNav()"><span class="material-symbols-outlined">home</span><span>${t('home')}</span></a>
        <a href="#features" onclick="event.preventDefault();toggleMobileNav();document.getElementById('features')?.scrollIntoView({behavior:'smooth'})"><span class="material-symbols-outlined">auto_awesome</span><span>${t('features')}</span></a>
      </nav>
      <div class="mobile-nav-divider"></div>
      <div class="mobile-nav-actions">
        <button class="mobile-nav-theme" onclick="toggleThemeBtn()">
          <span class="material-symbols-outlined" id="mobileThemeIcon">${themeIcon}</span>
          <span id="mobileThemeText">${mobileThemeText}</span>
        </button>
      </div>
      <div class="mobile-nav-divider"></div>
      <div class="mobile-nav-auth">
        <a href="#login" class="mobile-nav-login" onclick="toggleMobileNav()">${t('login')}</a>
        <a href="#register" class="mobile-nav-register" onclick="toggleMobileNav()">${t('register')}</a>
      </div>
    </div>
    <div class="mobile-nav-overlay" id="mobileNavOverlay" onclick="toggleMobileNav()"></div>
  `;
}

function renderAuthNavbar(showButton) {
  const btnText = showButton === 'register' ? t('register') : t('login');
  const btnHash = showButton === 'register' ? 'register' : 'login';
  const themeIcon = (localStorage.getItem('meetsum_theme') || 'dark') === 'dark' ? 'dark_mode' : 'light_mode';
  return `
    <nav class="navbar" style="background:var(--surface-container-low);box-shadow:var(--shadow-xl)">
      <div class="navbar-inner">
        <a href="#" class="navbar-logo" style="color:var(--primary)">MeetSum AI</a>
        <div class="navbar-actions">
          <a href="#terms" style="color:#9ca3af;font-size:0.875rem">${t('terms_link')}</a>
          <button class="btn" style="color:#94a3b8;padding:0.5rem 1rem;font-size:0.875rem" onclick="Router.navigate('${btnHash}')">${btnText}</button>
          <button class="navbar-theme-toggle" onclick="toggleThemeBtn()" title="Tema">
            <span class="material-symbols-outlined" style="font-size:20px" id="navThemeIcon">${themeIcon}</span>
          </button>
        </div>
      </div>
    </nav>
  `;
}

function renderSidebar(activePage) {
  const links = [
    { id: 'dashboard', icon: 'dashboard', labelKey: 'sidebar_home' },
    { id: 'new', icon: 'add_circle', labelKey: 'sidebar_new' },
    { id: 'meetings', icon: 'history', labelKey: 'sidebar_meetings' },
    { id: 'profile', icon: 'person', labelKey: 'sidebar_profile' },
    { id: 'settings', icon: 'settings', labelKey: 'sidebar_settings' }
  ];
  const isAdmin = AppState.profile?.role === 'admin' || (typeof ADMIN_EMAILS !== 'undefined' && ADMIN_EMAILS.includes(AppState.user?.email?.toLowerCase()));
  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo"><h1>MeetSum AI</h1><p>AI Executive</p></div>
      <nav class="sidebar-nav">
        ${links.map(l => `
          <a href="#${l.id}" class="sidebar-link ${activePage === l.id ? 'active' : ''}">
            <span class="material-symbols-outlined">${l.icon}</span><span>${t(l.labelKey)}</span>
          </a>
        `).join('')}
      </nav>
      <div class="sidebar-bottom">
        ${isAdmin ? '<span class="badge badge-secondary" style="margin-bottom:0.5rem;display:inline-block">' + t('admin_badge') + '</span>' : ''}
        <a href="#" class="sidebar-link btn-danger" onclick="event.preventDefault();doLogout()">
          <span class="material-symbols-outlined">logout</span><span>${t('sidebar_logout')}</span>
        </a>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebarOverlay" onclick="toggleSidebar()"></div>
  `;
}

function renderTopbar() {
  const name = AppState.profile?.name || AppState.user?.displayName || 'User';
  const initial = name.charAt(0).toUpperCase();
  const themeIcon = (localStorage.getItem('meetsum_theme') || 'dark') === 'dark' ? 'dark_mode' : 'light_mode';
  return `
    <header class="topbar">
      <div class="topbar-left">
        <button class="topbar-hamburger" onclick="toggleSidebar()"><span class="material-symbols-outlined">menu</span></button>
      </div>
      <div class="topbar-right">
        <button class="theme-toggle" onclick="toggleThemeBtn()" title="Tema">
          <span class="material-symbols-outlined" style="font-size:20px" id="themeIcon">${themeIcon}</span>
        </button>
        <div class="topbar-user"><span>${name}</span><div class="topbar-avatar">${initial}</div></div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `<footer class="footer"><div class="footer-inner">
    <div><div class="footer-brand">MeetSum AI</div><p class="footer-copy">© 2026 MEETSUM AI. TÜM HAKLARI SAKLIDIR.</p></div>
    <div class="footer-links"><a href="#privacy">${t('privacy_title')}</a><a href="#terms">${t('terms_title')}</a><a href="#contact">${t('contact_title')}</a></div>
  </div></footer>`;
}

function renderFloatingAssistant() {
  return `<div class="floating-assistant glass-card" style="border-color:rgba(196,192,255,0.2)">
    <div class="floating-dot"></div><p>MeetSum AI şu an <strong>müsait</strong> ve özetlemeye hazır.</p>
  </div>`;
}

// ── UI Helpers ──
function toggleSidebar() {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('sidebarOverlay')?.classList.toggle('show');
}
function toggleMobileNav() {
  var nav = document.getElementById('mobileNav');
  var overlay = document.getElementById('mobileNavOverlay');
  if (nav) { var isOpen = nav.classList.contains('open'); if (isOpen) { nav.style.transform = 'translateX(100%)'; setTimeout(function() { nav.classList.remove('open'); nav.style.transform = ''; }, 300); } else { nav.classList.add('open'); } }
  if (overlay) overlay.classList.toggle('show');
}
function showToast(message, type) {
  type = type || 'success';
  // Suppress non-error toasts when notifications are disabled
  if (type !== 'error' && AppState.profile?.settings?.notifications === false) return;
  var existing = document.querySelector('.toast'); if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type + ' glass-card';
  toast.innerHTML = '<span class="material-symbols-outlined" style="color:' + (type === 'success' ? 'var(--secondary)' : 'var(--error)') + '">' + (type === 'success' ? 'check_circle' : 'error') + '</span><span>' + message + '</span>';
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3000);
}

// ── Firebase Auth Functions ──
async function doLogin(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    showToast(t('login_success'));
  } catch (e) { showToast(firebaseErrorToMessage(e.code), 'error'); }
}

async function doRegister(name, email, password) {
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await cred.user.updateProfile({ displayName: name });
    const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
    await db.collection('users').doc(cred.user.uid).set({
      name: name, email: email, role: 'user',
      joinDate: firebase.firestore.FieldValue.serverTimestamp(),
      settings: { theme: 'dark', lang: getCurrentLang(), notifications: true, summaryLength: 'medium', actionItems: true }
    });
    showToast(t('register_success'));
  } catch (e) { showToast(firebaseErrorToMessage(e.code), 'error'); }
}

async function doGoogleAuth() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    await getOrCreateUserProfile(result.user);
    showToast(t('google_success'));
  } catch (e) { if (e.code !== 'auth/popup-closed-by-user') showToast(firebaseErrorToMessage(e.code), 'error'); }
}

async function doLogout() {
  await auth.signOut();
  AppState.user = null; AppState.profile = null; AppState.meetings = [];
  Router.navigate('');
  showToast(t('logout_success'));
}

// ── Meeting Functions ──
async function loadMeetings() {
  if (!AppState.user) return [];
  try {
    AppState.meetings = await getMeetingsFromFirestore(AppState.user.uid);
  } catch (e) { AppState.meetings = []; }
  return AppState.meetings;
}

function getMeetings() { return AppState.meetings; }

function getMeetingById(id) { return AppState.meetings.find(m => m.id === id); }

async function saveMeeting(meetingData) {
  if (!AppState.user) return null;
  meetingData.date = new Date().toLocaleDateString(getCurrentLang() === 'tr' ? 'tr-TR' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  meetingData.status = t('completed');
  const id = await saveMeetingToFirestore(AppState.user.uid, meetingData);
  meetingData.id = id;
  AppState.meetings.unshift(meetingData);
  return meetingData;
}

async function deleteMeeting(id) {
  if (!AppState.user) return;
  await deleteMeetingFromFirestore(AppState.user.uid, id);
  AppState.meetings = AppState.meetings.filter(m => m.id !== id);
}

// ── Demo AI Summarizer ──
async function summarizeMeeting(text) {
  var lang = getCurrentLang();
  var lengthSetting = AppState.profile?.settings?.summaryLength || 'medium';
  var extractActions = AppState.profile?.settings?.actionItems !== false;

  var lengthInstruction = {
    short: lang === 'tr' ? '2-3 cümle ile kısa bir özet yaz.' : 'Write a short summary in 2-3 sentences.',
    medium: lang === 'tr' ? '1 paragraf ile orta detaylı bir özet yaz.' : 'Write a medium-detail summary in 1 paragraph.',
    long: lang === 'tr' ? 'Detaylı ve kapsamlı bir özet yaz, tüm önemli noktaları dahil et.' : 'Write a detailed and comprehensive summary, include all important points.'
  }[lengthSetting] || (lang === 'tr' ? '1 paragraf ile orta detaylı bir özet yaz.' : 'Write a medium-detail summary in 1 paragraph.');

  var systemPrompt = lang === 'tr'
    ? 'Sen profesyonel bir toplanti ozetleme asistanisin. TERIM DUZELTMESI: Metin icinde Midsum, Mitsam, mid-sum gibi hatali duyulmus kelimeler varsa bunlari her zaman MeetSum AI olarak duzelt. KONUSMACI AYIRIMI (COK ONEMLI): Bir cumlede birinin adi geciyorsa o kisi gorevli DEGIL olabilir. Hitap edilen kisi ile konusan kisiyi karistirma. Ornegin: Selam Eyup, ben bunu yarinadan cozecegim diyorsa, gorevi ustlenen konusan kisidir, Eyup DEGiLDIR cunku Eyup e hitap edilmektedir. Eger konusan kisinin ismi metinde belirtilmiyorsa sorumlu alanina Belirtilmedi yaz, yanlis bir isim atama. EKSIKSIZ CIKARIM: Toplanti sonundaki teknik detaylari (veritabani, sunucu yedekleme vb.) is halledilmis bile olsa Alinan Kararlar arasina mutlaka ekle. SADECE gecerli JSON dondur, baska hicbir sey yazma. Markdown code fence kullanma.'
    : 'You are a professional meeting summarization assistant. TERM CORRECTION: If text contains misheard words like Midsum, Mitsam, mid-sum, always correct them to MeetSum AI. SPEAKER DISTINCTION (VERY IMPORTANT): Just because a name appears in a sentence does NOT mean that person is responsible. Distinguish between the person being addressed and the person speaking. Example: If someone says Hello Eyup, I will fix this by tomorrow - the person taking the task is the SPEAKER, NOT Eyup, because Eyup is being greeted. If the speakers name is not mentioned in the text, write Not specified in the responsible field, do not assign a wrong name. COMPLETE EXTRACTION: Include technical details from end of meeting (database, backups etc.) in Decisions even if already handled. Return ONLY valid JSON, nothing else. Do not use markdown code fences.';

  var userPrompt = lang === 'tr'
    ? `Aşağıdaki toplantı metnini analiz et ve JSON formatında yanıt ver.

Kurallar:
- ${lengthInstruction}
- ${extractActions ? 'Eylem maddelerini çıkar (görev, sorumlu kişi, tarih/süre). Metinde isim yoksa "Belirtilmedi" yaz.' : 'Eylem maddeleri çıkarmana gerek yok, boş dizi döndür.'}
- Alınan kararları listele.
- 3-5 anahtar konu çıkar.

JSON formatı:
{"ozet": "toplantı özeti", "eylem_maddeleri": [{"gorev": "görev", "sorumlu": "kişi", "tarih": "tarih"}], "kararlar": ["karar 1"], "anahtar_konular": ["konu 1"]}

KRITIK UYARI - SORUMLU ATAMA KURALI:
Metinde \"Selam [isim]\" veya \"[isim] araya giriyorum\" gibi bir ifade geciyorsa, o isim konusan kisi DEGILDIR, konusulan kisidir.
\"Ben ... cozerim/yapacagim\" diyen kisi konusmacidir. Eger konusmacinin kendi ismi metinde gecmiyorsa sorumlu = \"Belirtilmedi\" yaz.
Ornek: \"Selam Eyup. Ben bunu yarina cozerim\" -> gorev yapan Eyup DEGIL, konusmaci (ismi bilinmiyor) -> sorumlu: \"Belirtilmedi\"

Toplantı metni:
${text}`
    : `Analyze the following meeting text and respond in JSON format.

Rules:
- ${lengthInstruction}
- ${extractActions ? 'Extract action items (task, responsible person, deadline). If no name mentioned, write "Not specified".' : 'No need to extract action items, return empty array.'}
- List decisions made.
- Extract 3-5 key topics.

JSON format:
{"ozet": "meeting summary", "eylem_maddeleri": [{"gorev": "task", "sorumlu": "person", "tarih": "deadline"}], "kararlar": ["decision 1"], "anahtar_konular": ["topic 1"]}

CRITICAL WARNING - RESPONSIBILITY ASSIGNMENT RULE:
If text contains \"Hello [name]\" or \"[name] let me interrupt\", that name is the person being ADDRESSED, NOT the speaker.
The person saying \"I will fix/do this\" is the speaker. If the speakers own name is not mentioned, set responsible = \"Not specified\".
Example: \"Hello Eyup. I will fix this by tomorrow\" -> the task owner is NOT Eyup, its the speaker (unknown name) -> responsible: \"Not specified\"

Meeting text:
${text}`;

  try {
    var response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + GROQ_API_KEY
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2048,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      var errData = await response.json().catch(function() { return {}; });
      console.error('Groq API error:', response.status, errData);
      if (response.status === 429) {
        var retryMsg = lang === 'tr' ? 'API istek limiti aşıldı. Lütfen 1 dakika bekleyip tekrar deneyin.' : 'API rate limit exceeded. Please wait 1 minute and try again.';
        showToast(retryMsg, 'error');
      }
      throw new Error('API error: ' + response.status);
    }

    var data = await response.json();
    var rawText = data.choices?.[0]?.message?.content || '';

    // Clean JSON
    rawText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    var result = JSON.parse(rawText);

    return {
      ozet: result.ozet || '',
      eylem_maddeleri: Array.isArray(result.eylem_maddeleri) ? result.eylem_maddeleri : [],
      kararlar: Array.isArray(result.kararlar) ? result.kararlar : [],
      anahtar_konular: Array.isArray(result.anahtar_konular) ? result.anahtar_konular : []
    };
  } catch (err) {
    console.error('Summarization error:', err);
    showToast(lang === 'tr' ? 'AI servisi şu an kullanılamıyor. Lütfen tekrar deneyin.' : 'AI service is currently unavailable. Please try again.', 'error');
    return {
      ozet: lang === 'tr' ? 'Özet oluşturulamadı. Lütfen tekrar deneyin.' : 'Summary could not be generated. Please try again.',
      eylem_maddeleri: [],
      kararlar: [],
      anahtar_konular: []
    };
  }
}

// ── Theme ──
function applyTheme(theme) {
  document.body.classList.toggle('theme-light', theme === 'light');
  localStorage.setItem('meetsum_theme', theme);
  var icon = document.getElementById('themeIcon'); if (icon) icon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
  var navIcon = document.getElementById('navThemeIcon'); if (navIcon) navIcon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
  var mobileIcon = document.getElementById('mobileThemeIcon'); if (mobileIcon) mobileIcon.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
  var mobileText = document.getElementById('mobileThemeText');
  if (mobileText) mobileText.textContent = theme === 'dark' ? t('dark') + ' ' + t('theme') : t('light') + ' ' + t('theme');
  document.querySelectorAll('[data-setting="meetsum_theme"]').forEach(function(btn) { btn.classList.toggle('active', btn.getAttribute('data-value') === theme); });
  // Save to Firestore if logged in
  if (AppState.user) saveUserSetting(AppState.user.uid, 'theme', theme).catch(function(){});
}

function toggleThemeBtn() {
  var current = localStorage.getItem('meetsum_theme') || 'dark';
  var newTheme = current === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  showToast(newTheme === 'dark' ? t('dark_active') : t('light_active'));
}

function togglePassword(inputId, btn) {
  var input = document.getElementById(inputId);
  var icon = btn.querySelector('.material-symbols-outlined');
  if (input.type === 'password') { input.type = 'text'; icon.textContent = 'visibility_off'; }
  else { input.type = 'password'; icon.textContent = 'visibility'; }
}

// ── Init App ──
function initApp() {
  Router.register('', renderLandingPage);
  Router.register('login', renderLoginPage);
  Router.register('register', renderRegisterPage);
  Router.register('forgot', renderForgotPage);
  Router.register('dashboard', renderDashboardPage);
  Router.register('new', renderNewMeetingPage);
  Router.register('meetings', renderMeetingsPage);
  Router.register('summary', renderSummaryPage);
  Router.register('profile', renderProfilePage);
  Router.register('settings', renderSettingsPage);
  Router.register('privacy', renderPrivacyPage);
  Router.register('terms', renderTermsPage);
  Router.register('contact', renderContactPage);
  Router.register('404', renderNotFoundPage);

  // Apply saved theme
  var savedTheme = localStorage.getItem('meetsum_theme') || 'dark';
  if (savedTheme === 'light') document.body.classList.add('theme-light');

  // Firebase Auth state listener
  auth.onAuthStateChanged(async function(user) {
    if (user) {
      AppState.user = user;
      try {
        AppState.profile = await getOrCreateUserProfile(user);
        // Apply user settings
        if (AppState.profile.settings) {
          if (AppState.profile.settings.theme) { localStorage.setItem('meetsum_theme', AppState.profile.settings.theme); applyTheme(AppState.profile.settings.theme); }
          if (AppState.profile.settings.lang) localStorage.setItem('meetsum_lang', AppState.profile.settings.lang);
        }
        await loadMeetings();
      } catch(e) { console.error('Profile load error:', e); }
    } else {
      AppState.user = null; AppState.profile = null; AppState.meetings = [];
    }
    Router.init();
    Router.resolve();
  });
}

document.addEventListener('DOMContentLoaded', initApp);
