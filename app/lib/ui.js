// Shared inline CSS for server-rendered customer pages. Mirrors the site's chamfered flat-amber system.
export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,900&family=Archivo:wght@400;600;800&family=DM+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@500;600;700&display=swap');
body{background:#141414!important;margin:0}
.kc{--ink:#141414;--paper:#F5F3F0;--amber:#F59E0B;--bone:#E8E4DE;--mute:#9b948a;--line:rgba(255,255,255,.14);
 min-height:100vh;background:#141414;color:#E8E4DE;font-family:'DM Sans',sans-serif;-webkit-text-size-adjust:100%}
.kc *{box-sizing:border-box}
.kc .wrap{max-width:720px;margin:0 auto;padding:20px 16px 70px}
.kc .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.kc .top a{text-decoration:none}
.kc .tel{font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:12px;letter-spacing:.1em;color:var(--amber)}
.kc h1{font-family:'Archivo',sans-serif;font-weight:900;font-stretch:125%;font-size:clamp(28px,8vw,42px);line-height:1.05;margin:8px 0 8px;color:var(--paper)}
.kc h1 span{color:var(--amber)}
.kc .sub{color:#cfc8bd;margin:0 0 22px;font-size:16px;line-height:1.5}
.kc .step{--ch:18px;position:relative;isolation:isolate;background:#3b3b3b;padding:19px 17px;margin-bottom:14px;clip-path:polygon(var(--ch) 0,100% 0,100% calc(100% - var(--ch)),calc(100% - var(--ch)) 100%,0 100%,0 var(--ch))}
.kc .step::before{content:'';position:absolute;inset:1px;z-index:-1;background:linear-gradient(#1b1b1b,#131313);box-shadow:inset 0 1px 0 rgba(255,255,255,.1);clip-path:polygon(17px 0,100% 0,100% calc(100% - 17px),calc(100% - 17px) 100%,0 100%,0 17px)}
.kc .step h2{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--bone);margin:0 0 14px;font-weight:600;border-left:3px solid var(--amber);padding:2px 0 2px 10px}
.kc .big{font-family:'Archivo',sans-serif;font-weight:900;font-stretch:125%;font-size:clamp(28px,8.5vw,42px);color:var(--amber);line-height:1.1}
.kc .meta{color:var(--mute);font-size:14px;margin-top:8px;line-height:1.5}
.kc p{line-height:1.6;margin:0 0 10px}
.kc ol,.kc ul{margin:0;padding-left:20px;line-height:1.6}
.kc li{margin-bottom:8px}
.kc .fine{color:var(--mute);font-size:12px;line-height:1.5;margin-top:10px}
.kc .btn{--ch:8px;display:block;text-align:center;text-decoration:none;font-family:'IBM Plex Mono',monospace;font-weight:700;font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding:16px 22px;margin-top:10px;background:var(--amber);color:var(--ink);clip-path:polygon(var(--ch) 0,100% 0,100% calc(100% - var(--ch)),calc(100% - var(--ch)) 100%,0 100%,0 var(--ch));box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}
.kc .btn.ghost{position:relative;isolation:isolate;background:rgba(245,240,230,.4);color:var(--bone);box-shadow:none}
.kc .btn.ghost::before{content:'';position:absolute;inset:1.5px;z-index:-1;background:linear-gradient(#262626,#181818);box-shadow:inset 0 1px 0 rgba(255,255,255,.12);clip-path:polygon(calc(var(--ch) - 1px) 0,100% 0,100% calc(100% - var(--ch) + 1px),calc(100% - var(--ch) + 1px) 100%,0 100%,0 calc(var(--ch) - 1px))}
@media (hover:hover){.kc .btn:not(.ghost):hover{background:var(--paper)}.kc .btn.ghost:hover{background:var(--amber);color:var(--bone)}}
.kc table{width:100%;border-collapse:collapse;font-size:15px}
.kc td{padding:9px 0;border-bottom:1px solid var(--line);vertical-align:top}
.kc td:first-child{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);width:38%;padding-right:10px}
.kc .gal{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.kc .gal img{width:100%;display:block;aspect-ratio:4/3;object-fit:cover;background:#0e0e0d}
.kc .gal img:first-child:nth-last-child(odd){grid-column:1/-1;aspect-ratio:16/10}
`;
export const LOGO = '/kowalski-lockup.png';
