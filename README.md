# 🏀 전문농구교실 홈페이지

> 초등~고등학생 대상 농구교실 운영을 위한 수강 신청 및 정보 제공 웹사이트

---

## 📌 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 서비스명 | 전문농구교실 (브랜드명 확정 예정) |
| 대상 | 초등학생 ~ 고등학생 및 학부모 |
| 목적 | 수강 신청 온라인화, 수업 정보 제공, 학부모 소통 채널 구축 |
| 관리자 | 원장님 1인 직접 운영 (비개발자 친화적 구성) |
| 기술 스택 | WordPress + Elementor |

---

## 🗂 페이지 구성 (사이트맵)

```
/                        ← 메인 (홈)
├── /class               ← 수업 안내 (정규반 · 개인레슨 · 특강)
├── /apply               ← 수강 신청 (잔여석 실시간 · 대기자 등록)
├── /gallery             ← 수업 갤러리
├── /notice              ← 공지사항
├── /qna                 ← 문의 게시판
├── /basketball-info     ← 농구 정보 게시판 (블로그형)
└── /admin               ← 관리자 페이지 (비공개)
```

---

## ✨ 주요 기능

### 수강 신청
- 온라인 신청서 작성 (이름·연락처·학년·희망 반)
- 정원/잔여석 실시간 표시
- 정원 초과 시 대기자 자동 등록 및 순번 안내
- 개인레슨 별도 신청 폼 (코치 선택 + 희망 일정)

### 카카오 알림톡 자동 발송
- 수강 신청 완료 확인
- 대기자 자리 발생 알림
- 수업 전날 리마인드
- 결석 처리 학부모 알림
- 문의 답변 완료 알림
- 휴강·일정 변경 안내

### 농구 정보 게시판
- 카테고리: 드릴/훈련 · 규칙/용어 · 포지션 전술 · NBA/KBL · 대회 정보 · 장비 추천
- 유튜브 영상 임베드 지원
- SEO 최적화 (Yoast SEO)
- 예약 발행 기능

### 관리자 기능
- 수강생 명단 및 신청 현황 관리
- 출결 체크 → 학부모 자동 알림
- 시간표·공지·갤러리 직접 수정
- 월별 수강 현황 대시보드

---

## 🚀 개발 로드맵

### Phase 1 — 1차 오픈 (4~6주)
- [x] 메인 페이지
- [x] 수업 안내 (시간표·개인레슨·특강)
- [x] 수강 신청 폼
- [x] 갤러리
- [x] 공지사항
- [x] 문의 게시판
- [x] 농구 정보 게시판
- [x] 관리자 페이지 기본

### Phase 2 — 자동화 (3~4주)
- [ ] 잔여석 실시간 연동
- [ ] 대기자 카카오 알림톡 자동화
- [ ] 출결 관리 고도화
- [ ] SEO 고도화

### Phase 3 — 결제 (4~6주)
- [ ] 온라인 결제 (카드 · 계좌이체 · 카카오페이)
- [ ] 수강료 자동 청구
- [ ] 환불 처리

---

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| CMS | WordPress + Elementor |
| 신청 폼 | Gravity Forms 또는 WPForms |
| 회원 관리 | MemberPress |
| 갤러리 | Envira Gallery |
| 알림톡 | 채널톡 또는 NHN Cloud 알림톡 API |
| SEO | Yoast SEO |
| 호스팅 | 카페24 또는 가비아 |

---

## 📁 디렉토리 구조

```
/
├── wp-content/
│   ├── themes/
│   │   └── basketball-academy/   ← 커스텀 테마
│   └── plugins/
│       ├── gravity-forms/
│       ├── memberpress/
│       └── envira-gallery/
├── docs/
│   └── 농구교실_홈페이지_기획서.docx
└── README.md
```

---

## ⚙️ 설치 및 실행

```bash
# 1. 리포지토리 클론
git clone https://github.com/your-username/basketball-academy.git

# 2. WordPress 설치 후 wp-content 교체
# (로컬 환경: Local by Flywheel 또는 XAMPP 권장)

# 3. 필수 플러그인 설치 (plugins/ 디렉토리 참고)

# 4. .env 설정 (DB, 카카오 API 키 등)
cp .env.example .env
```

> 상세 설치 가이드는 [`docs/setup.md`](docs/setup.md) 참고

---

## 🔑 환경 변수

```env
# WordPress DB
DB_NAME=basketball_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost

# 카카오 알림톡 API
KAKAO_API_KEY=your_kakao_api_key
KAKAO_SENDER_KEY=your_sender_key

# 결제 (Phase 3)
PG_MID=your_merchant_id
PG_SECRET_KEY=your_secret_key
```

---

## 📋 미정 사항 (확정 후 업데이트 필요)

- [ ] 교실 브랜드명 및 로고
- [ ] 시설 규모 및 코트 수
- [ ] 정규반 시간표 (요일·시간·정원)
- [ ] 수강료 정보
- [ ] 참고 디자인 사이트 URL

---

## 📞 문의

운영 관련 문의는 카카오 채널 또는 홈페이지 문의 게시판을 이용해 주세요.

---

