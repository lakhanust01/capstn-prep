# Playwright Test Automation

## Local execution

Install dependencies:

```bash
npm install
npx playwright install
```

Run the tests:

```bash
npm test
```

## Environment variables

Create a local environment file named `.env.local` (or copy `.env.example`) and set values for the following variables:

```bash
BASE_URL=http://localhost:5173/
USERNAME=alice@shopkart.test
PASSWORD=alice-dev-pass
API_TOKEN=
```

For CI, provide the same values as GitHub Secrets:

- `BASE_URL`
- `USERNAME`
- `PASSWORD`
- `API_TOKEN`

## GitHub Actions CI

This repository includes a GitHub Actions workflow at `.github/workflows/playwright.yml`.

On every push, pull request, or manual run, the workflow will:

- install dependencies with `npm ci`
- install Playwright browsers with `npx playwright install --with-deps`
- run `npm test`
- upload Playwright artifacts including the HTML report, test results, screenshots, videos, traces, and logs

## Artifacts generated

The following artifacts are preserved after each run:

- `playwright-report/`
- `test-results/`
- `screenshots/`
- `videos/`
- `traces/`
- log files
