var SpriteShootDemo = cc.Layer.extend({
	__pointSprite:null,
	__targetSprite:null,
	__layerColor:null,
	__touchBeginPosition:{},
	__scaleBase:50,
	init: function(){
		this._super();
		this.setTouchEnabled(true);
		var size=cc.Director.getInstance().getWinSize();

		this.__layerColor = cc.LayerColor.create(new cc.Color4B(128,128,128,255));
		this.__layerColor.setPosition(new cc.Point(0.0,0.0));
		this.addChild(this.__layerColor);

		this.__targetSprite=cc.Sprite.create("res/hero.png");
		this.__targetSprite.setPosition(size.width/2,size.height/2);
		this.__targetSprite.setScale(0.8);
		this.__layerColor.addChild(this.__targetSprite);

		this.__pointSprite=new PointSprite();
		var targetPosition=this.__targetSprite.getPosition();
		this.__pointSprite.setPosition(targetPosition.x,targetPosition.y);
		// this.__pointSprite.setScale(0.5);
		// console.log(this.__pointSprite.getContentSize().width);
		var arrowSize=this.__pointSprite.getContentSize();
		this.__pointSprite.setAnchorPoint(cc.PointMake(0.5,0));
		return true;
	},
	onEnter: function(){
		this._super();
	},
	onTouchesEnded: function(pTouch,pEvent){
		console.log("TouchEnd",pTouch[0].getLocation());
		this.__layerColor.removeChild(this.__pointSprite);
		this.runShootAction(pTouch[0].getLocation());
	},
	onTouchesBegan: function(pTouch,pEvent){
		console.log("TouchBegan",pTouch[0].getLocation());
		this.__touchBeginPosition=pTouch[0].getLocation();
		this.__layerColor.addChild(this.__pointSprite);
	},
	onTouchesMoved: function(pTouch,pEvent){
		console.log("TouchMove",pTouch[0].getLocation());
		//calculate the moveLength and set the arrow scale
		var touchNowPosition=pTouch[0].getLocation();
		var moveLength=Math.sqrt(Math.pow(touchNowPosition.x-this.__touchBeginPosition.x, 2)+Math.pow(touchNowPosition.y-this.__touchBeginPosition.y, 2))
		var arrowScale=moveLength/this.__scaleBase;
		if(arrowScale>3){
			arrowScale=3;
		}
		this.__pointSprite.setScaleY(arrowScale);
		//calculate the move direction and set the arrow rotate
		var angle = Math.atan2(touchNowPosition.x-this.__touchBeginPosition.x,touchNowPosition.y-this.__touchBeginPosition.y);
		angle = angle*(180/Math.PI);
		this.__pointSprite.setRotation(angle);
	},
	runShootAction: function(endPosition){
		cc.log("runShootAction");
		var tempSprite=cc.Sprite.create("res/hero.png");
		var targetPosition=this.__targetSprite.getPosition();
		tempSprite.setPosition(targetPosition.x,targetPosition.y);
		tempSprite.setScale(0.5);
		this.__layerColor.addChild(tempSprite);
		var actionMove=cc.MoveBy.create(2,new cc.Point(endPosition.x-this.__touchBeginPosition.x,endPosition.y-this.__touchBeginPosition.y));
		var actionRotate=cc.RotateBy.create(2,720);
		var actionFadeOut=cc.FadeOut.create(1);
		var actionMoveAndRotate=cc.Spawn.create([actionMove,actionRotate]);
		var actionCallback=cc.CallFunc.create(this.removeSpriteCallback,tempSprite,this.__layerColor);
		var actionFinal=cc.Sequence.create(actionMoveAndRotate,actionFadeOut,actionCallback);
		tempSprite.runAction(actionFinal);
		// this.__layerColor.removeChild(tempSprite);
	},
	removeSpriteCallback:function(sprite,parent){
		cc.log("removeSprite");
		cc.log(parent.getChildrenCount());
		parent.removeChild(sprite);
		cc.log(parent.getChildrenCount());
		
		// confused why here this.__layerColor is undefined
		// this.__layerColor.removeChild(sprite);
	}
});

var SpriteShootDemoScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new SpriteShootDemo();
		layer.init();
		this.addChild(layer);
	}
});