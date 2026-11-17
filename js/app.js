(function(){
'use strict';
const $ = (s, el=document) => el.querySelector(s);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = (a,n) => shuffle(a).slice(0,n);
const today = () => { const d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
const dayDiff = (a,b) => Math.round((new Date(b+'T12:00')-new Date(a+'T12:00'))/864e5);
const addDays = (d,n) => { const x=new Date(d+'T12:00'); x.setDate(x.getDate()+n); return x.toISOString().slice(0,10); };
const fmtDate = d => new Date(d+'T12:00').toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
const C = CONTENT.certs;
const CERT_ORDER = ['a1','a2','np','sp'];

/* ================= STATE ================= */
const KEY = 'cstudy.v1';
const defState = () => ({ v:1, start: today(), plan:'sprint', certs:['a1','a2','np','sp'], lessons:{}, qs:{}, missed:{}, cards:{}, activity:{}, history:[], games:{}, theme:'dark', newPerDay:25 });
let S;
try { S = Object.assign(defState(), JSON.parse(localStorage.getItem(KEY)||'{}')); } catch(e){ S = defState(); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} };
const bump = (n=1) => { const t=today(); S.activity[t]=(S.activity[t]||0)+n; save(); };
function streak(){ let s=0, d=today(); if(!S.activity[d]) d=addDays(d,-1); while(S.activity[d]){ s++; d=addDays(d,-1); } return s; }
document.documentElement.dataset.theme = S.theme;

/* ================= CONTENT PREP ================= */
const LESSONS = {}, QS = {}, QLIST = [];
CERT_ORDER.forEach(cid => {
  const c = C[cid];
  c.lessons.forEach((l,i) => { l.cert = cid; l.idx = i; LESSONS[l.id] = l; });
  c.qs.forEach((raw,i) => {
    let q;
    if (Array.isArray(raw)) {
      const [l, text, choices, exp, ...extra] = raw;
      let a = 0, v = null;
      extra.forEach(x => { if (typeof x === 'string') v = x; else if (x !== undefined) a = x; });
      q = { l, q:text, c:choices, e:exp, a, v, t: Array.isArray(a) ? 'ms' : 'mc' };
    } else q = Object.assign({}, raw);
    q.id = cid+'-q'+i; q.cert = cid; q.d = (LESSONS[q.l]||{}).d || '1'; q.hand = true;
    QS[q.id] = q; QLIST.push(q);
  });
});
// generated port questions
const portCertDomain = { a1:['2','a1-3'], np:['1','np-3'], sp:['4','sp-13'] };
CONTENT.ports.forEach((p,i) => {
  p[4].split(' ').forEach(cid => {
    if (!portCertDomain[cid]) return;
    const pool = CONTENT.ports.filter(x => x[2] !== p[2]);
    const [d,l] = portCertDomain[cid];
    const others1 = pick(pool,3).map(x=>x[0]);
    const q1 = { id:`gen-${cid}-p${i}`, cert:cid, d, l, t:'mc', q:`Which default port(s) does ${p[2]} use?`, c:[p[0]+' ('+p[1]+')', ...others1.map(o=>o+' ('+CONTENT.ports.find(x=>x[0]===o)[1]+')')], a:0, e:`${p[2]}: ${p[3]}`, gen:true };
    const q2 = { id:`gen-${cid}-r${i}`, cert:cid, d, l, t:'mc', q:`A firewall log shows traffic on port ${p[0]} (${p[1]}). Which protocol is most likely?`, c:[p[2], ...pick(pool,3).map(x=>x[2])], a:0, e:`Port ${p[0]} = ${p[2]}. ${p[3]}`, gen:true };
    [q1,q2].forEach(q => { QS[q.id]=q; QLIST.push(q); });
  });
});
const qsFor = (cid, f) => QLIST.filter(q => q.cert===cid && (!f || f(q)));

/* Flashcards: ports, acronyms, OSI, key-term callouts, and table rows from lessons */
const CARDS = [];
const addCard = (id, deck, cert, f, b) => CARDS.push({id, deck, cert, f, b});
CONTENT.ports.forEach((p,i) => { const certs=p[4].split(' ').map(x=>x==='a1'?'aplus':x); addCard('port'+i,'Ports',certs.join(' '),`Port ${p[0]} (${p[1]})`,`<b>${p[2]}</b><br>${p[3]}`); addCard('portr'+i,'Ports',certs.join(' '),`What port does <b>${p[2]}</b> use?`,`<b>${p[0]}</b> ${p[1]}<br>${p[3]}`); });
CONTENT.acronyms.forEach((a,i) => addCard('acr'+i,'Acronyms',a[2].replace(/a1|a2/g,'aplus'),a[0],a[1]));
CONTENT.osi.forEach(l => addCard('osi'+l.n,'OSI','np sp aplus',`OSI Layer ${l.n}?`,`<b>${l.name}</b><br>${l.desc}<br><small>PDU: ${l.pdu} · ${l.ex}</small>`));
CONTENT.orders.forEach(o => addCard('ord-'+o.id,'Sequences',o.certs.replace(/a1|a2/g,'aplus'),o.title,'<ol style="text-align:left">'+o.items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>'));
const stripMd = s => s.replace(/\*\*/g,'').replace(/~/g,'').trim();
Object.values(LESSONS).forEach(l => {
  const certTag = (l.cert==='a1'||l.cert==='a2') ? 'aplus' : l.cert;
  const lines = l.md.split('\n'); let hdr = null, n = 0;
  lines.forEach(line => {
    const m = line.match(/^!key\s+([^:]+):\s*(.+)$/);
    if (m) addCard(`${l.id}-k${n++}`,'Key terms',certTag,stripMd(m[1]),stripMd(m[2]));
    if (line.startsWith('|')) {
      const cells = line.split('|').slice(1,-1).map(x=>x.trim());
      if (/^[-\s|]+$/.test(line)) return;
      if (!hdr) { hdr = cells; return; }
      if (cells.length >= 2 && cells[0] && cells[0].length < 48 && !cells[0].match(/^\d+$/) && cells.length === hdr.length && cells.length <= 4) {
        const back = cells.slice(1).map((c,i)=> c ? `<b>${esc(stripMd(hdr[i+1]||''))}</b>: ${esc(stripMd(c))}` : '').filter(Boolean).join('<br>');
        if (back) addCard(`${l.id}-t${n++}`,'Lesson tables',certTag,`${esc(stripMd(cells[0]))}<br><small class="mut">${esc(l.t)}</small>`,back);
      }
    } else hdr = null;
  });
});

/* ================= MINI MARKDOWN ================= */
function inline(s){
  return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/~(.+?)~/g,'<code>$1</code>').replace(/&quot;/g,'"');
}
function md(src){
  const out = []; const lines = src.trim().split('\n'); let i=0;
  const tags = {key:'🔑 Key term',tip:'💡 Tip',mnem:'🧠 Mnemonic',exam:'🎯 Exam tip',warn:'⚠️ Watch out'};
  while (i < lines.length) {
    let L = lines[i];
    if (!L.trim()) { i++; continue; }
    let m;
    if ((m = L.match(/^\[\[vis:([\w-]+)\]\]$/))) { out.push(window.renderVis(m[1])); i++; continue; }
    if ((m = L.match(/^!(key|tip|mnem|exam|warn)\s+(.+)$/))) { out.push(`<div class="callout ${m[1]}"><b class="tag">${tags[m[1]]}</b>${inline(m[2])}</div>`); i++; continue; }
    if (L.startsWith('### ')) { out.push('<h4>'+inline(L.slice(4))+'</h4>'); i++; continue; }
    if (L.startsWith('## ')) { out.push('<h3>'+inline(L.slice(3))+'</h3>'); i++; continue; }
    if (L.startsWith('|')) {
      const rows=[]; while (i<lines.length && lines[i].startsWith('|')) { rows.push(lines[i]); i++; }
      const cells = r => r.split('|').slice(1,-1).map(x=>x.trim());
      let h = '<table><thead><tr>'+cells(rows[0]).map(c=>'<th>'+inline(c)+'</th>').join('')+'</tr></thead><tbody>';
      rows.slice(2).forEach(r => h += '<tr>'+cells(r).map(c=>'<td>'+inline(c)+'</td>').join('')+'</tr>');
      out.push(h+'</tbody></table>'); continue;
    }
    if (/^\s*- /.test(L)) { let h='<ul>'; while (i<lines.length && /^\s*- /.test(lines[i])) { h+='<li>'+inline(lines[i].replace(/^\s*- /,''))+'</li>'; i++; } out.push(h+'</ul>'); continue; }
    if (/^\d+\. /.test(L)) { let h='<ol>'; while (i<lines.length && /^\d+\. /.test(lines[i])) { h+='<li>'+inline(lines[i].replace(/^\d+\. /,''))+'</li>'; i++; } out.push(h+'</ol>'); continue; }
    let p=[]; while (i<lines.length && lines[i].trim() && !/^(\||#|!|\[\[|\s*- |\d+\. )/.test(lines[i])) { p.push(lines[i]); i++; }
    if (p.length) out.push('<p>'+inline(p.join(' '))+'</p>'); else { out.push('<p>'+inline(L)+'</p>'); i++; }
  }
  return out.join('\n');
}

/* ================= STUDY PLAN ================= */
const PLANS = {
  sprint:{name:'8‑week sprint', weeks:8, hours:'3–4 h/day, 6 days/week', note:'Very aggressive for three certifications from zero. It is doable if you treat it like a full‑time course. If you fall behind, switch to the 16‑week plan — your progress is kept.'},
  steady:{name:'16‑week steady', weeks:16, hours:'1.5–2 h/day, 6 days/week', note:'Realistic pace for most beginners with a job. Still finishes all three certs in about 4 months.'},
  twelve:{name:'12‑week balanced', weeks:12, hours:'2–3 h/day, 6 days/week', note:'A middle ground.'},
};
const CERT_SHARE = { a1:0.20, a2:0.20, np:0.25, sp:0.35 };
function buildPlan(){
  const P = PLANS[S.plan] || PLANS.sprint; const totalDays = P.weeks*7;
  const certs = CERT_ORDER.filter(c => S.certs.includes(c));
  const share = certs.reduce((t,c)=>t+CERT_SHARE[c],0);
  const days = []; let dayNo = 0;
  certs.forEach((cid, ci) => {
    let n = Math.round(totalDays * CERT_SHARE[cid] / share);
    if (ci === certs.length-1) n = totalDays - dayNo;
    const blockDays = [];
    for (let k=0;k<n;k++) blockDays.push(dayNo+k);
    const studyDays = blockDays.filter(d => d % 7 !== 6); // every 7th day = review day
    const lessons = C[cid].lessons;
    const examDays = 2; // last 2 study days: practice exam + weak review
    const lessonDays = Math.max(1, studyDays.length - examDays);
    const map = {};
    lessons.forEach((l, li) => { const di = studyDays[Math.min(lessonDays-1, Math.floor(li * lessonDays / lessons.length))]; (map[di] = map[di] || []).push({type:'lesson', id:l.id}); });
    // fill empty lesson days with domain quizzes
    let lastL = lessons[0];
    studyDays.slice(0, lessonDays).forEach(d => { if (map[d]) { const ls = map[d].filter(t=>t.type==='lesson'); if (ls.length) lastL = LESSONS[ls[ls.length-1].id]; } else map[d] = [{type:'domain', cert:cid, d:lastL.d}]; });
    const sd = studyDays.slice(lessonDays);
    if (sd[0] !== undefined) map[sd[0]] = (map[sd[0]]||[]).concat([{type:'exam', cert:cid}]);
    if (sd[1] !== undefined) map[sd[1]] = (map[sd[1]]||[]).concat([{type:'weak', cert:cid},{type:'exam', cert:cid, n:2}]);
    blockDays.forEach(d => {
      const tasks = (map[d]||[]).slice();
      if (d % 7 === 6) tasks.push({type:'review'});
      tasks.push({type:'cards'});
      days.push({ n:d, date:addDays(S.start,d), cert:cid, tasks });
    });
    dayNo += n;
  });
  return days;
}
function taskDone(t, day){
  if (t.type==='lesson') return !!S.lessons[t.id];
  if (t.type==='exam') return S.history.filter(h=>h.mode==='exam'&&h.cert===t.cert).length >= (t.n||1);
  if (t.type==='domain') return S.history.some(h=>h.mode==='domain'&&h.cert===t.cert&&h.d===t.d);
  if (t.type==='weak'||t.type==='review') return S.history.some(h=>(h.mode==='weak'||h.mode==='review') && h.date>=day.date);
  if (t.type==='cards') return day.date<today() ? true : dueCards().length===0 && (S.activity[day.date]||0)>0;
  return false;
}
function taskHtml(t, day){
  const done = taskDone(t, day);
  let label='', href='#', icon='';
  if (t.type==='lesson'){ const l=LESSONS[t.id]; label=`${C[l.cert].short}: ${l.t}`; href='#/lesson/'+t.id; icon='📖'; }
  if (t.type==='domain'){ const dm=C[t.cert].domains.find(x=>x.id===t.d); label=`Domain quiz: ${C[t.cert].short} – ${dm.t}`; href=`#/quiz/domain/${t.cert}/${t.d}`; icon='📝'; }
  if (t.type==='exam'){ label=`${t.n===2?'Second ':''}Timed practice exam: ${C[t.cert].short} (${C[t.cert].code})`; href=`#/exam/${t.cert}`; icon='⏱'; }
  if (t.type==='weak'){ label=`Weak‑area review (${Object.keys(S.missed).length} missed)`; href='#/quiz/weak'; icon='🎯'; }
  if (t.type==='review'){ label='Review day: missed questions + a game'; href='#/quiz/weak'; icon='🔁'; }
  if (t.type==='cards'){ label=`Flashcards (${dueCards().length} due)`; href='#/cards'; icon='🃏'; }
  return `<a href="${href}"><span class="chk ${done?'done':''}">${done?'✓':''}</span><span class="grow">${icon} ${esc(label)}</span><span class="mut">›</span></a>`;
}

/* ================= FLASHCARD SRS (Leitner) ================= */
const INTERVALS = [0,1,2,4,8,16,32];
function certMatch(card){ const tags = card.cert.split(' '); return S.certs.some(c => tags.includes(c==='a1'||c==='a2'?'aplus':c)); }
function dueCards(deck){
  const now = Date.now(); let newCount = 0; const t = today();
  const introducedToday = Object.values(S.cards).filter(s=>s.intro===t).length;
  const res = [];
  CARDS.forEach(c => {
    if (!certMatch(c)) return; if (deck && deck!=='All' && c.deck!==deck) return;
    const s = S.cards[c.id];
    if (s) { if (s.due <= now) res.push(c); }
    else if (introducedToday + newCount < S.newPerDay) { newCount++; res.push(c); }
  });
  return res;
}
function gradeCard(id, good){
  const s = S.cards[id] || { box:0, intro:today() };
  s.box = good ? Math.min(s.box+1, INTERVALS.length-1) : 1;
  s.due = Date.now() + INTERVALS[s.box]*864e5 - 3600e3;
  if (!good) s.due = Date.now() + 60e3;
  S.cards[id] = s; bump(); save();
}

/* ================= ROUTER & UI ================= */
const app = $('#app');
const setTitle = t => { $('#title').textContent = t; document.title = t + ' · CertQuest'; };
function toast(msg){ const t=document.createElement('div'); t.className='toast'; t.innerHTML=msg; document.body.appendChild(t); setTimeout(()=>t.remove(),2200); }
let cleanup = null;
function route(){
  if (cleanup) { cleanup(); cleanup = null; }
  closeTip();
  const h = location.hash.replace(/^#\/?/,'') || 'today';
  const [p, ...args] = h.split('/');
  document.querySelectorAll('nav.tabs a').forEach(a => a.classList.toggle('on', a.dataset.tab === ({lesson:'learn',quiz:'practice',exam:'practice',game:'games'}[p]||p)));
  $('#back').style.visibility = ['today','learn','practice','cards','games'].includes(p) ? 'hidden' : 'visible';
  const views = { today:vToday, learn:vLearn, lesson:vLesson, practice:vPractice, quiz:vQuiz, exam:vExam, cards:vCards, games:vGames, game:vGame, progress:vProgress, plan:vPlan, about:vAbout };
  (views[p] || vToday)(...args);
  window.scrollTo(0,0);
}
window.addEventListener('hashchange', route);

/* tap-to-explain on visuals */
let tipEl = null, tipSrc = null;
function closeTip(){ if (tipEl) tipEl.remove(); tipEl = null; if (tipSrc) tipSrc.classList.remove('act'); tipSrc=null; }
document.addEventListener('click', ev => {
  const t = ev.target.closest('[data-tip]');
  if (t && t.closest('.vis-body, .q-vis')) {
    ev.preventDefault(); closeTip(); tipSrc = t; t.classList.add('act');
    tipEl = document.createElement('div'); tipEl.className='tipbox'; tipEl.innerHTML = esc(t.dataset.tip)+'<button aria-label="Close">✕</button>';
    tipEl.querySelector('button').onclick = closeTip; document.body.appendChild(tipEl); return;
  }
  if (tipEl && !ev.target.closest('.tipbox')) closeTip();
});

/* ---------- TODAY ---------- */
function vToday(){
  setTitle('CertQuest');
  const plan = buildPlan(); const t = today();
  let idx = dayDiff(S.start, t); const total = plan.length;
  const day = plan[Math.max(0, Math.min(idx, total-1))];
  const lessonsTotal = CERT_ORDER.filter(c=>S.certs.includes(c)).reduce((n,c)=>n+C[c].lessons.length,0);
  const lessonsDone = Object.keys(S.lessons).filter(id=>LESSONS[id] && S.certs.includes(LESSONS[id].cert)).length;
  // catch-up: earliest unfinished lesson in plan before today
  const behind = plan.filter(d=>d.date<t).flatMap(d=>d.tasks.filter(x=>x.type==='lesson'&&!S.lessons[x.id]));
  const next = plan.flatMap(d=>d.tasks).find(x=>x.type==='lesson'&&!S.lessons[x.id]);
  const P = PLANS[S.plan];
  app.innerHTML = `
  <div class="card"><div class="row" style="justify-content:space-between"><div><div class="mut sm">${idx<0?'Plan starts '+fmtDate(S.start):idx>=total?'Plan complete — keep reviewing!':`Day ${idx+1} of ${total} · ${P.name}`}</div><h2 style="margin:2px 0">${idx>=0&&idx<total?esc(C[day.cert].name):'Your study plan'}</h2></div><div class="stat" style="min-width:86px"><b>🔥 ${streak()}</b><small>day streak</small></div></div>
  <div class="prog"><i style="width:${Math.round(100*lessonsDone/lessonsTotal)}%"></i></div><div class="mut sm">${lessonsDone}/${lessonsTotal} lessons complete</div></div>
  ${behind.length?`<div class="card" style="border-color:var(--warn)"><b>⏳ ${behind.length} lesson${behind.length>1?'s':''} behind schedule.</b> <span class="mut">No stress — do the next one below, or switch to a slower plan in <a href="#/plan">Plan settings</a>.</span></div>`:''}
  <div class="card"><h3>Today · ${fmtDate(t)}</h3><div class="list">${idx>=0&&idx<total?day.tasks.map(x=>taskHtml(x,day)).join(''):`<a href="#/cards"><span class="chk"></span><span class="grow">🃏 Flashcards (${dueCards().length} due)</span></a><a href="#/quiz/weak"><span class="chk"></span><span class="grow">🎯 Weak‑area review</span></a>`}</div>
  ${next?`<a class="btn pri block" href="#/lesson/${next.id}">▶ Continue: ${esc(LESSONS[next.id].t)}</a>`:''}</div>
  <div class="grid2" style="margin-bottom:14px">
   <a class="stat" href="#/cards" style="text-decoration:none;color:inherit"><b>${dueCards().length}</b><small>cards due</small></a>
   <a class="stat" href="#/quiz/weak" style="text-decoration:none;color:inherit"><b>${Object.keys(S.missed).length}</b><small>missed to review</small></a>
  </div>
  <div class="card"><h3>Your path</h3><div class="mut sm" style="margin-bottom:6px">Recommended order: A+ Core 1 → A+ Core 2 → Network+ → Security+. Each builds on the last.</div>
  ${CERT_ORDER.filter(c=>S.certs.includes(c)).map(c=>{const d=C[c].lessons.filter(l=>S.lessons[l.id]).length,n=C[c].lessons.length;const pd=plan.filter(x=>x.cert===c);return `<div style="margin:10px 0"><div class="row"><span class="certdot" style="background:${C[c].color}"></span><b class="grow">${C[c].name} <span class="mut sm">${C[c].code}</span></b><span class="sm mut">${pd.length?fmtDate(pd[0].date)+' → '+fmtDate(pd[pd.length-1].date):''}</span></div><div class="prog"><i style="width:${100*d/n}%;background:${C[c].color}"></i></div></div>`}).join('')}
  <a class="btn block" href="#/plan">📅 Full plan & settings</a><a class="btn block" href="#/progress">📊 Progress & readiness</a></div>`;
}

/* ---------- PLAN ---------- */
function vPlan(){
  setTitle('Study plan');
  const plan = buildPlan(); const t = today(); const P = PLANS[S.plan];
  app.innerHTML = `<div class="card"><h3>Plan settings</h3>
   <label class="mut sm">Pace</label><div class="seg">${Object.entries(PLANS).map(([k,v])=>`<button data-plan="${k}" class="${S.plan===k?'on':''}">${v.name}</button>`).join('')}</div>
   <div class="callout ${S.plan==='sprint'?'warn':'tip'}"><b class="tag">${P.hours}</b>${esc(P.note)}</div>
   <div class="callout exam"><b class="tag">Honest pacing</b>Three certifications (four exams: A+ Core 1, A+ Core 2, Network+, Security+) in 8 weeks means roughly 200+ hours of study. Most people need 6–10 weeks per cert. Book each exam only after you score 85%+ on two practice exams for it. If you only need Security+, untick the others below and the whole plan spreads over Security+.</div>
   <label class="mut sm">Start date</label><input type="date" id="start" value="${S.start}" style="width:100%;min-height:46px;font-size:16px;border-radius:12px;border:1px solid var(--line);background:var(--card2);color:var(--tx);padding:8px;margin:4px 0 12px">
   <label class="mut sm">Certifications in your plan (in recommended order)</label>
   ${CERT_ORDER.map(c=>`<label class="row" style="min-height:44px"><input type="checkbox" data-cert="${c}" ${S.certs.includes(c)?'checked':''} style="width:22px;height:22px"> <span class="certdot" style="background:${C[c].color}"></span> ${C[c].name} (${C[c].code})</label>`).join('')}
  </div>
  ${[...Array(Math.ceil(plan.length/7)).keys()].map(w=>{const wk=plan.slice(w*7,w*7+7);return `<div class="card"><h3>Week ${w+1} <span class="mut sm">${fmtDate(wk[0].date)}</span></h3><div class="list">${wk.map(d=>`<div class="li" style="${d.date===t?'background:var(--card2);border-radius:12px':''};flex-direction:column;align-items:stretch;gap:2px"><div class="row"><span class="certdot" style="background:${C[d.cert].color}"></span><b>Day ${d.n+1}</b><span class="mut sm">${fmtDate(d.date)}</span></div>${d.tasks.filter(x=>x.type!=='cards').map(x=>taskHtml(x,d)).join('')||'<span class="mut sm">Flashcards only</span>'}</div>`).join('')}</div></div>`}).join('')}`;
  app.querySelectorAll('[data-plan]').forEach(b=>b.onclick=()=>{S.plan=b.dataset.plan;save();vPlan();});
  $('#start').onchange = e => { if (e.target.value) { S.start = e.target.value; save(); vPlan(); } };
  app.querySelectorAll('[data-cert]').forEach(cb=>cb.onchange=()=>{ const c=cb.dataset.cert; S.certs = cb.checked ? CERT_ORDER.filter(x=>S.certs.includes(x)||x===c) : S.certs.filter(x=>x!==c); if(!S.certs.length) S.certs=['sp']; save(); vPlan(); });
}

/* ---------- LEARN ---------- */
let learnCert = null;
function vLearn(cid){
  setTitle('Learn');
  learnCert = cid || learnCert || S.certs[0] || 'a1';
  const c = C[learnCert];
  app.innerHTML = `<div class="seg">${CERT_ORDER.map(k=>`<button data-c="${k}" class="${k===learnCert?'on':''}">${C[k].short}</button>`).join('')}</div>
  <div class="card"><h2>${c.name}</h2><div class="mut sm">Exam ${c.code} · up to ${c.maxQ} questions · ${c.minutes} min · pass ${c.pass}</div></div>
  ${c.domains.map(d=>{const ls=c.lessons.filter(l=>l.d===d.id);const done=ls.filter(l=>S.lessons[l.id]).length;return `<div class="card"><div class="row"><h3 class="grow" style="margin:0">${d.id}.0 ${esc(d.t)}</h3><span class="pill">${d.w}%</span></div><div class="prog"><i style="width:${100*done/ls.length}%;background:${c.color}"></i></div>
  <div class="list">${ls.map(l=>`<a href="#/lesson/${l.id}"><span class="chk ${S.lessons[l.id]?'done':''}">${S.lessons[l.id]?'✓':''}</span><span class="grow">${esc(l.t)}</span><span class="mut sm">${qsFor(learnCert,q=>q.l===l.id).length} Q</span></a>`).join('')}</div>
  <a class="btn block sm" href="#/quiz/domain/${learnCert}/${d.id}">📝 Domain ${d.id} quiz</a></div>`}).join('')}`;
  app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>vLearn(b.dataset.c));
}
function vLesson(id){
  const l = LESSONS[id]; if (!l) return vLearn();
  const c = C[l.cert]; setTitle(c.short);
  const ls = c.lessons; const nxt = ls[l.idx+1]; const prv = ls[l.idx-1];
  const n = qsFor(l.cert,q=>q.l===id).length;
  app.innerHTML = `<div class="card lesson"><span class="pill" style="background:${c.color};color:#111;border:0">${c.short} · Domain ${l.d}.0</span><h2 style="margin-top:8px">${esc(l.t)}</h2>${md(l.md)}</div>
  <div class="card"><button class="btn ok block" id="done">${S.lessons[id]?'✓ Completed — retake quiz':'✓ Mark complete & take lesson quiz'} (${n} Q)</button>
  <div class="grid2" style="margin-top:10px">${prv?`<a class="btn" href="#/lesson/${prv.id}">‹ Prev</a>`:'<span></span>'}${nxt?`<a class="btn" href="#/lesson/${nxt.id}">Next ›</a>`:`<a class="btn" href="#/exam/${l.cert}">⏱ Practice exam</a>`}</div></div>`;
  $('#done').onclick = () => { if (!S.lessons[id]) { S.lessons[id] = Date.now(); bump(); } save(); location.hash = '#/quiz/lesson/'+id; };
}

/* ---------- PRACTICE HUB ---------- */
let pracCert = null;
function vPractice(){
  setTitle('Practice');
  pracCert = pracCert || S.certs[0] || 'a1'; const c = C[pracCert];
  const all = qsFor(pracCert); const hand = all.filter(q=>q.hand).length;
  const seen = all.filter(q=>S.qs[q.id]); const right = seen.reduce((n,q)=>n+S.qs[q.id].c,0), tot = seen.reduce((n,q)=>n+S.qs[q.id].c+S.qs[q.id].w,0);
  const vis = all.filter(q=>q.v).length; const pbq = all.filter(q=>q.t==='order'||q.t==='match').length;
  app.innerHTML = `<div class="seg">${CERT_ORDER.map(k=>`<button data-c="${k}" class="${k===pracCert?'on':''}">${C[k].short}</button>`).join('')}</div>
  <div class="card"><h2>${c.name} <span class="mut sm">${c.code}</span></h2><div class="grid2"><div class="stat"><b>${all.length}</b><small>questions (${hand} written + ${all.length-hand} port drills)</small></div><div class="stat"><b>${tot?Math.round(100*right/tot)+'%':'—'}</b><small>your accuracy</small></div></div></div>
  <div class="card"><a class="btn pri block" href="#/exam/${pracCert}">⏱ Timed practice exam</a>
  <a class="btn block" href="#/quiz/quick/${pracCert}">⚡ Quick 10 (random)</a>
  <a class="btn block" href="#/quiz/weak">🎯 Weak‑area review (${Object.keys(S.missed).length} missed)</a>
  <a class="btn block" href="#/quiz/visual/${pracCert}">🖼 Visual questions (${vis})</a>
  <a class="btn block" href="#/quiz/pbq/${pracCert}">🧩 Performance‑based style (${pbq} order/match)</a></div>
  <div class="card"><h3>Domain quizzes</h3><div class="list">${c.domains.map(d=>{const qs=all.filter(q=>q.d===d.id);const s=qs.filter(q=>S.qs[q.id]);const r=s.reduce((n,q)=>n+S.qs[q.id].c,0),t=s.reduce((n,q)=>n+S.qs[q.id].c+S.qs[q.id].w,0);return `<a href="#/quiz/domain/${pracCert}/${d.id}"><span class="grow">${d.id}.0 ${esc(d.t)}<div class="mut sm">${qs.length} questions · ${d.w}% of exam</div></span><b>${t?Math.round(100*r/t)+'%':'—'}</b></a>`}).join('')}</div></div>
  <div class="card"><h3>Lesson quizzes</h3><div class="list">${c.lessons.map(l=>`<a href="#/quiz/lesson/${l.id}"><span class="grow">${esc(l.t)}</span><span class="mut sm">${qsFor(pracCert,q=>q.l===l.id).length} Q ›</span></a>`).join('')}</div></div>`;
  app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{pracCert=b.dataset.c;vPractice();});
}

/* ---------- QUIZ ENGINE ---------- */
function prepQ(q){
  const r = Object.assign({}, q);
  if (q.t==='mc'||q.t==='ms') {
    const idx = shuffle(q.c.map((_,i)=>i));
    r.opts = idx.map(i=>q.c[i]);
    const ans = Array.isArray(q.a)?q.a:[q.a];
    r.correct = idx.map((orig,newI)=>ans.includes(orig)?newI:-1).filter(x=>x>=0);
  }
  if (q.t==='order') r.pool = shuffle(q.items);
  if (q.t==='match') r.rights = shuffle(q.pairs.map(p=>p[1]));
  return r;
}
function isCorrect(q, resp){
  if (resp==null) return false;
  if (q.t==='mc'||q.t==='ms') { const a=[...resp].sort().join(), b=[...q.correct].sort().join(); return a===b; }
  if (q.t==='order') return resp.length===q.items.length && resp.every((x,i)=>x===q.items[i]);
  if (q.t==='match') return q.pairs.every((p,i)=>resp[i]===p[1]);
  return false;
}
function record(q, ok, mode){
  const s = S.qs[q.id] || {c:0,w:0,s:0};
  if (ok) { s.c++; s.s++; } else { s.w++; s.s=0; }
  s.t = Date.now(); S.qs[q.id] = s;
  if (!ok) S.missed[q.id] = Date.now();
  else if (S.missed[q.id] && (mode==='weak' ? s.s>=2 : s.s>=3)) delete S.missed[q.id];
  bump();
}
function qBody(q, resp, reveal){
  const typeLbl = {mc:'Choose one',ms:`Choose ${q.correct?q.correct.length:''}`,order:'Put in order',match:'Match each item'}[q.t];
  let h = `${q.v?`<div class="q-vis">${window.renderVis(q.v)}</div>`:''}<div class="q-text">${esc(q.q)}</div><div class="mut sm" style="margin:-8px 0 10px">${typeLbl}</div>`;
  if (q.t==='mc'||q.t==='ms') {
    h += q.opts.map((o,i)=>{ const sel = resp && resp.includes(i); let cls = sel?'sel':''; if (reveal) { if (q.correct.includes(i)) cls='right'; else if (sel) cls='wrong'; }
      return `<button class="opt ${cls}" data-i="${i}" ${reveal?'disabled':''}><span class="ltr">${q.t==='ms'?(sel?'☑':'☐'):'ABCDEF'[i]}</span><span>${esc(o)}</span></button>`; }).join('');
  }
  if (q.t==='order') {
    const r = resp||[];
    h += `<div class="ord-ans">${r.map((x,i)=>`<button class="opt ${reveal?(x===q.items[i]?'right':'wrong'):''}" data-rm="${i}" ${reveal?'disabled':''}><span class="ltr">${i+1}</span><span>${esc(x)}</span></button>`).join('')}</div>`;
    if (!reveal) h += `<div class="mut sm">Tap to add ↓ (tap an item above to remove it)</div><div class="ord-pool">${q.pool.filter(x=>!r.includes(x)).map(x=>`<button class="opt" data-add="${esc(x)}"><span class="ltr">+</span><span>${esc(x)}</span></button>`).join('')}</div>`;
    else if (!isCorrect(q,r)) h += `<div class="expl"><b>Correct order:</b><ol>${q.items.map(x=>'<li>'+esc(x)+'</li>').join('')}</ol></div>`;
  }
  if (q.t==='match') {
    const r = resp||[];
    h += q.pairs.map((p,i)=>`<div class="match-row ${reveal?(r[i]===p[1]?'right':'wrong'):''}"><b>${esc(p[0])}</b><select data-m="${i}" ${reveal?'disabled':''}><option value="">— choose —</option>${q.rights.map(x=>`<option ${r[i]===x?'selected':''}>${esc(x)}</option>`).join('')}</select>${reveal&&r[i]!==p[1]?`<span class="sm">✔ ${esc(p[1])}</span>`:''}</div>`).join('');
  }
  if (reveal) { const ok=isCorrect(q,resp); h += `<div class="expl ${ok?'ok':'bad'}"><b>${ok?'✅ Correct':'❌ Not quite'}</b><br>${esc(q.e)}${q.l&&LESSONS[q.l]?`<br><a href="#/lesson/${q.l}">📖 Review: ${esc(LESSONS[q.l].t)}</a>`:''}</div>`; }
  return h;
}
function bindQ(el, q, getResp, setResp, onChange, single){
  el.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{ const i=+b.dataset.i; let r=getResp()||[]; if (q.t==='mc') r=[i]; else r = r.includes(i)? r.filter(x=>x!==i) : r.concat(i); setResp(r); onChange(q.t==='mc'&&single); });
  el.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{ setResp((getResp()||[]).concat(b.dataset.add)); onChange(false); });
  el.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{ const r=(getResp()||[]).slice(); r.splice(+b.dataset.rm,1); setResp(r); onChange(false); });
  el.querySelectorAll('[data-m]').forEach(s=>s.onchange=()=>{ const r=(getResp()||[]).slice(); r[+s.dataset.m]=s.value; setResp(r); onChange(false); });
}
function respReady(q, r){ if (!r) return false; if (q.t==='mc') return r.length===1; if (q.t==='ms') return r.length===q.correct.length; if (q.t==='order') return r.length===q.items.length; if (q.t==='match') return q.pairs.every((_,i)=>r[i]); }

function vQuiz(mode, a, b){
  let pool = [], title = 'Quiz', meta = {mode};
  if (mode==='lesson') { const lq = qsFor(LESSONS[a].cert, q=>q.l===a); pool = lq.filter(q=>q.hand).concat(pick(lq.filter(q=>!q.hand), 5)); title = LESSONS[a].t; meta.cert = LESSONS[a].cert; meta.l=a; }
  else if (mode==='domain') { pool = pick(qsFor(a, q=>q.d===b), 20); title = `${C[a].short} · Domain ${b}`; meta.cert=a; meta.d=b; }
  else if (mode==='quick') { pool = pick(qsFor(a), 10); title = `${C[a].short} · Quick 10`; meta.cert=a; }
  else if (mode==='visual') { pool = shuffle(qsFor(a, q=>q.v)); title = `${C[a].short} · Visual`; meta.cert=a; }
  else if (mode==='pbq') { pool = shuffle(qsFor(a, q=>q.t==='order'||q.t==='match')); title = `${C[a].short} · PBQ style`; meta.cert=a; }
  else if (mode==='weak') { pool = Object.keys(S.missed).map(id=>QS[id]).filter(Boolean).sort((x,y)=>S.missed[x.id]-S.missed[y.id]).slice(0,20); title='Weak‑area review';
    if (pool.length < 5) { const extra = QLIST.filter(q=>S.certs.includes(q.cert) && S.qs[q.id] && S.qs[q.id].w>0 && !pool.includes(q)); pool = pool.concat(pick(extra, 10-pool.length)); } }
  setTitle(title);
  if (!pool.length) { app.innerHTML = `<div class="card"><h3>Nothing here yet 🎉</h3><p class="mut">${mode==='weak'?'You have no missed questions to review. Take a quiz first — any question you miss lands here automatically and keeps coming back until you get it right twice in a row.':'No questions found.'}</p><a class="btn pri block" href="#/practice">Go to Practice</a></div>`; return; }
  const qs = (mode==='lesson'? shuffle(pool) : pool).map(prepQ);
  let i = 0, score = 0; const resps = [];
  const render = () => {
    const q = qs[i]; const revealed = resps[i] && resps[i].done;
    app.innerHTML = `<div class="card"><div class="q-meta"><span>Question ${i+1} / ${qs.length}</span><span>${q.cert?C[q.cert].short:''} · D${q.d}</span></div><div class="prog"><i style="width:${100*i/qs.length}%"></i></div><div id="qb">${qBody(q, resps[i]&&resps[i].r, revealed)}</div>
    ${revealed ? `<button class="btn pri block" id="nx">${i<qs.length-1?'Next ›':'See results'}</button>` : `<button class="btn pri block" id="chk" ${respReady(q,resps[i]&&resps[i].r)?'':'disabled'}>Check answer</button>`}</div>`;
    if (!revealed) bindQ($('#qb'), q, ()=>resps[i]&&resps[i].r, r=>resps[i]={r}, (auto)=>{ if (auto) check(); else render(); }, true);
    const chk = $('#chk'); if (chk) chk.onclick = check;
    const nx = $('#nx'); if (nx) nx.onclick = () => { if (i < qs.length-1) { i++; render(); } else finish(); };
  };
  const check = () => { const q=qs[i]; const ok=isCorrect(q,resps[i].r); resps[i].done=true; resps[i].ok=ok; if (ok) score++; record(q, ok, mode); save(); render(); };
  const finish = () => {
    const pct = Math.round(100*score/qs.length);
    S.history.push(Object.assign({date:today(), score, total:qs.length, pct}, meta)); save();
    app.innerHTML = `<div class="card" style="text-align:center"><div style="font-size:56px">${pct>=85?'🏆':pct>=70?'💪':'📚'}</div><h2>${score} / ${qs.length} · ${pct}%</h2><p class="mut">${pct>=85?'Excellent — you own this material.':pct>=70?'Solid. Review the misses below.':'Keep going — missed questions are saved to Weak‑area review.'}</p>
    <button class="btn pri block" id="again">↻ Try again</button><a class="btn block" href="#/quiz/weak">🎯 Review missed</a>${meta.l&&LESSONS[meta.l]&&C[LESSONS[meta.l].cert].lessons[LESSONS[meta.l].idx+1]?`<a class="btn block" href="#/lesson/${C[LESSONS[meta.l].cert].lessons[LESSONS[meta.l].idx+1].id}">Next lesson ›</a>`:''}<a class="btn block" href="#/today">Back to Today</a></div>
    <div class="card"><h3>Review</h3>${qs.map((q,k)=>`<div style="padding:10px 0;border-bottom:1px solid var(--line)"><b>${resps[k].ok?'✅':'❌'} ${esc(q.q)}</b><div class="mut sm">${esc(q.e)}</div></div>`).join('')}</div>`;
    $('#again').onclick = () => vQuiz(mode,a,b);
  };
  render();
}

/* ---------- TIMED PRACTICE EXAM ---------- */
function buildExam(cid, n){
  const c = C[cid]; const all = qsFor(cid);
  const out = [];
  c.domains.forEach(d => { const k = Math.max(1, Math.round(n*d.w/100)); out.push(...pick(all.filter(q=>q.d===d.id && (q.hand || Math.random()<0.3)), k)); });
  // add PBQs at the start, like the real exam
  const pbq = out.filter(q=>q.t==='order'||q.t==='match'); const rest = shuffle(out.filter(q=>!(q.t==='order'||q.t==='match')));
  return pbq.concat(rest).slice(0, n);
}
function vExam(cid, nStr){
  const c = C[cid]; setTitle(c.short+' exam');
  if (!nStr) {
    app.innerHTML = `<div class="card"><h2>⏱ ${c.name} practice exam</h2><p>Questions are weighted by the official ${c.code} domain percentages. Performance‑based style items come first, like the real exam. You can flag questions and jump around. Explanations appear at the end.</p>
    <div class="callout exam"><b class="tag">Real exam</b>Up to ${c.maxQ} questions · ${c.minutes} minutes · passing ${c.pass}. The scaled score shown here is only an estimate.</div>
    ${[[30,30],[60,60],[c.maxQ,c.minutes]].map(([n,m])=>`<a class="btn ${n===c.maxQ?'pri':''} block" href="#/exam/${cid}/${n}">${n} questions · ${m} min</a>`).join('')}</div>`;
    return;
  }
  const n = +nStr; const mins = n===c.maxQ ? c.minutes : n;
  const qs = buildExam(cid, n).map(prepQ); const resp = []; const flags = new Set(); let i = 0; const end = Date.now()+mins*60e3; let done=false;
  const tick = setInterval(()=>{ const el=$('#tm'); if (!el) return; const left=Math.max(0,end-Date.now()); el.textContent=fmtT(left); el.classList.toggle('low',left<300e3); if (left<=0 && !done) submit(); }, 1000);
  cleanup = () => clearInterval(tick);
  const fmtT = ms => { const s=Math.floor(ms/1000); return Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); };
  const render = () => {
    const q = qs[i];
    app.innerHTML = `<div class="card"><div class="q-meta"><span>Q ${i+1}/${qs.length}</span><span class="timer" id="tm">${fmtT(end-Date.now())}</span><button class="btn sm" id="fl">${flags.has(i)?'🚩 Flagged':'⚑ Flag'}</button></div><div id="qb">${qBody(q, resp[i], false)}</div>
    <div class="grid2"><button class="btn" id="pv" ${i?'':'disabled'}>‹ Prev</button><button class="btn pri" id="nx">${i<qs.length-1?'Next ›':'Review'}</button></div></div>
    <div class="card"><div class="navgrid">${qs.map((_,k)=>`<button data-go="${k}" class="${resp[k]&&respReady(qs[k],resp[k])?'ans':''} ${flags.has(k)?'flag':''} ${k===i?'cur':''}">${k+1}</button>`).join('')}</div><button class="btn ok block" id="sub">Submit exam</button></div>`;
    bindQ($('#qb'), q, ()=>resp[i], r=>resp[i]=r, ()=>render(), false);
    $('#fl').onclick=()=>{ flags.has(i)?flags.delete(i):flags.add(i); render(); };
    $('#pv').onclick=()=>{ i--; render(); }; $('#nx').onclick=()=>{ if(i<qs.length-1){i++;render();} else window.scrollTo(0,document.body.scrollHeight); };
    app.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{ i=+b.dataset.go; render(); });
    $('#sub').onclick=()=>{ const un = qs.filter((q,k)=>!respReady(q,resp[k])).length; if (!un || confirm(`${un} unanswered. Submit anyway?`)) submit(); };
  };
  const submit = () => {
    done = true; clearInterval(tick);
    let score=0; const byD = {};
    qs.forEach((q,k)=>{ const ok=isCorrect(q,resp[k]); if(ok) score++; record(q,ok,'exam'); (byD[q.d]=byD[q.d]||{c:0,t:0}); byD[q.d].t++; if(ok) byD[q.d].c++; });
    const pct = score/qs.length; const scaled = Math.round(100+800*pct); const passN = parseInt(c.pass);
    S.history.push({date:today(), mode:'exam', cert:cid, score, total:qs.length, pct:Math.round(pct*100), scaled}); save();
    app.innerHTML = `<div class="card" style="text-align:center"><div style="font-size:52px">${scaled>=passN?'🎉':'📚'}</div><h2>${score}/${qs.length} · ${Math.round(pct*100)}%</h2><div class="stat"><b>~${scaled}</b><small>estimated scaled score (pass ${c.pass})</small></div>
    <p class="mut sm">CompTIA scaling isn't public; this is a rough estimate. Aim for 85%+ on practice exams before booking.</p></div>
    <div class="card"><h3>By domain</h3>${c.domains.map(d=>{const r=byD[d.id]||{c:0,t:0};const p=r.t?Math.round(100*r.c/r.t):0;return `<div style="margin:8px 0"><div class="row"><span class="grow sm">${d.id}.0 ${esc(d.t)}</span><b>${r.c}/${r.t}</b></div><div class="prog"><i style="width:${p}%;background:${p>=80?'var(--ok)':p>=65?'var(--warn)':'var(--bad)'}"></i></div></div>`}).join('')}
    <a class="btn pri block" href="#/quiz/weak">🎯 Drill what you missed</a></div>
    <div class="card"><h3>Answer review</h3><div class="navgrid" style="margin-bottom:10px">${qs.map((q,k)=>`<button data-rv="${k}" class="${isCorrect(q,resp[k])?'r':'w'}">${k+1}</button>`).join('')}</div><div id="rv"></div></div>`;
    const showRv = k => { $('#rv').innerHTML = `<div class="mut sm">Question ${k+1}</div>`+qBody(qs[k], resp[k]||[], true); };
    app.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>showRv(+b.dataset.rv)); showRv(qs.findIndex((q,k)=>!isCorrect(q,resp[k]))>=0?qs.findIndex((q,k)=>!isCorrect(q,resp[k])):0);
    window.scrollTo(0,0);
  };
  render();
}

