# Habit Tracker PWA - Setup TODO

## Completed

- [x] Downgrade Tailwind CSS v4 → v3, fix `@tailwind` directives
- [x] Fix PostCSS config for Tailwind v3 (`tailwindcss` + `autoprefixer`)
- [x] Fix `next.config.ts`: remove deprecated `swcMinify`/webpack, add `turbopack: {}`
- [x] Create `next.config.ts` (TypeScript config)
- [x] Downgrade React 19 → 18.2.0 for testing-library compatibility
- [x] Create testing infrastructure (`vitest.config.ts`, `src/test/setup.ts`, `playwright.config.ts`)
- [x] Add test scripts to `package.json`
- [x] Create `src/middleware.ts` for auth redirects
- [x] Create `src/hooks/useAuth.ts` and `src/hooks/useHabits.ts`
- [x] Create `src/lib/storage.ts` with SSR-safe `typeof window` guards
- [x] Create `src/lib/slug.ts` and fix double-hyphen bug
- [x] Create `src/lib/streaks.ts` and `src/lib/validators.ts`
- [x] Create integration tests (`auth-flow.test.tsx`, `habit-form.test.tsx`)
- [x] Create E2E tests (`tests/e2e/app.spec.ts`)
- [x] Fix vitest coverage config (`threshold` → `thresholds`)
- [x] Verify build passes: `npm run build` ✅
- [x] Verify unit tests pass: `npm run test:unit` ✅ (22/22 tests passed)

## Test Results

| Command | Result |
|---------|--------|
| `npm run build` | ✅ Success |
| `npm run test:unit` | ✅ 22/22 tests passed |
| `npm run test:e2e` | ⏳ Run `npx playwright install` then `npm run test:e2e` |
