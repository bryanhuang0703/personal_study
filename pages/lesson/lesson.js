// 概念卡模块（type: 'lesson'）：概览 / 学习 / 自测
const registry = require('../../data/registry');
const store = require('../../utils/store');

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.random() * (i + 1) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

Page({
  data: {
    mode: 'map',
    tabs: [{ m: 'map', name: '概览' }, { m: 'learn', name: '学习' }, { m: 'quiz', name: '自测' }],
    knownCount: 0, total: 0, pct: 0,
    head: {}, chain: [], list: [], c: {}, qz: {}
  },

  onLoad(opt) {
    const d = registry.get(opt.id);
    if (!d) { wx.showToast({ title: '模块不存在', icon: 'none' }); wx.navigateBack(); return; }
    this.d = d;
    this.C = d.items;
    this.known = store.getKnown(d.id);
    // 进度按卡片 id 存；旧版本存的是下标，加载时迁移
    if ([...this.known].some(v => typeof v === 'number')) {
      this.known = new Set([...this.known].map(v => typeof v === 'number' ? (this.C[v] || {}).id : v).filter(Boolean));
      store.saveKnown(d.id, this.known);
    }
    this.S = { mode: 'map', idx: 0, peek: {}, qz: null };
    if (['learn', 'quiz'].includes(opt.mode)) this.S.mode = opt.mode;
    if (opt.card) {
      const k = this.C.findIndex(c => c.id === opt.card);
      if (k >= 0) { this.S.idx = k; this.S.mode = 'learn'; }
    }
    wx.setNavigationBarTitle({ title: d.title });
    const map = d.map || {};
    this.setData({
      total: this.C.length,
      head: {
        eyebrow: [d.course, 'Week ' + d.week].filter(Boolean).join(' · '),
        title: d.weekTitle || d.title,
        mapTitle: map.title || '', summary: map.summary || '',
        totalMin: this.C.reduce((n, c) => n + (c.minutes || 0), 0),
        license: d.license || '', source: d.source || ''
      },
      chain: (map.chain || []).map(n => Object.assign({}, n, {
        target: n.current ? '' : registry.findWeek(d.course, n.week)
      }))
    });
    this.render();
  },

  // ---------- 渲染 ----------
  render() {
    const S = this.S;
    const done = this.C.filter(c => this.known.has(c.id)).length;
    const base = {
      mode: S.mode,
      knownCount: done,
      pct: this.C.length ? done / this.C.length * 100 : 0
    };
    const view = S.mode === 'learn' ? this.viewLearn() : S.mode === 'quiz' ? this.viewQuiz() : this.viewMap();
    this.setData(Object.assign(base, view));
  },

  viewMap() {
    return {
      list: this.C.map(c => ({
        i: c.i, id: c.id, no: c.no, title: c.title, question: c.question || '',
        minutes: c.minutes, known: this.known.has(c.id)
      }))
    };
  },

  viewLearn() {
    const S = this.S, c = this.C[S.idx], d = this.d;
    return {
      c: {
        i: c.i, no: c.no, title: c.title, question: c.question || '', conclusion: c.conclusion,
        points: c.points, code: c.code || '', analogy: c.analogy || '', minutes: c.minutes,
        links: c.links.map(l => Object.assign({}, l, { target: registry.findWeek(d.course, l.week) })),
        quiz: c.quiz.map((q, k) => ({ q: q.q, a: q.a, open: !!S.peek[c.i + '-' + k] })),
        known: this.known.has(c.id), isLast: S.idx === this.C.length - 1
      }
    };
  },

  buildQuiz(items) {
    const all = items || shuffle([].concat(...this.C.map(c => c.quiz.map(q => ({ ci: c.i, q: q.q, a: q.a })))));
    this.S.qz = { items: all, pos: 0, shown: false, ok: 0, bad: [] };
  },

  viewQuiz() {
    if (!this.S.qz) this.buildQuiz();
    const z = this.S.qz, total = z.items.length;
    if (z.pos >= total) {
      return { qz: { done: true, ok: z.ok, total, badCount: z.bad.length } };
    }
    const it = z.items[z.pos];
    return {
      qz: {
        done: false, total, pos: z.pos + 1, pct: z.pos / total * 100,
        ci: it.ci, cardTitle: this.C[it.ci].title, q: it.q, a: it.a, shown: z.shown
      }
    };
  },

  // ---------- 事件 ----------
  onTab(e) {
    const m = e.currentTarget.dataset.m;
    if (m === this.S.mode) return;
    this.S.mode = m;
    this.render();
    wx.pageScrollTo({ scrollTop: 0, duration: 0 });
  },

  // 跳到同课程的另一周（如果已加入）
  onGo(e) {
    const { target, week } = e.currentTarget.dataset;
    if (target && target !== this.d.id) wx.navigateTo({ url: `/pages/lesson/lesson?id=${target}` });
    else if (!target && +week !== this.d.week) wx.showToast({ title: `Week ${week} 还没加入`, icon: 'none' });
  },

  onOpen(e) {
    this.S.idx = +e.currentTarget.dataset.i;
    this.S.mode = 'learn';
    this.render();
    wx.pageScrollTo({ scrollTop: 0, duration: 0 });
  },

  move(n) {
    const len = this.C.length;
    this.S.idx = (this.S.idx + n + len) % len;
    this.render();
    wx.pageScrollTo({ scrollTop: 0, duration: 200 });
  },
  onPrev() { this.move(-1); },
  onNext() { this.move(1); },

  onDone() {
    const i = this.S.idx, id = this.C[i].id;
    if (this.known.has(id)) {
      this.known.delete(id);
      store.saveKnown(this.d.id, this.known);
      this.render();
      return;
    }
    this.known.add(id);
    store.saveKnown(this.d.id, this.known);
    wx.vibrateShort({ type: 'light' });
    if (i < this.C.length - 1) this.move(1);
    else { this.render(); wx.showToast({ title: '本周卡片已学完', icon: 'none' }); }
  },

  onPeek(e) {
    const key = this.S.idx + '-' + e.currentTarget.dataset.k;
    this.S.peek[key] = !this.S.peek[key];
    this.render();
  },

  onTs(e) { const t = e.touches[0]; this.tx = t.clientX; this.ty = t.clientY; },
  onTe(e) {
    if (this.tx == null) return;
    const t = e.changedTouches[0], dx = t.clientX - this.tx, dy = t.clientY - this.ty;
    this.tx = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2) this.move(dx < 0 ? 1 : -1);
  },

  // ---------- 自测 ----------
  onReveal() { this.S.qz.shown = true; this.render(); },
  onGrade(e) {
    const z = this.S.qz, it = z.items[z.pos];
    if (e.currentTarget.dataset.ok === '1') { z.ok++; wx.vibrateShort({ type: 'light' }); }
    else {
      z.bad.push(it);
      // 没答上：对应卡片退回“未学完”
      if (this.known.delete(this.C[it.ci].id)) store.saveKnown(this.d.id, this.known);
    }
    z.pos++;
    z.shown = false;
    this.render();
  },
  onRedo() { this.buildQuiz(this.S.qz.bad.slice()); this.render(); },
  onRestart() { this.buildQuiz(); this.render(); },
  onToCard() {
    const z = this.S.qz;
    this.onOpen({ currentTarget: { dataset: { i: z.items[z.pos].ci } } });
  },

  onShareAppMessage() {
    return { title: this.d.title, path: `/pages/lesson/lesson?id=${this.d.id}` };
  }
});
