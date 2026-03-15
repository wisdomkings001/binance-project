# OpenClaw AI — Crypto Trading Intelligence Platform

> A single-file, zero-dependency AI-powered cryptocurrency paper trading platform built on live Binance WebSocket data. Designed for the Binance OpenClaw AI Build Event.

---

## Overview

OpenClaw AI is a real-time cryptocurrency analysis and paper trading dashboard that runs entirely in the browser as a single HTML file. It connects directly to Binance's public WebSocket feed for live price data across 60 coins, combines multi-timeframe technical analysis with AI-generated signals, and provides a complete paper trading environment with persistent history, automated bots, and a conversational AI assistant.

No backend. No server. No installation. Open the file in any browser and it works.

---

## How It Enhances the Binance User Experience

OpenClaw AI acts as an intelligent layer on top of Binance data. It transforms raw price feeds into actionable trading insights, educates users through a conversational AI, and lets them practice strategies risk-free before committing real capital on Binance. Every feature is built around making Binance data more accessible, understandable, and useful.

---

## Features & Functions

### 1. Live Market Dashboard (Market Tab)

The main grid displays all 60 supported coins with real-time price data streamed directly from Binance WebSocket. Each coin card shows the current price, 24-hour percentage change, and a live sparkline chart.

**How it works:**  
A persistent WebSocket connection subscribes to Binance's `!ticker@arr` stream which pushes updates for all trading pairs every second. Prices are stored in a `prices` object keyed by coin symbol. Cards flash green on price increases and red on decreases. A connection status badge shows whether the live feed is active.

**User benefit:**  
Users see real Binance market conditions without needing to open the Binance app. The grid is searchable and sortable, making it easy to scan the full market at a glance.

---

### 2. AI Analysis Engine

The core intelligence of the platform. When a coin is selected and analyzed, the engine fetches multi-timeframe kline data from Binance (1H, 4H, 1D), runs a full technical analysis suite, then submits everything to an AI model which returns a structured recommendation.

**Technical indicators computed:**
- RSI (Relative Strength Index) across 1H, 4H, 1D timeframes
- MACD with proper 9-period EMA signal line
- Bollinger Bands (upper, mid, lower) on 1H
- EMA 20 and EMA 50 trend alignment
- Stochastic RSI
- Volume trend classification (surging, stable, declining)
- Candle pattern recognition (Marubozu, hammer, shooting star, doji, engulfing)
- Support and resistance level detection
- Market structure (higher highs / lower lows)

**AI output includes:**
- BUY / SELL / HOLD recommendation
- Confidence score (0–100%)
- Entry price, take profit, and stop loss levels
- Direction (long or short)
- Reasoning explanation

**Cooldown rule:**  
Each coin enforces a 2-minute analysis cooldown to prevent API abuse and ensure signals are based on fresh data. The cooldown applies across all entry points — the market grid, hero tab, and bot chat. Cached results are reused within the window.

**Multi-provider support:**  
The AI call is routed through whichever provider the user has configured — Anthropic Claude, OpenAI GPT, Google Gemini, Groq, Mistral, or Cohere. All providers use the same structured prompt and return the same output format.

---

### 3. Self-Improving Analysis Engine

Every time a trade closes, the engine records the outcome and updates a per-coin memory object. Future analysis prompts for that coin include the historical performance summary — win rate, average P&L, past lessons — so the AI can factor in what has and hasn't worked.

**How it works:**  
A `memory` object (persisted in `localStorage`) stores per-coin trade counts, win/loss ratios, average P&L, and a lessons array. When building the AI prompt for a coin, the engine checks memory and appends: *"From X past trades on this coin: Y% win rate, avg P&L $Z. Past lesson: [last lesson]."*

**User benefit:**  
The longer a user trades, the smarter the signals become for that specific coin. The system learns from its own mistakes.

---

### 4. Paper Trading Engine (Trades Tab)

A full paper trading system that simulates real trade execution using live Binance prices as the reference.

