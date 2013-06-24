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
		if(this.mainLayer.status==0 && Game.gameStatus==Game.status.NORMAL && touchNow ){
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
		if(this.mainLayer.status==0 && Game.gameStatus==Game.status.NORMAL){
			var touchPoint=pTouch[0].getLocation();
			var realTouchPoint={};
			realTouchPoint.x=touchPoint.x-Game.currWorldPoint.x;
			realTouchPoint.y=touchPoint.y-Game.currWorldPoint.y;
			this.__touchBeganPoint=realTouchPoint;
		}
	},
	onTouchesMoved: function(pTouch, pEvent){
		// console.log("onTouchesMoved",pTouch[0].getLocation());
		//calculate the offset
		if(this.mainLayer.status==0 && Game.gameStatus==Game.status.NORMAL){
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
	},
	showWholeMap: function(){
		Game.gameStatus=Game.status.ANIM_ON;
		this.removeChild(this.uiLayer);
		var buttomLeft2ButtomRight=cc.MoveTo.create(2,new cc.Point(Game.width-Game.mapWidth,0));
		var buttonRight2TopRight=cc.MoveTo.create(2,new cc.Point(Game.width-Game.mapWidth,Game.height-Game.mapHeight));
		var topRight2TopLeft=cc.MoveTo.create(2,new cc.Point(0,Game.height-Game.mapHeight));
		var topLeft2ButtomLeft=cc.MoveTo.create(2,new cc.Point(0,0));
		var funcCallback=cc.CallFunc.create(this.showWholeMapCallback,this,this.uiLayer);
		var moveAround=cc.Sequence.create(buttomLeft2ButtomRight,buttonRight2TopRight,topRight2TopLeft,topLeft2ButtomLeft,funcCallback);
		this.runAction(moveAround);
	},
	showWholeMapCallback: function(parent,layer){
		parent.addChild(layer);
		Game.gameStatus=Game.status.NORMAL;
		console.log("Anim End");

		this.mainLayer.resortByAgility();
		this.mainLayer.curr_activeSprite=this.mainLayer.getNextActiveSprite();
		this.mainLayer.curr_activeSprite.targetBlink();
	},
	sightOnSoldier: function(soldier){
		var pos=soldier.getPosition();
		console.log("pos",pos);
		var size=soldier.getContentSize();
		console.log("size",size)
		var center=new cc.Point(pos.x+size.width/2,pos.y+size.height/2);

		if(center.x<Game.width/2){
			center.x=0;
		}else if(center.x>Game.mapWidth-Game.width/2){
			center.x=Game.mapWidth-Game.width/2;
		}else{
			center.x-=Game.width/2;
		}

		if(center.y<Game.height/2){
			center.y=0;
		}else if(center.y>Game.mapHeight-Game.height/2){
			center.y=Game.mapHeight-Game.height/2;
		}else{
			center.y-=Game.height/2;
		}

		center.x=-center.x;
		center.y=-center.y;
		console.log("center",center);
		this.mainLayer.setPosition(center);
		this.mapLayer.setPosition(center);

		Game.currWorldPoint=center;
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer=new GameLayer();
		layer.init();
		this.addChild(layer);

		layer.showWholeMap();
	}
});