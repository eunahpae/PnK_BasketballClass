/* =============================================
   SCHEDULE.JS
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initScheduleTabs();
  renderScheduleTable();
  renderLessonCoaches();
  renderCampList();
});

function initScheduleTabs() {
  const tabs = document.querySelectorAll('.tab-item');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.style.display = 'none');
      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.style.display = '';
    });
  });
  // URL 해시로 탭 이동
  if (location.hash === '#lesson') document.querySelector('[data-tab="lesson"]')?.click();
  if (location.hash === '#camp') document.querySelector('[data-tab="camp"]')?.click();
}

const CLASS_DATA = [
  { id: 1, name: '초등 기초반 A', days: '화·목', time: '16:00~17:30', grade: '초등 1~3년', capacity: 12, enrolled: 12, fee: '80,000원', curriculum: ['기본 드리블', '패스 & 캐치', '레이업 슛', '기초 수비 자세', '미니게임'], supplies: '운동화, 물통, 수건' },
  { id: 2, name: '초등 기초반 B', days: '월·수', time: '16:00~17:30', grade: '초등 1~3년', capacity: 12, enrolled: 9, fee: '80,000원', curriculum: ['기본 드리블', '패스 & 캐치', '레이업 슛', '기초 수비 자세', '미니게임'], supplies: '운동화, 물통, 수건' },
  { id: 3, name: '초등 심화반', days: '화·목·토', time: '17:30~19:00', grade: '초등 4~6년', capacity: 10, enrolled: 8, fee: '100,000원', curriculum: ['포지션별 훈련', '지역 방어', '공격 패턴', '속공 훈련', '팀 전술'], supplies: '운동화, 물통, 무릎보호대' },
  { id: 4, name: '중등반', days: '월·수·금', time: '18:00~20:00', grade: '중학생', capacity: 10, enrolled: 10, fee: '120,000원', curriculum: ['전술 이해', '스크린 플레이', '트랩 수비', '체력 훈련', '리그 참가'], supplies: '운동화, 물통, 무릎보호대, 농구공' },
  { id: 5, name: '고등반', days: '화·목', time: '20:00~22:00', grade: '고등학생', capacity: 8, enrolled: 5, fee: '130,000원', curriculum: ['고강도 체력', '실전 전술', '대회 준비', '1:1 개인기', '비디오 분석'], supplies: '운동화, 물통, 스포츠 테이프' },
];

const COACHES_DATA = [
  { name: '배경한 코치', role: '헤드 코치 · 가드 전문', emoji: '🧑', career: 'KBL 1군 출신 / 지도 경력 10년', available: '월·화·수·목·금 10:00~15:00' },
  { name: '김보미 코치', role: '포워드 · 체력 트레이닝', emoji: '👩', career: '前 실업팀 선수 / 유소년 전문', available: '화·목·토 13:00~18:00' },
  { name: '배지안 코치', role: '센터 · 수비 전문', emoji: '🧔', career: 'KBL 2군 출신 / 수비 집중 지도', available: '월·수·금 14:00~19:00' },
];

const CAMP_DATA = [
  { title: '2026 봄 농구 캠프', date: '2026-04-05 ~ 04-07', deadline: '2026-03-28', cost: '50,000원', target: '초등 4년 ~ 중등', dday: 17 },
  { title: '포지션 심화 특강 (가드편)', date: '2026-03-22 (토)', deadline: '2026-03-19', cost: '20,000원', target: '초등 5년 이상', dday: 8 },
  { title: '지역 유소년 농구대회 참가', date: '2026-04-19 (토)', deadline: '2026-04-10', cost: '무료', target: '중등반 이상', dday: 30 },
];

function renderScheduleTable() {
  const table = document.getElementById('scheduleTable');
  if (!table) return;
  table.innerHTML = `
    <thead>
      <tr>
        <th>반 이름</th>
        <th>요일</th>
        <th>시간</th>
        <th>대상</th>
        <th>정원</th>
        <th>잔여석</th>
        <th>수강료</th>
        <th>신청</th>
      </tr>
    </thead>
    <tbody>
      ${CLASS_DATA.map(c => {
        const remain = c.capacity - c.enrolled;
        const full = remain <= 0;
        return `
          <tr>
            <td class="class-name">
              ${c.name}
              <br><button class="detail-btn" onclick="openClassModal(${c.id})">상세보기</button>
            </td>
            <td>${c.days}</td>
            <td>${c.time}</td>
            <td>${c.grade}</td>
            <td>${c.capacity}명</td>
            <td class="${full ? 'seats-full' : 'seats-ok'}">
              ${full ? '<span class="tag-closed">마감</span>' : `${remain}명`}
            </td>
            <td>${c.fee}</td>
            <td>
              ${full
                ? `<a href="../apply/?wait=${c.id}" class="btn btn-outline btn-sm">대기 신청</a>`
                : `<a href="../apply/?class=${c.id}" class="btn btn-primary btn-sm">신청하기</a>`
              }
            </td>
          </tr>
        `;
      }).join('')}
    </tbody>
  `;
}

function openClassModal(id) {
  const cls = CLASS_DATA.find(c => c.id === id);
  if (!cls) return;
  document.getElementById('modalTitle').textContent = cls.name;
  const remain = cls.capacity - cls.enrolled;
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-detail-row"><span class="label">수업 요일</span><span class="value">${cls.days}</span></div>
    <div class="modal-detail-row"><span class="label">수업 시간</span><span class="value">${cls.time}</span></div>
    <div class="modal-detail-row"><span class="label">대상 학년</span><span class="value">${cls.grade}</span></div>
    <div class="modal-detail-row"><span class="label">정원</span><span class="value">${cls.capacity}명 (잔여 ${remain}명)</span></div>
    <div class="modal-detail-row"><span class="label">수강료</span><span class="value">${cls.fee} / 월</span></div>
    <div class="modal-detail-row"><span class="label">준비물</span><span class="value">${cls.supplies}</span></div>
    <hr class="divider">
    <p style="font-size:14px;font-weight:700;color:var(--navy);margin-bottom:8px;">📋 커리큘럼</p>
    <ul class="curriculum-list">
      ${cls.curriculum.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `;
  const applyBtn = document.getElementById('modalApplyBtn');
  if (remain <= 0) {
    applyBtn.textContent = '대기자 등록하기';
    applyBtn.href = `../apply/?wait=${id}`;
  } else {
    applyBtn.textContent = '이 반 신청하기';
    applyBtn.href = `../apply/?class=${id}`;
  }
  Utils.openModal('classModal');
}

function renderLessonCoaches() {
  const el = document.getElementById('lessonCoachGrid');
  if (!el) return;
  el.innerHTML = COACHES_DATA.map(c => `
    <div class="lesson-card">
      <div class="lesson-avatar">${c.emoji}</div>
      <div class="lesson-name">${c.name}</div>
      <div class="lesson-role">${c.role}</div>
      <p class="lesson-career">${c.career}</p>
      <div class="lesson-available">🕐 가능 시간: ${c.available}</div>
      <a href="../apply/?type=lesson&coach=${encodeURIComponent(c.name)}" class="btn btn-primary btn-full btn-sm">레슨 신청하기</a>
    </div>
  `).join('');
}

function renderCampList() {
  const el = document.getElementById('campList');
  if (!el) return;
  el.innerHTML = CAMP_DATA.map(camp => `
    <div class="camp-card">
      <div class="camp-dday">
        <span class="d">D-</span>
        <span class="num">${camp.dday}</span>
      </div>
      <div class="camp-info">
        <h3>${camp.title}</h3>
        <p>📅 ${camp.date} &nbsp;|&nbsp; 👥 ${camp.target} &nbsp;|&nbsp; 💰 ${camp.cost}</p>
        <p style="margin-top:4px;color:var(--danger);font-size:12px;">⏰ 신청 마감: ${camp.deadline}</p>
      </div>
      <div class="camp-actions">
        <a href="../apply/?type=camp&name=${encodeURIComponent(camp.title)}" class="btn btn-primary btn-sm">신청하기</a>
      </div>
    </div>
  `).join('');
}
