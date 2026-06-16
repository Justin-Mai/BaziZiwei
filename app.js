// 0. 全国主要省市经度数据库 (用于真太阳时联动)
const PROVINCE_CITY_DB = {
  "北京": { "北京": 120.0 },
  "天津": { "天津": 117.2 },
  "上海": { "上海": 121.47 },
  "重庆": { "重庆": 106.55 },
  "河北": { "石家庄": 114.48, "唐山": 118.02, "秦皇岛": 119.57, "邯郸": 114.47, "邢台": 114.48, "保定": 115.48, "张家口": 114.88, "承德": 117.93, "沧州": 116.83, "廊坊": 116.7, "衡水": 115.68 },
  "山西": { "太原": 112.53, "大同": 113.3, "阳泉": 113.57, "长治": 113.13, "晋城": 112.83, "朔州": 112.43, "晋中": 112.75, "运城": 111.0, "忻州": 112.73, "临汾": 111.52, "吕梁": 111.13 },
  "内蒙古": { "呼和浩特": 111.65, "包头": 109.8, "乌海": 106.82, "赤峰": 118.97, "通辽": 122.27, "鄂尔多斯": 109.98, "呼伦贝尔": 119.77, "巴彦淖尔": 107.42, "乌兰察布": 113.07, "兴安盟": 122.05, "锡林郭勒盟": 116.08, "阿拉善盟": 105.67 },
  "辽宁": { "沈阳": 123.38, "大连": 121.62, "鞍山": 122.98, "抚顺": 123.97, "本溪": 123.77, "丹东": 124.37, "锦州": 121.13, "营口": 122.23, "阜新": 121.65, "辽阳": 123.18, "盘锦": 122.07, "铁岭": 123.85, "朝阳": 120.45, "葫芦岛": 120.83 },
  "吉林": { "长春": 125.35, "吉林": 126.57, "四平": 124.37, "辽源": 125.13, "通化": 125.93, "白山": 126.42, "松原": 124.82, "白城": 122.83, "延边": 129.5 },
  "黑龙江": { "哈尔滨": 126.63, "齐齐哈尔": 123.97, "鸡西": 130.97, "鹤岗": 130.27, "双鸭山": 131.17, "大庆": 125.03, "伊春": 128.9, "佳木斯": 130.35, "七台河": 131.0, "牡丹江": 129.6, "黑河": 127.48, "绥化": 127.0, "大兴安岭": 124.72 },
  "江苏": { "南京": 118.78, "无锡": 120.29, "徐州": 117.2, "常州": 119.95, "苏州": 120.62, "南通": 120.86, "连云港": 119.17, "淮安": 119.15, "盐城": 120.13, "扬州": 119.42, "镇江": 119.44, "泰州": 119.9, "宿迁": 118.3 },
  "浙江": { "杭州": 120.15, "宁波": 121.56, "温州": 120.65, "嘉兴": 120.76, "湖州": 120.1, "绍兴": 120.58, "金华": 119.64, "衢州": 118.88, "舟山": 122.2, "台州": 121.43, "丽水": 119.92 },
  "安徽": { "合肥": 117.27, "芜湖": 118.38, "蚌埠": 117.38, "淮南": 117.0, "马鞍山": 118.48, "淮北": 116.78, "铜陵": 117.82, "安庆": 117.03, "黄山": 118.3, "滁州": 118.3, "阜阳": 115.82, "宿州": 116.98, "六安": 116.5, "亳州": 115.78, "池州": 117.05, "宣城": 118.75 },
  "福建": { "福州": 119.3, "厦门": 118.1, "莆田": 119.0, "三明": 117.63, "泉州": 118.58, "漳州": 117.65, "南平": 118.17, "龙岩": 117.03, "宁德": 119.52 },
  "江西": { "南昌": 115.89, "景德镇": 117.2, "萍乡": 113.85, "九江": 115.97, "新余": 114.93, "鹰潭": 117.02, "赣州": 114.92, "吉安": 114.98, "宜春": 114.38, "抚州": 116.35, "上饶": 117.97 },
  "山东": { "济南": 117.0, "青岛": 120.33, "淄博": 118.05, "枣庄": 117.57, "东营": 118.48, "烟台": 121.4, "潍坊": 119.1, "济宁": 116.58, "泰安": 117.13, "威海": 122.1, "日照": 119.48, "临沂": 118.35, "德州": 116.28, "聊城": 115.98, "滨州": 118.03, "菏泽": 115.48 },
  "河南": { "郑州": 113.65, "开封": 114.35, "洛阳": 112.43, "平顶山": 113.3, "安阳": 114.35, "鹤壁": 114.17, "新乡": 113.85, "焦作": 113.23, "濮阳": 115.02, "许昌": 113.82, "漯河": 114.02, "三门峡": 111.2, "南阳": 112.53, "商丘": 115.65, "信阳": 114.08, "周口": 114.63, "驻马店": 114.02, "济源": 112.6 },
  "湖北": { "武汉": 114.3, "黄石": 115.08, "十堰": 110.78, "宜昌": 111.3, "襄阳": 112.13, "鄂州": 114.88, "荆门": 112.2, "孝感": 113.92, "荆州": 112.23, "黄冈": 114.87, "咸宁": 114.32, "随州": 113.37, "恩施": 109.48, "仙桃": 113.43, "潜江": 112.9, "天门": 113.17, "神农架": 110.67 },
  "湖南": { "长沙": 113.0, "株洲": 113.15, "湘潭": 112.9, "衡阳": 112.6, "邵阳": 111.5, "岳阳": 113.1, "常德": 111.68, "张家界": 110.48, "益阳": 112.33, "郴州": 113.02, "永州": 111.62, "怀化": 110.0, "娄底": 111.98, "湘西": 109.73 },
  "广东": { "广州": 113.26, "深圳": 114.07, "珠海": 113.52, "汕头": 116.68, "韶关": 113.6, "佛山": 113.12, "江门": 113.08, "湛江": 110.3, "湛江廉江": 110.28, "茂名": 110.87, "肇庆": 112.47, "惠州": 114.4, "梅州": 116.12, "汕尾": 115.35, "河源": 114.7, "阳江": 111.95, "清远": 113.03, "东莞": 113.75, "中山": 113.38, "潮州": 116.63, "揭阳": 116.35, "云浮": 112.03 },
  "广西": { "南宁": 108.33, "柳州": 109.4, "桂林": 110.28, "梧州": 111.33, "北海": 109.12, "防城港": 108.35, "钦州": 108.62, "贵港": 109.6, "玉林": 110.15, "百色": 106.62, "贺州": 111.55, "河池": 108.07, "来宾": 109.23, "崇左": 107.38 },
  "海南": { "海口": 110.35, "三亚": 109.5, "三沙": 112.33 },
  "四川": { "成都": 104.06, "自贡": 104.78, "攀枝花": 101.72, "泸州": 105.43, "德阳": 104.38, "绵阳": 104.73, "广元": 105.82, "遂宁": 105.58, "内江": 105.05, "乐山": 103.75, "南充": 106.08, "眉山": 103.83, "宜宾": 104.62, "广安": 106.63, "达州": 107.5, "雅安": 103.0, "巴中": 106.75, "资阳": 104.62, "阿坝": 102.22, "甘孜": 101.95, "凉山": 102.25 },
  "贵州": { "贵阳": 106.7, "六盘水": 104.83, "遵义": 106.9, "安顺": 105.93, "铜仁": 109.2, "黔西南": 104.9, "毕节": 105.28, "黔东南": 107.97, "黔南": 107.52 },
  "云南": { "昆明": 102.73, "曲靖": 103.8, "玉溪": 102.55, "保山": 99.17, "昭通": 103.72, "丽江": 100.23, "普洱": 100.97, "临沧": 100.08, "楚雄": 101.53, "红河": 103.4, "文山": 104.25, "西双版纳": 100.8, "大理": 100.22, "德宏": 98.58, "怒江": 98.85, "迪庆": 99.7 },
  "西藏": { "拉萨": 91.11, "日喀则": 88.88, "昌都": 97.18, "林芝": 94.37, "山南": 91.77, "那曲": 92.05, "阿里": 80.1 },
  "陕西": { "西安": 108.94, "铜川": 109.08, "宝鸡": 107.13, "咸阳": 108.7, "渭南": 109.5, "延安": 109.48, "汉中": 107.02, "榆林": 109.73, "安康": 109.02, "商洛": 109.93 },
  "甘肃": { "兰州": 103.82, "嘉峪关": 98.28, "金昌": 102.18, "白银": 104.18, "天水": 105.72, "武威": 102.63, "张掖": 100.45, "平凉": 106.68, "酒泉": 98.52, "庆阳": 107.63, "定西": 104.62, "陇南": 104.92, "临夏": 103.22, "甘南": 102.92 },
  "青海": { "西宁": 101.77, "海东": 102.1, "海北": 100.9, "黄南": 102.02, "海南州": 100.62, "果洛": 100.22, "玉树": 97.02, "海西": 97.37 },
  "宁夏": { "银川": 106.27, "石嘴山": 106.38, "吴忠": 106.2, "固原": 106.28, "中卫": 105.18 },
  "新疆": { "乌鲁木齐": 87.68, "克拉玛依": 84.88, "吐鲁番": 89.18, "哈密": 93.52, "昌吉": 87.3, "博尔塔拉": 82.08, "巴音郭楞": 86.15, "阿克苏": 80.27, "克孜勒苏": 76.17, "喀什": 75.98, "和田": 79.93, "伊犁": 81.33, "塔城": 82.98, "阿勒泰": 88.13, "石河子": 86.03 },
  "Taiwan": { "台北": 121.5, "高雄": 120.3, "台中": 120.68 },
  "香港": { "香港": 114.17 },
  "澳门": { "澳门": 113.53 }
};

