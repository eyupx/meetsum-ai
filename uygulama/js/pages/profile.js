/* Profile Page */
async function renderProfilePage() {
  const app = document.getElementById('app');
  const user = AppState.profile || {};
  const meetings = getMeetings();
  const totalActions = meetings.reduce((s, m) => s + (m.eylem_maddeleri?.length || 0), 0);
  const now = new Date();
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonth = meetings.filter(m => m.createdAt?.toDate ? m.createdAt.toDate() >= startMonth : false).length;

  app.innerHTML = `
    ${renderSidebar('profile')}
    ${renderTopbar()}
    <main class="main-content">
      <h2 style="font-size:2.25rem;font-weight:800;margin-bottom:2rem">${t('profile_title')}</h2>
      <div style="display:grid;grid-template-columns:1fr;gap:2rem">
        <div class="glass-card" style="padding:2rem;display:flex;align-items:center;gap:2rem;flex-wrap:wrap">
          <div style="width:5rem;height:5rem;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:900;color:var(--on-primary)">${(user.name || 'U').charAt(0)}</div>
          <div style="flex:1">
            <h3 style="font-size:1.5rem;font-weight:700;margin-bottom:0.25rem">${user.name || ''}</h3>
            <p style="color:#94a3b8">${user.email || ''}</p>
          </div>
        </div>
        <div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem">${t('statistics')}</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1.5rem">
            <div><p class="stat-label">${t('stat_total')}</p><p class="stat-value">${meetings.length}</p></div>
            <div><p class="stat-label">${t('this_month')}</p><p class="stat-value">${thisMonth}</p></div>
            <div><p class="stat-label">${t('stat_actions')}</p><p class="stat-value">${totalActions}</p></div>
            <div><p class="stat-label">${t('participation')}</p><p class="stat-value">${meetings.length > 0 ? '%92' : '%0'}</p></div>
          </div>
        </div>
        <div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem">${t('personal_info')}</h3>
          <form onsubmit="event.preventDefault();handleProfileSave()">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
              <div class="form-group"><label class="form-label">${t('name_label')}</label><div class="input-group"><span class="material-symbols-outlined input-icon">person</span><input type="text" class="input-field" id="profileName" value="${user.name || ''}"></div></div>
              <div class="form-group"><label class="form-label">${t('email_label')}</label><div class="input-group"><span class="material-symbols-outlined input-icon">mail</span><input type="email" class="input-field" id="profileEmail" value="${user.email || ''}" disabled></div></div>
            </div>
            <button type="submit" class="btn-outline" style="margin-top:1rem;padding:0.75rem 1.5rem" id="profileSaveBtn">${t('save')}</button>
          </form>
        </div>
      </div>
    </main>
  `;
}
async function handleProfileSave() {
  var btn = document.getElementById('profileSaveBtn');
  btn.disabled = true; btn.textContent = '...';
  try {
    var newName = document.getElementById('profileName').value;
    await updateUserProfile(AppState.user.uid, { name: newName });
    await AppState.user.updateProfile({ displayName: newName });
    AppState.profile.name = newName;
    showToast(t('profile_updated'));
    renderProfilePage();
  } catch(e) { showToast(t('err_generic'), 'error'); }
  btn.disabled = false; btn.textContent = t('save');
}
