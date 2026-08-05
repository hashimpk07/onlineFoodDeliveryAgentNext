# Next.js Collocation Pattern Violations Report

Generated on: 6/12/2026, 12:25:41 PM

Found **3** violation(s).

## 📁 Role: 3PL (1 violations)

| Type | Path | Description |
| --- | --- | --- |
| 📁 Directory | `src/app/[locale]/(main)/dashboard/3pl/accounts/captain-commission/captain-commission-details` | Directory does not start with '_' but does not contain any page.tsx or route.ts in its subtree. It should be prefixed with '_' (e.g. '_components') if it is a private folder. |

## 📁 Role: GENERAL (2 violations)

| Type | Path | Description |
| --- | --- | --- |
| 📄 File | `src/app/[locale]/(main)/dashboard/general/logs_expires/expires/test-api.ts` | File does not start with '_' and is not a reserved Next.js routing file (like page.tsx, layout.tsx, etc.). It should be moved into a private folder (like '_components' or '_hooks') or prefixed with '_'. |
| 📁 Directory | `src/app/[locale]/(main)/dashboard/general/test` | Directory does not start with '_' but does not contain any page.tsx or route.ts in its subtree. It should be prefixed with '_' (e.g. '_components') if it is a private folder. |

