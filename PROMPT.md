# EverEx Design System 적용 프롬프트

> 이 파일을 Claude Code에 전달하거나, 아래 프롬프트를 복사하여 사용하세요.

---

## 사용법

### 방법 1: CLAUDE.md에 추가

대상 프로젝트의 `CLAUDE.md`에 다음을 추가합니다:

```markdown
## Design System

이 프로젝트는 EverEx Backoffice Design System을 따릅니다.
디자인 시스템 레퍼런스: `./design-system/` 폴더를 참조하세요.
```

### 방법 2: 직접 프롬프트

아래 프롬프트를 복사하여 Claude Code에 전달합니다.

---

## 프롬프트

```
이 프로젝트에 EverEx Backoffice Design System을 적용해줘.

## 디자인 시스템 위치

`./design-system/` 폴더에 전체 레퍼런스가 있어. 아래 순서대로 진행해줘.

## 서비스 간 고정 스펙 (변경 금지)

다음 항목은 모든 EverEx 백오피스 서비스에서 반드시 동일해야 해:

1. **헤더 높이: 49px** — `py-2.5` + content + `border-b`. 절대 변경하지 마.
2. **로그인 페이지: `design-system/layout/LoginPage.tsx` 레이아웃 그대로 사용** — props(`serviceName`, `serviceDescription`)만 변경해. 레이아웃 구조(split panel, grid pattern, Google 버튼 위치 등)는 건드리지 마.
3. **Primary 컬러: `173° 55% 36%` (틸)**
4. **폰트: Pretendard Variable**

## 적용 순서

### 1단계: 현황 파악
- 프로젝트의 `globals.css`, `tailwind.config.ts`, `package.json`을 읽어서 현재 상태를 파악해줘
- shadcn/ui가 이미 설치되어 있는지, 어떤 컴포넌트를 쓰고 있는지 확인해줘
- 현재 사용 중인 폰트, primary 컬러, 토스트 라이브러리를 확인해줘

### 2단계: 토큰 교체
- `design-system/tokens/globals.css`를 참조해서 프로젝트의 `globals.css` CSS 변수를 교체해줘
  - 기존 CSS 변수 섹션만 교체하고, 프로젝트 고유 스타일은 유지해줘
  - 스크롤바 스타일과 애니메이션 키프레임도 추가해줘
- `design-system/tokens/tailwind.config.reference.ts`를 참조해서 `tailwind.config.ts`를 업데이트해줘
  - fontFamily.sans에 Pretendard 폰트 스택 추가
  - borderRadius가 CSS 변수 기반인지 확인
- `cn()` 유틸리티가 없으면 추가해줘

### 3단계: 로고 파일 복사
- `design-system/assets/everex-logo.png`과 `everex-logo-icon.png`을 프로젝트의 `public/` 폴더에 복사해줘
- 이 로고는 모든 EverEx 서비스 공통이야. 서비스 자체 로고로 교체하지 마.

### 4단계: 폰트 설치
- layout.tsx (또는 _document.tsx)에 Pretendard CDN 링크를 추가해줘:
  ```
  https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css
  ```
- 기존 Inter 폰트 import가 있으면 제거해줘

### 5단계: 컴포넌트 오버라이드
- `design-system/components/` 폴더의 컴포넌트들을 참조해서 기존 컴포넌트를 업데이트해줘
- 최소한 이 3개는 반드시 적용:
  - `button.tsx`: `active:scale-[0.97]` + `transition-all duration-150`
  - `card.tsx`: `shadow-sm` + `transition-shadow duration-200`
  - `sonner.tsx`: 토큰 기반 스타일 + `position="top-center"`
- 나머지는 프로젝트에서 사용 중인 컴포넌트만 선택적으로 적용해줘

### 6단계: 하드코딩 색상 교체
- 프로젝트 전체에서 다음 패턴을 검색하고 시맨틱 토큰으로 교체해줘:
  - `bg-white` → `bg-card` 또는 `bg-background`
  - `bg-slate-*`, `bg-gray-*` → `bg-muted`, `bg-secondary`, `bg-background`
  - `text-slate-*`, `text-gray-*` → `text-foreground`, `text-muted-foreground`
  - `border-slate-*`, `border-gray-*` → `border-border`
  - `bg-gradient-*` / `from-*` / `to-*` → `bg-background` (그라디언트 제거)
- 변경 전후를 요약해서 보여줘

### 7단계: 레이아웃 패턴 적용
- **헤더**: sticky + backdrop blur 패턴 + **높이 49px 고정** (`py-2.5`):
  ```
  sticky top-0 z-10
  border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80
  container mx-auto px-4 py-2.5 flex justify-between items-center
  ```
- **로그인 페이지**: `design-system/layout/LoginPage.tsx`를 그대로 복사하고, props만 서비스에 맞게 변경해줘:
  ```tsx
  <LoginPage
    serviceName="서비스명"
    serviceDescription="서비스 설명"
    onGoogleLogin={handleGoogleLogin}
    headerActions={<><ThemeToggle /><LanguageSwitcher /></>}
  />
  ```
- 페이지 메인 콘텐츠에 `animate-fade-in-up` 클래스를 추가해줘
- `design-system/layout/` 폴더를 참조하되, 프로젝트의 기존 구조를 존중해줘

### 8단계: 검증
- 변경사항을 요약해줘
- `design-system/migration/checklist.md`의 19단계 중 완료된 항목을 체크해줘
- 빌드가 깨지지 않는지 확인해줘

## 주의사항

- 프로젝트 고유 로직(인증, 라우팅, i18n 등)은 건드리지 마
- 기존에 없는 패키지를 설치해야 하면 먼저 확인해줘
- `// [CUSTOMIZE]` 주석이 있는 부분은 프로젝트에 맞게 조정해줘
- 한 번에 모든 것을 바꾸지 말고, 단계별로 진행하면서 중간 결과를 보여줘
```

---

## 축약 버전 (간단한 프로젝트용)

```
./design-system/ 폴더의 EverEx 디자인 시스템을 이 프로젝트에 적용해줘.
migration/checklist.md의 19단계를 순서대로 따라가면서 적용하고,
각 단계마다 변경사항을 요약해줘.
로그인 페이지는 design-system/layout/LoginPage.tsx를 그대로 사용하고,
헤더 높이는 49px로 고정해줘.
```
