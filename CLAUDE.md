# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
yarn          # install dependencies
yarn start    # watch mode (webpack --watch), for local development
yarn build    # one-off production build to dist/
yarn lint     # ESLint over .js/.ts/.tsx
yarn check-types  # TypeScript type-check without emitting
yarn release  # build + zip dist/ into release/basecamp_essentials.zip
```

There are no automated tests. To manually test, load the `dist/` folder as an unpacked Chrome extension (chrome://extensions → "Load unpacked").

## Architecture

This is a Chrome extension that patches the Basecamp UI by injecting jQuery-driven DOM mutations on a polling loop.

### Entry points

Webpack compiles two bundles from `src/`:

- **`content.ts`** → `dist/content.bundle.js` — the content script that runs on Basecamp pages
- **`popup.ts`** → `dist/popup.bundle.js` — the extension popup for toggling settings

### Polling loop pattern

`content.ts` bootstraps once on page load, then runs an infinite recursive loop (`setTimeout(loop, 2000)`) that re-renders all features every 2 seconds. This is intentional: Basecamp uses Turbo/SPA navigation, so features must be re-applied after page transitions without a full reload.

**Critical invariant:** every `render*` function must be idempotent — it checks for a sentinel class/element before inserting, so re-running it doesn't duplicate DOM nodes. Every `create*EventHandlers` function must call `.off()` before `.on()` to prevent handler accumulation (memory leak if skipped — documented in README).

### Feature pattern

Each feature in `src/features/` exports:
- `render*()` — inserts elements into the DOM (idempotent)
- `create*EventHandlers()` — binds jQuery event listeners (always calls `.off()` first)

`src/features/index.ts` re-exports all features; `content.ts` imports from there.

### Config system

User-configurable options (`chatSummary`, `coloredChatBorder`) are stored in `chrome.storage.sync` as a single `"config"` key. `src/helpers/db.ts` handles read/write and merges any missing keys against `defaultParsedConfig` on every read, so adding a new config key requires updating both `ParsedConfig` in `src/models/config.ts` and `defaultParsedConfig` in `src/helpers/db.ts`.

Features that depend on config receive `ParsedConfig` as a parameter (e.g., `renderChatSummary(parsedConfig)`); features that don't need config take no arguments.

### Page-conditional rendering

`content.ts` gates some features by `window.location.pathname`:
- Chat/Campfire pages (`circles`, `chats`): reply buttons, clear button, article-as-alert, chat summary
- Todo pages (`todos/`): todo-content default template button
- All pages: additional emojis, ping search, boost attribute length, hey ignore
