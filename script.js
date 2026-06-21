/* ===== 画作数据（5 张）=====
   图片放进 images/ 文件夹，命名为 1 / 2 / 3 / 4 / 5
   后缀 png、jpg、jpeg、webp 任意一种都可，会自动识别 */
const EXTS = ['png','jpg','jpeg','webp'];
const WORKS = [
  { base:'images/1', no:'壹', flower:'铃兰' },
  { base:'images/2', no:'贰', flower:'秋菊' },
  { base:'images/3', no:'叁', flower:'牡丹' },
  { base:'images/4', no:'肆', flower:'绣球' },
  { base:'images/5', no:'伍', flower:'桃花' },
];

function placeholder(src){
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">`+
    `<rect width="100%" height="100%" fill="#fcfbf7"/>`+
    `<rect x="620" y="300" width="360" height="360" rx="10" fill="none" stroke="#d8332a" stroke-width="14"/>`+
    `<text x="800" y="510" font-size="150" fill="#d8332a" text-anchor="middle" font-family="serif">花</text>`+
    `<text x="800" y="740" font-size="34" fill="#6f6a62" text-anchor="middle" font-family="serif">`+
    `请将此图存为 ${src}</text></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg);
}

/* ===================================================================
   图片四周的花朵纹样（与每张画的花卉呼应：牡丹/铃兰/秋菊/绣球/桃花）
=================================================================== */
const OPAL = {
  '牡丹':{ petal:'#f3a6b9', petal2:'#f8c8d4', edge:'#dd7e96', core:'#f6d98a', center:'#ec9a64', leaf:'#7fa86a' },
  '铃兰':{ bell:'#ffffff', bellEdge:'#cfe0bf', leaf:'#79a85e', edge:'#a9c79a' },
  '秋菊':{ petal:'#f7b653', petal2:'#fbcd7e', edge:'#e2872b', core:'#ef9d33', center:'#d9701f', leaf:'#8fae63' },
  '绣球':{ petal:'#cda7da', petal2:'#aebfe8', edge:'#9a82b8', core:'#f0e3a0', center:'#f0e3a0', leaf:'#7fa86a' },
  '桃花':{ petal:'#f8c6d6', petal2:'#fbd9e3', edge:'#ee9cb6', core:'#f4d889', center:'#f4d889', stamen:'#e0668c', branch:'#9a6a44', leaf:'#8db36b' },
};
function ring(n, cy, rx, ry, fill, stroke, sw, off=0){
  let s = '';
  for (let i=0;i<n;i++) s += `<ellipse cx="0" cy="${cy}" rx="${rx}" ry="${ry}" `+
    `transform="rotate(${i*360/n + off})" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
  return s;
}
const M = {
  '牡丹': p => `<g>${ring(10,-16,7,16,p.petal,p.edge,1)}${ring(8,-11,6.5,12,p.petal2,p.edge,1,22)}`+
              `${ring(6,-7,5.5,8,p.petal2,p.edge,.8,10)}<circle r="4.5" fill="${p.core}"/>`+
              `<circle r="2" fill="${p.center}"/></g>`,
  '秋菊': p => { let a='',b='';
              for(let i=0;i<20;i++) a+=`<path d="M0,0 Q2.4,-13 0,-24 Q-2.4,-13 0,0Z" transform="rotate(${i*18})" fill="${p.petal}" stroke="${p.edge}" stroke-width=".5"/>`;
              for(let i=0;i<13;i++) b+=`<path d="M0,0 Q1.6,-7 0,-14 Q-1.6,-7 0,0Z" transform="rotate(${i*27+9})" fill="${p.petal2}" stroke="${p.edge}" stroke-width=".4"/>`;
              return `<g>${a}${b}<circle r="3.4" fill="${p.center}"/></g>`; },
  '绣球': p => { const pts=[[0,0,0],[13,-7,1],[-13,-6,0],[7,11,1],[-8,10,0],[14,8,0],[-14,8,1],[1,-14,1]];
              const flo=(x,y,c)=>`<g transform="translate(${x},${y})">${[0,90,180,270].map(an=>`<ellipse cx="0" cy="-5.5" rx="4.2" ry="6" transform="rotate(${an})" fill="${c}" stroke="${p.edge}" stroke-width=".5"/>`).join('')}<circle r="1.7" fill="${p.core}"/></g>`;
              return `<g>${pts.map(t=>flo(t[0],t[1],t[2]?p.petal2:p.petal)).join('')}</g>`; },
  '铃兰': p => { const bell=(x,y)=>`<g transform="translate(${x},${y})"><path d="M0,-9 L0,-14" stroke="${p.edge}" stroke-width=".9"/><path d="M-5,-8 Q-6.5,5 0,7 Q6.5,5 5,-8 Q0,-3.5 -5,-8 Z" fill="${p.bell}" stroke="${p.bellEdge}" stroke-width=".7"/></g>`;
              const leaf=`<path d="M-8,-60 Q-40,-26 -10,22 Q0,-20 -8,-60 Z" fill="${p.leaf}" opacity=".82" stroke="${p.leaf}" stroke-width=".5"/>`;
              const stem=`<path d="M-2,-62 Q22,-28 9,24" fill="none" stroke="${p.leaf}" stroke-width="1.5"/>`;
              const bells=[[1,-50],[6,-36],[10,-21],[12,-6],[11,9]].map(b=>bell(b[0],b[1])).join('');
              return `<g>${leaf}${stem}${bells}</g>`; },
  '桃花': p => { const bl=(x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})">${ring(5,-7.5,4.2,7.5,p.petal,p.edge,.6)}<circle r="2.6" fill="${p.core}"/>${[0,72,144,216,288].map(an=>`<line x1="0" y1="0" x2="0" y2="-5" stroke="${p.stamen}" stroke-width=".55" transform="rotate(${an+36})"/>`).join('')}</g>`;
              const branch=`<path d="M-56,44 Q-12,8 46,-46" fill="none" stroke="${p.branch}" stroke-width="2.2" stroke-linecap="round"/>`;
              const lf=`<path d="M-34,22 q-11,-6 -4,-17 q9,4 4,17Z" fill="${p.leaf}" stroke="${p.leaf}" stroke-width=".4"/>`;
              const blooms=[[-44,34,1],[-18,12,1.15],[10,-12,1],[38,-38,1.2],[22,-3,.72]].map(b=>bl(b[0],b[1],b[2])).join('');
              return `<g>${lf}${branch}${blooms}</g>`; },
};
function ornament(flower, corner){
  const p = OPAL[flower] || OPAL['牡丹'];
  const inner = (M[flower] || M['牡丹'])(p);
  const rot = corner === 'br' ? 195 : 0;          // 对角镜像，环抱画面
  return `<svg class="ornament ${corner}" viewBox="0 0 200 200" aria-hidden="true">`+
         `<g transform="translate(100 100) rotate(${rot})">${inner}</g></svg>`;
}

