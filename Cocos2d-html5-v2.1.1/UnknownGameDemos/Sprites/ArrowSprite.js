// 弹射时显示的力量箭头
var ArrowSprite = cc.Sprite.extend({
	__rotate:0,
	__length:0,
	__x:0,
	__y:0,
	ctor:function(){
		this.initWithFile("Sprites/spriteRes/arrow.png");
		this.setAnchorPoint(cc.PointMake(0.5,0));
	},
	update:function(dt){

	}
});