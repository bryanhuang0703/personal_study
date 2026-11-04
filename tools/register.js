// 把 data/decks/<id>.js 追加到 data/registry.js 的 <decks> 区块（已存在则跳过）。
const fs = require('fs');
const path = require('path');

module.exports = function register(id) {
  const regPath = path.join(__dirname, '..', 'data/registry.js');
  let reg = fs.readFileSync(regPath, 'utf8');
  if (reg.includes(`./decks/${id}.js`)) return console.log('registry 中已存在，跳过注册');
  reg = reg.replace(/(\s*\/\/ <\/decks>)/, `\n  require('./decks/${id}.js'),$1`);
  fs.writeFileSync(regPath, reg);
  console.log('已注册到 data/registry.js');
};
