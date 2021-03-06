var MyFifthApp = cc.Layer.extend({
	sprite: null,
	spriteFrameNamePrefix: "Walk_left",
	spriteFrameIndex: 0,
	layerColor: null,
	spriteX: 300,
	walkDirect:0, //0 walkleft 1 walkright
	init: function(){
		this._super();
		this.layerColor = cc.LayerColor.create(new cc.Color4B(0,0,0,255));
		var size = cc.Director.getInstance().getWinSize();

		var cache = cc.SpriteFrameCache.getInstance();
		cache.addSpriteFrames("res/spritesheet/walk.plist", "res/spritesheet/walk.png");

		this.sprite = cc.Sprite.createWithSpriteFrameName(this.spriteFrameNamePrefix+"00.png");
		this.sprite.setPosition(new cc.Point(300,300));
		// this.sprite.setAnchorPoint(cc.PointMake(0,0.5));
		// this.sprite.setScale(3);
		this.layerColor.addChild(this.sprite);

		this.layerColor.setPosition(new cc.Point(0,0));
		this.addChild(this.layerColor);

		this.setKeyboardEnabled(true);

		this.schedule(this.walk);

		cc.log(this.sprite.getContentSize());
		cc.log("--- In Layer init ---");
		cc.log(this.layerColor);
		cc.log(this.sprite);

		return this;
	},
	onKeyUp: function(e){

	},
	onKeyDown: function(e){
		/*
		if(e==cc.KEY.left || e==cc.KEY.right){
			var prevPrefix =  this.spriteFrameNamePrefix;
			if(e==cc.KEY.left){
				this.spriteFrameNamePrefix="Walk_left";
				this.spriteX-=2;
			}else{
				this.spriteFrameNamePrefix="Walk_right";
				this.spriteX+=2;
			}

			if(this.spriteX<0){
				this.spriteX=0;
			}
			if(this.spriteX>600){
				this.spriteX=600;
			}

			if(prevPrefix!== this.spriteFrameNamePrefix){
				this.spriteFrameIndex=0;
			}

			if(this.spriteFrameIndex>18){
				this.spriteFrameIndex=0;
			}

			var indexAsString;
			if(this.spriteFrameIndex<10){
				indexAsString="0"+this.spriteFrameIndex.toString();
			}else{
				indexAsString=this.spriteFrameIndex.toString();
			}

			this.layerColor.removeChild(this.sprite);
			this.sprite=cc.Sprite.createWithSpriteFrameName(this.spriteFrameNamePrefix+indexAsString+".png");

			this.sprite.setPosition(new cc.Point(this.spriteX,300));
			// this.sprite.setAnchorPoint(cc.PointMake(0,0.5));
			// this.sprite.setScale(3);

			this.layerColor.addChild(this.sprite);
			this.spriteFrameIndex++;
		}
		*/
		if(e==cc.KEY.left){
			this.walkDirect=0;
			cc.log("Turn left");
			cc.log(this.walkDirect);
		}
		if(e==cc.KEY.right){
			cc.log("Turn Right");
			this.walkDirect=1;
			cc.log(this.walkDirect);
		}
	},
	walk: function(dt){
		var prevPrefix =  this.spriteFrameNamePrefix;
		if(this.walkDirect==0){
			this.spriteFrameNamePrefix="Walk_left";
			this.spriteX-=2;
		}else{
			this.spriteFrameNamePrefix="Walk_right";
			this.spriteX+=2;
		}

		if(this.spriteX<0){
			this.spriteX=0;
			this.walkDirect=1;
		}
		if(this.spriteX>600){
			this.spriteX=600;
			this.walkDirect=0;
		}

		if(prevPrefix!== this.spriteFrameNamePrefix){
			this.spriteFrameIndex=0;
		}

		if(this.spriteFrameIndex>18){
			this.spriteFrameIndex=0;
		}

		var indexAsString;
		if(this.spriteFrameIndex<10){
			indexAsString="0"+this.spriteFrameIndex.toString();
		}else{
			indexAsString=this.spriteFrameIndex.toString();
		}

		// cc.log("--- In Layer update walk function ---");
		// cc.log(this);
		// cc.log(this.layerColor);
		// cc.log(this.sprite);

		this.layerColor.removeChild(this.sprite);
		this.sprite=cc.Sprite.createWithSpriteFrameName(this.spriteFrameNamePrefix+indexAsString+".png");

		this.sprite.setPosition(new cc.Point(this.spriteX,300));
		// this.sprite.setAnchorPoint(cc.PointMake(0,0.5));
		// this.sprite.setScale(3);

		this.layerColor.addChild(this.sprite);
		this.spriteFrameIndex++;
	}
});

var MyFifthAppScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer =  new MyFifthApp();
		layer.init();
		this.addChild(layer);
	}
});