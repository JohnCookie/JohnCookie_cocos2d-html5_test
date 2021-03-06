(function () {
    var d = document;
    var c = {
        COCOS2D_DEBUG:2, //0 to turn debug off, 1 for basic debug, and 2 for full debug
        box2d:false,
        chipmunk:false, //these 2 lines are added in v2.1
        loadExtension:false, // these 2 lines are added in v2.1
        showFPS:true,
        frameRate:60,
        tag:'gameCanvas', //the dom element to run cocos2d on
        engineDir:'../cocos2d/',
        appFiles:['global.js','MyFirstApp.js','MySecondApp.js','JetRotate.js','MyThirdApp.js','JetSprite.js','MyFourthApp.js','MyFifthApp.js','TutorialEntryMenu.js','PointSprite.js','SpriteShootDemo.js','SimpleBall.js','SimpleCollision.js','TileMapDemo.js','CollisionOnTilemapScene.js','SimpleBullet.js','SimpleShootDemo.js']
    };
    window.addEventListener('DOMContentLoaded', function () {
        //first load engine file if specified
        var s = d.createElement('script');
        s.src = c.engineDir + 'platform/jsloader.js';
        /*********Delete this section if you have packed all files into one*******/
        // if (c.SingleEngineFile && !c.engineDir) {
        //     s.src = c.SingleEngineFile;
        // }
        // else if (c.engineDir && !c.SingleEngineFile) {
        //     s.src = c.engineDir + 'platform/jsloader.js';
        // }
        // else {
        //     alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        // }
        /*********Delete this section if you have packed all files into one*******/
        
        // s.c = c;
        document.ccConfig=c;
        s.id = 'cocos2d-html5';
        d.body.appendChild(s);
    });
})();