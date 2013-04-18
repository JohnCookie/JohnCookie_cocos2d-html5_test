var PivotCenter = cc.Layer.extend({
	init:function(){
		var layer1 = cc.LayerColor.create(new cc.Color4B(128,128,128,255),300,300);
		var jetSprite = cc.Sprite.create('./res/Jet.png');

		jetSprite.setPosition(new cc.Point(150,150));
		//Confused.. setAnchorPoint doesn't works
		jetSprite.setAnchorPoint(cc.PointMake(-1,-1));

		var size = cc.Director.getInstance().getWinSize();
		console.log(jetSprite);
		layer1.setPosition(new cc.Point((size.width-layer1.getContentSize().width)/2,(size.height-layer1.getContentSize().height)/2));
		layer1.addChild(jetSprite);

		var rotationAmount = 0;
		jetSprite.schedule(function(){
			this.setRotation(rotationAmount++);
			if(rotationAmount>360){
				rotationAmount=0;
			}
		});

		this.addChild(layer1);
		return true;
	}
});

PivotCenter.scene = function(){
	var scene = cc.Scene.node();
	var layer = this.node();

	scene.addChild(layer);

	return scene;
};

PivotCenter.node = function(){
	var pPet = new PivotCenter();

	if(pPet && pPet.init()){
		return pPet;
	}
	return null;
}

var PivotScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new PivotCenter();
		layer.init();
		this.addChild(layer);
	}
});
console.log("JetRotate.js load");