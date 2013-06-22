var SimpleBulletSprite = cc.Sprite.extend({
	id:0,
	radius:0,
	color:null,
	img:null,
	x:0,
	y:0,
	vx:0,
	vy:0,
	vr:0,
	blood:100,
	ctor:function(x, y, color){
		this._super();

		this.x=x;
		this.y=y;
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
        cc.drawingUtil.drawCircle(cc.p(this.x+Game.currWorldPoint.x, this.y+Game.currWorldPoint.y), 5, 0, 60, false);
	},
	update:function(dt){
		// The drawing method don't work in update() method
		// cc.renderContext.fillStyle = "rgba(0,255,255,1)";
		// cc.renderContext.strokeStyle = "rgba(0,255,0,1)";
		// cc.drawingUtil.drawCircle(cc.p(this.x, this.y), 100, this.radius, 10, true);
	},
	getPosition: function(){
		var pos={};
		pos.x=this.x;
		pos.y=this.y;
		return pos;
	}
});