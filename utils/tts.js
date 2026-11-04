// 英文朗读：微信同声传译插件 textToSpeech → 拿到音频地址 → InnerAudioContext 播放。
// 需在小程序后台「设置 → 第三方设置 → 插件管理」添加「微信同声传译」（provider: wx069ba97219f66d99）。
let plugin = null;
try { plugin = requirePlugin('WechatSI'); } catch (e) {}

const cache = {}; // text -> { src, exp }
let audio = null;

function player() {
  if (audio) return audio;
  try { wx.setInnerAudioOption({ obeyMuteSwitch: false }); } catch (e) {} // iOS 静音键下也能出声
  audio = wx.createInnerAudioContext();
  audio.onError(() => wx.showToast({ title: '播放失败', icon: 'none' }));
  return audio;
}

function play(src) {
  const a = player();
  a.stop();
  a.src = src;
  a.play();
}

// 与原 HTML 一致：去掉括号内容，斜杠读作停顿
const clean = t => t.replace(/\(.*?\)/g, '').replace(/\s*\/\s*/g, ', ').replace(/\s+/g, ' ').trim();

function speak(text) {
  if (!plugin) { wx.showToast({ title: '朗读插件未启用', icon: 'none' }); return; }
  const content = clean(text || '');
  if (!content) return;
  const now = Date.now() / 1000;
  const hit = cache[content];
  if (hit && hit.exp - 60 > now) { play(hit.src); return; }
  plugin.textToSpeech({
    lang: 'en_US',
    tts: true,
    content,
    success: res => {
      if (res.retcode !== 0 || !res.filename) { wx.showToast({ title: '朗读失败', icon: 'none' }); return; }
      cache[content] = { src: res.filename, exp: res.expired_time || now + 3600 };
      play(res.filename);
    },
    fail: () => wx.showToast({ title: '朗读失败，检查网络', icon: 'none' })
  });
}

function stop() { if (audio) audio.stop(); }

module.exports = { speak, stop, available: !!plugin };
