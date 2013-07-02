// buff debuff状态精灵 用以显示士兵处于的状态
var SimpleStatusSprite=cc.Sprite.extend({
	width: 12,
	height: 12,
	scale: 1,
	type: 1, // 1 atk_buff, 2 atk_debuff, 3 def_buff, 4 def_debuff, 5 extra_buff, 6 extra_debuff
	ctor: function(type,id){
		this._super();

		this.type=type;

		var url="";
		switch(type){
			case 1:
				url=AtkBuffData[id]["img"];
				break;
			case 2:
				url=AtkDebuffData[id]["img"];
				break;
			case 3:
				url=DefBuffData[id]["img"];
				break;
			case 4:
				url=DefDebuffData[id]["img"];
				break;
			case 5:
				url=ExtraBuffData[id]["img"];
				break;
			case 6:
				url=ExtraDebuffData[id]["img"];
				break;
		}
		this.initWithFile(url);
		// this.initWithFile("Sprites/spriteRes/hero.png");

		var size=this.getContentSize();
		this.scale=this.width/size.width;
		this.setScale(this.scale);
	},
	setStatus: function(type,id){
		var url="";
		switch(type){
			case 1:
				url=AtkBuffData[id]["img"];
				break;
			case 2:
				url=AtkDebuffData[id]["img"];
				break;
			case 3:
				url=DefBuffData[id]["img"];
				break;
			case 4:
				url=DefDebuffData[id]["img"];
				break;
			case 5:
				url=ExtraBuffData[id]["img"];
				break;
			case 6:
				url=ExtraDebuffData[id]["img"];
				break;
		}
		this.initWithFile(url);
	}
});