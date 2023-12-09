export class constant {
	
	// 房屋价格区间
	static roomPriceRange=[
		{
			id:1,
			text:'1500以下',
			value:'0-1500'
		},
		{
			id:2,
			text:'1500-2500元',
			value:'1500-2500'
		},
		{
			id:3,
			text:'2500-3500元',
			value:'2500-3500'
		},
		{
			id:4,
			text:'3500-5000元',
			value:'3500-5000'
		},
		{
			id:5,
			text:'5000-8000元',
			value:'5000-8000'
		},
		{
			id:6,
			text:'8000-10000元',
			value:'8000-10000'
		},
		{
			id:7,
			text:'10000以上',
			value:'10000-99999'
		},
	]
	
	static Blist= [
        {
          label: "北京市",
          value: "1",
          children: [
            {
              id: "1022",
              label: "市辖区",
              value: "110100",
              children: [
                {
                  id: "44",
                  label: "东城区",
                  value: "110101",
                },
                {
                  id: "45",
                  label: "西城区",
                  value: "110102",
                },
                {
                  id: "46",
                  label: "朝阳区",
                  value: "110105",
                },
                {
                  id: "47",
                  label: "丰台区",
                  value: "110106",
                },
                {
                  id: "48",
                  label: "石景山区",
                  value: "110107",
                },
                {
                  id: "49",
                  label: "海淀区",
                  value: "110108",
                },
                {
                  id: "50",
                  label: "门头沟区",
                  value: "110109",
                },
                {
                  id: "51",
                  label: "房山区",
                  value: "110111",
                },
                {
                  id: "52",
                  label: "通州区",
                  value: "110112",
                },
                {
                  id: "53",
                  label: "顺义区",
                  value: "110113",
                },
                {
                  id: "54",
                  label: "昌平区",
                  value: "110114"
                },
                {
                  id: "55",
                  label: "大兴区",
                  value: "110115",
                },
                {
                  id: "56",
                  label: "怀柔区",
                  value: "110116",
                },
                {
                  id: "57",
                  label: "平谷区",
                  value: "110117",
                },
				{
				  id: "58",
				  label: "密云区",
				  value: "110228",
				},
				{
				  id: "59",
				  label: "延庆区",
				  value: "110229",
				}
              ]
            }
          ]
		}
	]
	
	// 户型筛选
	static roomList =  [
		{ text: '不限', id: '',val:'' },
		{ text: '一居室', id: '1:1',val:'一居室' },
		{ text: '两居室', id: '2:2' ,val:'两居室'},
		{ text: '三居室', id: '3:3',val:'三居室' },
		{ text: '四居室', id: '4:4',val:'四居室' },
		{ text: '五居室', id: '5:5' ,val:'五居室'},
		{ text: '五居室以上', id: '5:100',val:'五居室+' }
	];
	static bulletRoomList =  [
		{ text: '不限', id: '' },
		{ text: '一室', id: '1:1' },
		{ text: '二室', id: '2:2' },
		{ text: '三室', id: '3:3' },
		{ text: '四室', id: '4:4' },
		{ text: '五室', id: '5:5' },
		{ text: '五室以上', id: '5:100' }
	];
	// 来源筛选
	static sourceLsit = [
		{ text: '业主房源', id: '0' },
		{ text: '经纪人', id: '1' }
	];
	static leaseType=[
		{ text: '整租', id: '0' },
		{ text: '合租', id: '1' }
	]
	static houseType=[
		{ text: '主卧', id: '0' },
		{ text: '次卧', id: '1' }
	]
	// 面积筛选
	static areaList = [
		{ text: '50以下', id: '0:50' },
		{ text: '50-70', id: '50:70' },
		{ text: '70-90', id: '70:90' },
		{ text: '90-110', id: '90:110' },
		{ text: '110以上', id: '110:999' }
	];
	// 类型筛选
	static typeLsit = [
		{ text: '住宅', id: 1 },
		{ text: '别墅', id: 2 },
		{ text: '商铺', id: 3 },
		{ text: '写字楼', id: 4 },
		{ text: '其他', id: 8 }
	];
	// 新房类型筛选(就是用途)
	static newHouseTypeList = [
		{ text: "不限", id: "" },
		{ text: '住宅', id: 1 },
		{ text: '别墅', id: 2 },
		{ text: '商铺', id: 3 },
		{ text: '写字楼', id: 4 },
		{ text: "旅游地产", id: 5}
	];
	
	// 特色筛选
	static specialList = [
		{ text: '两证齐全', id: 1 },
		{ text: '满两年', id: 2 },
		{ text: '免税', id: 3 },
		{ text: '急售', id: 4 },
		{ text: '顶楼花园', id: 7 },
		{ text: '底楼花园', id: 8 },
		{ text: '带车位', id: 64 },
		{ text: '地下室', id: 96 }
	];
	
	// 装修情况
	static zhuangXiuList = [
		{ id: '2', text: '简装' },
        { id: '3', text: '精装' },
        { id: '6', text: '豪装' },
        { id: '1', text: '毛坯' },
        { id: '7', text: '不限' }
	];
	
	
	// -------- 委托相关 --------------
	// 类型
	static entrustHouseTypeList = [
		{ id: 1, text: "住宅" },
        { id: 2, text: "别墅" },
        { id: 3, text: "商铺" },
        { id: 4, text: "写字楼" }
	];
	// 装修情况
	static entrustZhuangXiuList = [
		{ id: '2', text: '简装' },
        { id: '3', text: '精装' },
        { id: '6', text: '豪装' },
        { id: '1', text: '毛坯' },
        { id: '7', text: '不限' },
	];
	// 室
	static entrustRoomList = [
		{ id: '1', text: '一室' },
        { id: '2', text: '二室' },
        { id: '3', text: '三室' },
        { id: '4', text: '四室' },
        { id: '5', text: '五室' },
        { id: '20', text: '五室以上' }
	];
	
	//佣金比例
    static feeMap = {
		1: [{ fee: '0.01|0.015', name: '1-1.5', unit: '%' }, { fee: '0.015|0.02', name: '1.5-2', unit: '%' }],//求购
        3: [{ fee: '0.01|0.015', name: '1-1.5', unit: '%' }, { fee: '0.015|0.02', name: '1.5-2', unit: '%' }],//求购
        4: [{ fee: '0|0.5', name: '10-15', unit: '天' }, { fee: '0.5|1', name: '15-20', unit: '天' }],//求租
    };
	
	// 经纪人性别
	static sexMap = [
        { id: 1, text: "帅哥", headImg: "https://zdzfapi.haofang.net/PublicC/images/publish/index/sex-man.png" },
        { id: 2, text: "美女", headImg: "https://zdzfapi.haofang.net/PublicC/images/publish/index/sex-woman.png" },
    ];
	
	// 房屋配套情况
	static housePeiTaoMap = [
		{ id: 7, text: "宽带" },
		{ id: 13, text: "热水器" },
		{ id: 9, text: "洗衣机" },
		{ id: 10, text: "冰箱" },
		{ id: 21, text: "衣柜" },
		{ id: 44, text: "厨房" },
		{ id: 11, text: "空调" },
		{ id: 27, text: "暖气" },
	];
	
	//出租房间类型
	static chuZuRoomTypeList = [
		{ id: 2, text: "次卧" },
		{ id: 3, text: "主卧" },
		{ id: 4, text: "单间" },
		{ id: 1, text: "不限" }
	];
	// 租金类型
	static zuJinTypeList = [
		{ id: 1, text: "月付" },
		{ id: 2, text: "季付" },
		{ id: 3, text: "半年付" },
		{ id: 4, text: "年付" },
		{ id: 5, text: "面议" },
	];
	
	//房屋装修情况数组:
	static houseFitmentMap = [
		{ id: 5, text: "豪装" },
		{ id: 4, text: "精装" },
		{ id: 2, text: "简装" },
		{ id: 1, text: "毛坯" },
		{ id: 7, text: "不限" },
	];
	static noHas=[
		{
			id:1,text:'有电梯'
		},
		{
			id:2,text:'无电梯'
		}
	];
	
	
}