// 1. 全局配置与数据映射
const BRANCH_GRID_MAP = {
  '巳': { row: 1, col: 1 },
  '午': { row: 1, col: 2 },
  '未': { row: 1, col: 3 },
  '申': { row: 1, col: 4 },
  '酉': { row: 2, col: 4 },
  '戌': { row: 3, col: 4 },
  '亥': { row: 4, col: 4 },
  '子': { row: 4, col: 3 },
  '丑': { row: 4, col: 2 },
  '寅': { row: 4, col: 1 },
  '卯': { row: 3, col: 1 },
  '辰': { row: 2, col: 1 }
};

// 2. 五行基础属性字典
const GAN_WUXING = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

const ZHI_WUXING = {
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '申': '金', '酉': '金',
  '亥': '水', '子': '水',
  '辰': '土', '戌': '土', '丑': '土', '未': '土'
};

// 地支藏干表
const ZHI_HIDE_GAN = {
  '子': [{ gan: '癸', weight: 10 }],
  '丑': [{ gan: '己', weight: 7 }, { gan: '癸', weight: 2 }, { gan: '辛', weight: 1 }],
  '寅': [{ gan: '甲', weight: 7 }, { gan: '丙', weight: 2 }, { gan: '戊', weight: 1 }],
  '卯': [{ gan: '乙', weight: 10 }],
  '辰': [{ gan: '戊', weight: 7 }, { gan: '乙', weight: 2 }, { gan: '癸', weight: 1 }],
  '巳': [{ gan: '丙', weight: 7 }, { gan: '庚', weight: 2 }, { gan: '戊', weight: 1 }],
  '午': [{ gan: '丁', weight: 7 }, { gan: '己', weight: 3 }],
  '未': [{ gan: '己', weight: 7 }, { gan: '丁', weight: 2 }, { gan: '乙', weight: 1 }],
  '申': [{ gan: '庚', weight: 7 }, { gan: '壬', weight: 2 }, { gan: '戊', weight: 1 }],
  '酉': [{ gan: '辛', weight: 10 }],
  '戌': [{ gan: '戊', weight: 7 }, { gan: '辛', weight: 2 }, { gan: '丁', weight: 1 }],
  '亥': [{ gan: '壬', weight: 7 }, { gan: '甲', weight: 3 }]
};

// 五行解析字典
const WUXING_DESCS = {
  '木': '木主仁，其性直，其情恭。木气旺者，慈祥恺悌，正直清高，乐善好施；木气衰者，嫉妒狭隘，性格固执。',
  '火': '火主礼，其性急，其情恭。火气旺者，精力充沛，待人热诚，尊长爱幼，但性急易怒；火气衰者，奸诈嫉妒，做事有头无尾。',
  '土': '土主信，其性重，其情厚。土气旺者，宽厚笃实，诚实守信，人缘极佳，但易流于固执；土气衰者，不通情理，不守信用。',
  '金': '金主义，其性刚，其情烈。金气旺者，刚毅果决，仗义疏财，深知廉耻，但易流于武断；金气衰者，优柔寡断，吝啬刻薄。',
  '水': '水主智，其性聪，其情善。水气旺者，聪明机智，深谋远虑，应变力强，但易多思多虑；水气衰者，胆小无谋，反复无常。'
};

// 3. 紫微斗数离线解析库 (主星在主要宫位的释义)
const STAR_INTERPRETATIONS = {
  '紫微': {
    '命宫': '紫微星入命，代表有帝王之气，自尊心强，稳重高贵。具有卓越的管理和领导才能，但也容易流于独断专行、爱面子、喜好奉承。',
    '夫妻宫': '配偶气质高雅，有责任感，但也带有一定支配欲。感情生活注重体面，容易因为面子或性格刚强产生小摩擦。',
    '财帛宫': '财源稳定，善于经营大额财物，投资稳健，能得贵人相助而进财。',
    '官禄宫': '事业心重，适合担任管理、行政、公职或大型机构骨干，升迁运极佳。'
  },
  '天机': {
    '命宫': '天机星为智多星，聪明伶俐，思维敏捷，善于策划和研究。然而心思较敏感多虑，易神经衰弱、多思失眠。',
    '夫妻宫': '配偶聪明机智，心思细腻。但感情容易多变或多思虑，适合年龄有一定差距的结合。',
    '财帛宫': '财运多变动，属于劳心赚取“智力财”的命格，适合做设计、创意或咨询顾问得财。',
    '官禄宫': '适合从事脑力劳动、企划、高新科技或媒体行业，不宜死板工作，事业多变动发展。'
  },
  '太阳': {
    '命宫': '太阳代表光明、博爱、奉献。性格开朗大方，乐于助人，但有时过于爱出风头，一生奔波操劳。',
    '夫妻宫': '配偶性格开朗外向，做事积极。男命易得贤妻，女命则需防丈夫脾气稍显急躁。',
    '财帛宫': '财源广进，但开销也大，喜面子，花钱慷慨，宜防财来财去，多做固定资产投资。',
    '官禄宫': '适合从事外交、销售、政治、教育等需要公众曝光或服务大众的行业，事业名大于利。'
  },
  '武曲': {
    '命宫': '武曲为正财星、将星。性格刚毅刚直，作风果断，执行力极强。但人际交往中略嫌严厉，女命则易显得过于刚强。',
    '夫妻宫': '感情偏于理智、冷淡。配偶性格刚毅、重实际。宜多沟通，减少争执。',
    '财帛宫': '财运极旺！正财星落本位，善于理财、投资及白手起家。适合经商或金融、制造行业. ',
    '官禄宫': '事业稳健，适合金融、军事、警察、五金制造或实体企业经营，做事铁面无私。'
  },
  '天同': {
    '命宫': '天同为福星，性格温和谦逊，知足常乐，人缘极佳，追求精神享受。但有时缺乏进取心，易流于懒散。',
    '夫妻宫': '夫妻感情深厚甜蜜。配偶性格温和体贴，懂得生活情趣，家庭氛围温馨谐和。',
    '财帛宫': '财源平稳，多为“白手起家”或“晚发”之财。不宜过度投机，安稳打工亦能衣食无忧。',
    '官禄宫': '适合从事服务业、文教、艺术、休闲或公关等行业，工作环境通常比较轻松愉快。'
  },
  '廉贞': {
    '命宫': '廉贞是次桃花、囚星。性格多面，有野心、有才华、重感情，但脾气傲慢，容易偏执，带有一股邪气与叛逆。',
    '夫妻宫': '感情生活多姿多彩，配偶多才多艺、风趣幽默，但也需防防范婚姻外的桃花困扰。',
    '财帛宫': '财运起伏较大，善于以偏门、交际或演艺创意得财，需防因官非或人际纠纷破财。',
    '官禄宫': '适合军警、公职、电子科技、公关或艺术时尚行业，工作表现积极，竞争心强。'
  },
  '天府': {
    '命宫': '天府为库星，温和儒雅，注重物质享受，做事稳扎稳打，极具包容力，但容易安于现状。',
    '夫妻宫': '配偶能力强，善于理财，家庭生活安定踏实，多能得配偶助力。',
    '财帛宫': '财运亨通，善于储蓄和守财，一生衣食无忧，多为中产以上富足生活。',
    '官禄宫': '事业稳定，适合在大型企业、银行或政府机关负责资产管理、行政后勤等稳健工作。'
  },
  '太阴': {
    '命宫': '太阴代表月亮，温柔内敛，心思细腻，注重生活品质与精神修养，人缘极好，但略显多愁善感。',
    '夫妻宫': '男命易娶贤惠美丽的妻子，女命则易嫁温文尔雅、体贴温柔的丈夫，感情深厚。',
    '财帛宫': '财源细水长流，偏财运佳，善于以不动产、理财或文创行业进财，一生财务状况安稳。',
    '官禄宫': '适合从事房地产、财务、行政、文教或夜间性质行业，工作表现有条不紊。'
  },
  '贪狼': {
    '命宫': '贪狼为正桃花星，欲望之神。交际手腕圆滑，多才多艺，喜好交友与享乐，对玄学宗教亦有独特天赋，但需防博而不精。',
    '夫妻宫': '感情生活多姿多彩，配偶多才多艺、风趣幽默，但也需防防范婚姻外的桃花困扰。',
    '财帛宫': '财运波动，多为偏财、交际财。善于应酬，容易在娱乐、公关、投资等领域暴发，但花钱也大方。',
    '官禄宫': '适合从事公关、娱乐、艺术、餐饮旅游、或者偏门行业，事业具有开拓性。'
  },
  '巨门': {
    '命宫': '巨门为暗曜，主口舌是非。心思细腻，观察力敏锐，辩才无碍。但也容易多疑、言多必失，招惹人际摩擦。',
    '夫妻宫': '夫妻容易因口舌、意见不合产生争执。配偶多言善辩，宜相敬如宾，多包容。',
    '财帛宫': '凭口才、技术或智力进财（如律师、教师、销售、演艺等），属于“劳神费口”得财。',
    '官禄宫': '适合法律、教育、策划、科研、新闻传播等需要深度思考和表达的行业。'
  },
  '天相': {
    '命宫': '天相为印星，性格敦厚，做事循规蹈矩，乐于助人，极具正义感，善于调解纠纷。但缺乏自主决断力，易受他人影响。',
    '夫妻宫': '配偶多为同事、同学或经由亲友介绍，性格贤良，感情基础稳固踏实。',
    '财帛宫': '财源稳定，多为薪水及理财所得。适合做代理、服务或协助他人经营得财，一生衣食丰足。',
    '官禄宫': '适合担任秘书、行政助理、公职或中介顾问等辅助性、协调性强的职业。'
  },
  '天梁': {
    '命宫': '天梁为荫星、老人星。性格成熟稳重，热心公益，具有长者风范和极强的逢凶化吉能力。但有时说教味重，略嫌固执。',
    '夫妻宫': '感情多带有一点坎坷，但最终都能化解。配偶成熟稳重，容易有年龄差距较大的恋情。',
    '财帛宫': '财运平稳，多得长辈荫庇或遗产，亦适合以名声、技术、教职等清高职业赚取稳健收入。',
    '官禄宫': '适合从事医疗、教育、慈善、法律、宗教哲学或公务监察等行业，事业名声极佳。'
  },
  '七杀': {
    '命宫': '七杀为将星。性格刚强，充满干劲，喜欢冒险与挑战，做事雷厉风行。但脾气急躁，一生运势多起伏与成败变动。',
    '夫妻宫': '夫妻关系多具挑战，容易因为性格同样刚强而产生冲突。建议晚婚，或与性格温和之人结合。',
    '财帛宫': '财运起伏极大，一生中多有暴发暴败的经历，适合白手起家、冒险性投资，但不宜孤注一掷。',
    '官禄宫': '适合开创性、冒险性的行业，如军事、体育、建筑工程、开创性销售或自由职业。'
  },
  '破军': {
    '命宫': '破军为消耗之星，主破坏与重组。性格敢作敢当，反叛性强，勇于打破旧习气、开创新局面。但性格有些任性喜变动。',
    '夫妻宫': '感情生活多波折，容易经历闪婚或多次变动。配偶个性鲜明，宜晚婚并保持彼此空间。',
    '财帛宫': '财来财去，善于在破旧立新、改革中赚取横财，但财库难守，需注意理财规划。',
    '官禄宫': '适合从事制造业、技术研发、贸易开创或自由职业等需要不断自我革新的事业。'
  }
};

