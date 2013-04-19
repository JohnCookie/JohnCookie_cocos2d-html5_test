var JetSprite = cc.Sprite.extend({
	_currentRotation:0,
	ctor:function(){
		this.initWithFile("./res/Jet.png");
	},
	update:function(dt){
		this.setRotation(this._currentRotation);
	},
	handleKey:function(e){
		if(e === cc.KEY.left){
			this._currentRotation--;
		}else if(e === cc.KEY.right){
			this._currentRotation++;
		}
		if(this._currentRotation<0){
			this._currentRotation=360;
		}
		if(this._currentRotation>360){
			this._currentRotation=0;
		}
	},
	handleTouch:function(touchLocation){
		if(touchLocation.x<300){
			this._currentRotation=0;
		}else{
			this._currentRotation=180;
		}
	},
	handleTouchMove:function(touchLocation){
		var angle = Math.atan2(touchLocation.x-300,touchLocation.y-300);

		angle = angle*(180/Math.PI);
		this._currentRotation=angle;
	}
});