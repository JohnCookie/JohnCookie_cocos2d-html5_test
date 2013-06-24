// 标示当前目标的框
var SimpleEffectSprite=cc.Sprite.extend({
	width:0,
	height:0,
	ctor: function(width,height){
		this._super();
		this.setContentSize(width,height);
		this.width=width;
		this.height=height;
	},
	draw: function(){
		var color=commonColor4B['black'];
		var r=color.r;
		var g=color.g;
		var b=color.b;
		var a=color.a
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=4;
                cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";

                // 画出目标框（4个角）
                var start=new cc.Point(0,0);
                var end=new cc.Point(0+8,0);
                cc.drawingUtil.drawLine(start, end);

                start.x=this.width-8;
                end.x=this.width;
                cc.drawingUtil.drawLine(start, end);

                start.x=this.width;
                end.y=0+8;
                cc.drawingUtil.drawLine(start, end);

                start.y=this.height-8;
                end.y=this.height;
                cc.drawingUtil.drawLine(start, end);

                start.y=this.height;
                end.x=this.width-8;
                cc.drawingUtil.drawLine(start, end);

                start.x=0+8;
                end.x=0;
                cc.drawingUtil.drawLine(start, end);

                start.x=0;
                end.y=this.height-8;
                cc.drawingUtil.drawLine(start, end);

                start.y=0+8;
                end.y=0;
                cc.drawingUtil.drawLine(start, end);
	},
	update: function(){

	}
})