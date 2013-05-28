var CollisionOnTilemapScene=cc.Scene.extend({
	onEnter: function(){
		this._super();
		
		var tilemapLayer=new TileMapScene();
		tilemapLayer.init();
		this.addChild(tilemapLayer,0,1);

		var collisionLayer=new SimpleCollisionLayer();
		collisionLayer.init();
		this.addChild(collisionLayer,1,2);
	}
});
