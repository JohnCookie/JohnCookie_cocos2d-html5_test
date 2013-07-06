var StartGameLayer=cc.Layer.extend({
	playWithAIBtn: null,
	playOnHotSeatBtn: null,
	gameConfigBtn: null,
	bgLayer: null,
	init: function(){
		this._super();
		this.setTouchEnabled(true);

		var size = cc.Director.getInstance().getWinSize();

		//添加一个底色
		this.bgLayer = cc.LayerColor.create(new cc.Color4B(170, 210, 100, 255), 800, 480);
        this.addChild(this.bgLayer);

        // 进入与AI对抗
		this.playWithAIBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(300,50),commonColor3B["red"],true);
		this.playWithAIBtn.setPosition(size.width/2-150,size.height/2+75);
		this.playWithAIBtn.setString("Play With AI !");
		this.addChild(this.playWithAIBtn);

		// 进入同屏对抗
		this.playOnHotSeatBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(300,50),commonColor3B["red"],true);
		this.playOnHotSeatBtn.setPosition(size.width/2-150,size.height/2-25);
		this.playOnHotSeatBtn.setString("Play With Friend (Hot Seat)");
		this.addChild(this.playOnHotSeatBtn);

		// 进入同屏对抗
		this.gameConfigBtn=new SimpleBtnSprite(new cc.Color4B(200,200,0,130),new cc.Size(300,50),commonColor3B["red"],true);
		this.gameConfigBtn.setPosition(size.width/2-150,size.height/2-125);
		this.gameConfigBtn.setString("Game Configs");
		this.addChild(this.gameConfigBtn);
	},
	onTouchesEnded: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		if(cc.rectContainsPoint(this.playWithAIBtn.getBoundingBox(),touchPoint)){
			console.log("---Play With AI---");
			Game.playWithAI=1;
			var scene = new SimpleConfigArmyScene();
			// var transScene = cc.TransitionMoveInL.create(0,scene);
			cc.Director.getInstance().replaceScene(scene);
		}
		if(cc.rectContainsPoint(this.playOnHotSeatBtn.getBoundingBox(),touchPoint)){
			console.log("---Play On Hot Seat---");
			Game.playWithAI=0;
			var scene = new SimpleConfigArmyScene();
			// var transScene = cc.TransitionMoveInL.create(0,scene);
			cc.Director.getInstance().replaceScene(scene);
		}
		if(cc.rectContainsPoint(this.gameConfigBtn.getBoundingBox(),touchPoint)){
			console.log("---Game Config---");
			var scene = new SimpleSoldierAttrScene();
			// var transScene = cc.TransitionMoveInL.create(0,scene);
			cc.Director.getInstance().replaceScene(scene);
		}
	},
	onTouchesBegan: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
	},
	onTouchesMoved: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
	},
});

var StartGameScene=cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new StartGameLayer();
		layer.init();
		this.addChild(layer);
	}
});