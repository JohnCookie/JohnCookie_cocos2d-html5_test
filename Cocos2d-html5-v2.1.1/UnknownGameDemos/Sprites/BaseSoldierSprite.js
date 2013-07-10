// 整个士兵元素
var BaseSoldierSprite=cc.Sprite.extend({
	type: 0, //1 近战 2 远程 3 魔法 4.... 兵种类型 和soldierdata对应
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	blood: 100,
	agility: 0,
	curr_agility:0,
	mass: 0,
	radius: 20,
	atk_buff: null,
	def_buff: null,
	atk_debuff: null, //id,duration
	def_debuff:null,
	extra_buff:null,
	extra_debuff:null,
	mainSprite: null,
	bloodSprite: null,
	bloodChangeSprite: null,
	hpSprite: null,
	effectSprite: null,
	team: 0, //0,1
	actionPointLabel: null, // 额外信息层
	skillNameLabel: null, // 显示技能名称
	statusSpriteArr:null,
	statusSprite1: null,
	statusSprite2: null,
	statusSprite3: null,
	statusSprite4: null,
	statusSprite5: null,
	statusSprite6: null,
	statusSprite7: null,
	statusSprite8: null,
	skill1_cd:0,
	skill2_cd:0,
	ctor: function(type,team){
		this._super();

		this.type=type;
		this.team=team;

		this.atk_buff=new Array();
		this.atk_debuff=new Array();
		this.def_buff=new Array();
		this.def_debuff=new Array();
		this.extra_buff=new Array();
		this.extra_debuff=new Array();

		this.blood=SoldierData[type]["blood"]+SoldierData[type]["addition_blood"];
		this.mass=SoldierData[type]["mass"];
		this.radius=SoldierData[type]["radius"];
		this.agility=SoldierData[type]["agility"]-SoldierData[type]["addition_agility"];
		this.curr_agility=SoldierData[type]["agility"]-SoldierData[type]["addition_agility"];
		//技能cd
		this.skill1_cd=SkillData[SoldierData[type]["skill1"]]["cd"];
		this.skill2_cd=SkillData[SoldierData[type]["skill2"]]["cd"];

		this.setContentSize(new cc.Size(60,70));
		// 精灵主体
		this.mainSprite=new SimpleShapeSprite(type,team);
		this.mainSprite.setPosition(new cc.Point(10+20,8+20));
		// this.angle = Math.PI/4*(180/Math.PI); //45度倾斜
		// this.mainSprite.setRotation(this.angle);
		this.addChild(this.mainSprite);
		
		//血条
		this.bloodSprite=new SimpleBloodSprite(this.blood);
		this.bloodSprite.setPosition(new cc.Point(10,55));
		this.addChild(this.bloodSprite);

		//血量变化显示
		this.bloodChangeSprite=new SimpleHPSprite();
		// this.bloodChangeSprite.setPosition(10,8+40+5);
		// this.addChild(this.bloodChangeSprite);

		//额外的信息层 包含状态 行动力等
		this.actionPointLabel=cc.LabelTTF.create("18","Arial",10);
		this.actionPointLabel.setPosition(50,8);
		this.actionPointLabel.setColor(commonColor3B["blue"]);
		this.addChild(this.actionPointLabel);
		this.reduceAgility(0);

		//目标框
		this.effectSprite=new SimpleEffectSprite(60,70);
		this.effectSprite.setPosition(0,0);
		// this.addChild(this.effectSprite);

		//技能名称
		this.skillNameLabel=cc.LabelTTF.create("Skill Name","Arial",12);
		this.skillNameLabel.setPosition(30,0);
		this.skillNameLabel.setColor(commonColor3B["red"]);
		// this.addChild(this.skillNameLabel);

		//buff/debuff显示位置
		this.statusSprite1=new SimpleStatusSprite(1,1);
		this.statusSprite1.setPosition(0,50);
		// this.addChild(this.statusSprite1);
		this.statusSprite2=new SimpleStatusSprite(3,1);
		this.statusSprite2.setPosition(0,50-14);
		// this.addChild(this.statusSprite2);
		this.statusSprite3=new SimpleStatusSprite(6,1);
		this.statusSprite3.setPosition(0,50-14*2);
		// this.addChild(this.statusSprite3);
		this.statusSprite4=new SimpleStatusSprite(1,1);
		this.statusSprite4.setPosition(0,50-14*3);
		// this.addChild(this.statusSprite4);
		this.statusSprite5=new SimpleStatusSprite(3,1);
		this.statusSprite5.setPosition(-14,50);
		// this.addChild(this.statusSprite5);
		this.statusSprite6=new SimpleStatusSprite(6,1);
		this.statusSprite6.setPosition(-14,50-14);
		// this.addChild(this.statusSprite6);
		this.statusSprite7=new SimpleStatusSprite(3,1);
		this.statusSprite7.setPosition(-14,50-14*2);
		// this.addChild(this.statusSprite7);
		this.statusSprite8=new SimpleStatusSprite(6,1);
		this.statusSprite8.setPosition(-14,50-14*3);
		// this.addChild(this.statusSprite8);

		this.statusSpriteArr=new Array();
		this.statusSpriteArr.push(this.statusSprite1);
		this.statusSpriteArr.push(this.statusSprite2);
		this.statusSpriteArr.push(this.statusSprite3);
		this.statusSpriteArr.push(this.statusSprite4);
		this.statusSpriteArr.push(this.statusSprite5);
		this.statusSpriteArr.push(this.statusSprite6);
		this.statusSpriteArr.push(this.statusSprite7);
		this.statusSpriteArr.push(this.statusSprite8);
	},
	draw: function(){
		// this._super();
		if(Game.showSpriteBorder){
			//描边 方便观察
			color=commonColor3B["black"];
			var r=color.r;
			var g=color.g;
			var b=color.b;
			cc.renderContext.fillStyle = "rgba("+r+","+g+","+b+",255)";
			cc.renderContext.lineWidth=2;
	        cc.renderContext.strokeStyle = "rgba("+r+","+g+","+b+",255)";
	        var position=new cc.Point(0,0);
	        var size=this.getContentSize();
	        var point1=position;
	        var point2=new cc.Point(position.x+size.width,position.y);
	        var point3=new cc.Point(position.x+size.width,position.y+size.height);
	        var point4=new cc.Point(position.x,position.y+size.height);
	        cc.drawingUtil.drawPoly(new Array(point1,point2,point3,point4),4,true,false);
	    }
	},
	update: function(){
	},
	setPosition: function(newPosOrxValue,yValue){
		//覆盖原来的setPosition方法 设置精灵碰撞检测用的x y
		if (arguments.length == 2) {
            this._position = new cc.Point(newPosOrxValue, yValue);
        } else if (arguments.length == 1) {
            this._position = new cc.Point(newPosOrxValue.x, newPosOrxValue.y);
        }
        this.x=this._position.x+30;
        this.y=this._position.y+28;
        this.SET_DIRTY_RECURSIVELY();
	},
	getCenterPosition: function(){
		var pos=this.getPosition();
		var size=this.getContentSize();
		var center=new cc.Point(pos.x+size.width/2,pos.y+size.height/2);
		return center;
	},
	getDamage: function(damage){
		//调整血量
		var damageDetail=this.bloodSprite.getDamage(damage);
		console.log(damageDetail);
		damage=damageDetail["damage"];
		//显示动画
		this.bloodChangeSprite.getDamage(damage);
		this.bloodChangeSprite.setPosition(10,8+40+5);
		this.addChild(this.bloodChangeSprite);
		var actionMove=cc.MoveBy.create(1,new cc.Point(0,20));
		var actionCallback=cc.CallFunc.create(this.removeSpriteCallback,this.bloodChangeSprite,this);
		var actionFinal=cc.Sequence.create(actionMove,actionCallback);
		this.bloodChangeSprite.runAction(actionFinal);
		Game.gameStatus=Game.status.ANIM_ON;
		
		console.log(damageDetail);
		if(damageDetail["die"]==1){
			console.log("---Soldier Die---");
			this.getParent().dieSoldier(this);
			Game.gameStatus=Game.status.NORMAL;
		}
	},
	getHeal: function(heal){
		//调整血量
		var healDetail=this.bloodSprite.getHeal(heal);
		console.log(healDetail);
		heal=healDetail["heal"];
		//显示动画
		this.bloodChangeSprite.getHeal(heal);
		this.bloodChangeSprite.setPosition(10,8+40+5);
		this.addChild(this.bloodChangeSprite);
		var actionMove=cc.MoveBy.create(1,new cc.Point(0,20));
		var actionCallback=cc.CallFunc.create(this.removeSpriteCallback,this.bloodChangeSprite,this);
		var actionFinal=cc.Sequence.create(actionMove,actionCallback);
		this.bloodChangeSprite.runAction(actionFinal);
		Game.gameStatus=Game.status.ANIM_ON;
		
	},
	reduceAgility: function(reduce){
		//如果中了减速效果
		if(this.extra_debuff.indexOf(1)>0){
			reduce=Math.floor(ExtraDebuffData[1]["value"]*reduce);
		}
		if(this.curr_agility-reduce<0){
			this.curr_agility=0;
		}else{
			this.curr_agility-=reduce;
		}
		this.actionPointLabel.setString(this.curr_agility);
	},
	removeSpriteCallback:function(sprite,parent){
		cc.log("removeSprite");
		parent.removeChild(sprite);
		Game.gameStatus=Game.status.NORMAL;
	},
	targetBlink: function(){
		this.addChild(this.effectSprite);
		var blinkAction = cc.Blink.create(2, 3);
		var actionCallback=cc.CallFunc.create(this.removeSpriteCallback,this.effectSprite,this);
		var actionFinal=cc.Sequence.create(blinkAction,actionCallback);
		// Game.gameStatus=Game.status.ANIM_ON;
		this.effectSprite.runAction(actionFinal);
		Game.targetShowed=true;
	},
	resetAgility: function(){
		this.curr_agility=this.agility;
		this.actionPointLabel.setString(this.curr_agility);
	},
	reduceBuffDebuffTime: function(){
		//攻击buff
		for(var i=0;i<this.atk_buff.length;i++){
			console.log("reduce atk buff duration");
			this.atk_buff[i]['duration']-=1;
			if(this.atk_buff[i]['duration']<=0){
				console.log("atk buff end");
				this.atk_buff[i]['duration']=0;
			}
		}
		this.atk_buff=this.atk_buff.removeAllZero('duration');
		//攻击debuff
		for(var i=0;i<this.atk_debuff.length;i++){
			this.atk_debuff[i]['duration']-=1;
			if(this.atk_debuff[i]['duration']<=0){
				this.atk_debuff[i]['duration']=0
			}
		}
		this.atk_debuff=this.atk_debuff.removeAllZero('duration');
		//防御buff
		for(var i=0;i<this.def_buff.length;i++){
			console.log("reduce def buff duration");
			this.def_buff[i]['duration']-=1;
			if(this.def_buff[i]['duration']<=0){
				console.log("def buff end");
				this.def_buff[i]['duration']=0
			}
		}
		this.def_buff=this.def_buff.removeAllZero('duration');
		//防御debuff
		for(var i=0;i<this.def_debuff.length;i++){
			this.def_debuff[i]['duration']-=1;
			if(this.def_debuff[i]['duration']<=0){
				this.def_debuff[i]['duration']=0
			}
		}
		this.def_debuff=this.def_debuff.removeAllZero('duration');
		//其他buff
		for(var i=0;i<this.extra_buff.length;i++){
			this.extra_buff[i]['duration']-=1;
			if(this.extra_buff[i]['duration']<=0){
				this.extra_buff[i]['duration']=0
			}
		}
		this.extra_buff=this.extra_buff.removeAllZero('duration');
		//其他debuff
		for(var i=0;i<this.extra_debuff.length;i++){
			this.extra_debuff[i]['duration']-=1;
			if(this.extra_debuff[i]['duration']<=0){
				console.log("extra debuff end");
				this.extra_debuff[i]['duration']=0
			}
		}
		this.extra_debuff=this.extra_debuff.removeAllZero('duration');
	},
	showSkillName: function(skillId){
		var skillName=SkillData[skillId]["name"];
		this.skillNameLabel.setString(skillName);
		this.skillNameLabel.setScale(1);
		this.addChild(this.skillNameLabel);
		var scaleAction = cc.ScaleBy.create(0.5, 2, 2);
		var actionCallback=cc.CallFunc.create(this.removeSpriteCallback,this.skillNameLabel,this);
		var actionFinal=cc.Sequence.create(scaleAction,actionCallback);
		Game.gameStatus=Game.status.ANIM_ON;
		this.skillNameLabel.runAction(actionFinal);
	},
	refreshStatus: function(){
		// 清除所有状态显示
		var buff_num=0;
		for(var i=0;i<8;i++){
			if(this.statusSpriteArr[i].getParent()){
				this.removeChild(this.statusSpriteArr[i]);
			}
		}
		//一个个种类的buff显示
		for(var i=0;i<this.atk_buff.length;i++){
			this.statusSpriteArr[buff_num].setStatus(1,this.atk_buff[i]['id']);
			buff_num++;
			if(buff_num>8){
				break;
			}
		}
		if(buff_num>8){
			for(var i=0;i<buff_num;i++){
				if(!this.statusSpriteArr[i].getParent()){
					this.addChild(this.statusSpriteArr[i]);
				}
			}
			return;
		}
		for(var i=0;i<this.atk_debuff.length;i++){
			this.statusSpriteArr[buff_num].setStatus(2,this.atk_debuff[i]['id']);
			buff_num++;
			if(buff_num>8){
				break;
			}
		}
		if(buff_num>8){
			for(var i=0;i<buff_num;i++){
				if(!this.statusSpriteArr[i].getParent()){
					this.addChild(this.statusSpriteArr[i]);
				}
			}
			return;
		}
		for(var i=0;i<this.def_buff.length;i++){
			this.statusSpriteArr[buff_num].setStatus(3,this.def_buff[i]['id']);
			buff_num++;
			if(buff_num>8){
				break;
			}
		}
		if(buff_num>8){
			for(var i=0;i<buff_num;i++){
				if(!this.statusSpriteArr[i].getParent()){
					this.addChild(this.statusSpriteArr[i]);
				}
			}
			return;
		}
		for(var i=0;i<this.def_debuff.length;i++){
			this.statusSpriteArr[buff_num].setStatus(4,this.def_debuff[i]['id']);
			buff_num++;
			if(buff_num>8){
				break;
			}
		}
		if(buff_num>8){
			for(var i=0;i<buff_num;i++){
				if(!this.statusSpriteArr[i].getParent()){
					this.addChild(this.statusSpriteArr[i]);
				}
			}
			return;
		}
		for(var i=0;i<this.extra_buff.length;i++){
			this.statusSpriteArr[buff_num].setStatus(5,this.extra_buff[i]['id']);
			buff_num++;
			if(buff_num>8){
				break;
			}
		}
		if(buff_num>8){
			for(var i=0;i<buff_num;i++){
				if(!this.statusSpriteArr[i].getParent()){
					this.addChild(this.statusSpriteArr[i]);
				}
			}
			return;
		}
		for(var i=0;i<this.extra_debuff.length;i++){
			this.statusSpriteArr[buff_num].setStatus(6,this.extra_debuff[i]['id']);
			buff_num++;
			if(buff_num>8){
				break;
			}
		}
		//将所有状态刷新上去
		for(var i=0;i<buff_num;i++){
			if(!this.statusSpriteArr[i].getParent()){
				this.addChild(this.statusSpriteArr[i]);
			}
		}
		return;
	},
	reduceSkillCD: function(){
		this.skill1_cd-=1;
		if(this.skill1_cd<0){
			this.skill1_cd=0;
		}

		this.skill2_cd-=1;
		if(this.skill2_cd<0){
			this.skill2_cd=0;
		}
	}
});