const DEFAULT_INTERPRETATION = '星曜吉凶参半，此宫位代表的领域运势稳健。若逢吉星（如文昌、左辅）则锦上添花，可成大器；若遇凶星（如火星、地劫）则需防波折与阻碍，修身养性方能逢凶化吉。';

// 4. 初始化页面交互
document.addEventListener('DOMContentLoaded', () => {
  initDateSelectors();
  initTimeSelectors();
  initLocationSelectors();
  initCanvas();
  bindEvents();
  
  // 载入本地配置
  const savedKey = localStorage.getItem('gemini_api_key');
  const savedUrl = localStorage.getItem('gemini_api_url');
  const chatInput = document.getElementById('chatInput');
  const btnSendChat = document.getElementById('btnSendChat');
  if (savedKey) {
    document.getElementById('apiKey').value = savedKey;
    if (chatInput) {
      chatInput.disabled = false;
      chatInput.placeholder = "祖师爷，我命中喜用神是什么？我什么时候能遇到正缘？...";
    }
    if (btnSendChat) {
      btnSendChat.disabled = false;
    }
  } else {
    if (chatInput) {
      chatInput.disabled = true;
      chatInput.placeholder = "请先在上方“API 参数配置”中配置并保存 Key...";
    }
    if (btnSendChat) {
      btnSendChat.disabled = true;
    }
  }
  if (savedUrl) {
    document.getElementById('apiUrl').value = savedUrl;
  }

  // API 配置折叠控制
  const btnConfigToggle = document.getElementById('btnConfigToggle');
  const apiConfigPanel = document.getElementById('apiConfigPanel');
  if (btnConfigToggle && apiConfigPanel) {
    btnConfigToggle.addEventListener('click', () => {
      const isHidden = apiConfigPanel.style.display === 'none';
      if (isHidden) {
        apiConfigPanel.style.display = 'block';
        btnConfigToggle.classList.add('active');
      } else {
        apiConfigPanel.style.display = 'none';
        btnConfigToggle.classList.remove('active');
      }
    });
  }
});

// 初始化日期下拉框 (主要针对农历输入)
function initDateSelectors() {
  const lunarYearSelect = document.getElementById('lunarYear');
  const lunarMonthSelect = document.getElementById('lunarMonth');
  const lunarDaySelect = document.getElementById('lunarDay');

  // 初始化年份 (1900 - 2050)
  for (let y = 1900; y <= 2050; y++) {
    let lunar = Lunar.fromYmd(y, 1, 1);
    let ganZhi = lunar.getYearInGanZhiByLiChun();
    let opt = document.createElement('option');
    opt.value = y;
    opt.textContent = `${y} (${ganZhi}) 年`;
    if (y === 1995) opt.selected = true;
    lunarYearSelect.appendChild(opt);
  }

  // 初始化月份 (1 - 12)
  for (let m = 1; m <= 12; m++) {
    let opt = document.createElement('option');
    opt.value = m;
    opt.textContent = `${m} 月`;
    if (m === 10) opt.selected = true; // 默认10月
    lunarMonthSelect.appendChild(opt);
  }

  // 初始化日期 (1 - 30)
  for (let d = 1; d <= 30; d++) {
    let opt = document.createElement('option');
    opt.value = d;
    opt.textContent = `${d} 日`;
    if (d === 10) opt.selected = true; // 默认10日
    lunarDaySelect.appendChild(opt);
  }
}

// 初始化小时和分钟下拉列表
function initTimeSelectors() {
  const hourSelect = document.getElementById('birthHour');
  const minuteSelect = document.getElementById('birthMinute');

  for (let h = 0; h < 24; h++) {
    let opt = document.createElement('option');
    opt.value = h;
    opt.textContent = h.toString().padStart(2, '0');
    if (h === 9) opt.selected = true; // 默认9点，湛江廉江命例
    hourSelect.appendChild(opt);
  }

  for (let m = 0; m < 60; m++) {
    let opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m.toString().padStart(2, '0');
    if (m === 9) opt.selected = true; // 默认9分，湛江廉江命例
    minuteSelect.appendChild(opt);
  }
}

// 初始化省市二级联动
function initLocationSelectors() {
  const provSelect = document.getElementById('birthProvince');
  const citySelect = document.getElementById('birthCity');
  const lngInput = document.getElementById('customLongitude');

  provSelect.innerHTML = '<option value="">选择省份</option>';
  for (let prov in PROVINCE_CITY_DB) {
    let opt = document.createElement('option');
    opt.value = prov;
    opt.textContent = prov;
    if (prov === '广东') opt.selected = true; // 默认选中广东
    provSelect.appendChild(opt);
  }

  const updateCities = () => {
    const prov = provSelect.value;
    citySelect.innerHTML = '<option value="">选择地市</option>';
    if (!prov) return;

    const cities = PROVINCE_CITY_DB[prov];
    for (let city in cities) {
      let opt = document.createElement('option');
      opt.value = cities[city];
      opt.textContent = `${city} (${cities[city]}°E)`;
      if (city === '湛江廉江') opt.selected = true; // 默认湛江廉江
      citySelect.appendChild(opt);
    }

    if (citySelect.value) {
      lngInput.value = citySelect.value;
    }
  };

  provSelect.addEventListener('change', updateCities);
  citySelect.addEventListener('change', () => {
    if (citySelect.value) {
      lngInput.value = citySelect.value;
    }
  });

  // 初始化首次运行广东二级城市加载
  updateCities();
}

