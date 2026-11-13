// 由 source/ta-kit-glossary.html 转换，可直接手改。
// terms: [分类序号, 中文, English, 中文释义, { abbr, noteEn, why, whyEn }]
// qa: [[分组, [[问题, Question, 为什么问, 好的回答, 警惕信号], ...]], ...]
module.exports = {
  id: 'ta-kit',
  type: 'glossary',
  tag: '术语 + 问答',
  title: '具身采集 Kit 术语与问答',
  subtitle: 'Project TA · CTO technical sync prep',
  desc: '围绕 Thoth 第一人称采集设备（headset + 云台双目 + AR 眼镜 + 腰部计算单元），术语 + CTO 问答准备。',
  whyLabel: '对 Thoth 的意义',
  qaLabel: 'CTO 问答',
  qaNote: '姿态建议：以“帮你把原型变成可以批量交付的产品”为出发点，用提问代替评判。每题展开后有三部分：为什么问、好的回答通常包含什么、需要警惕的信号。',
  cats: [
    ["数据路线","Data routes"],
    ["成像","Imaging"],
    ["标定与位姿","Calibration"],
    ["手部与动作","Hands & action"],
    ["物体与场景","Objects & scene"],
    ["仿真","Simulation"],
    ["硬件与量产","Hardware & production"],
    ["交付与质量","Delivery & QA"]
  ],
  terms: [
    [0,"第一人称数据","Egocentric data","采集者头戴相机，从自己眼睛的视角记录双手完成任务的视频。",{"noteEn":"A collector wears a camera and records, from their own eye level, both hands doing a task.","why":"Thoth 的核心路线：成本低、易规模化，适合用他们的人力网络在多国铺开。","whyEn":"Thoth's core route: low cost and easy to scale across countries with their workforce."}],
    [0,"遥操作","Teleoperation","人通过手柄、VR 或主从臂直接操控真实机器人完成任务，记录下机器人自己的观测和动作。",{"abbr":"teleop","noteEn":"A person drives a real robot through a controller, VR or a leader arm, recording the robot's own observations and actions.","why":"数据质量最高但最贵。deck 第 14 页闭环的最后一步就是遥操作收尾。","whyEn":"Highest quality but most expensive. Slide 14's loop ends with teleop."}],
    [0,"手持通用操作采集器","UMI (Universal Manipulation Interface)","人手持一个与机器人夹爪结构相同的工具来操作，同时记录腕部视角和夹爪开合。",{"abbr":"UMI","noteEn":"A handheld tool shaped like the robot's gripper; it records the wrist view and gripper opening while a person operates it.","why":"动作空间与夹爪机器人天然对齐，是 Ego 路线的直接竞争方案。","whyEn":"Action space matches gripper robots by design; a direct alternative to the Ego route."}],
    [0,"本体差异","Embodiment gap","人和机器人在身体结构、手的形态、视角高度上的差别，导致人类数据不能直接用于机器人。",{"noteEn":"Differences between human and robot bodies, hand shapes and camera height, so human data cannot be used on robots as is.","why":"买方最关心的问题之一，决定 Ego 数据的实际价值。","whyEn":"One of buyers' top concerns; it sets the real value of Ego data."}],
    [0,"观测 / 动作","Observation / Action","机器人学习的一对基本数据：在某个时刻看到了什么（图像、状态），以及做了什么动作。",{"abbr":"obs / act","noteEn":"The basic data pair for robot learning: what was seen at a moment (images, state) and what action was taken.","why":"Ego 视频天然只有 observation，action 需要从手部姿态推算。","whyEn":"Ego video only gives observations; actions must be inferred from hand pose."}],
    [0,"策略模型","Policy","输入观测、输出动作的模型，就是机器人最终运行的“大脑”。",{"noteEn":"The model that maps observations to actions; the 'brain' the robot runs.","why":"deck 里“task and robot in, trained policy out”指的就是训练这个。","whyEn":"'Task and robot in, trained policy out' in the deck means training this."}],
    [0,"视觉语言动作模型","VLA (Vision-Language-Action)","同时理解图像和语言指令并直接输出机器人动作的大模型，是当前具身智能主流方向。",{"abbr":"VLA","noteEn":"Large models that read images and language instructions and output robot actions directly; the mainstream direction in embodied AI.","why":"VLA 预训练需要海量、多样的数据，是 Ego 数据的主要买方需求来源。","whyEn":"VLA pretraining needs huge, diverse data, the main source of demand for Ego data."}],
    [0,"模仿学习 / 行为克隆","Imitation learning / Behavior cloning","让模型学习复现示范者的动作，是使用人类示范数据训练机器人的基本方法。",{"abbr":"BC","noteEn":"Training a model to reproduce a demonstrator's actions; the basic way to train robots from human demos.","why":"数据中示范是否一致、是否有犹豫和错误动作，直接影响学习效果。","whyEn":"Consistency of demos, hesitation and mistakes directly affect learning results."}],
    [0,"采集片段","Episode / Take","一次完整任务从开始到结束的录制单位，通常是数据计价和质检的基本单位。",{"noteEn":"One recording of a full task from start to end; usually the unit for pricing and QA.","why":"问清楚按 episode 计价还是按有效小时计价。","whyEn":"Ask whether pricing is per episode or per usable hour."}],
    [1,"曝光时间","Exposure time","传感器每帧接收光线的时长。越短，运动模糊越小，画面越暗。",{"noteEn":"How long the sensor collects light per frame. Shorter means less motion blur and a darker image.","why":"deck 从 16.7 ms 降到 4 ms，清晰度提升 2.7 倍。","whyEn":"The deck cut it from 16.7 ms to 4 ms for 2.7x sharper hands."}],
    [1,"增益","Gain / ISO","对传感器信号的放大倍数，用来补偿短曝光造成的亮度不足，代价是噪点增加。",{"noteEn":"Amplification of the sensor signal to make up for short exposure; the cost is more noise.","why":"短曝光 + 自动增益是他们的方案，需关注暗光场景的噪点。","whyEn":"Their fix is short exposure plus auto gain; watch noise in low light."}],
    [1,"运动模糊","Motion blur","物体在曝光期间移动导致的拖影。手部动作快，最容易出现。",{"noteEn":"Smearing caused by movement during exposure. Fast hands are the most affected.","why":"模糊会让手部关键点估计失败，是废片的主因之一。","whyEn":"Blur breaks hand keypoint detection and is a top cause of bad takes."}],
    [1,"卷帘快门","Rolling shutter","传感器逐行依次曝光。快速运动时画面会倾斜、扭曲（果冻效应）。",{"noteEn":"The sensor exposes row by row; fast motion makes the image skew (jello effect).","why":"便宜常见，但对快速手部动作和 3D 重建不友好。","whyEn":"Cheap and common, but poor for fast hand motion and 3D reconstruction."}],
    [1,"全局快门","Global shutter","整个传感器同一时刻曝光，快速运动不变形。",{"noteEn":"The whole sensor exposes at the same instant, so fast motion stays undistorted.","why":"更适合采集手部操作，成本更高、像素通常更低。","whyEn":"Better for hand manipulation; costs more and usually has lower resolution."}],
    [1,"动态范围 / 过曝裁切","Dynamic range / Clipping","传感器能同时记录亮部和暗部的能力。超出上限的像素变成纯白，即 clipped。",{"abbr":"HDR","noteEn":"How much bright and dark detail a sensor can hold at once. Pixels above the limit turn pure white (clipped).","why":"deck 里 clipped 比例从 10.96% 降到 4.90%。窗边、灯下场景是难点。","whyEn":"The deck reports clipped pixels falling from 10.96% to 4.90%. Windows and lamps are hard cases."}],
    [1,"视场角 / 鱼眼镜头","FOV / Fisheye","相机能看到的角度范围。鱼眼镜头 FOV 可达 150° 以上，但边缘畸变大。",{"abbr":"FOV","noteEn":"The angle a camera can see. Fisheye lenses exceed 150° but distort heavily at the edges.","why":"云台追手的替代方案：用固定大 FOV 镜头保证手不出画。","whyEn":"Alternative to gimbal tracking: a fixed wide FOV keeps hands in frame."}],
    [1,"双目相机 / 基线","Stereo camera / Baseline","两个相机并排拍摄，通过视差计算深度。两镜头间距叫基线，基线越大远处深度越准。",{"noteEn":"Two side-by-side cameras compute depth from disparity. The spacing is the baseline; a wider baseline gives better depth far away.","why":"手部操作在 0.3 到 0.8 米，基线需要针对近距离优化。","whyEn":"Hand work happens at 0.3 to 0.8 m, so the baseline must suit close range."}],
    [1,"丢帧","Frame drop","录制过程中部分帧没有被保存，时间序列出现断档。",{"noteEn":"Some frames are not saved during recording, leaving gaps in the time series.","why":"丢帧会破坏动作的连续性，deck 用两台计算单元 + 有线链路解决。","whyEn":"Gaps break motion continuity; the deck uses two computers and a wired link."}],
    [1,"车规串行链路 / 相机接口","GMSL / MIPI CSI-2","MIPI CSI-2 是相机到处理器的标准接口；GMSL 用同轴线把它延长到数米，带宽稳定、抗干扰。",{"abbr":"GMSL","noteEn":"MIPI CSI-2 is the standard camera-to-processor interface; GMSL extends it over meters of coax with stable bandwidth and noise immunity.","why":"deck 说“wired camera link, not USB”，大概率是这一类，代价是头到腰的线缆。","whyEn":"'Wired camera link, not USB' likely means this; the cost is the head-to-hip cable."}],
    [2,"内参","Intrinsics","相机自身的焦距、主点、畸变系数，描述 3D 点如何投影到图像上。",{"abbr":"K","noteEn":"The camera's own focal length, principal point and distortion; how 3D points project onto the image.","why":"每台设备出厂需标定，量产时要有自动化标定工位。","whyEn":"Every unit needs factory calibration, so production needs an automated station."}],
    [2,"外参","Extrinsics","相机相对于另一个参考系（另一个相机、IMU、头部）的旋转和平移。",{"abbr":"[R|t]","noteEn":"Rotation and translation of a camera relative to another frame (another camera, the IMU, the head).","why":"云台让外参随时间变化，这是精度风险的核心来源。","whyEn":"The gimbal makes extrinsics change over time, the core accuracy risk."}],
    [2,"手眼标定","Hand-eye calibration","求解相机与运动机构（机械臂、云台）之间固定安装关系的标定方法。",{"noteEn":"Solving the fixed mounting relation between a camera and a moving mechanism (robot arm, gimbal).","why":"带云台的设备需要做这一步，而且要能在产线批量完成。","whyEn":"A gimbal device needs this, and it must work in batch on the line."}],
    [2,"时间同步","Time synchronization","让相机、IMU、编码器等多个传感器的数据时间戳对齐。硬件触发比软件时间戳更精确。",{"abbr":"sync","noteEn":"Aligning timestamps across camera, IMU, encoders and other sensors. Hardware triggers beat software timestamps.","why":"手速 1 m/s 时，5 ms 不同步就是 5 mm 误差。","whyEn":"At 1 m/s hand speed, 5 ms of skew is 5 mm of error."}],
    [2,"硬件触发 / 精确时间协议","Hardware trigger / PTP","用电信号同时触发多个传感器采集，或用 PTP 协议在网络上对齐时钟到微秒级。",{"abbr":"PTP","noteEn":"An electrical signal fires several sensors together, or PTP aligns clocks over a network to microseconds.","why":"问云台角度和图像是否用硬件信号对齐。","whyEn":"Ask whether gimbal angles and images are aligned by a hardware signal."}],
    [2,"同步定位与建图 / 视觉惯性里程计","SLAM / VIO","通过相机和 IMU 实时估计设备在空间中的位置和朝向。",{"abbr":"VIO","noteEn":"Real-time estimation of the device's position and orientation from camera and IMU.","why":"要把手放到世界坐标系里，必须先知道头在哪里。","whyEn":"To place hands in world coordinates you must first know where the head is."}],
    [2,"惯性测量单元","IMU","测量加速度和角速度的传感器，用来估计运动和朝向。",{"abbr":"IMU","noteEn":"A sensor measuring acceleration and angular rate, used to estimate motion and orientation.","why":"IMU 与相机的外参和时间偏移都需要标定。","whyEn":"IMU-camera extrinsics and time offset both need calibration."}],
    [2,"编码器 / 机械回差","Encoder / Backlash","编码器读取电机转角；回差是齿轮换向时的空转间隙，会让读数和实际角度不一致。",{"noteEn":"The encoder reads motor angle; backlash is the play in gears when direction reverses, so readings differ from the real angle.","why":"云台精度的关键：编码器分辨率和回差决定外参误差。","whyEn":"Key to gimbal accuracy: encoder resolution and backlash set the extrinsic error."}],
    [2,"云台 / 水平俯仰机构","Gimbal / Pan-tilt","可以水平（pan）和俯仰（tilt）转动相机的机构。",{"noteEn":"A mechanism that rotates the camera horizontally (pan) and vertically (tilt).","why":"Thoth 的差异化设计，也是主要工程风险。","whyEn":"Thoth's differentiating design and its main engineering risk."}],
    [2,"坐标变换链","Transform chain","多个坐标系之间的变换依次相乘，例如 世界→头→云台→相机→手。",{"abbr":"TF","noteEn":"Chaining transforms between frames, e.g. world to head to gimbal to camera to hand.","why":"链上任何一环有误差都会传到最终的手部 3D 位置。","whyEn":"Error at any link carries into the final 3D hand position."}],
    [3,"手部姿态估计","Hand pose estimation","从图像中估计手的关节位置，常用 21 个关键点表示一只手。",{"noteEn":"Estimating hand joint positions from images, commonly 21 keypoints per hand.","why":"3D 手部数据是 Ego 数据的核心产出，精度如何验证要问清楚。","whyEn":"3D hands are the core Ego output; ask how accuracy is validated."}],
    [3,"参数化手部模型","MANO","学术界标准的手部 3D 模型，用少量参数描述手的形状和姿态。",{"abbr":"MANO","noteEn":"The standard parametric 3D hand model in research; a few parameters describe hand shape and pose.","why":"交付格式是否支持 MANO 参数，是数据兼容性问题。","whyEn":"Whether delivery supports MANO parameters is a compatibility question."}],
    [3,"动作重定向","Retargeting","把人手的动作映射到形态不同的机器人手上。",{"noteEn":"Mapping human hand motion onto a robot hand with a different shape.","why":"人手 20 多个自由度，夹爪可能只有 1 个，映射会丢信息。","whyEn":"A human hand has 20+ DoF, a gripper may have 1; mapping loses information."}],
    [3,"自由度","DoF (Degrees of Freedom)","一个系统可以独立运动的维度数量。",{"abbr":"DoF","noteEn":"The number of independent ways a system can move.","why":"描述机器人手、物体位姿时都会用到。","whyEn":"Used for robot hands and object poses alike."}],
    [3,"灵巧手 vs 平行夹爪","Dexterous hand vs Parallel gripper","灵巧手模仿人手有多个手指关节；平行夹爪只有开合一个动作。",{"noteEn":"A dexterous hand imitates human fingers with many joints; a parallel gripper only opens and closes.","why":"目标客户用哪一种，决定 Ego 数据和 retargeting 的难度。","whyEn":"The customer's hand type sets how hard Ego data and retargeting are."}],
    [3,"遮挡","Occlusion","手指被物体、另一只手或手掌自身挡住，相机看不到。",{"noteEn":"Fingers hidden by objects, the other hand or the palm itself.","why":"遮挡时姿态估计不准，deck 用实时检测来标记。","whyEn":"Pose estimates are poor under occlusion; the deck flags it live."}],
    [3,"数据手套 / 触觉传感器","Data glove / Tactile sensor","手套直接测量手指弯曲角度；触觉传感器测量接触和压力。",{"noteEn":"A glove measures finger bend directly; tactile sensors measure contact and pressure.","why":"补充视觉缺失的 action 和力信息，是 v2 是否要加的关键决策。","whyEn":"Adds the action and force data vision misses; a key v2 decision."}],
    [3,"力/力矩传感器","Force/Torque sensor","测量接触力和扭矩的传感器。",{"abbr":"F/T","noteEn":"A sensor that measures contact force and torque.","why":"纯视频看不出“捏鸡蛋”和“捏石头”的差别。","whyEn":"Pure video cannot tell pinching an egg from pinching a rock."}],
    [3,"腕部相机","Wrist camera","安装在手腕上、近距离拍摄手与物体接触的相机。",{"noteEn":"A camera on the wrist filming hand-object contact up close.","why":"机器人多数有腕部相机，加上它可以缩小视角差异。","whyEn":"Most robots have wrist cameras; adding one narrows the viewpoint gap."}],
    [4,"六自由度位姿","6-DoF pose","物体在空间中的完整位置：3 个平移加 3 个旋转。",{"abbr":"6-DoF","noteEn":"An object's full pose in space: 3 translations plus 3 rotations.","why":"deck 第 11 页的物体追踪输出。","whyEn":"The object tracking output on slide 11."}],
    [4,"网格模型 / 三维扫描","Mesh / 3D scanning","用扫描仪或多角度照片（photogrammetry）重建物体的 3D 表面模型。",{"noteEn":"Reconstructing an object's 3D surface with a scanner or multi-view photos (photogrammetry).","why":"每个新物体都要扫描，是规模化成本瓶颈。","whyEn":"Every new object needs a scan, the bottleneck for scale."}],
    [4,"基于模型的位姿追踪","Model-based tracking","已知物体 3D 模型，在视频中逐帧匹配求出物体位姿。FoundationPose 是代表性方法。",{"noteEn":"With a known 3D model, matching the object frame by frame to get its pose. FoundationPose is a well-known method.","why":"精度高，依赖事先扫描。","whyEn":"Accurate, but depends on scanning first."}],
    [4,"分割掩码","Segmentation mask","逐像素标出某个物体或手的区域。SAM 系列是常用工具。",{"abbr":"mask","noteEn":"Per-pixel labeling of an object or hand region. The SAM family is a common tool.","why":"标注公司的强项，可大量自动化后人工校验。","whyEn":"A labeling company strength: heavy automation with human checks."}],
    [4,"点云 / 深度图","Point cloud / Depth map","深度图记录每个像素到相机的距离；点云是对应的 3D 点集合。",{"noteEn":"A depth map stores each pixel's distance to the camera; a point cloud is the matching set of 3D points.","why":"双目或 ToF 生成，质量受纹理和光照影响。","whyEn":"From stereo or ToF; quality depends on texture and lighting."}],
    [4,"边界框","Bounding box","包围物体的矩形框，最基础的检测标注。",{"abbr":"bbox","noteEn":"A rectangle around an object; the most basic detection label.","why":"deck 六层输出之一。","whyEn":"One of the six output layers in the deck."}],
    [5,"真实到仿真","Real2Sim","把真实场景和物体重建进仿真环境。",{"noteEn":"Rebuilding real scenes and objects inside simulation.","why":"deck 卖点：每段录制都配一个对应的仿真场景。","whyEn":"Deck selling point: every recording comes with a matching sim scene."}],
    [5,"仿真与现实差距","Sim2Real gap","在仿真里训练好的模型在真实世界表现下降的现象。",{"noteEn":"Performance drop when a sim-trained model runs in the real world.","why":"闭环最后需要真机遥操作，就是为了弥补这个差距。","whyEn":"The loop ends with real-robot teleop to close this gap."}],
    [5,"通用场景描述格式 / NVIDIA 仿真平台","USD / Isaac Sim","USD 是 Pixar 发起的 3D 场景格式，NVIDIA Isaac Sim 以它为基础，是机器人仿真主流。",{"abbr":"USD","noteEn":"USD is the 3D scene format started by Pixar; NVIDIA Isaac Sim builds on it and is mainstream in robot simulation.","why":"Thoth 的场景库用 USD 交付，与 NVIDIA 生态兼容。","whyEn":"Thoth's scene library ships in USD, compatible with NVIDIA's stack."}],
    [5,"域随机化","Domain randomization","在仿真中随机改变光照、材质、位置，让模型对变化更鲁棒。",{"noteEn":"Randomizing lighting, materials and placement in sim so models handle variation better.","why":"训练闭环中常用的配套手段。","whyEn":"A common companion technique in the training loop."}],
    [5,"基准测试 / 评估","Benchmark / Evaluation","用固定任务和指标衡量模型表现，例如任务成功率。",{"abbr":"eval","noteEn":"Measuring a model on fixed tasks and metrics, such as task success rate.","why":"“find where your model fails”服务的基础。","whyEn":"Basis of the 'find where your model fails' service."}],
    [6,"物料清单","BOM (Bill of Materials)","产品所有零部件、数量和成本的清单。",{"abbr":"BOM","noteEn":"The list of every part, its quantity and cost.","why":"你最直接能贡献的地方：v2 BOM 与 cost-down。","whyEn":"Your most direct contribution: v2 BOM and cost-down."}],
    [6,"工程验证 / 设计验证 / 生产验证","EVT / DVT / PVT","硬件开发三阶段：功能是否实现、设计是否满足所有规格、产线能否稳定量产。",{"abbr":"EVT","noteEn":"Three hardware stages: does it work, does the design meet all specs, can the line build it reliably.","why":"判断 kit 现在处于哪个阶段，deck 看起来在 EVT 前后。","whyEn":"Find out which stage the kit is in; the deck looks around EVT."}],
    [6,"原始设计制造商 / 电子制造服务商","ODM / EMS","ODM 可以参与设计并制造；EMS 按你的设计代工组装。",{"noteEn":"An ODM can co-design and manufacture; an EMS builds to your design.","why":"深圳供应商选型的基本分类。","whyEn":"The basic split for choosing Shenzhen suppliers."}],
    [6,"可制造性设计 / 可装配性设计","DFM / DFA","在设计阶段就考虑如何便宜、稳定地制造和组装。",{"abbr":"DFM","noteEn":"Designing early for cheap, reliable manufacturing and assembly.","why":"原型转量产最常见的返工来源。","whyEn":"The most common source of rework from prototype to production."}],
    [6,"散热设计 / 降频","Thermal design / Throttling","计算单元发热过高时会自动降频，导致处理能力下降甚至丢帧。",{"noteEn":"Compute units slow down when too hot, cutting processing power or dropping frames.","why":"背心贴身、东南亚高温，腰部双计算单元的散热要实测。","whyEn":"Body-worn vest plus Southeast Asian heat: test hip compute thermals."}],
    [6,"人机工程 / 重心","Ergonomics / Center of gravity","设备重量、重心位置、佩戴压力分布对使用者舒适度和疲劳的影响。",{"noteEn":"How weight, center of gravity and pressure distribution affect comfort and fatigue.","why":"决定采集员一天能有效工作几小时，即数据单位成本。","whyEn":"Sets how many hours a collector works effectively, i.e. data unit cost."}],
    [6,"锂电运输认证 / 美国无线认证 / 欧盟认证","UN38.3 / FCC / CE","UN38.3 是锂电池运输必需；FCC、CE 是进入美、欧市场的电磁兼容与无线认证。",{"noteEn":"UN38.3 is required to ship lithium batteries; FCC and CE cover EMC and radio for the US and EU.","why":"kit 要跨国运到多个交付基地，电池运输认证是硬门槛。","whyEn":"Kits ship to many delivery sites, so battery transport certification is a hard gate."}],
    [6,"线缆弯折寿命 / 应力释放","Cable flex life / Strain relief","线缆反复弯折到断裂的次数；接口处的护套设计用来分散应力。",{"noteEn":"How many bends a cable survives; boots at the connector spread the stress.","why":"头到腰的线缆每天弯折数千次，是现场故障高发点。","whyEn":"The head-to-hip cable bends thousands of times a day, a common field failure."}],
    [6,"产线终检","End-of-line test (EOL)","每台设备出厂前的功能和标定检测。",{"abbr":"EOL","noteEn":"Functional and calibration checks on every unit before it ships.","why":"标定若不能在 EOL 自动完成，量产就无法扩大。","whyEn":"If calibration cannot run automatically at EOL, volume cannot scale."}],
    [6,"平均无故障时间 / 返修","MTBF / RMA","MTBF 衡量可靠性；RMA 是返修流程。",{"abbr":"MTBF","noteEn":"MTBF measures reliability; RMA is the repair and return process.","why":"多国部署后，备件和返修周期直接影响产能。","whyEn":"With multi-country deployment, spares and repair time drive capacity."}],
    [7,"有效率 / 良率","Yield / Usable rate","录制数据中通过质检、可交付的比例。",{"noteEn":"The share of recorded data that passes QA and can be delivered.","why":"Thoth 商业模型的核心指标，必须问实际数字。","whyEn":"Core metric of Thoth's business model; ask for real numbers."}],
    [7,"产能","Throughput","每名采集员每天能产出的有效数据小时数或 episode 数。",{"noteEn":"Usable hours or episodes each collector produces per day.","why":"与有效率一起决定每小时数据成本。","whyEn":"Together with yield, sets the cost per data hour."}],
    [7,"自动标注流水线","Auto-labeling pipeline","用模型先自动生成标注，人工只做校验和修正。",{"noteEn":"Models label first, people only review and correct.","why":"Thoth 的标注能力在这里转化为成本优势。","whyEn":"Where Thoth's labeling strength becomes a cost advantage."}],
    [7,"数据存储与交付格式","MCAP / rosbag / HDF5 / LeRobot","rosbag、MCAP 是 ROS 生态的多传感器录制格式；HDF5 常用于训练数据；LeRobot 是 Hugging Face 的开源机器人数据集格式。",{"noteEn":"rosbag and MCAP record multi-sensor data in the ROS world; HDF5 is common for training data; LeRobot is Hugging Face's open robot dataset format.","why":"交付格式要匹配客户训练管线，问清楚支持哪些。","whyEn":"Delivery format must match the customer's training pipeline; ask which are supported."}],
    [7,"真值 / 动作捕捉","Ground truth / Mocap","用更高精度的系统（如 OptiTrack 光学动捕）测得的参考值，用来验证算法精度。",{"abbr":"GT","noteEn":"Reference values from a more accurate system (e.g. OptiTrack optical mocap) used to validate algorithm accuracy.","why":"3D 手部和位姿精度有没有用真值验证过，是技术可信度的关键。","whyEn":"Whether 3D hands and poses are validated against ground truth is key to technical credibility."}],
    [7,"元数据 / 数据来源记录","Metadata / Provenance","记录每段数据的设备、标定版本、场景、采集员、时间等信息。",{"noteEn":"Records of device, calibration version, scene, collector and time for each piece of data.","why":"大客户审计和数据追溯需要，也是复现问题的基础。","whyEn":"Needed for client audits and traceability, and for reproducing issues."}],
    [7,"去标识化","De-identification","对画面中的人脸、屏幕、证件等敏感信息做模糊处理。",{"noteEn":"Blurring faces, screens, IDs and other sensitive content in frame.","why":"在多国家庭场景采集，隐私合规是交付前提。","whyEn":"Collecting in homes across countries makes privacy compliance a precondition for delivery."}]
  ],
  qa: [
    ["产品定位与约束", [
      ["这套 kit 的主要定位是内部采集工具、租给大客户，还是对外销售？","Is the kit primarily an internal production tool, a leased device for key clients, or a product for sale?","定位决定所有技术取舍：内部工具可以重、专业、靠培训；对外销售必须轻、便宜、开箱即用。","能给出明确的优先级，并说出未来 12 个月的目标数量（例如 50 套、200 套）。","“都可以”或没有数量预估，说明 v2 的设计约束还没定。"],
      ["目标客户用的是哪类机器人？灵巧手还是夹爪？头部相机参数是什么？","Which robots do target customers use: dexterous hands or grippers? What are their head camera specs?","机器人形态决定需要什么 action 数据、视角怎么设计。","能说出 2 到 3 个具体客户或型号，以及他们对数据格式和模态的要求。","没有对齐过客户需求，设计是从“我们能做什么”出发。"],
      ["当前已经做了多少套？处于什么开发阶段？","How many units exist today, and which stage are you at (prototype, EVT, DVT)?","判断离量产还有多远，以及你需要从哪一步介入。","有准确数量，知道哪些是手工样机、哪些部件已有供应商。","全部是 3D 打印 + 开发板，没有任何结构件开模或 PCB 打样。"]
    ]],
    ["相机与成像", [
      ["传感器是卷帘快门还是全局快门？分辨率和帧率是多少？","Rolling or global shutter? What resolution and frame rate?","快速手部动作下，卷帘快门会造成变形，影响 3D 重建。","说清楚选型理由，以及在 4 ms 曝光下噪点和暗光表现如何。","没有考虑过快门类型的影响。"],
      ["选择云台追手，而不是固定大 FOV 鱼眼，是基于什么比较？","Why a pan-tilt gimbal instead of a fixed wide-FOV fisheye? What was compared?","云台增加成本、重量、标定复杂度，还改变了视角分布。","做过对比测试，有手出画率、关键点精度等数据支撑。","只是直觉判断，或没想过视角分布与机器人部署的差异。"],
      ["双目基线是多少？近距离（0.3 到 0.8 米）的深度精度如何？","What is the stereo baseline, and the depth accuracy at 0.3 to 0.8 m?","手部操作距离很近，基线和对焦设计不当会让深度失准。","有实测误差数据，例如在 0.5 米处误差几毫米。","只有传感器规格书参数，没有实测。"]
    ]],
    ["标定与同步", [
      ["云台角度和图像帧是用硬件信号同步的吗？时间误差多大？","Are gimbal angles hardware-synced with image frames? What is the timing error?","不同步会在快速运动时造成厘米级位置误差。","硬件触发或共用时钟，误差在 1 ms 以内，并有验证方法。","靠软件时间戳，没测过偏差。"],
      ["编码器分辨率和机械回差是多少？外参误差怎么验证？","What are the encoder resolution and backlash? How do you validate extrinsic error?","这是云台方案精度的底线。","有具体数字，并用标定板或动捕做过闭环验证。","没有测量回差，或者不知道外参误差有多大。"],
      ["每台设备的标定要多久？能否在产线上自动完成？","How long does calibration take per unit, and can it be automated at end of line?","标定如果靠工程师手工做，量产规模就上不去。","有标定工装或计划，单台在几分钟内完成，结果有自动验收标准。","每台都要算法工程师手工调。"]
    ]],
    ["手部与动作数据", [
      ["3D 手部姿态精度怎么验证？有没有和动捕真值对比过？","How is 3D hand pose accuracy validated? Compared against mocap ground truth?","这是 Ego 数据卖给客户的核心可信度。","有动捕对比实验和误差数字（如平均关节误差毫米级）。","只有可视化效果图，没有定量数据。"],
      ["下一代是否考虑加数据手套、腕部相机或触觉？","Are you considering data gloves, wrist cameras or tactile sensing in v2?","纯视觉缺少力和精确的手指动作，客户越来越重视 action 模态。","有明确判断和客户反馈依据，知道加了之后对成本和佩戴的影响。","没考虑过 embodiment gap，或认为纯视频就够。"],
      ["你们如何做 retargeting？交付给客户的是人手数据还是已映射到机器人的数据？","How do you handle retargeting? Do you deliver human-hand data or robot-mapped actions?","决定数据是否能直接被客户使用，也决定服务的附加值。","能说明支持哪些机器人手、映射误差如何评估。","把 retargeting 完全留给客户，但宣传中说“训练机器人”。"]
    ]],
    ["计算、链路与功耗", [
      ["腰部两台计算单元的型号、功耗和续航是多少？高温下会降频吗？","What are the compute units, power draw and battery life? Any thermal throttling in heat?","东南亚高温 + 贴身背心，散热问题直接导致丢帧。","有满负荷温升测试和续航数据，换电时间短。","没在高温环境下连续测过。"],
      ["相机链路是什么方案？线缆的弯折寿命测过吗？","Which camera link is used? Has cable flex life been tested?","头到腰的线缆是现场故障最常见的来源。","说出具体链路（GMSL 等）和弯折测试次数，有应力释放设计。","没有做过弯折测试，接口是普通开发板接口。"]
    ]],
    ["佩戴与量产", [
      ["整套重量多少？头部重量和重心在哪里？连续佩戴几小时？","Total weight, head-mounted weight and center of gravity? How many hours of continuous wear?","采集员疲劳决定日产能，也就是数据成本。","有头部重量数据（例如 400 g 以下）和真实班次测试反馈。","没有让采集员连续戴过一个完整班次。"],
      ["现在的 BOM 成本大概多少？哪几项最贵？","What is the current BOM cost, and which items dominate?","你可以从这里切入 cost-down 和供应链方案。","能拆到主要部件，知道哪些是开发板替代品。","不清楚成本结构。"],
      ["哪些部件已经确定供应商？哪些还是开发板或 3D 打印件？","Which parts have committed suppliers, and which are still dev boards or 3D prints?","判断从原型到量产的工作量。","有清单，并知道哪些需要开模或定制 PCB。","全部未定，但时间表写着几个月内量产。"]
    ]],
    ["数据质量与交付", [
      ["目前实际的有效率和人均日产出是多少？","What is the real usable rate and per-collector daily output today?","这是商业模型的核心，也是硬件改进的衡量标准。","有按问题类型拆分的废片原因统计。","只有理论值，或从未统计过。"],
      ["交付格式是什么？支持 MCAP、HDF5、LeRobot 吗？","What delivery formats do you support: MCAP, HDF5, LeRobot?","格式不匹配会增加客户的接入成本。","有标准 schema 文档和样例数据集。","每个客户临时转换格式。"],
      ["在家庭等真实场景采集时，如何处理隐私和去标识化？","How do you handle privacy and de-identification in real home scenes?","多国采集涉及不同隐私法规，影响能否交付。","有自动人脸、屏幕模糊流程和采集同意书。","没考虑过。"]
    ]]
  ]
};