**Opening a position:**  
Users select a coin, choose Long or Short, set position size (default 10% of balance), stop loss percentage, and take profit percentage. A position ID, entry price, and timestamp are recorded.

**Position monitoring:**  
Open positions are checked against live prices on every WebSocket tick. If price crosses the take profit or stop loss threshold, the position closes automatically. Progress toward take profit is shown as a percentage bar.

**Manual close:**  
Users can close any position at any time at the current market price.

**Balance:**  
Starts at $10,000 paper balance. Each trade deducts the position size from available balance. Closed trades return the size plus or minus the P&L. Balance persists across sessions via `localStorage`. A reset option is available that preserves trade history and AI memory.

---

### 5. Trade History

Every closed trade is recorded and displayed in the Trades tab with full detail:

- Coin symbol and direction (Long/Short)
- Close reason (Take Profit / Stop Loss / Manual)
- Entry price, exit price, position size
- Percentage price move
- Hold duration (minutes or hours)
- Full timestamp

The history has no cap — every trade in the session is stored and shown. Trade count is displayed in the section header.

---

### 6. P&L Calculation History

A dedicated panel that records every closed trade as a full P&L calculation entry and displays them in a numbered log covering the entire trading session.

**Cumulative summary banner** at the top shows:
- Total session P&L (running sum of all closed trades)
- Total number of trades
- Overall win rate percentage

**Each entry shows:**  
`Entry → Exit · Position size · Direction · % move · Close reason · Timestamp`

Entries are numbered from #1 upward and persist in `localStorage` across page refreshes. This is independent of the 30-day daily chart and covers the full intraday session with no time limit.

---

### 7. 30-Day P&L Chart

A bar chart in the Trades tab showing daily net P&L across the last 30 calendar days. Each bar is coloured green for profitable days and red for losing days. Hovering shows the exact date and P&L value.

---

### 8. AutoBot (Automated Trading)

An automated trading bot that runs on a configurable interval and trades autonomously using the AI analysis engine.

**Settings:**
- Scan interval (minutes between scans)
- Maximum simultaneous open positions
- Position size (% of balance per trade)
- Stop loss percentage
- Take profit percentage

**How it works:**  
On each interval tick, the bot iterates through all 60 coins. For each coin it checks: is there already an open position? Is it within cooldown? Then runs analysis and opens a position if the AI confidence exceeds 60% and the recommendation is BUY or SELL. The bot logs every action — opens, skips, errors — in a scrollable log panel.

**Cooldown enforcement:**  
The bot respects the same 2-minute per-coin analysis cooldown as the manual analysis. Coins within cooldown are skipped and logged as such.

---

### 9. DCA Calculator (Dollar Cost Averaging)

A tool for planning and evaluating dollar cost averaging strategies on any supported coin.

**Inputs:**  
Coin selection, investment amount per period, frequency (daily/weekly/monthly), number of periods, start date.

**Outputs:**  
- Total invested
- Average purchase price
- Current portfolio value at live Binance price
- Unrealised P&L
- Buy schedule showing the next 8 purchase dates and projected prices
- AI Strategy Insight — a natural language evaluation of the DCA plan using live market conditions

---

### 10. Portfolio Rebalancer

Allows users to define a target portfolio allocation across multiple coins and calculates what trades are needed to rebalance from the current state to the target.

**How it works:**  
Users input their current holdings for each coin and set target percentage weights. The tool fetches live Binance prices for each coin, calculates the current portfolio value and allocation percentages, then computes the buy/sell amounts needed to reach the target weights.

---

### 11. Price Alerts

Users can set price threshold alerts for any coin. When the live price crosses above or below the set threshold, a browser notification fires and a toast message appears.

Alerts persist across page refreshes and can be cleared individually or all at once.

---

### 12. Token Audit Tool

A public-data audit of any Binance trading pair that does not require an API key or account connection.

**Data fetched via the Cloudflare Worker proxy:**
- Exchange info (trading status, filters, min notional)
- 24-hour ticker (price, volume, high/low, bid/ask)
- 30-day daily klines for trend analysis

