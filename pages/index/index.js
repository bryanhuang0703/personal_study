const registry = require('../../data/registry');
const store = require('../../utils/store');

Page({
  data: { decks: [] },

  onShow() {
    const decks = registry.list().map(d => {
      const total = d.items.length;
      const known = store.getKnown(d.id).size;
      return {
        id: d.id, type: d.type, tag: d.tag, title: d.title, subtitle: d.subtitle, desc: d.desc,
        total, known, pct: total ? Math.round(known / total * 100) : 0,
        unit: d.type === 'lesson' ? '张' : '条', progressLabel: d.progressLabel || '已掌握'
      };
    });
    this.setData({ decks });
  },

  open(e) {
    const { id, type } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/${type}/${type}?id=${id}` });
  },

  onShareAppMessage() {
    return { title: '我的学习工具', path: '/pages/index/index' };
  }
});
