// 由 tools/cs50-json2deck.js 从 source/cs50-week5.json 生成，可直接手改。
module.exports = {
  "id": "cs50-w5",
  "type": "lesson",
  "tag": "CS50",
  "title": "CS50 · Week 5 Data Structures",
  "subtitle": "CS50x 2026",
  "desc": "Week 5 用 Week 4 的指针和 malloc，把零散的内存组织成更灵活的结构。每种结构都是时间、空间、实现难度之间的一种取舍。",
  "schema": "cs50-cards/v1",
  "course": "CS50x 2026",
  "week": 5,
  "weekTitle": "Data Structures",
  "source": "https://cs50.harvard.edu/x/weeks/5/",
  "license": "Based on CS50 by Harvard University, CC BY-NC-SA 4.0",
  "map": {
    "title": "这一周在全局里的位置",
    "summary": "Week 5 用 Week 4 的指针和 malloc，把零散的内存组织成更灵活的结构。每种结构都是时间、空间、实现难度之间的一种取舍。",
    "chain": [
      {
        "week": 3,
        "label": "Algorithms",
        "note": "Big O 与搜索"
      },
      {
        "week": 4,
        "label": "Memory",
        "note": "指针与 malloc"
      },
      {
        "week": 5,
        "label": "Data Structures",
        "note": "链表、树、哈希表、trie",
        "current": true
      },
      {
        "week": 6,
        "label": "Python",
        "note": "list、dict、set 都是现成的数据结构"
      },
      {
        "week": 7,
        "label": "SQL",
        "note": "数据库索引就是树"
      }
    ]
  },
  "cards": [
    {
      "id": "w5-01",
      "title": "Abstract data type：先定行为，再选实现",
      "question": "Queue 和 stack 有什么区别？",
      "conclusion": "Abstract data type 只规定能做什么操作，不规定内存里怎么存。Queue 是 FIFO，先进先出；stack 是 LIFO，后进先出。同一个 ADT 可以用 array 或 linked list 实现。",
      "points": [
        "Queue 的操作：enqueue 入队、dequeue 出队，像排队买票",
        "Stack 的操作：push 压入、pop 弹出，像一摞盘子",
        "接口和实现分离，就是 abstraction 在数据层面的应用"
      ],
      "analogy": "ADT 是菜单上的菜名，实现是后厨的具体做法。",
      "links": [
        {
          "week": 4,
          "text": "函数调用用的 call stack 就是一个 stack"
        }
      ],
      "quiz": [
        {
          "q": "打印任务排队应该用 queue 还是 stack？",
          "a": "Queue，先提交的先打印。"
        },
        {
          "q": "撤销（Undo）功能适合用什么结构？",
          "a": "Stack，最后一次操作最先被撤销。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w5-02",
      "title": "Array 扩容的代价",
      "question": "数组满了想加一个元素，要付出什么？",
      "conclusion": "Array 要求连续内存，后面的空间可能已被占用。扩容只能 malloc 一块更大的新空间，把旧数据全部复制过去，再 free 旧空间，代价是 O(n)。",
      "points": [
        "realloc 帮你完成“申请新空间 + 复制 + 释放旧空间”",
        "按下标访问依然是 O(1)，这是 array 的最大优势",
        "频繁插入时，反复复制会成为瓶颈"
      ],
      "code": "int *tmp = realloc(list, 4 * sizeof(int));\nif (tmp == NULL) { free(list); return 1; }\nlist = tmp;\nlist[3] = 4;",
      "analogy": "一排连号座位坐满了，想多来一个人，全班只能换到更大的教室。",
      "links": [
        {
          "week": 2,
          "text": "Week 2 的 array 长度在声明时固定"
        },
        {
          "week": 6,
          "text": "Python 的 list 直接用 append 添加元素，扩容由语言处理"
        }
      ],
      "quiz": [
        {
          "q": "为什么 array 不能原地变长？",
          "a": "紧跟在后面的内存可能已经被别的数据占用。"
        },
        {
          "q": "扩容一次的时间复杂度是多少？",
          "a": "O(n)，要复制所有现有元素。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w5-03",
      "title": "Linked list：用指针串起来",
      "question": "怎样避免扩容时复制整个数组？",
      "conclusion": "每个 node 存一个值加一个 next 指针，节点散落在内存各处，靠指针连起来。插入到头部是 O(1)，但不能按下标跳转，查找只能从头走，O(n)。",
      "points": [
        "node 是一个 struct：int number; struct node *next;",
        "最后一个节点的 next 为 NULL",
        "每个节点多占一个指针的空间",
        "不能 binary search，因为无法直接访问中间元素"
      ],
      "code": "typedef struct node\n{\n    int number;\n    struct node *next;\n}\nnode;",
      "analogy": "寻宝游戏，每张纸条写着下一张纸条藏在哪。",
      "links": [
        {
          "week": 3,
          "text": "Linked list 用不了 binary search，查找退化为 O(n)"
        },
        {
          "week": 4,
          "text": "每个节点都是 malloc 出来的，用完要逐个 free"
        }
      ],
      "quiz": [
        {
          "q": "Linked list 相比 array 用什么换来了插入的便利？",
          "a": "失去了随机访问能力，并多占用指针的内存。"
        },
        {
          "q": "怎么判断走到了链表末尾？",
          "a": "当前节点的 next 是 NULL。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w5-04",
      "title": "Binary search tree：把二分查找变成结构",
      "question": "能不能既能快速插入，又能快速查找？",
      "conclusion": "BST 每个节点有 left 和 right 两个指针，左边都比它小，右边都比它大。树平衡时查找和插入都是 O(log n)；如果按顺序插入，树会退化成链表，变成 O(n)。",
      "points": [
        "查找时每一步排除一半，本质就是 binary search",
        "每个节点多两个指针，空间开销更大",
        "保持平衡需要额外算法，CS50 只点到为止",
        "树的操作天然适合 recursion"
      ],
      "code": "bool search(node *tree, int n)\n{\n    if (tree == NULL) return false;\n    if (n < tree->number) return search(tree->left, n);\n    if (n > tree->number) return search(tree->right, n);\n    return true;\n}",
      "analogy": "一棵分岔路的树，每个路口都写着“小的往左，大的往右”。",
      "links": [
        {
          "week": 3,
          "text": "这是 binary search 加 recursion 的直接应用"
        },
        {
          "week": 7,
          "text": "数据库索引常用的 B-tree 是 BST 的扩展版"
        }
      ],
      "quiz": [
        {
          "q": "依次插入 1、2、3、4、5，BST 会变成什么样？",
          "a": "所有节点都在右侧，退化成链表，查找变为 O(n)。"
        },
        {
          "q": "tree->left 中的 -> 是什么意思？",
          "a": "通过指针访问 struct 字段，等价于 (*tree).left。"
        }
      ],
      "minutes": 4
    },
    {
      "id": "w5-05",
      "title": "Hash table：用函数直接算出位置",
      "question": "怎样做到接近 O(1) 的查找？",
      "conclusion": "Hash function 把 key 转换成数组下标（bucket）。查找时直接算出位置，不用逐个比较。不同 key 落到同一 bucket 叫 collision，常用链表把它们挂在一起（chaining）。",
      "points": [
        "例子：按名字首字母分 26 个 bucket",
        "好的 hash function 让数据均匀分布",
        "最坏情况全挤在一个 bucket 里，退化为 O(n)",
        "bucket 越多 collision 越少，但更费内存"
      ],
      "code": "unsigned int hash(const char *word)\n{\n    return toupper(word[0]) - 'A';\n}",
      "analogy": "按姓氏首字母分好的文件柜，直接拉开对应抽屉找。",
      "links": [
        {
          "week": 6,
          "text": "Python 的 dict 查找接近 constant time，Week 6 会直接用到"
        }
      ],
      "quiz": [
        {
          "q": "什么是 collision？",
          "a": "两个不同的 key 被 hash function 映射到同一个 bucket。"
        },
        {
          "q": "为什么 hash table 理论最坏是 O(n)？",
          "a": "如果所有 key 都冲突到同一个 bucket，就要遍历整条链表。"
        }
      ],
      "minutes": 4
    },
    {
      "id": "w5-06",
      "title": "Trie 与选型总结",
      "question": "这么多数据结构，怎么选？",
      "conclusion": "没有万能结构，只有取舍。Trie 按字符逐层建树，查找时间只与单词长度有关，与总量无关，但极其耗内存。选型时看你最常做什么操作、数据有多大、内存是否紧张。",
      "points": [
        "Array：随机访问快，插入慢",
        "Linked list：插入快，查找慢",
        "BST：平衡时各方面都是 O(log n)",
        "Hash table：平均接近 O(1)，无序",
        "Trie：查找与 n 无关，空间开销最大"
      ],
      "analogy": "工具箱里有锤子、螺丝刀和扳手，按要处理的问题挑。",
      "links": [
        {
          "week": 3,
          "text": "Big O 是比较这些结构的共同语言"
        },
        {
          "week": 6,
          "text": "Python 把这些做成内置类型，你只需挑合适的那个"
        }
      ],
      "quiz": [
        {
          "q": "Trie 的查找时间取决于什么？",
          "a": "所查单词的长度，与存了多少单词无关。"
        },
        {
          "q": "需要按顺序遍历数据时，hash table 合适吗？",
          "a": "不合适，hash table 不保持顺序，BST 更合适。"
        }
      ],
      "minutes": 3
    }
  ]
};
