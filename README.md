# OpenClaw AI — Powered by Binance

A **single-page crypto intelligence platform** that runs entirely in the browser. No backend, no build tools, no downloads. It connects to **Binance WebSocket & REST APIs** for real-time market data and uses **AI** (Claude, GPT-4o, Gemini, Groq, OpenRouter, xAI) for trade signals, DCA planning, and token audits.

Built for the **Binance OpenClaw AI Build Competition (March 4–18, 2026)**.  
**TechCraft & Coding By Wisdom** · GitHub: wisdomkings001 · Instagram: @wisdomtech_creations

---

## Features

| Tab | Description |
|-----|--------------|
| **⬡ AI Skills** | Hero tab: select a coin, run **🤖 ANALYZE NOW**. Fetches Binance klines (1H, 4H, 1D), computes RSI, MACD, Bollinger Bands, Stochastic RSI, ATR, VWAP, candle patterns; pulls futures (funding, OI, long/short); uses AI + optional web search for BUY/SELL/HOLD with entry, stop loss, take profit, confidence. **Self-Improving Engine** stores paper trade outcomes per coin and injects them into future analyses. |
| **Market** | Live grid of **60+ coins** via Binance WebSocket. Sort by Volume, Top Gainers, Top Losers, Price. Search by symbol/name. Click a card → **Coin Detail** with TradingView chart, order book, 24H stats, LONG / SHORT / **AI ANALYZE** (opens floating AI panel). |
| **Bot** | Conversational AI assistant with Binance prices and crypto news. Education-only; no auto-trades. Quick prompts: BTC Analysis, Best Momentum, Explain RSI, Stop Losses, DeFi Guide, etc. **History** button on same line as input; chat history persisted in `localStorage`. |
| **Trades** | **Paper trading**: $10K virtual balance, LONG/SHORT, live P&amp;L, auto stop loss / take profit, 30-day P&amp;L history. **AutoBot**: scans 60 coins every 45s, opens positions when confidence &gt; threshold (default 75%). **Binance Live**: connect API key (stored only in browser); place real MARKET/LIMIT orders on major pairs. |
| **⬡ DCA** | Dollar-cost averaging calculator: coin, amount, frequency (Daily/Weekly/Bi-Weekly/Monthly), duration, growth rate → projected ROI, coins accumulated, bar chart. **Portfolio Rebalancer**: set target % per coin (10 coins), get BUY/SELL $ amounts to rebalance; click row to open paper position. **Ask AI for Personalised DCA Advice**. |
| **🔍 Audit** | Token safety check: select token → RUN AUDIT. Uses live Binance data for volatility, liquidity, 24H risk, bid-ask spread, market cap proxy. Safe / Warning / Danger per metric + overall verdict. |
| **🔔 Price Alerts** | Floating **draggable** bell icon (bottom-right). Set “Above” or “Below” target price for any tracked coin. Checked on every WebSocket tick; browser notification + toast when hit. Stored in `localStorage` (`openclaw_alerts`). |
| **ℹ About** | Step-by-step guide for every feature (1–10), competition info, “How OpenClaw AI Supercharges Your Binance Experience.” |

---

## Tech Stack

- **Single HTML file** (`index.html`) — all CSS and JavaScript inline.
- **No build step** — open in a browser or serve statically.
- **Binance**: public REST (ticker, klines, exchangeInfo, aggTrades) and **WebSocket** (combined stream for 60 pairs). Some endpoints go through a **Cloudflare Worker proxy** (`BINANCE_PROXY`) to avoid CORS; klines/ticker can also be fetched directly where allowed.
- **AI**: Multi-provider (Anthropic Claude, OpenAI GPT-4o, Google Gemini, Groq, OpenRouter, xAI Grok). API keys stored in **browser `localStorage` only**; requests go from the browser to each provider’s API.
- **Charts**: TradingView lightweight charts (script loaded from CDN).
- **Fonts**: Bebas Neue, IBM Plex Mono (Google Fonts).

---

## Setup & Run

1. **Open the app**  
   - Double-click `index.html`, or  
   - Serve the folder with any static server, e.g.  
     `npx serve .`  
     then open the URL shown (e.g. `http://localhost:3000`).

2. **AI analysis**  
   - Go to **AI Skills** or **Market** → coin detail → **AI ANALYZE**.  
   - In **AI Skills** or **Bot**, paste your API key when prompted. Key is stored in `localStorage` (e.g. `bnex_provider_keys`, `bnex_provider`, `bnex_selected_model`).  
   - Supported: Anthropic (recommended), OpenAI, Gemini (free tier), Groq (free), OpenRouter, xAI.

3. **Binance proxy (optional)**  
   - For Audit and some REST calls the app uses a Cloudflare Worker proxy. Default URL in code:  
     `https://openclaw-binance.kingswisdom935.workers.dev`  
   - To use your own: deploy a CORS proxy that forwards to `https://api.binance.com`, then set `BINANCE_PROXY` in the script to your Worker URL.

4. **Binance Live (real trading)**  
   - **Trades** tab → Connect Account → paste Binance API Key + Secret. Stored only in browser (`bnex_api_key`); requests go from browser to Binance. Use at your own risk; start small.

---

## Data & Storage (all in browser)

- **Paper trading**: balance, positions, trade history, P&amp;L history, daily P&amp;L (`bnex_balance`, `bnex_positions`, `bnex_history`, `bnex_pnl_history`, `bnex_daily`).
- **Self-Improving Engine**: per-coin memory, wins/losses, lessons (`bnex_memory`, `bnex_wins`, `bnex_losses`).
- **AI**: provider, keys, selected model, analysis cache, hero/float coin (`bnex_provider`, `bnex_provider_keys`, `bnex_selected_model`, `bnex_analysis_cache`, `bnex_hero_coin`, `bnex_float_coin`).
- **Bot**: current session, chat history (`openclaw_bot_current`, `openclaw_bot_history`).
- **Alerts**: list of price alerts (`openclaw_alerts`).
- **UI**: active tab (`bnex_active_tab`), AutoBot state (`bnex_autobot_state`).

Nothing is sent to OpenClaw AI servers; keys and data stay on your device.

---

## Project Structure (conceptual)

- **Header**: logo, status badge (WebSocket), ticker strip, Binance Live button, news disclaimer.
- **Tabs**: AI Skills (default), Market, Bot, Trades, DCA, Audit, About.
- **Modals/overlays**: Trade confirm (paper trade from AI signal), HOLD guide, AI float (analysis result + **▲ Trade It**).
- **Floating UI**: AI analysis panel (draggable), Price Alerts FAB (draggable), Price Alerts panel (draggable by header).

---

## Important Notes

- **Demo / paper trading**: Trades tab is for education; “DEMO / PAPER TRADING — NOT REAL MONEY” unless you explicitly use **Binance Live** with your own API keys.
- **Eligibility**: Some functions may be restricted by Binance terms (e.g. jurisdiction). The app is “powered by Binance” and subject to Binance eligibility.
- **2-minute cooldown**: AI Skills “ANALYZE NOW” has a cooldown to limit API usage; the last analysis stays visible until the next run.

---

## File

- `index.html` — full app (HTML + CSS + JS).  
- No separate README or config files required; this README describes the app and how to run it.
