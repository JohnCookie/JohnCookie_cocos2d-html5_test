var cocos2dApp = cc.Application.extend({
    // config:document.querySelector('#cocos2d-html5')['c'],
    config:document.ccConfig,
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting(); // this line should be added in cocos2d-html5 v2.1
        cc.setup(this.config['tag']);
        /**
            old version code for 2.0 
            The tutorial on Gamefromscratch.com is based on version 2.0
        */
        // cc.Loader.shareLoader().onloading = function () {
        //     cc.LoaderScene.shareLoaderScene().draw();
        // };
        // cc.Loader.shareLoader().onload = function () {
        //     cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        // };
        // cc.Loader.shareLoader().preload([
        // ]);
        
        /**
            new version code for 2.1 
            Some place should be changed
            reference: 
                http://www.cocos2d-x.org/projects/cocos2d-x/wiki/Upgrade_Guide_from_Cocos2d-html5_v20_to_v21
                http://boredwookie.net/index.php/blog/cocos2d-x-html-v2-1-how-to-migrate-from-v2-0/
        */
        cc.Loader.getInstance().onloading = function () {
            cc.LoaderScene.getInstance().draw();
        };
        cc.Loader.getInstance().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };
        cc.AudioEngine.getInstance().init("mp3,ogg,wav");
        cc.Loader.getInstance().preload([
            /*
                {type:"plist",src:"Themes/spritesheet1.plist"},
                {type:"plist",src:"Themes/spritesheet2.plist"}
            */
            {type:"image", src:"Sprites/spriteRes/hero.png"},
            {type:"image", src:"res/tilemap/tmw_desert_spacing.png"},
            {type:"tmx", src:"res/tilemap/tilemapbg.tmx"},
            {type:"image", src:"Sprites/spriteRes/arrow.png"},
            {type:"image", src:"Sprites/spriteRes/heros/2.png"},
            {type:"image", src:"Sprites/spriteRes/heros/22.png"},
            {type:"image", src:"Sprites/spriteRes/heros/117.png"},
            {type:"image", src:"Sprites/spriteRes/heros/knight.png"},
            {type:"image", src:"Sprites/spriteRes/heros/archer.png"},
            {type:"image", src:"Sprites/spriteRes/heros/wizard.png"},
            {type:"image", src:"Sprites/spriteRes/buffs/1_1.png"},
            {type:"image", src:"Sprites/spriteRes/buffs/1_2.png"},
            {type:"image", src:"Sprites/spriteRes/buffs/2_1.png"},
            {type:"image", src:"Sprites/spriteRes/buffs/2_2.png"},
            {type:"image", src:"Sprites/spriteRes/buffs/3_1.png"},
            {type:"image", src:"Sprites/spriteRes/buffs/3_2.png"}
        ]);
    },
    applicationDidFinishLaunching:function () {
        var director = cc.Director.getInstance();
        director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);
        director.runWithScene(new this.startScene());

        return true;
    }
});
console.log("main.js load");
var myApp = new cocos2dApp(GameScene);

