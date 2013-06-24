// 精灵显示主体
var SimpleShapeSprite=cc.Sprite.extend({
	type: 0,//1 近战 2 远程 3 魔法
	team: 0,
	width: 40,
	height: 40,
	radius: 20,
	scale: 1,
	teamColor: new Array(commonColor4B["red"],commonColor4B["green"]),
	ctor: function(type,team){

		this.type=type;
		this.team=team;

		this.initWithFile("Sprites/spriteRes/hero.png");

		var size=this.getContentSize();
		this.scale=this.width/size.width;
		this.setScale(this.scale);
	},
	draw: function(){
		this._super();
		
		var color=this.teamColor[this.team];
		var r=color.r;
		var g=color.g;
		var b=color.b;
		var a=color.a
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=4;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";

        var position=new cc.Point(0,0);
        switch(this.type){
        	case 1:
        		//近战兵 画圈
        		var center=new cc.Point(0,0);
        		cc.drawingUtil.drawCircle(center, this.radius/this.scale, 0, 60, false);
        		break;
        	case 2:
        		//远程兵 画三角
        		var point1=new cc.Point(0-this.width/2/this.scale,0-this.height/2/this.scale);
        		var point2=new cc.Point(0,this.height/2/this.scale);
        		var point3=new cc.Point(this.width/2/this.scale,0-this.height/2/this.scale);
        		cc.drawingUtil.drawPoly(new Array(point1,point2,point3),3,true,false);
        		break;
        	case 3:
        		//魔法兵 画方块
        		var point1=new cc.Point(0-this.width/2/this.scale,0-this.height/2/this.scale);
        		var point2=new cc.Point(0-this.width/2/this.scale,this.height/2/this.scale);
        		var point3=new cc.Point(this.width/2/this.scale,this.height/2/this.scale);
        		var point4=new cc.Point(this.width/2/this.scale,0-this.height/2/this.scale);
        		cc.drawingUtil.drawPoly(new Array(point1,point2,point3,point4),4,true,false);
        		break;
        }

        if(Game.showSpriteCollisionBorder){
	        //画出碰撞检测圈
	        cc.renderContext.fillStyle = "rgba(100,100,100,255)";
			cc.renderContext.lineWidth=3;
	        cc.renderContext.strokeStyle = "rgba(100,100,100,255)";
	        var center=new cc.Point(0,0);
	        cc.drawingUtil.drawCircle(center, this.radius/this.scale, 0, 60, false);
	    }
	},
	update: function(dt){

	}
});