/* ---------- FLASHCARDS ---------- */
let deckSel = 'All';
function vCards(){
  setTitle('Flashcards');
  const decks = ['All', ...new Set(CARDS.map(c=>c.deck))];
  const due = dueCards(deckSel);
  const total = CARDS.filter(c=>certMatch(c) && (deckSel==='All'||c.deck===deckSel)).length;
  const learned = CARDS.filter(c=>certMatch(c)&&S.cards[c.id]&&S.cards[c.id].box>=3).length;
  app.innerHTML = `<div class="seg">${decks.map(d=>`<button data-d="${d}" class="${d===deckSel?'on':''}">${d}</button>`).join('')}</div>
  <div class="card"><div class="grid2"><div class="stat"><b>${due.length}</b><small>due now</small></div><div class="stat"><b>${learned}</b><small>well known (box 3+)</small></div></div><div class="mut sm" style="margin-top:8px">${total} cards in this deck for your selected certs. Leitner spaced repetition: "Got it" moves a card to a longer interval (1→2→4→8→16→32 days); "Again" brings it back soon. Up to ${S.newPerDay} new cards/day.</div></div>
  <div id="fcz"></div>`;
  app.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{deckSel=b.dataset.d;vCards();});
  const q = shuffle(due); let k = 0;
  const show = () => {
    const z = $('#fcz'); if (!z) return;
    if (k >= q.length) { z.innerHTML = `<div class="card" style="text-align:center"><div style="font-size:48px">✅</div><h3>All caught up!</h3><p class="mut">Come back tomorrow, or play a game to keep the streak going.</p><a class="btn pri block" href="#/games">🎮 Games</a></div>`; return; }
    const c = q[k];
    z.innerHTML = `<div class="mut sm">${c.deck} · ${k+1}/${q.length}${S.cards[c.id]?' · box '+S.cards[c.id].box:' · new'}</div><div class="fc" id="fc"><div class="fc-in"><div class="fc-f"><b>${c.f}</b><small class="mut" style="margin-top:12px">tap to flip</small></div><div class="fc-b"><div>${c.b}</div></div></div></div>
    <div class="grid2"><button class="btn" id="ag" style="border-color:var(--bad)">↺ Again</button><button class="btn ok" id="gd">✓ Got it</button></div>`;
    $('#fc').onclick = () => $('#fc').classList.toggle('flip');
    $('#ag').onclick = () => { gradeCard(c.id,false); q.push(c); k++; show(); };
    $('#gd').onclick = () => { gradeCard(c.id,true); k++; show(); };
  };
  show();
}

