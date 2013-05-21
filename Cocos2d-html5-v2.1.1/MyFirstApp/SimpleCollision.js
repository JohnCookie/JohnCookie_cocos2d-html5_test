var SimpleCollisionLayer = cc.Layer.extend({
	// ball1:null,
	// ball2:null,
	bounceMinus:-1,
	ballArray:new Array(),
	ballNum:8,
	init:function(){
		this._super();
		var size = cc.Director.getInstance().getWinSize();
		var layerColor = cc.LayerColor.create(new cc.Color4B(128,128,128,255),600,600);
		layerColor.setPosition(new cc.Point(0,0));
		this.addChild(layerColor);

		// ball1=new SimpleBall(50, size.height/2, 30, 10, new cc.Color4B(255,0,0,255));
		// ball2=new SimpleBall(550, size.height/2, 40, 15, new cc.Color4B(255,0,100,255));
		// //init the speed of the ball
		// ball1.vx=5*(Math.random()*2-1);
		// ball1.vy=5*(Math.random()*2-1);
		// ball2.vx=5*(Math.random()*2-1);
		// ball2.vy=5*(Math.random()*2-1);

		//init balls
		for(var i=0;i<this.ballNum;i++){
			var ball=new SimpleBall(60*(i+1),60*(i+1),30,10,new cc.Color4B(255,0,0,255));
			ball.radius=Math.random()*25+10;
			ball.mass=ball.radius/1.5;
			ball.color=new cc.Color4B(Math.random()*180+50,Math.random()*180+50,Math.random()*180+50,255);
			ball.vx=5*(Math.random()*2-1);
			ball.vy=5*(Math.random()*2-1);
			this.ballArray.push(ball);
		}

		console.log("array",this.ballArray);
		for(var i=0;i<this.ballArray.length;i++){
			console.log(this.ballArray[i]);
			layerColor.addChild(this.ballArray[i]);
		}
		// layerColor.addChild(ball1);
		// layerColor.addChild(ball2);

		this.schedule(this.update);
		
		return true;
	},
	update:function(){
		//Update the ball position
		// ball1.x+=ball1.vx;
		// ball1.y+=ball1.vy;
		// ball2.x+=ball2.vx;
		// ball2.y+=ball2.vy;
		for(var i=0;i<this.ballArray.length;i++){
			this.ballArray[i].x+=this.ballArray[i].vx;
			this.ballArray[i].y+=this.ballArray[i].vy;
			this.checkBounce(this.ballArray[i]);
		}

		for(var k=0;k<this.ballArray.length-1;k++){
			for(var s=k+1;s<this.ballArray.length;s++){
				this.checkCollision(this.ballArray[k],this.ballArray[s]);
			}
		}
		// this.checkCollision(ball1,ball2);
		//bounce when touch the border
		// on only x-axis
		/*
		if(ball1.x<=0+ball1.radius || ball1.x>=600-ball1.radius){
			ball1.x-=ball1.vx;
			ball1.vx*=this.bounceMinus;
		}
		if(ball2.x<=0+ball2.radius || ball2.x>=600-ball2.radius){
			ball2.x-=ball2.vx;
			ball2.vx*=this.bounceMinus;
		}
		*/
		// this.checkBounce(ball1);
		// this.checkBounce(ball2);

		// if (Math.abs(ball1.vx)<=1 && Math.abs(ball2.vx)<=1){
		// 	cc.log("End");
		// 	console.log("ball1 vx",ball1.vx);
		// 	console.log("ball2 vx",ball2.vx);
		// 	cc.log(ball1);
		// 	cc.log(ball2);
		// 	this.unschedule(this.update);
  //       }
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