const works = document.getElementById('works');

WORKS.forEach((w, i) => {
  const sec = document.createElement('section');
  sec.className = 'work';
  sec.id = 'g' + (i + 1);
  sec.innerHTML = `
    <div class="work-no">${w.flower}<span class="num">${w.no}</span></div>
    <div class="frame-wrap">
      <div class="work-frame">
        <div class="wf-clip">
          <img class="wf-bg" alt="花拳绣腿 · ${w.flower}" loading="lazy">
          <img class="wf-draft" src="images/drafts/${i+1}${i+1}.png" alt="底图 · ${w.flower}" loading="lazy">
        </div>
        <img class="wf-char" src="images/char${i+1}.png" alt="" loading="lazy"
             onerror="this.remove()">
      </div>
      ${ornament(w.flower,'tl')}
      ${ornament(w.flower,'br')}
    </div>`;
  const img = sec.querySelector('.wf-bg');
  // 依次尝试各种后缀，全失败则显示占位提示图
  let ei = 0;
  img.addEventListener('error', () => {
    ei++;
    if (ei < EXTS.length) { img.src = `${w.base}.${EXTS[ei]}`; }
    else {
      img.dataset.missing = '1';
      img.src = placeholder(`${w.base}.png`);
      sec.querySelector('.work-frame').style.cursor = 'default';
    }
  });
  img.src = `${w.base}.${EXTS[0]}`;
  w.resolved = () => img.src; // 供灯箱取用当前已成功的地址

  // 在画框对侧的留白处落一枚淡印，呼应原画里的印章
  const ws = document.createElement('img');
  ws.className = 'seal-stamp';
  ws.src = 'images/seal.png';
  ws.alt = '';
  const onLeft = i % 2 === 1; // 偶数项画框靠右，印落左侧
  ws.style.cssText =
    `${onLeft?'left:3%':'right:3%'}; top:${18 + (i*7)%40}%;` +
    `width:${130 + (i%3)*40}px; opacity:0; transition:opacity 1.5s ease;` +
    `transform:rotate(${onLeft?-9:8}deg);`;
  sec.style.position = 'relative';
  sec.appendChild(ws);

  works.appendChild(sec);
});

const frames = [...document.querySelectorAll('.work-frame')];
const nos = [...document.querySelectorAll('.work-no')];

/* ===== 出现动效 =====
   封面文字用 IntersectionObserver；画作改用滚动判断，确保万无一失地显示 */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:.08, rootMargin:'0px 0px -5% 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

// 画作 / 序号：只要进入视口下方 88% 就揭幕（滚动时持续检查，绝不漏图）
const revealables = [...document.querySelectorAll('.work-frame, .work-no, .ornament')];
function revealOnScroll(){
  const trigger = innerHeight * 0.88;
  for (let i = revealables.length - 1; i >= 0; i--){
    const el = revealables[i];
    if (el.getBoundingClientRect().top < trigger){
      el.classList.add('in');
      revealables.splice(i, 1);
    }
  }
}

