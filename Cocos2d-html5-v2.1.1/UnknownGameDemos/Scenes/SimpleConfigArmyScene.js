var SimpleConfigArmyLayer=cc.Layer.extend({
	bgLayer:null,
	battleBtn:null,
	backBtn:null,
	soldier1Sprite:null,
	soldier2Sprite:null,
	soldier3Sprite:null,
	soldier4Sprite:null,
	soldier5Sprite:null,
	soldier1mini:null,
	soldier2mini:null,
	soldier3mini:null,
	soldier4mini:null,
	soldier5mini:null,
	army1Label:null,
	army1border:null,
	army2Label:null,
	army2border:null,
	promptLabel:null,
	touchStatus:0, // 0 normal >0 soldiertype
	tempSprite:null,
	armyTempSpriteArr: new Array(),
	init: function(){
		this.setTouchEnabled(true);
		var size = cc.Director.getInstance().getWinSize();

		//添加一个底色
		this.bgLayer = cc.LayerColor.create(new cc.Color4B(170, 210, 100, 255), 800, 480);
        this.addChild(this.bgLayer);

        //后退按钮
		this.backBtn=cc.Sprite.create("Sprites/spriteRes/back.png");
        var spriteSize=this.backBtn.getContentSize();
        this.backBtn.setScale(60/spriteSize.width);
        this.backBtn.setPosition(800-45,45);
        this.addChild(this.backBtn);

        //战斗按钮
        this.battleBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(100,30),new cc.Color3B(255,0,0),true);
		this.battleBtn.setPosition(new cc.Point(size.width/2,25));
		this.battleBtn.setString("Battle!");
		this.addChild(this.battleBtn);

        //3种士兵图标 放在中间
        this.soldier1Sprite=cc.Sprite.create(SoldierData[1]["img"]);
        var spriteSize=this.soldier1Sprite.getContentSize();
        this.soldier1Sprite.setScale(50/spriteSize.width); // 精灵宽度100
        this.soldier1Sprite.setPosition(size.width/2-200,size.height/2+50);
        this.addChild(this.soldier1Sprite);

        this.soldier2Sprite=cc.Sprite.create(SoldierData[2]["img"]);
        var spriteSize=this.soldier2Sprite.getContentSize();
        this.soldier2Sprite.setScale(50/spriteSize.width); // 精灵宽度100
        this.soldier2Sprite.setPosition(size.width/2-100,size.height/2+50);
        this.addChild(this.soldier2Sprite);

        this.soldier3Sprite=cc.Sprite.create(SoldierData[3]["img"]);
        var spriteSize=this.soldier3Sprite.getContentSize();
        this.soldier3Sprite.setScale(50/spriteSize.width); // 精灵宽度100
        this.soldier3Sprite.setPosition(size.width/2,size.height/2+50);
        this.addChild(this.soldier3Sprite);

        this.soldier4Sprite=cc.Sprite.create(SoldierData[4]["img"]);
        var spriteSize=this.soldier4Sprite.getContentSize();
        this.soldier4Sprite.setScale(50/spriteSize.width); // 精灵宽度100
        this.soldier4Sprite.setPosition(size.width/2+100,size.height/2+50);
        this.addChild(this.soldier4Sprite);

        this.soldier5Sprite=cc.Sprite.create(SoldierData[5]["img"]);
        var spriteSize=this.soldier5Sprite.getContentSize();
        this.soldier5Sprite.setScale(50/spriteSize.width); // 精灵宽度100
        this.soldier5Sprite.setPosition(size.width/2+200,size.height/2+50);
        this.addChild(this.soldier5Sprite);

        //提示语句
        this.promptLabel=cc.LabelTTF.create("Drag Soldiers To The Army Rect\r\nClick To Cancel Soldier In Army", "Arial", 18);
		this.promptLabel.setColor(commonColor3B["red"]);
		this.promptLabel.setPosition(size.width/2,size.height/2-20);
		this.addChild(this.promptLabel);

        //我的队伍
        this.army1Label=cc.LabelTTF.create("My Team", "Arial", 24);
		this.army1Label.setColor(commonColor3B["blue"]);
		this.army1Label.setPosition(80,420);
		this.addChild(this.army1Label);

        this.army1border=new SimpleArmyShowSprite();
        this.army1border.setPosition(150,400);
        this.addChild(this.army1border);

        //敌方部队
        this.army2Label=cc.LabelTTF.create("Enemy", "Arial", 24);
		this.army2Label.setColor(commonColor3B["blue"]);
		this.army2Label.setPosition(80,100);
		this.addChild(this.army2Label);

        this.army2border=new SimpleArmyShowSprite();
        this.army2border.setPosition(150,80);
        this.addChild(this.army2border);

        //3种士兵的mini图案
        this.soldier1mini=new SoldierMiniSprite(1);
        this.soldier2mini=new SoldierMiniSprite(2);
        this.soldier3mini=new SoldierMiniSprite(3);
        this.soldier4mini=new SoldierMiniSprite(4);
        this.soldier5mini=new SoldierMiniSprite(5);

        this.refreshSoldierArmy();
	},
	onTouchesEnded: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		this.removeChild(this.soldier1mini);
		this.removeChild(this.soldier2mini);
		this.removeChild(this.soldier3mini);
		this.removeChild(this.soldier4mini);
		this.removeChild(this.soldier5mini);
		if(this.touchStatus>0){
			//这是安排队伍
			if(cc.rectContainsPoint(this.army1border.getBoundingBox(),touchPoint)){
				this.addSoldierArmy(0,this.touchStatus);
				this.refreshSoldierArmy();
			}
			if(cc.rectContainsPoint(this.army2border.getBoundingBox(),touchPoint)){
				this.addSoldierArmy(1,this.touchStatus);
				this.refreshSoldierArmy();
			}
			this.touchStatus=0;
		}else{
			//处理按钮
			if(cc.rectContainsPoint(this.battleBtn.getBoundingBox(),touchPoint)){
				var scene = new GameScene();
				// var transScene = cc.TransitionMoveInL.create(0,scene);
				cc.Director.getInstance().replaceScene(scene);
			}
			if(cc.rectContainsPoint(this.backBtn.getBoundingBox(),touchPoint)){
				var scene = new StartGameScene();
				// var transScene = cc.TransitionMoveInL.create(0,scene);
				cc.Director.getInstance().replaceScene(scene);
			}
			//去除配置好的士兵
			if(cc.rectContainsPoint(this.army1border.getBoundingBox(),touchPoint)){
				var index=this.getIndex(touchPoint.x);
				this.removeSoldierArmy(0,index-1); //数组下标0开始
				this.refreshSoldierArmy();
			}
			if(cc.rectContainsPoint(this.army2border.getBoundingBox(),touchPoint)){
				var index=this.getIndex(touchPoint.x);
				this.removeSoldierArmy(1,index-1);
				this.refreshSoldierArmy();
			}
		}
	},
	onTouchesBegan: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		if(cc.rectContainsPoint(this.soldier1Sprite.getBoundingBox(),touchPoint)){
			this.soldier1mini.setPosition(touchPoint);
			this.addChild(this.soldier1mini);
			this.touchStatus=1;
		}
		if(cc.rectContainsPoint(this.soldier2Sprite.getBoundingBox(),touchPoint)){
			this.soldier2mini.setPosition(touchPoint);
			this.addChild(this.soldier2mini);
			this.touchStatus=2;
		}
		if(cc.rectContainsPoint(this.soldier3Sprite.getBoundingBox(),touchPoint)){
			this.soldier3mini.setPosition(touchPoint);
			this.addChild(this.soldier3mini);
			this.touchStatus=3;
		}
		if(cc.rectContainsPoint(this.soldier4Sprite.getBoundingBox(),touchPoint)){
			this.soldier4mini.setPosition(touchPoint);
			this.addChild(this.soldier4mini);
			this.touchStatus=4;
		}
		if(cc.rectContainsPoint(this.soldier5Sprite.getBoundingBox(),touchPoint)){
			this.soldier5mini.setPosition(touchPoint);
			this.addChild(this.soldier5mini);
			this.touchStatus=5;
		}
	},
	onTouchesMoved: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		if(this.touchStatus>0){
			switch(this.touchStatus){
				case 1:
					this.soldier1mini.setPosition(touchPoint);
					break;
				case 2:
					this.soldier2mini.setPosition(touchPoint);
					break;
				case 3:
					this.soldier3mini.setPosition(touchPoint);
					break;
				case 4:
					this.soldier4mini.setPosition(touchPoint);
					break;
				case 5:
					this.soldier5mini.setPosition(touchPoint);
					break;
			}
		}
	},
	addSoldierArmy: function(team,soldierType){
		if(team==0){
			if(Game.team1Soldiers.length<10){
				//可以继续添加
				Game.team1Soldiers.push(soldierType);
			}
		}
		if(team==1){
			if(Game.team2Soldiers.length<10){
				//可以继续添加
				Game.team2Soldiers.push(soldierType);
			}
		}
	},
	removeSoldierArmy: function(team,index){
		if(team==0){
			Game.team1Soldiers=Game.team1Soldiers.del(index);
		}
		if(team==1){
			Game.team2Soldiers=Game.team2Soldiers.del(index);
		}
	},
	getIndex: function(x){
		var index=Math.ceil((x-150)/60);
		return index;
	},
	refreshSoldierArmy: function(){
		// 清楚之前的队列
		for(var k=0;k<this.armyTempSpriteArr.length;k++){
			this.removeChild(this.armyTempSpriteArr[k]);
		}
		for(var i=0;i<Game.team1Soldiers.length;i++){
			// 画一队的
			var sprite=new SoldierMiniSprite(Game.team1Soldiers[i]);
			this.armyTempSpriteArr.push(sprite);
			sprite.setPosition(150+30+i*60,430);
			this.addChild(sprite);
		}
		for(var j=0;j<Game.team2Soldiers.length;j++){
			// 画2队的
			var sprite=new SoldierMiniSprite(Game.team2Soldiers[j]);
			this.armyTempSpriteArr.push(sprite);
			sprite.setPosition(150+30+j*60,110);
			this.addChild(sprite);
		}
	}
});

var SimpleConfigArmyScene=cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new SimpleConfigArmyLayer();
		layer.init();
		this.addChild(layer);
	}
});