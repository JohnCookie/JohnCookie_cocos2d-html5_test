var UILayer=cc.Layer.extend({
	restartBtn:null,
	skillBtn1:null,
	skillBtn2:null,
	cancelSkillBtn:null,
	teamStatusLabel:null,
	init: function(){
		this._super();
		this.setTouchEnabled(true);

        var size = cc.Director.getInstance().getWinSize();

		this.restartBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(100,30),new cc.Color3B(255,0,0),true);
		this.restartBtn.setPosition(new cc.Point(15,size.height-40));
		this.restartBtn.setString("Restart");
		this.addChild(this.restartBtn);

		this.skillBtn1=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(50,50),new cc.Color3B(0,100,0),true);
		this.skillBtn1.setPosition(new cc.Point(size.width-50*3-20,10));
		this.skillBtn1.setString("Skill 1");
		this.addChild(this.skillBtn1);

		this.skillBtn2=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(50,50),new cc.Color3B(0,100,0),true);
		this.skillBtn2.setPosition(new cc.Point(size.width-50*2,10));
		this.skillBtn2.setString("Skill 2");
		this.addChild(this.skillBtn2);

		this.cancelSkillBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(120,30),new cc.Color3B(0,100,0),true);
		this.cancelSkillBtn.setPosition(new cc.Point(size.width-50*3-20,70));
		this.cancelSkillBtn.setString("Cancel Skill");
		this.addChild(this.cancelSkillBtn);

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