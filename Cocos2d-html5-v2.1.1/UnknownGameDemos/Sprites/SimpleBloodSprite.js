// 血条
var SimpleBloodSprite=cc.Sprite.extend({
	width: 40,
	blood: 100,
	curr_blood: 100,
	ctor: function(blood){
		this._super();

		this.blood=blood;
		this.curr_blood=blood;
	},
	draw: function(){
		this._super();
		
		var color=commonColor4B["red"];
		var r=color.r;
		var g=color.g;
		var b=color.b;
		var a=color.a
		cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+","+a+")";
		cc.renderContext.lineWidth=5;
        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+","+a+")";
        var start=new cc.Point(0,0);
        // var end=new cc.Point(this.width,0);
        var end=new cc.Point(Math.ceil(this.width*(this.curr_blood/this.blood)),0);
        cc.drawingUtil.drawLine(start, end);
	},
	update: function(dt){

	},
	getDamage: function(damage){
		var die=0;
		if(this.curr_blood<=damage){
			//被干死了
			damage=this.curr_blood;
			this.curr_blood=0;
			die=1;
		}else{
			this.curr_blood-=damage;
		}
		return {"curr_blood":this.curr_blood,"damage":damage,"die":die};
	},
	getHeal: function(heal){
		if(this.curr_blood+heal>this.blood){
			//奶溢出了
			heal=this.blood-this.curr_blood;
			this.curr_blood=this.blood;
		}else{
			this.curr_blood+=heal;
		}
		return {"curr_blood":this.curr_blood,"heal":heal};
	}
});