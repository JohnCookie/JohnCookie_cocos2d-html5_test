var SimpleBloodSprite=cc.Sprite.extend({
	width: 40,
	blood: 100,
	ctor: function(){
		this._super();
	},
	draw: function(){
		this._super();
		
		var color=commonColor4B["red"];
		var r=color.r;
		var g=color.g;
		var b=color.b;
		var a=color.a
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=5;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";
        var start=new cc.Point(0,0);
        var end=new cc.Point(this.width,0);
        cc.drawingUtil.drawLine(start, end);
	},
	update: function(dt){

	}
});