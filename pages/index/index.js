const registry = require('../../data/registry');
const store = require('../../utils/store');

Page({
  data: { decks: [] },

  onShow() {
    const decks = registry.list().map(d => {
      const total = d.items.length;
      const set = store.getKnown(d.id);
      // lesson 按卡片 id 计数（兼容旧版下标），glossary 按下标计数
      const known = d.type === 'lesson'
        ? d.items.filter((c, i) => set.has(c.id) || set.has(i)).length
        : set.size;
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
