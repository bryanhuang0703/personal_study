// 学习模块注册表。新增模块：放一个数据文件到 data/decks/，在下面 <decks> 区块里 require。
// tools/html2deck.js 会自动往这里追加。顺序即首页展示顺序。
const DECKS = [
  // <decks>
  require('./decks/robotics.js'),
  require('./decks/ta-kit.js'),
  require('./decks/cs50-w0.js'),
  require('./decks/cs50-w1.js'),
  require('./decks/cs50-w2.js'),
  require('./decks/cs50-w3.js'),
  require('./decks/cs50-w4.js'),
  // </decks>
];

const pad = n => String(n).padStart(2, '0');
const cache = {};

// 把原始 terms 展开成带编号的对象：{ i, cat, zh, en, note, code: "01.03", ...可选扩展字段 }
// 第 5 列可选扩展：{ abbr, noteEn, why, whyEn }
function build(d) {
  if (cache[d.id]) return cache[d.id];
  if (d.type === 'lesson') {
    // 概念卡：items 即 cards，进度按卡片下标记“已学完”
    const items = d.cards.map((c, i) => Object.assign({ i, no: pad(i + 1), points: [], links: [], quiz: [], minutes: 0 }, c));
    cache[d.id] = Object.assign({ progressLabel: '已学完' }, d, { items });
    return cache[d.id];
  }
  const counter = {};
  const items = d.terms.map((r, i) => {
    counter[r[0]] = (counter[r[0]] || 0) + 1;
    const x = r[4] || {};
    return Object.assign({ abbr: '', noteEn: '', why: '', whyEn: '' }, x, {
      i, cat: r[0], zh: r[1], en: r[2], note: r[3] || '',
      code: pad(r[0] + 1) + '.' + pad(counter[r[0]]),
      search: [r[1], r[2], r[3], x.abbr, x.noteEn, x.why, x.whyEn].join(' ').toLowerCase()
    });
  });
  const hasExtra = items.some(t => t.noteEn || t.why);
  cache[d.id] = Object.assign({}, d, { items, hasExtra });
  return cache[d.id];
}

module.exports = {
  // 首页顺序：按注册顺序；同一课程的 lesson 聚在第一次出现的位置，并按 week 升序
  list: () => {
    const groupPos = d => DECKS.findIndex(x => d.type === 'lesson' ? x.type === 'lesson' && x.course === d.course : x === d);
    return DECKS
      .map((d, i) => ({ d, g: groupPos(d), w: d.type === 'lesson' ? d.week : i }))
      .sort((a, b) => a.g - b.g || a.w - b.w)
      .map(x => build(x.d));
  },
  get: id => {
    const d = DECKS.find(x => x.id === id);
    return d ? build(d) : null;
  },
  // 找同一课程某一周的 lesson 模块 id（用于周与周之间跳转），没有返回 ''
  findWeek: (course, week) => {
    const d = DECKS.find(x => x.type === 'lesson' && x.course === course && x.week === week);
    return d ? d.id : '';
  }
};
