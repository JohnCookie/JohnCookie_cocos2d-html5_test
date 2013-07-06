var SimpleSoldierAttrLayer=cc.Layer.extend({
	bgLayer: null,
	soldierAttr1:null,
	soldierAttr2:null,
	soldierAttr3:null,
	backBtn:null,
	leftPointLabel:null,
	ctor: function(){
		this._super();
	},
	init: function(){
		this.setTouchEnabled(true);
		var size = cc.Director.getInstance().getWinSize();

		//添加一个底色
		this.bgLayer = cc.LayerColor.create(new cc.Color4B(170, 210, 100, 255), 800, 480);
        this.addChild(this.bgLayer);

		this.soldierAttr1=new SoliderAdjustLayer(1);
		this.soldierAttr1.setPosition(50,90);
		this.addChild(this.soldierAttr1);

		this.soldierAttr2=new SoliderAdjustLayer(2);
		this.soldierAttr2.setPosition(50+200+50,90);
		this.addChild(this.soldierAttr2);

		this.soldierAttr3=new SoliderAdjustLayer(3);
		this.soldierAttr3.setPosition(50+200*2+50*2,90);
		this.addChild(this.soldierAttr3);

		this.backBtn=cc.Sprite.create("Sprites/spriteRes/back.png");
        var spriteSize=this.backBtn.getContentSize();
        this.backBtn.setScale(60/spriteSize.width);
        this.backBtn.setPosition(800-45,45);
        this.addChild(this.backBtn);

        this.leftPointLabel=cc.LabelTTF.create("Left Point: "+Game.remainPoint, "Arial", 18);
		this.leftPointLabel.setColor(commonColor3B["red"]);
		this.leftPointLabel.setPosition(size.width/2,30);
		this.addChild(this.leftPointLabel);

		this.schedule(this.update);
	},
	update: function(dt){
		this.leftPointLabel.setString("Left Point: "+Game.remainPoint);
	},
	onTouchesEnded: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();

		//后退
		if(cc.rectContainsPoint(this.backBtn.getBoundingBox(),touchPoint)){
			var scene = new StartGameScene();
			cc.Director.getInstance().replaceScene(scene);
		}
		if(cc.rectContainsPoint(this.soldierAttr1.getBoundingBox(),touchPoint)){
			this.soldierAttr1.handleTouchEnd(new cc.Point(touchPoint.x-50,touchPoint.y-90));
		}
		if(cc.rectContainsPoint(this.soldierAttr2.getBoundingBox(),touchPoint)){
			this.soldierAttr2.handleTouchEnd(new cc.Point(touchPoint.x-50*2-200,touchPoint.y-90));
		}
		if(cc.rectContainsPoint(this.soldierAttr3.getBoundingBox(),touchPoint)){
			this.soldierAttr3.handleTouchEnd(new cc.Point(touchPoint.x-50*3-200*2,touchPoint.y-90));
		}
	}
});

var SimpleSoldierAttrScene=cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new SimpleSoldierAttrLayer();
		layer.init();
		this.addChild(layer);
	}
});