window.uploadedFileText = null;

function clearUploadedFile() { window.uploadedFileText = null; document.getElementById('fileIndicator').style.display = 'none'; var ta = document.getElementById('meetingText'); ta.style.display = 'block'; ta.value = ''; ta.placeholder = ''; }

/* New Meeting Page */
function renderNewMeetingPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderSidebar('new')}
    ${renderTopbar()}
    <main class="main-content">
      <section style="margin-bottom:2rem">
        <h2 style="font-size:2.25rem;font-weight:800;margin-bottom:0.5rem">${t('new_title')}</h2>
        <p style="color:#94a3b8">${t('new_subtitle')}</p>
      </section>
      <div style="display:grid;grid-template-columns:1fr;gap:2rem">
        <div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem">
            <span class="material-symbols-outlined" style="color:var(--primary)">edit_note</span> ${t('meeting_info')}
          </h3>
          <div class="form-group"><label class="form-label">${t('meeting_title_label')}</label><div class="input-group"><span class="material-symbols-outlined input-icon">title</span><input type="text" class="input-field" id="meetingTitle" placeholder="${getCurrentLang()==='tr'?'\u00D6rn: Haftal\u0131k Durum Toplant\u0131s\u0131':'Ex: Weekly Status Meeting'}"></div></div>
          <div class="form-group"><label class="form-label">${t('meeting_date')}</label><div class="input-group"><span class="material-symbols-outlined input-icon">calendar_today</span><input type="date" class="input-field" id="meetingDate" value="${new Date().toLocaleDateString('en-CA')}" style="padding-left:3rem"></div></div>
        </div>
        <div class="glass-card" style="padding:2rem">
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:1.5rem;display:flex;align-items:center;gap:0.5rem">
            <span class="material-symbols-outlined" style="color:var(--secondary)">description</span> ${t('meeting_text')}
          </h3>
          <div class="form-group"><label class="form-label">${t('paste_transcript')}</label>
                      <div id="fileIndicator" style="display:none;align-items:center;justify-content:space-between;background:rgba(124,92,255,0.1);border:1px solid var(--primary);border-radius:8px;padding:1rem;margin-top:0.5rem;margin-bottom:0.5rem;">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <span class="material-symbols-outlined" style="color:var(--primary)">description</span>
              <span id="fileNameDisplay" style="font-weight:600;color:var(--text-main)"></span>
            </div>
            <button onclick="clearUploadedFile()" style="background:transparent;border:none;color:#ef4444;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0.5rem;border-radius:50%;transition:0.2s" onmouseover="this.style.background='rgba(239,68,68,0.1)'" onmouseout="this.style.background='transparent'">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <textarea id="meetingText" class="input-field" style="min-height:200px;padding:1rem;resize:vertical;font-size:0.875rem;line-height:1.6"></textarea>
          </div>
          <div style="display:flex;gap:1rem;margin-top:1rem;flex-wrap:wrap">
            <div class="glass-card" style="flex:1;min-width:200px;padding:1.5rem;text-align:center;cursor:pointer;border:2px dashed rgba(196,192,255,0.2);border-radius:var(--radius-xl)" onclick="document.getElementById('fileInput').click()">
              <span class="material-symbols-outlined" style="font-size:2.5rem;color:var(--primary);margin-bottom:0.5rem">upload_file</span>
              <p style="font-weight:600;margin-bottom:0.25rem">${t('upload_file')}</p><p style="font-size:0.75rem;color:#64748b">TXT, DOCX, PDF</p>
              <input type="file" id="fileInput" accept=".txt,.docx,.pdf" style="display:none" onchange="handleFileUpload(this)">
            </div>
            <div class="glass-card" style="flex:1;min-width:200px;padding:1.5rem;text-align:center;cursor:pointer;border:2px dashed rgba(196,192,255,0.2);border-radius:var(--radius-xl)" onclick="document.getElementById('audioInput').click()">
              <span class="material-symbols-outlined" style="font-size:2.5rem;color:var(--tertiary);margin-bottom:0.5rem">mic</span>
              <p style="font-weight:600;margin-bottom:0.25rem">${getCurrentLang()==='tr'?'Ses Dosyası':'Audio File'}</p><p style="font-size:0.75rem;color:#64748b">MP3, WAV, M4A</p>
              <input type="file" id="audioInput" accept=".mp3,.wav,.m4a,.ogg,.webm" style="display:none" onchange="handleAudioUpload(this)">
            </div>
          </div>
        </div>
        <div style="display:flex;gap:1rem;justify-content:flex-end">
          <button class="btn-outline" onclick="Router.navigate('dashboard')">${t('cancel')}</button>
          <button class="btn-primary-lg" id="summarizeBtn" onclick="handleSummarize()" style="display:flex;align-items:center;gap:0.5rem">
            <span class="material-symbols-outlined">auto_awesome</span> ${t('summarize')}
          </button>
        </div>
      </div>
      <div id="loadingOverlay" style="display:none;position:fixed;inset:0;background:rgba(18,18,29,0.8);z-index:100;align-items:center;justify-content:center;flex-direction:column;gap:1.5rem">
        <div class="spinner" style="width:3rem;height:3rem;border-width:4px"></div>
        <p style="font-size:1.125rem;font-weight:600">${t('ai_processing')}</p>
        <p style="color:#94a3b8;font-size:0.875rem">${t('processing_wait')}</p>
      </div>
    </main>
  `;
}


async function handleSummarize() {
  var title = document.getElementById('meetingTitle').value;
  var text = window.uploadedFileText || document.getElementById('meetingText').value;
  if (!title.trim()) { showToast(t('title_required'), 'error'); return; }
  if (!text.trim()) { showToast(t('text_required'), 'error'); return; }
  var overlay = document.getElementById('loadingOverlay');
  overlay.style.display = 'flex';
  try {
    var result = await summarizeMeeting(text);
    if (!result.ozet || result.ozet.includes('olu\u015Fturulamad\u0131') || result.ozet.includes('could not')) {
      overlay.style.display = 'none';
      return;
    }
    var meeting = await saveMeeting({ title: title, text: text, ...result, icon: 'video_camera_front', iconColor: 'var(--primary)' });
    overlay.style.display = 'none';
    Router.navigate('summary/' + meeting.id);
  } catch(e) {
    overlay.style.display = 'none';
    showToast(t('err_generic'), 'error');
  }
}

async function handleFileUpload(input) {
  var file = input.files[0]; if (!file) return;
  var lang = getCurrentLang();
  var textArea = document.getElementById('meetingText');
  var ext = file.name.split('.').pop().toLowerCase();

  textArea.placeholder = lang === 'tr' ? 'Dosya okunuyor, lütfen bekleyin...' : 'Reading file, please wait...';
  textArea.value = '';

  try {
    if (ext === 'txt') {
      var reader = new FileReader();
      reader.onload = function(e) { 
        setFileUI(file.name, e.target.result); 
        showToast(lang === 'tr' ? 'TXT dosyası yüklendi' : 'TXT file loaded');
      };
      reader.readAsText(file);
    } 
    else if (ext === 'docx') {
      var reader = new FileReader();
      reader.onload = function(e) {
        mammoth.extractRawText({arrayBuffer: e.target.result})
          .then(function(result) {
            setFileUI(file.name, result.value);
            showToast(lang === 'tr' ? 'DOCX dosyası okundu' : 'DOCX file loaded');
          }).catch(function(err) {
            console.error(err);
            textArea.value = '';
            showToast(lang === 'tr' ? 'DOCX okuma hatası' : 'Error reading DOCX', 'error');
          });
      };
      reader.readAsArrayBuffer(file);
    }
    else if (ext === 'pdf') {
      var reader = new FileReader();
      reader.onload = async function(e) {
        try {
          var typedarray = new Uint8Array(e.target.result);
          var pdf = await pdfjsLib.getDocument(typedarray).promise;
          var fullText = '';
          for (var i = 1; i <= pdf.numPages; i++) {
            var page = await pdf.getPage(i);
            var textContent = await page.getTextContent();
            var pageText = textContent.items.map(function(item) { return item.str; }).join(' ');
            fullText += pageText + '\n\n';
          }
          setFileUI(file.name, fullText);
          showToast(lang === 'tr' ? 'PDF dosyası okundu' : 'PDF file loaded');
        } catch(err) {
          console.error(err);
          textArea.value = '';
          showToast(lang === 'tr' ? 'PDF okuma hatası' : 'Error reading PDF', 'error');
        }
      };
      reader.readAsArrayBuffer(file);
    }
    else {
      showToast(lang === 'tr' ? 'Desteklenmeyen format' : 'Unsupported format', 'error');
    }
  } catch(err) {
    console.error(err);
    showToast(lang === 'tr' ? 'Okuma hatası' : 'Reading error', 'error');
  }
}

async function handleAudioUpload(input) {
  var file = input.files[0]; if (!file) return;
  var lang = getCurrentLang();
  var textArea = document.getElementById('meetingText');
  var btn = document.querySelector('button[onclick="handleSummarize()"]');
  
  if (file.size > 25 * 1024 * 1024) {
    showToast(lang === 'tr' ? 'Dosya boyutu 25MB\'tan küçük olmalı.' : 'File size must be less than 25MB.', 'error');
    return;
  }

  textArea.placeholder = lang === 'tr' ? 'Ses dosyası işleniyor (Whisper API)... Lütfen bekleyin.' : 'Processing audio file (Whisper API)... Please wait.';
  textArea.value = '';
  if (btn) btn.disabled = true;

  try {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('model', 'whisper-large-v3-turbo');
    formData.append('prompt', 'Bu bir MeetSum AI toplantı kaydıdır. Konuşmacılar MeetSum AI projesini tartışıyor. Özel isimler: MeetSum AI, responsive, token, Firebase, Firestore, Whisper, Groq.');

    var response = await fetch(GROQ_AUDIO_URL || 'https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + GROQ_API_KEY
      },
      body: formData
    });

    if (!response.ok) {
      var err = await response.json().catch(function(){return {};});
      console.error(err);
      throw new Error('API Error: ' + response.status);
    }

    var data = await response.json();
    setFileUI(file.name, data.text || '');
    showToast(lang === 'tr' ? 'Transkript oluşturuldu!' : 'Transcript generated!');
    
  } catch(err) {
    console.error('Audio upload error:', err);
    textArea.placeholder = '';
    showToast(lang === 'tr' ? 'Ses işleme hatası oluştu.' : 'Audio processing error.', 'error');
  } finally {
    if (btn) btn.disabled = false;
  }
}
function setFileUI(fileName, text) {
  window.uploadedFileText = text;
  document.getElementById('meetingText').style.display = 'none';
  document.getElementById('fileIndicator').style.display = 'flex';
  document.getElementById('fileNameDisplay').innerText = fileName;
}