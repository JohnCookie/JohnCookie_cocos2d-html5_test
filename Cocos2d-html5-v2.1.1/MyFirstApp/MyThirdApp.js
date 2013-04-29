var MyThirdApp =  cc.Layer.extend({
	_jetSprite:null,
	_bgLayer:null,
	init:function(){
		this._super();
		this._bgLayer=cc.LayerColor.create(new cc.Color4B(128,128,128,255));

		var size = cc.Director.getInstance().getWinSize();

		this._jetSprite = new JetSprite();
		this.setTouchEnabled(true);
		this.setKeyboardEnabled(true);

		this._bgLayer.setPosition(new cc.Point(0.0,0.0));
		this._bgLayer.addChild(this._jetSprite);

		this.setPosition(new cc.Point(0,0));

		this._jetSprite.setPosition(new cc.Point(size.width/2,size.height/2));
		this._bgLayer.setPosition(new cc.Point(0.0,0.0));

		this._jetSprite.scheduleUpdate();
		this.schedule(this.update);

		this.addChild(this._bgLayer);
		return true;
	},
	onEnter:function(){
		this._super();
	},
	update:function(dt){
	},
	onTouchesEnded:function(pTouch,pEvent){
		console.log("onTouchesEnd",pTouch[0].getLocation());
		this._jetSprite.handleTouch(pTouch[0].getLocation());
	},
	onTouchesMoved:function(pTouch,pEvent){
		console.log("onTouchesMove",pTouch[0].getLocation());
		this._jetSprite.handleTouchMove(pTouch[0].getLocation());
	},
	onKeyUp:function(e){
	},
	onKeyDown:function(e){
		this._jetSprite.handleKey(e);
	}
});

var MyThirdAppScene = cc.Scene.extend({
	onEnter:function(){
		this._super();
		var layer=new MyThirdApp();
		layer.init();
		this.addChild(layer);
	}
});