// 5. 动态星空 canvas 背景
function initCanvas() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const stars = [];
  const starCount = 100;
  
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5,
      alpha: Math.random(),
      speed: 0.2 + Math.random() * 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    
    stars.forEach(star => {
      ctx.globalAlpha = star.alpha;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      
      // 缓动星光
      star.alpha += (Math.random() - 0.5) * 0.05;
      if (star.alpha < 0) star.alpha = 0;
      if (star.alpha > 1) star.alpha = 1;
      
      star.y -= star.speed;
      if (star.y < 0) {
        star.y = height;
        star.x = Math.random() * width;
      }
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// 6. 均时差与真太阳时计算
function getEquationOfTime(date) {
  const year = date.getFullYear();
  const start = new Date(year, 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const d = Math.floor(diff / oneDay);

  // 均时差近似计算公式 (以度数计，转化为弧度)
  const B = 2 * Math.PI * (d - 81) / 365.24;
  
  // 均时差 (分钟)
  const eot = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
  return eot;
}

function getTrueSolarTime(date, longitude) {
  // 经度时差：每度相差4分钟，以北京时间 120°E 为准
  const longitudeDiffMinutes = (longitude - 120.0) * 4.0;
  
  // 均时差
  const eotMinutes = getEquationOfTime(date);
  
  // 总时差修正
  const totalOffsetMinutes = longitudeDiffMinutes + eotMinutes;
  
  // 得到真太阳时对象
  const trueTime = new Date(date.getTime() + totalOffsetMinutes * 60 * 1000);
  
  return {
    trueTime: trueTime,
    longitudeDiff: longitudeDiffMinutes,
    eot: eotMinutes,
    totalOffset: totalOffsetMinutes
  };
}

let calendarType = 'solar'; // solar 或 lunar
let activePalaeeName = ''; // 记录选中的紫微宫位名字

function bindEvents() {
  // 公农历切换
  const btnSolar = document.getElementById('btnSolar');
  const btnLunar = document.getElementById('btnLunar');
  const solarGroup = document.getElementById('solarInputGroup');
  const lunarGroup = document.getElementById('lunarInputGroup');

  btnSolar.addEventListener('click', () => {
    calendarType = 'solar';
    btnSolar.classList.add('active');
    btnLunar.classList.remove('active');
    solarGroup.style.display = 'flex';
    lunarGroup.style.display = 'none';
  });

  btnLunar.addEventListener('click', () => {
    calendarType = 'lunar';
    btnLunar.classList.add('active');
    btnSolar.classList.remove('active');
    solarGroup.style.display = 'none';
    lunarGroup.style.display = 'flex';
  });

  // 选项卡切换
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      e.target.classList.add('active');
      const targetId = e.target.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // 保存 API 配置
  document.getElementById('btnSaveKey').addEventListener('click', () => {
    const key = document.getElementById('apiKey').value.trim();
    const url = document.getElementById('apiUrl').value.trim();
    const chatInput = document.getElementById('chatInput');
    const btnSendChat = document.getElementById('btnSendChat');
    const btnConfigToggle = document.getElementById('btnConfigToggle');
    const apiConfigPanel = document.getElementById('apiConfigPanel');
    
    if (url) {
      localStorage.setItem('gemini_api_url', url);
    } else {
      localStorage.removeItem('gemini_api_url');
    }

    if (key) {
      localStorage.setItem('gemini_api_key', key);
      if (chatInput) {
        chatInput.disabled = false;
        chatInput.placeholder = "祖师爷，我命中喜用神是什么？我什么时候能遇到正缘？...";
      }
      if (btnSendChat) {
        btnSendChat.disabled = false;
      }
      alert('配置已安全保存至本地！');
      
      // 保存成功后自动折叠面板
      if (apiConfigPanel) apiConfigPanel.style.display = 'none';
      if (btnConfigToggle) btnConfigToggle.classList.remove('active');
    } else {
      localStorage.removeItem('gemini_api_key');
      if (chatInput) {
        chatInput.disabled = true;
        chatInput.placeholder = "请先在上方“API 参数配置”中配置并保存 Key...";
      }
      if (btnSendChat) {
        btnSendChat.disabled = true;
      }
      alert('配置已清空（使用 AI 必须提供 Key）！');
    }
  });

  // 开启天机排盘
  document.getElementById('btnCalculate').addEventListener('click', () => {
    performDivination();
  });

  // 咨询 AI 祖师爷
  document.getElementById('btnSendChat').addEventListener('click', () => {
    sendChatMessage();
  });
  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  // 生成 AI 报告
  document.getElementById('btnRequestAiReport').addEventListener('click', () => {
    generateAiReport();
  });

  // 复制盘面与 AI 提示词
  const btnCopyPrompt = document.getElementById('btnCopyReportPrompt');
  if (btnCopyPrompt) {
    btnCopyPrompt.addEventListener('click', () => {
      copyReportPrompt();
    });
  }
}

// 7. 命理计算主流程
let lastCalculatedData = null; // 缓存最新算命数据
const SHICHEN_NAMES = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"];

function performDivination() {
  const userName = document.getElementById('userName').value.trim() || '有缘人';
  const gender = document.getElementById('gender').value;
  const hour = parseInt(document.getElementById('birthHour').value) || 0;
  const minute = parseInt(document.getElementById('birthMinute').value) || 0;
  const longitude = parseFloat(document.getElementById('customLongitude').value) || 120.0;
  
  let lunarObj = null;
  let solarObj = null;
  let baseDate = null;
  
  try {
    if (calendarType === 'solar') {
      const solarDateStr = document.getElementById('solarDate').value;
      if (!solarDateStr) {
        alert('请选择阳历出生日期！');
        return;
      }
      const [y, m, d] = solarDateStr.split('-').map(Number);
      baseDate = new Date(y, m - 1, d, hour, minute, 0);
    } else {
      const y = parseInt(document.getElementById('lunarYear').value);
      const m = parseInt(document.getElementById('lunarMonth').value);
      const d = parseInt(document.getElementById('lunarDay').value);
      const leap = document.getElementById('lunarLeap').value === 'true';
      
      const flatLunar = Lunar.fromYmd(y, leap ? -m : m, d);
      const flatSolar = flatLunar.getSolar();
      baseDate = new Date(flatSolar.getYear(), flatSolar.getMonth() - 1, flatSolar.getDay(), hour, minute, 0);
    }
    
    // 经度与均时差校准得出真太阳时
    const calib = getTrueSolarTime(baseDate, longitude);
    const trueTime = calib.trueTime;

    // 重新用真太阳时实例化 Solar 历法对象 (必须精确到小时和分钟以确定时柱天干)
    solarObj = Solar.fromYmdHms(
      trueTime.getFullYear(),
      trueTime.getMonth() + 1,
      trueTime.getDate(),
      trueTime.getHours(),
      trueTime.getMinutes(),
      0
    );
    lunarObj = solarObj.getLunar();

    // 更新时辰索引 (基于真太阳时的小时换算出正确时辰)
    const trueHour = trueTime.getHours();
    const trueTimeIndex = Math.floor(((trueHour + 1) % 24) / 2);
    
    // 渲染真太阳时校准信息卡
    const formatDateTime = (date) => {
      const pad = n => n.toString().padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    document.getElementById('inputStdTime').textContent = formatDateTime(baseDate);
    document.getElementById('calibLng').textContent = `${longitude.toFixed(2)}°E`;
    document.getElementById('calibLngDiff').textContent = `${calib.longitudeDiff >= 0 ? '+' : ''}${calib.longitudeDiff.toFixed(1)} 分钟`;
    document.getElementById('calibEot').textContent = `${calib.eot >= 0 ? '+' : ''}${calib.eot.toFixed(1)} 分钟`;
    document.getElementById('calibTrueTime').textContent = formatDateTime(trueTime);
    document.getElementById('timeCalibrationPanel').style.display = 'flex';

    // 2. 解析八字四柱数据 (lunarObj 基于真太阳时时间生成，将自动获取精确时柱干支)
    const eightChar = lunarObj.getEightChar();
    const baziData = {
      year: {
        gan: eightChar.getYearGan(),
        zhi: eightChar.getYearZhi(),
        hideGan: eightChar.getYearHideGan(),
        shishenGan: eightChar.getYearShiShenGan(),
        shishenZhi: eightChar.getYearShiShenZhi(),
        nayin: eightChar.getYearNaYin()
      },
      month: {
        gan: eightChar.getMonthGan(),
        zhi: eightChar.getMonthZhi(),
        hideGan: eightChar.getMonthHideGan(),
        shishenGan: eightChar.getMonthShiShenGan(),
        shishenZhi: eightChar.getMonthShiShenZhi(),
        nayin: eightChar.getMonthNaYin()
      },
      day: {
        gan: eightChar.getDayGan(),
        zhi: eightChar.getDayZhi(),
        hideGan: eightChar.getDayHideGan(),
        shishenGan: '日主', 
        shishenZhi: eightChar.getDayShiShenZhi(),
        nayin: eightChar.getDayNaYin()
      },
      time: {
        gan: eightChar.getTimeGan(),
        zhi: eightChar.getTimeZhi(),
        hideGan: eightChar.getTimeHideGan(),
        shishenGan: eightChar.getTimeShiShenGan(),
        shishenZhi: eightChar.getTimeShiShenZhi(),
        nayin: eightChar.getTimeNaYin()
      }
    };

    // 计算五行能量
    const wuxingWeights = calculateWuxingWeights(baziData);

    // 3. 解析紫微斗数星盘
    let astrolabeObj = null;
    const isSolar = true;
    const dateStr = `${solarObj.getYear()}-${solarObj.getMonth()}-${solarObj.getDay()}`;
    const genderKey = gender === '男' ? 'M' : 'F';
    // 实例化星盘
    astrolabeObj = iztro.astro.bySolar(dateStr, trueTimeIndex, genderKey, isSolar, 'zh-CN');

    // 4. 保存最新排盘数据供 AI 交互
    lastCalculatedData = {
      userName,
      gender,
      birthTimeText: SHICHEN_NAMES[trueTimeIndex], // 以真太阳时辰为准
      solarDate: `${solarObj.getYear()}年${solarObj.getMonth()}月${solarObj.getDay()}日 ${trueTime.getHours()}:${trueTime.getMinutes().toString().padStart(2, '0')} (真太阳时)`,
      lunarDate: `${lunarObj.getYearInGanZhi()}(${lunarObj.getYearShengXiao()})年${lunarObj.getMonthInChinese()}月${lunarObj.getDayInChinese()} ${SHICHEN_NAMES[trueTimeIndex]}`,
      bazi: baziData,
      wuxing: wuxingWeights,
      ziwei: astrolabeObj,
      lunarObj: lunarObj,
      calibration: {
        longitude: longitude,
        offset: calib.totalOffset
      }
    };

    // 5. 渲染 UI
    renderBaziPillars(baziData);
    renderWuxingChart(wuxingWeights);
    renderBaziBrief(baziData, wuxingWeights);
    renderZiweiGrid(astrolabeObj);

    // 显示结果区
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('aiSection').style.display = 'flex';
    
    // 滚动到结果区域
    document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });

  } catch (err) {
    console.error(err);
    alert('历法转换或排盘出错，请检查输入参数！');
    return;
  }
}

// 8. 辅助函数：计算八字五行加权得分
function calculateWuxingWeights(bazi) {
  const score = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };

  const addScore = (char, weight) => {
    let wx = GAN_WUXING[char] || ZHI_WUXING[char];
    if (wx) {
      score[wx] += weight;
    }
  };

  // 1. 计算天干五行 (天干基础分 10)
  addScore(bazi.year.gan, 10);
  addScore(bazi.month.gan, 10);
  addScore(bazi.day.gan, 10);
  addScore(bazi.time.gan, 10);

  // 2. 计算地支五行 (地支本气及藏干加权分，总计 10)
  const addZhiScore = (zhi) => {
    const hides = ZHI_HIDE_GAN[zhi];
    if (hides) {
      hides.forEach(h => {
        let wx = GAN_WUXING[h.gan];
        if (wx) {
          score[wx] += h.weight; // h.weight 总和是 10
        }
      });
    }
  };

  addZhiScore(bazi.year.zhi);
  addZhiScore(bazi.month.zhi);
  addZhiScore(bazi.day.zhi);
  addZhiScore(bazi.time.zhi);

  // 最终总分 80 分，换算成百分比
  const total = score['金'] + score['木'] + score['水'] + score['火'] + score['土'];
  const percentage = {};
  for (let key in score) {
    percentage[key] = Math.round((score[key] / total) * 100);
  }
  
  return percentage;
}

// 9. 渲染八字四柱令牌挂轴
function renderBaziPillars(bazi) {
  const container = document.getElementById('fourPillars');
  container.innerHTML = '';

  const pillars = [
    { name: '年柱', data: bazi.year },
    { name: '月柱', data: bazi.month },
    { name: '日柱', data: bazi.day },
    { name: '时柱', data: bazi.time }
  ];

  pillars.forEach(p => {
    const card = document.createElement('div');
    card.className = 'glass-panel pillar-card';

    const ganWuxing = GAN_WUXING[p.data.gan];
    const zhiWuxing = ZHI_WUXING[p.data.zhi];

    const ganGlowClass = getGlowClass(ganWuxing);
    const zhiGlowClass = getGlowClass(zhiWuxing);

    card.innerHTML = `
      <div class="pillar-title">${p.name}</div>
      <div class="pillar-shishen">${p.data.shishenGan}</div>
      
      <div class="pillar-word-wrapper">
        <!-- 天干 -->
        <div class="pillar-word ${ganGlowClass}">
          <div class="pillar-character">${p.data.gan}</div>
          <div class="pillar-wuxing">${ganWuxing}</div>
        </div>
        
        <!-- 地支 -->
        <div class="pillar-word ${zhiGlowClass}">
          <div class="pillar-character">${p.data.zhi}</div>
          <div class="pillar-wuxing">${zhiWuxing}</div>
        </div>
      </div>
      
      <div class="pillar-shishen">${p.data.shishenZhi.join(' ')}</div>
      <div class="pillar-cangan">藏: ${p.data.hideGan.join(', ')}</div>
      <div class="pillar-nayin">${p.data.nayin}</div>
    `;

    container.appendChild(card);
  });
}

function getGlowClass(wuxing) {
  switch (wuxing) {
    case '木': return 'glow-mu';
    case '火': return 'glow-huo';
    case '土': return 'glow-tu';
    case '金': return 'glow-jin';
    case '水': return 'glow-shui';
    default: return '';
  }
}

// 10. 渲染五行分析百分比条
function renderWuxingChart(wuxing) {
  const container = document.getElementById('wuxingBars');
  container.innerHTML = '';

  const wuxingColors = {
    '木': 'mu-fill',
    '火': 'huo-fill',
    '土': 'tu-fill',
    '金': 'jin-fill',
    '水': 'shui-fill'
  };

  for (let key in wuxing) {
    const percent = wuxing[key];
    const colorClass = wuxingColors[key];
    const desc = WUXING_DESCS[key];

    const barItem = document.createElement('div');
    barItem.className = 'wuxing-bar-item';
    barItem.innerHTML = `
      <div class="wuxing-label">
        <span class="wuxing-name" style="color: var(--color-${getWuxingPinyin(key)})">${key}</span>
        <span>${percent}%</span>
      </div>
      <div class="wuxing-track">
        <div class="wuxing-fill ${colorClass}" style="width: ${percent}%"></div>
      </div>
      <p style="font-size:0.75rem; color:var(--text-mute); margin-top:2px;">${desc}</p>
    `;
    container.appendChild(barItem);
  }
}

function getWuxingPinyin(wuxing) {
  if (wuxing === '木') return 'mu';
  if (wuxing === '火') return 'huo';
  if (wuxing === '土') return 'tu';
  if (wuxing === '金') return 'jin';
  if (wuxing === '水') return 'shui';
  return '';
}

// 11. 渲染八字简批文字
function renderBaziBrief(bazi, wuxing) {
  const briefDiv = document.getElementById('baziBriefAnalysis');
  briefDiv.innerHTML = '';

  // 1. 判断身强身弱及喜用神
  const rizhu = bazi.day.gan;
  const rizhuWuxing = GAN_WUXING[rizhu];

  // 统计同类元素（生我、同我）与异类元素
  let tongleiWx = [rizhuWuxing];
  if (rizhuWuxing === '木') tongleiWx.push('水');
  if (rizhuWuxing === '火') tongleiWx.push('木');
  if (rizhuWuxing === '土') tongleiWx.push('火');
  if (rizhuWuxing === '金') tongleiWx.push('土');
  if (rizhuWuxing === '水') tongleiWx.push('金');

  let tongleiScore = 0;
  let yileiScore = 0;

  for (let key in wuxing) {
    if (tongleiWx.includes(key)) {
      tongleiScore += wuxing[key];
    } else {
      yileiScore += wuxing[key];
    }
  }

  const isStrong = tongleiScore >= 50;
  let xiyong = '';
  let jishen = '';

  if (rizhuWuxing === '木') {
    xiyong = isStrong ? '火、土、金' : '水、木';
    jishen = isStrong ? '水、木' : '金、土、火';
  } else if (rizhuWuxing === '火') {
    xiyong = isStrong ? '土、金、水' : '木、火';
    jishen = isStrong ? '木、火' : '水、金、土';
  } else if (rizhuWuxing === '土') {
    xiyong = isStrong ? '金、水、木' : '火、土';
    jishen = isStrong ? '火、土' : '木、水、金';
  } else if (rizhuWuxing === '金') {
    xiyong = isStrong ? '水、木、火' : '土、金';
    jishen = isStrong ? '土、金' : '火、木、水';
  } else if (rizhuWuxing === '水') {
    xiyong = isStrong ? '木、火、土' : '金、水';
    jishen = isStrong ? '金、水' : '土、火、木';
  }

  // 2. 构造简批报告
  const items = [
    {
      title: '日元属性与格局',
      p: `本命日元为【${rizhu}${rizhuWuxing}】，五行同类得分为 ${tongleiScore}%，属于“身${isStrong ? '强' : '弱'}”之命。`
    },
    {
      title: '喜用神与改运建议',
      p: `本命喜用五行为：【${xiyong}】，忌讳五行为：【${jishen}】。建议日常多穿着喜用五行颜色服饰，并朝喜用神方位寻求发展。`
    },
    {
      title: '性格分析',
      p: `缘主命带${rizhuWuxing}性，性格多有${rizhuWuxing}之本色。${isStrong ? '性格独立，做事雷厉风行，但有时较为固执执拗，需注意虚心纳谏。' : '心思细腻，随和善良，但做决定时略显犹豫不决，宜增强开拓精神。'}`
    },
    {
      title: '事业与财运',
      p: `财星五行力量为 ${wuxing[getFinanceWuxing(rizhuWuxing)] || 0}%。适合在喜用神相关行业发展。财星气盛时，适合开创性投资；若逢印比帮身，多得长辈或同辈相助得财。`
    }
  ];

  items.forEach(it => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'analysis-item';
    itemDiv.innerHTML = `
      <strong>${it.title}</strong>
      <p>${it.p}</p>
    `;
    briefDiv.appendChild(itemDiv);
  });
}

