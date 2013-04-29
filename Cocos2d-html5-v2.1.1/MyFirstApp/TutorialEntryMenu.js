var TutorialEntryMenu =  cc.Layer.extend({
	init: function(){
		this._super();
		var layer=cc.LayerColor.create(new cc.Color4B(0,0,0,255));
		var size=cc.Director.getInstance().getWinSize();

		var menuItem1=cc.MenuItemFont.create("Hello World",this.gotoFirstApp,this);
		var menuItem2=cc.MenuItemFont.create("Simple Sprite",this.gotoSecondApp,this);
		var menuItem3=cc.MenuItemFont.create("Sprite Rotate",this.gotoThirdApp,this);
		var menuItem4=cc.MenuItemFont.create("Play Sound",this.gotoFourthApp,this);
		var menuItem5=cc.MenuItemFont.create("Sprite Sheet",this.gotoFifthApp,this);

		menuItem1.setPosition(new cc.Point(size.width/2,size.height/2+100));
		menuItem2.setPosition(new cc.Point(size.width/2,size.height/2+50));
		menuItem3.setPosition(new cc.Point(size.width/2,size.height/2));
		menuItem4.setPosition(new cc.Point(size.width/2,size.height/2-50));
		menuItem5.setPosition(new cc.Point(size.width/2,size.height/2-100));

		var menu = cc.Menu.create(menuItem1,menuItem2,menuItem3,menuItem4,menuItem5);
		menu.setPosition(new cc.Point(0,0));

		layer.addChild(menu);
		layer.setPosition(new cc.Point(0,0));
		this.addChild(layer);

		return this;
	},
	gotoFirstApp: function(){
		var scene = new MyFirstAppScene();
		var transScene = cc.TransitionMoveInL.create(1,scene);
		cc.Director.getInstance().replaceScene(transScene);
	},
	gotoSecondApp: function(){
		var scene = new MySecondAppScene();
		var transScene = cc.TransitionMoveInL.create(1,scene);
		cc.Director.getInstance().replaceScene(transScene);
	},
	gotoThirdApp: function(){
		var scene = new MyThirdAppScene();
		var transScene = cc.TransitionMoveInL.create(1,scene);
		cc.Director.getInstance().replaceScene(transScene);
	},
	gotoFourthApp: function(){
		var scene = new MyFourthAppScene();
		var transScene = cc.TransitionMoveInL.create(1,scene);
		cc.Director.getInstance().replaceScene(transScene);
	},
	gotoFifthApp: function(){
		var scene = new MyFifthAppScene();
		var transScene = cc.TransitionMoveInL.create(1,scene);
		cc.Director.getInstance().replaceScene(transScene);
	}
});

TutorialEntryMenuScene = cc.Scene.extend({
	onEnter: function(){
		this._super();
		var layer = new TutorialEntryMenu();
		layer.init();
		this.addChild(layer);
	}
});