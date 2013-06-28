var SoldierData={
	1:{
		"name":"Basic Melee", // 士兵名称
		"atk":30, // 攻击力
		"def":20, // 防御力
		"mass":20, // 质量 决定碰撞时会产生的效果
		"blood":100, // 血量
		"radius":20, // 碰撞时用的半径
		"type":1, // 士兵类型 1近战 2远程 3魔法
		"friction":0.98, //摩擦力 决定弹射距离
		"resistance":0.85, //阻力 决定被撞击时后退的距离
		"agility":26, //敏捷 行动力 决定2次行动之间相隔时间
		"img":"Sprites/spriteRes/heros/knight.png", //英雄头像
		"skill1":1, //技能1的id
		"skill1_img":"Sprites/spriteRes/skills/2-1.png", //技能1图标
		"skill2":2, //技能2的id
		"skill2_img":"Sprites/spriteRes/skills/2-1.png", //技能2图标
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
		"img":"Sprites/spriteRes/heros/archer.png",
		"skill1":3, //技能1的id
		"skill1_img":"Sprites/spriteRes/skills/2-1.png", //技能1图标
		"skill2":4, //技能2的id
		"skill2_img":"Sprites/spriteRes/skills/2-1.png", //技能2图标
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
		"img":"Sprites/spriteRes/heros/wizard.png",
		"skill1":5, //技能1的id
		"skill1_img":"Sprites/spriteRes/skills/2-1.png", //技能1图标
		"skill2":6, //技能2的id
		"skill2_img":"Sprites/spriteRes/skills/2-1.png", //技能2图标
	}
}