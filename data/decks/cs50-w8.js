// 由 tools/cs50-json2deck.js 从 source/cs50-week8.json 生成，可直接手改。
module.exports = {
  "id": "cs50-w8",
  "type": "lesson",
  "tag": "CS50",
  "title": "CS50 · Week 8 HTML, CSS, JavaScript",
  "subtitle": "CS50x 2026",
  "desc": "Week 8 走出单机。先理解数据怎么在网络上传输，再学浏览器这一端的三种语言：HTML 管结构，CSS 管样式，JavaScript 管行为。",
  "schema": "cs50-cards/v1",
  "course": "CS50x 2026",
  "week": 8,
  "weekTitle": "HTML, CSS, JavaScript",
  "source": "https://cs50.harvard.edu/x/weeks/8/",
  "license": "Based on CS50 by Harvard University, CC BY-NC-SA 4.0",
  "map": {
    "title": "这一周在全局里的位置",
    "summary": "Week 8 走出单机。先理解数据怎么在网络上传输，再学浏览器这一端的三种语言：HTML 管结构，CSS 管样式，JavaScript 管行为。",
    "chain": [
      {
        "week": 5,
        "label": "Data Structures",
        "note": "DOM 是一棵树"
      },
      {
        "week": 6,
        "label": "Python",
        "note": "又一门语言，同样的积木"
      },
      {
        "week": 8,
        "label": "HTML, CSS, JS",
        "note": "网络、HTTP、前端三件套",
        "current": true
      },
      {
        "week": 9,
        "label": "Flask",
        "note": "服务器端动态生成页面"
      },
      {
        "week": 10,
        "label": "The End",
        "note": "全课复盘"
      }
    ]
  },
  "cards": [
    {
      "id": "w8-01",
      "title": "Internet：数据怎么送到目的地",
      "question": "打开一个网址，数据是怎么走的？",
      "conclusion": "数据被切成 packet，靠 IP 地址寻址，经过一个个 router 转发；TCP 保证 packet 完整、按序到达，并用 port 区分服务；DNS 把域名翻译成 IP。",
      "points": [
        "IPv4 是 32 位地址，IPv6 是 128 位",
        "Router 只负责把 packet 转发给下一站",
        "TCP 丢包会重传，port 80 是 HTTP，443 是 HTTPS",
        "DNS：harvard.edu → IP 地址"
      ],
      "analogy": "寄信：DNS 是查地址簿，IP 是收件地址，router 是一路的邮局，TCP 是挂号信回执。",
      "links": [
        {
          "week": 0,
          "text": "IP 地址也只是一串 bit"
        },
        {
          "week": 1,
          "text": "IPv4 只有 32 位，地址不够用，和 overflow 同一类有限资源问题"
        }
      ],
      "quiz": [
        {
          "q": "DNS 的作用是什么？",
          "a": "把域名解析成 IP 地址。"
        },
        {
          "q": "TCP 在 IP 之上额外提供了什么？",
          "a": "可靠传输（重传、按序）和 port 区分不同服务。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w8-02",
      "title": "HTTP：请求与响应",
      "question": "浏览器和服务器之间说的是什么话？",
      "conclusion": "HTTP 是一问一答的协议。浏览器发 request（GET 或 POST 加路径和 header），服务器回 response（status code 加 header 加内容）。HTTPS 是加密版的 HTTP。",
      "points": [
        "GET 获取资源，参数放在 URL 里",
        "POST 提交数据，参数放在请求体里",
        "常见 status：200 OK、301 跳转、404 找不到、500 服务器错误",
        "URL 结构：https://域名/路径?key=value"
      ],
      "code": "GET /search?q=cats HTTP/2\nHost: www.google.com\n\nHTTP/2 200\nContent-Type: text/html",
      "analogy": "到柜台办事：你递一张申请单（request），柜员回一张回执单（response），回执上盖着结果章（status code）。",
      "links": [
        {
          "week": 2,
          "text": "status code 与 exit status 是同一种思想：用数字报告结果"
        },
        {
          "week": 9,
          "text": "Flask 负责在服务器端接收 request、返回 response"
        }
      ],
      "quiz": [
        {
          "q": "登录表单应该用 GET 还是 POST？",
          "a": "POST，避免密码出现在 URL 和浏览器历史里。"
        },
        {
          "q": "404 表示什么？",
          "a": "请求的资源在服务器上不存在。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w8-03",
      "title": "HTML 与 DOM 树",
      "question": "网页的结构是怎么描述的？",
      "conclusion": "HTML 是 markup language，用成对的 tag 描述内容结构，tag 可以带 attribute。浏览器把 HTML 解析成一棵 DOM 树，后续的 CSS 和 JavaScript 都在这棵树上操作。",
      "points": [
        "<html> 下分 <head>（元信息）和 <body>（可见内容）",
        "常用 tag：p、h1、a、img、ul、li、table、form",
        "attribute 如 <a href=\"...\">、<img alt=\"...\">",
        "HTML 不是编程语言，没有循环和条件"
      ],
      "code": "<!DOCTYPE html>\n<html lang=\"en\">\n  <head><title>hello</title></head>\n  <body>\n    <a href=\"https://cs50.harvard.edu\">CS50</a>\n  </body>\n</html>",
      "analogy": "HTML 是房子的结构图：哪里是客厅，哪里是门，还没有装修。",
      "links": [
        {
          "week": 5,
          "text": "DOM 是一棵树，每个元素是一个节点"
        },
        {
          "week": 9,
          "text": "Flask 用模板动态生成 HTML"
        }
      ],
      "quiz": [
        {
          "q": "HTML 算编程语言吗？",
          "a": "不算，它是 markup language，只描述结构，没有逻辑。"
        },
        {
          "q": "浏览器解析 HTML 后得到什么结构？",
          "a": "DOM 树。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w8-04",
      "title": "Form：把输入发给服务器",
      "question": "搜索框是怎么把关键词交给 Google 的？",
      "conclusion": "<form> 的 action 指定发往哪个 URL，method 指定 GET 或 POST，每个 <input> 的 name 成为参数名。提交 GET 表单，浏览器就拼出 ?q=cats 这样的 URL。",
      "points": [
        "action：提交到哪里",
        "method：GET 或 POST",
        "input 的 name 是 key，用户输入是 value",
        "required、placeholder 等 attribute 提供基础校验和提示"
      ],
      "code": "<form action=\"https://www.google.com/search\" method=\"get\">\n  <input name=\"q\" type=\"search\">\n  <button>Search</button>\n</form>",
      "analogy": "Form 是一张预先印好格子的申请单，填完交到 action 指定的窗口。",
      "links": [
        {
          "week": 2,
          "text": "URL 参数和命令行参数作用相同：给程序传入 input"
        },
        {
          "week": 9,
          "text": "Flask 用 request.args 或 request.form 读取这些参数"
        }
      ],
      "quiz": [
        {
          "q": "<input name=\"q\"> 中的 name 有什么用？",
          "a": "作为提交参数的 key，如 ?q=用户输入。"
        },
        {
          "q": "前端的 required 校验够用吗？",
          "a": "不够，用户可以绕过浏览器，服务器端必须再次校验。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w8-05",
      "title": "CSS：把样式和结构分开",
      "question": "网页的外观怎么控制？",
      "conclusion": "CSS 用 selector 选中元素，再用 property: value 设置样式。样式写在独立的 .css 文件里，和 HTML 分离，改外观不用动结构。Bootstrap 等框架提供现成样式。",
      "points": [
        "Selector：type（p）、class（.note）、ID（#main）",
        "多条规则冲突时，按 specificity 决定：ID > class > type",
        "<link rel=\"stylesheet\" href=\"styles.css\"> 引入样式",
        "框架可以快速做出响应式布局"
      ],
      "code": ".note {\n    color: gray;\n    font-size: 14px;\n}\n#title {\n    text-align: center;\n}",
      "analogy": "HTML 是毛坯房，CSS 是装修方案，换方案不用拆墙。",
      "links": [
        {
          "week": 0,
          "text": "颜色依然是 Week 0 讲的 RGB 三个数值"
        },
        {
          "week": 1,
          "text": "结构和样式分离，就是 design 维度的体现"
        }
      ],
      "quiz": [
        {
          "q": ".note 和 #note 选中的是什么？",
          "a": ".note 选中 class 为 note 的元素，#note 选中 id 为 note 的元素。"
        },
        {
          "q": "为什么 CSS 要放在独立文件？",
          "a": "结构与样式分离，便于复用和维护。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w8-06",
      "title": "JavaScript：让页面动起来",
      "question": "不刷新页面也能响应用户操作，是怎么做到的？",
      "conclusion": "JavaScript 在浏览器里运行，可以读写 DOM，并通过 event listener 响应点击、输入、提交等事件。语法接近 C，变量用 let 声明。",
      "points": [
        "document.querySelector 选中元素",
        "addEventListener('click', ...) 注册事件处理函数",
        "修改 DOM 后页面立即更新，无需重新请求服务器",
        "代码在用户的浏览器里执行，用户可以看到和修改"
      ],
      "code": "document.querySelector('form').addEventListener('submit', function(event) {\n    let name = document.querySelector('#name').value;\n    alert('hello, ' + name);\n    event.preventDefault();\n});",
      "analogy": "HTML 是骨架，CSS 是皮肤，JavaScript 是肌肉和神经。",
      "links": [
        {
          "week": 1,
          "text": "if、for、function 的写法和 C 非常接近"
        },
        {
          "week": 9,
          "text": "JavaScript 可以用 fetch 向 Flask 请求 JSON 数据，局部更新页面"
        }
      ],
      "quiz": [
        {
          "q": "JavaScript 在哪里运行？",
          "a": "在用户的浏览器里（客户端）。"
        },
        {
          "q": "event.preventDefault() 在表单提交时有什么作用？",
          "a": "阻止浏览器默认提交并跳转页面。"
        }
      ],
      "minutes": 3
    }
  ]
};
