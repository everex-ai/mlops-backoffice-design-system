# Assets

EverEx 공통 로고 파일입니다. 모든 백오피스 서비스의 `public/` 폴더에 복사하세요.

## 파일 목록

| 파일 | 용도 | 사용처 |
|------|------|--------|
| `everex-logo.png` | EverEx 전체 로고 | 로그인 페이지 brand panel, 모바일 헤더 |
| `everex-logo-icon.png` | EverEx 아이콘 로고 | 헤더 로고, 로고 스피너 mask |

## 적용 방법

```bash
cp design-system/assets/everex-logo.png your-project/public/
cp design-system/assets/everex-logo-icon.png your-project/public/
```

## 주의사항

- 이 로고 파일들은 **모든 서비스에서 동일하게 사용**합니다
- 서비스 자체 로고로 교체하지 마세요
- 다크 모드에서는 `dark:brightness-0 dark:invert` 클래스로 반전 처리됩니다