/* ---------- GAMES ---------- */
const GAMES = [
  {id:'ports',n:'Port Race',i:'🏁',d:'60 seconds: match ports and protocols as fast as you can.'},
  {id:'acro',n:'Acronym Blitz',i:'⚡',d:'60 seconds of acronym speed rounds.'},
  {id:'attack',n:'Attack Sorter',i:'🛡',d:'Classify each attack scenario into the right category.'},
  {id:'osi',n:'OSI Stack',i:'🥞',d:'Drop each protocol, device or concept onto its OSI layer.'},
  {id:'order',n:'Order Up',i:'🔢',d:'Put troubleshooting, IR, laser printing & more in order.'},
  {id:'subnet',n:'Subnet Sprint',i:'🧮',d:'Unlimited random subnetting: network, broadcast, hosts, masks.'},
];
function vGames(){
  setTitle('Games');
  app.innerHTML = GAMES.map(g=>`<a class="card row" href="#/game/${g.id}" style="text-decoration:none;color:inherit"><span style="font-size:38px">${g.i}</span><span class="grow"><b>${g.n}</b><div class="mut sm">${g.d}</div></span><span class="pill">Best ${S.games[g.id]||0}</span></a>`).join('');
}
function endGame(id, score, extra=''){
  if (!location.hash.startsWith('#/game/'+id)) return;
  const best = S.games[id]||0; if (score>best) S.games[id]=score; bump(); save();
  app.innerHTML = `<div class="card" style="text-align:center"><div style="font-size:56px">${score>best?'🏆':'🎮'}</div><h2>Score: ${score}</h2><p class="mut">${score>best?'New personal best!':'Best: '+best}</p>${extra}<button class="btn pri block" id="again">Play again</button><a class="btn block" href="#/games">All games</a></div>`;
  $('#again').onclick = () => vGame(id);
}
function timedMC(id, title, gen, secs=60){
  setTitle(title);
  let score=0, streakN=0, end=Date.now()+secs*1000, cur, missed=[];
  const tick = setInterval(()=>{ const left=Math.max(0,Math.ceil((end-Date.now())/1000)); const el=$('#gt'); if(el) el.textContent=left+'s'; if(left<=0){ clearInterval(tick); endGame(id, score, missed.length?`<div class="card" style="text-align:left"><b>Review</b>${missed.slice(-8).map(m=>`<div class="sm" style="padding:4px 0">${m}</div>`).join('')}</div>`:''); } },250);
  cleanup = () => clearInterval(tick);
  const myHash = location.hash;
  const next = () => {
    if (location.hash !== myHash) return;
    cur = gen();
    app.innerHTML = `<div class="card" id="gcard"><div class="game-hud"><span>⏱ <span id="gt">${secs}s</span></span><span>🔥 ${streakN}</span><span>⭐ ${score}</span></div><div class="mut sm" style="text-align:center">${cur.hint||''}</div><div class="big-prompt">${cur.p}</div>${cur.opts.map((o,i)=>`<button class="opt" data-o="${i}"><span class="ltr">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`).join('')}</div>`;
    app.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{ const ok = cur.opts[+b.dataset.o]===cur.a; if(ok){ streakN++; score += 1 + Math.floor(streakN/5); } else { streakN=0; missed.push(`${cur.p.replace(/<[^>]+>/g,'')} → <b>${esc(cur.a)}</b>`); end -= 2000; } $('#gcard').classList.add(ok?'flash-ok':'flash-bad'); setTimeout(next, ok?150:450); });
  };
  next();
}
function vGame(id){
  const sel = S.certs;
  if (id==='ports') {
    const pool = CONTENT.ports.filter(p=>p[4].split(' ').some(c=>sel.includes(c)||(c==='a1'&&sel.includes('a2'))));
    return timedMC('ports','Port Race', () => { const p = pool[Math.floor(Math.random()*pool.length)]; const others = pick(pool.filter(x=>x!==p),3);
      return Math.random()<.5 ? {hint:'Which protocol uses…', p:'Port '+p[0], opts:shuffle([p[2],...others.map(x=>x[2])]), a:p[2]} : {hint:'Which port does this use?', p:p[2], opts:shuffle([p[0],...others.map(x=>x[0])]), a:p[0]}; });
  }
  if (id==='acro') {
    const pool = CONTENT.acronyms.filter(a=>a[2].split(' ').some(c=>sel.includes(c)));
    return timedMC('acro','Acronym Blitz', () => { const a = pool[Math.floor(Math.random()*pool.length)]; const o = pick(pool.filter(x=>x!==a),3); return {hint:'What does it stand for?', p:a[0], opts:shuffle([a[1],...o.map(x=>x[1])]), a:a[1]}; });
  }
  if (id==='subnet') return timedMC('subnet','Subnet Sprint', subnetQ, 90);
  if (id==='attack') {
    setTitle('Attack Sorter'); const rounds = pick(CONTENT.attacks, 12); let k=0, score=0; const log=[]; const myHash = location.hash;
    const show = () => { if (location.hash !== myHash) return; if (k>=rounds.length) return endGame('attack', score, `<div class="card" style="text-align:left">${log.join('')}</div>`); const [s,cat,why]=rounds[k];
      app.innerHTML = `<div class="card" id="gcard"><div class="game-hud"><span>${k+1}/${rounds.length}</span><span>⭐ ${score}</span></div><div class="q-text" style="min-height:90px">${esc(s)}</div><div class="cats">${CONTENT.attackCats.map(c=>`<button class="btn" data-c="${esc(c)}">${esc(c)}</button>`).join('')}</div><div id="why"></div></div>`;
      app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{ const ok=b.dataset.c===cat; if(ok) score++; log.push(`<div class="sm" style="padding:4px 0">${ok?'✅':'❌'} ${esc(s)} → <b>${esc(cat)}</b>: ${esc(why)}</div>`); app.querySelectorAll('[data-c]').forEach(x=>{x.disabled=true; if(x.dataset.c===cat) x.classList.add('ok');}); $('#why').innerHTML=`<div class="expl ${ok?'ok':'bad'}"><b>${ok?'Correct!':'It\'s '+esc(cat)}</b> — ${esc(why)}</div><button class="btn pri block" id="nx">Next ›</button>`; $('#nx').onclick=()=>{k++;show();}; }); };
    return show();
  }
  if (id==='osi') {
    setTitle('OSI Stack');
    const items = []; CONTENT.osi.forEach(l => { l.ex.split(',').forEach(x=>items.push([x.trim(),l.n])); l.dev.split(',').forEach(x=>{ if(x.trim()!=='—') items.push([x.trim(),l.n]); }); items.push([l.pdu.split(' (')[0]+' (PDU)', l.n]); });
    const uniq = items.filter((x,i)=>items.findIndex(y=>y[0]===x[0])===i && !(x[0]==='Data (PDU)'));
    const rounds = pick(uniq, 15); let k=0, score=0, t0=Date.now(); const log=[]; const myHash = location.hash;
    const show = () => { if (location.hash !== myHash) return; if (k>=rounds.length) { const secs=Math.round((Date.now()-t0)/1000); return endGame('osi', Math.max(0, score*10 - Math.floor(secs/3)), `<p class="mut">${score}/15 correct in ${secs}s</p><div class="card" style="text-align:left">${log.join('')}</div>`); }
      const [it, n] = rounds[k];
      app.innerHTML = `<div class="card" id="gcard"><div class="game-hud"><span>${k+1}/15</span><span>⭐ ${score}</span></div><div class="mut sm" style="text-align:center">Which OSI layer?</div><div class="big-prompt" style="font-size:24px">${esc(it)}</div><div class="layers">${[1,2,3,4,5,6,7].map(L=>`<button class="btn l${L}" style="color:#111" data-l="${L}"><b>${L}</b><small>${CONTENT.osi.find(o=>o.n===L).name.slice(0,5)}</small></button>`).join('')}</div><div class="mut sm" style="margin-top:10px;text-align:center">Please Do Not Throw Sausage Pizza Away</div></div>`;
      app.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{ const ok=+b.dataset.l===n; if(ok) score++; log.push(`<div class="sm">${ok?'✅':'❌'} ${esc(it)} → Layer ${n} ${CONTENT.osi.find(o=>o.n===n).name}</div>`); $('#gcard').classList.add(ok?'flash-ok':'flash-bad'); if(!ok) toast(`${esc(it)} = Layer ${n} (${CONTENT.osi.find(o=>o.n===n).name})`); setTimeout(()=>{k++;show();}, ok?200:900); }); };
    return show();
  }
  if (id==='order') {
    setTitle('Order Up');
    const sets = CONTENT.orders.filter(o=>o.certs.split(' ').some(c=>sel.includes(c)));
    app.innerHTML = `<div class="card"><h3>Pick a sequence</h3><div class="list">${sets.map(o=>`<a href="#" data-s="${o.id}"><span class="grow">${esc(o.title)}</span><span class="mut sm">${o.items.length} steps</span></a>`).join('')}</div><button class="btn pri block" id="rnd">🎲 Random sequence</button></div>`;
    const play = o => { const q = prepQ({t:'order', items:o.items, q:o.title, e:'Correct order shown above.', id:'ord'}); let r=[]; const t0=Date.now();
      const render = (reveal) => { app.innerHTML = `<div class="card"><div id="qb">${qBody(q, r, reveal)}</div>${reveal?`<button class="btn pri block" id="more">Another</button>`:`<button class="btn pri block" id="ck" ${r.length===o.items.length?'':'disabled'}>Check</button>`}</div>`;
        if (!reveal) { bindQ($('#qb'), q, ()=>r, x=>r=x, ()=>render(false)); $('#ck').onclick=()=>{ const ok=isCorrect(q,r); const secs=Math.round((Date.now()-t0)/1000); const sc = ok? Math.max(5, 60-secs) : 0; if (sc>(S.games.order||0)) S.games.order=sc; bump(); save(); render(true); toast(ok?`✅ Perfect in ${secs}s (+${sc})`:'❌ Check the correct order'); }; }
        else $('#more').onclick = () => vGame('order'); };
      render(false); };
    app.querySelectorAll('[data-s]').forEach(a=>a.onclick=e=>{e.preventDefault(); play(sets.find(o=>o.id===a.dataset.s));});
    $('#rnd').onclick = () => play(sets[Math.floor(Math.random()*sets.length)]);
    return;
  }
  vGames();
}
function subnetQ(){
  const pre = 16 + Math.floor(Math.random()*15); // /16../30
  const ip = [ [10,172,192][Math.floor(Math.random()*3)], 0, Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
  if (ip[0]===172) ip[1]=16+Math.floor(Math.random()*16); else if (ip[0]===192) ip[1]=168; else ip[1]=Math.floor(Math.random()*256);
  const n = ((ip[0]<<24)>>>0) + (ip[1]<<16) + (ip[2]<<8) + ip[3];
  const mask = pre===0?0:(0xFFFFFFFF << (32-pre))>>>0;
  const net = (n & mask)>>>0, bc = (net | (~mask>>>0))>>>0;
  const s = x => [x>>>24,(x>>>16)&255,(x>>>8)&255,x&255].join('.');
  const hosts = 2**(32-pre)-2;
  const kind = Math.floor(Math.random()*4); const ipS = s(n)+'/'+pre;
  if (kind===0) { const step = 2**(32-pre); return {hint:'Network address of', p:ipS, a:s(net), opts:shuffle([s(net), s((net+step)>>>0), s((net-step)>>>0), s((net+1)>>>0)])}; }
  if (kind===1) { const step = 2**(32-pre); return {hint:'Broadcast address of', p:ipS, a:s(bc), opts:shuffle([s(bc), s((bc-1)>>>0), s((bc+step)>>>0), s(net)])}; }
  if (kind===2) { const o=[hosts, hosts+2, 2**(33-pre)-2, Math.max(2,2**(31-pre)-2)]; const u=[...new Set(o)]; while(u.length<4) u.push(u[u.length-1]*2+2); return {hint:'Usable hosts in', p:'/'+pre, a:String(hosts), opts:shuffle(u.slice(0,4).map(String))}; }
  const m = s(mask); const alt = [pre-1,pre+1,pre+2].map(p=>s((0xFFFFFFFF << (32-p))>>>0));
  return {hint:'Dotted‑decimal mask for', p:'/'+pre, a:m, opts:shuffle([m,...alt])};
}

/* ---------- PROGRESS ---------- */
function vProgress(){
  setTitle('Progress');
  const days = Object.keys(S.activity).length; const answered = Object.values(S.qs).reduce((n,s)=>n+s.c+s.w,0);
  const correct = Object.values(S.qs).reduce((n,s)=>n+s.c,0);
  const heat = [...Array(56).keys()].map(k=>addDays(today(),k-55)).map(d=>`<i title="${d}" style="display:block;aspect-ratio:1;border-radius:3px;background:${S.activity[d]?`color-mix(in srgb,var(--ok) ${Math.min(100,20+S.activity[d]*4)}%,var(--card2))`:'var(--card2)'}"></i>`).join('');
  app.innerHTML = `<div class="card"><div class="grid2"><div class="stat"><b>🔥 ${streak()}</b><small>current streak</small></div><div class="stat"><b>${days}</b><small>study days</small></div><div class="stat"><b>${answered}</b><small>answers</small></div><div class="stat"><b>${answered?Math.round(100*correct/answered)+'%':'—'}</b><small>accuracy</small></div></div>
  <h4>Last 8 weeks</h4><div style="display:grid;grid-template-columns:repeat(14,1fr);gap:3px">${heat}</div></div>
  ${CERT_ORDER.map(cid=>{const c=C[cid];const ex=S.history.filter(h=>h.mode==='exam'&&h.cert===cid);const best=ex.reduce((m,h)=>Math.max(m,h.pct),0);const ready=ex.filter(h=>h.pct>=85).length>=2;
   return `<div class="card"><div class="row"><span class="certdot" style="background:${c.color}"></span><h3 class="grow" style="margin:0">${c.name}</h3><span class="pill" style="${ready?'background:var(--ok);color:#fff':''}">${ready?'Exam ready ✓':ex.length?'Best '+best+'%':'No exam yet'}</span></div>
   ${c.domains.map(d=>{const qs=qsFor(cid,q=>q.d===d.id);const s=qs.filter(q=>S.qs[q.id]);const r=s.reduce((n,q)=>n+S.qs[q.id].c,0),t=s.reduce((n,q)=>n+S.qs[q.id].c+S.qs[q.id].w,0);const p=t?Math.round(100*r/t):0;const ls=c.lessons.filter(l=>l.d===d.id);const ld=ls.filter(l=>S.lessons[l.id]).length;
    return `<div style="margin:10px 0"><div class="row sm"><span class="grow">${d.id}.0 ${esc(d.t)}</span><span class="mut">${ld}/${ls.length} lessons · ${t?p+'%':'—'}</span></div><div class="prog"><i style="width:${p}%;background:${!t?'var(--line)':p>=80?'var(--ok)':p>=65?'var(--warn)':'var(--bad)'}"></i></div></div>`}).join('')}
   ${ex.length?`<div class="mut sm">Practice exams: ${ex.slice(-5).map(h=>h.pct+'%').join(' · ')}</div>`:''}</div>`}).join('')}
  <div class="card"><h3>Settings & data</h3>
  <div class="row" style="min-height:48px"><span class="grow">Theme</span><button class="btn sm" id="th">${S.theme==='dark'?'🌙 Dark':'☀️ Light'}</button></div>
  <div class="row" style="min-height:48px"><span class="grow">New flashcards per day</span><select id="npd" style="min-height:40px;font-size:16px;border-radius:10px;background:var(--card2);color:var(--tx);border:1px solid var(--line)">${[10,15,25,40,60].map(n=>`<option ${S.newPerDay===n?'selected':''}>${n}</option>`).join('')}</select></div>
  <button class="btn block" id="exp">⬇ Export progress (backup)</button><label class="btn block">⬆ Import progress<input type="file" id="imp" accept=".json" hidden></label><button class="btn block" id="rst" style="color:var(--bad)">Reset all progress</button></div>
  <a class="btn block" href="#/about">ℹ About, exam versions & credits</a>`;
  $('#th').onclick=()=>{ S.theme=S.theme==='dark'?'light':'dark'; document.documentElement.dataset.theme=S.theme; save(); vProgress(); };
  $('#npd').onchange=e=>{ S.newPerDay=+e.target.value; save(); };
  $('#exp').onclick=()=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'})); a.download='certquest-progress-'+today()+'.json'; a.click(); };
  $('#imp').onchange=e=>{ const f=e.target.files[0]; if(!f) return; f.text().then(t=>{ try{ S=Object.assign(defState(),JSON.parse(t)); save(); toast('Progress imported'); vProgress(); }catch(err){ toast('Invalid file'); } }); };
  $('#rst').onclick=()=>{ if(confirm('Erase ALL progress, streaks and flashcard history?')){ S=defState(); save(); toast('Reset'); vProgress(); } };
}

/* ---------- ABOUT ---------- */
function vAbout(){
  setTitle('About');
  const hand = QLIST.filter(q=>q.hand).length;
  app.innerHTML = `<div class="card lesson"><h2>CertQuest</h2><p>A from‑scratch study app for CompTIA A+, Network+ and Security+.</p>
  <h3>Exam versions covered (checked Nov 17, 2026)</h3><table><tr><th>Cert</th><th>Exam</th><th>Status</th></tr>
  <tr><td>A+ Core 1</td><td>220‑1201</td><td>Current (launched Mar 2025; 220‑1101 retired Sep 2025)</td></tr>
  <tr><td>A+ Core 2</td><td>220‑1202</td><td>Current (launched Mar 2025; 220‑1102 retired Sep 2025)</td></tr>
  <tr><td>Network+</td><td>N10‑009</td><td>Current (launched Jun 2024)</td></tr>
  <tr><td>Security+</td><td>SY0‑701</td><td>Current; retires Jun 11, 2027 (English). SY0‑801 (V8) launched Nov 17, 2026 – see the bonus lesson.</td></tr></table>
  <div class="callout warn"><b class="tag">Always verify</b>Download the official exam objectives PDFs from comptia.org before you book. Objectives and dates can change.</div>
  <h3>What's inside</h3><ul><li>${Object.keys(LESSONS).length} lessons</li><li>${QLIST.length} quiz questions (${hand} hand‑written, ${QLIST.length-hand} generated port drills) plus unlimited generated subnetting</li><li>${CARDS.length} flashcards</li><li>${Object.keys(VIS).length} interactive visuals</li><li>${GAMES.length} games</li></ul>
  <h3>Credits & originality</h3><p>All lessons, questions, explanations, mnemonics and visuals are original. The screen visuals are simplified HTML/CSS/SVG recreations drawn for teaching – they are not screenshots and contain no third‑party images. Product names (Windows, Wireshark, nmap, etc.) belong to their owners and are used only to describe the tools covered on the exams.</p>
  <p>No real exam questions or "brain dump" material are used. CompTIA, A+, Network+ and Security+ are trademarks of CompTIA, Inc. This app is not affiliated with or endorsed by CompTIA.</p>
  <p class="mut sm">Works offline once loaded. Progress is stored only on this device (export a backup from Progress).</p></div>`;
}

/* ---------- boot ---------- */
$('#back').onclick = () => history.length>1 ? history.back() : (location.hash='#/today');
$('#prog').onclick = () => location.hash = '#/progress';
route();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(()=>{});
window.__CQ = { QLIST, CARDS, LESSONS, VIS: window.VIS, GAMES, buildPlan, S: ()=>S };
})();
