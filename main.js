const cars=[
  {
    "y": "1973",
    "n": "Carrera RS 2.7",
    "d": "Ducktail spoiler and matching numbers. A rare survivor in Grand Prix White.",
    "l": "San Diego, CA",
    "p": "$489,000",
    "c": "#e9aca1",
    "f": "#f5f5f2",
    "t": "#1d1b16",
    "cut": "carrera-rs-2-7.webp",
    "pc": "#c8402c",
    "pt": "#ffffff",
    "ar": 2.229
  },
  {
    "y": "2021",
    "n": "Targa Restomod",
    "d": "Hand-built air-cooled flat-six, bespoke ice-blue paint and a fresh leather interior.",
    "l": "London, UK",
    "p": "$412,000",
    "c": "#f5dc98",
    "f": "#f5f5f2",
    "t": "#1d1b16",
    "cut": "targa-restomod.webp",
    "pc": "#e6b54a",
    "pt": "#1d1b16",
    "ar": 2.227
  },
  {
    "y": "1991",
    "n": "964 Widebody",
    "d": "Wide arches, big wing and a track-tuned chassis. The number 79 stays on the doors.",
    "l": "Tokyo, JP",
    "p": "$268,000",
    "c": "#a3c8bb",
    "f": "#f5f5f2",
    "t": "#1d1b16",
    "cut": "964-widebody.webp",
    "pc": "#24574a",
    "pt": "#ffffff",
    "ar": 3.287
  },
  {
    "y": "2012",
    "n": "CTR Clubsport",
    "d": "Carbon wing, widebody kit and a track-tuned engine. Built for the circuit, plated for the road.",
    "l": "Munich, DE",
    "p": "$575,000",
    "c": "#b6a9d3",
    "f": "#f5f5f2",
    "t": "#1d1b16",
    "cut": "ctr-clubsport.webp",
    "pc": "#3a2b57",
    "pt": "#ffffff",
    "ar": 1.823
  }
];
const R=document.documentElement,$=id=>document.getElementById(id),hero=$("hero"),car=$("car"),img=$("carimg");
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
let idx=-1,cur=0,mx=0,my=0,cx=0,cy=0;
function fill(n){idx=n;const k=cars[n],sw=[...document.querySelectorAll(".swap")];sw.forEach(e=>e.classList.add("o"));
 img.src=k.cut;R.style.setProperty("--c",k.c);R.style.setProperty("--f",k.f);R.style.setProperty("--t",k.t);
 setTimeout(()=>{$("year").textContent=k.y;$("name").innerHTML="<b>"+k.n+"</b>";$("desc").textContent=k.d;$("loc").innerHTML="<b>Currently in</b>"+k.l;$("cnt").textContent="0"+(n+1)+" / 0"+cars.length;sw.forEach(e=>e.classList.remove("o"))},250)}
const span=()=>hero.offsetHeight-innerHeight;
const toCar=n=>scrollTo({top:hero.offsetTop+((n+.5)/cars.length)*span(),behavior:"smooth"});
$("next").onclick=()=>toCar((idx+1)%cars.length);$("prev").onclick=()=>toCar((idx+cars.length-1)%cars.length);
addEventListener("keydown",e=>{if(scrollY>hero.offsetTop+hero.offsetHeight)return;if(["ArrowDown","ArrowRight"].includes(e.key)){e.preventDefault();toCar((idx+1)%cars.length)}if(["ArrowUp","ArrowLeft"].includes(e.key)){e.preventDefault();toCar((idx+cars.length-1)%cars.length)}});
addEventListener("pointermove",e=>{mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1},{passive:true});
$("list").innerHTML=cars.map((k,n)=>`<div class="row" data-car="${n}" tabindex="0"><span class="y">${k.y}</span><img class="th" src="${k.cut}" alt="" loading="lazy" style="background:${k.pc}"><span class="n">${k.n}<small>${k.l}</small></span><span class="pr">${k.p}</span></div>`).join("");
document.querySelectorAll(".row").forEach(r=>r.onclick=()=>toCar(+r.dataset.car));
const W=$("words");W.innerHTML=W.textContent.split(" ").map(w=>"<span>"+w+"</span>").join(" ");const ws=[...W.children];
const bp=$("bp"),bpp=[...bp.querySelectorAll("path,circle")],stats=$("stats");
const G=$("gallery"),track=$("gtrack");let gpos=0,gidx=-1;
track.innerHTML=cars.map((k,n)=>`<figure class="gc" style="--pc:${k.pc};--pt:${k.pt}"><div class="gbg"><span>${k.y}</span></div><span class="tg"><b>0${n+1}</b>${k.n}</span><img src="${k.cut}" alt="${k.n}"></figure>`).join("");
const gcs=[...track.children];const gtop=n=>G.offsetTop+(n/(cars.length-1))*(G.offsetHeight-innerHeight);
$("gdots").innerHTML=cars.map((k,n)=>`<button class="gd" aria-label="${k.n}"></button>`).join("");const gdots=[...$("gdots").children];gdots.forEach((d,n)=>d.onclick=()=>scrollTo({top:gtop(n),behavior:"smooth"}));
gcs.forEach((c,n)=>c.onclick=()=>scrollTo({top:gtop(n),behavior:"smooth"}));
function gfill(n){gidx=n;const k=cars[n],sw=[...G.querySelectorAll(".gsw")];G.style.setProperty("--gc",`color-mix(in srgb,${k.pc} 32%,#0e0d0b)`);G.style.setProperty("--gf","#0e0d0b");G.style.setProperty("--gt","#ffffff");sw.forEach(e=>e.classList.add("o"));
 setTimeout(()=>{$("gyear").textContent=k.y;$("gname").textContent=k.n;$("gdesc").textContent=k.d;$("gloc").textContent=k.l+"  ·  "+k.p;$("gcount").textContent="0"+(n+1)+" / 0"+cars.length;sw.forEach(e=>e.classList.remove("o"))},220);gdots.forEach((d,i)=>d.classList.toggle("on",i===n))}
