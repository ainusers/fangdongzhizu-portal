export class constant {

	// 房源过滤 - 供暖方式
	static heatingType = [{
			text: '集体供暖',
			id: 1
		},
		{
			text: '自供暖',
			id: 2
		}
	]

	// 房源过滤 - 价格区间
	static roomPriceRange = [{
			id: 1,
			text: '1500以下',
			value: '0-1500'
		},
		{
			id: 2,
			text: '1500-2500元',
			value: '1500-2500'
		},
		{
			id: 3,
			text: '2500-3500元',
			value: '2500-3500'
		},
		{
			id: 4,
			text: '3500-5000元',
			value: '3500-5000'
		},
		{
			id: 5,
			text: '5000-8000元',
			value: '5000-8000'
		},
		{
			id: 6,
			text: '8000-10000元',
			value: '8000-10000'
		},
		{
			id: 7,
			text: '10000以上',
			value: '10000-99999'
		},
	]

	static BJlist = [{
		label: "北京市",
		value: "1",
		children: [{
			id: "1022",
			label: "市辖区",
			value: "110100",
			children: [{
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
		}]
	}]

	// 房源过滤 - 户型筛选
	static roomList = [{
			text: '不限',
			id: '',
			val: ''
		},
		{
			text: '一居室',
			id: '1:1',
			val: '一居室'
		},
		{
			text: '两居室',
			id: '2:2',
			val: '两居室'
		},
		{
			text: '三居室',
			id: '3:3',
			val: '三居室'
		},
		{
			text: '四居室',
			id: '4:4',
			val: '四居室'
		},
		{
			text: '五居室',
			id: '5:5',
			val: '五居室'
		},
		{
			text: '五居室以上',
			id: '5:100',
			val: '五居室+'
		}
	]
	// 房源过滤 - 合租方式
	static leaseType = [{
			text: '整租',
			id: '0'
		},
		{
			text: '合租',
			id: '1'
		}
	]
	// 房源过滤 - 房间类型
	static houseType = [{
			text: '主卧',
			id: '0'
		},
		{
			text: '次卧',
			id: '1'
		}
	]
	// 房源过滤 - 有无电梯
	static noHas = [{
			id: 1,
			text: '有电梯'
		},
		{
			id: 2,
			text: '无电梯'
		}
	]
}