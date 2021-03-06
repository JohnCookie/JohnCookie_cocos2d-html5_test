var Game={}; //根对象
Game.width=800;
Game.height=480;
Game.mapWidth=1280;
Game.mapHeight=1280;
Game.currWorldPoint=new cc.Point(0,0);
Game.showSpriteBorder=false;
Game.showSpriteCollisionBorder=false;
Game.targetShowed=false;
// 游戏状态标示
Game.gameStatus=0;
Game.underSkill=0; //处于某一技能状态下
Game.playWithAI=1; // 是否与AI作战
Game.status={};
Game.status.NORMAL=0; // 正常状态(可以点击按钮 使用技能 弹射士兵的状态)
Game.status.ANIM_ON=1; // 播放动画状态
Game.status.PAUSE=2; // 暂停状态
Game.status.END=3; // 游戏结束

//调整数值用的
Game.remainPoint=10;
//双方的军队
Game.team1Soldiers=new Array(1,1,2,2,3);
Game.team2Soldiers=new Array(1,1,2,2,3);

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
	if(n<0 || n>=this.length){
		return this;
	}else{
		return this.slice(0,n).concat(this.slice(n+1,this.length));
	}
}
// 数组根据某属性排序
Array.prototype.sortByKey=function(key){
	for(var i=0;i<this.length-1;i++){
		for(var j=0;j<this.length-i-1;j++){
			if(this[j+1][key]<this[j][key]){
				var temp=this[j];
				this[j]=this[j+1];
				this[j+1]=temp;
			}
		}
	}
	return this;
}
Array.prototype.sortByKey2=function(key) {
	for(var i=0;i<this.length-1;i++){
		for(var j=i+1;j<this.length;j++){
			if(this[i][key]>this[j][key]){
				var temp=this[i];
				this[i]=this[j];
				this[j]=temp;
			}
		}
	}
	return this;
}

Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

Array.prototype.removeAllZero = function(key) {
	if(this.length<=0){
		return this;
	}
	var that=this.sortByKey2();
	that.reverse();
	for(var i=that.length-1;i>=0;i--){
		if(that[i][key]==0){
			that.pop();
		}else{
			break;
		}
	}
	return that;
};

Array.prototype.existKey = function(key,value){
	for(var i=0;i<this.length;i++){
		if(this[i][key]==value){
			return i;
		}
	}
	return -1;
}