gfill(0);
fill(0);
function frame(){
 const vh=innerHeight,r=hero.getBoundingClientRect();
 if(r.bottom>0&&r.top<vh){
  const raw=clamp(-r.top/span());cur=reduce?raw:cur+(raw-cur)*.085;const p=cur,n=Math.min(cars.length-1,Math.floor(p*cars.length)),t=p*cars.length-n;
  if(n!==idx)fill(n);
  const a=n===0?1:clamp(t/.22),b=n===cars.length-1?1:clamp((1-t)/.22),e=Math.min(ease(a),ease(b)),d=t<.5?-1:1;
  cx+=(mx-cx)*.06;cy+=(my-cy)*.06;
  car.style.opacity=e;
  car.style.transform=`translate3d(${d*(1-e)*30}vw,${-p*20}px,${e*80-80}px) rotateX(${-cy*4}deg) rotateY(${d*(1-e)*70+(t-.5)*22+cx*6}deg) scale(${.84+.16*e+t*.05})`;
  $("year").style.transform=`translate3d(${(p-.5)*-18}vw,${-p*90}px,0) scale(${1+p*.18})`;
  $("pbar").style.transform=`scaleY(${p})`;$("hint").style.opacity=clamp(1-p*10);
 }
 const wq=W.getBoundingClientRect(),wp=clamp((vh*.82-wq.top)/(wq.height+vh*.25));ws.forEach((w,i)=>w.classList.toggle("on",i<wp*ws.length*1.15));
 const bq=bp.getBoundingClientRect(),bpr=clamp((vh*.85-bq.top)/(vh*.5));bpp.forEach(x=>x.style.strokeDashoffset=1-bpr);bp.classList.toggle("done",bpr>.95);
 const sq=stats.getBoundingClientRect(),sp=clamp((vh*.9-sq.top)/(vh*.7));
 $("garc").style.strokeDashoffset=1-sp;$("needle").style.transform=`rotate(${-120+sp*240}deg)`;$("spd").textContent=Math.round(sp*240);
 const gq=G.getBoundingClientRect();
 if(gq.bottom>0&&gq.top<vh){const raw=clamp(-gq.top/(G.offsetHeight-vh))*(cars.length-1);gpos=reduce?raw:gpos+(raw-gpos)*.09;const cw=gcs[0].offsetWidth||600,nn=Math.round(gpos);if(nn!==gidx)gfill(nn);
  gcs.forEach((c,i)=>{const d=i-gpos,ad=Math.abs(d);c.style.transform=`translate(-50%,-50%) translate3d(${d*cw*.8}px,${ad*14}px,${-ad*300}px) rotateY(${clamp(-d*40,-68,68)}deg) scale(${1-ad*.06})`;c.style.opacity=clamp(1-ad*.4);c.style.zIndex=10-Math.round(ad)});
  $("gyear").style.transform=`translate3d(${-gpos*7}vw,0,0)`}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
const t=$("top");addEventListener("scroll",()=>t.classList.toggle("on",scrollY>40),{passive:true});
const cnt=el=>{const n=+el.dataset.n;let s0=null;const f=ts=>{s0=s0||ts;const q=Math.min((ts-s0)/1600,1);el.textContent=Math.round(n*(1-Math.pow(1-q,3)));if(q<1)requestAnimationFrame(f)};requestAnimationFrame(f)};
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");x.target.querySelectorAll("[data-n]").forEach(cnt);io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll(".rv").forEach((el,k)=>{el.style.transitionDelay=(k%3)*90+"ms";io.observe(el)});
