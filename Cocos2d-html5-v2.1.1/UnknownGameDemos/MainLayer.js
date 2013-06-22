var MainLayer=cc.Layer.extend({
	teamArr1:null,
	teamArr2:null,
	arrowSprite: null,
	tempTouchPoint: null,
	activeSprite: null,
	status: 0, //0 normal 1 sprite being touched
	__scaleBase: 50, 
	init: function(){
		this._super();
		this.setTouchEnabled(true);

		this.demoInitTeam(5,5);
		this.arrowSprite=new ArrowSprite();

		this.schedule(this.update);
	},
	update: function(dt){
		this.soldierStep();
	},
	onTouchesEnded: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		console.log("in MainLayer");
		if(this.status==1){
			//有精灵正被点击选中行动中
			var realTouchPoint={};
			realTouchPoint.x=touchPoint.x-Game.currWorldPoint.x;
			realTouchPoint.y=touchPoint.y-Game.currWorldPoint.y;
			
			//发射的力量和角度
			var movedist=Math.sqrt(Math.pow(realTouchPoint.x-this.tempTouchPoint.x, 2)+Math.pow(realTouchPoint.y-this.tempTouchPoint.y, 2));
			var arrowScale=movedist/this.__scaleBase;
			if(arrowScale>2.5){
				arrowScale=2.5;
			}
			if(arrowScale<0.4){
				arrowScale=0.4;
			}

			var angle = Math.atan2(realTouchPoint.x-this.tempTouchPoint.x,realTouchPoint.y-this.tempTouchPoint.y);
			

			if(this.arrowSprite!=null){
				this.removeChild(this.arrowSprite);
			}

			//精灵行动
			//精灵移动
			this.activeSprite.vx=arrowScale*4*Math.sin(angle);
			this.activeSprite.vy=arrowScale*4*Math.cos(angle);
			angle = angle*(180/Math.PI);
			this.activeSprite.mainSprite.setRotation(angle);
			switch(SoldierData[this.activeSprite.type]["type"]){
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
			}
		}
		
	},
	onTouchesBegan: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		
		console.log("in MainLayer");
		var realTouchPoint={};
		realTouchPoint.x=touchPoint.x-Game.currWorldPoint.x;
		realTouchPoint.y=touchPoint.y-Game.currWorldPoint.y;
		
		this.tempTouchPoint=realTouchPoint;

		var touchedSprite=this.touchOnSoldier(realTouchPoint);
		if(touchedSprite!=null){
			console.log("Touched!");
			this.status=1;
			
			this.activeSprite=touchedSprite;

			var spritePos=touchedSprite.getPosition();
			this.arrowSprite.setPosition(spritePos.x+30,spritePos.y+28);
			this.arrowSprite.setScaleY(1);
			this.addChild(this.arrowSprite);
		}
	},
	onTouchesMoved: function(pTouch, pEvent){
		var touchNowPoint=pTouch[0].getLocation();
		if(this.status==1){
			var realTouchNow={};
			realTouchNow.x=touchNowPoint.x-Game.currWorldPoint.x;
			realTouchNow.y=touchNowPoint.y-Game.currWorldPoint.y;

			var movedist=Math.sqrt(Math.pow(realTouchNow.x-this.tempTouchPoint.x, 2)+Math.pow(realTouchNow.y-this.tempTouchPoint.y, 2));
			var arrowScale=movedist/this.__scaleBase;
			if(arrowScale>2.5){
				arrowScale=2.5;
			}
			if(arrowScale<0.4){
				arrowScale=0.4;
			}
			this.arrowSprite.setScaleY(arrowScale);

			var angle = Math.atan2(realTouchNow.x-this.tempTouchPoint.x,realTouchNow.y-this.tempTouchPoint.y);
			angle = angle*(180/Math.PI);
			this.arrowSprite.setRotation(angle);
		}
	},
	touchOnSoldier: function(realTouchPoint){
		var currSprite=null;

		for(var i=0;i<this.teamArr1.length;i++){
			var rectPos=this.teamArr1[i].getPosition();
			var rectX=rectPos.x+10;
			var rectY=rectPos.y+8;
			var rectW=40;
			var rectH=40;
			if(cc.rectContainsPoint(new cc.Rect(rectX,rectY,rectW,rectH),realTouchPoint)){
				console.log("team1-"+i);
				currSprite=this.teamArr1[i];
			}
		}
		for(var i=0;i<this.teamArr2.length;i++){
			var rectPos=this.teamArr2[i].getPosition();
			var rectX=rectPos.x+10;
			var rectY=rectPos.y+8;
			var rectW=40;
			var rectH=40;
			if(cc.rectContainsPoint(new cc.Rect(rectX,rectY,rectW,rectH),realTouchPoint)){
				console.log("team2-"+i);
				currSprite=this.teamArr2[i];
			}
		}
		return currSprite;
	},
	demoInitTeam: function(team1Num,team2Num){
		this.teamArr1=new Array();
		this.teamArr2=new Array();

		console.log("----- Init Game -----");
		//队伍1
		//两个近战兵
		var melee=new BaseSoldierSprite(1,0);
		this.teamArr1.push(melee);
		melee.setPosition(100,300);
		this.addChild(melee);
		var melee2=new BaseSoldierSprite(1,0);
		this.teamArr1.push(melee2);
		melee2.setPosition(200,300);
		this.addChild(melee2);
		//两个远程兵
		var range=new BaseSoldierSprite(2,0);
		this.teamArr1.push(range);
		range.setPosition(100,200);
		this.addChild(range);
		var range2=new BaseSoldierSprite(2,0);
		this.teamArr1.push(range2);
		range2.setPosition(200,200);
		this.addChild(range2);
		//一个魔法兵
		var magic=new BaseSoldierSprite(3,0);
		this.teamArr1.push(magic);
		magic.setPosition(150,100);
		this.addChild(magic);

		//队伍2
		//两个近战兵
		var melee=new BaseSoldierSprite(1,1);
		this.teamArr2.push(melee);
		melee.setPosition(Game.mapWidth-300,Game.mapHeight-300);
		this.addChild(melee);
		var melee2=new BaseSoldierSprite(1,1);
		this.teamArr2.push(melee2);
		melee2.setPosition(Game.mapWidth-200,Game.mapHeight-300);
		this.addChild(melee2);
		//两个远程兵
		var range=new BaseSoldierSprite(2,1);
		this.teamArr2.push(range);
		range.setPosition(Game.mapWidth-300,Game.mapHeight-200);
		this.addChild(range);
		var range2=new BaseSoldierSprite(2,1);
		this.teamArr2.push(range2);
		range2.setPosition(Game.mapWidth-200,Game.mapHeight-200);
		this.addChild(range2);
		//一个魔法兵
		var magic=new BaseSoldierSprite(3,1);
		this.teamArr2.push(magic);
		magic.setPosition(Game.mapWidth-250,Game.mapHeight-100);
		this.addChild(magic);
	},
	soldierStep: function(){

		for(var i=0;i<this.teamArr1.length;i++){
			this.teamArr1[i].vx=this.teamArr1[i].vx*SoldierData[this.teamArr1[i].type]["friction"];
			this.teamArr1[i].vy=this.teamArr1[i].vy*SoldierData[this.teamArr1[i].type]["friction"];
			if(Math.abs(this.teamArr1[i].vx)<=1 && Math.abs(this.teamArr1[i].vy)<=1){
				this.teamArr1[i].vx=0
				this.teamArr1[i].vy=0;
			}
			this.teamArr1[i].x+=this.teamArr1[i].vx;
			this.teamArr1[i].y+=this.teamArr1[i].vy;
			this.teamArr1[i].setPosition(this.teamArr1[i].x-30,this.teamArr1[i].y-28);
		}
		for(var i=0;i<this.teamArr2.length;i++){
			this.teamArr2[i].vx=this.teamArr2[i].vx*SoldierData[this.teamArr2[i].type]["friction"];
			this.teamArr2[i].vy=this.teamArr2[i].vy*SoldierData[this.teamArr2[i].type]["friction"];
			if(Math.abs(this.teamArr2[i].vx)<=1 && Math.abs(this.teamArr2[i].vy)<=1){
				this.teamArr2[i].vx=0;
				this.teamArr2[i].vy=0;
			}
			this.teamArr2[i].x+=this.teamArr2[i].vx;
			this.teamArr2[i].y+=this.teamArr2[i].vy;
			this.teamArr2[i].setPosition(this.teamArr2[i].x-30,this.teamArr2[i].y-28);
		}
	}
});