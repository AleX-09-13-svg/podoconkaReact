# React UI Starter

Reusable starter for interface-heavy React projects built with Vite, TypeScript, Tailwind CSS v4, and shadcn/ui.

## What is included

- Vite 8 + React 19
- TypeScript 5 with project references
- Tailwind CSS v4 via `@tailwindcss/vite`
- shadcn/ui with `radix-vega` style and `lucide-react`
- Path alias `@/* -> src/*`
- ESLint 9
- Base theme tokens, dark mode support, and starter UI components

## Scripts

- `npm run dev` - start the dev server
- `npm run typecheck` - run TypeScript checks
- `npm run build` - type-check and create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

## Project structure

- `src/App.tsx` - starter landing screen you can replace with your app shell
- `src/components/ui` - generated shadcn/ui components
- `src/lib/utils.ts` - shared utility helpers such as `cn`
- `src/index.css` - theme tokens, dark mode variant, and base styles
- `vite.config.ts` - Vite plugins and `@` alias
- `components.json` - shadcn/ui aliases and generator config

## Reuse checklist

1. Copy this project or create a new repository from it.
2. Run `npm install`.
3. Rename the package in `package.json`.
4. Replace the starter content in `src/App.tsx`.
5. Adjust theme tokens in `src/index.css`.
6. Start building features with `npm run dev`.

## Notes

- Tailwind theme tokens and dark mode live in `src/index.css`.
- TypeScript alias configuration is shared through `tsconfig.json`.
- Generated shadcn/ui components are kept under `src/components/ui`.
- VS Code settings in `.vscode/settings.json` are optional and can be removed if you do not want editor-specific files in derived projects.

## Recommended next steps

- Add your own layout, route structure, and feature folders.
- Install more shadcn/ui components as needed.
- Replace placeholder assets with product-specific branding.
- If builds behave oddly on Windows, test the project from a path that uses only Latin characters.

---

# React UI Starter

Переиспользуемый стартовый шаблон для React-проектов с упором на интерфейсы, собранный на Vite, TypeScript, Tailwind CSS v4 и shadcn/ui.

## Что входит

- Vite 8 + React 19
- TypeScript 5 с project references
- Tailwind CSS v4 через `@tailwindcss/vite`
- shadcn/ui со стилем `radix-vega` и `lucide-react`
- Алиас путей `@/* -> src/*`
- ESLint 9
- Базовые theme-токены, поддержка тёмной темы и стартовые UI-компоненты

## Скрипты

- `npm run dev` - запуск dev-сервера
- `npm run typecheck` - проверка TypeScript
- `npm run build` - проверка типов и production-сборка
- `npm run lint` - запуск ESLint
- `npm run preview` - предпросмотр production-сборки

## Структура проекта

- `src/App.tsx` - стартовый экран, который можно заменить на оболочку вашего приложения
- `src/components/ui` - сгенерированные компоненты shadcn/ui
- `src/lib/utils.ts` - общие утилиты, например `cn`
- `src/index.css` - theme-токены, вариант тёмной темы и базовые стили
- `vite.config.ts` - плагины Vite и алиас `@`
- `components.json` - алиасы и конфигурация генератора shadcn/ui

## Как устроен проект

- `src/components/01_homePage` - главная страница лендинга.
- `src/components/02_calculatorPage` - форма ввода размеров подоконника.
- `src/components/03_stoneCatalog` - каталог камней и выбор пользовательского камня.
- `src/components/04_orderPage` - страница заказа, расчет стоимости, раскрой, список деталей и форма заявки.
- `src/context/AppDataContext.tsx` - общее состояние: выбранный камень, текущая форма калькулятора и добавленные позиции заказа.
- `src/lib/orderDetails.ts` - подготовка описаний заказа и деталей для раскроя.
- `src/lib/guillotinePacking.ts` - логика раскроя, подсчет четвертей листа и итоговой цены.
- `src/config/stoneCutConfig.ts` - изменяемые параметры листа и раскроя.
- `src/config/stonePricingConfig.ts` - изменяемые параметры ценообразования.
- `src/data/stones.json` - данные каталога камней: название, цена листа и изображение.
- `public/robots.txt`, `public/sitemap.xml`, `netlify.toml` - файлы для SEO и деплоя на Netlify.

## Чеклист для переиспользования

1. Скопируйте проект или создайте из него новый репозиторий.
2. Выполните `npm install`.
3. Переименуйте пакет в `package.json`.
4. Замените стартовый контент в `src/App.tsx`.
5. Настройте theme-токены в `src/index.css`.
6. Начинайте разработку через `npm run dev`.

## Примечания

- Theme-токены Tailwind и тёмная тема находятся в `src/index.css`.
- Конфигурация алиасов TypeScript задаётся через `tsconfig.json`.
- Сгенерированные компоненты shadcn/ui лежат в `src/components/ui`.
- Настройки VS Code в `.vscode/settings.json` необязательны и могут быть удалены, если вы не хотите включать editor-specific файлы в производные проекты.

## Рекомендуемые следующие шаги

- Добавьте собственный layout, структуру маршрутов и feature-папки.
- Установите дополнительные компоненты shadcn/ui по мере необходимости.
- Замените временные ассеты на брендинг вашего проекта.
- Если сборка странно ведёт себя на Windows, проверьте проект в пути, где используются только латинские символы.

## EmailJS за 5 минут

1. Зарегистрируйтесь на [EmailJS](https://www.emailjs.com/) и войдите в аккаунт.
2. В `Email Services` подключите почтовый сервис (например, Gmail) и скопируйте `Service ID`.
3. В `Email Templates` создайте шаблон и добавьте в него переменные:
   - `{{user_name}}`
   - `{{user_phone}}`
   - `{{user_email}}`
   - `{{message}}`
   Затем скопируйте `Template ID`.
4. В `Account` -> `General` скопируйте `Public Key`.
5. В корне проекта создайте `/.env.local` (рядом с `package.json`) и добавьте:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

6. Перезапустите dev-сервер: `npm run dev`.
7. Откройте страницу формы, заполните поля и отправьте заявку.

Если все настроено верно, форма отправит письмо на email пользователя, который указан в поле `Почта`.
