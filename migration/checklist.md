# Migration Checklist

기존 Next.js + shadcn/ui 프로젝트를 EverEx 디자인 시스템으로 마이그레이션하기 위한 19단계 체크리스트입니다.

## Phase 1: Foundation (토큰 교체)

- [ ] **1. globals.css 교체**
  - `tokens/globals.css`를 프로젝트의 `src/app/globals.css`에 복사
  - 기존 CSS 변수가 모두 EverEx 토큰으로 대체되었는지 확인

- [ ] **2. Tailwind 설정 업데이트**
  - `tokens/tailwind.config.reference.ts` 참조하여 `tailwind.config.ts` 수정
  - `fontFamily.sans`에 Pretendard 추가
  - `borderRadius` 섹션이 CSS 변수 기반인지 확인

- [ ] **3. Pretendard 폰트 설치**
  - CDN 방식: `<link>` 태그를 layout.tsx/html에 추가
  - 또는 로컬 방식: woff2 파일 다운로드 + `next/font/local`
  - `foundations/02-typography.md` 참조

- [ ] **4. cn() 유틸리티 확인**
  - `src/lib/utils.ts`에 `cn()` 함수가 있는지 확인
  - 없다면 `tokens/utils.ts` 복사

- [ ] **5. next-themes 설정**
  - `npm install next-themes`
  - `ThemeProvider`를 layout에 추가 (`attribute="class" defaultTheme="system"`)

## Phase 2: Components (컴포넌트 오버라이드)

- [ ] **6. Button 오버라이드**
  - `components/button.tsx`로 교체
  - `active:scale-[0.97]` + `transition-all duration-150` 확인

- [ ] **7. Card 오버라이드**
  - `components/card.tsx`로 교체
  - `shadow-sm` + `transition-shadow duration-200` 확인

- [ ] **8. Toast (Sonner) 설정**
  - `components/sonner.tsx`로 교체
  - layout.tsx에서 `<Toaster position="top-center" />` 설정
  - `richColors` prop 제거 (토큰 기반 스타일 사용)

- [ ] **9. Spinner 추가**
  - `components/spinner.tsx` 복사
  - 로고 이미지 파일을 `public/`에 추가
  - `globals.css`의 `.logo-spinner` mask-image 경로 확인

- [ ] **10. Animated 프리미티브 추가** (선택)
  - `npm install framer-motion`
  - `components/animated.tsx` 복사

## Phase 3: Layout (레이아웃 구조)

- [ ] **11. Header 컴포넌트 적용**
  - `layout/Header.tsx` 참조하여 헤더 구현
  - `sticky top-0 z-10` + backdrop blur 패턴 확인

- [ ] **12. PageLayout 적용**
  - `layout/PageLayout.tsx` 참조하여 표준 페이지 래퍼 구현
  - `animate-fade-in-up` 클래스 확인

- [ ] **13. ThemeToggle 추가**
  - `layout/ThemeToggle.tsx` 복사 (또는 참조)
  - 헤더 actions 영역에 배치

- [ ] **14. AdminLayout 적용** (관리자 페이지가 있는 경우)
  - `layout/AdminLayout.tsx` 참조하여 구현
  - `navItems` 배열을 서비스 라우트에 맞게 수정

## Phase 4: Cleanup (정리)

- [ ] **15. 하드코딩 색상 제거**
  - `bg-slate-*`, `bg-gray-*`, `text-slate-*` 등 검색
  - 시맨틱 토큰으로 대체 (`bg-background`, `text-foreground`, etc.)

- [ ] **16. 그라디언트 배경 제거**
  - `bg-gradient-*`, `from-*`, `to-*` 검색
  - 플랫 토큰 (`bg-background`)으로 대체

- [ ] **17. Inter 폰트 참조 제거**
  - `Inter` 관련 import/config 삭제
  - `next/font/google`에서 Inter import 제거

- [ ] **18. 스크롤바 하드코딩 색상 확인**
  - 커스텀 스크롤바 스타일이 있다면 토큰 기반으로 교체
  - `globals.css`의 스크롤바 섹션이 이미 처리

## Phase 5: Verification (검증)

- [ ] **19. 시각적 검증**
  - 라이트 모드에서 primary 버튼이 틸 색상인지 확인
  - 다크 모드 전환이 정상 동작하는지 확인
  - 카드가 배경과 시각적으로 구분되는지 확인
  - 스크롤바가 토큰 색상을 따르는지 확인
  - 버튼 클릭 시 scale 효과가 작동하는지 확인
  - 포커스 링이 틸 색상인지 확인
