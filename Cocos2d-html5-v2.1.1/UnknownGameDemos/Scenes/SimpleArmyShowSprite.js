var SimpleArmyShowSprite=cc.Sprite.extend({
	width: 600,
	height: 60,
	ctor: function(){
		this._super();

		this.setContentSize(new cc.Size(this.width,this.height));
	},
	draw: function(){
		var color=commonColor3B['blue'];
		var r=color.r;
		var g=color.g;
		var b=color.b;
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+",255)";
		cc.renderContext.lineWidth=2;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+",255)";
        var point1=new cc.Point(0,0);
        var point2=new cc.Point(this.width,0);
        var point3=new cc.Point(this.width,this.height);
        var point4=new cc.Point(0,this.height);
        cc.drawingUtil.drawPoly(new Array(point1,point2,point3,point4),4,true,false);

        for(var i=1;i<=9;i++){
        	var start=new cc.Point(this.height*i,0);
	        var end=new cc.Point(this.height*i,this.height);
	        cc.drawingUtil.drawLine(start, end);
        }
	},
	update: function(dt){

	}
});