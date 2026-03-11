/* =============================================
   COMMON.JS — 헤더/푸터 인젝션, 플로팅, 공통 유틸
   ============================================= */

// ── 현재 페이지 경로 감지 ──
const currentPath = window.location.pathname;

function getActivePath() {
  if (currentPath.includes('/schedule')) return 'schedule';
  if (currentPath.includes('/apply')) return 'apply';
  if (currentPath.includes('/gallery')) return 'gallery';
  if (currentPath.includes('/notice')) return 'notice';
  if (currentPath.includes('/inquiry')) return 'inquiry';
  if (currentPath.includes('/basketball-info')) return 'basketball-info';
  if (currentPath.includes('/admin')) return 'admin';
  return 'home';
}

// ── 루트 경로 계산 ──
function getRootPath() {
  const parts = currentPath.split('/').filter(Boolean);

  if (currentPath.includes('/admin')) return '../';

  // 홈(루트)이면 ./
  if (parts.length === 0) return './';

  // 하위 페이지면 ../
  return '../';
}

const ROOT = getRootPath();
const ACTIVE = getActivePath();

// ── 헤더 HTML ──
function renderHeader() {
  const navItems = [
    { key: 'schedule', label: '수업 안내', href: `${ROOT}schedule/` },
    { key: 'apply', label: '수강 신청', href: `${ROOT}apply/` },
    { key: 'gallery', label: '갤러리', href: `${ROOT}gallery/` },
    { key: 'notice', label: '공지사항', href: `${ROOT}notice/` },
    { key: 'inquiry', label: '문의 게시판', href: `${ROOT}inquiry/` },
    { key: 'basketball-info', label: '농구 정보', href: `${ROOT}basketball-info/` },
  ];

  const navHTML = navItems.map(item => `
    <a href="${item.href}" class="${ACTIVE === item.key ? 'active' : ''}">${item.label}</a>
  `).join('');

  const mobileNavHTML = navItems.map(item => `
    <a href="${item.href}" class="${ACTIVE === item.key ? 'active' : ''}">${item.label}</a>
  `).join('');

  return `
    <header id="site-header">
      <div class="header-inner">
        <a href="${ROOT}index.html" class="header-logo">
          <div class="logo-icon">🏀</div>
          배경한과 김보미의 농구교실
        </a>
        <nav class="header-nav">${navHTML}</nav>
        <a href="${ROOT}apply/" class="btn btn-primary btn-sm header-cta">수강 신청</a>
        <button class="header-menu-btn" id="menuBtn" aria-label="메뉴 열기">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <div class="mobile-menu" id="mobileMenu">
      ${mobileNavHTML}
      <div class="mobile-cta">
        <a href="${ROOT}apply/" class="btn btn-primary btn-full">수강 신청하기</a>
      </div>
    </div>
  `;
}

// ── 푸터 HTML ──
function renderFooter() {
  return `
    <footer id="site-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">🏀 전문농구교실</div>
            <p>초등~고등 수강생을 위한<br>전문 농구 교육 프로그램을 운영합니다.<br>문의: 010-0000-0000</p>
          </div>
          <div class="footer-col">
            <h4>빠른 메뉴</h4>
            <ul>
              <li><a href="${ROOT}schedule/">수업 안내</a></li>
              <li><a href="${ROOT}apply/">수강 신청</a></li>
              <li><a href="${ROOT}gallery/">갤러리</a></li>
              <li><a href="${ROOT}notice/">공지사항</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>고객 지원</h4>
            <ul>
              <li><a href="${ROOT}inquiry/">1:1 문의</a></li>
              <li><a href="${ROOT}basketball-info/">농구 정보</a></li>
              <li><a href="${ROOT}admin/">관리자</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 전문농구교실. All rights reserved. | 개인정보처리방침</p>
          <div class="footer-sns">
            <a href="#" title="인스타그램">📸</a>
            <a href="#" title="유튜브">▶️</a>
            <a href="#" title="카카오채널">💬</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ── 플로팅 버튼 HTML ──
function renderFloating() {
  return `
    <div class="floating-wrap">
      <a href="https://open.kakao.com/" target="_blank" class="floating-btn floating-kakao" title="카카오 오픈채팅">💬</a>
      <a href="tel:010-0000-0000" class="floating-btn floating-call" title="전화 연결">📞</a>
      <button class="floating-btn floating-top" id="scrollTopBtn" title="맨 위로">▲</button>
    </div>
  `;
}

// ── DOM 인젝션 ──
document.addEventListener('DOMContentLoaded', () => {
  // 헤더 삽입
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) headerPlaceholder.outerHTML = renderHeader();

  // 푸터 삽입
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = renderFooter();

  // 플로팅 삽입
  document.body.insertAdjacentHTML('beforeend', renderFloating());

  // 햄버거 메뉴
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // 링크 클릭 시 닫기
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 맨 위로 버튼
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
      scrollTopBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
      scrollTopBtn.style.pointerEvents = window.scrollY > 300 ? 'all' : 'none';
    });
    scrollTopBtn.style.opacity = '0';
  }
});

// ── 공통 유틸 함수 ──
const Utils = {
  // 모달 열기/닫기
  openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('open');
    document.body.style.overflow = '';
  },
  // 탭 초기화
  initTabs(tabSelector, contentSelector) {
    const tabs = document.querySelectorAll(tabSelector);
    const contents = document.querySelectorAll(contentSelector);
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.style.display = 'none');
        tab.classList.add('active');
        if (contents[i]) contents[i].style.display = '';
      });
    });
    if (tabs[0]) tabs[0].click();
  },
  // 날짜 포맷
  formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
  },
  // 숫자 콤마
  formatNumber(n) {
    return Number(n).toLocaleString('ko-KR');
  },
  // 토스트 메시지
  toast(message, type = 'success') {
    const existing = document.getElementById('toast-msg');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.textContent = message;
    const colors = { success: '#28A745', error: '#DC3545', info: '#17A2B8' };
    Object.assign(toast.style, {
      position: 'fixed', bottom: '90px', left: '50%',
      transform: 'translateX(-50%)',
      background: colors[type] || colors.success,
      color: '#fff', padding: '10px 22px',
      borderRadius: '99px', fontSize: '14px', fontWeight: '600',
      zIndex: '9999', boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      opacity: '0', transition: 'opacity 0.2s'
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 10);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
  }
};
