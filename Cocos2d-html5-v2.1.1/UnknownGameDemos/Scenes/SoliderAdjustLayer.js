var SoliderAdjustLayer=cc.Layer.extend({
	bgLayer:null,//背景颜色
	soldierSprite:null,//精灵头像
	atkAttrAdjust:null,//属性调整
	defAttrAdjust:null,
	spdAttrAdjust:null,
	conAttrAdjust:null,
	resetBtn:null,
	type:1, //士兵种类
	ctor: function(type){
		this._super();
		this.setTouchEnabled(true);
		this.type=type;

		var size = cc.Director.getInstance().getWinSize();
		this.setContentSize(new cc.Size(200,380));
		//添加一个底色
		this.bgLayer = cc.LayerColor.create(new cc.Color4B(70, 100, 100, 120), 200, 380);
        this.addChild(this.bgLayer);

        // 角色精灵
        this.soldierSprite=cc.Sprite.create(SoldierData[this.type]["img"]);
        var spriteSize=this.soldierSprite.getContentSize();
        this.soldierSprite.setScale(100/spriteSize.width); // 精灵宽度100
        this.soldierSprite.setPosition(100,300);
        this.addChild(this.soldierSprite);

        // 攻击调整
		this.atkAttrAdjust=new AttributeAdjustSprite("ATK: 30");
		this.atkAttrAdjust.setPosition(10,340-20-100-8-30);
		this.addChild(this.atkAttrAdjust);

		// 防御调整
		this.defAttrAdjust=new AttributeAdjustSprite("DEF: 30");
		this.defAttrAdjust.setPosition(10,340-20-100-8*2-30*2);
		this.addChild(this.defAttrAdjust);

		// 速度调整
		this.spdAttrAdjust=new AttributeAdjustSprite("SPD: 30");
		this.spdAttrAdjust.setPosition(10,340-20-100-8*3-30*3);
		this.addChild(this.spdAttrAdjust);

		// 生命调整
		this.conAttrAdjust=new AttributeAdjustSprite("CON: 30");
		this.conAttrAdjust.setPosition(10,340-20-100-8*4-30*4);
		this.addChild(this.conAttrAdjust);

		// 重置按钮
		this.resetBtn=new SimpleBtnSprite(new cc.Color4B(0,0,0,0),new cc.Size(120,30),commonColor3B["black"],true);
		this.resetBtn.setPosition(40,20);
		this.resetBtn.setString("Reset");
		this.addChild(this.resetBtn);

		this.schedule(this.update);
	},
	update: function(dt){
		this.atkAttrAdjust.setAttr("ATK: "+(SoldierData[this.type]["atk"]+SoldierData[this.type]["addition_atk"]));
		this.defAttrAdjust.setAttr("DEF: "+(SoldierData[this.type]["def"]+SoldierData[this.type]["addition_def"]));
		this.spdAttrAdjust.setAttr("SPD: "+(SoldierData[this.type]["agility"]-SoldierData[this.type]["addition_agility"]));
		this.conAttrAdjust.setAttr("CON: "+(SoldierData[this.type]["blood"]+SoldierData[this.type]["addition_blood"]));
	},
	handleTouchEnd: function(pos){
		if(cc.rectContainsPoint(this.atkAttrAdjust.getBoundingBox(),pos)){
			var tempPos=this.atkAttrAdjust.getPosition();
			this.atkAttrAdjust.handleTouchEnd(new cc.Point(pos.x-tempPos.x,pos.y-tempPos.y),this.type,1);
		}
		if(cc.rectContainsPoint(this.defAttrAdjust.getBoundingBox(),pos)){
			var tempPos=this.defAttrAdjust.getPosition();
			this.defAttrAdjust.handleTouchEnd(new cc.Point(pos.x-tempPos.x,pos.y-tempPos.y),this.type,2);
		}
		if(cc.rectContainsPoint(this.spdAttrAdjust.getBoundingBox(),pos)){
			var tempPos=this.spdAttrAdjust.getPosition();
			this.spdAttrAdjust.handleTouchEnd(new cc.Point(pos.x-tempPos.x,pos.y-tempPos.y),this.type,3);
		}
		if(cc.rectContainsPoint(this.conAttrAdjust.getBoundingBox(),pos)){
			var tempPos=this.conAttrAdjust.getPosition();
			this.conAttrAdjust.handleTouchEnd(new cc.Point(pos.x-tempPos.x,pos.y-tempPos.y),this.type,4);
		}
		if(cc.rectContainsPoint(this.resetBtn.getBoundingBox(),pos)){
			//重置属性按钮
			var addBackPoint=SoldierData[this.type]["addition_atk"]/2+SoldierData[this.type]["addition_def"]/2+SoldierData[this.type]["addition_agility"]/3+SoldierData[this.type]["addition_blood"]/10;
			SoldierData[this.type]["addition_atk"]=0;
			SoldierData[this.type]["addition_def"]=0;
			SoldierData[this.type]["addition_agility"]=0;
			SoldierData[this.type]["addition_blood"]=0;
			Game.remainPoint+=addBackPoint;
		}
	}
})