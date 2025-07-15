Дата виконання аудиту: 14.06.2024

На момент проведення аудиту, фронтенд-застосунок music-track мав наступні залежності:

```json
"name": "music-track",
"version": "0.1.0",
"private": true,
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next build && next start",
  "lint": "next lint"
},
"dependencies": {
  "@heroicons/react": "^2.2.0",
  "@hookform/resolvers": "^5.0.1",
  "@mobily/ts-belt": "^3.13.1",
  "axios": "^1.8.4",
  "clsx": "^2.1.1",
  "lodash.debounce": "^4.0.8",
  "neverthrow": "^8.2.0",
  "next": "15.3.1",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hook-form": "^7.56.0",
  "react-hot-toast": "^2.5.2",
  "react-select": "^5.10.1",
  "react-spinners": "^0.17.0",
  "zod": "^3.24.3",
  "zustand": "^5.0.3"
},
"devDependencies": {
  "@eslint/eslintrc": "^3",
  "@tailwindcss/postcss": "^4",
  "@types/node": "22.15.29",
  "eslint": "^9",
  "eslint-config-next": "15.3.1",
  "tailwindcss": "^4"
}
```

## Автоматичне сканування на вразливості

Для перевірки використана стандартна команда:

```bash
$ npm audit
```

Результат:

```bash
# npm audit report

brace-expansion  1.0.0 - 1.1.11 || 2.0.0 - 2.0.1
brace-expansion Regular Expression Denial of Service vulnerability - https://github.com/advisories/GHSA-v6h2-p8h4-qcjw
brace-expansion Regular Expression Denial of Service vulnerability - https://github.com/advisories/GHSA-v6h2-p8h4-qcjw
fix available via `npm audit fix`
node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion
node_modules/brace-expansion

1 low severity vulnerability

To address all issues, run:
  npm audit fix
```

Отримана вразливість Regular Expression Denial of Service (ReDoS)

Пояснення: Зловмисник міг викликати надмірне споживання ресурсів при специфічному шаблоні розширення.
Для усунення вразливостей було використано команду:

```bash
$ npm audit fix
```

Повторна перевірка:

```bash
$ npm audit
```

Результат:

```bash
found 0 vulnerabilities
```

**Висновок:** Всі поточні залежності пройшли автоматичну перевірку.

---

## Аудит залежностей

| Пакет                 | Версія | Висновок                            |
| --------------------- | ------ | ----------------------------------- |
| `axios`               | 1.8.4  | Безпечний                           |
| `clsx`                | 2.1.1  | Безпечний                           |
| `zustand`             | 5.0.3  | Безпечний                           |
| `zod`                 | 3.24.3 | Безпечний                           |
| `next`                | 15.3.1 | Безпечний                           |
| `react`, `react-dom`  | 19.0.0 | Безпечні                            |
| `react-hook-form`     | 7.56.0 | Безпечний                           |
| `@hookform/resolvers` | 5.0.1  | Безпечний                           |
| `@heroicons/react`    | 2.2.0  | Безпечний                           |
| `react-select`        | 5.10.1 | Безпечний                           |
| `react-spinners`      | 0.17.0 | Безпечний                           |
| `react-hot-toast`     | 2.5.2  | Безпечний                           |
| `neverthrow`          | 8.2.0  | Безпечний                           |
| `@mobily/ts-belt`     | 3.13.1 | Безпечний                           |
| `lodash.debounce`     | 4.0.8  | Безпечний, але рекомендована заміна |

- Всі залежності актуальні та без відомих вразливостей.
- Підтримуються та мають регулярні оновлення.

## Аудит DevDependecies

| Пакет                  | Версія   | Висновок  |
| ---------------------- | -------- | --------- |
| `eslint`               | ^9       | Безпечний |
| `@eslint/eslintrc`     | ^3       | Безпечний |
| `eslint-config-next`   | 15.3.1   | Безпечний |
| `tailwindcss`          | ^4       | Безпечний |
| `@tailwindcss/postcss` | ^4       | Безпечний |
| `@types/node`          | 22.15.29 | Безпечний |

- Всі development-залежності актуальні та без відомих вразливостей.
- Підтримуються та мають регулярні оновлення.

## Результати аудиту через Snyk Advisor (zero-day check)

| Пакет             | Версія | Security                 |
| ----------------- | ------ | ------------------------ |
| `axios`           | 1.8.4  | No known security issues |
| `lodash.debounce` | 4.0.8  | No known security issues |
| `next`            | 15.3.1 | No known security issues |
| `react/react-dom` | 19.0.0 | No known security issues |
| `zustand`         | 5.0.3  | No known security issues |
| `zod`             | 3.24.3 | No known security issues |
| `clsx`            | 2.1.1  | No known security issues |
| `react-select`    | 5.10.1 | No known security issues |
| `react-spinners`  | 0.17.0 | No known security issues |
| `react-hot-toast` | 2.5.2  | No known security issues |
| `neverthrow`      | 8.2.0  | No known security issues |
| `@mobily/ts-belt` | 3.13.1 | No known security issues |

---

## Заміна `lodash.debounce` на `@react-hook/debounce`

lodash.debounce у минулому мав критичні вразливості типу Prototype Pollution, що становили ризик для безпеки застосунку. Хоча версія 4.0.8 наразі вважається безпечною, вона:

- застаріла (остання зміна у 2016 році),
- не оптимізована для React.

Рекомендована альтернатива: `@react-hook/debounce`
Переваги:

- React-орієнтована реалізація через хук useDebounce
- Займає менший об'єкм пам'яті
- проста інтеграція

## Порівняння

| Критерій          | `lodash.debounce`               | `@react-hook/debounce`         |
| ----------------- | ------------------------------- | ------------------------------ |
| Останнє оновлення | 2016                            | 2024                           |
| Безпечність       | були CVE у минулому             | немає відомих проблем          |
| Продуктивність    | потребує додаткових `useEffect` | інтегрується як `useDebounce`  |
| React-сумісність  | неорієнтований на React         | спеціально створений для React |
| Розмір бандлу     | \~15 KB                         | \~1.5 KB                       |
| Підтримка         | застарілий, без оновлень        | активно підтримується          |

---

## Sync Advisor

| Пакет                  | Версія | Security                 |
| ---------------------- | ------ | ------------------------ |
| `@react-hook/debounce` | 4.0.0  | No known security issues |

## Висновок

`@react-hook/debounce` — сучасна, безпечна й React-орієнтована альтернатива, яка зменшує розмір бандлу та спрощує інтеграцію дебаунсингу у компоненти.
Заміна є доцільною як з точки зору безпеки, так і архітектурної відповідності сучасним React-практикам.
