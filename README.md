OpenClaw AI

AI-Powered Crypto Intelligence & Trading Dashboard

"OpenClaw AI Banner" (docs/images/banner.png)

OpenClaw AI is a browser-native cryptocurrency intelligence platform that combines:

- AI market analysis
- Paper trading simulation
- Automated trading bots
- Binance live trading
- Risk analysis tools
- Dollar-Cost Averaging strategy guidance
- Real-time crypto market data

The entire application runs inside a single HTML file and requires no backend or build tools.

Built for the Binance OpenClaw AI Build Competition (2026).

---

Table of Contents

1. Project Overview
2. Platform Architecture
3. Full Feature Breakdown
4. Webpage Structure
5. Dashboard Walkthrough
6. Key System Components
7. AI System
8. Trading Engine
9. AutoBot System
10. Learning Engine
11. Binance Integration
12. Price Alert System
13. Data Persistence
14. Security Model
15. Installation
16. Usage Guide
17. Screenshots
18. Future Improvements
19. License

---

1. Project Overview

OpenClaw AI is designed to function as a complete crypto trading command center inside a web browser.

It integrates:

- Market analytics
- AI decision assistance
- Trading simulation
- Risk tools
- Real exchange connectivity

The goal of the system is to help traders:

• analyze crypto markets faster
• practice trading strategies safely
• automate strategies using AI
• track performance and learn from trades

The application operates entirely within the browser using:

- JavaScript
- Binance APIs
- AI provider APIs

No server infrastructure is required.

---

2. Platform Architecture

The system is built as a Single Page Application (SPA).

OpenClaw AI
│
├── index.html
│
├── UI Components
│   ├── Navigation Tabs
│   ├── Trading Panels
│   ├── Charts
│   ├── Alerts Panel
│
├── Core Systems
│   ├── Market Data Engine
│   ├── AI Analysis Engine
│   ├── Paper Trading Engine
│   ├── AutoBot Engine
│   ├── Learning Memory Engine
│
└── Integrations
    ├── Binance API
    ├── AI Model APIs
    └── Browser Notification API

---

3. Full Feature Breakdown

The platform contains several major systems:

System| Description
AI Skills (Hero Panel)| AI market analysis engine
Market| Real-time cryptocurrency market dashboard
Bot| AI trading assistant
Trades| Paper trading + Binance live trading
AutoBot| Automated trading strategy engine
DCA| Dollar-cost averaging strategy planner
Audit| Token safety & risk analysis
Alerts| Real-time price notifications

---

4. Webpage Structure

The webpage is divided into multiple functional tabs.

Primary Tabs

1️⃣ AI Skills (Hero Tab)
2️⃣ Market Tab
3️⃣ Bot Tab
4️⃣ Trades Tab
5️⃣ DCA Tab
6️⃣ Audit Tab
7️⃣ Alerts Panel

Each tab represents a separate tool within the trading system.

---

5. Dashboard Walkthrough

5.1 AI Skills — Hero Analysis Panel

This is the central AI intelligence engine of the platform.

Users can select a cryptocurrency and request a full market analysis.

What Happens During Analysis

When the user clicks Analyze:

1. The selected coin symbol is captured.
2. Market data is fetched from Binance.
3. Technical indicators are calculated.
4. AI receives a summary of the market.
5. The AI returns a trade recommendation.

The analysis function:

analyzeFromHero()

This function handles:

• market data retrieval
• AI prompt generation
• displaying results in the hero panel

The system prevents multiple simultaneous analyses to avoid API abuse.

---

5.2 Market Tab

Displays a grid of cryptocurrency assets.

Each card shows:

• symbol
• current price
• 24-hour change
• volume

Users can click a coin to open a detailed trading panel.

---

5.3 Bot Tab — AI Crypto Assistant

The Bot tab provides a conversational AI assistant.

Users can ask:

- market questions
- technical indicator explanations
- crypto education topics
- trading strategy questions

Example quick prompts:

• BTC analysis
• Explain RSI
• Best momentum coins
• Stop loss strategies
• Crypto trading risks

The assistant can access live price data before answering.

Important design rule:

The Bot tab never executes trades.
It is strictly for learning and strategy discussions.

---

5.4 Trades Tab — Trading Engine

This tab contains two trading modes.

Paper Trading

A simulated trading environment.

Starting balance:

$10,000

Features:

• long and short positions
• stop loss
• take profit
• real-time profit tracking

Trade results update the system's learning engine.

---

AutoBot

AutoBot is an automated trading engine.

Every cycle it:

1. scans supported coins
2. runs technical analysis
3. generates a confidence score
4. opens trades when the threshold is met

Example parameters:

Setting| Description
Trade size| amount per trade
Confidence threshold| AI signal strength
Stop loss| risk control
Take profit| profit target
Max trades| safety limit

The bot periodically scans the market and executes trades automatically.

---

Binance Live Trading

Users can connect a real Binance account.

Steps:

1. Paste Binance API key
2. Paste secret key
3. Connect account

The system then allows:

• viewing balances
• viewing open orders
• placing market orders
• placing limit orders

API keys are stored locally in the browser only.

---

6. AI System

The AI layer powers several components.

It can be connected to multiple providers.

Supported AI providers include:

- OpenAI
- Claude
- Google Gemini
- Groq
- OpenRouter
- xAI Grok

The platform automatically detects which provider the key belongs to.

AI is used for:

• market analysis
• DCA strategy advice
• educational chat responses
• website feature explanations

---

7. DCA Strategy Engine

The DCA tool helps users build a long-term investment strategy.

Inputs:

- investment amount
- investment frequency
- duration
- selected coin

The system calculates accumulation and then asks AI for strategy guidance.

---

8. Self-Improving Learning Engine

The platform includes a learning system that records trade outcomes.

Each trade updates the AI memory:

learnFromTrade()

Stored information:

• number of trades
• wins and losses
• average profit
• lessons learned

The engine tracks performance for each coin and records insights such as:

LONG trade WON ($120) via RSI breakout

The system updates the AI learning panel after each trade.

---

9. Price Alert System

The alert system allows users to monitor specific price levels.

Alert conditions:

• price above target
• price below target

When triggered:

- a toast notification appears
- a browser notification can be sent
- the alert is marked as completed

The checking system continuously monitors prices.

---

10. Token Safety Audit

The audit tool analyzes a token's risk profile.

Metrics include:

- volatility
- liquidity
- bid-ask spread
- market depth

Each metric is labeled:

SAFE
WARNING
DANGER

This helps traders avoid unsafe markets.

---

11. Data Persistence

User data is stored in browser local storage.

Stored data includes:

- trade history
- AI learning memory
- alerts
- chat history
- Binance API keys
- account balances

No cloud storage is required.

---

12. Security Model

OpenClaw AI prioritizes user security.

Important security principles:

• API keys are never sent to external servers
• keys are stored only in the browser
• users should disable withdrawal permissions

Recommended Binance settings:

Enable: Spot Trading
Disable: Withdrawals

---

13. Installation

Download the repository:

git clone https://github.com/yourname/openclaw-ai

Open the application:

index.html

No build process is required.

---

14. Usage Guide

Step 1 — Connect AI Provider

Paste your AI API key in the provider panel.

Step 2 — Explore the Market

Use the Market tab to monitor crypto prices.

Step 3 — Run AI Analysis

Select a coin in the Hero panel and click Analyze.

Step 4 — Practice Trading

Use the Trades tab for paper trading.

Step 5 — Automate Strategies

Activate AutoBot to allow automated trades.

Step 6 — Connect Binance

Optional: connect Binance to trade real funds.

---

15. Screenshots

Dashboard

"Dashboard" (docs/images/dashboard.png)

AI Analysis Panel

"AI Analysis" (docs/images/ai-analysis.png)

Trading Interface

"Trading Panel" (docs/images/trading-panel.png)

AutoBot Settings

"AutoBot" (docs/images/autobot.png)

Alerts Panel

"Alerts" (docs/images/alerts.png)

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

## Live Webpage 

https://wisdomkings001.github.io/binance-project/

---

## Author

Developed by Wisdom — TechCraft & Coding

Instagram: "@wisdomtech_creations"

