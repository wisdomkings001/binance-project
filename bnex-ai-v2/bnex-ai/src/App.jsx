import { useState, useRef, useEffect, useCallback } from "react";

const API_KEY = "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";

const PROFILE_IMG = "data:image/jpeg;base64,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";

const COIN_LIST = [
  {symbol:"BTCUSDT",name:"Bitcoin",short:"BTC",color:"#F7931A"},
  {symbol:"ETHUSDT",name:"Ethereum",short:"ETH",color:"#627EEA"},
  {symbol:"BNBUSDT",name:"BNB",short:"BNB",color:"#F3BA2F"},
  {symbol:"SOLUSDT",name:"Solana",short:"SOL",color:"#9945FF"},
  {symbol:"XRPUSDT",name:"XRP",short:"XRP",color:"#346AA9"},
  {symbol:"ADAUSDT",name:"Cardano",short:"ADA",color:"#0033AD"},
  {symbol:"DOGEUSDT",name:"Dogecoin",short:"DOGE",color:"#C2A633"},
  {symbol:"AVAXUSDT",name:"Avalanche",short:"AVAX",color:"#E84142"},
  {symbol:"DOTUSDT",name:"Polkadot",short:"DOT",color:"#E6007A"},
  {symbol:"MATICUSDT",name:"Polygon",short:"MATIC",color:"#8247E5"},
  {symbol:"LINKUSDT",name:"Chainlink",short:"LINK",color:"#2A5ADA"},
  {symbol:"LTCUSDT",name:"Litecoin",short:"LTC",color:"#BFBBBB"},
  {symbol:"UNIUSDT",name:"Uniswap",short:"UNI",color:"#FF007A"},
  {symbol:"ATOMUSDT",name:"Cosmos",short:"ATOM",color:"#6F7390"},
  {symbol:"NEARUSDT",name:"NEAR Protocol",short:"NEAR",color:"#00C08B"},
  {symbol:"ARBUSDT",name:"Arbitrum",short:"ARB",color:"#12AAFF"},
  {symbol:"OPUSDT",name:"Optimism",short:"OP",color:"#FF0420"},
  {symbol:"APTUSDT",name:"Aptos",short:"APT",color:"#1FD1EC"},
  {symbol:"SUIUSDT",name:"Sui",short:"SUI",color:"#6FBCF0"},
  {symbol:"TRXUSDT",name:"TRON",short:"TRX",color:"#EF0027"},
  {symbol:"SHIBUSDT",name:"Shiba Inu",short:"SHIB",color:"#FFA409"},
  {symbol:"PEPEUSDT",name:"Pepe",short:"PEPE",color:"#00B300"},
  {symbol:"INJUSDT",name:"Injective",short:"INJ",color:"#00C2FF"},
  {symbol:"FETUSDT",name:"Fetch.ai",short:"FET",color:"#1A6CFF"},
  {symbol:"RENDERUSDT",name:"Render",short:"RNDR",color:"#FF4D00"},
  {symbol:"WLDUSDT",name:"Worldcoin",short:"WLD",color:"#8B5CF6"},
  {symbol:"TIAUSDT",name:"Celestia",short:"TIA",color:"#7B2BF9"},
  {symbol:"SANDUSDT",name:"The Sandbox",short:"SAND",color:"#00ADEF"},
  {symbol:"MANAUSDT",name:"Decentraland",short:"MANA",color:"#FF2D55"},
  {symbol:"AXSUSDT",name:"Axie Infinity",short:"AXS",color:"#0055D5"},
  {symbol:"GALAUSDT",name:"Gala",short:"GALA",color:"#BB86FC"},
  {symbol:"ICPUSDT",name:"Internet Computer",short:"ICP",color:"#3B00B9"},
  {symbol:"XLMUSDT",name:"Stellar",short:"XLM",color:"#7B93B3"},
  {symbol:"VETUSDT",name:"VeChain",short:"VET",color:"#15BDFF"},
  {symbol:"HBARUSDT",name:"Hedera",short:"HBAR",color:"#00C7B5"},
  {symbol:"ALGOUSDT",name:"Algorand",short:"ALGO",color:"#FFFFFF"},
  {symbol:"FTMUSDT",name:"Fantom",short:"FTM",color:"#1969FF"},
  {symbol:"AAVEUSDT",name:"Aave",short:"AAVE",color:"#B6509E"},
  {symbol:"MKRUSDT",name:"Maker",short:"MKR",color:"#1AAB9B"},
  {symbol:"CRVUSDT",name:"Curve DAO",short:"CRV",color:"#FF0000"},
  {symbol:"SUSHIUSDT",name:"SushiSwap",short:"SUSHI",color:"#FA52A0"},
  {symbol:"CHZUSDT",name:"Chiliz",short:"CHZ",color:"#CD0124"},
  {symbol:"FILUSDT",name:"Filecoin",short:"FIL",color:"#0090FF"},
  {symbol:"KAVAUSDT",name:"Kava",short:"KAVA",color:"#FF564F"},
  {symbol:"COMPUSDT",name:"Compound",short:"COMP",color:"#00D395"},
  {symbol:"SNXUSDT",name:"Synthetix",short:"SNX",color:"#00D1FF"},
  {symbol:"BATUSDT",name:"Basic Attention",short:"BAT",color:"#FF5000"},
  {symbol:"EOSUSDT",name:"EOS",short:"EOS",color:"#4e9fe5"},
  {symbol:"THETAUSDT",name:"Theta Network",short:"THETA",color:"#2AB8E6"},
  {symbol:"ZILUSDT",name:"Zilliqa",short:"ZIL",color:"#49C1BF"},
  {symbol:"ENSUSDT",name:"ENS",short:"ENS",color:"#5298FF"},
  {symbol:"GMTUSDT",name:"STEPN",short:"GMT",color:"#D9C246"},
  {symbol:"APEUSDT",name:"ApeCoin",short:"APE",color:"#0054F9"},
  {symbol:"STXUSDT",name:"Stacks",short:"STX",color:"#5546FF"},
  {symbol:"1INCHUSDT",name:"1inch",short:"1INCH",color:"#94A6C3"},
  {symbol:"YFIUSDT",name:"Yearn Finance",short:"YFI",color:"#006AE3"},
  {symbol:"ZRXUSDT",name:"0x Protocol",short:"ZRX",color:"#888"},
  {symbol:"EGLDUSDT",name:"MultiversX",short:"EGLD",color:"#1B46C2"},
  {symbol:"IOTAUSDT",name:"IOTA",short:"IOTA",color:"#aaa"},
  {symbol:"GMXUSDT",name:"GMX",short:"GMX",color:"#4FC2F7"},
  {symbol:"DYDXUSDT",name:"dYdX",short:"DYDX",color:"#6966FF"},
];

