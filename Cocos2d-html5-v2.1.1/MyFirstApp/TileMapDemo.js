var TileMapLayer=cc.Layer.extend({
	__touchBeganPoint:null,
	tileMap:null,
	currWorldPoint:null,
	init: function(){
		this._super();
		this.tileMap=cc.TMXTiledMap.create("res/tilemap/tilemapbg.tmx");
		this.setTouchEnabled(true);

		console.log("Properties",this.tileMap.getProperties());
		console.log("mapSize",this.tileMap.getMapSize());
		console.log("tileSize",this.tileMap.getTileSize());
		console.log("blocks obj",this.tileMap.getObjectGroup("blocks"));
		Game.currMap=this.tileMap;

		this.tileMap.setPosition(new cc.Point(0,0));
		this.currWorldPoint=new cc.Point(0,0);
		Game.currWorldPoint=this.currWorldPoint;
		this.addChild(this.tileMap);

		return true;
	},
	onTouchesEnded: function(pTouch, pEvent){
		// console.log("onTouchesEnded",pTouch[0].getLocation());
		touchNow=pTouch[0].getLocation();
		offset=new cc.Point(touchNow.x-this.__touchBeganPoint.x,touchNow.y-this.__touchBeganPoint.y);
		this.currWorldPoint.x+=offset.x;
		this.currWorldPoint.y+=offset.y;
		if(this.currWorldPoint.x>0){
			this.currWorldPoint.x=0
		}
		if(this.currWorldPoint.x<600-this.tileMap.getMapSize().width*this.tileMap.getTileSize().width){
			this.currWorldPoint.x=600-this.tileMap.getMapSize().width*this.tileMap.getTileSize().width;
		}
		if(this.currWorldPoint.y>0){
			this.currWorldPoint.y=0;
		}
		if(this.currWorldPoint.y<600-this.tileMap.getMapSize().height*this.tileMap.getTileSize().height){
			this.currWorldPoint.y=600-this.tileMap.getMapSize().height*this.tileMap.getTileSize().height;
		}
		this.tileMap.setPosition(this.currWorldPoint);
		Game.currWorldPoint=this.currWorldPoint;
		this.__touchBeganPoint=null;
	},
	onTouchesBegan: function(pTouch, pEvent){
		// console.log("TouchBegan",pTouch[0].getLocation());
		this.__touchBeganPoint=pTouch[0].getLocation();
	},
	onTouchesMoved: function(pTouch, pEvent){
		// console.log("onTouchesMoved",pTouch[0].getLocation());
		//calculate the offset
		touchNow=pTouch[0].getLocation();
		var offset=new cc.Point(touchNow.x-this.__touchBeganPoint.x,touchNow.y-this.__touchBeganPoint.y);
		// the border
		var temp=new cc.Point(this.currWorldPoint.x+offset.x,this.currWorldPoint.y+offset.y);
		if(temp.x>0){
			temp.x=0
		}
		if(temp.x<600-this.tileMap.getMapSize().width*this.tileMap.getTileSize().width){
			temp.x=600-this.tileMap.getMapSize().width*this.tileMap.getTileSize().width;
		}
		if(temp.y>0){
			temp.y=0;
		}
		if(temp.y<600-this.tileMap.getMapSize().height*this.tileMap.getTileSize().height){
			temp.y=600-this.tileMap.getMapSize().height*this.tileMap.getTileSize().height;
		}
		this.tileMap.setPosition(temp);
		Game.currWorldPoint=temp;
	}
});

var TileMapScene=cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new TileMapLayer();
		layer.init();
		this.addChild(layer);
	}
});