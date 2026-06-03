/* Dashboard Page */
async function renderDashboardPage() {
  const app = document.getElementById('app');
  const name = AppState.profile?.name || AppState.user?.displayName || 'User';
  const meetings = getMeetings();
  const totalActions = meetings.reduce((sum, m) => sum + (m.eylem_maddeleri?.length || 0), 0);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7*24*60*60*1000);
  const thisWeek = meetings.filter(m => m.createdAt?.toDate ? m.createdAt.toDate() >= weekAgo : false).length;

  app.innerHTML = `
    ${renderSidebar('dashboard')}
    ${renderTopbar()}
    <main class="main-content">
      <section style="margin-bottom:2.5rem">
        <h2 style="font-size:2.25rem;font-weight:800;letter-spacing:-0.025em;margin-bottom:0.5rem">${t('dash_greeting')}, ${name} \u{1F44B}</h2>
        <p style="color:#94a3b8;font-size:1.125rem">${t('dash_subtitle')}</p>
      </section>
      <div class="bento-grid">
        <div style="display:flex;flex-direction:column;gap:1.5rem">
          <div class="glass-card stat-card"><div class="stat-accent" style="background:var(--secondary)"></div><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><p class="stat-label">${t('stat_total')}</p><h3 class="stat-value">${meetings.length}</h3></div><span class="material-symbols-outlined" style="color:var(--secondary);opacity:.5">auto_awesome</span></div></div>
          <div class="glass-card stat-card"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><p class="stat-label">${t('stat_week')}</p><h3 class="stat-value">${thisWeek}</h3></div><span class="material-symbols-outlined" style="color:var(--primary);opacity:.5">calendar_today</span></div></div>
          <div class="glass-card stat-card"><div style="display:flex;justify-content:space-between;align-items:flex-start"><div><p class="stat-label">${t('stat_actions')}</p><h3 class="stat-value">${totalActions}</h3></div><span class="material-symbols-outlined" style="color:var(--tertiary);opacity:.5">task_alt</span></div></div>
        </div>
        <div class="cta-card">
          <div class="cta-card-glow"></div>
          <span class="material-symbols-outlined cta-card-icon">psychology</span>
          <h2 style="position:relative;z-index:1">${t('cta_title')}</h2>
          <p style="position:relative;z-index:1">${t('cta_desc')}</p>
          <button class="btn-white" style="align-self:flex-start;display:flex;align-items:center;gap:0.75rem;position:relative;z-index:1" onclick="Router.navigate('new')">
            <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1">add_circle</span> ${t('cta_btn')}
          </button>
        </div>
      </div>
      <section>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h3 style="font-size:1.25rem;font-weight:700">${t('recent')}</h3>
          <button style="font-size:0.875rem;font-weight:500;color:var(--primary)" onclick="Router.navigate('meetings')">${t('view_all')}</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:1rem">
          ${meetings.length === 0 ? '<div class="glass-card" style="padding:3rem;text-align:center"><span class="material-symbols-outlined" style="font-size:3rem;color:var(--outline);margin-bottom:1rem">folder_open</span><p style="color:#94a3b8">' + t('empty_title') + '</p></div>' :
          meetings.slice(0, 3).map(m => `
            <div class="meeting-card" onclick="Router.navigate('summary/${m.id}')">
              <div class="meeting-icon" style="color:${m.iconColor || 'var(--primary)'}"><span class="material-symbols-outlined">${m.icon || 'video_camera_front'}</span></div>
              <div style="flex:1"><h4 style="font-weight:700">${m.title}</h4><p style="font-size:0.875rem;color:#64748b;margin-top:0.25rem">${m.date}${m.duration ? ' \u2022 ' + m.duration : ''}</p></div>
              <div style="display:flex;align-items:center;gap:1rem">
                <span class="badge badge-secondary">${m.status || t('completed')}</span>
                <span class="material-symbols-outlined" style="color:#94a3b8">chevron_right</span>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </main>
    ${renderFloatingAssistant()}
  `;
}
