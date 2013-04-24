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
            //res for Sprite Demo
            {type:"image", src:"res/Jet.png"},
            //res for Audio Demo
            //In version 2.1.1 both effect&bgm type changed to sound
            {type:"sound", src:"res/effect2"},
            {type:"sound", src:"res/background"}
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
// var myApp = new cocos2dApp(MyFirstAppScene);
// var myApp = new cocos2dApp(MySecondAppScene);
var myApp = new cocos2dApp(PivotScene);
// var myApp = new cocos2dApp(MyThirdAppScene);
// var myApp =  new cocos2dApp(MyFourthAppScene);