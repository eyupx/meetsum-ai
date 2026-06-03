/* Summary Result Page */
async function renderSummaryPage(params) {
  const app = document.getElementById('app');
  const meetingId = params?.[0];
  var meeting = getMeetingById(meetingId);
  if (!meeting && AppState.user) { meeting = await getMeetingFromFirestore(AppState.user.uid, meetingId); }
  if (!meeting) { Router.navigate('meetings'); return; }
  var eylemler = meeting.eylem_maddeleri || [];
  var kararlar = meeting.kararlar || [];
  var konular = meeting.anahtar_konular || [];
  var ozet = meeting.ozet || meeting.summary || '';

  app.innerHTML = `
    ${renderSidebar('meetings')}
    ${renderTopbar()}
    <main class="main-content">
      <div style="margin-bottom:2rem">
        <button style="color:#94a3b8;display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem;font-size:0.875rem" onclick="Router.navigate('meetings')">
          <span class="material-symbols-outlined" style="font-size:18px">arrow_back</span> ${t('back_meetings')}
        </button>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem">
          <div>
            <h2 style="font-size:2.25rem;font-weight:800;margin-bottom:0.5rem">${meeting.title}</h2>
            <p style="color:#94a3b8">${meeting.date || ''}</p>
          </div>
          <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
            <button class="btn-outline" style="padding:0.75rem 1.25rem;display:flex;align-items:center;gap:0.5rem" onclick="exportPDF()"><span class="material-symbols-outlined" style="font-size:18px">picture_as_pdf</span> ${t('pdf_download')}</button>
            <button class="btn-outline" style="padding:0.75rem 1.25rem;display:flex;align-items:center;gap:0.5rem" onclick="copyToClipboard()"><span class="material-symbols-outlined" style="font-size:18px">content_copy</span> ${t('copy')}</button>
            <button class="btn-outline" style="padding:0.75rem 1.25rem;display:flex;align-items:center;gap:0.5rem" onclick="shareSummary()"><span class="material-symbols-outlined" style="font-size:18px">share</span> ${t('share')}</button>
            <button class="btn-outline" style="padding:0.75rem 1.25rem;display:flex;align-items:center;gap:0.5rem;border-color:rgba(239,68,68,0.4);color:#ef4444" onmouseover="this.style.background='rgba(239,68,68,0.1)'" onmouseout="this.style.background='transparent'" onclick="deleteMeetingFromSummary('${meetingId}')"><span class="material-symbols-outlined" style="font-size:18px">delete</span> ${getCurrentLang()==='tr'?'Sil':'Delete'}</button>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:2rem">
        ${konular.map(k => '<span class="badge badge-primary">' + k + '</span>').join('')}
      </div>
      <div style="display:grid;gap:2rem">
        <div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem"><span class="material-symbols-outlined" style="color:var(--primary)">summarize</span> ${t('meeting_summary')}</h3>
          <p style="color:var(--on-surface-variant);line-height:1.8;font-size:0.9375rem">${ozet}</p>
        </div>
        ${eylemler.length > 0 ? `<div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem"><span class="material-symbols-outlined" style="color:var(--secondary)">checklist</span> ${t('action_items_title')}</h3>
          <div style="display:flex;flex-direction:column;gap:1rem">
            ${eylemler.map(e => '<div style="display:flex;align-items:flex-start;gap:1rem;padding:1rem;background:rgba(65,238,194,0.05);border-radius:var(--radius-lg);border-left:3px solid var(--secondary)"><span class="material-symbols-outlined" style="color:var(--secondary);font-size:20px;margin-top:2px">task_alt</span><div style="flex:1"><p style="font-weight:600">' + e.gorev + '</p><div style="display:flex;gap:1rem;margin-top:0.5rem;font-size:0.8125rem;color:#94a3b8"><span>\u{1F464} ' + e.sorumlu + '</span><span>\u{1F4C5} ' + e.tarih + '</span></div></div></div>').join('')}
          </div>
        </div>` : ''}
        ${kararlar.length > 0 ? `<div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem"><span class="material-symbols-outlined" style="color:var(--tertiary)">gavel</span> ${t('decisions')}</h3>
          <ul style="display:flex;flex-direction:column;gap:0.75rem">
            ${kararlar.map(k => '<li style="display:flex;align-items:flex-start;gap:0.75rem;color:var(--on-surface-variant)"><span class="material-symbols-outlined" style="color:var(--tertiary);font-size:18px;margin-top:3px">check_circle</span><span>' + k + '</span></li>').join('')}
          </ul>
        </div>` : ''}
      </div>
    </main>
  `;
}
function copyToClipboard() { var txt = document.querySelector('.main-content')?.innerText || ''; navigator.clipboard?.writeText(txt).then(()=>showToast(t('copied'))).catch(()=>showToast(t('err_generic'),'error')); }