function getFinanceWuxing(rizhuWx) {
  // 我克者为财
  if (rizhuWx === '木') return '土';
  if (rizhuWx === '火') return '金';
  if (rizhuWx === '土') return '水';
  if (rizhuWx === '金') return '木';
  if (rizhuWx === '水') return '火';
  return '';
}

// 12. 渲染紫微斗数 4x4 网格星盘
function renderZiweiGrid(astrolabe) {
  const grid = document.getElementById('ziweiGrid');
  grid.innerHTML = '';

  const bazi = lastCalculatedData.bazi;
  
  // 计算本命天干四化
  const SIHUA_TABLE = {
    '甲': { '禄': '廉贞', '权': '破军', '科': '武曲', '忌': '太阳' },
    '乙': { '禄': '天机', '权': '天梁', '科': '紫微', '忌': '太阴' },
    '丙': { '禄': '天同', '权': '天机', '科': '文昌', '忌': '廉贞' },
    '丁': { '禄': '太阴', '权': '天同', '科': '天府', '忌': '巨门' },
    '戊': { '禄': '贪狼', '权': '太阴', '科': '右弼', '忌': '天机' },
    '己': { '禄': '武曲', '权': '贪狼', '科': '天梁', '忌': '文曲' },
    '庚': { '禄': '太阳', '权': '武曲', '科': '太阴', '忌': '天同' },
    '辛': { '禄': '巨门', '权': '太阳', '科': '文曲', '忌': '文昌' },
    '壬': { '禄': '天梁', '权': '紫微', '科': '左辅', '忌': '武曲' },
    '癸': { '禄': '破军', '权': '巨门', '科': '太阴', '忌': '贪狼' }
  };
  const yearGan = bazi.year.gan;
  const sihua = SIHUA_TABLE[yearGan] || { '禄': '-', '权': '-', '科': '-', '忌': '-' };

  // 1. 创建中宫
  const centerCell = document.createElement('div');
  centerCell.className = 'palace-center';
  
  // 中宫文字信息，加入四化星展示
  centerCell.innerHTML = `
    <div class="center-title">${lastCalculatedData.userName}</div>
    <div class="center-info-grid">
      <div class="center-info-item">性别：<span>${lastCalculatedData.gender}</span></div>
      <div class="center-info-item">命局：<span>${astrolabe.fiveElementsClass || '未知'}</span></div>
      <div class="center-info-item" style="grid-column: span 2">阳历：<span>${lastCalculatedData.solarDate}</span></div>
      <div class="center-info-item" style="grid-column: span 2">农历：<span>${lastCalculatedData.lunarDate}</span></div>
      <div class="center-info-item">命主：<span>${astrolabe.lordOfLife || '无'}</span></div>
      <div class="center-info-item">身主：<span>${astrolabe.lordOfBody || '无'}</span></div>
      <div class="center-info-item" style="grid-column: span 2">八字：<span>${bazi.year.gan}${bazi.year.zhi} ${bazi.month.gan}${bazi.month.zhi} ${bazi.day.gan}${bazi.day.zhi} ${bazi.time.gan}${bazi.time.zhi}</span></div>
      <div class="center-info-item" style="grid-column: span 2; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
        四化：
        <span class="mutagen-badge badge-lu">禄</span><span style="color:var(--text-main); font-weight:bold; margin-right:4px;">${sihua['禄']}</span>
        <span class="mutagen-badge badge-quan">权</span><span style="color:var(--text-main); font-weight:bold; margin-right:4px;">${sihua['权']}</span>
        <span class="mutagen-badge badge-ke">科</span><span style="color:var(--text-main); font-weight:bold; margin-right:4px;">${sihua['科']}</span>
        <span class="mutagen-badge badge-ji">忌</span><span style="color:var(--text-main); font-weight:bold;">${sihua['忌']}</span>
      </div>
    </div>
  `;
  grid.appendChild(centerCell);

  // 地支数组用于计算起宫
  const ZHI_LIST = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const birthZhi = bazi.year.zhi;
  const isMale = lastCalculatedData.gender === '男';
  
  // 2. 绘制 12 宫位
  astrolabe.palaces.forEach((palace) => {
    const cell = document.createElement('div');
    const branch = palace.earthlyBranch;
    const gridPos = BRANCH_GRID_MAP[branch];

    cell.className = 'palace-cell';
    cell.style.gridRow = gridPos.row;
    cell.style.gridColumn = gridPos.col;
    cell.setAttribute('data-name', palace.name);

    // 宫名 (如果是身宫，特殊标记)
    let displayName = palace.name;
    if (palace.isBodyPalace) {
      displayName += '(身)';
    }

    // 大限区间
    const range = palace.decadal ? `${palace.decadal.range[0]}-${palace.decadal.range[1]}` : '';

    // === 计算流年 (虚岁) ===
    // 流年太岁永远以出生年支所在的宫位为1岁，顺行。
    const birthZhiIdx = ZHI_LIST.indexOf(birthZhi);
    const palaceZhiIdx = ZHI_LIST.indexOf(branch);
    
    const liuNianStep = (palaceZhiIdx - birthZhiIdx + 12) % 12;
    const liuNianStart = liuNianStep + 1;
    const liuNianAges = [];
    for (let k = 0; k < 6; k++) {
      liuNianAges.push(liuNianStart + k * 12);
    }
    const agesText = liuNianAges.join(' ');

    // === 计算小限 ===
    let xiaoXianStartZhi = '';
    const group1 = ['寅', '午', '戌'];
    const group2 = ['申', '子', '辰'];
    const group3 = ['巳', '酉', '丑'];
    const group4 = ['亥', '卯', '未'];
    
    if (isMale) {
      if (group1.includes(birthZhi)) xiaoXianStartZhi = '辰';
      else if (group2.includes(birthZhi)) xiaoXianStartZhi = '戌';
      else if (group3.includes(birthZhi)) xiaoXianStartZhi = '未';
      else if (group4.includes(birthZhi)) xiaoXianStartZhi = '丑';
    } else {
      if (group1.includes(birthZhi)) xiaoXianStartZhi = '戌';
      else if (group2.includes(birthZhi)) xiaoXianStartZhi = '辰';
      else if (group3.includes(birthZhi)) xiaoXianStartZhi = '丑';
      else if (group4.includes(birthZhi)) xiaoXianStartZhi = '未';
    }
    
    const sIdx = ZHI_LIST.indexOf(xiaoXianStartZhi);
    let xiaoXianStep = 0;
    if (isMale) {
      xiaoXianStep = (palaceZhiIdx - sIdx + 12) % 12; // 男顺行
    } else {
      xiaoXianStep = (sIdx - palaceZhiIdx + 12) % 12; // 女逆行
    }
    const xiaoXianStart = xiaoXianStep + 1;
    const xiaoXianAges = [];
    for (let k = 0; k < 6; k++) {
      xiaoXianAges.push(xiaoXianStart + k * 12);
    }
    const limitsText = xiaoXianAges.join(' ');

    // 宫内神煞 (博士、岁前、将前、长生)
    const doctor = palace.doctorStar ? (palace.doctorStar.name || palace.doctorStar) : '';
    const preheaven = palace.preheavenStar ? (palace.preheavenStar.name || palace.preheavenStar) : '';
    const travel = palace.travelStar ? (palace.travelStar.name || palace.travelStar) : '';
    const changsheng = palace.changsheng12 || (palace.changshengStar ? (palace.changshengStar.name || palace.changshengStar) : '');

    // 组装神煞竖排 HTML
    const shenshaItems = [doctor, preheaven, travel].filter(Boolean);
    const shenshaHtml = shenshaItems.map(item => `<span>${item}</span>`).join('');

    // 主星、吉星、煞星 (大字竖排区)
    let mainStarsHtml = '';

    const renderStar = (s, colorClass) => {
      let name = s.name;
      let brightness = s.brightness || '';
      let mutagen = s.mutagen ? `<span class="mutagen-badge badge-${getMutagenPinyin(s.mutagen)}">${s.mutagen}</span>` : '';
      return `
        <div class="star-group">
          <span class="star-name ${colorClass}">${name}</span>
          ${mutagen}
          <span class="star-brightness" style="color:var(--text-mute); font-size:0.65rem;">${brightness}</span>
        </div>
      `;
    };

    const allMainStars = [];
    if (palace.majorStars) allMainStars.push(...palace.majorStars);
    if (palace.minorStars) allMainStars.push(...palace.minorStars);
    if (palace.badStars) allMainStars.push(...palace.badStars);

    allMainStars.forEach(s => {
      if (s.type === 'major') {
        mainStarsHtml += renderStar(s, 'star-major-type');
      } else if (s.type === 'bad') {
        mainStarsHtml += renderStar(s, 'star-bad-type');
      } else {
        mainStarsHtml += renderStar(s, 'star-lucky-type');
      }
    });

    // 杂曜与流曜 (小字竖排区)
    let minorStarsHtml = '';
    const allMinorStars = [];
    if (palace.adjectiveStars) {
      palace.adjectiveStars.forEach(s => allMinorStars.push(s.name));
    }
    if (palace.yearlyStars) {
      palace.yearlyStars.forEach(s => allMinorStars.push(s.name));
    }

    if (allMinorStars.length > 0) {
      allMinorStars.forEach(name => {
        minorStarsHtml += `
          <div class="star-group">
            <span class="star-name star-minor-type" style="font-size: 0.68rem; font-weight: normal;">${name}</span>
          </div>
        `;
      });
    }

    cell.innerHTML = `
      <div class="palace-top">
        <span class="palace-daxian">${range}</span>
        <span class="palace-changsheng" style="font-size: 0.75rem; color: var(--gold-light);">${changsheng || ''}</span>
      </div>
      <div class="palace-stars">
        <div class="palace-stars-main">
          ${mainStarsHtml}
        </div>
        <div class="palace-stars-minor">
          ${minorStarsHtml}
        </div>
      </div>
      <div class="palace-limits">
        <div>流年: ${agesText}</div>
        <div>小限: ${limitsText}</div>
      </div>
      <div class="palace-bottom">
        <div class="palace-shensha">
          ${shenshaHtml}
        </div>
        <div class="palace-basic">
          <span class="palace-name">${displayName}</span>
          <span class="palace-dizhi">${palace.heavenlyStem}${palace.earthlyBranch}</span>
        </div>
      </div>
    `;

    // 绑定宫位点击事件
    cell.addEventListener('click', () => {
      document.querySelectorAll('.palace-cell').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
      showPalaceDetails(palace);
    });

    grid.appendChild(cell);
  });
}

