// 弹射时显示的力量箭头
var SoldierMiniSprite = cc.Sprite.extend({
	__x:0,
	__y:0,
	type:1,
	ctor:function(type){
		this._super();

		this.type=type;
		var url=SoldierData[type]["img"];
		this.initWithFile(url);
	},
	update:function(dt){

	}
});