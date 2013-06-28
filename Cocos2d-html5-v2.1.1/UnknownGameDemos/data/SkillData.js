/*
	技能分为很多类
	1 单次激活性技能 使用后对本身增加一个一次性效果（提升下次攻击力 提升下次防御力等）
	2 攻击性技能（包括发射治疗） 需要特殊进行处理
	3 buff类增益 使用后给予友方一个持续X轮的增益效果（增加防御力 攻击力等）
	4 debuff类减益 使用后对敌方施加一个持续X轮的减益效果（持续中毒等）
	以上 2、3、4处理时均为正常发射 之后通过状态值进行记录本身的状态
	1 单次激活类技能应该包含一个状态值id 代表人物处于的状态
	2 攻击性技能应包含一个atk参数表示攻击力（或治疗强度等）
	3 buff类增益应该包含一个buff id代表增益类型
	4 debuff类减益应该包含一个debuff id代表减益类型

	拟每个soldier拥有一个status数组 每得到一个状态 则放入一个状态值
*/
var SkillData={
	1:{
		"name":"Double Damage", // 技能名称
		"type":1, // 技能类型
		"atk_buff":1, // 技能提供的攻击buff id
		"atk_buff_time": 1, //持续的回合数
		"atk_debuff":0, // 技能提供的攻击debuff id
		"atk_debuff_time":0,
		"def_buff":0, // 技能提供的防御buff id
		"def_buff_time":0,
		"def_debuff":0, //技能提供的防御debuff id
		"def_debuff_time":0
	},
	2:{
		"name":"Shield Wall",
		"type":1,
		"atk_buff":0, // 技能提供的攻击buff id
		"atk_buff_time": 0, //持续的回合数
		"atk_debuff":0, // 技能提供的攻击debuff id
		"atk_debuff_time":0,
		"def_buff":1, // 技能提供的防御buff id
		"def_buff_time":1,
		"def_debuff":0, //技能提供的防御debuff id
		"def_debuff_time":0
	},
	3:{
		"name":"Split Arrow",
		"type":1,
		"atk_buff":1, // 技能提供的攻击buff id
		"atk_buff_time": 1, //持续的回合数
		"atk_debuff":1, // 技能提供的攻击debuff id
		"atk_debuff_time":1,
		"def_buff":1, // 技能提供的防御buff id
		"def_buff_time":1,
		"def_debuff":1, //技能提供的防御debuff id
		"def_debuff_time":1
	},
	4:{
		"name":"Piercing Arrow",
		"type":1,
		"atk_buff":1, // 技能提供的攻击buff id
		"atk_buff_time": 1, //持续的回合数
		"atk_debuff":1, // 技能提供的攻击debuff id
		"atk_debuff_time":1,
		"def_buff":1, // 技能提供的防御buff id
		"def_buff_time":1,
		"def_debuff":1, //技能提供的防御debuff id
		"def_debuff_time":1
	},
	5:{
		"name":"Ice Bolt",
		"type":1,
		"atk_buff":1, // 技能提供的攻击buff id
		"atk_buff_time": 1, //持续的回合数
		"atk_debuff":1, // 技能提供的攻击debuff id
		"atk_debuff_time":1,
		"def_buff":1, // 技能提供的防御buff id
		"def_buff_time":1,
		"def_debuff":1, //技能提供的防御debuff id
		"def_debuff_time":1
	},
	6:{
		"name":"Healing",
		"type":1,
		"atk_buff":1, // 技能提供的攻击buff id
		"atk_buff_time": 1, //持续的回合数
		"atk_debuff":1, // 技能提供的攻击debuff id
		"atk_debuff_time":1,
		"def_buff":1, // 技能提供的防御buff id
		"def_buff_time":1,
		"def_debuff":1, //技能提供的防御debuff id
		"def_debuff_time":1
	}
}