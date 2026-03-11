/* =============================================
   NOTICE.JS
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initNoticeTabs();
  renderNotices('all');
});

const NOTICE_DATA = [
  { id:1, cat:'holiday', title:'3월 15일(토) 전 반 휴강 안내', date:'2026-03-10', views:128, pinned:true, body:'3월 15일(토)은 시설 점검으로 인해 전 반 휴강입니다.\n보강 일정은 추후 별도 안내드리겠습니다.\n양해 부탁드립니다.' },
  { id:2, cat:'event', title:'2026 봄 농구 캠프 참가자 모집', date:'2026-03-08', views:95, pinned:true, body:'2026 봄 농구 캠프를 진행합니다.\n일정: 2026년 4월 5일~7일\n대상: 초등 4년~중학생\n비용: 50,000원\n신청 마감: 3월 28일' },
  { id:3, cat:'change', title:'초등 A반 3월 넷째 주 시간 변경 안내', date:'2026-03-05', views:62, pinned:false, body:'초등 기초반 A의 3월 넷째 주(3/24, 3/26) 수업 시간이 변경됩니다.\n기존: 16:00~17:30 → 변경: 17:00~18:30\n사정이 안 되시면 미리 연락 주세요.' },
  { id:4, cat:'event', title:'지역 유소년 농구대회 참가 신청 안내', date:'2026-03-01', views:44, pinned:false, body:'4월 19일 지역 유소년 대회에 참가할 수강생을 모집합니다.\n대상: 중등반 이상\n신청 마감: 4월 10일\n참가비: 무료' },
  { id:5, cat:'holiday', title:'설 연휴 휴강 안내 (1/28~1/30)', date:'2026-01-25', views:210, pinned:false, body:'설 연휴 기간(1월 28일~30일) 휴강입니다.\n보강은 2월 첫째 주에 진행합니다.' },
];

function initNoticeTabs() {
  document.querySelectorAll('#noticeTabs .tab-item').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#noticeTabs .tab-item').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderNotices(tab.dataset.cat);
    });
  });
}

function renderNotices(cat) {
  const data = cat === 'all' ? NOTICE_DATA : NOTICE_DATA.filter(n => n.cat === cat);
  const el = document.getElementById('noticeBoard');
  if (!el) return;
  if (!data.length) { el.innerHTML = `<div class="empty-state"><div class="empty-icon">📢</div><p>등록된 공지사항이 없습니다.</p></div>`; return; }
  const catMap = { holiday:'휴강 안내', event:'행사', change:'일정 변경' };
  const badgeMap = { holiday:'danger', event:'primary', change:'navy' };
  el.innerHTML = data.map((n, i) => `
    <div class="notice-item ${n.pinned ? 'pinned' : ''}" onclick="openNotice(${n.id})">
      <span class="num">${n.pinned ? '<span class="pin-icon">📌</span>' : data.length - i}</span>
      <span class="title">
        <span class="badge badge-${badgeMap[n.cat]}" style="margin-right:8px">${catMap[n.cat]}</span>
        ${n.title}
      </span>
      <span class="views">👁 ${Utils.formatNumber(n.views)}</span>
      <span class="date">${Utils.formatDate(n.date)}</span>
    </div>
  `).join('');
}

function openNotice(id) {
  const n = NOTICE_DATA.find(x => x.id === id);
  if (!n) return;
  const catMap = { holiday:'휴강 안내', event:'행사', change:'일정 변경' };
  document.getElementById('noticeModalTitle').textContent = n.title;
  document.getElementById('noticeDetailMeta').innerHTML = `
    <span>📂 ${catMap[n.cat]}</span>
    <span>📅 ${Utils.formatDate(n.date)}</span>
    <span>👁 조회 ${Utils.formatNumber(n.views)}</span>
  `;
  document.getElementById('noticeModalBody').innerHTML = n.body.replace(/\n/g, '<br>');
  Utils.openModal('noticeModal');
}       