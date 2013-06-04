var Game={}; //根对象
Game.currWorldPoint=new cc.Point(0,0);
Game.shootMode=1; //use for SimpleShootDemo 1:melee 2:ranged 3:magic

Array.prototype.del=function(n) {
	if(n<0){
		return this;
	}else{
		return this.slice(0,n).concat(this.slice(n+1,this.length));
	}
}