function getMutagenPinyin(mutagen) {
  if (mutagen === '禄') return 'lu';
  if (mutagen === '权') return 'quan';
  if (mutagen === '科') return 'ke';
  if (mutagen === '忌') return 'ji';
  return '';
}

// 13. 展示选中宫位详情
function showPalaceDetails(palace) {
  const detailTitle = document.getElementById('detailPalaceName');
  const detailStars = document.getElementById('detailPalaceStars');
  const detailBody = document.getElementById('detailPalaceBody');

  let displayName = palace.name;
  if (palace.isBodyPalace) {
    displayName += ' (寄身宫)';
  }

  detailTitle.textContent = `${palace.heavenlyStem}${palace.earthlyBranch}宫 - ${displayName}`;

  // 星曜列表拼接展示
  const allStars = [];
  const starDescs = [];

  if (palace.majorStars && palace.majorStars.length > 0) {
    palace.majorStars.forEach(s => {
      allStars.push(s.name + (s.mutagen ? `(化${s.mutagen})` : ''));
      // 提取主星在这个宫位的离线文案
      let desc = (STAR_INTERPRETATIONS[s.name] && STAR_INTERPRETATIONS[s.name][palace.name]) || '';
      if (desc) {
        starDescs.push(`【${s.name}】：${desc}`);
      }
    });
  }

  if (palace.minorStars && palace.minorStars.length > 0) {
    palace.minorStars.forEach(s => allStars.push(s.name));
  }
  if (palace.badStars && palace.badStars.length > 0) {
    palace.badStars.forEach(s => allStars.push(s.name));
  }

  detailStars.textContent = `星曜分布：` + (allStars.length > 0 ? allStars.join('、') : '空宫 (无主星/辅星)');

  if (starDescs.length > 0) {
    detailBody.innerHTML = starDescs.map(d => `<p style="margin-bottom:12px">${d}</p>`).join('') + 
      `<p style="color:var(--text-mute); font-size:0.85rem; border-top:1px dashed rgba(255,255,255,0.05); padding-top:8px;">提示：除主星外，若有三方四正的吉星扶持（如左辅右弼、文昌文曲），能降低负面影响，反之遇到擎羊、陀罗等煞星则多增波折纠纷。</p>`;
  } else {
    // 空宫或无对应解释
    detailBody.textContent = `当前宫位主星及星曜组合为：${allStars.join('、')}。` + DEFAULT_INTERPRETATION;
  }
}

