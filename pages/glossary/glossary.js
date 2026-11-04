const registry = require('../../data/registry');
const store = require('../../utils/store');

const pad = n => String(n).padStart(2, '0');

// 搜索高亮：把字符串切成 [{k, t, h}]，h=1 表示命中
function segs(s, q) {
  if (!s) return [];
  if (!q) return [{ k: 0, t: s }];
  const out = [];
  const ls = s.toLowerCase(), lq = q.toLowerCase();
  let p = 0, k;
  while ((k = ls.indexOf(lq, p)) >= 0) {
    if (k > p) out.push({ k: out.length, t: s.slice(p, k) });
    out.push({ k: out.length, t: s.slice(k, k + q.length), h: 1 });
    p = k + q.length;
  }
  if (p < s.length) out.push({ k: out.length, t: s.slice(p) });
  return out;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.random() * (i + 1) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

Page({
  data: {
    mode: 'browse', cat: -1, q: '', chapters: [], total: 0, knownCount: 0, pct: 0,
    maskZh: false, maskEn: false, onlyNew: false,
    groups: [], count: 0,
    fc: {}, quiz: {}
  },

  onLoad(opt) {
    const d = registry.get(opt.id);
    if (!d) { wx.showToast({ title: '模块不存在', icon: 'none' }); wx.navigateBack(); return; }
    this.d = d;
    this.T = d.items;
    this.known = store.getKnown(d.id);
    this.S = {
      mode: ['browse', 'cards', 'quiz'].includes(opt.mode) ? opt.mode : 'browse',
      cat: -1, q: '', maskZh: false, maskEn: false, onlyNew: false, rev: {},
      fcFront: 'zh', fcIdx: 0, fcDeck: [], flip: false,
      quizDir: 'zh2en', quiz: null, score: { n: 0, ok: 0, streak: 0 }
    };
    wx.setNavigationBarTitle({ title: d.title });
    const counts = d.cats.map((_, c) => this.T.filter(t => t.cat === c).length);
    this.setData({
      total: this.T.length,
      chapters: [{ cat: -1, name: '全部', ct: this.T.length }]
        .concat(d.cats.map((c, i) => ({ cat: i, name: c[0], ct: counts[i] })))
    });
    if (this.S.mode === 'cards') this.buildDeck(false);
    this.render();
  },

  // ---------- 数据 ----------
  pool() {
    const S = this.S, q = S.q.toLowerCase();
    return this.T.filter(t =>
      (S.cat < 0 || t.cat === S.cat) &&
      (!q || (t.zh + t.en + t.note).toLowerCase().includes(q)) &&
      (!S.onlyNew || !this.known.has(t.i)));
  },
  saveKnown() { store.saveKnown(this.d.id, this.known); },

  // ---------- 渲染 ----------
  render() {
    const S = this.S;
    const base = {
      mode: S.mode, cat: S.cat, q: S.q,
      maskZh: S.maskZh, maskEn: S.maskEn, onlyNew: S.onlyNew,
      knownCount: this.known.size,
      pct: this.T.length ? this.known.size / this.T.length * 100 : 0
    };
    const view = S.mode === 'cards' ? this.viewCards() : S.mode === 'quiz' ? this.viewQuiz() : this.viewBrowse();
    this.setData(Object.assign(base, view));
  },

  viewBrowse() {
    const S = this.S, list = this.pool(), cats = this.d.cats;
    const groups = [];
    for (const t of list) {
      let g = groups[groups.length - 1];
      if (!g || g.cat !== t.cat) {
        g = { cat: t.cat, no: pad(t.cat + 1), zh: cats[t.cat][0], en: cats[t.cat][1], items: [] };
        groups.push(g);
      }
      g.items.push({
        i: t.i, code: t.code,
        zh: segs(t.zh, S.q), en: segs(t.en, S.q), note: segs(t.note, S.q),
        mz: S.maskZh && !S.rev['z' + t.i],
        me: S.maskEn && !S.rev['e' + t.i],
        known: this.known.has(t.i)
      });
    }
    return { groups, count: list.length };
  },

  buildDeck(rand) {
    const S = this.S;
    S.fcDeck = this.pool().map(t => t.i);
    if (rand) shuffle(S.fcDeck);
    S.fcIdx = 0;
    S.flip = false;
  },

  viewCards() {
    const S = this.S;
    if (!S.fcDeck.length) this.buildDeck(false);
    const d = S.fcDeck;
    if (!d.length) return { fc: { empty: true, front: S.fcFront } };
    const t = this.T[d[S.fcIdx]];
    const zhFront = S.fcFront === 'zh';
    return {
      fc: {
        empty: false, front: S.fcFront, flip: S.flip,
        catName: this.d.cats[t.cat][0], code: t.code,
        idx: S.fcIdx + 1, len: d.length, known: this.known.has(t.i),
        dirLabel: zhFront ? '中文 → English' : 'English → 中文',
        frontText: zhFront ? t.zh : t.en,
        backText: zhFront ? t.en : t.zh,
        note: t.note
      }
    };
  },

  newQ() {
    const S = this.S, T = this.T;
    const p = this.pool().length >= 4 ? this.pool() : T.filter(t => S.cat < 0 || t.cat === S.cat);
    const src = p.length >= 4 ? p : T;
    const ans = src[Math.random() * src.length | 0];
    let dis = T.filter(t => t.i !== ans.i && t.cat === ans.cat);
    if (dis.length < 3) dis = T.filter(t => t.i !== ans.i);
    dis = shuffle(dis.slice()).slice(0, 3);
    S.quiz = { ans, opts: shuffle([ans].concat(dis)), picked: null };
  },

  viewQuiz() {
    const S = this.S;
    if (!S.quiz) this.newQ();
    const { ans, opts, picked } = S.quiz;
    const z = S.quizDir === 'zh2en', done = picked != null;
    return {
      quiz: {
        dir: S.quizDir,
        scope: S.cat < 0 ? '全部章节' : this.d.cats[S.cat][0],
        n: S.score.n,
        acc: S.score.n ? Math.round(S.score.ok / S.score.n * 100) + '%' : '–',
        streak: S.score.streak,
        tag: this.d.cats[ans.cat][0] + ' · ' + ans.code,
        q: z ? ans.zh : ans.en, isEn: !z,
        note: done ? ans.note : '',
        done, right: picked === ans.i,
        ansLabel: z ? ans.en : ans.zh,
        opts: opts.map((o, k) => ({
          i: o.i, k: k + 1, label: z ? o.en : o.zh,
          cls: !done ? '' : o.i === ans.i ? 'right' : o.i === picked ? 'wrong' : ''
        }))
      }
    };
  },

  // ---------- 通用事件 ----------
  onTab(e) {
    const m = e.currentTarget.dataset.m, S = this.S;
    if (m === S.mode) return;
    S.mode = m;
    if (m === 'cards') this.buildDeck(false);
    if (m === 'quiz') S.quiz = null;
    this.render();
    wx.pageScrollTo({ scrollTop: 0, duration: 0 });
  },
  onCat(e) {
    const S = this.S;
    S.cat = +e.currentTarget.dataset.cat;
    S.fcDeck = []; S.quiz = null;
    this.render();
  },
  onSearch(e) {
    const S = this.S;
    S.q = e.detail.value.trim();
    S.fcDeck = []; S.quiz = null;
    this.render();
  },
  onClear() {
    this.S.q = ''; this.S.fcDeck = []; this.S.quiz = null;
    this.render();
  },
  onTog(e) {
    const k = e.currentTarget.dataset.k, S = this.S;
    S[k] = !S[k];
    if (k === 'maskZh' || k === 'maskEn') S.rev = {};
    if (S.mode === 'cards') this.buildDeck(false);
    this.render();
  },
  onReset() {
    wx.showModal({
      title: '清空掌握记录？', content: '本模块的已掌握标记会全部清除。', confirmColor: '#e0571f',
      success: r => {
        if (!r.confirm) return;
        this.known.clear(); this.saveKnown();
        if (this.S.mode === 'cards') this.buildDeck(false);
        this.render();
      }
    });
  },

  // ---------- 浏览 ----------
  onRev(e) {
    const k = e.currentTarget.dataset.rev;
    this.S.rev[k] = !this.S.rev[k];
    this.render();
  },
  onKnow(e) {
    const i = +e.currentTarget.dataset.i;
    this.known.has(i) ? this.known.delete(i) : (this.known.add(i), wx.vibrateShort({ type: 'light' }));
    this.saveKnown();
    this.render();
  },

  // ---------- 闪卡 ----------
  onFront(e) { this.S.fcFront = e.currentTarget.dataset.f; this.S.flip = false; this.render(); },
  onShuffle() { this.buildDeck(true); this.render(); },
  onFlip() {
    if (this.swiped) { this.swiped = false; return; }
    this.S.flip = !this.S.flip;
    this.setData({ 'fc.flip': this.S.flip });
  },
  fcMove(n) {
    const S = this.S;
    if (!S.fcDeck.length) return;
    S.fcIdx = (S.fcIdx + n + S.fcDeck.length) % S.fcDeck.length;
    S.flip = false;
    this.render();
  },
  onPrev() { this.fcMove(-1); },
  onNext() { this.fcMove(1); },
  onMark(e) {
    const ok = e.currentTarget.dataset.ok === '1', S = this.S;
    const id = S.fcDeck[S.fcIdx];
    if (id == null) return;
    if (ok) { this.known.add(id); wx.vibrateShort({ type: 'light' }); } else this.known.delete(id);
    this.saveKnown();
    if (ok && S.onlyNew) {
      S.fcDeck.splice(S.fcIdx, 1);
      if (S.fcIdx >= S.fcDeck.length) S.fcIdx = 0;
      S.flip = false;
      this.render();
    } else this.fcMove(1);
  },
  onTs(e) { const t = e.touches[0]; this.tx = t.clientX; this.ty = t.clientY; },
  onTe(e) {
    if (this.tx == null) return;
    const t = e.changedTouches[0], dx = t.clientX - this.tx, dy = t.clientY - this.ty;
    this.tx = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      this.swiped = true;
      setTimeout(() => { this.swiped = false; }, 400);
      this.fcMove(dx < 0 ? 1 : -1);
    }
  },

  // ---------- 自测 ----------
  onDir(e) { this.S.quizDir = e.currentTarget.dataset.d; this.S.quiz = null; this.render(); },
  onPick(e) {
    const S = this.S, qz = S.quiz;
    if (!qz || qz.picked != null) return;
    const id = +e.currentTarget.dataset.i;
    qz.picked = id; S.score.n++;
    if (id === qz.ans.i) { S.score.ok++; S.score.streak++; wx.vibrateShort({ type: 'light' }); }
    else { S.score.streak = 0; this.known.delete(qz.ans.i); this.saveKnown(); wx.vibrateShort({ type: 'heavy' }); }
    this.render();
  },
  onNextQ() { this.S.quiz = null; this.render(); },

  onShareAppMessage() {
    return { title: this.d.title, path: `/pages/glossary/glossary?id=${this.d.id}&mode=${this.S.mode}` };
  }
});
