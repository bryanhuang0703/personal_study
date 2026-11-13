#!/usr/bin/env node
/**
 * 把 CS50 概念卡 JSON（schema: cs50-cards/v1）转换成小程序 lesson 模块，并自动注册。
 *
 * 用法：node tools/cs50-json2deck.js <json 路径>
 * 例：  node tools/cs50-json2deck.js source/cs50-week4.json
 *
 * 输出：data/decks/cs50-w<week>.js
 */
const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src) { console.error('用法：node tools/cs50-json2deck.js <json 路径>'); process.exit(1); }

const j = JSON.parse(fs.readFileSync(src, 'utf8'));
if (j.schema !== 'cs50-cards/v1') throw new Error('不支持的 schema：' + j.schema);
if (!Number.isInteger(j.week) || !Array.isArray(j.cards) || !j.cards.length) throw new Error('缺少 week 或 cards');
j.cards.forEach((c, i) => {
  for (const k of ['id', 'title', 'conclusion']) if (!c[k]) throw new Error(`第 ${i + 1} 张卡缺少 ${k}`);
});

const id = 'cs50-w' + j.week;
const deck = Object.assign({
  id,
  type: 'lesson',
  tag: 'CS50',
  title: `CS50 · Week ${j.week} ${j.weekTitle || ''}`.trim(),
  subtitle: j.course || '',
  desc: (j.map && j.map.summary) || ''
}, j);

const root = path.resolve(__dirname, '..');
const out = `// 由 tools/cs50-json2deck.js 从 ${path.relative(root, path.resolve(src))} 生成，可直接手改。\nmodule.exports = ${JSON.stringify(deck, null, 2)};\n`;
const outPath = path.join(root, 'data/decks', id + '.js');
fs.writeFileSync(outPath, out);
console.log('写入', path.relative(root, outPath), `（${j.cards.length} 张卡，${j.cards.reduce((n, c) => n + (c.quiz || []).length, 0)} 道思考题）`);
require('./register')(id);