const fmt=(n,d=2)=>{const num=parseFloat(n);if(isNaN(num))return"—";if(num>=1000)return num.toLocaleString("en-US",{maximumFractionDigits:2});if(num>=1)return num.toFixed(d);if(num>=0.01)return num.toFixed(4);return num.toFixed(8);};
const fmtVol=v=>{const n=parseFloat(v);if(isNaN(n)||n===0)return"—";if(n>=1e9)return(n/1e9).toFixed(2)+"B";if(n>=1e6)return(n/1e6).toFixed(2)+"M";if(n>=1e3)return(n/1e3).toFixed(2)+"K";return n.toFixed(2);};

async function callClaude(messages,system){
  const r=await fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json","x-api-key":API_KEY,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system,messages}),
  });
  const d=await r.json();
  if(d.error)throw new Error(d.error.message);
  return d.content?.map(b=>b.text||"").join("")||"No response.";
}

const QA_SYS=`You are BNex — a Binance crypto knowledge assistant built by TechCraft & Coding By Wisdom. Answer questions about crypto, blockchain, DeFi, NFTs, Web3, trading, Binance features clearly and helpfully. Use emojis to organize. For investment topics, remind users to do their own research.`;

const getAnalyzerSys=(coins)=>`You are BNex Analyzer — an elite crypto trading analyst by TechCraft & Coding By Wisdom. You have live Binance market data:

${coins.filter(c=>c.lastPrice).map(c=>`• ${c.name}(${c.short}): $${fmt(c.lastPrice)} | ${parseFloat(c.priceChangePercent||0).toFixed(2)}% 24h | High $${fmt(c.highPrice)} | Low $${fmt(c.lowPrice)} | Vol $${fmtVol(c.quoteVolume)}`).join("\n")}

Analyze carefully, give SAFE conservative recommendations, always highlight risk management (stop losses, position sizing). End with "⚠️ Not financial advice. Always DYOR."`;