**Outputs:**
- Trading status (is the pair active?)
- Min order size and notional value
- 24H volume and price range
- 30-day price trend summary
- AI-generated risk assessment

---

### 13. Binance Live Account Connection

For users with a Binance API key, the platform can connect to their real account to:
- Fetch live balance
- Place real orders (market buy/sell)
- View open orders and cancel them

All authenticated requests are routed through a Cloudflare Worker proxy to resolve browser CORS restrictions. The API key is never stored server-side — it is held in memory and sent per-request.

**Setup:**  
Deploy the included `binance-proxy-worker.js` to Cloudflare Workers (free tier), set the Worker URL in the app, then enter your Binance API key in the Live panel.

---

### 14. Bot Chat (AI Assistant)

A conversational AI assistant embedded in the platform that can answer questions about crypto, explain concepts, and analyse specific coins on demand.

**Capabilities:**
- Answer questions about any crypto topic (DeFi, tokenomics, trading strategies)
- Reference live market data from the current session
- Detect when a coin is mentioned and offer a direct Analyze & Trade button
- Explain indicators (RSI, MACD, Bollinger Bands etc.) in plain language
- Work offline using a built-in local knowledge base if no AI key is set

**Cooldown enforcement:**  
When the bot's Analyze & Trade button is clicked, it respects the same 2-minute coin analysis cooldown as all other entry points. If a fresh analysis exists (less than 2 minutes old), it reuses the cached result instantly. If the cooldown is active, the cooldown modal is shown rather than bypassing the rule.

---

### 15. Hero Analysis Tab

A full-screen dedicated analysis panel for deep-diving a single coin. Displays the complete AI analysis output including all computed indicators, market structure, funding rate, open interest, whale activity (large trades), order book depth, and fear & greed index alongside the AI recommendation.

---

## Persistence

All data is stored in the browser's `localStorage` under the `bnex_` namespace:

| Key | Contents |
|---|---|
| `bnex_balance` | Current paper trade balance |
| `bnex_positions` | Open positions array |
| `bnex_history` | Closed trade records |
| `bnex_pnl_history` | Full P&L calculation log |
| `bnex_daily` | 30-day daily P&L array |
| `bnex_memory` | Per-coin AI learning memory |
| `bnex_wins` / `bnex_losses` | Win/loss counters |
| `bnex_provider` | Active AI provider |
| `bnex_provider_keys` | AI provider API keys |

---

## Infrastructure

**Binance data sources:**
- Public WebSocket: `wss://stream.binance.com:9443` — live price ticks
- Public REST (via Cloudflare Worker): `api.binance.com` — klines, tickers, exchange info, order book
- Futures REST: `fapi.binance.com` — funding rates, open interest, long/short ratios
- Alternative.me API: Fear & Greed Index

**Cloudflare Worker:**  
A lightweight proxy (`binance-proxy-worker.js`) deployed to Cloudflare Workers that adds CORS headers and forwards browser requests to Binance REST endpoints. Required for audit, order book, and live account features. Free tier supports 100,000 requests/day.

---

## Supported Coins (60 total)

BTC, ETH, BNB, SOL, XRP, ADA, DOGE, AVAX, MATIC, DOT, LINK, UNI, ATOM, LTC, BCH, NEAR, APT, ARB, OP, SUI, INJ, TIA, JUP, WIF, BONK, PEPE, SHIB, FIL, ICP, HBAR, VET, ALGO, EGLD, GRT, SAND, MANA, CRV, AAVE, MKR, COMP, SNX, YFI, SUSHI, 1INCH, ZRX, BAT, ENJ, CHZ, GALA, AXS, THETA, FTM, RUNE, KAVA, ZIL, ONT, ICX, QTUM, XLM, XMR

---

## Running the App

1. Download `index.html`
2. Open it in any modern browser (Chrome recommended)
3. Set your AI provider API key via the key icon
4. Optionally deploy `binance-proxy-worker.js` to Cloudflare Workers and set the Worker URL for audit and live account features
5. Start trading

No build step. No npm. No server. Single file.
