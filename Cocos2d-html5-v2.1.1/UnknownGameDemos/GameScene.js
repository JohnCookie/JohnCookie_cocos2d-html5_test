var GameLayer=cc.Layer.extend({
	mainLayer:null,
	uiLayer:null,
	mapLayer:null,
	__touchBeganPoint:null, //use to offset the Layers
	currWorldPoint:null,
	init: function(){
		this._super();
		this.setTouchEnabled(true);

		// UI层
		this.uiLayer = new UILayer();
		this.uiLayer.init();
		this.addChild(this.uiLayer,3,3);

		// 游戏主要的精灵层
		this.mainLayer = new MainLayer();
		this.mainLayer.init();
		this.addChild(this.mainLayer,1,1);

		// 地图底层
		this.mapLayer = new MapLayer();
		this.mapLayer.init();
		this.addChild(this.mapLayer,0,0);

		this.currWorldPoint=new cc.Point(0,0);
		Game.currWorldPoint=this.currWorldPoint;
	},
	onTouchesEnded: function(pTouch, pEvent){
		if(this.mainLayer.status==0 && touchNow){
			var touchNow=pTouch[0].getLocation();
			var offset=new cc.Point(touchNow.x-this.__touchBeganPoint.x,touchNow.y-this.__touchBeganPoint.y);
			this.currWorldPoint.x+=offset.x;
			this.currWorldPoint.y+=offset.y;
			if(this.currWorldPoint.x>0){
				this.currWorldPoint.x=0
			}
			if(this.currWorldPoint.x<Game.width-Game.tileMap.getMapSize().width*Game.tileMap.getTileSize().width){
				this.currWorldPoint.x=Game.width-Game.tileMap.getMapSize().width*Game.tileMap.getTileSize().width;
			}
			if(this.currWorldPoint.y>0){
				this.currWorldPoint.y=0;
			}
			if(this.currWorldPoint.y<Game.height-Game.tileMap.getMapSize().height*Game.tileMap.getTileSize().height){
				this.currWorldPoint.y=Game.height-Game.tileMap.getMapSize().height*Game.tileMap.getTileSize().height;
			}
			Game.currWorldPoint=this.currWorldPoint;
			this.__touchBeganPoint=null;

			this.mainLayer.setPosition(this.currWorldPoint);
			this.mapLayer.setPosition(this.currWorldPoint);
		}
		this.mainLayer.status=0;
	},
	onTouchesBegan: function(pTouch, pEvent){
		if(this.mainLayer.status==0){
			var touchPoint=pTouch[0].getLocation();
			this.__touchBeganPoint=touchPoint;
		}
	},
	onTouchesMoved: function(pTouch, pEvent){
		// console.log("onTouchesMoved",pTouch[0].getLocation());
		//calculate the offset
		if(this.mainLayer.status==0){
			var touchNow=pTouch[0].getLocation();
			var offset=new cc.Point(touchNow.x-this.__touchBeganPoint.x,touchNow.y-this.__touchBeganPoint.y);
			// the border
			var temp=new cc.Point(this.currWorldPoint.x+offset.x,this.currWorldPoint.y+offset.y);
			if(temp.x>0){
				temp.x=0
			}
			if(temp.x<Game.width-Game.tileMap.getMapSize().width*Game.tileMap.getTileSize().width){
				temp.x=Game.width-Game.tileMap.getMapSize().width*Game.tileMap.getTileSize().width;
			}
			if(temp.y>0){
				temp.y=0;
			}
			if(temp.y<Game.height-Game.tileMap.getMapSize().height*Game.tileMap.getTileSize().height){
				temp.y=Game.height-Game.tileMap.getMapSize().height*Game.tileMap.getTileSize().height;
			}
			Game.currWorldPoint=temp;

			this.mainLayer.setPosition(temp);
			this.mapLayer.setPosition(temp);
		}
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new GameLayer();
		layer.init();
		this.addChild(layer);
	}
});