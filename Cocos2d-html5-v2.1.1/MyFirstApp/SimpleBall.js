var SimpleBall = cc.Sprite.extend({
	radius:0,
	color:null,
	img:null,
	x:0,
	y:0,
	vx:0,
	vy:0,
	count:0,
	isDragged:false,
	vr:0,
	mass:0,
	isActive:true,
	ctor:function(x, y, radius, mass, color){
		this._super();

		this.x=x;
		this.y=y;
		this.radius=radius;
		this.mass=mass;
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
        cc.drawingUtil.drawCircle(cc.p(this.x, this.y), this.radius, 0, 60, true);
	},
	update:function(dt){
		// The drawing method don't work in update() method
		// cc.renderContext.fillStyle = "rgba(0,255,255,1)";
		// cc.renderContext.strokeStyle = "rgba(0,255,0,1)";
		// cc.drawingUtil.drawCircle(cc.p(this.x, this.y), 100, this.radius, 10, true);
	}
});