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
        appFiles:['global.js','data/SoldierData.js','data/SkillData.js','data/BuffData.js','data/DebuffData.js','Sprites/ArrowSprite.js','Sprites/SimpleStatusSprite.js','Sprites/SimpleEffectSprite.js','Sprites/SimpleSkillSprite.js','Sprites/SimpleHPSprite.js','Sprites/SimpleShapeSprite.js','Sprites/SimpleBtnSprite.js','Sprites/BaseSoldierSprite.js','Sprites/SimpleBloodSprite.js','Sprites/SimpleBulletSprite.js','Sprites/TotemSprite.js','Sprites/MinimapSprite.js','MapLayer.js','MainLayer.js','UILayer.js','MyFirstApp.js','GameScene.js','Scenes/AttributeAdjustSprite.js','Scenes/SimpleSoldierAttrScene.js','Scenes/StartGameScene.js','Scenes/SoliderAdjustLayer.js','Scenes/SimpleConfigArmyScene.js','Scenes/SoldierMiniSprite.js','Scenes/SimpleArmyShowSprite.js']
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