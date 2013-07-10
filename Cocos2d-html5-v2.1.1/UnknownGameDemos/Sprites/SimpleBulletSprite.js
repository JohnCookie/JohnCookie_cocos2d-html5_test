// 射出的子弹
var SimpleBulletSprite = cc.Sprite.extend({
	id:0,
	radius:0,
	color:null,
	img:null,
	ox:0,
	oy:0,//初始的x y 计算射程用
	x:0,
	y:0,
	vx:0,
	vy:0,
	vr:0,
	power:0,
	bulletType:0, //0 普通子弹(击中目标就会消失) 1 穿透子弹(击中目标会继续前进 直到超出屏幕) 2 属性子弹 击中目标会给目标增加extra_debuff
	atk_buff:0,
	atk_buff_time:0,
	def_buff:0,
	def_buff_time:0,
	atk_debuff:0,
	atk_debuff_time:0,
	def_debuff:0,
	def_debuff_time:0,
	extra_buff:0,
	extra_buff_time:0,
	extra_debuff:0,
	extra_debuff_time:0,
	bulletHurted:new Array(),
	dist:100, //射程
	blood:100,
	ctor:function(x, y, color){
		this._super();

		this.setContentSize(10,10);

		this.x=x;
		this.y=y;
		this.ox=x;
		this.oy=y;
		this.color=color;
	},
	draw:function(){
		// The draw() method works itself every time canvas update
		var r=this.color.r;
		var g=this.color.g;
		var b=this.color.b;
		var a=this.color.a;
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=5;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";

        var size=this.getContentSize();

        cc.drawingUtil.drawCircle(cc.p(size.width/2, size.height/2), 5, 0, 60, false);
	},
	update:function(dt){
		// The drawing method don't work in update() method
		// cc.renderContext.fillStyle = "rgba(0,255,255,1)";
		// cc.renderContext.strokeStyle = "rgba(0,255,0,1)";
		// cc.drawingUtil.drawCircle(cc.p(this.x, this.y), 100, this.radius, 10, true);
	},
	getBulletPosition: function(){
		var pos=this.getPosition();
		return pos;
	}
});