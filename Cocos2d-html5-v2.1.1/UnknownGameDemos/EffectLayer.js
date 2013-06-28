var EffectLayer=cc.Layer.extend({
	skillNameLabel: null,
	ctor: function(){
		this._super();
		var size = cc.Director.getInstance().getWinSize();

		this.skillNameLabel=cc.LabelTTF.create("Test", "Arial", 18);
		this.skillNameLabel.setColor(textColor);
		this.skillNameLabel.setPosition(size.width/2,size.height/2);
		this.addChild(this.skillNameLabel,1,1);
	}
});