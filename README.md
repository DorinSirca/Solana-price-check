## Solana Price Checker

A modern React app to monitor popular Solana tokens with real‑time market data, rich token cards, search, and an advanced filter/sort panel (market cap, 24h volume, price change, etc.).

### Features
- **Live market data**: Price, market cap, 24h volume, 1h/24h/7d change, sparkline.
- **Search**: Find tokens by name, symbol, or address.
- **Filters & sorting**:
  - Market Cap: Mega ($10B+), Large ($1B–$10B), Mid ($100M–$1B), Small ($10M–$100M), Micro (<$10M)
  - Volume (24h): High ($10M+), Medium ($1M–$10M), Low (<$1M)
  - Price Change (24h): Gainers, Stable, Losers
  - Sort by: Market Cap, Volume, 24h Change, Price (Asc/Desc)
- **Overview stats**: Total market cap, aggregate 24h volume, active tokens.
- **Polished UI**: Glassmorphism styling, responsive layout.

### Tech Stack
- React 18, react-scripts 5
- Axios for HTTP requests
- lucide-react for icons
- Optional: recharts for charts (sparklines)
- Data source: CoinGecko public API

---

## Getting Started

### Prerequisites
- Node.js 16+ and npm 8+
- Internet access (CoinGecko API)

### Install

```bash
cd "Solana-price-check"
npm install
```

### Run (recommended) local

```bash
npm start
```

The app runs at `http://localhost:3000`.

#### If npm start does not launch on Windows PowerShell
Some environments hit a locked PowerShell temporary script (ps1) error. Use one of the workarounds below.

1) Tell npm to use cmd.exe for scripts (per-user setting):

```bash
npm config set script-shell "C:\\Windows\\System32\\cmd.exe"
npm start
```

2) Run react-scripts directly with Node:

```bash
node node_modules/react-scripts/bin/react-scripts.js start
```

3) Use cmd explicitly for this session:

```bash
cmd /c npm start
``;

If you still see "being used by another process" errors, close other terminals/editors that might lock Temp scripts, or reboot and try again.

### Build

```bash
npm run build
```

Outputs a production build in `build/`.

---

## Usage Guide

### Search
- Use the search bar to filter by token name, symbol, or address.

### Filters
- Click the "Filters" button next to the search bar to open the panel.
- Choose Market Cap, Volume, and 24h Price Change ranges.
- Set Sort By and Sort Order. Results update instantly.
- Active filters are shown as tags above the grid. Click Reset in the panel to clear all.

### Most Traded
- To see the most traded tokens, set Volume to "High" and Sort By to "Volume" (Descending).

---

## Project Structure

```text
src/
  App.js             # App state: tokens, search, filters, and data refresh
  App.css            # Global styles and layout
  components/
    Header.js/.css   # App header
    SearchBar.js/.css
    TokenList.js/.css# Overview stats, active filter tags, grid
    TokenCard.js/.css# Token presentation
    Filter.js/.css   # Slide-out filter panel and controls
  services/
    api.js           # CoinGecko integration and token shaping
```

---

## Configuration

No API keys required. The app uses the public CoinGecko market endpoints and a curated list of popular Solana tokens in `src/services/api.js`.

You can add or change tokens by editing the `SOLANA_TOKENS` array in `api.js`.

---

## Troubleshooting

- "Access to the path ... ps-script-XXXX.ps1 is denied" or "being used by another process":
  - Run: `npm config set script-shell "C:\\Windows\\System32\\cmd.exe"`
  - Or: `node node_modules/react-scripts/bin/react-scripts.js start`
  - Or: `cmd /c npm start`
  - Close any other terminals/editors; reboot if the Temp file is locked.

- Port 3000 already in use:
  - Close existing dev servers or change the port: `set PORT=3001 && npm start`

- Blank page / network errors:
  - Check console/network tab for CoinGecko rate limits or connectivity.

---

## Scripts

```bash
npm start       # Run development server
npm run build  # Build for production
npm test       # Run tests (if added)
```

---

## License

MIT – feel free to use and modify.

