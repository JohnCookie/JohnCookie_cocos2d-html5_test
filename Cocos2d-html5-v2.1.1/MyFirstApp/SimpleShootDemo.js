var SimpleShootDemo=cc.Layer.extend({
	pointSprite:null,
	touchBeganPoint:null,
	ball1:null,
	ball2:null,
	layerColor:null,
	bounceMinus:-0.7,
	currActionBall:null,
	__scaleBase:50,
	init: function(){
		this._super();
		this.setTouchEnabled(true);
		//create a background
		var size=cc.Director.getInstance().getWinSize();
		this.layerColor=cc.LayerColor.create(new cc.Color4B(128,128,128,255),600,600);
		this.layerColor.setPosition(new cc.Point(0,0));
		this.addChild(this.layerColor);

		//create the 2 balls we will use
		this.ball1=new SimpleBall(100, 100, 30, 10, new cc.Color4B(255,0,0,255));
		this.ball2=new SimpleBall(size.width/2, size.height/2, 30, 10, new cc.Color4B(0,210,50,255));
		//init the speed of the ball
		this.ball1.vx=0;
		this.ball1.vy=0;
		this.ball2.vx=0;
		this.ball2.vy=0;
		this.addChild(this.ball1);
		this.addChild(this.ball2);
		
		this.pointSprite=new PointSprite();
		var ballPos=this.ball1.getPosition();
		this.pointSprite.setPosition(ballPos.x,ballPos.y);
		this.pointSprite.setAnchorPoint(cc.PointMake(0.5,0));
		// this.addChild(this.pointSprite);

		this.schedule(this.update);
	},
	update: function(){
		this.ball1.x+=this.ball1.vx;
		this.ball1.y+=this.ball1.vy;
		this.ball2.x+=this.ball2.vx;
		this.ball2.y+=this.ball2.vy;

		this.checkBounce(this.ball1);
		this.checkBounce(this.ball2);

		var collided=this.checkCollision(this.ball1,this.ball2);
		if(collided.collided==true){
			console.log(collided);
			this.showCollision(collided);
		}

		var ballPos=this.ball1.getPosition();
		this.pointSprite.setPosition(ballPos.x,ballPos.y);
	},
	onTouchesEnded: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		//发射的力量和角度
		var movedist=Math.sqrt(Math.pow(touchPoint.x-this.touchBeganPoint.x, 2)+Math.pow(touchPoint.y-this.touchBeganPoint.y, 2));
		var arrowScale=movedist/this.__scaleBase;
		if(arrowScale>2.5){
			arrowScale=2.5;
		}

		var angle = Math.atan2(touchPoint.x-this.touchBeganPoint.x,touchPoint.y-this.touchBeganPoint.y);

		this.ball1.vx=arrowScale*4*Math.sin(angle);
		this.ball1.vy=arrowScale*4*Math.cos(angle);
		this.currActionBall=this.ball1;

		this.touchBeganPoint=null;
		this.removeChild(this.pointSprite);

	},
	onTouchesBegan: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		this.touchBeganPoint=touchPoint;

		var angle = Math.atan2(touchPoint.x-this.ball1.x,touchPoint.y-this.ball1.y);
		angle = angle*(180/Math.PI);
		this.pointSprite.setRotation(angle);
		this.pointSprite.setScaleY(1);

		this.addChild(this.pointSprite);
	},
	onTouchesMoved: function(pTouch, pEvent){
		var touchPoint=pTouch[0].getLocation();
		var movedist=Math.sqrt(Math.pow(touchPoint.x-this.touchBeganPoint.x, 2)+Math.pow(touchPoint.y-this.touchBeganPoint.y, 2));
		var arrowScale=movedist/this.__scaleBase;
		if(arrowScale>2.5){
			arrowScale=2.5;
		}
		this.pointSprite.setScaleY(arrowScale);

		var angle = Math.atan2(touchPoint.x-this.touchBeganPoint.x,touchPoint.y-this.touchBeganPoint.y);
		angle = angle*(180/Math.PI);
		this.pointSprite.setRotation(angle);
	},
	checkCollision: function(ball1,ball2){
		//Calculate the distance between 2 ball
		// var dist=ball1.x-ball2.x; //on x-axis
		var dx=ball2.x-ball1.x;
		var dy=ball2.y-ball1.y;
		var dist=Math.sqrt(dx*dx+dy*dy);

		//if 2 balls crashed
		if(Math.abs(dist)<ball1.radius+ball2.radius){
			// on x-axis
			/*
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
			*/

			// on both x-axis and y-axis
			var angle=Math.atan2(dy,dx);
			var cos=Math.cos(angle);
			var sin=Math.sin(angle);

			// rotate by the center of ball1
			var x1=0;
			var y1=0;

			var x2=dx*cos+dy*sin;
			var y2=dy*cos-dx*sin;

			//the speed after rotate
			var vx1=ball1.vx*cos+ball1.vy*sin;
			var vy1=ball1.vy*cos-ball1.vx*sin;
			var vx2=ball2.vx*cos+ball2.vy*sin;
			var vy2=ball2.vy*cos-ball2.vx*sin;

			// v0final=((m0-m1)v0+2m1v1)/(m0+m1)
			// v1final=v0final+(v0-v1)
			var vdx=vx1-vx2;
			var vx1final=((ball1.mass-ball2.mass)*vx1+2*ball2.mass*vx2)/(ball1.mass+ball2.mass);
			var vx2final=vx1final+vdx;

			// the new position
			// x1+=vx1final;
			// x2+=vx2final;
			var sumRadius=ball1.radius+ball2.radius;
			var overlap=sumRadius-Math.abs(x1-x2);
			
			var radio1=ball1.radius/sumRadius;
			var radio2=ball2.radius/sumRadius;

			if(overlap>0){
				if(x1>x2){
					x1+=overlap*radio1;
					x2-=overlap*radio2;
				}else{
					x1-=overlap*radio1;
					x2+=overlap*radio2;
				}
			}

			//rotate back
			var x1final=x1*cos-y1*sin;
			var y1final=y1*cos+x1*sin;
			var x2final=x2*cos-y2*sin;
			var y2final=y2*cos+x2*sin;

			ball2.x=ball1.x+x2final;
			ball2.y=ball1.y+y2final;
			ball1.x+=x1final;
			ball1.y+=y1final;
			
			//final speed
			ball1.vx=vx1final*cos-vy1*sin;
			ball1.vy=vy1*cos+vx1final*sin;
			ball2.vx=vx2final*cos-vy2*sin;
			ball2.vy=vy2*cos+vx2final*sin;

			if(ball1!=this.currActionBall){
				ball1.reduceBlood(10);
			}
			if(ball2!=this.currActionBall){
				ball2.reduceBlood(10);
			}
			return {"x":(ball1.x+ball2.x)/2,"y":(ball1.y+ball2.y)/2,"collided":true};
		}else{
			return {"x":(ball1.x+ball2.x)/2,"y":(ball1.y+ball2.y)/2,"collided":false};
		}
	},
	checkBounce: function(ball){
		if(ball.x<ball.radius){
			//left
			ball.x=ball.radius;
			ball.vx*=this.bounceMinus;
		}else if(ball.x>600-ball.radius){
			//right
			ball.x=600-ball.radius;
			ball.vx*=this.bounceMinus;
		}
		if(ball.y<ball.radius){
			//bottom
			ball.y=ball.radius;
			ball.vy*=this.bounceMinus;
		}else if(ball.y>600-ball.radius){
			//top
			ball.y=600-ball.radius;
			ball.vy*=this.bounceMinus;
		}
	},
	showCollision: function(position){
		var collisionSprite=new cc.Sprite.create("res/hit.png");
		collisionSprite.setPosition(position.x,position.y);
		this.layerColor.addChild(collisionSprite);

		var actionFadeOut=cc.FadeOut.create(1);
		var actionReleaseSprite=cc.CallFunc.create(this.releaseSprite,this.layerColor,collisionSprite);
		var actionFinal=cc.Sequence.create(actionFadeOut,actionReleaseSprite);
		collisionSprite.runAction(actionFinal);
	},
	releaseSprite: function(layer,sprite){
		console.log(layer.getChildrenCount());
		layer.removeChild(sprite);
		console.log(layer.getChildrenCount());
	}

});

var SimpleShootScene=cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new SimpleShootDemo();
		layer.init();
		this.addChild(layer);
	}
});