// 14. AI 祖师爷批命与聊天对话逻辑
const chatHistory = [];

function buildDivinationPrompt() {
  if (!lastCalculatedData) return '';

  const bazi = lastCalculatedData.bazi;
  const lunarObj = lastCalculatedData.lunarObj;
  const eightChar = lunarObj.getEightChar();
  const gender = lastCalculatedData.gender;

  // 提取出生地点
  const province = document.getElementById('birthProvince').value || '';
  const citySelect = document.getElementById('birthCity');
  const city = citySelect.options[citySelect.selectedIndex]?.text || '';
  const location = `${province}省 ${city} (东经 ${lastCalculatedData.calibration.longitude.toFixed(2)}°)`;

  // 大运提取
  const yun = eightChar.getYun(gender === '男' ? 1 : 0);
  const startAge = typeof yun.getStartAge === 'function' ? yun.getStartAge() : yun.getStartYear();
  const daYunList = yun.getDaYun();
  let dayunTextList = [];
  daYunList.forEach(dy => {
    if (dy.getGanZhi()) {
      dayunTextList.push(`${dy.getGanZhi()} ${dy.getStartAge()}-${dy.getEndAge()}岁`);
    }
  });
  const dayunListStr = dayunTextList.join('，');

  // 判定大运顺逆
  const yearGan = bazi.year.gan;
  const isYangGan = ['甲', '丙', '戊', '庚', '壬'].includes(yearGan);
  const isMale = gender === '男';
  const isForwardYun = (isYangGan && isMale) || (!isYangGan && !isMale);
  const yunOrderText = isForwardYun ? '顺排' : '逆排';

  // 当前流年
  const currentLunar = Lunar.fromDate(new Date());
  const currentYearGanZhi = currentLunar.getYearInGanZhi();

  // 拼装八字排盘数据
  const formattedBazi = `
四柱：
年柱 【${bazi.year.gan}${bazi.year.zhi}】 藏干【${bazi.year.hideGan.join(', ')}】 十神【天干 ${bazi.year.shishenGan} / 地支 ${bazi.year.shishenZhi.join(', ')}】 纳音【${bazi.year.nayin}】 空亡【${eightChar.getYearXunKong()}】
月柱 【${bazi.month.gan}${bazi.month.zhi}】 藏干【${bazi.month.hideGan.join(', ')}】 十神【天干 ${bazi.month.shishenGan} / 地支 ${bazi.month.shishenZhi.join(', ')}】 纳音【${bazi.month.nayin}】 空亡【${eightChar.getMonthXunKong()}】
日柱 【${bazi.day.gan}${bazi.day.zhi}】 藏干【${bazi.day.hideGan.join(', ')}】 十神【日主${GAN_WUXING[bazi.day.gan]} / 地支 ${bazi.day.shishenZhi.join(', ')}】 纳音【${bazi.day.nayin}】 空亡【${eightChar.getDayXunKong()}】 （日主为“${bazi.day.gan}${GAN_WUXING[bazi.day.gan]}”）
时柱 【${bazi.time.gan}${bazi.time.zhi}】 藏干【${bazi.time.hideGan.join(', ')}】 十神【天干 ${bazi.time.shishenGan} / 地支 ${bazi.time.shishenZhi.join(', ')}】 纳音【${bazi.time.nayin}】 空亡【${eightChar.getTimeXunKong()}】
命宫：【${eightChar.getMingGong()}】 身宫：【${lastCalculatedData.ziwei.lordOfBody || '-'}】 胎元：【${eightChar.getTaiYuan()}】
五行力量统计：木【${lastCalculatedData.wuxing['木']}%】 火【${lastCalculatedData.wuxing['火']}%】 土【${lastCalculatedData.wuxing['土']}%】 金【${lastCalculatedData.wuxing['金']}%】 水【${lastCalculatedData.wuxing['水']}%】
大运：【${yunOrderText}】 起运年龄【${startAge}】岁
大运列表：【${dayunListStr}】
当前流年：【${currentYearGanZhi}年】
  `;

  // 拼装紫微十二宫排盘数据
  const astrolabe = lastCalculatedData.ziwei;
  
  // 生年四化
  let shengnianSihua = [];
  astrolabe.palaces.forEach(p => {
    if (p.majorStars) {
      p.majorStars.forEach(s => {
        if (s.mutagen) {
          shengnianSihua.push(`${s.name}化${s.mutagen}`);
        }
      });
    }
  });
  const shengnianSihuaStr = shengnianSihua.length > 0 ? shengnianSihua.join('、') : '无';

  // 寻找身宫
  const bodyPalace = astrolabe.palaces.find(p => p.isBodyPalace);
  const bodyPalaceName = bodyPalace ? bodyPalace.name : '未知';

  // 计算当前虚岁和大限
  const nominalAge = new Date().getFullYear() - lunarObj.getYear() + 1;
  const currentDaxianPalace = astrolabe.palaces.find(p => {
    if (p.decadal && p.decadal.range) {
      return nominalAge >= p.decadal.range[0] && nominalAge <= p.decadal.range[1];
    }
    return false;
  });
  const daxianText = currentDaxianPalace ? 
    `当前大限落在【${currentDaxianPalace.name}】宫，主星【${currentDaxianPalace.majorStars ? currentDaxianPalace.majorStars.map(s => s.name).join(',') : '无主星'}】，年龄区间【${currentDaxianPalace.decadal.range[0]}】岁至【${currentDaxianPalace.decadal.range[1]}】岁` : 
    '无';

  // 计算流年命宫与流年四化
  const liunianPalace = astrolabe.palaces.find(p => p.earthlyBranch === currentLunar.getYearZhi());
  const liunianPalaceName = liunianPalace ? liunianPalace.name : '未知';
  const liunianSihuaStr = {
    '丙': '天同化禄、天机化权、文昌化科、廉贞化忌',
    '丁': '太阴化禄、天同化权、天府化科、巨门化忌',
    '戊': '贪狼化禄、太阴化权、右弼化科、天机化忌',
    '己': '武曲化禄、贪狼化权、天梁化科、文曲化忌',
    '庚': '太阳化禄、武曲化权、太阴化科、天同化忌',
    '辛': '巨门化禄、太阳化权、文曲化科、文昌化忌',
    '壬': '天梁化禄、紫微化权、左辅化科、武曲化忌',
    '癸': '破军化禄、巨门化权、太阴化科、贪狼化忌',
    '甲': '廉贞化禄、破军化权、武曲化科、太阳化忌',
    '乙': '天机化禄、天梁化权、紫微化科、太阴化忌'
  }[currentLunar.getYearGan()] || '无';

  const palacesListStr = astrolabe.palaces.map(p => {
    const majors = p.majorStars ? p.majorStars.map(s => s.name + (s.mutagen ? `(生年化${s.mutagen})` : '')).join(',') : '空宫';
    
    // 收集辅吉星与煞星，根据其 type 进行精准归类
    const luckyStars = [];
    const badStars = [];
    
    const checkAndClassify = (s) => {
      if (s.type === 'bad') {
        badStars.push(s.name);
      } else {
        luckyStars.push(s.name);
      }
    };
    
    if (p.minorStars) p.minorStars.forEach(checkAndClassify);
    if (p.badStars) p.badStars.forEach(checkAndClassify);
    
    const minors = luckyStars.length > 0 ? luckyStars.join(',') : '无辅星';
    const bads = badStars.length > 0 ? badStars.join(',') : '无煞星';
    
    return `${p.name}宫：【${p.heavenlyStem}${p.earthlyBranch}】【主星：${majors}】【辅星：${minors}、煞星：${bads}】`;
  }).join('\n');

  const formattedZiwei = `
十二宫完整信息：
${palacesListStr}
身宫落在：【${bodyPalaceName}】 来因宫：【${astrolabe.comingPalace || '无'}】
生年四化：【${shengnianSihuaStr}】
大限：【${daxianText}】
流年：【当前流年命宫在 ${currentLunar.getYearInGanZhi()} 对应的 ${liunianPalaceName} 宫，流年四化为 ${liunianSihuaStr}】
  `;

  return `你将扮演一位精通子平八字和紫微斗数的资深命理分析师。请严格按照以下说明，对我提供的命盘信息进行全面、深入、结构化的解析。请使用专业术语，但解释要通俗，语气亲和而客观，并避免绝对化的论断，始终提醒“命理是概率参考，人生仍由自己把握”。

【我的基础信息】
出生时间：${lastCalculatedData.solarDate} (公历) / ${lastCalculatedData.lunarDate} (农历)
性别：${gender}
出生地点：${location}
现居地：未提供

【八字排盘】
${formattedBazi}

【紫微斗数排盘】
${formattedZiwei}

【解析要求】
请严格按以下四部分进行综合解读，每个部分都要充分展开，必要时可对比印证。

一、八字命局深度分析
1. 日主强弱与格局：分析日主在月令的旺衰，全局的生扶克泄，判定身强或身弱，以及属于正格（如食神制杀、伤官佩印等）还是变格（从格、化格等），并解释格局成败。
2. 喜用神与忌神：明确指出喜神、用神、忌神、仇神，以五行和十神说明依据，并点出它们在原局的体现。
3. 性格特质：结合十神（正偏印、官杀、食伤等）和五行生克，描述性格的优点、弱点、思维模式和情绪倾向。
4. 事业与财运：分析官星、印星、财星、食伤的组合与力量，判断适合的行业方向，事业格局高低，财运的特点（正财/偏财/横财），以及求财的起伏年份。
5. 感情与婚姻：看夫妻宫（日支）和配偶星（正财/正官/七杀等），结合刑冲克合、十神喜忌，论婚姻早晚、配偶特征、感情关系中的注意点。
6. 健康隐患：从五行偏枯、干支冲克、疾病星（如金木交战、火炎土燥、枭神夺食等）和刑冲会合角度，提示易发部位和潜在疾病。
7. 六亲关系：简要描述与父母、子女、手足等关系的基调。
8. 大运走势详解：将每一步大运的干支与原局互动进行解读，指出哪几步运顺遂，哪几步需谨慎，并详细解读当前所处大运的各方面影响。

二、紫微斗数命局详细分析
1. 命宫与三方四正：命宫主星、辅星揭示的天赋、本性、人格面具，结合官禄宫、财帛宫、迁移宫的星曜及四化，描述外在表现和人生核心驱动力。
2. 十二宫精析：对夫妻、财帛、官禄、疾厄、迁移、福德等与我密切相关的宫位逐一解读，包括主星、辅星、四化以及宫位间的飞化影响。
3. 四化飞星脉络：以生年四化为起点，分析哪颗星化禄、化权、化科、化忌落在哪个宫位，牵动了哪些领域，形成怎样的因果链条与人生重心。
4. 特殊格局：判断命盘是否形成杀破狼、机月同梁、紫府同宫、月朗天门、明珠出海、马头带箭等格局，并说明其条件和应象。
5. 身宫影响：身宫所在宫位代表后天执着的领域，重点解读身宫星曜如何影响中年以后的发展重心。
6. 大限与流年：详细解读当前大限（十年大运）的整体趋势，再结合当前流年命宫、流年四化及各宫互动，断流年重点事件、机遇与挑战。

三、八字与紫微合参（相互印证）
1. 信息一致性：找到八字五行喜忌与紫微星曜五行属性的呼应与印证（如八字喜木，紫微命宫天机木星带科，强化智慧发展）。八字十神特质与紫微主星性格的对应（如正官格与紫微、天相坐命，都显稳重守规矩）。
2. 差异与补充：指出两套系统可能存在的矛盾之处（如八字财旺身弱，而紫微财帛宫却煞星汇聚，表示求财辛苦但机会仍多），并给出更立体的理解。
3. 合论运势：结合八字大运与紫微大限、流年，共同确认人生重大转折点，指出当前最重要的事件征象，给出综合趋避建议。

四、总结与具体建议
1. 性格与天赋总结：用简练语言概括核心人格、天赋优势及需突破的局限。
2. 人生重点课题：指出一生中反复出现的主题（如感情、金钱、健康等）。
3. 当前及近年建议：针对当下大运和流年，给出在事业、感情、财务、健康等方面的具体行动建议。
4. 修身方向：推荐适合的修行、学习方向或调整性情的方法，帮助趋吉避凶。

请严格遵循以上结构输出，每个部分都要有实质分析，不要用空话堆砌。在最后，请附上一句温暖鼓励的话，并重申命理仅供参考，自己才是人生的主人。`;
}

