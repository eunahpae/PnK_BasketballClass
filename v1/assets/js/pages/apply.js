/* =============================================
   APPLY.JS
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initApplyTabs();
  handleURLParams();
  initForms();
});

function initApplyTabs() {
  const tabs = document.querySelectorAll('.tab-item');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.style.display = 'none');
      tab.classList.add('active');
      document.getElementById('tab-' + tab.dataset.tab).style.display = '';
    });
  });
}

function handleURLParams() {
  const params = new URLSearchParams(location.search);
  const classId = params.get('class');
  const wait = params.get('wait');
  const type = params.get('type');
  const coachName = params.get('coach');

  if (wait) {
    document.querySelector('[data-tab="waitlist"]').click();
    const sel = document.getElementById('waitClass');
    if (sel) for (let opt of sel.options) { if (opt.value === wait) { opt.selected = true; break; } }
  } else if (type === 'lesson') {
    document.querySelector('[data-tab="lesson"]').click();
    if (coachName) {
      const sel = document.getElementById('lessonCoach');
      if (sel) for (let opt of sel.options) { if (opt.text.includes(decodeURIComponent(coachName))) { opt.selected = true; break; } }
    }
  } else if (classId) {
    const sel = document.getElementById('applyClass');
    if (sel) for (let opt of sel.options) { if (opt.value === classId) { opt.selected = true; break; } }
  }
}

function initForms() {
  // 정규반 신청
  document.getElementById('applyForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('applyName').value.trim();
    const phone = document.getElementById('applyPhone').value.trim();
    const grade = document.getElementById('applyGrade').value;
    const cls = document.getElementById('applyClass').value;
    const agree = document.getElementById('privacyAgree').checked;
    if (!name || !phone || !grade || !cls) return Utils.toast('필수 항목을 모두 입력해 주세요.', 'error');
    if (!agree) return Utils.toast('개인정보 동의가 필요합니다.', 'error');
    showSuccess('수강 신청 완료!', `${name}님의 수강 신청이 완료되었습니다.\n입력하신 연락처(${phone})로 카카오 알림톡을 발송했습니다.\n담당자가 확인 후 최종 안내드리겠습니다.`);
    e.target.reset();
  });

  // 개인레슨 신청
  document.getElementById('lessonForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('lessonName').value.trim();
    const phone = document.getElementById('lessonPhone').value.trim();
    const coach = document.getElementById('lessonCoach').value;
    const date = document.getElementById('lessonDate').value;
    const time = document.getElementById('lessonTime').value;
    const agree = document.getElementById('lessonPrivacy').checked;
    if (!name || !phone || !coach || !date || !time) return Utils.toast('필수 항목을 모두 입력해 주세요.', 'error');
    if (!agree) return Utils.toast('개인정보 동의가 필요합니다.', 'error');
    showSuccess('레슨 신청 완료!', `${name}님의 개인레슨 신청이 완료되었습니다.\n코치님 일정 확인 후 연락드리겠습니다.`);
    e.target.reset();
  });

  // 대기자 등록
  document.getElementById('waitlistForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('waitName').value.trim();
    const phone = document.getElementById('waitPhone').value.trim();
    const cls = document.getElementById('waitClass').value;
    const agree = document.getElementById('waitPrivacy').checked;
    if (!name || !phone || !cls) return Utils.toast('필수 항목을 모두 입력해 주세요.', 'error');
    if (!agree) return Utils.toast('개인정보 동의가 필요합니다.', 'error');
    showSuccess('대기자 등록 완료!', `${name}님의 대기자 등록이 완료되었습니다.\n현재 대기 순번: 3번\n자리가 생기면 카카오 알림톡으로 안내드립니다.`);
    e.target.reset();
  });
}

function showSuccess(title, msg) {
  document.getElementById('successTitle').textContent = title;
  document.getElementById('successMsg').innerHTML = msg.replace(/\n/g, '<br>');
  Utils.openModal('successModal');
}
