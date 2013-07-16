var MinimapSprite=cc.Sprite.extend({
	width: 128,
	height: 128,
	ctor: function(){
		this.setContentSize(new cc.Size(this.width,this.height));
	},
	update: function(dt){

	},
	draw: function(){
		var color=commonColor4B['black'];
		var r=color.r;
		var g=color.g;
		var b=color.b;
		var a=color.a
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=2;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";
		// 画外框
		var borderP1=new cc.Point(0,0);
		var borderP2=new cc.Point(0,this.height);
		var borderP3=new cc.Point(this.width,this.height);
		var borderP4=new cc.Point(this.width,0);
		cc.drawingUtil.drawLine(borderP1, borderP2);
		cc.drawingUtil.drawLine(borderP2, borderP3);
		cc.drawingUtil.drawLine(borderP3, borderP4);
		cc.drawingUtil.drawLine(borderP4, borderP1);

		// 画现在显示的地图框
		var innerBP1=new cc.Point(-Game.currWorldPoint.x/10,-Game.currWorldPoint.y/10);
		var innerBP2=new cc.Point(-Game.currWorldPoint.x/10+Game.width/10,-Game.currWorldPoint.y/10);
		var innerBP3=new cc.Point(-Game.currWorldPoint.x/10+Game.width/10,-Game.currWorldPoint.y/10+Game.height/10);
		var innerBP4=new cc.Point(-Game.currWorldPoint.x/10,-Game.currWorldPoint.y/10+Game.height/10);
		cc.drawingUtil.drawLine(innerBP1, innerBP2);
		cc.drawingUtil.drawLine(innerBP2, innerBP3);
		cc.drawingUtil.drawLine(innerBP3, innerBP4);
		cc.drawingUtil.drawLine(innerBP4, innerBP1);
		
		// 画地图上士兵的点 缩小10倍 圆直径为6
		var teamSoldiers1=this.getParent().getParent().mainLayer.teamArr1;
		color=commonColor4B['red'];
		r=color.r;
		g=color.g;
		b=color.b;
		a=color.a
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=2;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";
        for(var i=0;i<teamSoldiers1.length;i++){
        	var center=new cc.Point(teamSoldiers1[i].x/10,teamSoldiers1[i].y/10);
        	cc.drawingUtil.drawCircle(center, 3, 0, 30, false);
        }

		var teamSoldiers2=this.getParent().getParent().mainLayer.teamArr2;
		color=commonColor4B['green'];
		r=color.r;
		g=color.g;
		b=color.b;
		a=color.a
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=2;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";
        for(var i=0;i<teamSoldiers2.length;i++){
        	var center=new cc.Point(teamSoldiers2[i].x/10,teamSoldiers2[i].y/10);
        	cc.drawingUtil.drawCircle(center, 3, 0, 30, false);
        }

	}
});