function CoinBadge({coin,size=38}){
  return(
    <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:`${coin.color}20`,border:`2px solid ${coin.color}50`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.27,fontWeight:800,color:coin.color,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:0.3}}>
      {coin.short.slice(0,4)}
    </div>
  );
}

function Dots({label="Thinking"}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:7,padding:"10px 14px"}}>
      <div style={{display:"flex",gap:4}}>
        {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#ffd700",animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
      </div>
      <span style={{color:"#555",fontSize:12}}>{label}...</span>
    </div>
  );
}

function Bubble({msg}){
  const u=msg.role==="user";
  return(
    <div style={{display:"flex",justifyContent:u?"flex-end":"flex-start",marginBottom:12,animation:"fadeUp 0.25s ease"}}>
      {!u&&<div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#ffd700,#ff8c00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:"#000",marginRight:8,flexShrink:0,marginTop:2,fontFamily:"'Bebas Neue',sans-serif"}}>BN</div>}
      <div style={{maxWidth:"80%",background:u?"linear-gradient(135deg,#ffd700,#ff8c00)":"rgba(255,255,255,0.05)",color:u?"#000":"#ddd",padding:"10px 14px",fontSize:13,lineHeight:1.65,borderRadius:u?"16px 16px 4px 16px":"16px 16px 16px 4px",border:u?"none":"1px solid rgba(255,215,0,0.08)",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{msg.content}</div>
    </div>
  );
}

function TradingTab({prices,loading,onSelect,selected}){
  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("volume");
  const coins=COIN_LIST.map(c=>({...c,...(prices[c.symbol]||{})}))
    .filter(c=>!search||c.name.toLowerCase().includes(search.toLowerCase())||c.short.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
      if(sort==="volume")return(parseFloat(b.quoteVolume)||0)-(parseFloat(a.quoteVolume)||0);
      if(sort==="change")return(parseFloat(b.priceChangePercent)||0)-(parseFloat(a.priceChangePercent)||0);
      if(sort==="price")return(parseFloat(b.lastPrice)||0)-(parseFloat(a.lastPrice)||0);
      return 0;
    });
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      <div style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0}}>
        <div style={{display:"flex",gap:8,marginBottom:7,alignItems:"center"}}>
          <div style={{flex:1,display:"flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"6px 11px"}}>
            <span style={{color:"#444",fontSize:13}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{flex:1,background:"none",border:"none",color:"#ddd",fontSize:12,fontFamily:"'IBM Plex Mono',monospace",outline:"none"}}/>
          </div>
          {loading&&<div style={{color:"#ffd700",fontSize:9,display:"flex",alignItems:"center",gap:3,flexShrink:0}}><div style={{width:5,height:5,borderRadius:"50%",background:"#ffd700",animation:"bounce 1s infinite"}}/>LIVE</div>}
        </div>
        <div style={{display:"flex",gap:5}}>
          {[["volume","📊 Vol"],["change","📈 Chg"],["price","💲 Price"]].map(([k,l])=>(
            <button key={k} onClick={()=>setSort(k)} style={{padding:"3px 10px",borderRadius:20,fontSize:10,background:sort===k?"#ffd700":"rgba(255,255,255,0.04)",color:sort===k?"#000":"#555",border:sort===k?"1px solid #ffd700":"1px solid rgba(255,255,255,0.07)",fontFamily:"'IBM Plex Mono',monospace",fontWeight:sort===k?700:400}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"4px 8px"}}>
        {coins.map((coin,i)=>{
          const chg=parseFloat(coin.priceChangePercent)||0;
          const pos=chg>=0;
          const sel=selected?.symbol===coin.symbol;
          return(
            <div key={coin.symbol} onClick={()=>onSelect(coin)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 9px",borderRadius:9,marginBottom:3,cursor:"pointer",background:sel?"rgba(255,215,0,0.07)":"rgba(255,255,255,0.02)",border:sel?"1px solid rgba(255,215,0,0.25)":"1px solid rgba(255,255,255,0.04)",transition:"all 0.12s",animation:`fadeUp 0.3s ease ${i*0.01}s both`}}
              onMouseEnter={e=>{if(!sel)e.currentTarget.style.background="rgba(255,255,255,0.04)";}}
              onMouseLeave={e=>{if(!sel)e.currentTarget.style.background="rgba(255,255,255,0.02)";}}>
              <CoinBadge coin={coin} size={36}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{color:"#e0e0e0",fontSize:12.5,fontWeight:700}}>{coin.short}</span>
                  <span style={{color:"#3a3a3a",fontSize:9.5,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{coin.name}</span>
                </div>
                <div style={{color:"#333",fontSize:9.5,marginTop:1}}>Vol: <span style={{color:"#555"}}>${fmtVol(coin.quoteVolume)}</span></div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{color:"#ddd",fontSize:12.5,fontWeight:700}}>{coin.lastPrice?`$${fmt(coin.lastPrice)}`:"—"}</div>
                <div style={{fontSize:10,fontWeight:700,marginTop:2,color:pos?"#2ed573":"#ff4757",background:pos?"rgba(46,213,115,0.1)":"rgba(255,71,87,0.1)",padding:"1px 5px",borderRadius:3,display:"inline-block"}}>
                  {pos?"▲":"▼"}{Math.abs(chg).toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CoinDetail({coin,onAnalyze,onClose}){
  if(!coin)return(
    <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:"#222",fontSize:12,flexDirection:"column",gap:8}}>
      <div style={{fontSize:32}}>👆</div>
      <div>Tap a coin to view details</div>
    </div>
  );
  const chg=parseFloat(coin.priceChangePercent)||0;
  const pos=chg>=0;
  const stats=[["24h High",`$${fmt(coin.highPrice)}`],["24h Low",`$${fmt(coin.lowPrice)}`],["24h Volume",`$${fmtVol(coin.quoteVolume)}`],["24h Change $",`${pos?"+":""}$${fmt(Math.abs(parseFloat(coin.priceChange)||0))}`],["Open Price",`$${fmt(coin.openPrice)}`],["# of Trades",parseInt(coin.count||0).toLocaleString()]];
  return(
    <div style={{padding:"14px",overflowY:"auto",flex:1}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <CoinBadge coin={coin} size={46}/>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:"#e0e0e0",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1}}>{coin.name}</div>
            <div style={{color:"#444",fontSize:10}}>{coin.short}/USDT • BINANCE</div>
          </div>
        </div>
        <button onClick={onClose} style={{background:"none",color:"#444",fontSize:16,padding:"4px 8px",borderRadius:6}}>✕</button>
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,215,0,0.08)",borderRadius:11,padding:"14px",marginBottom:11,textAlign:"center"}}>
        <div style={{fontSize:28,fontWeight:900,color:"#ffd700",fontFamily:"'Bebas Neue',sans-serif",letterSpacing:1}}>${fmt(coin.lastPrice)}</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:4,marginTop:4,fontSize:13,fontWeight:700,color:pos?"#2ed573":"#ff4757",background:pos?"rgba(46,213,115,0.1)":"rgba(255,71,87,0.1)",padding:"3px 13px",borderRadius:20}}>
          {pos?"▲":"▼"} {Math.abs(chg).toFixed(2)}% (24h)
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:12}}>
        {stats.map(([l,v])=>(
          <div key={l} style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:8,padding:"9px 11px"}}>
            <div style={{color:"#3a3a3a",fontSize:9,letterSpacing:0.5,marginBottom:3}}>{l.toUpperCase()}</div>
            <div style={{color:"#ccc",fontSize:12,fontWeight:600}}>{v}</div>
          </div>
        ))}
      </div>
      <button onClick={()=>onAnalyze(coin)} style={{width:"100%",padding:"12px",borderRadius:10,background:"linear-gradient(135deg,#ffd700,#ff8c00)",color:"#000",fontSize:13,fontWeight:800,fontFamily:"'IBM Plex Mono',monospace",boxShadow:"0 4px 18px rgba(255,215,0,0.3)",border:"none"}}>
        🤖 Analyze with BNex AI
      </button>
      <div style={{color:"#222",fontSize:9,textAlign:"center",marginTop:7}}>Not financial advice. Always DYOR.</div>
    </div>
  );
}

function QuestionsTab(){
  const [msgs,setMsgs]=useState([{role:"assistant",content:"👋 Hey! I'm BNex — your crypto knowledge hub.\n\nAsk me anything about crypto, DeFi, trading, Binance features, tokenomics, NFTs, or Web3. I'm here to help! 🚀"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);
  const send=async(t)=>{
    const txt=t||input.trim();
    if(!txt||loading)return;
    setInput("");
    const next=[...msgs,{role:"user",content:txt}];
    setMsgs(next);setLoading(true);
    try{const r=await callClaude(next.map(m=>({role:m.role,content:m.content})),QA_SYS);setMsgs(p=>[...p,{role:"assistant",content:r}]);}
    catch(e){setMsgs(p=>[...p,{role:"assistant",content:"⚠️ "+e.message}]);}
    setLoading(false);
  };
  const SUGG=["What is DeFi and how does it work?","How do I use Binance Launchpad?","Explain impermanent loss","What's Layer 2 scaling?","How do I safely store my crypto?"];
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
        {msgs.map((m,i)=><Bubble key={i} msg={m}/>)}
        {loading&&<Dots label="BNex is thinking"/>}
        {msgs.length===1&&(
          <div style={{marginTop:10}}>
            <div style={{color:"#2a2a2a",fontSize:9.5,letterSpacing:2,marginBottom:7}}>SUGGESTIONS</div>
            {SUGG.map((s,i)=><button key={i} onClick={()=>send(s)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",borderRadius:8,marginBottom:5,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.055)",color:"#777",fontSize:11.5,fontFamily:"'IBM Plex Mono',monospace"}}>{s}</button>)}
          </div>
        )}
        <div ref={ref}/>
      </div>
      <div style={{padding:"9px 12px 13px",borderTop:"1px solid rgba(255,215,0,0.07)",flexShrink:0}}>
        <div style={{display:"flex",gap:7,alignItems:"flex-end"}}>
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask anything about crypto..." rows={1}
            style={{flex:1,background:"rgba(255,255,255,0.04)",border:`1px solid ${input?"rgba(255,215,0,0.35)":"rgba(255,255,255,0.08)"}`,borderRadius:9,padding:"9px 12px",color:"#e0e0e0",fontSize:13,resize:"none",fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.5,outline:"none"}}
            onInput={e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,100)+"px";}}/>
          <button onClick={()=>send()} disabled={loading||!input.trim()} style={{width:40,height:40,borderRadius:9,flexShrink:0,background:loading||!input.trim()?"rgba(255,215,0,0.07)":"linear-gradient(135deg,#ffd700,#ff8c00)",color:loading||!input.trim()?"#333":"#000",fontSize:15,border:"none",boxShadow:!loading&&input.trim()?"0 0 12px rgba(255,215,0,0.3)":"none"}}>{loading?"⏳":"▶"}</button>
        </div>
      </div>
    </div>
  );
}

