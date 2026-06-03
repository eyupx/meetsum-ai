/* Forgot Password Page */
function renderForgotPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderAuthNavbar('login')}
    <main class="split-layout" style="padding-top:var(--topbar-height)">
      <div class="split-decorative">
        <div class="split-glow-1"></div><div class="split-glow-2"></div>
        <div style="position:relative;z-index:10;text-align:center">
          <h1 class="split-title">${t('forgot_password')}</h1>
        </div>
      </div>
      <div class="split-form">
        <div class="split-form-inner">
          <div class="glass-card" style="padding:2.5rem;box-shadow:var(--shadow-xl)">
            <header style="margin-bottom:2rem">
              <h2 class="form-title">${t('forgot_password')}</h2>
              <p class="form-subtitle">${getCurrentLang()==='tr'?'E-posta adresinizi girin, \u015Fifre s\u0131f\u0131rlama linki g\u00F6nderelim.':'Enter your email to receive a password reset link.'}</p>
            </header>
            <form onsubmit="event.preventDefault();handleForgot()">
              <div class="form-group"><label class="form-label">${t('email')}</label><div class="input-group"><span class="material-symbols-outlined input-icon">mail</span><input type="email" class="input-field" id="forgotEmail" required></div></div>
              <button type="submit" class="btn-primary-lg" style="width:100%" id="forgotBtn">${getCurrentLang()==='tr'?'Link G\u00F6nder':'Send Link'}</button>
            </form>
            <p class="form-footer" style="margin-top:1.5rem"><a href="#login">${t('login')}</a></p>
          </div>
        </div>
      </div>
    </main>
  `;
}
async function handleForgot() {
  var btn = document.getElementById('forgotBtn');
  btn.disabled = true;
  try {
    await auth.sendPasswordResetEmail(document.getElementById('forgotEmail').value);
    showToast(getCurrentLang()==='tr'?'\u015Eifre s\u0131f\u0131rlama linki g\u00F6nderildi!':'Password reset link sent!');
  } catch(e) { showToast(firebaseErrorToMessage(e.code), 'error'); }
  btn.disabled = false;
}
