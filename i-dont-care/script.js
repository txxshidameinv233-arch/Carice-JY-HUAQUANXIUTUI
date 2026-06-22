/* ===================================================================
   我不在乎 · i don't care  —  交互
=================================================================== */
const PAGES = 6;
const pad = n => String(n).padStart(2, '0');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 注入漫画页 ---------- */
const reader = document.getElementById('read');
for (let i = 1; i <= PAGES; i++) {
  const fig = document.createElement('article');
  fig.className = 'page';
  fig.dataset.no = pad(i);
  fig.innerHTML =
    `<span class="page-no"><b>${pad(i)}</b> / ${pad(PAGES)}</span>` +
    `<div class="page-figure">` +
      `<img src="pages/p${i}.jpg" alt="《我不在乎》第 ${i} 页" loading="lazy" decoding="async">` +
    `</div>`;
  reader.appendChild(fig);
}

/* ---------- 进度条 ---------- */
const progress = document.getElementById('progress');
function onScroll() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- 页面逐张显形 + 侧栏页码 ---------- */
const rail = document.getElementById('rail');
const railCur = document.getElementById('railCur');
const pages = [...document.querySelectorAll('.page')];

const reveal = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.18 });
pages.forEach(p => reveal.observe(p));

const track = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) railCur.textContent = e.target.dataset.no;
  });
}, { threshold: 0.55 });
pages.forEach(p => track.observe(p));

/* 仅在阅读区显示侧栏页码（离开首屏、未到尾声时） */
const hero = document.getElementById('hero');
const end = document.getElementById('end');
let heroVisible = true, endVisible = false;
new IntersectionObserver(es => {
  es.forEach(e => { heroVisible = e.isIntersecting; updateRail(); });
}, { threshold: 0.4 }).observe(hero);
new IntersectionObserver(es => {
  es.forEach(e => { endVisible = e.isIntersecting; updateRail(); });
}, { threshold: 0.3 }).observe(end);
function updateRail() { rail.classList.toggle('show', !heroVisible && !endVisible); }

/* ---------- 引语显形 ---------- */
const quote = document.getElementById('quote');
new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) quote.classList.add('in'); });
}, { threshold: 0.4 }).observe(quote);

/* ---------- 首屏背景轻微视差 ---------- */
const ghost = document.getElementById('heroGhost');
if (!reduceMotion) {
  addEventListener('scroll', () => {
    const y = scrollY;
    if (y < innerHeight) ghost.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
  }, { passive: true });
}

/* ---------- 回到开篇 ---------- */
document.getElementById('toTop').addEventListener('click', () => {
  scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});
