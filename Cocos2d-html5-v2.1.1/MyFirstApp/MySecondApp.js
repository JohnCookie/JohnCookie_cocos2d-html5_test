var MySecondApp = cc.Layer.extend({
	init: function(){
		var layer1 = cc.LayerColor.create(new cc.Color4B(128,128,128,255),600,600);
		var jetSprite = cc.Sprite.create("./res/Jet.png");

		layer1.setPosition(new cc.Point(0.0,0.0));
		layer1.addChild(jetSprite);

		// adjust the position of sprite
		// at left bottom
		// jetSprite.setPosition(new cc.Point(0.0,0.0));
		var size = cc.Director.getInstance().getWinSize();
		// at right top
		// jetSprite.setPosition(new cc.Point(
		// 		size.width-jetSprite.getContentSize().width/2,
		// 		size.height-jetSprite.getContentSize().height/2
		// 	));
		// at middle
		jetSprite.setPosition(new cc.Point(
				size.width/2,
				size.height/2
			));

		this.addChild(layer1);
		return true;
	}
});

var MySecondAppScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new MySecondApp();
		layer.init();
		this.addChild(layer);
	}
});
console.log("MySecondApp.js load");