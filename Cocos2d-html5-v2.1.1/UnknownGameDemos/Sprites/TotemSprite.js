var TotemSprite=cc.Sprite.extend({
	radius: 150,
	spriteWidth:300,
	spriteHeight:300,
	centerTotem: null,
	totemWidth:40,
	totemHeight:40,
	team: 0, // 0 1
	teamColor: new Array(commonColor4B["red"],commonColor4B["green"]),
	atk_buff: 0,
	atk_debuff: 0,
	def_buff: 0,
	def_debuff: 0,
	extra_buff: 0,
	extra_debuff: 0,
	last_time: 0,
	ctor: function(team,radius,time){
		this._super();

		this.setContentSize(new cc.Size(this.spriteWidth,this.spriteHeight));
		this.setAnchorPoint(cc.PointMake(0.5,0.5));

		this.radius=radius;
		this.team=team;
		this.last_time=time;

		this.centerTotem=cc.Sprite.create("Sprites/spriteRes/totem.png");
		var totemSize=this.centerTotem.getContentSize();
		this.centerTotem.setScale(this.totemWidth/totemSize.width);
		this.centerTotem.setPosition(this.spriteWidth/2,this.spriteHeight/2);
		this.addChild(this.centerTotem);
	},
	update: function(dt){

	},
	draw: function(){
		// 画一个圈
		var color=this.teamColor[this.team];
		var r=color.r;
		var g=color.g;
		var b=color.b;
		var a=color.a
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=2;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";

		var center=new cc.Point(0,0);
		cc.drawingUtil.drawCircle(center, this.radius, 0, 60, false);
	}

})