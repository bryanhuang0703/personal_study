// 讲义卡模块（type: 'notes'）：移植自 CS50 AI 小程序包（数据存档于 source/cs50-ai/ai.js） 的单页卡片。
// 与原版的差异：数据从注册表按 id 读取；进度用 utils/store（按卡片 id），首页可显示进度。
const registry = require('../../data/registry');
const store = require('../../utils/store');

Page({
  data: {
    kicker: '', heading: '', lede: '',
    total: 0,
    chain: [],
    resources: [],
    filter: 'all',
    jump: [],
    sections: [],
    doneCount: 0,
    pct: 0,
    empty: false,
    resetArmed: false
  },

  onLoad: function (opt) {
    const d = registry.get(opt.id);
    if (!d) { wx.showToast({ title: '模块不存在', icon: 'none' }); wx.navigateBack(); return; }
    this.d = d;
    // 卡片全局序号来自 registry（idx），不随筛选变化
    const byId = {};
    d.items.forEach(function (c) { byId[c.id] = c; });
    this.base = d.sections.map(function (s) {
      return {
        id: s.id, key: s.key, title: s.title, note: s.note || '',
        cards: s.cards.map(function (c) { return Object.assign({}, byId[c.id], { hasCode: !!c.code }); })
      };
    });
    this.done = store.getKnown(d.id);
    this.open = {};
    this.resetTimer = null;
    wx.setNavigationBarTitle({ title: d.title });
    this.setData({
      kicker: d.kicker || '',
      heading: d.heading || d.title,
      lede: (d.lede || '').replace('{total}', d.items.length),
      total: d.items.length,
      chain: d.chain || [],
      resources: d.resources || []
    });
    this.refresh();
  },

  onUnload: function () {
    if (this.resetTimer) clearTimeout(this.resetTimer);
  },

  onShareAppMessage: function () {
    return { title: this.d.title, path: '/pages/notes/notes?id=' + this.d.id };
  },

  persist: function () {
    store.saveKnown(this.d.id, this.done);
  },

  refresh: function () {
    const done = this.done;
    const open = this.open;
    const filter = this.data.filter;
    const total = this.data.total;
    let doneCount = 0;
    const sections = [];

    this.base.forEach(function (s) {
      const cards = [];
      s.cards.forEach(function (c) {
        const isDone = done.has(c.id);
        if (isDone) doneCount += 1;
        const show = filter === 'all' || (filter === 'done' && isDone) || (filter === 'todo' && !isDone);
        if (show) {
          cards.push(Object.assign({}, c, { done: isDone, open: !!open[c.id] }));
        }
      });
      if (cards.length) {
        sections.push({ id: s.id, key: s.key, title: s.title, note: s.note, cards: cards });
      }
    });

    this.setData({
      sections: sections,
      jump: sections.map(function (s) {
        return { id: s.id, key: s.key, title: s.title };
      }),
      doneCount: doneCount,
      pct: total ? Math.round((doneCount / total) * 100) : 0,
      empty: sections.length === 0
    });
  },

  onFilter: function (e) {
    const f = e.currentTarget.dataset.filter;
    if (f === this.data.filter) return;
    this.setData({ filter: f }, this.refresh.bind(this));
  },

  onToggleOpen: function (e) {
    const id = e.currentTarget.dataset.id;
    this.open[id] = !this.open[id];
    this.refresh();
  },

  onToggleDone: function (e) {
    const id = e.currentTarget.dataset.id;
    if (this.done.has(id)) {
      this.done.delete(id);
    } else {
      this.done.add(id);
      wx.vibrateShort({ type: 'light' });
    }
    this.persist();
    this.refresh();
  },

  onJump: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.pageScrollTo({ selector: '#sec-' + id, duration: 200 });
  },

  onCopy: function (e) {
    const url = e.currentTarget.dataset.url;
    wx.setClipboardData({
      data: url,
      success: function () {
        wx.showToast({ title: '链接已复制', icon: 'none' });
      }
    });
  },

  onReset: function () {
    const self = this;
    if (this.data.resetArmed) {
      if (this.resetTimer) clearTimeout(this.resetTimer);
      this.done.clear();
      this.open = {};
      this.persist();
      this.setData({ resetArmed: false }, this.refresh.bind(this));
      return;
    }
    this.setData({ resetArmed: true });
    this.resetTimer = setTimeout(function () {
      self.setData({ resetArmed: false });
    }, 4000);
  }
});
