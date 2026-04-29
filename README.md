# Habit Tracker PWA – Stage 3

## 🔗 Live App
https://habit-tracker-liart-sigma.vercel.app/

## 📌 What this project is about

This is a mobile-first Habit Tracker built as a Progressive Web App (PWA).

The goal wasn’t just to “build something nice” — it was to follow a strict technical specification and make sure everything behaves exactly as required.

You can:
- Sign up and log in
- Create, edit, and delete habits
- Mark habits as complete for today
- Track your current streak
- Reload the app and keep your data
- Install it like a mobile app
- Use it offline without crashing

---

## ⚙️ How to run the project locally

### 1. Clone the repo
```bash
git clone https://github.com/D-devela/habit-tracker-pwa.git
cd habit-tracker-pwa
2. Install dependencies
npm install
3. Start development server
npm run dev
4. Open in browser

http://localhost:3000


---



```markdown


Run all tests:
```bash
npm test

Run unit tests with coverage:

npm run test:unit

Run integration tests:

npm run test:integration

Run end-to-end tests:

npm run test:e2e

---

```markdown


Run:
```bash
npm run test:unit

This generates a coverage report in the coverage/ folder.

Current coverage: 80%+


---


```markdown


- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- localStorage (for persistence)
- Vitest (unit tests)
- React Testing Library (integration tests)
- Playwright (E2E tests)



##  Assumptions

- No backend is used (localStorage only)
- Passwords are stored as plain text (safe for local demo)
- Only daily habits are supported
- Data is stored per device (no syncing)


- tests/unit/ → utility function tests
- tests/integration/ → component behavior tests
- tests/e2e/ → full user flow tests