function FloatingBot({allCoins,preload,onClearPreload}){
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const ref=useRef(null);
  const sentRef=useRef(false);

  useEffect(()=>{ref.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  useEffect(()=>{
    if(preload&&!sentRef.current){
      setOpen(true);
      sentRef.current=true;
      const txt=`Analyze ${preload.name} (${preload.short}) for me. Current price: $${fmt(preload.lastPrice)}, 24h change: ${parseFloat(preload.priceChangePercent||0).toFixed(2)}%, volume: $${fmtVol(preload.quoteVolume)}. Is it safe to trade now? What's your recommendation?`;
      const next=[{role:"user",content:txt}];
      setMsgs(next);
      onClearPreload();
      callClaude(next.map(m=>({role:m.role,content:m.content})),getAnalyzerSys(allCoins))
        .then(r=>{setMsgs(p=>[...p,{role:"assistant",content:r}]);setLoading(false);})
        .catch(e=>{setMsgs(p=>[...p,{role:"assistant",content:"⚠️ "+e.message}]);setLoading(false);});
      setLoading(true);
    }
    if(!preload)sentRef.current=false;
  },[preload]);

  const send=async(t)=>{
    const txt=t||input.trim();
    if(!txt||loading)return;
    setInput("");
    const next=[...msgs,{role:"user",content:txt}];
    setMsgs(next);setLoading(true);
    try{const r=await callClaude(next.map(m=>({role:m.role,content:m.content})),getAnalyzerSys(allCoins));setMsgs(p=>[...p,{role:"assistant",content:r}]);}
    catch(e){setMsgs(p=>[...p,{role:"assistant",content:"⚠️ "+e.message}]);}
    setLoading(false);
  };

  const SUGG=["Which coin has the best momentum right now?","What are the riskiest coins today?","Give me a safe trading plan for today","Which coins are oversold?"];

  return(
    <>
      {!open&&(
        <button onClick={()=>setOpen(true)} style={{position:"fixed",bottom:20,right:16,zIndex:100,width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#ffd700,#ff8c00)",border:"none",fontSize:22,boxShadow:"0 4px 22px rgba(255,215,0,0.5)",animation:"floatPulse 2s ease-in-out infinite",color:"#000"}}>🤖</button>
      )}
      {open&&(
        <div style={{position:"fixed",bottom:14,right:12,zIndex:100,width:"min(92vw,370px)",height:"min(84vh,560px)",background:"#0d0d0d",border:"1px solid rgba(255,215,0,0.18)",borderRadius:17,display:"flex",flexDirection:"column",boxShadow:"0 20px 60px rgba(0,0,0,0.85)",animation:"slideUp 0.28s ease",overflow:"hidden"}}>
          <div style={{padding:"11px 13px",borderBottom:"1px solid rgba(255,215,0,0.09)",background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#ffd700,#ff8c00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:"#000",fontFamily:"'Bebas Neue',sans-serif",boxShadow:"0 0 10px rgba(255,215,0,0.35)"}}>BN</div>
              <div>
                <div style={{color:"#ffd700",fontSize:12.5,fontWeight:700}}>BNex Analyzer</div>
                <div style={{color:"#3a3a3a",fontSize:9}}>{allCoins.filter(c=>c.lastPrice).length} coins loaded • Live data</div>
              </div>
            </div>
            <div style={{display:"flex",gap:5}}>
              {msgs.length>0&&<button onClick={()=>setMsgs([])} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",color:"#444",padding:"2px 8px",borderRadius:5,fontSize:9,fontFamily:"'IBM Plex Mono',monospace"}}>CLEAR</button>}
              <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",color:"#444",fontSize:17,padding:"0 4px"}}>✕</button>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"11px"}}>
            {msgs.length===0&&(
              <div style={{color:"#2a2a2a",textAlign:"center",paddingTop:24,fontSize:12}}>
                <div style={{fontSize:30,marginBottom:9}}>🤖</div>
                <div style={{color:"#3a3a3a",marginBottom:5}}>BNex Analyzer ready</div>
                <div style={{fontSize:10.5,lineHeight:1.6,color:"#2a2a2a",marginBottom:14}}>Select a coin → "Analyze with BNex AI"<br/>or ask me anything about the market</div>
                {SUGG.map((s,i)=><button key={i} onClick={()=>send(s)} style={{display:"block",width:"100%",textAlign:"left",padding:"7px 11px",borderRadius:7,marginBottom:5,background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.05)",color:"#666",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}>{s}</button>)}
              </div>
            )}
            {msgs.map((m,i)=><Bubble key={i} msg={m}/>)}
            {loading&&<Dots label="Analyzing market"/>}
            <div ref={ref}/>
          </div>
          <div style={{padding:"7px 10px 11px",borderTop:"1px solid rgba(255,215,0,0.07)",flexShrink:0}}>
            <div style={{display:"flex",gap:6,alignItems:"flex-end"}}>
              <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask about any coin..." rows={1}
                style={{flex:1,background:"rgba(255,255,255,0.04)",border:`1px solid ${input?"rgba(255,215,0,0.3)":"rgba(255,255,255,0.07)"}`,borderRadius:8,padding:"8px 11px",color:"#ddd",fontSize:12,resize:"none",fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.5,outline:"none"}}
                onInput={e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,88)+"px";}}/>
              <button onClick={()=>send()} disabled={loading||!input.trim()} style={{width:36,height:36,borderRadius:8,flexShrink:0,background:loading||!input.trim()?"rgba(255,215,0,0.06)":"linear-gradient(135deg,#ffd700,#ff8c00)",color:loading||!input.trim()?"#333":"#000",fontSize:13,border:"none"}}>{loading?"⏳":"▶"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function BNexApp(){
  const [tab,setTab]=useState("trading");
  const [prices,setPrices]=useState({});
  const [priceLoading,setPriceLoading]=useState(true);
  const [selected,setSelected]=useState(null);
  const [analyzeTarget,setAnalyzeTarget]=useState(null);
  const [lastUpdated,setLastUpdated]=useState(null);

  const fetchPrices=useCallback(async()=>{
    try{
      const syms=COIN_LIST.map(c=>`"${c.symbol}"`).join(",");
      const r=await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=[${syms}]`);
      const data=await r.json();
      if(Array.isArray(data)){const m={};data.forEach(d=>{m[d.symbol]=d;});setPrices(m);setLastUpdated(new Date());}
    }catch(e){console.error("Price fetch error",e);}
    finally{setPriceLoading(false);}
  },[]);

  useEffect(()=>{fetchPrices();const iv=setInterval(fetchPrices,10000);return()=>clearInterval(iv);},[fetchPrices]);

  const allCoins=COIN_LIST.map(c=>({...c,...(prices[c.symbol]||{})}));

  return(
    <div style={{height:"100vh",background:"#080808",fontFamily:"'IBM Plex Mono','Courier New',monospace",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Bebas+Neue&display=swap');
        @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowPulse{0%,100%{text-shadow:0 0 14px rgba(255,215,0,0.4)}50%{text-shadow:0 0 28px rgba(255,215,0,0.8)}}
        @keyframes floatPulse{0%,100%{box-shadow:0 4px 22px rgba(255,215,0,0.5),0 0 0 0 rgba(255,215,0,0)}50%{box-shadow:0 4px 22px rgba(255,215,0,0.5),0 0 0 8px rgba(255,215,0,0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#0a0a0a}::-webkit-scrollbar-thumb{background:#1e1e1e;border-radius:2px}
        textarea:focus,input:focus{outline:none}
        button{cursor:pointer;transition:all 0.15s;border:none}button:hover{opacity:0.85}
        a{text-decoration:none}
      `}</style>

      {/* WATERMARK */}
      <div style={{background:"rgba(3,3,3,0.98)",borderBottom:"1px solid rgba(255,215,0,0.06)",padding:"5px 12px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,zIndex:30}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:24,height:24,borderRadius:"50%",overflow:"hidden",border:"1.5px solid rgba(255,215,0,0.3)",flexShrink:0}}>
            <img src={PROFILE_IMG} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
          <span style={{fontSize:9.5,color:"#555"}}><span style={{color:"#ffd700",fontWeight:700}}>TechCraft</span> &amp; Coding By <span style={{color:"#ffd700",fontWeight:700}}>Wisdom</span></span>
        </div>
        <a href="https://www.instagram.com/kingswisdom935?igsh=NGlhNjh2eW8wdDVt" target="_blank" rel="noopener noreferrer"
          style={{display:"flex",alignItems:"center",gap:4,padding:"2px 9px",borderRadius:20,border:"1px solid rgba(255,255,255,0.06)",color:"#555",fontSize:9.5}}
          onMouseEnter={e=>{e.currentTarget.style.color="#ffd700";e.currentTarget.style.borderColor="rgba(255,215,0,0.25)";}}
          onMouseLeave={e=>{e.currentTarget.style.color="#555";e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";}}>
          📩 Inquiries <span style={{color:"#ffd700",fontWeight:700,textDecoration:"underline"}}>click here</span>
        </a>
      </div>

      {/* HEADER */}
      <div style={{padding:"8px 13px",borderBottom:"1px solid rgba(255,215,0,0.09)",background:"rgba(0,0,0,0.85)",backdropFilter:"blur(14px)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#ffd700,#ff8c00)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:900,color:"#000",fontFamily:"'Bebas Neue',sans-serif",boxShadow:"0 0 14px rgba(255,215,0,0.35)"}}>BN</div>
          <div>
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:21,color:"#ffd700",letterSpacing:2,animation:"glowPulse 3s ease-in-out infinite",lineHeight:1}}>BNex AI</div>
            <div style={{fontSize:8,color:"#333",letterSpacing:1.2}}>BINANCE INTELLIGENCE SUITE</div>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{display:"flex",alignItems:"center",gap:4,justifyContent:"flex-end"}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:"#2ed573",boxShadow:"0 0 5px #2ed573"}}/>
            <span style={{color:"#2ed573",fontSize:9}}>LIVE</span>
            <span style={{color:"#2a2a2a",fontSize:9}}>• {COIN_LIST.length} coins</span>
          </div>
          {lastUpdated&&<div style={{color:"#222",fontSize:8,marginTop:1}}>Updated {lastUpdated.toLocaleTimeString()}</div>}
        </div>
      </div>

      {/* TABS */}
      <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)",background:"rgba(0,0,0,0.6)",flexShrink:0}}>
        {[["trading","📊","Trading"],["questions","💬","Ask Questions"]].map(([id,icon,label])=>(
          <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"10px 0",fontSize:12,background:tab===id?"rgba(255,215,0,0.06)":"transparent",color:tab===id?"#ffd700":"#3a3a3a",borderBottom:tab===id?"2px solid #ffd700":"2px solid transparent",fontFamily:"'IBM Plex Mono',monospace",fontWeight:tab===id?700:400,letterSpacing:0.3}}>
            {icon} {label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        {tab==="trading"?(
          <div style={{flex:1,overflow:"hidden",display:"flex"}}>
            <div style={{width:selected?"48%":"100%",borderRight:selected?"1px solid rgba(255,255,255,0.05)":"none",display:"flex",flexDirection:"column",overflow:"hidden",transition:"width 0.2s"}}>
              <TradingTab prices={prices} loading={priceLoading} onSelect={setSelected} selected={selected}/>
            </div>
            {selected&&(
              <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                <CoinDetail coin={{...selected,...(prices[selected.symbol]||{})}} onAnalyze={c=>setAnalyzeTarget({...c,...(prices[c.symbol]||{})})} onClose={()=>setSelected(null)}/>
              </div>
            )}
          </div>
        ):(
          <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
            <QuestionsTab/>
          </div>
        )}
      </div>

      <FloatingBot allCoins={allCoins} preload={analyzeTarget} onClearPreload={()=>setAnalyzeTarget(null)}/>
    </div>
  );
}
