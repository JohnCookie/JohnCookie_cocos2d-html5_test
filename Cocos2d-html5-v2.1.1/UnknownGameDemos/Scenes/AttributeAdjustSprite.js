var AttributeAdjustSprite=cc.Sprite.extend({
	// 包含一个Label 显示名称 ATK/DEF/SPD/CON + 数字 表示当前值
	// 一个+号 表示增加 一个减号 表示减少
	// ATK/DEF 一点属性值兑换2点属性增加
	// SPD 一点属性值 对应3点速度增强
	// CON 一点属性值 对应10点生命值上限
	attrLabel: null,
	addAttrBtn: null,
	minusAttrBtn: null,
	btnScale: 1,
	ctor: function(str){
		this._super();
		this.setContentSize(new cc.Size(180,30));

		// 文字
		this.attrLabel=cc.LabelTTF.create(str, "Arial", 18);
		this.attrLabel.setColor(commonColor3B["black"]);
		this.attrLabel.setContentSize(new cc.Size(50,25));
		this.attrLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		this.attrLabel.setAnchorPoint(cc.PointMake(0,0.5));
		this.attrLabel.setPosition(15,18);
		this.addChild(this.attrLabel);
		//增加按钮
		this.addAttrBtn=cc.Sprite.create("Sprites/spriteRes/plus_btn.png");
		var btnSize=this.addAttrBtn.getContentSize();
		this.addAttrBtn.setContentSize(new cc.Size(25,25));
		this.scale=25/btnSize.width;
		this.addAttrBtn.setScale(this.scale);
		this.addAttrBtn.setPosition(120,9);
		this.addChild(this.addAttrBtn);
		// 减少按钮
		this.minusAttrBtn=cc.Sprite.create("Sprites/spriteRes/minus_btn.png");
		this.minusAttrBtn.setContentSize(new cc.Size(25,25));
		this.minusAttrBtn.setScale(this.scale);
		this.minusAttrBtn.setPosition(150,9);
		this.addChild(this.minusAttrBtn);
	},
	update: function(dt){

	},
	draw: function(){
		var color=this.attrLabel.getColor();
		var r=color.r;
		var g=color.g;
		var b=color.b;
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+",255)";
		cc.renderContext.lineWidth=2;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+",255)";
        var position=new cc.Point(0,0);
        var size=this.getContentSize();
        var point1=position;
        var point2=new cc.Point(position.x+size.width,position.y);
        var point3=new cc.Point(position.x+size.width,position.y+size.height);
        var point4=new cc.Point(position.x,position.y+size.height);
        cc.drawingUtil.drawPoly(new Array(point1,point2,point3,point4),4,true,false);
	},
	setAttr: function(str){
		this.attrLabel.setString(str);
	},
	handleTouchEnd: function(pos,type,attr){ //1 atk 2 def 3 agi 4 hp
		var value=0;
		switch(attr){
			case 1:
				value=2;
				break;
			case 2:
				value=2;
				break;
			case 3:
				value=3;
				break;
			case 4:
				value=10;
				break;
		}
		var attrKey=new Array("","addition_atk","addition_def","addition_agility","addition_blood");
		if(cc.rectContainsPoint(new cc.Rect(115,5,25,25),pos)){
			if(Game.remainPoint>0){
				SoldierData[type][attrKey[attr]]+=value;
				Game.remainPoint-=1;
			}
		}
		if(cc.rectContainsPoint(new cc.Rect(145,5,25,25),pos)){
			if(SoldierData[type][attrKey[attr]]-value>=0){
				SoldierData[type][attrKey[attr]]-=value;
				Game.remainPoint+=1;
			}
		}
	}

});