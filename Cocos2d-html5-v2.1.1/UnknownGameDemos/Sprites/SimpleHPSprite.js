// 血量变化精灵
var SimpleHPSprite=cc.Sprite.extend({
	width: 40,
	height: 10,
	label: "",
	ctor: function(){
		this._super();

		this.setContentSize(this.width,this.height);

		this.label=cc.LabelTTF.create("+33", "Arial", 10);
		this.label.setColor(commonColor3B["green"]);
		this.label.setPosition(this.width/2,this.height/2);
		this.addChild(this.label);
	},
	update: function(dt){

	},
	getDamage: function(damage){
		this.label.setString("-"+damage);
		this.label.setColor(commonColor3B["red"]);
	},
	getHeal: function(heal){
		this.label.setString("+"+heal);
		this.label.setColor(commonColor3B["green"]);
	}
});