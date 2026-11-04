// 学习模块注册表。新增模块：放一个数据文件到 data/decks/，在下面 <decks> 区块里 require。
// tools/html2deck.js 会自动往这里追加。顺序即首页展示顺序。
const DECKS = [
  // <decks>
  require('./decks/robotics.js'),
  // </decks>
];

const pad = n => String(n).padStart(2, '0');
const cache = {};

// 把原始 terms 展开成带编号的对象：{ i, cat, zh, en, note, code: "01.03" }
function build(d) {
  if (cache[d.id]) return cache[d.id];
  const counter = {};
  const items = d.terms.map((r, i) => {
    counter[r[0]] = (counter[r[0]] || 0) + 1;
    return { i, cat: r[0], zh: r[1], en: r[2], note: r[3] || '', code: pad(r[0] + 1) + '.' + pad(counter[r[0]]) };
  });
  cache[d.id] = Object.assign({}, d, { items });
  return cache[d.id];
}

module.exports = {
  list: () => DECKS.map(build),
  get: id => {
    const d = DECKS.find(x => x.id === id);
    return d ? build(d) : null;
  }
};
