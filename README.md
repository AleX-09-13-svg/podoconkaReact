# React/Vite UI Base

Reusable UI template built with Vite, React, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Stack

- Vite 8
- React 19
- TypeScript 5
- Tailwind CSS v4 via `@tailwindcss/vite`
- shadcn/ui with `radix-vega` style
- ESLint 9
- Path alias `@/* -> src/*`

## Scripts

- `npm run dev` - start the Vite dev server
- `npm run typecheck` - run TypeScript project references
- `npm run build` - type-check and build for production
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build

## Project Setup

- Vite alias is configured in `vite.config.ts`
- TypeScript alias is configured in `tsconfig.json` and inherited by app/node configs
- shadcn/ui aliases are configured in `components.json`
- Tailwind theme tokens and dark mode variant live in `src/index.css`

## VS Code

Workspace settings are stored in `.vscode/settings.json`.

This template ignores unknown CSS at-rules so Tailwind v4 directives like `@theme` and `@custom-variant` are not flagged by the default CSS validator.

Recommended extension:

- `Tailwind CSS IntelliSense` (`bradlc.vscode-tailwindcss`)

## shadcn/ui

Generated UI components live in `src/components/ui`.

This template keeps variant helpers in separate files when needed so ESLint fast-refresh rules stay compatible with component exports.

## Reusing This Template

1. Copy the project or create a new repository from it.
2. Run `npm install`.
3. Start development with `npm run dev`.
4. Add new shadcn/ui components as needed and keep imports using `@/`.
