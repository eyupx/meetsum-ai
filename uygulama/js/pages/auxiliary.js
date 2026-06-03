/* Auxiliary Pages */
function renderPrivacyPage() {
  document.getElementById('app').innerHTML = `${renderNavbar()}
    <div style="padding:8rem 1.5rem 4rem;max-width:56rem;margin:0 auto">
      <h1 style="font-size:2.25rem;font-weight:800;color:white;margin-bottom:0.5rem">${t('privacy_title')}</h1>
      <p style="color:#94a3b8;margin-bottom:2.5rem">Son g\u00FCncelleme: 3 May\u0131s 2026</p>
      <div class="glass-card" style="padding:2.5rem;line-height:1.8;color:var(--on-surface-variant)">
        <h2 style="font-size:1.25rem;font-weight:700;color:white;margin-bottom:1rem">1. Genel Bak\u0131\u015F</h2>
        <p style="margin-bottom:1.5rem">MeetSum AI olarak ki\u015Fisel verilerinizin korunmas\u0131na b\u00FCy\u00FCk \u00F6nem veriyoruz.</p>
        <h2 style="font-size:1.25rem;font-weight:700;color:white;margin-bottom:1rem">2. Toplanan Veriler</h2>
        <ul style="margin-bottom:1.5rem;padding-left:1.5rem;list-style:disc"><li>Hesap bilgileri</li><li>Y\u00FCklenen toplant\u0131 kay\u0131tlar\u0131</li><li>Kullan\u0131m istatistikleri</li></ul>
        <h2 style="font-size:1.25rem;font-weight:700;color:white;margin-bottom:1rem">3. Veri G\u00FCvenli\u011Fi</h2>
        <p>Verileriniz Google Firebase altyap\u0131s\u0131 \u00FCzerinde g\u00FCvenli bir \u015Fekilde saklan\u0131r.</p>
      </div>
    </div>${renderFooter()}`;
}
function renderTermsPage() {
  document.getElementById('app').innerHTML = `${renderNavbar()}
    <div style="padding:8rem 1.5rem 4rem;max-width:56rem;margin:0 auto">
      <h1 style="font-size:2.25rem;font-weight:800;color:white;margin-bottom:0.5rem">${t('terms_title')}</h1>
      <p style="color:#94a3b8;margin-bottom:2.5rem">Son g\u00FCncelleme: 3 May\u0131s 2026</p>
      <div class="glass-card" style="padding:2.5rem;line-height:1.8;color:var(--on-surface-variant)">
        <h2 style="font-size:1.25rem;font-weight:700;color:white;margin-bottom:1rem">1. Hizmet Tan\u0131m\u0131</h2>
        <p style="margin-bottom:1.5rem">MeetSum AI, yapay zeka destekli toplant\u0131 \u00F6zetleme hizmeti sunar.</p>
        <h2 style="font-size:1.25rem;font-weight:700;color:white;margin-bottom:1rem">2. Kullan\u0131c\u0131 Sorumluluklar\u0131</h2>
        <ul style="margin-bottom:1.5rem;padding-left:1.5rem;list-style:disc"><li>Do\u011Fru bilgi sa\u011Flamak</li><li>Hesap g\u00FCvenli\u011Fini korumak</li></ul>
      </div>
    </div>${renderFooter()}`;
}
function renderContactPage() {
  document.getElementById('app').innerHTML = `${renderNavbar()}
    <div style="padding:8rem 1.5rem 4rem;max-width:72rem;margin:0 auto">
      <div style="text-align:center;margin-bottom:3rem">
        <h1 style="font-size:2.25rem;font-weight:800;color:white;margin-bottom:0.5rem">${t('contact_title')}</h1>
        <p style="color:#94a3b8">${t('contact_desc')}</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr;gap:2rem">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem">
          <div class="glass-card" style="padding:2rem;text-align:center"><span class="material-symbols-outlined" style="color:var(--primary);font-size:2rem;margin-bottom:0.75rem">mail</span><p style="font-weight:600;margin-bottom:0.25rem">${t('email')}</p><p style="color:#94a3b8;font-size:0.875rem">destek@meetsumai.com</p></div>
          <div class="glass-card" style="padding:2rem;text-align:center"><span class="material-symbols-outlined" style="color:var(--secondary);font-size:2rem;margin-bottom:0.75rem">location_on</span><p style="font-weight:600;margin-bottom:0.25rem">Adres</p><p style="color:#94a3b8;font-size:0.875rem">\u0130stanbul, T\u00FCrkiye</p></div>
          <div class="glass-card" style="padding:2rem;text-align:center"><span class="material-symbols-outlined" style="color:var(--tertiary);font-size:2rem;margin-bottom:0.75rem">schedule</span><p style="font-weight:600;margin-bottom:0.25rem">\u00C7al\u0131\u015Fma Saatleri</p><p style="color:#94a3b8;font-size:0.875rem">Pzt-Cum, 09:00-18:00</p></div>
        </div>
        <div class="glass-card" style="padding:2rem;max-width:40rem;margin:0 auto;width:100%">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem">${t('send_message')}</h3>
          <form onsubmit="event.preventDefault();showToast(t('msg_sent'))">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
              <div class="form-group"><label class="form-label">${t('fullname')}</label><div class="input-group"><span class="material-symbols-outlined input-icon">person</span><input type="text" class="input-field" required></div></div>
              <div class="form-group"><label class="form-label">${t('email')}</label><div class="input-group"><span class="material-symbols-outlined input-icon">mail</span><input type="email" class="input-field" required></div></div>
            </div>
            <div class="form-group"><label class="form-label">${t('subject')}</label><div class="input-group"><span class="material-symbols-outlined input-icon">topic</span><input type="text" class="input-field" required></div></div>
            <div class="form-group"><label class="form-label">${t('message')}</label><textarea class="input-field" style="min-height:120px;padding:1rem;resize:vertical" required></textarea></div>
            <button type="submit" class="btn-primary-lg" style="width:100%">${t('send_message')}</button>
          </form>
        </div>
      </div>
    </div>${renderFooter()}`;
}
function renderNotFoundPage() {
  document.getElementById('app').innerHTML = `${renderNavbar()}
    <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:2rem">
      <h1 style="font-size:8rem;font-weight:900;color:var(--primary-container);opacity:0.3;line-height:1">404</h1>
      <h2 style="font-size:2rem;font-weight:700;color:white;margin-bottom:1rem">${t('page_not_found')}</h2>
      <p style="color:#94a3b8;margin-bottom:2.5rem;max-width:24rem">${t('not_found_desc')}</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;justify-content:center">
        <button class="btn-primary-lg" onclick="Router.navigate('')">${t('go_home')}</button>
        <button class="btn-outline" onclick="Router.navigate('contact')">${t('get_support')}</button>
      </div>
    </div>`;
}