export class ErHouseListItem {
	compId = ""; // 公司id
	isTopHouse = false; // 是否是置顶房源
    houseId = "";
    buildId = "";
    houseImg = "";    // 房屋图片
    houseTitle = "";   // 房屋顶部title
	shareTitle = "";  // 简短的title
    houseTing = "";   // 厅/室/卫
	houseRoom = "";  // 室
	houseHall = "";  // 厅
	houseWei = "";  // 卫
    houseArea = "";     // 面积数值
    houseAreaUnit = "m²";  // 面积单位
    houseAddress = "";   // 地理位置文案
    houseName = "";   // 房源名称
    houseTags = [];  // 标签数组
    houseTotalPrice = "";   // 总价数值，也可以代表租房的单价
    houseTotalPriceUnit = "";   // 总价单位， 也可以代表租房的价格单位
    housePriceOfArea = "";  // 单位面积的价格数值  （已弃用）
    housePriceOfAreaUnit = "";   // 单位面积的价格单位  （已启用）
    hasVr = false;   // 是否有vr
    hasVideo = false;   // 是否有video
    cityId = "";   // 房源所在的城市id
    caseType = "";  // 房源类型  1 代表二手房
    reSource = "";  // 来源
    trueHouse = false;  // 是否是真房源

	isShowBrowseNum = "";  // 是否显示浏览次数

