// 由 tools/cs50-json2deck.js 从 source/cs50-week4.json 生成，可直接手改。
module.exports = {
  "id": "cs50-w4",
  "type": "lesson",
  "tag": "CS50",
  "title": "CS50 · Week 4 Memory",
  "subtitle": "CS50x 2026",
  "desc": "Week 4 揭开了前几周的抽象：数据到底放在哪里，怎么找到它。后面的数据结构、Python、SQL、Web 都建立在这层之上。",
  "schema": "cs50-cards/v1",
  "course": "CS50x 2026",
  "week": 4,
  "weekTitle": "Memory",
  "source": "https://cs50.harvard.edu/x/weeks/4/",
  "license": "Based on CS50 by Harvard University, CC BY-NC-SA 4.0",
  "map": {
    "title": "这一周在全局里的位置",
    "summary": "Week 4 揭开了前几周的抽象：数据到底放在哪里，怎么找到它。后面的数据结构、Python、SQL、Web 都建立在这层之上。",
    "chain": [
      {
        "week": 2,
        "label": "Arrays",
        "note": "数据连续排列"
      },
      {
        "week": 4,
        "label": "Memory",
        "note": "地址、指针、堆与栈",
        "current": true
      },
      {
        "week": 5,
        "label": "Data Structures",
        "note": "用指针把零散内存连起来"
      },
      {
        "week": 6,
        "label": "Python",
        "note": "把指针和 free 藏起来"
      },
      {
        "week": 7,
        "label": "SQL",
        "note": "不校验输入同样会导致 SQL injection"
      }
    ]
  },
  "cards": [
    {
      "id": "w4-01",
      "title": "内存是一个巨大的字节数组",
      "question": "变量在机器里到底是什么？",
      "conclusion": "内存可以看成一排编了号的字节，这个编号就是 address。变量只是某段字节的名字。",
      "points": [
        "每个字节有唯一地址，习惯用 hexadecimal 表示，如 0x7ffd5c3a",
        "int 占 4 字节，char 占 1 字节，类型决定了从某个地址开始读几个字节、怎么解释",
        "& 取地址，printf 用 %p 打印地址"
      ],
      "code": "int n = 50;\nprintf(\"%p\\n\", &n);  // 0x7ffc...",
      "analogy": "一条很长的街，每个门牌号对应一个字节。",
      "links": [
        {
          "week": 2,
          "text": "数组访问是 O(1)：起始地址 + 下标 × 元素大小，直接算出位置"
        },
        {
          "week": 5,
          "text": "数组插入代价高，正是因为它要求连续的地址"
        }
      ],
      "quiz": [
        {
          "q": "为什么数组 a[i] 能在常数时间访问？",
          "a": "元素连续存放，地址 = 起始地址 + i × 元素大小，一次计算即可定位。"
        },
        {
          "q": "类型（int、char）在内存层面起什么作用？",
          "a": "决定读取多少字节，以及如何解释这些字节。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w4-02",
      "title": "Pointer：存地址的变量",
      "question": "指针解决了什么问题？",
      "conclusion": "Pointer 是一个值为地址的变量。有了它，程序可以间接访问数据，不必复制数据本身。",
      "points": [
        "int *p = &n; 声明 p 指向一个 int，并存入 n 的地址",
        "*p 是 dereference：去那个地址把值取出来",
        "64 位系统上指针本身占 8 字节，不管指向什么类型",
        "NULL 表示不指向任何地方，解引用 NULL 会崩溃"
      ],
      "code": "int n = 50;\nint *p = &n;\nprintf(\"%i\\n\", *p);  // 50",
      "analogy": "指针是写着门牌号的纸条，*p 是按纸条去敲门。",
      "links": [
        {
          "week": 5,
          "text": "链表每个节点里有一个 next 指针，把不连续的内存串起来"
        },
        {
          "week": 6,
          "text": "Python 变量本质上也是引用，只是不让你直接看到地址"
        }
      ],
      "quiz": [
        {
          "q": "& 和 * 分别做什么？",
          "a": "& 取变量的地址；* 用在声明里表示指针类型，用在表达式里表示按地址取值。"
        },
        {
          "q": "char * 和 int * 在 64 位机器上各占多少字节？",
          "a": "都是 8 字节，指针大小与指向的类型无关。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w4-03",
      "title": "string 其实是 char *",
      "question": "CS50 里的 string 背后是什么？",
      "conclusion": "string 是 CS50 库对 char * 的别名：一个指向首字符的地址，字符串靠末尾的 \\0 判断结束。",
      "points": [
        "\"HI!\" 在内存里是 H、I、!、\\0 四个字节",
        "s 只存 H 的地址，printf(\"%s\") 从这里一直读到 \\0",
        "s == t 比较的是两个地址，不是内容；比较内容要用 strcmp",
        "s[i] 等价于 *(s + i)，这就是 pointer arithmetic"
      ],
      "code": "char *s = \"HI!\";\nchar *t = \"HI!\";\nif (strcmp(s, t) == 0) { /* 内容相同 */ }",
      "analogy": "字符串变量不是整本书，只是书第一页的页码。",
      "links": [
        {
          "week": 1,
          "text": "Week 1 的 string 是训练轮，这里把它拆掉了"
        },
        {
          "week": 6,
          "text": "Python 的 == 比较内容，is 才比较是否同一个对象"
        }
      ],
      "quiz": [
        {
          "q": "两个内容相同的字符串，用 == 比较为什么可能是 false？",
          "a": "== 比较的是地址，两个字符串可能存放在不同位置。"
        },
        {
          "q": "s[2] 和 *(s + 2) 有区别吗？",
          "a": "没有，数组下标就是指针运算的语法糖。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w4-04",
      "title": "复制 vs 引用：malloc 与 free",
      "question": "t = s 为什么不算复制字符串？",
      "conclusion": "t = s 只复制了地址，两者指向同一块内存。真正复制要先 malloc 一块新内存，再把内容拷过去，用完 free。",
      "points": [
        "malloc(n) 向系统申请 n 字节，返回首地址；失败返回 NULL，必须检查",
        "复制字符串要申请 strlen(s) + 1 字节，多出的 1 留给 \\0",
        "malloc 的内存不会自动回收，忘记 free 就是 memory leak",
        "free 之后不要再使用那块内存"
      ],
      "code": "char *t = malloc(strlen(s) + 1);\nif (t == NULL) return 1;\nstrcpy(t, s);\n// ...\nfree(t);",
      "analogy": "t = s 是抄了一份门牌号；malloc + strcpy 是新盖一栋楼，再把家具搬过去。",
      "links": [
        {
          "week": 5,
          "text": "链表、树、哈希表的每个节点都是 malloc 出来的"
        },
        {
          "week": 6,
          "text": "Python 里 b = a 对 list 也是共享引用，要复制得用 a.copy()；回收交给 garbage collector"
        }
      ],
      "quiz": [
        {
          "q": "复制 \"HI!\" 需要 malloc 多少字节？",
          "a": "4 字节，3 个字符加 1 个 \\0。"
        },
        {
          "q": "为什么 malloc 之后要检查 NULL？",
          "a": "内存不足时 malloc 返回 NULL，直接使用会导致崩溃。"
        }
      ],
      "minutes": 4
    },
    {
      "id": "w4-05",
      "title": "Stack 与 Heap",
      "question": "为什么 swap(a, b) 换不了两个数？",
      "conclusion": "函数调用的局部变量放在 stack 上，参数是传值的副本。要在函数里改调用者的变量，必须传地址。malloc 的内存在 heap 上，生命周期由你控制。",
      "points": [
        "每次函数调用在 stack 上压一个 frame，返回时整块释放",
        "swap(int a, int b) 交换的是副本，调用者看不到变化",
        "swap(int *a, int *b) 通过地址修改原变量，才生效",
        "heap 与 stack 在内存中相向增长；递归太深会 stack overflow"
      ],
      "code": "void swap(int *a, int *b)\n{\n    int tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\nswap(&x, &y);",
      "analogy": "传值是给对方一份复印件，对方改了不影响原件；传地址是告诉对方原件放在哪。",
      "links": [
        {
          "week": 3,
          "text": "递归的每一层就是 stack 上的一个 frame，没有 base case 会把 stack 撑爆"
        },
        {
          "week": 6,
          "text": "Python 传参传的是对象引用：可变对象在函数里能被改动，重新赋值则不影响外面"
        }
      ],
      "quiz": [
        {
          "q": "函数返回后，它的局部变量去哪了？",
          "a": "所在的 stack frame 被释放，局部变量随之失效。"
        },
        {
          "q": "什么样的数据应该放在 heap 上？",
          "a": "需要在函数返回后继续存在，或大小在运行时才确定的数据。"
        }
      ],
      "minutes": 4
    },
    {
      "id": "w4-06",
      "title": "内存出错的四种方式",
      "question": "C 程序最常见的内存 bug 有哪些？",
      "conclusion": "Segfault、garbage value、memory leak、buffer overflow。C 不帮你检查边界，这些问题在高级语言里被运行时挡住了。",
      "points": [
        "Segmentation fault：访问了不属于你的内存，如解引用 NULL",
        "Garbage value：变量未初始化就使用，读到的是之前残留的数据",
        "Memory leak：malloc 了没 free，长时间运行的程序会越吃越多",
        "Buffer overflow：写入超过分配的长度，覆盖相邻内存",
        "valgrind 可以检测 leak 和非法读写"
      ],
      "code": "int *x = malloc(3 * sizeof(int));\nx[3] = 50;  // 越界：只有 x[0]..x[2]\n// 忘记 free(x) → leak",
      "analogy": "C 给你整栋楼的钥匙，但不拦你走进别人家。",
      "links": [
        {
          "week": 7,
          "text": "Buffer overflow 和 SQL injection 根源相同：没有约束不可信的输入"
        },
        {
          "week": 6,
          "text": "Python 越界会抛 IndexError，而不是悄悄写坏内存"
        }
      ],
      "quiz": [
        {
          "q": "x = malloc(3 * sizeof(int)) 后，x[3] = 50 有什么问题？",
          "a": "越界写入，合法下标只有 0 到 2，属于 buffer overflow。"
        },
        {
          "q": "哪个工具能帮你找到 memory leak？",
          "a": "valgrind。"
        }
      ],
      "minutes": 4
    },
    {
      "id": "w4-07",
      "title": "File I/O：一切都是字节",
      "question": "程序怎么读写文件和图片？",
      "conclusion": "文件就是磁盘上的一串字节。fopen 拿到一个 FILE *，再用 fread、fwrite 按字节搬运。图片也只是按约定格式排列的字节。",
      "points": [
        "FILE *f = fopen(\"x.csv\", \"r\") 打开文件，失败返回 NULL，用完 fclose",
        "fread(buffer, size, count, f) 从文件读入内存，fwrite 反向",
        "BMP 图片 = header + 像素网格，每个像素 3 字节 RGB",
        "很多格式靠开头几个字节识别，JPEG 以 0xff 0xd8 0xff 开头"
      ],
      "code": "typedef uint8_t BYTE;\nBYTE b;\nwhile (fread(&b, sizeof(b), 1, src) != 0)\n{\n    fwrite(&b, sizeof(b), 1, dst);\n}",
      "analogy": "文件是硬盘上的一段连续街道，fread 是把一段搬进内存这条街。",
      "links": [
        {
          "week": 0,
          "text": "Week 0 说过一切皆二进制，这里落到了具体的文件格式"
        },
        {
          "week": 9,
          "text": "Web 服务器发送图片，本质上也是把文件字节写进网络响应"
        }
      ],
      "quiz": [
        {
          "q": "fopen 失败会返回什么？",
          "a": "NULL，所以打开后要检查。"
        },
        {
          "q": "24-bit BMP 里一个像素占几个字节？",
          "a": "3 个字节，分别是 R、G、B（BMP 实际存储顺序为 B、G、R）。"
        }
      ],
      "minutes": 3
    }
  ]
};
