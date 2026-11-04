// 由 tools/cs50-json2deck.js 从 source/cs50-week7.json 生成，可直接手改。
module.exports = {
  "id": "cs50-w7",
  "type": "lesson",
  "tag": "CS50",
  "title": "CS50 · Week 7 SQL",
  "subtitle": "CS50x 2026",
  "desc": "Week 7 从“怎么做”转向“要什么”。SQL 是声明式语言：你描述想要的数据，数据库自己决定怎么查。前几周学的搜索、数据结构，都藏在数据库引擎里。",
  "schema": "cs50-cards/v1",
  "course": "CS50x 2026",
  "week": 7,
  "weekTitle": "SQL",
  "source": "https://cs50.harvard.edu/x/weeks/7/",
  "license": "Based on CS50 by Harvard University, CC BY-NC-SA 4.0",
  "map": {
    "title": "这一周在全局里的位置",
    "summary": "Week 7 从“怎么做”转向“要什么”。SQL 是声明式语言：你描述想要的数据，数据库自己决定怎么查。前几周学的搜索、数据结构，都藏在数据库引擎里。",
    "chain": [
      {
        "week": 3,
        "label": "Algorithms",
        "note": "linear search vs binary search"
      },
      {
        "week": 5,
        "label": "Data Structures",
        "note": "索引背后的树"
      },
      {
        "week": 6,
        "label": "Python",
        "note": "处理 CSV 的局限"
      },
      {
        "week": 7,
        "label": "SQL",
        "note": "关系型数据库、JOIN、索引",
        "current": true
      },
      {
        "week": 9,
        "label": "Flask",
        "note": "Web 应用的数据层"
      }
    ]
  },
  "cards": [
    {
      "id": "w7-01",
      "title": "从 flat-file 到 relational database",
      "question": "CSV 有什么不够用的？",
      "conclusion": "CSV 是 flat-file database，每次统计都要写代码逐行读。Relational database 把数据存成表，用 SQL 一句话就能查询、统计、排序，而且查询速度可以靠索引优化。",
      "points": [
        "CSV：逗号分隔的纯文本，简单但没有结构约束",
        "关系型数据库：表（table）由行（row）和列（column）组成",
        "SQLite 是一个文件形式的轻量数据库",
        "每列有类型：INTEGER、NUMERIC、REAL、TEXT、BLOB"
      ],
      "analogy": "CSV 像一沓散装的纸质表格，数据库像带检索系统的档案室。",
      "links": [
        {
          "week": 6,
          "text": "Week 6 已经用 Python 的 csv 模块写过 CSV 文件"
        },
        {
          "week": 4,
          "text": "读写 CSV 用的就是 Week 4 的 File I/O，当时的例子正是 phonebook.csv"
        }
      ],
      "quiz": [
        {
          "q": "flat-file database 的主要缺点是什么？",
          "a": "每次查询都要自己写代码逐行处理，数据量大时效率低。"
        },
        {
          "q": "SQLite 的数据存在哪里？",
          "a": "一个本地文件里。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w7-02",
      "title": "SQL 基本操作：CRUD",
      "question": "SQL 能对数据做什么？",
      "conclusion": "四种操作：Create（CREATE、INSERT）、Read（SELECT）、Update（UPDATE）、Delete（DELETE、DROP）。SELECT 配合 WHERE、GROUP BY、ORDER BY、LIMIT，能完成大部分查询。",
      "points": [
        "SELECT 列 FROM 表 WHERE 条件",
        "COUNT、AVG、MAX 等聚合函数",
        "GROUP BY 分组统计，ORDER BY 排序",
        "DELETE 和 UPDATE 忘写 WHERE 会作用于整张表"
      ],
      "code": "SELECT language, COUNT(*) AS n\nFROM favorites\nGROUP BY language\nORDER BY n DESC\nLIMIT 1;",
      "analogy": "SQL 像对图书管理员下指令，你说要什么，不用告诉他书在哪个架子。",
      "links": [
        {
          "week": 0,
          "text": "依然是 input → algorithm → output，只是 algorithm 交给了数据库"
        }
      ],
      "quiz": [
        {
          "q": "DELETE FROM users; 会发生什么？",
          "a": "删除 users 表里的所有行。"
        },
        {
          "q": "统计每种语言有多少人喜欢，用什么子句？",
          "a": "GROUP BY language 配合 COUNT(*)。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w7-03",
      "title": "多张表与 primary / foreign key",
      "question": "为什么要把数据拆成多张表？",
      "conclusion": "把重复信息拆出去，每张表只描述一类事物。Primary key 唯一标识一行，foreign key 引用另一张表的 primary key，表之间靠它关联。",
      "points": [
        "例子：shows 表和 people 表，用 stars 表记录谁演了什么",
        "避免重复存储，修改时只改一处",
        "一对多、多对多关系都靠 key 表达",
        "id 通常是自增的 INTEGER"
      ],
      "code": "CREATE TABLE stars (\n    show_id INTEGER,\n    person_id INTEGER,\n    FOREIGN KEY(show_id) REFERENCES shows(id),\n    FOREIGN KEY(person_id) REFERENCES people(id)\n);",
      "analogy": "学号是 primary key，选课表里引用学号就是 foreign key。",
      "links": [
        {
          "week": 4,
          "text": "Foreign key 像指针，指向另一张表里的一行"
        },
        {
          "week": 3,
          "text": "拆表的思路和 struct 打包相关字段相似"
        }
      ],
      "quiz": [
        {
          "q": "Primary key 有什么要求？",
          "a": "在表内唯一，能标识每一行。"
        },
        {
          "q": "多对多关系通常怎么表示？",
          "a": "用一张中间表，存两边的 foreign key。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w7-04",
      "title": "JOIN 与 index",
      "question": "跨表查询怎么做，怎么让它变快？",
      "conclusion": "JOIN 按 key 把多张表拼成一张临时表再查询。CREATE INDEX 给某列建索引，底层常用 B-tree，让查找从扫描全表的 O(n) 降到约 O(log n)，代价是更多空间和更慢的写入。",
      "points": [
        "JOIN ... ON a.id = b.a_id 指定关联条件",
        "也可以用嵌套 SELECT 分步查询",
        "Primary key 通常自动带索引",
        "索引越多，INSERT 和 UPDATE 越慢"
      ],
      "code": "CREATE INDEX title_index ON shows (title);\n\nSELECT title FROM shows\nJOIN stars ON shows.id = stars.show_id\nJOIN people ON stars.person_id = people.id\nWHERE name = 'Steve Carell';",
      "analogy": "Index 像书末的关键词索引，不用从第一页翻起。",
      "links": [
        {
          "week": 3,
          "text": "没有索引就是 linear search，有索引接近 binary search"
        },
        {
          "week": 5,
          "text": "B-tree 是 Week 5 二叉搜索树的多叉、平衡版"
        }
      ],
      "quiz": [
        {
          "q": "为什么不给每一列都建索引？",
          "a": "占用额外空间，并且每次写入都要更新索引，变慢。"
        },
        {
          "q": "建索引前后，按 title 查找的复杂度大约怎么变？",
          "a": "从 O(n) 变为约 O(log n)。"
        }
      ],
      "minutes": 4
    },
    {
      "id": "w7-05",
      "title": "SQL injection",
      "question": "把用户输入拼进 SQL 有什么危险？",
      "conclusion": "如果直接把用户输入拼接进 SQL 字符串，攻击者可以输入一段 SQL 改变查询的含义，比如绕过密码检查。解决办法是用 placeholder（?），让库负责转义。",
      "points": [
        "输入 admin'-- 可以把后面的密码条件注释掉",
        "永远不要用 f-string 或字符串拼接构造 SQL",
        "用 ? placeholder，由数据库库处理转义"
      ],
      "code": "# 危险\ndb.execute(f\"SELECT * FROM users WHERE username = '{username}'\")\n\n# 安全\ndb.execute(\"SELECT * FROM users WHERE username = ?\", username)",
      "analogy": "让陌生人填表时，只让他填空格，不让他改表格上印好的字。",
      "links": [
        {
          "week": 4,
          "text": "和 buffer overflow 同一个根源：没有约束不可信的输入"
        },
        {
          "week": 9,
          "text": "Flask 应用处理表单时必须用 placeholder"
        }
      ],
      "quiz": [
        {
          "q": "SQL injection 的根本原因是什么？",
          "a": "把用户输入当作 SQL 代码的一部分执行了。"
        },
        {
          "q": "防御 SQL injection 的标准做法是什么？",
          "a": "使用参数化查询（placeholder ?）。"
        }
      ],
      "minutes": 3
    },
    {
      "id": "w7-06",
      "title": "Race condition 与 transaction",
      "question": "两个人同时点赞，计数会出错吗？",
      "conclusion": "会。两个请求同时读到 likes = 10，各自加 1 后写回 11，丢了一次。Transaction 把“读、改、写”打包成不可分割的一步（BEGIN TRANSACTION 到 COMMIT），中间不会被打断。",
      "points": [
        "Race condition：结果取决于多个操作的执行时序",
        "Transaction 保证一组操作要么全部成功，要么全部不做",
        "高并发系统（社交、支付）必须考虑这个问题"
      ],
      "code": "BEGIN TRANSACTION;\nSELECT likes FROM posts WHERE id = 1;\nUPDATE posts SET likes = likes + 1 WHERE id = 1;\nCOMMIT;",
      "analogy": "两个人同时从冰箱拿最后一瓶牛奶，都以为家里还有，结果都没再买。",
      "links": [],
      "quiz": [
        {
          "q": "什么是 race condition？",
          "a": "多个操作并发执行，结果依赖于它们的执行先后，可能出错。"
        },
        {
          "q": "Transaction 解决了什么问题？",
          "a": "让一组操作原子化执行，避免中途被其他操作打断。"
        }
      ],
      "minutes": 3
    }
  ]
};
