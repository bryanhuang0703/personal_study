// 本地进度存储：每个模块一份“已掌握”集合（存 term 下标）。
const key = id => 'known:' + id;

function getKnown(id) {
  try {
    return new Set(wx.getStorageSync(key(id)) || []);
  } catch (e) {
    return new Set();
  }
}

function saveKnown(id, set) {
  try {
    wx.setStorageSync(key(id), Array.from(set));
  } catch (e) {}
}

module.exports = { getKnown, saveKnown };
