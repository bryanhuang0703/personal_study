// 由 tools/cs50-json2deck.js 从 source/cs50-week3.json 生成，可直接手改。
module.exports = {
  "id": "cs50-w3",
  "type": "lesson",
  "tag": "CS50",
  "title": "CS50 · Week 3 Algorithms",
  "subtitle": "CS50x 2026",
  "desc": "Week 3 把 Week 0 查电话簿的直觉变成正式工具：用 Big O 比较算法，学会搜索、排序和 recursion。核心权衡是时间、空间和实现难度。",
  "schema": "cs50-cards/v1",
  "course": "CS50x 2026",
  "week": 3,
  "weekTitle": "Algorithms",
  "source": "https://cs50.harvard.edu/x/weeks/3/",
  "license": "Based on CS50 by Harvard University, CC BY-NC-SA 4.0",
  "map": {
    "title": "这一周在全局里的位置",
    "summary": "Week 3 把 Week 0 查电话簿的直觉变成正式工具：用 Big O 比较算法，学会搜索、排序和 recursion。核心权衡是时间、空间和实现难度。",
    "chain": [
      {
        "week": 0,
        "label": "Scratch",
        "note": "电话簿的直觉"
      },
      {
        "week": 2,
        "label": "Arrays",
        "note": "算法操作的数据"
      },
      {
        "week": 3,
        "label": "Algorithms",
        "note": "Big O、搜索、排序、递归",
        "current": true
      },
      {
        "week": 5,
        "label": "Data Structures",
        "note": "用结构换取更快的查找"
      },
      {
        "week": 7,
        "label": "SQL",
        "note": "索引让数据库避免线性扫描"
      }
    ]
  },
  "cards": [
    {
      "id": "w3-01",
      "title": "Big O：描述增长，不看秒数",
      "question": "怎么比较两个算法谁更快？",
      "conclusion": "看输入规模 n 变大时步数怎么增长。O 是上界（最坏情况），Ω 是下界（最好情况），上下界相同时记为 Θ。常数和低阶项忽略不计。",
      "points": [
        "常见等级由快到慢：O(1)、O(log n)、O(n)、O(n log n)、O(n²)",
        "O(n/2) 仍然记作 O(n)，因为曲线形状相同",
        "n 小时差别不明显，n 大时决定一切"
      ],
      "analogy": "比较交通工具看的是速度等级，不是今天堵不堵车。",
      "links": [
        {
          "week": 0,
          "text": "电话簿的三种翻法分别是 O(n)、O(n/2)≈O(n)、O(log n)"
        },
        {
          "week": 5,
          "text": "Week 5 的 hash table 追求接近 O(1) 的查找"
        }
      ],
      "quiz": [
        {
          "q": "O 和 Ω 分别描述什么？",
          "a": "O 是运行步数的上界，Ω 是下界。"
        },
        {
          "q": "为什么 O(3n + 5) 写成 O(n)？",
          "a": "n 足够大时，常数系数和低阶项不影响增长趋势。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w3-02",
      "title": "Linear search vs Binary search",
      "question": "在数组里找一个值，有哪两种方法？",
      "conclusion": "Linear search 从头到尾逐个查，O(n)、Ω(1)，不要求有序。Binary search 每次取中间比较、扔掉一半，O(log n)、Ω(1)，但前提是数组已排序。",
      "points": [
        "无序数据只能 linear search",
        "排序本身有成本，只查一次时未必划算",
        "要反复查找时，先排序再 binary search 更值"
      ],
      "code": "// linear search\nfor (int i = 0; i < n; i++)\n{\n    if (a[i] == target) return true;\n}\nreturn false;",
      "analogy": "在乱放的书架上找书只能一本本看；按书名排好后可以直接翻到中间判断。",
      "links": [
        {
          "week": 0,
          "text": "就是 Week 0 撕电话簿的算法"
        },
        {
          "week": 7,
          "text": "数据库建 index 的意义：避免对整张表做 linear search"
        }
      ],
      "quiz": [
        {
          "q": "Binary search 的最好情况是什么？",
          "a": "第一次就命中中间元素，Ω(1)。"
        },
        {
          "q": "什么时候宁愿用 linear search？",
          "a": "数据无序且只查一次，排序的成本不划算。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w3-03",
      "title": "Struct：自定义数据类型",
      "question": "一个人的姓名和电话怎么绑在一起？",
      "conclusion": "Struct 把多个相关字段打包成一个新类型，用点号访问字段。用 struct 数组代替多个平行数组，数据不会错位。",
      "points": [
        "typedef struct { ... } person; 定义新类型 person",
        "people[0].name、people[0].number 访问字段",
        "平行数组排序时容易只动一个，导致数据对不上"
      ],
      "code": "typedef struct\n{\n    string name;\n    string number;\n}\nperson;\n\nperson people[2];\npeople[0].name = \"David\";",
      "analogy": "一张名片把姓名和电话印在一起，而不是分别写在两张纸上。",
      "links": [
        {
          "week": 5,
          "text": "Linked list 的 node 就是含有 next 指针的 struct"
        },
        {
          "week": 7,
          "text": "Struct 数组相当于一张表，每个 struct 是一行"
        }
      ],
      "quiz": [
        {
          "q": "相比两个平行数组，struct 数组的好处是什么？",
          "a": "相关字段绑在一起，排序和传递时不会错位。"
        },
        {
          "q": "怎么访问 struct 的字段？",
          "a": "用点号，如 p.name。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w3-04",
      "title": "Selection sort 与 Bubble sort",
      "question": "最直观的排序算法有多慢？",
      "conclusion": "Selection sort 每轮找最小值放到前面；bubble sort 反复交换相邻的逆序对。两者最坏都是 O(n²)。Bubble sort 加上“本轮没交换就停止”，最好情况可达 Ω(n)。",
      "points": [
        "Selection sort：总比较次数约 n²/2，无论输入如何都是 Θ(n²)",
        "Bubble sort：已排好的数据只需扫一遍就能停",
        "n 翻倍，O(n²) 的耗时变成 4 倍"
      ],
      "analogy": "Selection 像每次从一堆扑克里挑最小的；bubble 像气泡，大的一步步浮到末尾。",
      "links": [
        {
          "week": 1,
          "text": "两层嵌套循环是 O(n²) 的典型信号"
        },
        {
          "week": 6,
          "text": "Python 的 sorted() 用的是 Timsort，O(n log n)"
        }
      ],
      "quiz": [
        {
          "q": "为什么 selection sort 的最好情况仍是 n²？",
          "a": "它每轮都要扫完剩余元素才能确认最小值，不会提前停止。"
        },
        {
          "q": "数据从 1000 增到 2000，O(n²) 算法耗时大约变几倍？",
          "a": "约 4 倍。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w3-05",
      "title": "Recursion：函数调用自己",
      "question": "递归的结构是什么？",
      "conclusion": "Recursive function 把问题拆成同类型的更小问题，调用自己去解决，直到 base case 直接返回。没有 base case 就会无限调用，最终 stack overflow。",
      "points": [
        "两个必备部分：base case 和 recursive case",
        "每次递归调用都必须让问题变小",
        "很多问题天然是递归的：金字塔、树、二分查找"
      ],
      "code": "void draw(int n)\n{\n    if (n <= 0) return;      // base case\n    draw(n - 1);             // 先画上面 n-1 层\n    for (int i = 0; i < n; i++) printf(\"#\");\n    printf(\"\\n\");\n}",
      "analogy": "俄罗斯套娃，一层层打开，直到最小那个打不开。",
      "links": [
        {
          "week": 4,
          "text": "每层递归是 stack 上的一个 frame，太深会 stack overflow"
        },
        {
          "week": 5,
          "text": "树的遍历和插入天然用递归实现"
        }
      ],
      "quiz": [
        {
          "q": "递归函数缺少 base case 会怎样？",
          "a": "无限调用自己，直到 stack 空间耗尽而崩溃。"
        },
        {
          "q": "递归的每一步必须满足什么？",
          "a": "问题规模变小，逐步逼近 base case。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w3-06",
      "title": "Merge sort：分治换速度",
      "question": "怎样把排序从 n² 降到 n log n？",
      "conclusion": "Merge sort 把数组一分为二，分别递归排序，再把两个有序半段合并。拆分有 log n 层，每层合并 n 次，总计 Θ(n log n)。代价是需要额外的内存。",
      "points": [
        "Base case：只有一个元素，天然有序",
        "Merge：两个有序列表各取头部较小者，依次放入",
        "比 O(n²) 快得多，但要额外空间存放合并结果",
        "体现了经典权衡：用空间换时间"
      ],
      "code": "Sort left half\nSort right half\nMerge sorted halves",
      "analogy": "两摞已经按大小排好的试卷，每次比较两摞最上面那张，小的先放。",
      "links": [
        {
          "week": 0,
          "text": "Divide and conquer 和撕电话簿是同一种思路"
        },
        {
          "week": 5,
          "text": "数据结构设计中反复出现时间和空间的权衡"
        }
      ],
      "quiz": [
        {
          "q": "Merge sort 为什么是 n log n？",
          "a": "共 log n 层拆分，每层合并的总工作量是 n。"
        },
        {
          "q": "Merge sort 相对 selection sort 付出了什么代价？",
          "a": "需要额外的内存空间。"
        }
      ],
      "minutes": 4
    }
  ]
};
