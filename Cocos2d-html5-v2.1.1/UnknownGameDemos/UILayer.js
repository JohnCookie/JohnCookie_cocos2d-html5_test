var UILayer=cc.Layer.extend({
	restartBtn:null,
	skillBtn1:null,
	skillBtn2:null,
	cancelSkillBtn:null,
	teamStatusLabel:null,
	showSpriteBorderBtn:null,
	showSpriteCollisionBorderBtn:null,
	init: function(){
		this._super();
		this.setTouchEnabled(true);

        var size = cc.Director.getInstance().getWinSize();

        // 重置游戏按钮
		this.restartBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(100,30),new cc.Color3B(255,0,0),true);
		this.restartBtn.setPosition(new cc.Point(15,size.height-40));
		this.restartBtn.setString("Restart");
		this.addChild(this.restartBtn);

		// 技能按钮1
		this.skillBtn1=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(50,50),new cc.Color3B(0,100,0),true);
		this.skillBtn1.setPosition(new cc.Point(size.width-50*3-20,10));
		this.skillBtn1.setString("Skill 1");
		this.addChild(this.skillBtn1);

		// 技能按钮2
		this.skillBtn2=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(50,50),new cc.Color3B(0,100,0),true);
		this.skillBtn2.setPosition(new cc.Point(size.width-50*2,10));
		this.skillBtn2.setString("Skill 2");
		this.addChild(this.skillBtn2);

		// 取消技能按钮
		this.cancelSkillBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(120,30),new cc.Color3B(0,100,0),true);
		this.cancelSkillBtn.setPosition(new cc.Point(size.width-50*3-20,70));
		this.cancelSkillBtn.setString("Cancel Skill");
		this.addChild(this.cancelSkillBtn);

		// 队伍剩余人数显示
		this.teamStatusLabel=new SimpleBtnSprite(new cc.Color4B(255,255,255,130),new cc.Size(200,30),new cc.Color3B(0,100,255),false);
		this.teamStatusLabel.setPosition(new cc.Point(size.width/2-100,size.height-40));
		this.teamStatusLabel.setString("Team A  5  :  5  Team B");
		this.addChild(this.teamStatusLabel);
		this.teamStatusLabel.setTeamANum=function(num){
			var tempStr=this.getString();
			var index=tempStr.indexOf(":");
			this.setString(tempStr.substring(0,index-3)+num+tempStr.substring(index-2));
		};
		this.teamStatusLabel.setTeamBNum=function(num){
			var tempStr=this.getString();
			this.setString(tempStr.substring(0,index+3)+num+tempStr.substring(index+4));
		};

		// 是否显示精灵外框
		this.showSpriteBorderBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(120,30),new cc.Color3B(255,0,0),true);
		this.showSpriteBorderBtn.setPosition(new cc.Point(60,10));
		this.showSpriteBorderBtn.setString("Border On/Off");
		this.addChild(this.showSpriteBorderBtn);

		// 是否显示精灵碰撞区域
		this.showSpriteCollisionBorderBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(175,30),new cc.Color3B(255,0,0),true);
		this.showSpriteCollisionBorderBtn.setPosition(new cc.Point(200,10));
		this.showSpriteCollisionBorderBtn.setString("CollisionArea On/Off");
		this.addChild(this.showSpriteCollisionBorderBtn);
	},
	onTouchesEnded: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		console.log("in UILayer");
		if(cc.rectContainsPoint(this.restartBtn.getBoundingBox(),touchPoint)){
			console.log("---R-E-S-T-A-R-T---");
			this.resetSkillState();
			this.getParent().mainLayer.demoInitTeam(5,5);
		}
		if(cc.rectContainsPoint(this.skillBtn1.getBoundingBox(),touchPoint)){
			console.log("---Skill 1---");
			this.skillBtn1.setBgColor(new cc.Color4B(255,100,10,200));
		}
		if(cc.rectContainsPoint(this.skillBtn2.getBoundingBox(),touchPoint)){
			console.log("---Skill 2---");
			this.skillBtn2.setBgColor(new cc.Color4B(255,100,10,200));
		}
		if(cc.rectContainsPoint(this.cancelSkillBtn.getBoundingBox(),touchPoint)){
			console.log("---Cancel Skill---");
			this.resetSkillState();
		}
		if(cc.rectContainsPoint(this.showSpriteBorderBtn.getBoundingBox(),touchPoint)){
			console.log("---Border On/Off---");
			Game.showSpriteBorder=!Game.showSpriteBorder;
		}
		if(cc.rectContainsPoint(this.showSpriteCollisionBorderBtn.getBoundingBox(),touchPoint)){
			console.log("---Collsion Area Show/Hide---");
			Game.showSpriteCollisionBorder=!Game.showSpriteCollisionBorder;
		}
	},
	onTouchesBegan: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
	},
	onTouchesMoved: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
	},
	resetSkillState: function(){
		this.skillBtn1.setBgColor(new cc.Color4B(200,200,0,130));
		this.skillBtn2.setBgColor(new cc.Color4B(200,200,0,130));
	}
});