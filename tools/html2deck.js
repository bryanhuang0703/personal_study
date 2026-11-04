#!/usr/bin/env node
/**
 * 把术语类 HTML（内含 `const CATS=[...]` 与 `const RAW=[...]`）转换成小程序数据模块，并自动注册。
 *
 * 用法：node tools/html2deck.js <html 路径> <模块 id> [标签]
 * 例：  node tools/html2deck.js source/robotics-glossary.html robotics 术语
 *
 * 输出：data/decks/<id>.js，并在 data/registry.js 的 <decks> 区块中追加 require。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const [src, id, tag = '术语'] = process.argv.slice(2);
if (!src || !id || !/^[a-z0-9_-]+$/.test(id)) {
  console.error('用法：node tools/html2deck.js <html 路径> <模块 id: 小写字母/数字/-/_> [标签]');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(src, 'utf8');
const unesc = s => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').trim();

function grabArray(name) {
  const m = html.match(new RegExp('const\\s+' + name + '\\s*=\\s*(\\[[\\s\\S]*?\\n\\s*\\]);'));
  if (!m) throw new Error('找不到 const ' + name + '=[...]');
  return vm.runInNewContext('(' + m[1] + ')', {}, { timeout: 1000 });
}
const pick = re => { const m = html.match(re); return m ? unesc(m[1]) : ''; };

const cats = grabArray('CATS');
const terms = grabArray('RAW').map(r => [r[0], r[1], r[2], r[3] || '']);
const title = pick(/<title>([\s\S]*?)<\/title>/i) || id;
const subtitle = pick(/class="brand"[\s\S]*?<p>([\s\S]*?)<\/p>/i);
const desc = pick(/<meta\s+name="description"\s+content="([^"]*)"/i);

terms.forEach((t, i) => {
  if (!cats[t[0]]) throw new Error('第 ' + (i + 1) + ' 条的分类序号越界：' + JSON.stringify(t));
});

const out = `// 由 tools/html2deck.js 从 ${path.relative(root, path.resolve(src))} 生成，可直接手改。
// terms: [分类序号, 中文, English, 说明]
module.exports = {
  id: ${JSON.stringify(id)},
  type: 'glossary',
  tag: ${JSON.stringify(tag)},
  title: ${JSON.stringify(title)},
  subtitle: ${JSON.stringify(subtitle)},
  desc: ${JSON.stringify(desc)},
  cats: [
${cats.map(c => '    ' + JSON.stringify(c)).join(',\n')}
  ],
  terms: [
${terms.map(t => '    ' + JSON.stringify(t)).join(',\n')}
  ]
};
`;
const outPath = path.join(root, 'data/decks', id + '.js');
fs.writeFileSync(outPath, out);
console.log('写入', path.relative(root, outPath), `（${cats.length} 个分类，${terms.length} 条）`);

require('./register')(id);
