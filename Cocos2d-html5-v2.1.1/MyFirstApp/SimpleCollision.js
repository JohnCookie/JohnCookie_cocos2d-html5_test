var SimpleCollisionLayer = cc.Layer.extend({
	ball1:null,
	ball2:null,
	bounceMinus:-0.5,
	init:function(){
		this._super();
		var size = cc.Director.getInstance().getWinSize();
		var layerColor = cc.LayerColor.create(new cc.Color4B(128,128,128,255),600,600);
		layerColor.setPosition(new cc.Point(0,0));
		this.addChild(layerColor);

		ball1=new SimpleBall(50, size.height/2, 30, 10, new cc.Color4B(255,0,0,255));
		ball2=new SimpleBall(550, size.height/2, 40, 15, new cc.Color4B(255,0,100,255));
		//init the speed of the ball
		ball1.vx=5;
		ball2.vx=-5;

		layerColor.addChild(ball1);
		layerColor.addChild(ball2);

		this.schedule(this.update);
		
		return true;
	},
	update:function(){
		//Update the ball position
		ball1.x+=ball1.vx;
		ball2.x+=ball2.vx;
		//Calculate the distance between 2 ball
		var dist=ball1.x-ball2.x;
		//if 2 balls crashed
		if(Math.abs(dist)<ball1.radius+ball2.radius){
			// v0final=((m0-m1)v0+2m1v1)/(m0+m1)
			// v1final=v0final+(v0-v1)
			var vdx=ball1.vx-ball2.vx;
			var v1final=((ball1.mass-ball2.mass)*ball1.vx+2*ball2.mass*ball2.vx)/(ball1.mass+ball2.mass);
			var v2final=v1final+vdx;

			ball1.vx=v1final;
			ball2.vx=v2final;
			console.log("v1x",ball1.vx);
			console.log("v2x",ball2.vx);

			ball1.x+=ball1.vx;
			ball2.x+=ball2.vx;
		}
		//bounce when touch the border
		if(ball1.x<=0+ball1.radius || ball1.x>=600-ball1.radius){
			ball1.x-=ball1.vx;
			ball1.vx*=this.bounceMinus;
		}
		if(ball2.x<=0+ball2.radius || ball2.x>=600-ball2.radius){
			ball2.x-=ball2.vx;
			ball2.vx*=this.bounceMinus;
		}

		if (Math.abs(ball1.vx)<=1 && Math.abs(ball2.vx)<=1){
			cc.log("End");
			console.log("ball1 vx",ball1.vx);
			console.log("ball2 vx",ball2.vx);
			cc.log(ball1);
			cc.log(ball2);
			this.unschedule(this.update);
        }
	}
});

var SimpleCollisionScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new SimpleCollisionLayer();
		layer.init();
		this.addChild(layer);
	}
});