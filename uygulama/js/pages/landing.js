/* Landing Page */
function renderLandingPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderNavbar('home')}
    
    <section class="hero">
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      <div style="position:relative;z-index:10;max-width:var(--max-width);margin:0 auto">
        <span class="hero-badge">${t('hero_badge')}</span>
        <h1>${t('hero_title_1')} <span class="text-gradient-primary">${t('hero_title_2')}</span></h1>
        <p>${t('hero_desc')}</p>
        <div style="display:flex;justify-content:center">
          <button class="btn-primary-lg" onclick="Router.navigate('register')">${t('hero_cta')}</button>
        </div>
      </div>
    </section>

    <section class="section section-alt" id="features">
      <div style="max-width:var(--max-width);margin:0 auto">
        <div class="section-title">${t('features')}</div>
        <div class="section-subtitle">${t('features_subtitle')}</div>
        <div class="features-grid">
          <div class="glass-card feature-card ai-glow-edge premium-glow">
            <div class="feature-icon" style="background:rgba(196,192,255,0.1)">
              <span class="material-symbols-outlined" style="color:var(--primary);font-size:1.875rem">auto_awesome</span>
            </div>
            <h3>${t('feature_summary_title')}</h3>
            <p>${t('feature_summary_desc')}</p>
          </div>
          <div class="glass-card feature-card ai-glow-edge premium-glow">
            <div class="feature-icon" style="background:rgba(65,238,194,0.1)">
              <span class="material-symbols-outlined" style="color:var(--secondary);font-size:1.875rem">checklist</span>
            </div>
            <h3>${t('feature_actions_title')}</h3>
            <p>${t('feature_actions_desc')}</p>
          </div>
          <div class="glass-card feature-card ai-glow-edge premium-glow">
            <div class="feature-icon" style="background:rgba(135,129,255,0.1)">
              <span class="material-symbols-outlined" style="color:var(--primary-container);font-size:1.875rem">insights</span>
            </div>
            <h3>${t('feature_decisions_title')}</h3>
            <p>${t('feature_decisions_desc')}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="editorial">
        <div class="editorial-content">
          <h2>${t('editorial_title_1')}<br><span style="color:var(--secondary)">${t('editorial_title_2')}</span></h2>
          <p>${t('editorial_desc')}</p>
          <div class="editorial-stats">
            <div>
              <div class="editorial-stat-value">Zoom, Meet, Teams</div>
              <div class="editorial-stat-label">${t("editorial_stat_formats")}</div>
            </div>
            <div class="editorial-divider"></div>
            <div>
              <div class="editorial-stat-value">${t('editorial_stat_secure')}</div>
              <div class="editorial-stat-label">${t('editorial_stat_security')}</div>
            </div>
          </div>
        </div>
        <div class="editorial-media">
          <div class="glass-card editorial-image-wrapper premium-glow">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS9OTNxCg_GpURUv8iJczNuSnshqYsfRNiHseV9MScAFEeKh62Hwp7mBuaW7EJDuYQY2sbYIrpD22LgbwwwI1RwunNz3OVEbqb62kglgTEU5sHg9blZJGLyWp6ntKmRgcflzBIdhQpNtx3NRxxNMC0MybemeHeCZtH-dHW3IJF0BHAI4Pmnm0LHX6c70c-WIRDJz9zX5mpJ-lCy22hHqcIOuUW9-mRQjwedrk-1__3Mg1T4Wk4-WCkP4qL0FPXP4FPnnv8UrL2JuDH" alt="Data Analysis">
          </div>
          <div class="editorial-floating glass-card">
            <span style="font-size:0.75rem;font-weight:700;color:var(--secondary);text-transform:uppercase;letter-spacing:0.1em">${t('supported_formats')}</span>
            <p style="font-size:0.875rem;color:white;font-weight:500;margin-top:0.5rem">MP3, WAV, M4A, WEBM, OGG, TXT, DOCX, PDF</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bottom-cta">
      <div class="bottom-cta-bg"></div>
      <div class="bottom-cta-inner glass-card-3xl glass-card premium-glow" style="border:1px solid rgba(255,255,255,0.05)">
        <h2>${t('bottom_cta_title')}</h2>
        <p>${t('bottom_cta_desc')}</p>
        <button class="btn-primary-lg" onclick="Router.navigate('register')">${t('bottom_cta_btn')}</button>
      </div>
    </section>

    ${renderFooter()}
  `;
}