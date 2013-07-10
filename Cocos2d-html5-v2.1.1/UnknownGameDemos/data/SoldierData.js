var SoldierData={
	1:{
		"name":"Basic Melee", // 士兵名称
		"atk":30, // 攻击力
		"def":20, // 防御力
		"mass":15, // 质量 决定碰撞时会产生的效果
		"blood":100, // 血量
		"radius":20, // 碰撞时用的半径
		"type":1, // 士兵类型 1近战 2远程 3魔法
		"friction":0.98, //摩擦力 决定弹射距离
		"resistance":0.85, //阻力 决定被撞击时后退的距离
		"agility":26, //敏捷 行动力 决定2次行动之间相隔时间
		"dist":0,
		"img":"Sprites/spriteRes/heros/knight.png", //英雄头像
		"skill1":1, //技能1的id
		"skill2":2, //技能2的id
		"addition_atk":0,
		"addition_def":0,
		"addition_blood":0,
		"addition_agility":0
	},
	2:{
		"name":"Basic Ranged",
		"atk":35,
		"def":15,
		"mass":10,
		"blood":80,
		"radius":20,
		"type":2,
		"friction":0.88, //摩擦力 决定弹射距离
		"resistance":0.95, //阻力 决定被撞击时后退的距离
		"agility":30,
		"dist":550,
		"img":"Sprites/spriteRes/heros/archer.png",
		"skill1":3, //技能1的id
		"skill2":4, //技能2的id
		"addition_atk":0,
		"addition_def":0,
		"addition_blood":0,
		"addition_agility":0
	},
	3:{
		"name":"Basic Magic",
		"atk":40,
		"def":10,
		"mass":5,
		"blood":70,
		"radius":20,
		"type":3,
		"friction":0.85, //摩擦力 决定弹射距离
		"resistance":0.97, //阻力 决定被撞击时后退的距离
		"agility":36,
		"dist":550,
		"img":"Sprites/spriteRes/heros/wizard.png",
		"skill1":5, //技能1的id
		"skill2":6, //技能2的id
		"addition_atk":0,
		"addition_def":0,
		"addition_blood":0,
		"addition_agility":0
	},
	4:{
		"name":"Shaman",
		"atk":10,
		"def":18,
		"mass":10,
		"blood":85,
		"radius":20,
		"type":4,
		"friction":0.90, //摩擦力 决定弹射距离
		"resistance":0.93, //阻力 决定被撞击时后退的距离
		"agility":30,
		"dist":400,
		"img":"Sprites/spriteRes/heros/shaman.png",
		"skill1":7, //技能1的id
		"skill2":8, //技能2的id
		"addition_atk":0,
		"addition_def":0,
		"addition_blood":0,
		"addition_agility":0
	}
}