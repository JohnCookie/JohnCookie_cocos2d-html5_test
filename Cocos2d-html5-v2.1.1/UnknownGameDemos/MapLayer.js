var MapLayer = cc.Layer.extend({
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
		// console.log("blocks obj",this.tileMap.getObjectGroup("blocks"));
		console.log("blocks obj",this.tileMap.getObjectGroup("driftSand"));
		Game.tileMap=this.tileMap;

		this.tileMap.setPosition(new cc.Point(0,0));
		this.currWorldPoint=new cc.Point(0,0);
		Game.currWorldPoint=this.currWorldPoint;
		this.addChild(this.tileMap);

		return true;
	},
	onTouchesEnded: function(pTouch, pEvent){
	},
	onTouchesBegan: function(pTouch, pEvent){
	},
	onTouchesMoved: function(pTouch, pEvent){
	}
});