// 由 source/cs50-ai/ai.js 转换，可直接手改。
// 卡片字段：id、en、zh、def 定义、ex 例子、code 代码、sup 补充、rel 关联、q/a 自测。进度按 id 存，不要改 id。
module.exports = {
  "id": "cs50-ai",
  "type": "notes",
  "tag": "CS50",
  "course": "CS50x 2026",
  "title": "CS50 · AI",
  "subtitle": "CS50x 2026 · Artificial Intelligence",
  "desc": "按 CS50x AI 讲义的顺序整理：框架速览 + 定义、例子、自测题。",
  "kicker": "CS50x 2026 · Artificial Intelligence",
  "heading": "AI 学习卡片",
  "lede": "按 CS50x AI 讲义的顺序整理，共 {total} 张卡。每张有一句话定义、例子和一道自测题。标有「补充」的内容来自讲义之外。",
  "chain": [
    {
      "n": "1",
      "t": "Decision Trees",
      "d": "规则由人写死，用 if/else 决定动作"
    },
    {
      "n": "2",
      "t": "Minimax",
      "d": "给结局打分，沿博弈树比较，一方取最大，一方取最小"
    },
    {
      "gap": true,
      "label": "瓶颈",
      "text": "博弈树太大，普通设备算不动"
    },
    {
      "n": "3",
      "t": "Reinforcement Learning",
      "d": "反复试错，用 epsilon 平衡 explore 和 exploit"
    },
    {
      "n": "4",
      "t": "Supervised → Unsupervised",
      "d": "依赖人工标注扩展性差，转向少人工干预"
    },
    {
      "n": "5",
      "t": "Deep Learning",
      "d": "神经网络从训练数据里学出输入与输出的关系"
    },
    {
      "n": "6",
      "t": "Large Language Models",
      "d": "attention 加 embeddings，预测词与词的关系，会 hallucinate"
    },
    {
      "gap": true,
      "label": "使用入口",
      "text": "System prompt 与 User prompt"
    },
    {
      "gap": true,
      "label": "产出形态",
      "text": "Generative AI"
    }
  ],
  "sections": [
    {
      "id": "start",
      "key": "A",
      "title": "起点",
      "cards": [
        {
          "id": "duck",
          "en": "Rubber duck debugging",
          "zh": "橡皮鸭调试",
          "def": "对着没有生命的物体讲出问题，在讲述中理清思路，常用来排查代码里的 bug。",
          "ex": "CS50 在 CS50.ai 做了自己的 rubber duck，用 AI 与学生互动，帮他们解决自己的难题。",
          "rel": "本讲的起点，引出 AI 能做什么。",
          "q": "Rubber duck debugging 的关键动作是什么？",
          "a": "对着无生命的对象，把问题一步步讲出来（talk through）。"
        },
        {
          "id": "genai",
          "en": "Generative AI",
          "zh": "生成式 AI",
          "def": "能生成图像、视频、音乐和文本的 AI。",
          "ex": "AI 生成的图像过去有明显破绽，现在越来越逼真，将来可能连肉眼也无法分辨。",
          "rel": "应用层。后面的 LLM 是文本生成的核心。",
          "q": "讲义里生成式 AI 可以产出哪四类内容？",
          "a": "照片（图像）、视频、音乐、文本。"
        }
      ]
    },
    {
      "id": "prompt",
      "key": "B",
      "title": "Prompt 与 Copilot",
      "cards": [
        {
          "id": "pe",
          "en": "Prompt Engineering",
          "zh": "提示词工程",
          "def": "学会向 AI 提出好问题的方法。",
          "ex": "同一个模型，system prompt 与 user prompt 写法不同，回答的风格和长度就不同，见下一张卡的代码。",
          "rel": "使用 LLM 的入口。",
          "q": "Prompt engineering 要解决的是什么问题？",
          "a": "怎样把问题问好，让 AI 给出有用的回答。"
        },
        {
          "id": "sysuser",
          "en": "System prompt vs. User prompt",
          "zh": "系统提示与用户提示",
          "def": "System prompt 教 AI 应该如何与用户互动。User prompt 是用户输入的内容，学生通过它与 AI 对话。",
          "ex": "CS50 用 system prompt 教 AI 如何帮助学生。下面的 chat.py 用 python chat.py 运行。",
          "code": "# Adds to system prompt.\n\nfrom openai import OpenAI\n\nclient = OpenAI()\n\nuser_prompt = input(\"Prompt: \")\nsystem_prompt = \"Limit your answer to one sentence. Pretend you're a cat.\"\n\nresponse = client.responses.create(\n    input=user_prompt,\n    instructions=system_prompt,\n    model=\"gpt-5\"\n)\n\nprint(response.output_text)",
          "rel": "system prompt 由开发者写，user prompt 由使用者写。",
          "q": "上面的代码里，哪个变量是 system prompt？它通过哪个参数传入？",
          "a": "system_prompt，内容是限制一句话并扮演猫，通过 instructions 参数传入。user_prompt 来自 input()，通过 input 参数传入。"
        },
        {
          "id": "copilot",
          "en": "Copilot 与 AI 写代码",
          "zh": "代码生成",
          "def": "生成式 AI 也能生成代码，可以放大程序员的能力。Copilot 是这类工具的一个例子。",
          "ex": "CS50 规定：除课程自带的工具外，不允许使用生成式 AI。哪些用法合理、哪些不合理，写在 academic honesty 政策里。",
          "rel": "同一类技术，用在学习场景要遵守课程规则。",
          "q": "CS50 对生成式 AI 的使用边界是什么？",
          "a": "课程自带工具之外不允许使用。具体的合理与不合理用法见 academic honesty 政策。"
        }
      ]
    },
    {
      "id": "classic",
      "key": "C",
      "title": "经典 AI",
      "cards": [
        {
          "id": "old",
          "en": "AI is not new",
          "zh": "AI 早就存在",
          "def": "软件长期都会适应用户，靠算法在数据里找规律。",
          "ex": "垃圾邮件识别、手写识别、电影与视频推荐、游戏里的电脑对手。",
          "rel": "后面三个概念，从规则到学习，都是在这条线上演进。",
          "q": "讲义举了哪几类早期的 AI 应用？",
          "a": "垃圾邮件识别、手写识别、影视推荐、玩游戏。"
        },
        {
          "id": "dt",
          "en": "Decision Trees",
          "zh": "决策树",
          "def": "用显式的 if/else 规则，让算法决定下一步做什么。",
          "ex": "Breakout 里的电脑挡板：球在挡板左边就左移，在右边就右移，否则不动。",
          "code": "While game is ongoing:\n  If ball is left of paddle:\n    Move paddle left\n  Else if ball is right of paddle:\n    Move paddle right\n  Else:\n    Don't move paddle",
          "rel": "规则全由人写死。下一张 Minimax 开始用分数比较选项。",
          "q": "游戏 AI 用决策树时，通常追求什么？",
          "a": "尽量减少需要的计算量，同时又能和玩家对抗。"
        },
        {
          "id": "minimax",
          "en": "Minimax",
          "zh": "极小极大算法",
          "def": "把每种结局量化成分数，沿博弈树比较各种走法的得分。一方选最大，另一方选最小。",
          "ex": "Tic-tac-toe：电脑赢记 1，电脑输记 -1，平局记 0。X 选得分最高的走法，O 选得分最低的走法。",
          "code": "If player is X:\n  For each possible move:\n    Calculate score for board\n  Choose move with highest score\n\nElse if player is O:\n  For each possible move:\n    Calculate score for board\n  Choose move with lowest score",
          "rel": "局限是博弈树过大时算不动，由此转向 machine learning。",
          "q": "Minimax 为什么不能直接用在更复杂的博弈上？",
          "a": "可能的结局数量极大，博弈树过大，手机和桌面电脑这样的设备无法穷举计算。"
        }
      ]
    },
    {
      "id": "ml",
      "key": "D",
      "title": "Machine Learning",
      "cards": [
        {
          "id": "rl",
          "en": "Reinforcement Learning",
          "zh": "强化学习",
          "def": "电脑通过强化（reinforcement）自己学：反复试验，找出哪些行为该重复，哪些不该。",
          "ex": "讲义里的例子：学会翻煎饼，学会玩 The Floor is Lava。",
          "rel": "与 Minimax 的区别：不再穷举，而是靠试验积累经验。",
          "q": "强化学习靠什么改进行为？",
          "a": "大量重复的试验，保留带来好结果的行为，放弃不好的行为。"
        },
        {
          "id": "explore",
          "en": "Explore vs. Exploit",
          "zh": "探索与利用",
          "def": "有时随机尝试看似不是最优的走法（explore），其余时间选当前价值最高的走法（exploit）。随机性有时能带来更好的结果。",
          "ex": "epsilon 表示随机的比例，例中为 0.10，也就是约 10% 的时间随机走。",
          "code": "epsilon = 0.10\n\nIf random() < epsilon:\n    Make a random move\nElse:\n    Make the move with the highest value",
          "rel": "是强化学习里的核心权衡。",
          "q": "把 epsilon 调大，行为会怎么变？",
          "a": "更常随机探索（explore），更少选择当前最优（exploit）。"
        }
      ]
    },
    {
      "id": "dl",
      "key": "E",
      "title": "Deep Learning",
      "cards": [
        {
          "id": "sup",
          "en": "Supervised vs. Unsupervised",
          "zh": "监督学习与无监督学习",
          "def": "Supervised：人与 AI 配合，提供标注。Unsupervised：AI 在很少的人工干预下自行学习。",
          "ex": "在邮箱里点「垃圾邮件」按钮，就是在教 AI 哪些邮件算垃圾。",
          "rel": "supervised 难以扩展到大问题，所以转向 unsupervised。",
          "q": "为什么要转向 unsupervised learning？",
          "a": "supervised 依赖人工参与，扩展性差，处理大问题时跟不上。"
        },
        {
          "id": "nn",
          "en": "Deep Learning 与 Neural Networks",
          "zh": "深度学习与神经网络",
          "def": "用神经网络探索问题与解法。网络里的节点把输入与输出关联起来。",
          "ex": "预测图上某个位置会出现蓝点还是红点：先用已有的训练数据做预测，AI 还可以自己生成更多训练数据，发现更多规律。",
          "rel": "是 LLM 的底层。",
          "q": "Deep learning 里的节点起什么作用？",
          "a": "把输入和输出关联起来。大量节点连成网络，从训练数据里学到其中的规律。"
        }
      ]
    },
    {
      "id": "llm",
      "key": "F",
      "title": "Large Language Models",
      "cards": [
        {
          "id": "llm1",
          "en": "Large Language Models",
          "zh": "大语言模型",
          "def": "基于海量训练做预测的大型模型，简称 LLM。",
          "ex": "几年前，AI 还不擅长补全和生成句子。",
          "rel": "deep learning 在语言上的应用。",
          "q": "LLM 的本质是什么？",
          "a": "基于海量训练数据做预测的巨大模型。"
        },
        {
          "id": "attn",
          "en": "Attention 与 Transformer",
          "zh": "注意力机制",
          "def": "2017 年 Google 发表论文，让 AI 的注意力（attention）放在句子里各个词之间的关系上。",
          "sup": "这篇论文提出的架构就是 Transformer。索引页把它列为 Transformer Architecture，讲义正文没有使用这个词。",
          "rel": "让模型能抓住词与词的关系，是 GPT 的基础。",
          "q": "Attention 让模型关注什么？",
          "a": "句子中各个词之间的关系。"
        },
        {
          "id": "gpt",
          "en": "GPT 与 Embeddings",
          "zh": "生成式预训练与词嵌入",
          "def": "GPT 是 Generative Pre-trained Transformer 的缩写，基于词与词的关系训练。词被编码成 embeddings，用来发现这些关系。",
          "ex": "经过海量训练，巨大的神经网络能预测词与词的关联，因而可以生成内容，甚至与用户对话。",
          "rel": "这条线收在 CS50.ai 背后的技术上。",
          "q": "Embeddings 是做什么的？",
          "a": "把词编码成 embeddings，以便找出词与词之间的关系。"
        },
        {
          "id": "hall",
          "en": "Hallucination",
          "zh": "幻觉",
          "def": "LLM 有时会提供不正确的信息。",
          "rel": "LLM 的已知局限。",
          "q": "说 LLM 会 hallucinate，指的是什么？",
          "a": "模型给出了不正确的信息。"
        }
      ]
    },
    {
      "id": "link",
      "key": "G",
      "title": "串联自测",
      "note": "跨概念的问题，用来检查框架是否连得起来。",
      "cards": [
        {
          "id": "x1",
          "en": "规则从哪来",
          "zh": "",
          "q": "Decision tree 与 deep learning 在「规则从哪来」上有什么区别？",
          "a": "决策树的规则由人写死（if/else）。Deep learning 的规则由神经网络从训练数据里学出来。"
        },
        {
          "id": "x2",
          "en": "三种学习方式",
          "zh": "",
          "q": "Supervised、reinforcement、unsupervised 各自靠什么反馈来学习？",
          "a": "Supervised 靠人的标注。Reinforcement 靠反复试验的结果。Unsupervised 靠很少的人工干预，由 AI 自己发现模式。"
        },
        {
          "id": "x3",
          "en": "谁写哪个 prompt",
          "zh": "",
          "q": "在 CS50.ai 里，system prompt 和 user prompt 分别由谁写？",
          "a": "System prompt 由课程方设定，用来教 AI 如何帮助学生。User prompt 由学生输入。"
        },
        {
          "id": "x4",
          "en": "一句话串起全讲",
          "zh": "",
          "q": "用一句话把本讲串起来。",
          "a": "规则（decision trees）和搜索（minimax）受限于算力，于是转向从试错和数据里学习（machine learning、deep learning）。神经网络加上 attention 与 embeddings 得到 LLM，再通过 system prompt 与 user prompt 使用，同时要留意 hallucination。"
        }
      ]
    }
  ],
  "resources": [
    {
      "label": "讲义",
      "url": "https://cs50.harvard.edu/x/notes/ai/"
    },
    {
      "label": "视频",
      "url": "https://video.cs50.io/-9bo8HlSxwQ"
    },
    {
      "label": "字幕全文",
      "url": "https://cdn.cs50.net/2025/fall/lectures/ai/lang/en/ai.txt"
    },
    {
      "label": "幻灯片",
      "url": "https://cdn.cs50.net/2025/fall/lectures/ai/ai.pdf"
    },
    {
      "label": "示例代码",
      "url": "https://cdn.cs50.net/2025/fall/lectures/ai/src/"
    }
  ]
};
