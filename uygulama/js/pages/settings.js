/* Settings Page */
function renderSettingsPage() {
  const app = document.getElementById('app');
  const s = AppState.profile?.settings || {};
  const curLang = localStorage.getItem('meetsum_lang') || s.lang || 'tr';
  const curTheme = localStorage.getItem('meetsum_theme') || s.theme || 'dark';
  const curLen = s.summaryLength || 'medium';
  const curActions = s.actionItems !== false;
  const curNotif = s.notifications !== false;

  app.innerHTML = `
    ${renderSidebar('settings')}
    ${renderTopbar()}
    <main class="main-content">
      <h2 style="font-size:2.25rem;font-weight:800;margin-bottom:2rem">${t('settings_title')}</h2>
      <div style="display:grid;gap:2rem">
        <div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem"><span class="material-symbols-outlined" style="color:var(--primary)">tune</span> ${t('general_settings')}</h3>
          <div style="display:flex;flex-direction:column;gap:1.5rem">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
              <div><p style="font-weight:600">${t('notifications')}</p><p style="font-size:0.8125rem;color:#94a3b8">${t('notif_desc')}</p></div>
              <label class="toggle-switch"><input type="checkbox" ${curNotif?'checked':''} onchange="handleSettingToggle('notifications',this.checked)"><span class="toggle-slider"></span></label>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
              <div><p style="font-weight:600">${t('language')}</p><p style="font-size:0.8125rem;color:#94a3b8">${t('lang_desc')}</p></div>
              <div class="setting-btn-group">
                <button class="setting-btn ${curLang==='tr'?'active':''}" data-setting="lang" data-value="tr" onclick="handleLangChange('tr',this)">T\u00FCrk\u00E7e</button>
                <button class="setting-btn ${curLang==='en'?'active':''}" data-setting="lang" data-value="en" onclick="handleLangChange('en',this)">English</button>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
              <div><p style="font-weight:600">${t('theme')}</p><p style="font-size:0.8125rem;color:#94a3b8">${t('theme_desc')}</p></div>
              <div class="setting-btn-group">
                <button class="setting-btn ${curTheme==='dark'?'active':''}" data-setting="meetsum_theme" data-value="dark" onclick="handleThemeChange('dark',this)"><span class="material-symbols-outlined" style="font-size:16px">dark_mode</span> ${t('dark')}</button>
                <button class="setting-btn ${curTheme==='light'?'active':''}" data-setting="meetsum_theme" data-value="light" onclick="handleThemeChange('light',this)"><span class="material-symbols-outlined" style="font-size:16px">light_mode</span> ${t('light')}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem"><span class="material-symbols-outlined" style="color:var(--secondary)">auto_awesome</span> ${t('summary_settings')}</h3>
          <div style="display:flex;flex-direction:column;gap:1.5rem">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
              <div><p style="font-weight:600">${t('summary_length')}</p><p style="font-size:0.8125rem;color:#94a3b8">${t('length_desc')}</p></div>
              <div class="setting-btn-group">
                <button class="setting-btn ${curLen==='short'?'active':''}" onclick="handleSettingSel('summaryLength','short',this)">${t('short_label')}</button>
                <button class="setting-btn ${curLen==='medium'?'active':''}" onclick="handleSettingSel('summaryLength','medium',this)">${t('medium_label')}</button>
                <button class="setting-btn ${curLen==='long'?'active':''}" onclick="handleSettingSel('summaryLength','long',this)">${t('detailed_label')}</button>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
              <div><p style="font-weight:600">${t('action_items')}</p><p style="font-size:0.8125rem;color:#94a3b8">${t('action_desc')}</p></div>
              <label class="toggle-switch"><input type="checkbox" ${curActions?'checked':''} onchange="handleSettingToggle('actionItems',this.checked)"><span class="toggle-slider"></span></label>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;
}
function handleThemeChange(val, btn) { applyTheme(val); btn.parentElement.querySelectorAll('.setting-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); showToast(t('setting_saved')); }
async function handleLangChange(val, btn) {
  localStorage.setItem('meetsum_lang', val);
  if (AppState.user) await saveUserSetting(AppState.user.uid, 'lang', val).catch(()=>{});
  btn.parentElement.querySelectorAll('.setting-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  showToast(t('setting_saved'));
  renderSettingsPage();
}
async function handleSettingToggle(key, val) {
  if (AppState.user) await saveUserSetting(AppState.user.uid, key, val).catch(()=>{});
  if (AppState.profile?.settings) AppState.profile.settings[key] = val;
  showToast(t('setting_saved'));
}
async function handleSettingSel(key, val, btn) {
  if (AppState.user) await saveUserSetting(AppState.user.uid, key, val).catch(()=>{});
  if (AppState.profile?.settings) AppState.profile.settings[key] = val;
  btn.parentElement.querySelectorAll('.setting-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  showToast(t('setting_saved'));
}

