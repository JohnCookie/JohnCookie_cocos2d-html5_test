// 弹射时显示的力量箭头
var SoldierMiniSprite = cc.Sprite.extend({
	__x:0,
	__y:0,
	type:1,
	width:32,
	height:32,
	ctor:function(type){
		this._super();

		this.type=type;
		var url=SoldierData[type]["img"];
		this.initWithFile(url);

		this.setScale(this.width/this.getContentSize().width);
	},
	update:function(dt){

	}
});