async function deleteMeetingFromSummary(id) {
  var lang = getCurrentLang();
  var msg = lang === 'tr' ? 'Bu toplantıyı silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this meeting?';
  if (confirm(msg)) {
    var user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).collection('meetings').doc(id).delete().then(function() {
        showToast(lang === 'tr' ? 'Toplantı silindi!' : 'Meeting deleted!');
        AppState.meetings = AppState.meetings.filter(function(m) { return m.id !== id; });
        Router.navigate('meetings');
      }).catch(function(err) {
        console.error('Delete error:', err);
        showToast(lang === 'tr' ? 'Silme sırasında hata oluştu.' : 'Error while deleting.', 'error');
      });
    }
  }
}
function getMeetingSummaryText() {
  var hash = window.location.hash;
  var meetingId = hash.split('/')[1];
  var meeting = getMeetingById(meetingId);
  if (!meeting) return '';
  var lang = getCurrentLang();
  var lines = [];
  lines.push('='.repeat(50));
  lines.push(meeting.title || '');
  lines.push('='.repeat(50));
  lines.push((lang === 'tr' ? 'Tarih: ' : 'Date: ') + (meeting.date || ''));
  lines.push('');

  // Özet
  lines.push(lang === 'tr' ? '📋 TOPLANTI ÖZETİ' : '📋 MEETING SUMMARY');
  lines.push('-'.repeat(40));
  lines.push(meeting.ozet || meeting.summary || '');
  lines.push('');

  // Eylem Maddeleri
  var eylemler = meeting.eylem_maddeleri || [];
  if (eylemler.length > 0) {
    lines.push(lang === 'tr' ? '✅ EYLEM MADDELERİ' : '✅ ACTION ITEMS');
    lines.push('-'.repeat(40));
    eylemler.forEach(function(e, i) {
      lines.push((i+1) + '. ' + (e.gorev || e.task || ''));
      lines.push('   ' + (lang === 'tr' ? 'Sorumlu: ' : 'Responsible: ') + (e.sorumlu || e.responsible || '-'));
      lines.push('   ' + (lang === 'tr' ? 'Tarih: ' : 'Deadline: ') + (e.tarih || e.deadline || '-'));
    });
    lines.push('');
  }

  // Kararlar
  var kararlar = meeting.kararlar || [];
  if (kararlar.length > 0) {
    lines.push(lang === 'tr' ? '🎯 ALINAN KARARLAR' : '🎯 DECISIONS');
    lines.push('-'.repeat(40));
    kararlar.forEach(function(k, i) { lines.push((i+1) + '. ' + k); });
    lines.push('');
  }

  // Anahtar Konular
  var konular = meeting.anahtar_konular || [];
  if (konular.length > 0) {
    lines.push(lang === 'tr' ? '🏷️ ANAHTAR KONULAR' : '🏷️ KEY TOPICS');
    lines.push('-'.repeat(40));
    lines.push(konular.join(', '));
    lines.push('');
  }

  lines.push('='.repeat(50));
  lines.push(lang === 'tr' ? 'MeetSum AI ile oluşturuldu' : 'Generated by MeetSum AI');
  return lines.join('\n');
}