/* ===== 侧边索引 ===== */
const rail = document.getElementById('rail');
const dots = WORKS.map((w, i) => {
  const d = document.createElement('span');
  d.className = 'rail-dot';
  d.dataset.zi = w.flower;
  d.addEventListener('click', () => document.getElementById('g' + (i+1)).scrollIntoView({behavior:'smooth'}));
  rail.appendChild(d);
  return d;
});

/* ===== 灯箱 ===== */
const lb = document.getElementById('lightbox');
const lbStage = document.getElementById('lbStage');
const lbBack = document.getElementById('lbBack');
const lbChar = document.getElementById('lbChar');
let cur = 0;
const backOf = i => frames[i].querySelector('.wf-bg').src;

function setSrc(i){ lbBack.src = backOf(i); lbChar.src = `images/char${i+1}.png`; }

// 人物从缩略图位置“起飞”并放大（FLIP）：originEl = 被点击缩略图里的人物层
function flyChar(originEl){
  const last = lbStage.getBoundingClientRect();           // 终点：舞台（与人物层等框）
  const first = (originEl || lbStage).getBoundingClientRect(); // 起点：缩略图
  const s = first.width / last.width || 0.25;
  const dx = (first.left + first.width/2) - (last.left + last.width/2);
  const dy = (first.top  + first.height/2) - (last.top  + last.height/2);

  // 背景画：原地淡入、轻微放大
  lbBack.style.transition = 'none';
  lbBack.style.opacity = '0';
  lbBack.style.transform = 'scale(.985)';
  // 人物：先“贴”到缩略图的位置与大小
  lbChar.style.transition = 'none';
  lbChar.style.opacity = '1';
  lbChar.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
  lbStage.getBoundingClientRect();                        // 强制回流

  requestAnimationFrame(() => {
    lbChar.style.transition = 'transform .64s cubic-bezier(.2,.85,.2,1), opacity .3s ease';
    lbChar.style.transform = '';     // 交回 CSS：飞到中央并弹到 scale(1.06)
    lbBack.style.transition = 'opacity .5s ease .08s, transform .6s cubic-bezier(.2,.8,.2,1) .08s, filter .5s';
    lbBack.style.opacity = '';
    lbBack.style.transform = '';
  });
}
// 切换上一张/下一张：从中央小幅弹出（无缩略图来源）
function popChar(i){
  setSrc(i);
  lbBack.style.transition = lbChar.style.transition = 'none';
  lbBack.style.transform = ''; lbBack.style.opacity = '';
  lbChar.style.transform = 'scale(.84)'; lbChar.style.opacity = '0';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    lbChar.style.transition = ''; lbChar.style.transform = ''; lbChar.style.opacity = '';
  }));
}
function openLb(i, originEl){
  cur = i;
  setSrc(i);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  flyChar(originEl);
}
// 关闭：人物飞缩回“当前这张”缩略图的位置再淡出
let closing = false;
function closeLb(){
  if (closing) return;
  const origin = frames[cur].querySelector('.wf-char') || frames[cur].querySelector('.wf-bg');
  const last = lbStage.getBoundingClientRect();
  const first = origin.getBoundingClientRect();
  const s = first.width / last.width || 0.25;
  const dx = (first.left + first.width/2) - (last.left + last.width/2);
  const dy = (first.top  + first.height/2) - (last.top  + last.height/2);

  closing = true;
  lb.classList.add('closing');                 // 遮罩转透明，露出画廊
  lbChar.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), opacity .42s ease .08s';
  lbChar.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`;
  lbChar.style.opacity = '0';
  lbBack.style.transition = 'opacity .35s ease, transform .5s ease';
  lbBack.style.opacity = '0';
  lbBack.style.transform = 'scale(.99)';

  setTimeout(() => {
    lb.classList.remove('open', 'closing');
    document.body.style.overflow = '';
    lbChar.style.transition = lbBack.style.transition = 'none';
    lbChar.style.transform = lbBack.style.transform = '';
    lbChar.style.opacity = lbBack.style.opacity = '';
    closing = false;
  }, 520);
}
function stepLb(d){ cur = (cur + d + WORKS.length) % WORKS.length; popChar(cur); }

// 启封：水墨晕染——有机洞口从中心向四周扩散，底图随之消溶，成品显现
function revealWork(f){
  f.classList.add('revealed');

  // 启封后淡入本画区的印章背景
  const section = f.closest('.work');
  const stamp = section?.querySelector('.seal-stamp');
  if (stamp) stamp.style.opacity = '0.14';

  const clip  = f.querySelector('.wf-clip');
  const draft = f.querySelector('.wf-draft');
  const W = clip.offsetWidth, H = clip.offsetHeight;

  // 点击启封：在画面上荡开一组朱砂双层涟漪（内外两圈同时扩散）
  (function(){
    const base = Math.min(W, H);
    for (let k = 0; k < 2; k++){
      const rp = document.createElement('span');
      rp.className = 'seal-ripple';
      rp.style.width = rp.style.height = (base * (k ? 0.42 : 0.62)) + 'px';
      rp.style.zIndex = '7';
      clip.appendChild(rp);
      rp.animate([
        { transform:'translate(-50%,-50%) scale(.3)', opacity:.5 },
        { transform:`translate(-50%,-50%) scale(${k ? 2.8 : 2.3})`, opacity:0 },
      ], { duration:1200, easing:'cubic-bezier(.15,.7,.25,1)', fill:'forwards' })
        .onfinish = () => rp.remove();
    }
  })();

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const PW = Math.round(W * dpr), PH = Math.round(H * dpr);

  // 将底图快照进离屏 canvas（避免每帧从 DOM 取图）
  const snap = document.createElement('canvas');
  snap.width = PW; snap.height = PH;
  const sc = snap.getContext('2d');
  sc.scale(dpr, dpr);
  try { sc.drawImage(draft, 0, 0, W, H); } catch(e) { return; }

  // 动画 canvas：覆盖在 wf-clip 内，z-index 高于底图
  const cv = document.createElement('canvas');
  cv.width = PW; cv.height = PH;
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:6;pointer-events:none;';
  clip.appendChild(cv);
  const cc = cv.getContext('2d');

  // 隐藏原底图元素，由 canvas 接管其视觉
  draft.style.transition = 'none';
  draft.style.opacity = '0';

  const dur  = 1900;   // 晕染显影更慢
  const maxR = Math.hypot(PW, PH) * 0.63;
  const N    = 64;
  const seeds = Array.from({length: N}, () => Math.random());
  let t0 = null;

  function tick(now){
    if (!t0) t0 = now;
    const p    = Math.min(1, (now - t0) / dur);
    // 缓动：前段快（墨水入纸迅速晕开），后段缓收尾
    const ease = 1 - Math.pow(1 - p, 2.3);
    const r    = maxR * ease;

    cc.clearRect(0, 0, PW, PH);
    cc.drawImage(snap, 0, 0);   // 复现底图

    cc.globalCompositeOperation = 'destination-out';
    const ox = PW / 2, oy = PH / 2;

    // 有机多边形（模拟墨水在纸上不规则晕染边缘）
    cc.beginPath();
    for (let i = 0; i <= N; i++){
      const a = (i / N) * Math.PI * 2;
      const noise = 1
        + 0.13 * Math.sin(a * 5  + seeds[i % N] * 6.28)
        + 0.07 * Math.cos(a * 9  - seeds[(i + 7)  % N] * 6.28)
        + 0.04 * Math.sin(a * 16 + seeds[(i + 13) % N] * 6.28);
      const pr = Math.max(0, r * noise);
      const x  = ox + Math.cos(a) * pr;
      const y  = oy + Math.sin(a) * pr;
      i === 0 ? cc.moveTo(x, y) : cc.lineTo(x, y);
    }
    cc.closePath();

    // 渐变填充：内部完全透明（洞），边缘柔和（模拟墨水浓度减淡）
    const g = cc.createRadialGradient(ox, oy, r * 0.48, ox, oy, r * 1.28);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    cc.fillStyle = g;
    cc.fill();
    cc.globalCompositeOperation = 'source-over';

    if (p < 1) requestAnimationFrame(tick);
    else        cv.remove();   // 动画结束，canvas 使命完成
  }

  requestAnimationFrame(tick);
}

frames.forEach((f, i) => f.addEventListener('click', () => {
  if (!f.classList.contains('revealed')){ revealWork(f); return; }  // 首次点击：启封显影
  if (f.querySelector('.wf-bg').src.startsWith('data:')) return;    // 占位图不放大
  openLb(i, f.querySelector('.wf-char') || f.querySelector('.wf-bg'));
}));

// 视差：鼠标移动时，人物比背景移动更多，仿佛从画中走出
lbStage.addEventListener('mousemove', (e) => {
  if (!lb.classList.contains('open')) return;
  const r = lbStage.getBoundingClientRect();
  const nx = (e.clientX - r.left) / r.width - .5;
  const ny = (e.clientY - r.top) / r.height - .5;
  lbChar.style.transition = lbBack.style.transition = 'transform .25s ease-out';
  lbChar.style.transform = `scale(1.09) translate(${nx*34}px, ${ny*28}px) rotateY(${nx*7}deg) rotateX(${-ny*6}deg)`;
  lbBack.style.transform = `translate(${nx*-11}px, ${ny*-9}px) scale(1.01)`;
});
lbStage.addEventListener('mouseleave', () => {
  lbChar.style.transition = lbBack.style.transition = '';
  lbChar.style.transform = lbBack.style.transform = '';
});
document.getElementById('lbClose').addEventListener('click', closeLb);
document.getElementById('lbPrev').addEventListener('click', () => stepLb(-1));
document.getElementById('lbNext').addEventListener('click', () => stepLb(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') stepLb(1);
  if (e.key === 'ArrowLeft') stepLb(-1);
});

/* ===== 进度条 + 当前画作高亮 ===== */
const progress = document.getElementById('progress');
const sections = WORKS.map((_, i) => document.getElementById('g' + (i+1)));
function onScroll(){
  const st = window.scrollY;
  const docH = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (st / docH * 100) + '%';
  let active = -1;
  sections.forEach((s, i) => { if (s.offsetTop - innerHeight*0.5 <= st) active = i; });
  dots.forEach((d, i) => d.classList.toggle('active', i === active));
  revealOnScroll();
}
window.addEventListener('scroll', onScroll, { passive:true });
window.addEventListener('resize', onScroll, { passive:true });
window.addEventListener('load', onScroll);
onScroll();

/* ===================================================================
   封面：散落的真实印章
=================================================================== */
const SEALS = [
  { x:'6%',  y:'14%', s:200, o:.26, r:-8 },
  { x:'82%', y:'12%', s:150, o:.20, r:7  },
  { x:'72%', y:'64%', s:240, o:.16, r:-5 },
  { x:'14%', y:'70%', s:120, o:.22, r:10 },
  { x:'46%', y:'8%',  s:96,  o:.14, r:6  },
  { x:'90%', y:'44%', s:110, o:.12, r:-12},
  { x:'28%', y:'42%', s:92,  o:.11, r:13 },
  { x:'60%', y:'30%', s:128, o:.13, r:-9 },
  { x:'38%', y:'80%', s:150, o:.15, r:5  },
  { x:'92%', y:'82%', s:104, o:.10, r:-6 },
];
const sealBg = document.getElementById('sealBg');
const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
const coverBox = sealBg.getBoundingClientRect();
const CW = coverBox.width || innerWidth, CH = coverBox.height || innerHeight;

// 进入动画三段式：聚拢 → 一记重章（完全同步）→ 一齐散开
const TF = (dx,dy,rot,sc) => `translate(-50%,-50%) translate(${dx}px,${dy}px) rotate(${rot}deg) scale(${sc})`;
const items = SEALS.map((s, i) => {
  const img = new Image();
  img.className = 'seal-stamp';
  img.src = 'images/seal.png';
  img.style.cssText =
    `left:${s.x}; top:${s.y}; width:${s.s}px; opacity:${s.o};` +
    `transform:translate(-50%,-50%) rotate(${s.r}deg);`;
  sealBg.appendChild(img);

  const px = parseFloat(s.x)/100 * CW, py = parseFloat(s.y)/100 * CH;
  const cx = CW/2 - px, cy = CH/2 - py;          // 归位 → 中央 的位移
  const a  = i * 2.39996 + 0.6;                  // 黄金角，飞入方向分散
  const R  = Math.min(CW, CH) * 0.5;
  return {
    img, r:s.r,
    sx: cx + Math.cos(a)*R, sy: cy + Math.sin(a)*R,
    cx, cy,
    ob: Math.min(0.82, s.o*4),                   // 聚拢时更醒目
    oi: Math.min(0.98, s.o*6),                   // 盖章瞬间浓红一闪
    o:  s.o,
    hx: s.x, hy: s.y, hs: s.s,                   // 背景落点坐标与尺寸（散落落定时在此荡涟漪）
  };
});

function spawnRipple(){
  // 重击盖章的双层涟漪：内外两圈自中心「同时」扩散（无前导小涟漪），力度更大
  for (let k = 0; k < 2; k++){
    const rp = document.createElement('span');
    rp.className = 'seal-ripple';
    rp.style.width = rp.style.height = (k ? 200 : 320) + 'px';   // 内圈小、外圈大
    sealBg.appendChild(rp);
    rp.animate([
      { transform:'translate(-50%,-50%) scale(.25)', opacity:.6 },
      { transform:`translate(-50%,-50%) scale(${k ? 3.4 : 2.8})`, opacity:0 },
    ], { duration:1300, easing:'cubic-bezier(.15,.7,.25,1)', fill:'forwards' })
      .onfinish = () => rp.remove();
  }
}
// 印章散落、落到背景某处的刹那，在该处荡开两圈朱砂涟漪（尺寸随印章大小）
function spawnRippleAt(x, y, size){
  // 内外两圈「同时」扩散：一上来就是双层，不再有先冒的前导小涟漪
  for (let k = 0; k < 2; k++){
    const rp = document.createElement('span');
    rp.className = 'seal-ripple';
    rp.style.left = x;
    rp.style.top = y;
    rp.style.width = rp.style.height = (size * (k ? 0.6 : 0.95)) + 'px';  // 内圈小、外圈大
    sealBg.appendChild(rp);
    rp.animate([
      { transform:'translate(-50%,-50%) scale(.3)', opacity:.55 },
      { transform:`translate(-50%,-50%) scale(${k ? 4.4 : 3.8})`, opacity:0 },  // 扩散范围更大
    ], { duration:1500, easing:'cubic-bezier(.15,.7,.25,1)', fill:'forwards' })  // 散播更慢、同时起步
      .onfinish = () => rp.remove();
  }
}
// 逐枚盖下时的轻震（幅度小，便于连续叠加）
function lightShake(){
  document.body.animate([
    { transform:'translate(0,0)' },
    { transform:'translate(-3px,2px)' },
    { transform:'translate(2px,-2px)' },
    { transform:'translate(0,0)' },
  ], { duration:200, easing:'ease-out' });
}
// 盖章瞬间：整屏轻微一震（快速衰减）
function screenShake(){
  document.body.animate([
    { transform:'translate(0,0)' },
    { transform:'translate(-7px,4px)' },
    { transform:'translate(6px,-5px)' },
    { transform:'translate(-5px,3px)' },
    { transform:'translate(4px,-2px)' },
    { transform:'translate(-2px,1px)' },
    { transform:'translate(0,0)' },
  ], { duration:400, easing:'cubic-bezier(.3,.7,.4,1)' });
}

function playEntry(){
  const GATHER = 1050, GSTAG = 28;     // 聚拢：缓缓流入
  const STAMP  = 560;                  // 一记重章：所有印章同步砸下
  const SCATTER = 1200, CSTAG = 230;   // 散落：放慢 + 每枚落位的时差明显加大
  const n = items.length;
  const gatherEnd = GATHER + (n - 1) * GSTAG;

  // ① 聚拢：从屏外缓缓流入，停在中央上方蓄势
  items.forEach((it, i) => {
    it.img.animate([
      { transform:TF(it.sx, it.sy, it.r-170, .4),     opacity:0,     easing:'cubic-bezier(.3,0,.25,1)' },
      { transform:TF(it.cx, it.cy-28, it.r-86, 1.34), opacity:it.ob },
    ], { duration:GATHER, delay:i*GSTAG, fill:'both' });
  });

  // ② 一记重章：所有印章同步砸下 + 双层涟漪 + 整屏一震
  setTimeout(() => {
    spawnRipple();
    screenShake();
    items.forEach(it => {
      it.img.animate([
        { offset:0,   transform:TF(it.cx, it.cy-28, it.r-86, 1.34), opacity:it.ob, easing:'cubic-bezier(.2,.95,.3,1)' },
        { offset:.22, transform:TF(it.cx, it.cy,    it.r-54, .94), opacity:it.oi, easing:'ease-out' },    // 啪！
        { offset:.40, transform:TF(it.cx+5, it.cy-4,it.r-62, 1.1), opacity:it.ob, easing:'ease-in-out' }, // 回弹
        { offset:.55, transform:TF(it.cx-5, it.cy+2,it.r-48, 1.03),opacity:it.ob, easing:'ease-in-out' }, // 震
        { offset:.70, transform:TF(it.cx+3, it.cy,  it.r-58, 1.06),opacity:it.ob, easing:'ease-in-out' }, // 震
        { offset:1,   transform:TF(it.cx, it.cy,    it.r-56, 1.02),opacity:it.ob, easing:'cubic-bezier(.3,0,.2,1)' },
      ], { duration:STAMP, fill:'both' });
    });
  }, gatherEnd + 40);

  // ③ 散落：一枚接一枚飞向各自背景位置（落位时差明显），
  //    每枚「落到自己位置那一刻」在该处荡开朱砂涟漪
  const scatterStart = gatherEnd + 40 + STAMP;
  setTimeout(() => {
    items.forEach((it, i) => {
      const anim = it.img.animate([
        { transform:TF(it.cx, it.cy, it.r-56, 1.02), opacity:it.ob },
        { transform:TF(0, 0, it.r, 1),               opacity:it.o, easing:'cubic-bezier(.22,.7,.2,1)' },
      ], { duration:SCATTER, delay:i*CSTAG, fill:'forwards' });
      anim.onfinish = () => spawnRippleAt(it.hx, it.hy, it.hs);
    });
  }, scatterStart);
}

if (!reduceMotion) playEntry();

/* ===================================================================
   标题：悬停生花 · 轻触绽放 · 迸发花瓣
=================================================================== */
const PALETTES = {
  peach:{ petal:'#f8c6d8', edge:'#ef9fbb', core:'#f7e7a0', leaf:'#94b86f' }, // 桃花
  mum:  { petal:'#f7b65a', edge:'#e89233', core:'#fce3a6', leaf:'#9cb567' }, // 菊
  hydr: { petal:'#d7a6d6', edge:'#b07fb4', core:'#f1e6a8', leaf:'#8fb070' }, // 绣球
  bell: { petal:'#ffffff', edge:'#cfe0bf', core:'#eef3df', leaf:'#84ad63' }, // 铃兰
};
const ZIS = [...document.querySelectorAll('.brand .zi')];

// 缠绕梅枝（真实绘制的图片：images/vines），向外伸展环抱标题
// 花(0)→左、拳(1)→新、绣(2)→左、腿(3)→右
ZIS.forEach((zi, idx) => {
  let cls, src;
  if (idx === 1){ cls = 'novel'; src = 'images/vines/new.png'; }
  else if (idx % 2 === 0){ cls = 'left'; src = 'images/vines/left.png'; }
  else { cls = 'right'; src = 'images/vines/right.png'; }
  const vine = document.createElement('img');
  vine.className = 'vine-img ' + cls;
  vine.src = src;
  vine.alt = '';
  zi.appendChild(vine);

  zi.addEventListener('mouseenter', () => zi.classList.add('hovering'));
  zi.addEventListener('mouseleave', () => zi.classList.remove('hovering'));
  zi.addEventListener('click', (e) => {
    zi.classList.add('grown');           // 点击后固定绽放形态（本次浏览有效）
    burst(e.clientX, e.clientY, PALETTES[zi.dataset.flower]);
    // 点击也在该字处荡开一组朱砂双层涟漪
    const box = sealBg.getBoundingClientRect();
    const r = zi.getBoundingClientRect();
    spawnRippleAt(
      (r.left + r.width / 2 - box.left) + 'px',
      (r.top  + r.height / 2 - box.top)  + 'px',
      r.width * 0.7
    );
  });
});

/* 点击迸发花瓣粒子 */
function burst(x, y, p){
  const colors = [p.petal, p.edge, p.core, p.leaf];
  const N = 16;
  for (let k=0;k<N;k++){
    const el = document.createElement('i');
    el.className = 'petal';
    el.style.background = colors[k % colors.length];
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.borderRadius = (k%2 ? '80% 0 80% 0' : '50%');
    document.body.appendChild(el);
    const ang = (Math.PI*2) * (k/N) + Math.random()*0.5;
    const dist = 60 + Math.random()*90;
    const dx = Math.cos(ang)*dist;
    const dy = Math.sin(ang)*dist - 30;       // 略向上
    const rot = (Math.random()*720-360);
    el.animate([
      { transform:'translate(-50%,-50%) rotate(0deg) scale(1)', opacity:1 },
      { transform:`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${rot}deg) scale(.2)`, opacity:0 }
    ], { duration: 800 + Math.random()*500, easing:'cubic-bezier(.2,.7,.3,1)' })
      .onfinish = () => el.remove();
  }
}

/* ===================================================================
   滚到底：最后一枚印章「盖章」落定 + 朱砂涟漪 + 轻浮（呼应开场）
=================================================================== */
const endStamp = document.querySelector('.end-stamp');
const endSeal  = document.querySelector('.end-seal');

function spawnEndRipple(){
  for (let k = 0; k < 2; k++){
    const rp = document.createElement('span');
    rp.className = 'seal-ripple';
    endStamp.appendChild(rp);
    rp.animate([
      { transform:'translate(-50%,-50%) scale(.3)',  opacity:.5 },
      { transform:'translate(-50%,-50%) scale(2.3)', opacity:0 },
    ], { duration:850, delay:k*140, easing:'cubic-bezier(.2,.7,.3,1)', fill:'forwards' })
      .onfinish = () => rp.remove();
  }
}
// 末尾印章底部循环水波，像浮在水面上
function startWaterRipples(){
  if (reduceMotion) return;
  if (endStamp.querySelector('.water-ripple')) return;   // 只建一次
  for (let k = 0; k < 3; k++){
    const w = document.createElement('span');
    w.className = 'water-ripple';
    endStamp.appendChild(w);
    w.animate([
      { transform:'scale(.35)', opacity:.55 },
      { transform:'scale(1.85)', opacity:0 },
    ], { duration:2700, delay:k*900, iterations:Infinity, easing:'cubic-bezier(.25,.6,.3,1)' });
  }
}
function stampEnd(){
  spawnEndRipple();
  endSeal.animate([
    { offset:0,   transform:'translateY(-30px) scale(1.45) rotate(-7deg)', opacity:0, easing:'cubic-bezier(.4,0,.9,.45)' },
    { offset:.42, transform:'translateY(0) scale(1.42) rotate(-4deg)',     opacity:1, easing:'cubic-bezier(.2,.9,.3,1)' },
    { offset:.56, transform:'translateY(0) scale(.9) rotate(0deg)',        opacity:1, easing:'ease-out' },        // 啪！盖下
    { offset:.70, transform:'scale(1.08) rotate(1.5deg)',                  opacity:1, easing:'ease-in-out' },     // 回弹
    { offset:.84, transform:'scale(.97) rotate(-1deg)',                    opacity:1, easing:'ease-in-out' },     // 震
    { offset:1,   transform:'scale(1) rotate(0)',                          opacity:1 },
  ], { duration:950, fill:'both' }).onfinish = () => {
    // 落定后轻轻浮动
    endSeal.animate([
      { transform:'translateY(0)' }, { transform:'translateY(-7px)' }, { transform:'translateY(0)' },
    ], { duration:3800, iterations:Infinity, easing:'ease-in-out' });
    startWaterRipples();   // 浮在水面：底部循环水波
  };
}

if (endStamp && endSeal){
  if (reduceMotion){
    endSeal.style.opacity = 1;
  } else {
    let endDone = false;
    const endIO = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting && !endDone){ endDone = true; endIO.disconnect(); stampEnd(); } });
    }, { threshold:.6 });
    endIO.observe(endStamp);
  }
}

/* ===================================================================
   点击末尾印章 → 再盖一章 + 涟漪 → 大量印章铺屏过渡 → 回到顶部重放开场
=================================================================== */
const sealFlood = document.getElementById('sealFlood');
let replaying = false;

function floodTransition(){
  sealFlood.innerHTML = '';
  sealFlood.classList.add('active');
  const W = innerWidth, H = innerHeight, N = 54;

  // 整屏朱红幕布（随后随印章一起向上扫出）
  const bg = document.createElement('div');
  bg.className = 'flood-bg';
  sealFlood.appendChild(bg);
  bg.animate([{ opacity:0 }, { opacity:1 }], { duration:520, fill:'forwards', easing:'ease-in' });

  // 大量印章密集飞入铺满，并沿单一方向（整体向上、略带横向差异）缓慢漂移
  const wraps = [];
  for (let i = 0; i < N; i++){
    const wrap = document.createElement('span');
    wrap.className = 'flood-wrap';
    wrap.style.cssText = `left:${Math.random()*W}px; top:${Math.random()*H}px;`;
    const img = new Image(); img.className = 'flood-seal'; img.src = 'images/seal.png';
    const size = 150 + Math.random()*320;
    const rot  = Math.random()*46 - 23;
    img.style.cssText = `width:${size}px; opacity:0;`;
    wrap.appendChild(img);
    sealFlood.appendChild(wrap);

    img.animate([
      { transform:`rotate(${rot-40}deg) scale(0)`, opacity:0 },
      { transform:`rotate(${rot}deg) scale(1)`,    opacity:1 },
    ], { duration:460, delay:i*8, easing:'cubic-bezier(.2,.85,.3,1)', fill:'forwards' });

    // 单向：整体朝上（-90°）± 横向偏差，每枚速度略不同
    const ang = (-90 + (Math.random() - .5) * 46) * Math.PI / 180;
    const dx = Math.cos(ang) * 46, dy = Math.sin(ang) * 46;
    wrap.animate([
      { transform:'translate(-50%,-50%) translate(0,0)' },
      { transform:`translate(-50%,-50%) translate(${dx}px,${dy}px)` },
    ], { duration:1200, delay:i*8, fill:'forwards', easing:'linear' });
    wraps.push({ wrap, dx, dy, ang });
  }

  const COVER = 800;       // 整屏铺红之际：瞬移回顶 + 重放开场
  setTimeout(() => { window.scrollTo(0, 0); playEntry(); }, COVER);

  // 退场：红幕 + 全部红章一齐向上加速扫出屏幕（移动消失，非淡出）
  setTimeout(() => {
    bg.animate([{ transform:'translateY(0)' }, { transform:'translateY(-110%)' }],
      { duration:720, fill:'forwards', easing:'cubic-bezier(.55,0,.85,.25)' });
    wraps.forEach((o, i) => {
      const dist = Math.max(W, H) * 1.7;
      const ex = Math.cos(o.ang) * dist, ey = Math.sin(o.ang) * dist;
      o.wrap.animate([
        { transform:`translate(-50%,-50%) translate(${o.dx}px,${o.dy}px)` },
        { transform:`translate(-50%,-50%) translate(${ex}px,${ey}px)` },
      ], { duration:680, delay:i*5, fill:'forwards', easing:'cubic-bezier(.5,0,.8,.2)' })
        .onfinish = () => o.wrap.remove();
    });
    setTimeout(() => { sealFlood.classList.remove('active'); sealFlood.innerHTML = ''; replaying = false; }, 720 + N*5 + 120);
  }, COVER + 560);
}

if (endSeal){
  endSeal.addEventListener('click', () => {
    if (reduceMotion){ window.scrollTo(0, 0); return; }
    if (replaying) return;
    replaying = true;
    endSeal.getAnimations().forEach(a => a.cancel());   // 清掉浮动，干净重盖
    stampEnd();                                          // 再盖一章 + 涟漪
    setTimeout(floodTransition, 440);                    // 随后印章铺屏转场
  });
}
