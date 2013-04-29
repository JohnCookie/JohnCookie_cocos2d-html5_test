var MyFourthApp = cc.Layer.extend({
	init: function(){
		this._super();
		var colorLayer=cc.LayerColor.create(new cc.Color4B(0,0,0,255));
		var size = cc.Director.getInstance().getWinSize();

		cc.AudioEngine.getInstance().setEffectsVolume(0.5);
		cc.AudioEngine.getInstance().setMusicVolume(0.5);

		var menuItem1 = cc.MenuItemFont.create("Play Sound",this.playSound,this);
		var menuItem2 = cc.MenuItemFont.create("Play Song",this.playSong,this);
		var menuItem3 = cc.MenuItemFont.create("Stop Playing Song",this.stopPlayingSound,this);
		var menuItem4 = cc.MenuItemFont.create("Exit",this.exit,this);

		menuItem1.setPosition(new cc.Point(size.width/2,size.height/2+50));
		menuItem2.setPosition(new cc.Point(size.width/2,size.height/2));
		menuItem3.setPosition(new cc.Point(size.width/2,size.height/2-50));
		menuItem4.setPosition(new cc.Point(size.width/2,size.height/2-100));

		var menu = cc.Menu.create(menuItem1,menuItem2,menuItem3,menuItem4);
		menu.setPosition(new cc.Point(0,0));

		colorLayer.setPosition(new cc.Point(0,0));
		colorLayer.addChild(menu);
		this.addChild(colorLayer);

		return this;
	},
	playSound: function(){
		cc.log("Playing Sound");
		cc.AudioEngine.getInstance().playEffect("res/effect2");
	},
	playSong: function(){
		cc.log("Playing Song");
		cc.AudioEngine.getInstance().playMusic("res/background",false);
	},
	stopPlayingSound: function(){
		cc.log("Done playing song");
		if(cc.AudioEngine.getInstance().isMusicPlaying()){
			cc.AudioEngine.getInstance().stopMusic();
		}
	},
	exit: function(){
		// document.location.href = "http://www.google.com";
		cc.log("touch exit");
		history.go(-1);
	}
});

var MyFourthAppScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new MyFourthApp();
		layer.init();
		this.addChild(layer);
	}
});