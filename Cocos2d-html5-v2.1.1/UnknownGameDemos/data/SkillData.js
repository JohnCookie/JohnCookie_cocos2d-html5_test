/*
	以下为设想 不表示真实实现结构
	技能分为很多类
	1 单次激活性技能 使用后对本身增加一个一次性效果（提升下次攻击力 提升下次防御力等）
	2 攻击性技能（包括发射治疗） 需要特殊进行处理
	3 buff类增益 使用后给予友方一个持续X轮的增益效果（增加防御力 攻击力等）
	4 debuff类减益 使用后对敌方施加一个持续X轮的减益效果（持续中毒等）
	以上 2、3、4处理时均为正常发射 之后通过状态值进行记录本身的状态
	1 单次激活类技能应该包含一个状态值id 代表人物处于的状态
	2 攻击性技能应包含一个power参数表示攻击力（或治疗强度等）
	3 buff类增益应该包含一个buff id代表增益类型
	4 debuff类减益应该包含一个debuff id代表减益类型

	拟每个soldier拥有一个status数组 每得到一个状态 则放入一个状态值
*/
/*
	正式的
	type 1: 给自身激活某种buff/debuff的技能 （双倍攻击，盾墙等） 使用后 仍要继续进行一轮基础行动
	type 2: 发射性技能 固定伤害的攻击技能 射出子弹等
*/
var SkillData={
	1:{
		"name":"Double Damage", // 技能名称 获得buff 使下回合攻击力翻倍
		"type":1, // 技能类型
		"atk_buff":1, // 技能提供的攻击buff id
		"atk_buff_time": 1, //持续的回合数
		"atk_debuff":0, // 技能提供的攻击debuff id
		"atk_debuff_time":0,
		"def_buff":0, // 技能提供的防御buff id
		"def_buff_time":0,
		"def_debuff":0, //技能提供的防御debuff id
		"def_debuff_time":0,
		"img":"Sprites/spriteRes/skills/1.png",
		"cd":15
	},
	2:{
		"name":"Shield Wall", // 获得buff 使防御力提高1.5倍 持续8个行动回合
		"type":1,
		"atk_buff":0, // 技能提供的攻击buff id
		"atk_buff_time": 0, //持续的回合数
		"atk_debuff":0, // 技能提供的攻击debuff id
		"atk_debuff_time":0,
		"def_buff":1, // 技能提供的防御buff id
		"def_buff_time":8,
		"def_debuff":0, //技能提供的防御debuff id
		"def_debuff_time":0,
		"img":"Sprites/spriteRes/skills/2.png",
		"cd":20
	},
	3:{
		"name":"Split Arrow", // 分裂箭 射出3个方向的箭
		"type":2,
		"power": 45,
		"img":"Sprites/spriteRes/skills/3.png",
		"cd":25
	},
	4:{
		"name":"Piercing Arrow", // 穿透箭 射出具有穿透力的箭
		"type":2,
		"power":38, 
		"img":"Sprites/spriteRes/skills/4.png",
		"cd":20
	},
	5:{
		"name":"Ice Bolt", // 冰箭术 射出冰箭 对目标造成伤害并且使受到伤害的目标行动力降低一半 持续5个行动回合
		"type":2,
		"power":40,
		"extra_debuff":1,
		"extra_debuff_time":5,
		"img":"Sprites/spriteRes/skills/5.png",
		"cd":18
	},
	6:{
		"name":"Healing", // 治愈术 对友方目标治疗回复血量
		"type":2,
		"power":20, // 技能提供的攻击buff id
		"img":"Sprites/spriteRes/skills/6.png",
		"cd":22
	},
	7:{
		"name":"Pray/Curse", // 诅咒 友方增加攻击和防御buff 地方增加攻击和防御debuff
		"type":2,
		"power":0, // 技能提供的攻击buff id
		"atk_buff":2,
		"atk_buff_time":99,
		"def_buff":2,
		"def_buff_time":99,
		"atk_debuff":1,
		"atk_debuff_time":99,
		"def_debuff":1,
		"def_debuff_time":99,
		"img":"Sprites/spriteRes/skills/7.png",
		"cd":12
	},
	8:{
		"name":"Healing Totem", // 治疗图腾 范围内所有友方受3倍治疗
		"type":3,
		"extra_buff":1,
		"radius":150,
		"duration":25,
		"img":"Sprites/spriteRes/skills/8.png",
		"cd":32
	}
}