var MainLayer=cc.Layer.extend({
	teamArr1:null,
	teamArr2:null,
	bulletArr:new Array(),
	specialFlyerArr: new Array(),
	healBulletArr: new Array(),
	blendedBulletArr: new Array(),
	totemArr: new Array(),
	arrowSprite: null,
	tempTouchPoint: null,
	activeSprite: null,
	curr_activeSprite: null,
	lastHurtedSprite: null,
	status: 0, //0 normal 1 sprite being touched
	__scaleBase: 50, 
	init: function(){
		this._super();
		this.setTouchEnabled(true);

		this.arrowSprite=new ArrowSprite();

		this.bulletArr=new Array();
		this.specialFlyerArr=new Array();
		this.healBulletArr=new Array();
		this.blendedBulletArr=new Array();

		this.totemArr=new Array();

		this.demoInitTeam(5,5);

		this.schedule(this.update);
	},
	update: function(dt){
		// console.log(this.bulletArr.length);
		if(Game.gameStatus==Game.status.END){
			console.log("Game is End");
		}else if(Game.gameStatus==Game.status.NORMAL && this.allSoldierMoveEnd() && this.bulletArr.length<=0 && this.specialFlyerArr.length<=0 && this.healBulletArr.length<=0 && this.blendedBulletArr.length<=0){
			if(Game.targetShowed==false){
				console.log("next round");
				if(this.teamArr1.length<=0 || this.teamArr2.length<=0){
					Game.gameStatus=Game.status.END;
					if(this.teamArr1.length<=0){
						this.getParent().uiLayer.showLose();						
					}else{
						this.getParent().uiLayer.showWin();
					}
				}else{
					// 控制buff时间 技能CD时间
					this.reduceBuffCDTime();
					// 取下一个行动的士兵
					this.curr_activeSprite=this.getNextActiveSprite();
					console.log("curr_activeSprite",this.curr_activeSprite);
					// this.activeSprite=this.curr_activeSprite;
					// 设置技能图标和CD
					this.setSkillCD(this.curr_activeSprite);
					this.getParent().sightOnSoldier(this.curr_activeSprite);
					this.curr_activeSprite.targetBlink();
					this.lastHurtedSprite=null;

					this.clearAuxiliary(); // 清除辅助变量 例如标示处于何种全局buff影响下等

					//AI动作延时2秒进行 不然速度太快
					if(Game.playWithAI==1){
						if(this.curr_activeSprite.team==1){
							var self=this;
							setTimeout(function(){
								self.aiDoAction(self.curr_activeSprite);
							}, 2000);
						}
					}
				}
			}
		}else{
			this.soldierStep(); // 士兵移动
			this.bulletStep(); // 子弹移动
			this.checkBulletCollision(); // 子弹检测
			this.checkBorderBounce(); // 边缘碰撞检测
			this.checkCollision(); // 士兵碰撞检测
			
			Game.targetShowed=false;
		}
		this.soldierUpdateBuffDebuff();
	},
	onTouchesEnded: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		console.log("in MainLayer");
		if(this.status==1 && Game.gameStatus==Game.status.NORMAL){
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
			angle1 = angle*(180/Math.PI);
			this.activeSprite.mainSprite.setRotation(angle1);

			// 使用技能
			var skillUsed=this.getParent().uiLayer.getSkillUsed();

			if(skillUsed>0){
				var skillId=SoldierData[this.activeSprite.type]["skill"+skillUsed];
				this.activeSprite.showSkillName(skillId);

				this.soldierUseSkill(this.activeSprite,angle);
				if(SkillData[SoldierData[this.activeSprite.type]["skill"+skillUsed]]["type"]==1){
					//如果是激活的buff类技能 那么只是赋予状态 常规工作仍要继续完成
					this.soldierAttackAction(this.activeSprite,angle); // angle为初始值
				}
			}else{
				this.soldierAttackAction(this.activeSprite,angle); // angle为初始值
			}

			this.activeSprite.resetAgility();

			this.getParent().uiLayer.resetSkillState();
			this.status=0;
		}
		
	},
	onTouchesBegan: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		
		console.log("in MainLayer");
		var realTouchPoint={};
		realTouchPoint.x=touchPoint.x-Game.currWorldPoint.x;
		realTouchPoint.y=touchPoint.y-Game.currWorldPoint.y;
		
		this.tempTouchPoint=realTouchPoint;
		var canControl=true;
		if(Game.playWithAI==1 && this.curr_activeSprite.team==1){
			canControl=false;
		}
		if(this.status==0 && Game.gameStatus==Game.status.NORMAL && canControl){
			// var touchedSprite=this.touchOnSoldier(realTouchPoint);
			// if(touchedSprite!=null){
			if(this.isTouchOnActiveSoldier(realTouchPoint,this.curr_activeSprite)){
				console.log("Touched!");
				this.status=1;
				
				this.activeSprite=this.curr_activeSprite;

				var spritePos=this.activeSprite.getPosition();
				this.arrowSprite.setPosition(spritePos.x+30,spritePos.y+28);
				this.arrowSprite.setScaleY(1);
				this.addChild(this.arrowSprite);
			}
		}
	},
	onTouchesMoved: function(pTouch, pEvent){
		var touchNowPoint=pTouch[0].getLocation();
		if(this.status==1 && Game.gameStatus==Game.status.NORMAL){
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
	isTouchOnActiveSoldier: function(realTouchPoint,soldier){
		var rectPos=soldier.getPosition();
		var rectX=rectPos.x+10;
		var rectY=rectPos.y+8;
		var rectW=40;
		var rectH=40;
		if(cc.rectContainsPoint(new cc.Rect(rectX,rectY,rectW,rectH),realTouchPoint)){
			return true;
		}else{
			return false;
		}
	},
	demoInitTeam: function(team1Num,team2Num){
		this.removeAllChildren();
		Game.currWorldPoint=new cc.Point(0,0);
		Game.showSpriteBorder=false;
		Game.showSpriteCollisionBorder=false;
		Game.targetShowed=false;
		Game.gameStatus=0;
		if(this.getParent()){
			if(this.getParent().uiLayer){
				this.getParent().uiLayer.removeChild(this.getParent().uiLayer.gameResultLabel);
				this.getParent().uiLayer.setPosition(0,0);
			}
			if(this.getParent().mainLayer){
				this.getParent().mainLayer.setPosition(0,0);
			}
			if(this.getParent().mapLayer){
				this.getParent().mapLayer.setPosition(0,0);
			}
		}

		this.teamArr1=new Array();
		this.teamArr2=new Array();

		console.log("----- Init Game -----");

		//队伍1
		for(var i=0;i<Game.team1Soldiers.length;i++){
			this.randomSoldierToGame(Game.team1Soldiers[i],0,100,600,100,600);
		}
		//队伍2
		for(var i=0;i<Game.team2Soldiers.length;i++){
			this.randomSoldierToGame(Game.team2Soldiers[i],1,500,1000,500,1000);
		}
		console.log(this.teamArr1[0].def_buff);
		/*
		//写死的随机到位置
		//队伍1
		this.randomSoldierToGame(1,0,100,600,100,600);
		this.randomSoldierToGame(1,0,100,600,100,600);
		this.randomSoldierToGame(2,0,100,600,100,600);
		this.randomSoldierToGame(2,0,100,600,100,600);
		this.randomSoldierToGame(3,0,100,600,100,600);
		//队伍2
		this.randomSoldierToGame(1,1,500,1000,500,1000);
		this.randomSoldierToGame(1,1,500,1000,500,1000);
		this.randomSoldierToGame(2,1,500,1000,500,1000);
		this.randomSoldierToGame(2,1,500,1000,500,1000);
		this.randomSoldierToGame(3,1,500,1000,500,1000);
		*/
		/*
		//写死的单个添加到固定位置
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
		var fixValueX=400;
		var fixValueY=600;
		var melee=new BaseSoldierSprite(1,1);
		this.teamArr2.push(melee);
		melee.setPosition(Game.mapWidth-300-fixValueX,Game.mapHeight-300-fixValueY);
		this.addChild(melee);
		var melee2=new BaseSoldierSprite(1,1);
		this.teamArr2.push(melee2);
		melee2.setPosition(Game.mapWidth-200-fixValueX,Game.mapHeight-300-fixValueY);
		this.addChild(melee2);
		//两个远程兵
		var range=new BaseSoldierSprite(2,1);
		this.teamArr2.push(range);
		range.setPosition(Game.mapWidth-300-fixValueX,Game.mapHeight-200-fixValueY);
		this.addChild(range);
		var range2=new BaseSoldierSprite(2,1);
		this.teamArr2.push(range2);
		range2.setPosition(Game.mapWidth-200-fixValueX,Game.mapHeight-200-fixValueY);
		this.addChild(range2);
		//一个魔法兵
		var magic=new BaseSoldierSprite(3,1);
		this.teamArr2.push(magic);
		magic.setPosition(Game.mapWidth-250-fixValueX,Game.mapHeight-100-fixValueY);
		this.addChild(magic);
		*/

		if(this.getParent()){
			this.getParent().uiLayer.refreshTeamStatus(this.teamArr1.length,this.teamArr2.length);
			// this.getParent().showWholeMap();
		}
		
	},
	randomSoldierToGame: function(type,team,fx,tx,fy,ty){
		var soldier=new BaseSoldierSprite(type,team);
		while(true){
			var pX=Math.random()*(tx-fx)+fx;
			var pY=Math.random()*(ty-fy)+fy;

			var collided=false;
			for(var i=0;i<this.teamArr1.length;i++){
				if(cc.rectOverlapsRect(new cc.Rect(pX,pY,60,70),this.teamArr1[i].getBoundingBox())){
					console.log("collided1, reroll position");
					collided=true;
					break;
				}
			}
			if(!collided){
				for(var j=0;j<this.teamArr2.length;j++){
					if(cc.rectOverlapsRect(new cc.Rect(pX,pY,60,70),this.teamArr2[j].getBoundingBox())){
						console.log("collided2, reroll position");
						collided=true;
						break;
					}
				}
			}
			
			if(!collided){
				break;
			}
			console.log("collided, reroll position");
		}
		soldier.setPosition(pX,pY);
		if(team==0){
			this.teamArr1.push(soldier);
		}
		if(team==1){
			this.teamArr2.push(soldier);
		}
		
		this.addChild(soldier);
	},
	soldierStep: function(){
		var factor=1;

		for(var i=0;i<this.teamArr1.length;i++){
			if(this.teamArr1[i]==this.activeSprite){
				factor=SoldierData[this.teamArr1[i].type]["friction"];
			}else{
				factor=SoldierData[this.teamArr1[i].type]["resistance"];
			}
			this.teamArr1[i].vx=this.teamArr1[i].vx*factor;
			this.teamArr1[i].vy=this.teamArr1[i].vy*factor;
			if(Math.abs(this.teamArr1[i].vx)<=1 && Math.abs(this.teamArr1[i].vy)<=1){
				this.teamArr1[i].vx=0
				this.teamArr1[i].vy=0;
			}
			this.teamArr1[i].x+=this.teamArr1[i].vx;
			this.teamArr1[i].y+=this.teamArr1[i].vy;
			this.teamArr1[i].setPosition(this.teamArr1[i].x-30,this.teamArr1[i].y-28);
		}
		for(var i=0;i<this.teamArr2.length;i++){
			if(this.teamArr2[i]==this.activeSprite){
				factor=SoldierData[this.teamArr2[i].type]["friction"];
			}else{
				factor=SoldierData[this.teamArr2[i].type]["resistance"];
			}
			this.teamArr2[i].vx=this.teamArr2[i].vx*factor;
			this.teamArr2[i].vy=this.teamArr2[i].vy*factor;
			if(Math.abs(this.teamArr2[i].vx)<=1 && Math.abs(this.teamArr2[i].vy)<=1){
				this.teamArr2[i].vx=0;
				this.teamArr2[i].vy=0;
			}
			this.teamArr2[i].x+=this.teamArr2[i].vx;
			this.teamArr2[i].y+=this.teamArr2[i].vy;
			this.teamArr2[i].setPosition(this.teamArr2[i].x-30,this.teamArr2[i].y-28);
		}
	},
	allSoldierMoveEnd: function(){
		//是否都运动结束了 速度为0
		var allEnd=true;
		for(var i=0;i<this.teamArr1.length;i++){
			if(this.teamArr1[i].vx!=0 || this.teamArr1[i].vy!=0){
				allEnd=false;
				break;
			}
		}
		for(var i=0;i<this.teamArr2.length;i++){
			if(this.teamArr2[i].vx!=0 || this.teamArr2[i].vy!=0){
				allEnd=false;
				break;
			}
		}
		return allEnd;
	},
	checkCollision: function(){
		if(this.activeSprite){
			//同队的碰撞
			for(var i=0;i<this.teamArr1.length-1;i++){
				for(var j=i+1;j<this.teamArr1.length;j++){
					var collided=this.ballCollision(this.teamArr1[i],this.teamArr1[j]);
					if(this.activeSprite.team==1 && collided["collided"]){
						//2队行动 并且产生了碰撞
						if(this.teamArr1[i]!=this.lastHurtedSprite){
							//同一个不会在一次碰撞中连续受到伤害
							// this.teamArr1[i].getDamage(SoldierData[this.activeSprite.type]["atk"]-SoldierData[this.teamArr1[i].type]["def"]);
							this.makeDamageWithBuff(this.teamArr1[i]);
						}
						if(this.teamArr1[j]!=this.lastHurtedSprite){
							// this.teamArr1[j].getDamage(SoldierData[this.activeSprite.type]["atk"]-SoldierData[this.teamArr1[j].type]["def"]);
							this.makeDamageWithBuff(this.teamArr1[j]);
						}
					}
				}
			}
			for(var i=0;i<this.teamArr2.length-1;i++){
				for(var j=i+1;j<this.teamArr2.length;j++){
					var collided=this.ballCollision(this.teamArr2[i],this.teamArr2[j]);
					if(this.activeSprite.team==0 && collided["collided"]){
						if(this.teamArr2[i]!=this.lastHurtedSprite){
							//同一个不会在一次碰撞中连续受到伤害
							// this.teamArr2[i].getDamage(SoldierData[this.activeSprite.type]["atk"]-SoldierData[this.teamArr2[i].type]["def"]);
							this.makeDamageWithBuff(this.teamArr2[i]);
						}
						if(this.teamArr2[j]!=this.lastHurtedSprite){
							// this.teamArr2[j].getDamage(SoldierData[this.activeSprite.type]["atk"]-SoldierData[this.teamArr2[j].type]["def"]);
							this.makeDamageWithBuff(this.teamArr2[j]);
						}
					}
				}
			}
			//敌对的碰撞
			for(var i=0;i<this.teamArr1.length;i++){
				for(var j=0;j<this.teamArr2.length;j++){
					var collided=this.ballCollision(this.teamArr1[i],this.teamArr2[j]);
					if(collided["collided"]){
						//敌对有碰撞
						if(this.activeSprite.team==0){
							//1队行动 2队受伤
							// this.teamArr2[j].getDamage(SoldierData[this.activeSprite.type]["atk"]-SoldierData[this.teamArr2[j].type]["def"]);
							this.makeDamageWithBuff(this.teamArr2[j]);
							this.lastHurtedSprite=this.teamArr2[j];
						}
						if(this.activeSprite.team==1){
							//2队行动 1队受伤
							// this.teamArr1[i].getDamage(SoldierData[this.activeSprite.type]["atk"]-SoldierData[this.teamArr1[i].type]["def"]);
							this.makeDamageWithBuff(this.teamArr1[i]);
							this.lastHurtedSprite=this.teamArr1[i];
						}
					}
				}
			}
		}
	},
	checkBorderBounce: function(){
		for(var i=0;i<this.teamArr1.length;i++){
			this.checkBallBounceAtBorder(this.teamArr1[i]);
		}
		for(var j=0;j<this.teamArr2.length;j++){
			this.checkBallBounceAtBorder(this.teamArr2[j]);
		}
	},
	checkBallBounceAtBorder: function(ball){
		if(ball.x<ball.radius){
			//left
			ball.x=ball.radius;
			ball.vx*=-1;
		}else if(ball.x>1280-ball.radius){
			//right
			ball.x=1280-ball.radius;
			ball.vx*=-1;
		}
		if(ball.y<ball.radius){
			//bottom
			ball.y=ball.radius;
			ball.vy*=-1;
		}else if(ball.y>1280-ball.radius){
			//top
			ball.y=1280-ball.radius;
			ball.vy*=-1;
		}
	},
	ballCollision: function(ball1,ball2){
		if(ball1 && ball2){
			//Calculate the distance between 2 ball
			// var dist=ball1.x-ball2.x; //on x-axis
			var dx=ball2.x-ball1.x;
			var dy=ball2.y-ball1.y;
			var dist=Math.sqrt(dx*dx+dy*dy);

			//if 2 balls crashed
			if(Math.abs(dist)<ball1.radius+ball2.radius){
				// on x-axis
				/*
				// v0final=((m0-m1)v0+2m1v1)/(m0+m1)
				// v1final=v0final+(v0-v1)
				var vdx=ball1.vx-ball2.vx;
				var v1final=((ball1.mass-ball2.mass)*ball1.vx+2*ball2.mass*ball2.vx)/(ball1.mass+ball2.mass);
				var v2final=v1final+vdx;

				ball1.vx=v1final;
				ball2.vx=v2final;
				console.log("v1x",ball1.vx);
				console.log("v2x",ball2.vx);

				ball1.x+=ball1.vx;
				ball2.x+=ball2.vx;
				*/

				// on both x-axis and y-axis
				var angle=Math.atan2(dy,dx);
				var cos=Math.cos(angle);
				var sin=Math.sin(angle);

				// rotate by the center of ball1
				var x1=0;
				var y1=0;

				var x2=dx*cos+dy*sin;
				var y2=dy*cos-dx*sin;

				//the speed after rotate
				var vx1=ball1.vx*cos+ball1.vy*sin;
				var vy1=ball1.vy*cos-ball1.vx*sin;
				var vx2=ball2.vx*cos+ball2.vy*sin;
				var vy2=ball2.vy*cos-ball2.vx*sin;

				// v0final=((m0-m1)v0+2m1v1)/(m0+m1)
				// v1final=v0final+(v0-v1)
				var vdx=vx1-vx2;
				var vx1final=((ball1.mass-ball2.mass)*vx1+2*ball2.mass*vx2)/(ball1.mass+ball2.mass);
				var vx2final=vx1final+vdx;

				// the new position
				// x1+=vx1final;
				// x2+=vx2final;
				var sumRadius=ball1.radius+ball2.radius;
				var overlap=sumRadius-Math.abs(x1-x2);
				
				var radio1=ball1.radius/sumRadius;
				var radio2=ball2.radius/sumRadius;

				if(overlap>0){
					if(x1>x2){
						x1+=overlap*radio1;
						x2-=overlap*radio2;
					}else{
						x1-=overlap*radio1;
						x2+=overlap*radio2;
					}
				}

				//rotate back
				var x1final=x1*cos-y1*sin;
				var y1final=y1*cos+x1*sin;
				var x2final=x2*cos-y2*sin;
				var y2final=y2*cos+x2*sin;

				ball2.x=ball1.x+x2final;
				ball2.y=ball1.y+y2final;
				ball1.x+=x1final;
				ball1.y+=y1final;
				
				//final speed
				ball1.vx=vx1final*cos-vy1*sin;
				ball1.vy=vy1*cos+vx1final*sin;
				ball2.vx=vx2final*cos-vy2*sin;
				ball2.vy=vy2*cos+vx2final*sin;

				return {"x":(ball1.x+ball2.x)/2,"y":(ball1.y+ball2.y)/2,"collided":true};
			}else{
				return {"x":(ball1.x+ball2.x)/2,"y":(ball1.y+ball2.y)/2,"collided":false};
			}
		}
		return {"x":0,"y":0,"collided":false};
	},
	resortByAgility: function(){
		this.teamArr1=this.teamArr1.sortByKey("curr_agility");
		this.teamArr2=this.teamArr2.sortByKey("curr_agility");
	},
	getNextActiveSprite: function(){
		this.resortByAgility();
		var nextActiveSprite=null;
		var reduceValue=0;
		if(this.teamArr1[0].curr_agility<=this.teamArr2[0].curr_agility){
			nextActiveSprite=this.teamArr1[0];
		}else{
			nextActiveSprite=this.teamArr2[0];
		}
		reduceValue=nextActiveSprite.curr_agility;
		// 所有都减去这个值
		for(var i=0;i<this.teamArr1.length;i++){
			this.teamArr1[i].reduceAgility(reduceValue);
		}
		for(var i=0;i<this.teamArr2.length;i++){
			this.teamArr2[i].reduceAgility(reduceValue);
		}
		return nextActiveSprite;
	},
	soldierAttackAction: function(soldier,angle){
		var center=soldier.getCenterPosition();
		switch(SoldierData[soldier.type]["type"]){
			case 1:
				console.log("Melee action");
				break;
			case 2:
				console.log("Ranged action");
				var bullet=new SimpleBulletSprite(center.x,center.y,commonColor4B["black"]);
				bullet.setPosition(center.x,center.y);
				console.log("soldier pos:",soldier.getPosition());
				console.log(center);
				bullet.vx=Math.sin(angle)*10;
				bullet.vy=Math.cos(angle)*10;
				var bid=this.bulletArr.length;
				bullet.id=bid;
				bullet.dist=SoldierData[soldier.type]["dist"];
				this.bulletArr.push(bullet);
				
				this.addChild(bullet);
				break;
			case 3:
				console.log("Magic action");
				var bullet=new SimpleBulletSprite(center.x,center.y,commonColor4B["green"]);
				bullet.setPosition(center.x,center.y);
				bullet.vx=Math.sin(angle)*10;
				bullet.vy=Math.cos(angle)*10;
				var bid=this.bulletArr.length;
				bullet.id=bid;
				bullet.dist=SoldierData[soldier.type]["dist"];
				this.bulletArr.push(bullet);
				
				this.addChild(bullet);
				break;
			case 4:
				console.log("Shaman action");
				var bullet=new SimpleBulletSprite(center.x,center.y,commonColor4B["white"]);
				bullet.setPosition(center.x,center.y);
				bullet.vx=Math.sin(angle)*10;
				bullet.vy=Math.cos(angle)*10;
				var bid=this.healBulletArr.length;
				bullet.id=bid;
				bullet.dist=SoldierData[soldier.type]["dist"];
				bullet.power=SoldierData[soldier.type]["atk"];
				bullet.bulletHurted=new Array();
				bullet.bulletHurted.push(soldier);
				this.healBulletArr.push(bullet);
				
				this.addChild(bullet);
				break;
		}
	},
	soldierUseSkill: function(soldier,angle){
		var skillUsed=this.getParent().uiLayer.getSkillUsed();
		var skillId=SoldierData[soldier.type]["skill"+skillUsed];
		console.log("useSkill Sprite",soldier);
		switch(SkillData[skillId]["type"]){
			case 1:
				// 自身增益型buff/debuff
				if(SkillData[skillId]["atk_buff"]>0){
					var atkbuff={"id":SkillData[skillId]["atk_buff"],"duration":SkillData[skillId]["atk_buff_time"]};
					var tindex=soldier.atk_buff.existKey("id",atkbuff["id"]);
					if(tindex>0){
						soldier.atk_buff[tindex]["duration"]=atkbuff["duration"];
					}else{
						soldier.atk_buff.push(atkbuff);
					}
				}
				if(SkillData[skillId]["atk_debuff"]>0){
					var atkdebuff={"id":SkillData[skillId]["atk_debuff"],"duration":SkillData[skillId]["atk_debuff_time"]};
					var tindex=soldier.atk_debuff.existKey("id",atkdebuff["id"]);
					if(tindex>0){
						soldier.atk_debuff[tindex]["duration"]=atkdebuff["duration"];
					}else{
						soldier.atk_debuff.push(atkdebuff);
					}
				}
				if(SkillData[skillId]["def_buff"]>0){
					var defbuff={"id":SkillData[skillId]["def_buff"],"duration":SkillData[skillId]["def_buff_time"]};
					var tindex=soldier.def_buff.existKey("id",defbuff["id"]);
					if(tindex>0){
						soldier.def_buff[tindex]["duration"]=defbuff["duration"];
					}else{
						soldier.def_buff.push(defbuff);
					}
				}
				if(SkillData[skillId]["def_debuff"]>0){
					var defdebuff={"id":SkillData[skillId]["def_debuff"],"duration":SkillData[skillId]["def_debuff_time"]};
					var tindex=soldier.def_debuff.existKey("id",defdebuff["id"]);
					if(tindex>0){
						soldier.def_debuff[tindex]["duration"]=defdebuff["duration"];
					}else{
						soldier.def_debuff.push(defdebuff);
					}
				}
				break;
			case 2:
				console.log("释放攻击技能");
				// 攻击技能
				if(skillId==3){
					//分裂箭
					//发射3枚子弹
					console.log("分裂箭");
					var center=soldier.getCenterPosition();
					console.log(angle);
					angle-=0.3;
					for(var i=0;i<3;i++){
						var bullet=new SimpleBulletSprite(center.x,center.y,commonColor4B["black"]);
						bullet.setPosition(center.x,center.y);
						console.log("soldier pos:",soldier.getPosition());
						console.log(center);
						bullet.vx=Math.sin(angle)*10;
						bullet.vy=Math.cos(angle)*10;
						var bid=this.specialFlyerArr.length;
						bullet.id=bid;
						bullet.power=SkillData[skillId]["power"];
						this.specialFlyerArr.push(bullet);
						
						this.addChild(bullet);
						angle+=0.3;
					}
				}
				if(skillId==4){
					//穿透箭
					//发射一枚具有穿透力的子弹
					console.log("穿透箭");
					var center=soldier.getCenterPosition();
					var bullet = new SimpleBulletSprite(center.x,center.y,commonColor4B["black"]);
					bullet.setPosition(center.x,center.y);
					bullet.vx=Math.sin(angle)*10;
					bullet.vy=Math.cos(angle)*10;
					var bid=this.specialFlyerArr.length;
					bullet.id=bid;
					bullet.power=SkillData[skillId]["power"];
					bullet.bulletType=1;// 特殊子弹
					bullet.bulletHurted=new Array();
					this.specialFlyerArr.push(bullet);

					this.addChild(bullet);
				}
				if(skillId==5){
					//冰箭术
					//一枚冰箭 对击中的目标造成伤害并使移动力减半
					console.log("冰箭术");
					var center=soldier.getCenterPosition();
					var bullet = new SimpleBulletSprite(center.x,center.y,commonColor4B["blue"]);
					bullet.setPosition(center.x,center.y);
					bullet.vx=Math.sin(angle)*10;
					bullet.vy=Math.cos(angle)*10;
					var bid=this.specialFlyerArr.length;
					bullet.id=bid;
					bullet.power=SkillData[skillId]["power"];
					bullet.bulletType=2;
					bullet.extra_debuff=SkillData[skillId]["extra_debuff"];
					bullet.extra_debuff_time=SkillData[skillId]["extra_debuff_time"];
					bullet.bulletHurted=new Array();
					this.specialFlyerArr.push(bullet);

					this.addChild(bullet);
				}
				if(skillId==6){
					// 治愈术
					// 回复一个友军目标的血量
					console.log("治愈术");
					var center=soldier.getCenterPosition();
					var bullet = new SimpleBulletSprite(center.x,center.y,commonColor4B["white"]);
					bullet.setPosition(center.x,center.y);
					bullet.vx=Math.sin(angle)*10;
					bullet.vy=Math.cos(angle)*10;
					var bid=this.healBulletArr.length;
					bullet.id=bid;
					bullet.power=SkillData[skillId]["power"];
					bullet.bulletHurted=new Array();
					bullet.bulletHurted.push(soldier);
					this.healBulletArr.push(bullet);

					this.addChild(bullet);
				}
				if(skillId==7){
					// 萨满诅咒/祝福
					// 给友方上buff 给敌方debuff
					console.log("Pray and Curse");
					var center=soldier.getCenterPosition();
					var bullet = new SimpleBulletSprite(center.x,center.y,commonColor4B["red"]);
					bullet.setPosition(center.x,center.y);
					bullet.vx=Math.sin(angle)*10;
					bullet.vy=Math.cos(angle)*10;
					var bid=this.blendedBulletArr.length;
					bullet.id=bid;
					bullet.power=SkillData[skillId]["power"];
					bullet.bulletType=2;
					bullet.atk_buff=SkillData[skillId]["atk_buff"];
					bullet.atk_buff_time=SkillData[skillId]["atk_buff_time"];
					bullet.atk_debuff=SkillData[skillId]["atk_debuff"];
					bullet.atk_debuff_time=SkillData[skillId]["atk_debuff_time"];
					bullet.def_buff=SkillData[skillId]["def_buff"];
					bullet.def_buff_time=SkillData[skillId]["def_buff_time"];
					bullet.def_debuff=SkillData[skillId]["def_debuff"];
					bullet.def_debuff_time=SkillData[skillId]["def_debuff_time"];
					bullet.bulletHurted=new Array();
					bullet.bulletHurted.push(soldier);
					this.blendedBulletArr.push(bullet);

					this.addChild(bullet);
				}
				break;
			case 3:
				if(skillId==8){
					// 萨满图腾
					// 图腾范围内的玩家收到治疗时 治疗效果提高3倍
					console.log("Shaman's Healing Totem");
					var center=soldier.getCenterPosition();
					center.x+=Math.sin(angle)*100;
					center.y+=Math.cos(angle)*100;
					var totem=new TotemSprite(soldier.team,SkillData[skillId]["radius"],SkillData[skillId]["duration"]);
					totem.extra_buff=SkillData[skillId]["extra_buff"];
					totem.setPosition(center);
					this.addChild(totem,-8,-8);
					this.totemArr.push(totem);
				}
				break;
		}
		// 重新统计技能CD
		if(skillUsed==1){
			soldier.skill1_cd=SkillData[skillId]["cd"];
		}
		if(skillUsed==2){
			soldier.skill2_cd=SkillData[skillId]["cd"];
		}
	},
	bulletStep: function(){
		for(var k=0;k<this.bulletArr.length;k++){
			this.bulletArr[k].x+=this.bulletArr[k].vx;
			this.bulletArr[k].y+=this.bulletArr[k].vy;
			this.bulletArr[k].setPosition(this.bulletArr[k].x,this.bulletArr[k].y);
		}
		// 技能释放的子弹
		for(var k=0;k<this.specialFlyerArr.length;k++){
			this.specialFlyerArr[k].x+=this.specialFlyerArr[k].vx;
			this.specialFlyerArr[k].y+=this.specialFlyerArr[k].vy;
			this.specialFlyerArr[k].setPosition(this.specialFlyerArr[k].x,this.specialFlyerArr[k].y);
		}
		// 治愈的子弹
		for(var k=0;k<this.healBulletArr.length;k++){
			this.healBulletArr[k].x+=this.healBulletArr[k].vx;
			this.healBulletArr[k].y+=this.healBulletArr[k].vy;
			this.healBulletArr[k].setPosition(this.healBulletArr[k].x,this.healBulletArr[k].y);
		}
		// 会和两队同时碰撞的子弹
		for(var k=0;k<this.blendedBulletArr.length;k++){
			this.blendedBulletArr[k].x+=this.blendedBulletArr[k].vx;
			this.blendedBulletArr[k].y+=this.blendedBulletArr[k].vy;
			this.blendedBulletArr[k].setPosition(this.blendedBulletArr[k].x,this.blendedBulletArr[k].y);
		}
	},
	checkBulletCollision: function(){
		if(this.activeSprite){
			if(this.activeSprite.team==0){
				//检查和2队的碰撞
				//普通子弹
				for(var i=0;i<this.bulletArr.length;i++){
					for(var j=0;j<this.teamArr2.length;j++){
						this.bulletCollision(this.bulletArr[i],this.teamArr2[j]);
					}
				}

				//特殊子弹
				for(var i=0;i<this.specialFlyerArr.length;i++){
					for(var j=0;j<this.teamArr2.length;j++){
						this.specialBulletCollision(this.specialFlyerArr[i],this.teamArr2[j]);
					}
				}

				//友方子弹
				for(var i=0;i<this.healBulletArr.length;i++){
					for(var j=0;j<this.teamArr1.length;j++){
						this.healBulletCollision(this.healBulletArr[i],this.teamArr1[j]);
					}
				}
			}
			if(this.activeSprite.team==1){
				//检查和1队的碰撞
				//普通子弹
				for(var i=0;i<this.bulletArr.length;i++){
					for(var j=0;j<this.teamArr1.length;j++){
						this.bulletCollision(this.bulletArr[i],this.teamArr1[j]);
					}
				}

				//特殊子弹
				for(var i=0;i<this.specialFlyerArr.length;i++){
					for(var j=0;j<this.teamArr1.length;j++){
						this.specialBulletCollision(this.specialFlyerArr[i],this.teamArr1[j]);
					}
				}

				//友方子弹
				for(var i=0;i<this.healBulletArr.length;i++){
					for(var j=0;j<this.teamArr2.length;j++){
						this.healBulletCollision(this.healBulletArr[i],this.teamArr2[j]);
					}
				}
			}
			//混合子弹 不管队伍都会产生碰撞
			for(var i=0;i<this.blendedBulletArr.length;i++){
				for(var j=0;j<this.teamArr1.length;j++){
					this.blendedBulletCollision(this.blendedBulletArr[i],this.teamArr1[j]);
				}
				for(var j=0;j<this.teamArr2.length;j++){
					this.blendedBulletCollision(this.blendedBulletArr[i],this.teamArr2[j]);
				}
			}
		}
	},
	bulletCollision: function(bullet,ball){
		if(bullet && ball){
			var dx=ball.x-bullet.x;
			var dy=ball.y-bullet.y;
			var dist=Math.sqrt(dx*dx+dy*dy);

			var bulletPos=bullet.getBulletPosition();
			if(dist<=ball.radius){
				//shoot on target
				// var tpos={"x":bullet.x,"y":bullet.y};
				// this.showCollision(tpos);
				// ball.reduceBlood(10);

				// 攻防
				this.makeDamageWithBuff(ball);
				
				this.removeBullet(bullet);
			}
			// console.log(bulletPos);
			//达到边缘
			if(bulletPos.x<=0 || bulletPos.x>=Game.mapWidth || bulletPos.y<=0 || bulletPos.y>=Game.mapHeight){
				this.removeBullet(bullet);
			}
			//达到射程
			var curr_move_dist=Math.pow(bulletPos.x-bullet.ox,2)+Math.pow(bulletPos.y-bullet.oy,2);
			if(curr_move_dist>Math.pow(bullet.dist,2)){
				this.removeBullet(bullet);
			}
		}
	},
	specialBulletCollision: function(bullet,ball){
		if(bullet && ball){
			var dx=ball.x-bullet.x;
			var dy=ball.y-bullet.y;
			var dist=Math.sqrt(dx*dx+dy*dy);

			var bulletPos=bullet.getBulletPosition();

			var hurtedIndex=bullet.bulletHurted.indexOf(ball);
			// console.log("bullet hurt index",hurtedIndex);
			if(hurtedIndex==-1){
				// 在已造成伤害列表中找不到
				if(dist<=ball.radius){
					//shoot on target
					// var tpos={"x":bullet.x,"y":bullet.y};
					// this.showCollision(tpos);
					// ball.reduceBlood(10);

					// 攻防
					var power=bullet.power;
					this.makeDamageWithBuff(ball,power);
					// 添加附加的效果
					if(bullet.bulletType==2){
						console.log("Add buff debuff");
						this.addBuffDebuff(ball,bullet);
						console.log(ball);
					}

					bullet.bulletHurted.push(ball);
					
					console.log("bullet type",bullet.bulletType);
					if(bullet.bulletType!=1){
						// 普通子弹 击中目标就移除
						this.removeSpecialBullet(bullet);
					}
				}
			}
			// console.log(bulletPos);
			if(bulletPos.x<=0 || bulletPos.x>=Game.mapWidth || bulletPos.y<=0 || bulletPos.y>=Game.mapHeight){
				this.removeSpecialBullet(bullet);
			}
		}
	},
	healBulletCollision: function(bullet,ball){
		if(bullet && ball){
			var dx=ball.x-bullet.x;
			var dy=ball.y-bullet.y;
			var dist=Math.sqrt(dx*dx+dy*dy);

			var bulletPos=bullet.getBulletPosition();

			var hurtedIndex=bullet.bulletHurted.indexOf(ball);
			// console.log("bullet hurt index",hurtedIndex);
			if(hurtedIndex==-1){
				if(dist<=ball.radius){
					//shoot on target
					// var tpos={"x":bullet.x,"y":bullet.y};
					// this.showCollision(tpos);
					// ball.reduceBlood(10);

					// 攻防
					var power=bullet.power;

					this.makeHeal(ball,power);
					
					this.removeHealBullet(bullet);
				}
			}
			// console.log(bulletPos);
			if(bulletPos.x<=0 || bulletPos.x>=Game.mapWidth || bulletPos.y<=0 || bulletPos.y>=Game.mapHeight){
				this.removeHealBullet(bullet);
			}
		}
	},
	blendedBulletCollision: function(bullet,ball){
		if(bullet && ball){
			var dx=ball.x-bullet.x;
			var dy=ball.y-bullet.y;
			var dist=Math.sqrt(dx*dx+dy*dy);

			var bulletPos=bullet.getBulletPosition();

			var hurtedIndex=bullet.bulletHurted.indexOf(ball);
			// console.log("bullet hurt index",hurtedIndex);
			if(hurtedIndex==-1){
				if(dist<=ball.radius){
					//shoot on target
					// var tpos={"x":bullet.x,"y":bullet.y};
					// this.showCollision(tpos);
					// ball.reduceBlood(10);

					// 攻防
					var power=bullet.power;
					if(power>0){
						// 威力>0才会产生伤害或治疗
						// this.makeHeal(ball,power);
					}
					// 添加附加的效果
					if(bullet.bulletType==2){
						console.log("Add buff debuff");
						//根据是否敌对决定加buff还是debuff
						if(ball.team==this.activeSprite.team){
							//同队
							this.addBuffOnly(ball,bullet);
						}else{
							//敌对
							this.addDebuffOnly(ball,bullet);
						}
					}

					bullet.bulletHurted.push(ball);
					
					if(bullet.bulletType!=1){
						// 普通子弹 击中目标就移除
						this.removeBlendedBullet(bullet);
					}

					this.removeBlendedBullet(bullet);
				}
			}
			// console.log(bulletPos);
			if(bulletPos.x<=0 || bulletPos.x>=Game.mapWidth || bulletPos.y<=0 || bulletPos.y>=Game.mapHeight){
				this.removeBlendedBullet(bullet);
			}
		}
	},
	removeBullet: function(bullet){
		//删除子弹 1 找到id 删掉数组中该id的bullet 并且其他所有处于他之后的bullet id都-1
		// var bid=bullet.id;
		// this.bulletArr=this.bulletArr.del(bid);
		// if(bid<this.bulletArr.length && bid!=0){
		// 	for(var a=bid;a<this.bulletArr.length;a++){
		// 		this.bulletArr[a].id-=1;
		// 	}
		// }
		this.bulletArr.remove(bullet);
		this.removeChild(bullet);
		console.log("removeBullet!!!");
	},
	removeSpecialBullet: function(bullet){
		// var bid=bullet.id;
		// this.specialFlyerArr=this.specialFlyerArr.del(bid);
		// if(bid<this.specialFlyerArr.length && bid!=0){
		// 	for(var a=bid;a<this.specialFlyerArr.length;a++){
		// 		this.specialFlyerArr[a].id-=1;
		// 	}
		// }
		this.specialFlyerArr.remove(bullet);
		this.removeChild(bullet);
		console.log("removeSpecialBullet!!!");
	},
	removeHealBullet: function(bullet){
		this.healBulletArr.remove(bullet);
		this.removeChild(bullet);
		console.log("removeHealBullet!!!");
	},
	removeBlendedBullet: function(bullet){
		this.blendedBulletArr.remove(bullet);
		this.removeChild(bullet);
		console.log("removeBlendedBullet!!!");
	},
	dieSoldier: function(soldier){
		this.removeChild(soldier);
		if(soldier.team==0){
			//从1队删除
			this.teamArr1.remove(soldier);
		}
		if(soldier.team==1){
			this.teamArr2.remove(soldier);
		}
		this.getParent().uiLayer.refreshTeamStatus(this.teamArr1.length,this.teamArr2.length);
	},
	clearAuxiliary: function(){
		Game.underSkill=0;
	},
	makeDamageWithBuff: function(defSoldier,power){
		// 攻防
		var attack=SoldierData[this.activeSprite.type]["atk"]+SoldierData[this.activeSprite.type]["addition_atk"];
		if(power){
			attack=power;
		}
		var defence=SoldierData[defSoldier.type]["def"]+SoldierData[this.activeSprite.type]["addition_def"];
		console.log("士兵基础攻击atk:",attack);
		console.log("士兵基础防御def:",defence);
		for(var i=0;i<this.activeSprite.atk_buff.length;i++){
			// 有攻击buff
			var atk_ratio=AtkBuffData[this.activeSprite.atk_buff[i]['id']]["value"];
			console.log("攻击 buff",atk_ratio);
			if(AtkBuffData[this.activeSprite.atk_buff[i]['id']]["type"]==1){
				//百分比加成
				attack=Math.floor(attack*atk_ratio);
			}else if(AtkBuffData[this.activeSprite.atk_buff[i]['id']]["type"]==2){
				//固定值加成
				attack=attack+atk_ratio;
			}else{
				attack=attack;
			}
			//如果buff的id是2 那么是一次性的
			if(this.activeSprite.atk_buff[i]['id']==2){
				this.activeSprite.atk_buff[i]['duration']=0;
			}
		}
		for(var i=0;i<this.activeSprite.atk_debuff.length;i++){
			// 有攻击debuff
			var atk_ratio=AtkDebuffData[this.activeSprite.atk_debuff[i]['id']]["value"];
			console.log("攻击 debuff",atk_ratio);
			if(AtkDebuffData[this.activeSprite.atk_debuff[i]['id']]["type"]==1){
				//百分比加成
				attack=Math.floor(attack*atk_ratio);
			}else if(AtkDebuffData[this.activeSprite.atk_debuff[i]['id']]["type"]==2){
				//固定值加成
				attack=attack-atk_ratio;
			}else{
				attack=attack;
			}
			if(this.activeSprite.atk_debuff[i]['id']==1){
				this.activeSprite.atk_debuff[i]['duration']=0;
			}
		}
		for(var i=0;i<defSoldier.def_buff.length;i++){
			// 有防御buff
			var def_ratio=DefBuffData[defSoldier.def_buff[i]['id']]["value"];
			console.log("防御 buff",def_ratio);
			if(DefBuffData[defSoldier.def_buff[i]['id']]["type"]==1){
				// 百分比防御加成
				defence=Math.floor(defence*def_ratio);
			}else if(DefBuffData[defSoldier.def_buff[i]['id']]["type"]==2){
				// 固定值加成
				defence=defence+def_ratio;
			}else{
				defence=defence;
			}
			if(defSoldier.def_buff[i]['id']==2){
				defSoldier.def_buff[i]['duration']=0;
			}
		}
		for(var i=0;i<defSoldier.def_debuff.length;i++){
			// 有防御debuff
			var def_ratio=DefDebuffData[defSoldier.def_debuff[i]['id']]["value"];
			console.log("防御 debuff",def_ratio);
			if(DefDebuffData[defSoldier.def_debuff[i]['id']]["type"]==1){
				// 百分比防御加成
				defence=Math.floor(defence*def_ratio);
			}else if(DefDebuffData[defSoldier.def_debuff[i]['id']]["type"]==2){
				// 固定值加成
				defence=defence-def_ratio;
			}else{
				defence=defence;
			}
			if(defSoldier.def_debuff[i]['id']==1){
				defSoldier.def_debuff[i]['duration']=0;
			}
		}
		defSoldier.getDamage(attack-defence);
	},
	makeHeal: function(soldier,power){
		// 检测是否受到地图因素影响 (现阶段就是图腾)
		for(var j=0;j<this.totemArr.length;j++){
			// 判断是否处于范围内
			var myPos=soldier.getCenterPosition();
			var totemPos=this.totemArr[j].getPosition();
			var tempDist=Math.pow(myPos.x-totemPos.x,2)+Math.pow(myPos.y-totemPos.y,2);
			var tempRadius=Math.pow(this.totemArr[j].radius,2);
			if(tempRadius>tempDist){
				// 在范围内 这里每个图腾只能带一种buff/debuff 否则会出问题
				if(soldier.team==this.totemArr[j].team){
					//同队 给增益buff
					if(this.totemArr[j].extra_buff>0){
						var heal_ratio=ExtraBuffData[this.totemArr[j].extra_buff]["value"];
						console.log("治疗 buff",heal_ratio);
						if(ExtraBuffData[this.totemArr[j].extra_buff]["type"]==1){
							// 百分比防御加成
							power=Math.floor(power*heal_ratio);
						}else if(ExtraBuffData[this.totemArr[j].extra_buff]["type"]==2){
							// 固定值加成
							power=power+heal_ratio;
						}else{
							power=power;
						}
					}
				}else{
					if(this.totemArr[j].extra_debuff>0){
						if(this.totemArr[j].extra_buff>0){
							var heal_ratio=ExtraDebuffData[this.totemArr[j].extra_debuff]["value"];
							console.log("治疗 debuff",heal_ratio);
							if(ExtraDebuffData[this.totemArr[j].extra_debuff]["type"]==1){
								// 百分比防御加成
								power=Math.floor(power*heal_ratio);
							}else if(ExtraDebuffData[this.totemArr[j].extra_debuff]["type"]==2){
								// 固定值加成
								power=power-heal_ratio;
							}else{
								power=power;
							}
						}
					}
				}
				
			}
		}
		soldier.getHeal(power);
	},
	addBuffDebuff: function(soldier,bullet){
		if(bullet.atk_buff>0){
			var atkbuff={"id":bullet.atk_buff,"duration":bullet.atk_buff_time};
			var tindex=soldier.atk_buff.existKey("id",atkbuff["id"]);
			if(tindex>0){
				soldier.atk_buff[tindex]["duration"]=atkbuff["duration"];
			}else{
				soldier.atk_buff.push(atkbuff);
			}
		}
		if(bullet.atk_debuff>0){
			var atkdebuff={"id":bullet.atk_debuff,"duration":bullet.atk_debuff_time};
			var tindex=soldier.atk_debuff.existKey("id",atkdebuff["id"]);
			if(tindex>0){
				soldier.atk_debuff[tindex]["duration"]=atkdebuff["duration"];
			}else{
				soldier.atk_debuff.push(atkdebuff);
			}
		}
		if(bullet.def_buff>0){
			var defbuff={"id":bullet.def_buff,"duration":bullet.def_buff_time};
			var tindex=soldier.def_buff.existKey("id",defbuff["id"]);
			if(tindex>0){
				soldier.def_buff[tindex]["duration"]=defbuff["duration"];
			}else{
				soldier.def_buff.push(defbuff);
			}
		}
		if(bullet.def_debuff>0){
			var defdebuff={"id":bullet.def_debuff,"duration":bullet.def_debuff_time};
			var tindex=soldier.def_debuff.existKey("id",defdebuff["id"]);
			if(tindex>0){
				soldier.def_debuff[tindex]["duration"]=defdebuff["duration"];
			}else{
				soldier.def_debuff.push(defdebuff);
			}
		}
		if(bullet.extra_buff>0){
			var extrabuff={"id":bullet.extra_buff,"duration":bullet.extra_buff_time};
			var tindex=soldier.extra_buff.existKey("id",extrabuff["id"]);
			if(tindex>0){
				soldier.extra_buff[tindex]["duration"]=extrabuff["duration"];
			}else{
				soldier.extra_buff.push(extrabuff);
			}
		}
		if(bullet.extra_debuff>0){
			var extradebuff={"id":bullet.extra_debuff,"duration":bullet.extra_debuff_time};
			var tindex=soldier.extra_debuff.existKey("id",extradebuff["id"]);
			if(tindex>0){
				soldier.extra_debuff[tindex]["duration"]=extradebuff["duration"];
			}else{
				soldier.extra_debuff.push(extradebuff);
			}
		}
	},
	addBuffOnly: function(soldier,bullet){
		if(bullet.atk_buff>0){
			var atkbuff={"id":bullet.atk_buff,"duration":bullet.atk_buff_time};
			var tindex=soldier.atk_buff.existKey("id",atkbuff["id"]);
			if(tindex>0){
				soldier.atk_buff[tindex]["duration"]=atkbuff["duration"];
			}else{
				soldier.atk_buff.push(atkbuff);
			}
		}
		if(bullet.def_buff>0){
			var defbuff={"id":bullet.def_buff,"duration":bullet.def_buff_time};
			var tindex=soldier.def_buff.existKey("id",defbuff["id"]);
			if(tindex>0){
				soldier.def_buff[tindex]["duration"]=defbuff["duration"];
			}else{
				soldier.def_buff.push(defbuff);
			}
		}
		if(bullet.extra_buff>0){
			var extrabuff={"id":bullet.extra_buff,"duration":bullet.extra_buff_time};
			var tindex=soldier.extra_buff.existKey("id",extrabuff["id"]);
			if(tindex>0){
				soldier.extra_buff[tindex]["duration"]=extrabuff["duration"];
			}else{
				soldier.extra_buff.push(extrabuff);
			}
		}
	},
	addDebuffOnly: function(soldier,bullet){
		if(bullet.atk_debuff>0){
			var atkdebuff={"id":bullet.atk_debuff,"duration":bullet.atk_debuff_time};
			var tindex=soldier.atk_debuff.existKey("id",atkdebuff["id"]);
			if(tindex>0){
				soldier.atk_debuff[tindex]["duration"]=atkdebuff["duration"];
			}else{
				soldier.atk_debuff.push(atkdebuff);
			}
		}
		if(bullet.def_debuff>0){
			var defdebuff={"id":bullet.def_debuff,"duration":bullet.def_debuff_time};
			var tindex=soldier.def_debuff.existKey("id",defdebuff["id"]);
			if(tindex>0){
				soldier.def_debuff[tindex]["duration"]=defdebuff["duration"];
			}else{
				soldier.def_debuff.push(defdebuff);
			}
		}
		if(bullet.extra_debuff>0){
			var extradebuff={"id":bullet.extra_debuff,"duration":bullet.extra_debuff_time};
			var tindex=soldier.extra_debuff.existKey("id",extradebuff["id"]);
			if(tindex>0){
				soldier.extra_debuff[tindex]["duration"]=extradebuff["duration"];
			}else{
				soldier.extra_debuff.push(extradebuff);
			}
		}
	},
	reduceBuffCDTime: function(){
		for(var i=0;i<this.teamArr1.length;i++){
			this.teamArr1[i].reduceBuffDebuffTime();
			this.teamArr1[i].reduceSkillCD();
		}
		for(var i=0;i<this.teamArr2.length;i++){
			this.teamArr2[i].reduceBuffDebuffTime();
			this.teamArr2[i].reduceSkillCD();
		}
		// 图腾持续时间
		var tempToDelTotem=new Array();
		for(var i=0;i<this.totemArr.length;i++){
			this.totemArr[i].last_time-=1;
			console.log("totem remain:",this.totemArr[i].last_time)
			if(this.totemArr[i].last_time<=0){
				tempToDelTotem.push(this.totemArr[i]);
			}
		}
		// 移除图腾 不能在循环中移除 因为会影响数组长度
		for(var i=0;i<tempToDelTotem.length;i++){
			this.removeChild(tempToDelTotem[i]);
			this.totemArr.remove(tempToDelTotem[i]);
		}
	},
	soldierUpdateBuffDebuff: function(){
		for(var i=0;i<this.teamArr1.length;i++){
			this.teamArr1[i].refreshStatus();
		}
		for(var i=0;i<this.teamArr2.length;i++){
			this.teamArr2[i].refreshStatus();
		}
	},
	setSkillCD: function(soldier){
		this.getParent().uiLayer.skillBtn1.setSkill(SoldierData[soldier.type]["skill1"]);
		this.getParent().uiLayer.skillBtn1.setCD(soldier.skill1_cd);
		this.getParent().uiLayer.skillBtn2.setSkill(SoldierData[soldier.type]["skill2"]);
		this.getParent().uiLayer.skillBtn2.setCD(soldier.skill2_cd);
	},
	//AI用
	findClosestEnemy: function(soldier){
		var dist=99999999999;
		var p1=soldier.getCenterPosition();
		var targetSoldier=null;
		if(soldier.team==0){
			//找队伍2中
			for(var i=0;i<this.teamArr2.length;i++){
				var p2=this.teamArr2[i].getCenterPosition();
				var tempdist=Math.pow(p1.x-p2.x, 2)+Math.pow(p1.y-p2.y, 2);
				if(tempdist<=dist){
					dist=tempdist;
					targetSoldier=this.teamArr2[i];
				}
			}
			return targetSoldier;
		}
		if(soldier.team==1){
			//找队伍1中
			for(var i=0;i<this.teamArr1.length;i++){
				var p2=this.teamArr1[i].getCenterPosition();
				var tempdist=Math.pow(p1.x-p2.x, 2)+Math.pow(p1.y-p2.y, 2);
				if(tempdist<=dist){
					dist=tempdist;
					targetSoldier=this.teamArr1[i];
				}
			}
			return targetSoldier;
		}
	},
	aiShoot: function(soldier,targetSoldier){
		// 计算 target相对于本身的角度
		var selfPosition=soldier.getCenterPosition();
		var targetPosition=targetSoldier.getCenterPosition();

		console.log("selfPosition",selfPosition);
		console.log("targetPosition",targetPosition);
		var dx=targetPosition.x-selfPosition.x;
		var dy=targetPosition.y-selfPosition.y;
		var angle=Math.atan2(dx,dy);

		//精灵行动
		//精灵移动
		this.activeSprite.vx=10*Math.sin(angle);
		this.activeSprite.vy=10*Math.cos(angle);
		angle1 = angle*(180/Math.PI);
		this.activeSprite.mainSprite.setRotation(angle1);

		// AI暂时不使用技能
		/*
		var skillUsed=this.getParent().uiLayer.getSkillUsed();

		if(skillUsed>0){
			var skillId=SoldierData[this.activeSprite.type]["skill"+skillUsed];
			this.activeSprite.showSkillName(skillId);

			this.soldierUseSkill(this.activeSprite,angle);
			if(SkillData[SoldierData[this.activeSprite.type]["skill"+skillUsed]]["type"]==1){
				//如果是激活的buff类技能 那么只是赋予状态 常规工作仍要继续完成
				this.soldierAttackAction(this.activeSprite,angle); // angle为初始值
			}
		}else{
			this.soldierAttackAction(this.activeSprite,angle); // angle为初始值
		}
		*/
		this.soldierAttackAction(this.activeSprite,angle);

		this.activeSprite.resetAgility();

		this.getParent().uiLayer.resetSkillState();
	},
	aiDoAction: function(activeSprite){
		this.activeSprite=activeSprite;
		var tar=this.findClosestEnemy(activeSprite);
		this.aiShoot(activeSprite,tar);
	}
});