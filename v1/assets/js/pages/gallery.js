/* =============================================
   GALLERY.JS
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initGalleryTabs();
  renderGallery('all');
});

const GALLERY_DATA = [
  { id:1, cat:'regular', emoji:'🏀', label:'정규수업', caption:'초등 기초반 드리블 훈련', date:'2026-03-08' },
  { id:2, cat:'regular', emoji:'⛹️', label:'정규수업', caption:'중등반 전술 수업', date:'2026-03-07' },
  { id:3, cat:'special', emoji:'🏆', label:'특강', caption:'슛 교정 특강', date:'2026-03-05' },
  { id:4, cat:'tournament', emoji:'🥇', label:'대회', caption:'지역 유소년 대회 우승', date:'2026-02-28' },
  { id:5, cat:'regular', emoji:'🧑‍🤝‍🧑', label:'정규수업', caption:'팀 스크리미지', date:'2026-02-25' },
  { id:6, cat:'etc', emoji:'📸', label:'기타', caption:'수료식 단체 사진', date:'2026-02-20' },
  { id:7, cat:'regular', emoji:'🏃', label:'정규수업', caption:'고등반 체력 훈련', date:'2026-02-18' },
  { id:8, cat:'special', emoji:'🎯', label:'특강', caption:'레이업 집중 특강', date:'2026-02-15' },
  { id:9, cat:'tournament', emoji:'🎖️', label:'대회', caption:'KBA 유소년 리그', date:'2026-02-10' },
  { id:10, cat:'regular', emoji:'👟', label:'정규수업', caption:'초등 심화반 수비훈련', date:'2026-02-07' },
  { id:11, cat:'etc', emoji:'🎉', label:'기타', caption:'신학기 환영회', date:'2026-02-01' },
  { id:12, cat:'regular', emoji:'🤾', label:'정규수업', caption:'속공 드릴 연습', date:'2026-01-28' },
];

let currentIdx = 0;
let filteredData = [...GALLERY_DATA];

function initGalleryTabs() {
  document.querySelectorAll('#galleryTabs .tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#galleryTabs .tab-item').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGallery(tab.dataset.cat);
    });
  });
}

function renderGallery(cat) {
  filteredData = cat === 'all' ? [...GALLERY_DATA] : GALLERY_DATA.filter(g => g.cat === cat);
  const el = document.getElementById('galleryGrid');
  if (!el) return;
  if (!filteredData.length) {
    el.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">📷</div><p>등록된 사진이 없습니다.</p></div>`;
    return;
  }
  el.innerHTML = filteredData.map((g, i) => `
    <div class="g-item" onclick="openLightbox(${i})" style="background:hsl(${i*30},50%,92%)">
      <span>${g.emoji}</span>
      <div class="g-overlay">
        <span class="g-label">${g.label}</span>
        <span class="g-caption">${g.caption}</span>
      </div>
    </div>
  `).join('');
}

function openLightbox(idx) {
  currentIdx = idx;
  showLightboxItem();
  Utils.openModal('lightbox');
}

function showLightboxItem() {
  const g = filteredData[currentIdx];
  document.getElementById('lightboxImg').innerHTML = `<span>${g.emoji}</span>`;
  document.getElementById('lightboxCaption').innerHTML = `<strong>${g.caption}</strong><br><span style="color:var(--gray-500);font-size:12px">${g.label} · ${Utils.formatDate(g.date)}</span>`;
}

function lightboxNav(dir) {
  currentIdx = (currentIdx + dir + filteredData.length) % filteredData.length;
  showLightboxItem();
}

function closeLightbox(e) {
  if (e.target.id === 'lightbox') Utils.closeModal('lightbox');
}