async function generateAiReport() {
  const apiKey = document.getElementById('apiKey').value.trim();
  if (!apiKey) {
    alert('请在右上方填入您的 Gemini API Key 才能向祖师爷求取命书！');
    return;
  }

  if (!lastCalculatedData) {
    alert('请先进行排盘计算！');
    return;
  }

  const btnReport = document.getElementById('btnRequestAiReport');
  btnReport.textContent = '祖师爷开坛做法中...';
  btnReport.disabled = true;

  appendChatMessage('assistant', '（祖师爷掐指一算，闭目沉思，正在为您撰写天地运势书……请稍候）');

  const prompt = buildDivinationPrompt();
  chatHistory.push({ role: 'user', parts: [{ text: prompt }] });

  try {
    const responseText = await callGeminiApi(apiKey, chatHistory);
    // 渲染 Markdown
    const htmlReport = marked.parse(responseText);
    
    // 清除刚才的“做法中”消息，并推入正式回复
    const chatBox = document.getElementById('chatBox');
    chatBox.removeChild(chatBox.lastChild); // 移去临时提示
    
    appendChatMessage('assistant', htmlReport, true);
    chatHistory.push({ role: 'model', parts: [{ text: responseText }] });
    
  } catch (err) {
    console.error(err);
    appendChatMessage('assistant', '（祖师爷做法受阻，天机被遮蔽。请检查您的 Gemini API Key 是否有效，或网络是否通畅。）');
  } finally {
    btnReport.textContent = '恭请祖师爷批命书';
    btnReport.disabled = false;
  }
}

function copyReportPrompt() {
  if (!lastCalculatedData) {
    alert('请先进行排盘计算！');
    return;
  }

  try {
    const prompt = buildDivinationPrompt();
    if (!prompt) {
      alert('排盘提示词内容为空，请重新排盘。');
      return;
    }
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(prompt).then(() => {
        alert('☯ 盘面详细数据与AI提示词已成功复制到剪贴板！\n您可以直接粘贴给任何网页端AI（如 ChatGPT、Claude、Kimi 等）进行深度合参分析。');
      }).catch(err => {
        console.error('复制失败: ', err);
        fallbackCopyText(prompt);
      });
    } else {
      fallbackCopyText(prompt);
    }
  } catch (err) {
    console.error('生成提示词时出错:', err);
    alert('生成提示词时出错，错误信息: ' + err.message + '\n请检查是否已正常进行“开启天机排盘”计算，或检查浏览器控制台。');
  }
}

function fallbackCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";  // 避免滚动到视图外部
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('☯ 盘面详细数据与AI提示词已成功复制到剪贴板！\n您可以直接粘贴给任何网页端AI（如 ChatGPT、Claude、Kimi 等）进行深度合参分析。');
    } else {
      alert('复制失败，请手动选择并复制。');
    }
  } catch (err) {
    console.error('Fallback 复制失败: ', err);
    alert('由于浏览器安全限制，自动复制失败，请查看控制台。');
  }
  document.body.removeChild(textArea);
}

async function sendChatMessage() {
  const apiKey = document.getElementById('apiKey').value.trim();
  const inputEl = document.getElementById('chatInput');
  const text = inputEl.value.trim();
  
  if (!text || !apiKey || !lastCalculatedData) return;

  inputEl.value = '';
  appendChatMessage('user', text);

  // 拼装用户对话上下文
  chatHistory.push({ role: 'user', parts: [{ text: text }] });

  // 临时提示
  appendChatMessage('assistant', '（祖师爷正在掐指推演中……）');

  try {
    const responseText = await callGeminiApi(apiKey, chatHistory);
    const chatBox = document.getElementById('chatBox');
    chatBox.removeChild(chatBox.lastChild); // 移除等待提示
    
    const htmlReply = marked.parse(responseText);
    appendChatMessage('assistant', htmlReply, true);
    chatHistory.push({ role: 'model', parts: [{ text: responseText }] });
  } catch (err) {
    console.error(err);
    const chatBox = document.getElementById('chatBox');
    chatBox.removeChild(chatBox.lastChild);
    appendChatMessage('assistant', '（祖师爷做法受阻，天机已被遮蔽。请检查网络或 API Key 状态。）');
  }
}

// 统一调用 Gemini API
async function callGeminiApi(apiKey, history) {
  // 使用标准的 gemini-2.5-flash
  let baseUrl = localStorage.getItem('gemini_api_url') || 'https://generativelanguage.googleapis.com';
  baseUrl = baseUrl.replace(/\/+$/, ''); // 移除末尾斜杠
  
  let url = `${baseUrl}/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  if (baseUrl.includes('generateContent')) {
    url = `${baseUrl}?key=${apiKey}`;
  }
  
  // 转换成 API 要求的 contents 数组格式
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    })
  });

  if (!response.ok) {
    throw new Error('Gemini API 调用失败');
  }

  const json = await response.json();
  return json.candidates[0].content.parts[0].text;
}

// 添加消息到 UI 聊天框
function appendChatMessage(sender, content, isHtml = false) {
  const chatBox = document.getElementById('chatBox');
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  
  const senderLabel = sender === 'assistant' ? 'AI 祖师爷' : '缘主';
  
  msgDiv.innerHTML = `
    <div class="msg-sender">${senderLabel}</div>
    <div class="msg-bubble">${isHtml ? content : escapeHtml(content)}</div>
  `;
  
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
