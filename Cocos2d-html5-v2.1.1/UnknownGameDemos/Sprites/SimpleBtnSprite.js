// 按钮类
var SimpleBtnSprite=cc.Sprite.extend({
	state:0, //0 未激活状态 1 激活状态 用于显示
	layerColor:null, //底色层
	ttfLabel:null, //文字
	hasBorder:false, //是否描边
	ctor: function(bgColor,size,textColor,hasBorder){ //背景色 Color4B 按钮大小 cc.Size 文本颜色 Color3B hasBorder 是否描边
		this._super();

		// 按钮大小
		this.setContentSize(size);
		// 背景层
		this.layerColor=cc.LayerColor.create(bgColor,size.width,size.height);
		this.addChild(this.layerColor,0,0);
		// 文本
		this.ttfLabel=cc.LabelTTF.create("Test", "Arial", 18);
		this.ttfLabel.setColor(textColor);
		this.ttfLabel.setPosition(size.width/2,size.height/2);
		this.addChild(this.ttfLabel,1,1);
		// 是否描边
		this.hasBorder=hasBorder;
	},
	draw: function(){
		if(this.hasBorder){
			// 进行描边
			var color=this.ttfLabel.getColor();
			var r=color.r;
			var g=color.g;
			var b=color.b;
			cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+",255)";
			cc.renderContext.lineWidth=2;
	        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+",255)";
	        var position=new cc.Point(0,0);
	        var size=this.getContentSize();
	        var point1=position;
	        var point2=new cc.Point(position.x+size.width,position.y);
	        var point3=new cc.Point(position.x+size.width,position.y+size.height);
	        var point4=new cc.Point(position.x,position.y+size.height);
	        cc.drawingUtil.drawPoly(new Array(point1,point2,point3,point4),4,true,false);
	    }
	},
	update: function(dt){

	},
	setString: function(string){ // 改变文字
		this.ttfLabel.setString(string);
	},
	getString: function(){
		return this.ttfLabel.getString();
	},
	setBgColor: function(bgColor){ // 改变背景色
		this.layerColor.setColor(bgColor);
	},
	setTextColor: function(textColor){ // 改变文本色
		this.ttfLabel.setColor(textColor);
	}
});