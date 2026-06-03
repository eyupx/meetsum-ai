/* Meetings List Page */
function renderMeetingsPage() {
  const app = document.getElementById('app');
  const meetings = getMeetings();
  app.innerHTML = `
    ${renderSidebar('meetings')}
    ${renderTopbar()}
    <main class="main-content">
      <section style="margin-bottom:2rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem">
        <div>
          <h2 style="font-size:2.25rem;font-weight:800;margin-bottom:0.5rem">${t('meetings_title')}</h2>
          <p style="color:#94a3b8">${meetings.length} ${t('meeting_summaries')}</p>
        </div>
        <div style="display:flex;gap:0.75rem;align-items:center">
          <button class="btn-outline" onclick="deleteAllMeetings()" style="display:flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem;border-color:rgba(239,68,68,0.4);color:#ef4444" onmouseover="this.style.background='rgba(239,68,68,0.1)'" onmouseout="this.style.background='transparent'">
            <span class="material-symbols-outlined">delete_sweep</span> ${getCurrentLang()==='tr'?'Hepsini Sil':'Delete All'}
          </button>
          <button class="btn-outline" onclick="Router.navigate('new')" style="display:flex;align-items:center;gap:0.5rem;padding:0.75rem 1.5rem">
          <span class="material-symbols-outlined">add</span> ${t('new_summary')}
        </button>
        </div>
      </section>
      <div style="margin-bottom:1.5rem">
        <div class="input-group">
          <span class="material-symbols-outlined input-icon">search</span>
          <input type="text" class="input-field" id="meetingSearch" placeholder="${getCurrentLang()==='tr'?'Toplantı ara...':'Search meetings...'}" oninput="filterMeetings(this.value)">
        </div>
      </div>
      <div id="meetingsList" style="display:flex;flex-direction:column;gap:1rem">
        ${meetings.length === 0 ? `
          <div class="glass-card" style="padding:4rem;text-align:center">
            <span class="material-symbols-outlined" style="font-size:4rem;color:var(--outline);margin-bottom:1rem">folder_open</span>
            <h3 style="font-weight:700;margin-bottom:0.5rem">${t('empty_title')}</h3>
            <p style="color:#94a3b8;margin-bottom:1.5rem">${t('empty_desc')}</p>
            <button class="btn-outline" onclick="Router.navigate('new')">${t('empty_btn')}</button>
          </div>
        ` : meetings.map(m => `
          <div class="meeting-card glass-card" style="padding:1.5rem">
            <div style="flex:1;cursor:pointer" onclick="Router.navigate('summary/${m.id}')">
              <div style="display:flex;align-items:center;gap:1rem">
                <div class="meeting-icon" style="color:${m.iconColor || 'var(--primary)'}"><span class="material-symbols-outlined">${m.icon || 'video_camera_front'}</span></div>
                <div><h4 style="font-weight:700">${m.title}</h4><p style="font-size:0.875rem;color:#64748b;margin-top:0.25rem">${m.date || ''}</p></div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:0.75rem">
              <span class="badge badge-secondary">${m.status || t('completed')}</span>
              <button onclick="event.stopPropagation();handleDeleteMeeting('${m.id}')" style="color:#94a3b8;padding:0.25rem" title="${t('delete_btn')}"><span class="material-symbols-outlined" style="font-size:20px">delete</span></button>
            </div>
          </div>
        `).join('')}
      </div>
      </div>
    </main>
  `;
}
async function handleDeleteMeeting(id) {
  if (!confirm(t('delete_confirm'))) return;
  await deleteMeeting(id);
  showToast(t('meeting_deleted'));
  renderMeetingsPage();
}

function filterMeetings(query) {
  var cards = document.querySelectorAll('.meeting-card');
  var q = query.toLowerCase().trim();
  cards.forEach(function(card) {
    var title = card.querySelector('h4')?.textContent?.toLowerCase() || '';
    var date = card.querySelector('p')?.textContent?.toLowerCase() || '';
    card.style.display = (title.includes(q) || date.includes(q) || !q) ? '' : 'none';
  });
}

function deleteAllMeetings() {
  var lang = getCurrentLang();
  var meetings = getMeetings();
  if (meetings.length === 0) {
    showToast(lang === 'tr' ? 'Silinecek toplantı yok.' : 'No meetings to delete.', 'error');
    return;
  }
  var msg = lang === 'tr' 
    ? 'Tüm toplantıları (' + meetings.length + ' adet) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!'
    : 'Are you sure you want to delete all meetings (' + meetings.length + ')? This action cannot be undone!';
  if (confirm(msg)) {
    var user = firebase.auth().currentUser;
    if (user) {
      var db = firebase.firestore();
      var batch = db.batch();
      var promises = meetings.map(function(m) {
        return db.collection('users').doc(user.uid).collection('meetings').doc(m.id).delete();
      });
      Promise.all(promises).then(function() {
        showToast(lang === 'tr' ? 'Tüm toplantılar silindi!' : 'All meetings deleted!');
        AppState.meetings = []; renderMeetingsPage();
      }).catch(function(err) {
        console.error('Delete all error:', err);
        showToast(lang === 'tr' ? 'Silme sırasında hata oluştu.' : 'Error while deleting.', 'error');
      });
    }
  }
}