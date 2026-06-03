/* Login Page */
function renderLoginPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderAuthNavbar('register')}
    <main class="split-layout" style="padding-top:var(--topbar-height)">
      <div class="split-decorative">
        <div class="split-glow-1"></div><div class="split-glow-2"></div>
        <div style="position:relative;z-index:10;text-align:center">
          <h1 class="split-title">${t('welcome')}</h1>
          <p class="split-subtitle">${t('welcome_desc')}</p>
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
              <h2 class="form-title">${t('login')}</h2>
              <p class="form-subtitle">${t('login_desc')}</p>
            </header>
            <form id="loginForm" onsubmit="event.preventDefault();handleLogin()">
              <div class="form-group">
                <label class="form-label">${t('email')}</label>
                <div class="input-group"><span class="material-symbols-outlined input-icon">mail</span><input type="email" class="input-field" id="loginEmail" placeholder="ornek@eposta.com" required></div>
              </div>
              <div class="form-group">
                <label class="form-label">${t('password')}</label>
                <div class="input-group"><span class="material-symbols-outlined input-icon">lock</span><input type="password" class="input-field" id="loginPassword" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required>
                  <button type="button" class="input-action" onclick="togglePassword('loginPassword', this)"><span class="material-symbols-outlined" style="font-size:20px">visibility</span></button>
                </div>
              </div>
              <div class="form-row">
                <label><input type="checkbox" class="checkbox-custom" id="rememberMe"> ${t('remember_me')}</label>
                <a href="#forgot">${t('forgot_password')}</a>
              </div>
              <button type="submit" class="btn-primary-lg" style="width:100%" id="loginBtn">${t('login')}</button>
            </form>
            <div class="divider"><div class="divider-text"><span>veya</span></div></div>
            <button class="btn-ghost" style="width:100%;display:flex;align-items:center;justify-content:center;gap:0.75rem" onclick="doGoogleAuth()">
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              ${t('google_login')}
            </button>
            <p class="form-footer">${t('no_account')} <a href="#register">${t('register')}</a></p>
          </div>
        </div>
      </div>
    </main>
  `;
}
async function handleLogin() {
  var btn = document.getElementById('loginBtn');
  btn.disabled = true; btn.textContent = '...';
  var remember = document.getElementById('rememberMe')?.checked;
  var persistence = remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
  try {
    await auth.setPersistence(persistence);
  } catch(e) { console.warn('Persistence error:', e); }
  await doLogin(document.getElementById('loginEmail').value, document.getElementById('loginPassword').value);
  btn.disabled = false; btn.textContent = t('login');
}
function togglePassword(inputId, btn) {
  var input = document.getElementById(inputId);
  var icon = btn.querySelector('.material-symbols-outlined');
  if (input.type === 'password') { input.type = 'text'; icon.textContent = 'visibility_off'; }
  else { input.type = 'password'; icon.textContent = 'visibility'; }
}
