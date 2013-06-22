var Game={}; //根对象
Game.width=800;
Game.height=480;
Game.mapWidth=1280;
Game.mapHeight=1280;
Game.currWorldPoint=new cc.Point(0,0);
Game.showSpriteBorder=true;
Game.showSpriteCollisionBorder=false;

var commonColor4B={
	"red":new cc.Color4B(255,0,0,255),
	"green":new cc.Color4B(0,255,0,255),
	"blue":new cc.Color4B(0,0,255,255),
	"black":new cc.Color4B(0,0,0,255),
	"white":new cc.Color4B(255,255,255,255)
}
var commonColor3B={
	"red":new cc.Color3B(255,0,0),
	"green":new cc.Color3B(0,255,0),
	"blue":new cc.Color3B(0,0,255),
	"black":new cc.Color3B(0,0,0),
	"white":new cc.Color3B(255,255,255)
}
// 数组中删除第n个元素
Array.prototype.del=function(n) {
	if(n<0){
		return this;
	}else{
		return this.slice(0,n).concat(this.slice(n+1,this.length));
	}
}