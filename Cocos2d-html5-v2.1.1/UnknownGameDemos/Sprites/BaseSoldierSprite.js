var BaseSoldierSprite=cc.Sprite.extend({
	type: 0, //1 近战 2 远程 3 魔法
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	blood: 100,
	buff: 0,
	debuff: 0, 
	mainSprite: null,
	bloodSprite: null,
	hpSprite: null,
	effectSprite: null,
	team: 0, //0,1
	actionPointLabel: null, // 额外信息层
	ctor: function(type,team){
		this._super();

		this.type=type;
		this.team=team;

		this.blood=SoldierData[type]["blood"];

		this.setContentSize(new cc.Size(60,70));
		// 精灵主体
		this.mainSprite=new SimpleShapeSprite(type,team);
		this.mainSprite.setPosition(new cc.Point(10+20,8+20));
		// this.angle = Math.PI/4*(180/Math.PI); //45度倾斜
		// this.mainSprite.setRotation(this.angle);
		this.addChild(this.mainSprite);
		
		//血条
		this.bloodSprite=new SimpleBloodSprite();
		this.bloodSprite.setPosition(new cc.Point(10,55));
		this.addChild(this.bloodSprite);

		//血量变化显示
		this.bloodChangeSprite=new SimpleHPSprite();
		this.bloodChangeSprite.setPosition(10,8+40+5);
		this.addChild(this.bloodChangeSprite);

		//额外的信息层 包含状态 行动力等
		this.actionPointLabel=cc.LabelTTF.create("18","Arial",10);
		this.actionPointLabel.setPosition(50,8);
		this.actionPointLabel.setColor(commonColor3B["blue"]);
		this.addChild(this.actionPointLabel);

		//目标框
		this.effectSprite=new SimpleEffectSprite(60,70);
		this.effectSprite.setPosition(0,0);
		this.addChild(this.effectSprite);
	},
	draw: function(){
		// this._super();
		if(Game.showSpriteBorder){
			//描边 方便观察
			color=commonColor3B["black"];
			var r=color.r;
			var g=color.g;
			var b=color.b;
			cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+",255)";
			cc.renderContext.lineWidth=2;
	        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+",255)";
	        var position=new cc.Point(0,0);
	        var size=this.getContentSize();
	        var point1=position;
	        var point2=new cc.Point(position.x+size.width,position.y);
	        var point3=new cc.Point(position.x+size.width,position.y+size.height);
	        var point4=new cc.Point(position.x,position.y+size.height);
	        cc.drawingUtil.drawPoly(new Array(point1,point2,point3,point4),4,true,false);
	    }
	},
	update: function(){

	},
	setPosition: function(newPosOrxValue,yValue){
		//覆盖原来的setPosition方法 设置精灵碰撞检测用的x y
		if (arguments.length == 2) {
            this._position = new cc.Point(newPosOrxValue, yValue);
        } else if (arguments.length == 1) {
            this._position = new cc.Point(newPosOrxValue.x, newPosOrxValue.y);
        }
        this.x=this._position.x+30;
        this.y=this._position.y+28;
        // this.SET_DIRTY_RECURSIVELY();
	},
	getDamage: function(damage){
		this.bloodSprite.getDamage(damage);
	},
	getHeal: function(heal){
		this.bloodSprite.getHeal(heal);
	},
	showTargetPosition: function(sprite){

	}
});