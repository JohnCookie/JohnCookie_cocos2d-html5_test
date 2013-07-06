var SimpleSkillSprite=cc.Sprite.extend({
	//技能图标精灵
	width: 50,
	height: 50,
	skillWidth: 40,
	skillHeight: 40,
	bg_sel: "Sprites/spriteRes/skills/bg_select.png",
	bg_unsel: "Sprites/spriteRes/skills/bg_unselect.png",
	cdLabel: null,
	skillImgSprite:null,
	bgImgSprite:null,
	status: 0,
	ctor: function(){
		this._super();

		this.initWithFile("Sprites/spriteRes/skills/bg_unselect.png");
		this.setContentSize(this.width,this.height);
		

		//底色圈
		this.bgImgSprite=cc.Sprite.create(this.bg_unsel);
		this.bgImgSprite.setAnchorPoint(cc.PointMake(0.5,0.5));
		this.bgImgSprite.setPosition(this.width/2,this.height/2);
		//底色圈缩放
		var bgSize=this.bgImgSprite.getContentSize();
		var sX=this.width/bgSize.width;
		var sY=this.height/bgSize.height;
		this.bgImgSprite.setScaleX(sX);
		this.bgImgSprite.setScaleY(sY);

		this.addChild(this.bgImgSprite);

		//中心技能图标
		this.skillImgSprite=cc.Sprite.create("Sprites/spriteRes/skills/bg_select.png");
		this.skillImgSprite.setAnchorPoint(cc.PointMake(0.5,0.5));
		this.skillImgSprite.setPosition(this.width/2,this.height/2);
		//中心技能图标缩放
		var skillSize=this.skillImgSprite.getContentSize();
		var sX2=this.skillWidth/skillSize.width;
		var sY2=this.skillHeight/skillSize.height;
		this.skillImgSprite.setScaleX(sX2);
		this.skillImgSprite.setScaleY(sY2);

		this.addChild(this.skillImgSprite);

		// CD字符显示
		this.cdLabel=cc.LabelTTF.create("16", "Arial", 22);
		this.cdLabel.setColor(commonColor3B["red"]);
		this.cdLabel.setPosition(this.width/2,this.height/2);
		this.addChild(this.cdLabel);
	},
	setCD: function(cd){
		if(cd>0){
			this.cdLabel.setString(""+cd);
			if(this.cdLabel.getParent()==null){
				this.addChild(this.cdLabel);
			}
		}else{
			this.removeChild(this.cdLabel);			
		}
	},
	setBG: function(status){
		this.status=status;
		if(status==0){
			//未选中
			this.bgImgSprite.initWithFile(this.bg_unsel);
		}
		if(status==1){
			//选中
			this.bgImgSprite.initWithFile(this.bg_sel);
		}
	},
	setSkill: function(id){
		var url=SkillData[id]["img"];
		this.skillImgSprite.initWithFile(url);
	}
});