function exportPDF() {
  var text = getMeetingSummaryText();
  if (!text) { showToast(t('err_generic'), 'error'); return; }
  var hash = window.location.hash;
  var meetingId = hash.split('/')[1];
  var meeting = getMeetingById(meetingId);
  var filename = (meeting?.title || 'meetsum-ai-ozet').replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s-]/g, '').replace(/\s+/g, '_');

  // Create printable HTML for PDF
  var printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>' + (meeting?.title || 'MeetSum AI') + '</title>');
  printWindow.document.write('<style>body{font-family:Segoe UI,Arial,sans-serif;padding:40px;max-width:800px;margin:0 auto;color:#1a1a2e;line-height:1.6}h1{color:#7C5CFF;border-bottom:3px solid #7C5CFF;padding-bottom:10px}h2{color:#333;margin-top:24px;font-size:1.1rem}p{margin:8px 0}.meta{color:#666;font-size:0.9rem}.item{background:#f8f7ff;padding:12px 16px;border-radius:8px;margin:8px 0;border-left:3px solid #7C5CFF}.tags span{display:inline-block;background:#7C5CFF;color:white;padding:4px 12px;border-radius:20px;font-size:0.8rem;margin:4px}.footer{margin-top:40px;text-align:center;color:#999;font-size:0.8rem;border-top:1px solid #eee;padding-top:16px}</style></head><body>');
  printWindow.document.write('<h1>' + (meeting?.title || '') + '</h1>');
  printWindow.document.write('<p class="meta">' + (meeting?.date || '') + '</p>');
  
  // Anahtar Konular
  var konular = meeting?.anahtar_konular || [];
  if (konular.length) {
    printWindow.document.write('<div class="tags">');
    konular.forEach(function(k) { printWindow.document.write('<span>' + k + '</span>'); });
    printWindow.document.write('</div>');
  }
  
  // Özet
  var lang = getCurrentLang();
  printWindow.document.write('<h2>' + (lang==='tr'?'📋 Toplantı Özeti':'📋 Meeting Summary') + '</h2>');
  printWindow.document.write('<p>' + (meeting?.ozet || meeting?.summary || '') + '</p>');
  
  // Eylem Maddeleri
  var eylemler = meeting?.eylem_maddeleri || [];
  if (eylemler.length) {
    printWindow.document.write('<h2>' + (lang==='tr'?'✅ Eylem Maddeleri':'✅ Action Items') + '</h2>');
    eylemler.forEach(function(e) {
      printWindow.document.write('<div class="item"><strong>' + (e.gorev||'') + '</strong><br><small>' + (lang==='tr'?'Sorumlu: ':'Responsible: ') + (e.sorumlu||'-') + ' | ' + (lang==='tr'?'Tarih: ':'Deadline: ') + (e.tarih||'-') + '</small></div>');
    });
  }
  
  // Kararlar
  var kararlar = meeting?.kararlar || [];
  if (kararlar.length) {
    printWindow.document.write('<h2>' + (lang==='tr'?'🎯 Alınan Kararlar':'🎯 Decisions') + '</h2>');
    kararlar.forEach(function(k) { printWindow.document.write('<div class="item">' + k + '</div>'); });
  }
  
  printWindow.document.write('<div class="footer">MeetSum AI ile oluşturuldu</div>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  setTimeout(function() { printWindow.print(); }, 500);
  showToast(lang==='tr'?'PDF yazdırma penceresi açıldı':'Print dialog opened');
}

function copyToClipboard() {
  var text = getMeetingSummaryText();
  if (!text) { showToast(t('err_generic'), 'error'); return; }
  navigator.clipboard.writeText(text).then(function() {
    showToast(getCurrentLang()==='tr' ? 'Özet panoya kopyalandı!' : 'Summary copied to clipboard!');
  }).catch(function() {
    showToast(t('err_generic'), 'error');
  });
}

function shareSummary() {
  var text = getMeetingSummaryText();
  if (!text) { showToast(t('err_generic'), 'error'); return; }
  var hash = window.location.hash;
  var meetingId = hash.split('/')[1];
  var meeting = getMeetingById(meetingId);
  if (navigator.share) {
    navigator.share({
      title: meeting?.title || 'MeetSum AI',
      text: text
    }).catch(function(){});
  } else {
    navigator.clipboard.writeText(text).then(function() {
      showToast(getCurrentLang()==='tr' ? 'Özet panoya kopyalandı!' : 'Summary copied to clipboard!');
    });
  }
}