	houseUseage = "";  // 类型id 如：1 = 住宅
	houseUseageCn = "";  // 类型id对应的文案
	
	regionName = "";  // 区域
	sectionName = "";  // 商圈

	pageFrom = "";  // 从那个页面进入 例如: entrustDetail: 委托详情  personalStore: 个人微店
	archiveId = ""; // 经纪人id
}

export class NewHouseListItem {
    buildId = "";
    buildStatus = "";  // 房屋状态
    buildImg = "";    // 房屋图片
    buildTing = "";   // 厅和室
    buildArea = "";     // 面积数值
    buildAreaUnit = "";  // 面积单位
    buildAddress = "";   // 地理位置文案
    buildName = "";   // 房源名称
    buildTags = [];  // 标签数组
    buildPriceOfArea = "";  // 单位面积的价格数值
    buildPriceOfAreaUnit = "元/㎡";   // 单位面积的价格单位
    isHotSale = false;  // 是否是热销
    cityId = "";   // 房源所在的城市id
	caseType = "";  // 房源类型  4 代表新房
	buildAreaMin = ""; // 面积最小值
	buildAreaMax = "";  // 面积最大值
	couponFlag = 0; // 优惠券
}

export class ZuHouseListItem {
    houseId = "";
    houseImg = "";    // 房屋图片
    houseTitle = "";   // 房屋顶部title
    houseTing = "";   // 厅和室
    houseArea = "";     // 面积数值
    houseAreaUnit = "";  // 面积单位
    houseAddress = "";   // 地理位置文案
    houseName = "";   // 房源名称
    houseTags = [];  // 标签数组
    housePriceOfMonth = "";  // 每月的价格数值
    housePriceOfMonthUnit = "";   // 每月的价格单位
    hasVr = false;   // 是否有vr
    hasVideo = false;   // 是否有video
    cityId = "";   // 房源所在的城市id
    caseType = "";  // 房源类型
    reSource = "";  // 来源
}

export class ApartmentHouseListItem {
    houseId = "";
    houseImg = "";    // 房屋图片来源文案
    houseTing = "";   // 厅和室和卫
    houseAddress = "";   // 地理位置文案
    houseName = "";   // 房源名称
    houseTags = [];  // 标签数组
    houseResourceText = "";  // 提供方文案
    housePriceOfMonth = "";  // 每月的价格数值
    housePriceOfMonthUnit = "";   // 每月的价格单位
	apartmentUuid = "";
	roomUuid = "";
	rentType = "";
	houseSource = ""; // 房屋来源 例如：优客逸家
	houseJianText = ""; // 房间名称 例如：D房间
}


// 房源列表上经纪人的字段信息
export class HouseListAgentItem {
	zhuangXiuStatusId = "";  // 装修情况
	zhuangXiuStatusName = "";
	roomId = "";  // 几室id
	roomName = "";
	regionId = "";
	regionName = "";
	houseTypeId = ""; // 房屋类型id
	houseTypeName = ""; // 房屋类型文案
	buildId = "";
	buildName = ""; // 服务的小区名称
	buildAddress = "";  // 服务的区域
	agentHeaderImg = "";  // 经纪人头像
	archiveId = ""; // 聊天id
	agentName = "";  // 经纪人名称
	agentPhone = ""; // 经纪人电话
	isExit = ""; // 是否显示  不等于0显示
	caseId = ""; // 房源id
	caseType = "";  // 房源类型
	cityId = ""; // 城市id
	reSource = 1;  // 来源
	noBoxShadow = false;  // 不显示view 的 box-shadow style
}

// 开单豹列表数据格式
export class kaidanbaoHouseItem {
	houseId = "";		// 房屋ID
	houseImg = "";		// 图片
	houseTitle = "";		// 简介
	houseTing = ""; // 3室2厅
	houseArea = "";		// 120㎡
	houseDirectCn = "";		//  朝向
	houseName = "";			// 房屋名称
	housePriceOfArea = "";	// 单价
	housePriceOfAreaUnit = "";		// 单价单位
	houseTotalPrice = "";		// 房屋总价
	houseTotalPriceUnit = "";			// 房屋总价单位
	houseTags = [];	// 标签
}
