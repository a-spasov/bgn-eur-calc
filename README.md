# Calculator for mixed payments and change

Online calculator for payments and change between Bulgarian lev (BGN) and Euro (EUR).
It supports two working modes:
- Payment mode: calculates how much is still left to pay.
- Change mode: calculates how much change to return, including mixed-currency scenarios.

Check propject here: https://euro-calc.zh8.eu/

Fixed exchange rate: 1 EUR = 1.95583 BGN

## Working Modes

1) Payment Mode
Use this mode when a customer has paid only part of the total and you need the remaining amount.

Required inputs:
- Final price in BGN or EUR;
- Partial paid amount in BGN or EUR;

2) Change Mode
Use this mode when a customer has already paid and you need to return change.

Required inputs:
- Final price in BGN or EUR;
- Received amount in BGN and/or EUR;
- For calculating mixed change use third line of inputs - enter partial change in BGN or EUR, the rest will be calculated;

## Features
- Currency-aware input in EUR or BGN;
- Automatic conversion;
- Two calculator modes: payment and change;
- Optional partial/mixed change handling;
- Built-in custom keypad behavior for mobile UX;
- Input validation with on-screen feedback;
- Dark/light theme toggle;
- URL prefill support for price in change mode;

## Tech Stack
- Vanilla JavaScript (ES modules, bundled with esbuild);
- Tailwind CSS v4;
- HTML5;

## Install
npm install

## Development
npm run dev


### Production Build
npm run build

Build output is generated in `dist/`:
- `dist/index.html`
- `dist/styles.css`
- `dist/scripts.js`

## Available Scripts
- `npm run dev:css` – Tailwind CSS watch build
- `npm run dev:js` – esbuild JS watch bundle
- `npm run dev` – runs CSS + JS watch tasks concurrently
- `npm run build:css` – minified production CSS
- `npm run build:js` – minified production JS
- `npm run build` – full production build

## URL Prefill
You can prefill the calculator with price and open directly in change mode:

- `?price=12eur`
- `?price=25bgn`

Examples:

- `http://localhost:3000/?price=12eur`
- `http://localhost:3000/?price=25bgn`

## Notes
- UI texts/messages are currently in Bulgarian.
- Exchange rate is stored in `src/scripts/variables.js`.


