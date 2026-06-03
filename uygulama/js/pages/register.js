/* Register Page */
function renderRegisterPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderAuthNavbar('login')}
    <main class="split-layout" style="padding-top:var(--topbar-height)">
      <div class="split-decorative">
        <div class="split-glow-1"></div><div class="split-glow-2"></div>
        <div style="position:relative;z-index:10;text-align:center">
          <h1 class="split-title">${t('register_title')}</h1>
          <p class="split-subtitle">${t('register_subtitle')}</p>
          <div class="split-image-container">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtGAynnxAXthzYvzpRMHwUBdBDXAIuE9bsOJ59Zbju5eqHtlIAOiMqAG_UplGTpJ8vktcKBKPBdrZFgH-Hive3eltjysaeonIwuNT26KCiz2TatBwmOa4h__sZv6uP-Wv4t78xNnv4BGcfET7wQYGH7vtVGDQQTHMFoTurJZdfGL_diFljaQ1egRT6NEh4iz_aR9fNBY1cftq7CDgFiRqxU09SlqRxKFaoihA-ZkpXplda8bsIecMpau8DsEZUmFc1ln5fZnoLXn7G" alt="AI">
            <div class="split-image-overlay"></div>
            <div class="split-image-icon"><div class="pulse-bg"></div><span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">insights</span></div>
          </div>
        </div>
      </div>
      <div class="split-form">
        <div class="split-form-inner">
          <div style="display:none" class="mobile-brand"><span style="font-size:1.875rem;font-weight:900;color:var(--primary);letter-spacing:-0.05em">MeetSum AI</span></div>
          <div class="glass-card" style="padding:2.5rem;box-shadow:var(--shadow-xl)">
            <header style="margin-bottom:2.5rem">
              <h2 class="form-title">${t('register')}</h2>
              <p class="form-subtitle">${t('register_desc')}</p>
            </header>
            <form onsubmit="event.preventDefault();handleRegister()">
              <div class="form-group">
                <label class="form-label">${t('fullname')}</label>
                <div class="input-group"><span class="material-symbols-outlined input-icon">person</span><input type="text" class="input-field" id="regName" placeholder="Ad Soyad" required></div>
              </div>
              <div class="form-group">
                <label class="form-label">${t('email')}</label>
                <div class="input-group"><span class="material-symbols-outlined input-icon">mail</span><input type="email" class="input-field" id="regEmail" placeholder="ornek@eposta.com" required></div>
              </div>
              <div class="form-group">
                <label class="form-label">${t('password')}</label>
                <div class="input-group"><span class="material-symbols-outlined input-icon">lock</span><input type="password" class="input-field" id="regPassword" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>
                  <button type="button" class="input-action" onclick="togglePassword('regPassword', this)"><span class="material-symbols-outlined" style="font-size:20px">visibility</span></button>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">${t('password_confirm')}</label>
                <div class="input-group"><span class="material-symbols-outlined input-icon">lock</span><input type="password" class="input-field" id="regPasswordConfirm" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>
                  <button type="button" class="input-action" onclick="togglePassword('regPasswordConfirm', this)"><span class="material-symbols-outlined" style="font-size:20px">visibility</span></button>
                </div>
              </div>
              <button type="submit" class="btn-primary-lg" style="width:100%" id="regBtn">${t('register')}</button>
            </form>
            <div class="divider"><div class="divider-text"><span>veya</span></div></div>
            <button class="btn-ghost" style="width:100%;display:flex;align-items:center;justify-content:center;gap:0.75rem" onclick="doGoogleAuth()">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              ${t('google_register')}
            </button>
            <p class="form-footer">${t('has_account')} <a href="#login">${t('login')}</a></p>
          </div>
        </div>
      </div>
    </main>
  `;
}
async function handleRegister() {
  var pw = document.getElementById('regPassword').value;
  var pw2 = document.getElementById('regPasswordConfirm').value;
  if (pw !== pw2) { showToast(t('password_mismatch'), 'error'); return; }
  var btn = document.getElementById('regBtn');
  btn.disabled = true; btn.textContent = '...';
  await doRegister(document.getElementById('regName').value, document.getElementById('regEmail').value, pw);
  btn.disabled = false; btn.textContent = t('register');
}
