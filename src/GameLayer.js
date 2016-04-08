var GameLayer = cc.LayerColor.extend({

    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.guage = new Guage();
        this.guage.setPosition(new cc.Point(400,150));
        this.addChild(this.guage);

        this.tap = new Tap();
        this.tap.runAction(cc.FadeTo.create(0,0));
        this.tapRandom();
        this.addChild(this.tap);
        this.tap.scheduleUpdate();

        this.addKeyboardHandlers();
        this.scheduleUpdate();

        this.hero = new Hero();
        this.monster = new Monster();
        this.addChild(this.hero);
        this.addChild(this.monster);

        mainHeroHp  = this.hero.getHp();
        mainMonsterHp = this.monster.getMHp();

        this.heroLabel = cc.LabelTTF.create( 'HP: '+mainHeroHp, 'Arial', 40 );
        this.heroLabel.setPosition( new cc.Point( 200, 500 ) );
        this.addChild(this.heroLabel);

        this.monsterLabel = cc.LabelTTF.create( 'HP: '+mainMonsterHp, 'Arial', 40 );
        this.monsterLabel.setPosition( new cc.Point( 600, 500 ) );
        this.addChild(this.monsterLabel);

        this.stageLabel = cc.LabelTTF.create( 'Stage: '+stage, 'Arial', 30 );
        this.stageLabel.setPosition( new cc.Point( 400, 550 ) );
        this.addChild(this.stageLabel);

        this.spLabel = cc.LabelTTF.create( 'SP charge: '+countSucces, 'Arial', 30 );
        this.spLabel.setPosition( new cc.Point( 400, 250 ) );
        this.addChild(this.spLabel);

        this.attackCommand();
        this.spAttackCommand();


        return true;
    },

    onKeyDown: function( keyCode, event ) {
        if (keyCode == cc.KEY.space && attackID == 1){
            this.tap.runAction(cc.FadeTo.create(0,0));
            attackID = 0;
            if (this.tap.speed == 0){
                this.tap.run();
            }else {
                this.tap.stop();
            }
        }
        if(keyCode == cc.KEY.z){
            this.tap.runAction(cc.FadeIn.create(0));
            attackID = 1;
        }
        if (keyCode == cc.KEY.x && SPAttackID == 1) {
            SPHit = 3;
            this.tap.runAction(cc.FadeIn.create(0));
            attackID = 1;
            SPAttackID = 0;
            countSucces = 0;
            this.spLabel.setString('SP charge: '+countSucces);
        }
    },
    onKeyUp: function( keyCode, event ) {

    },
    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);
    },
    setMonsterHp: function(newHp) {
        this.monster.setMHp(newHp);
        mainMonsterHp = this.monster.getMHp();
        this.monsterLabel.setString('HP: '+mainMonsterHp);
    },
    setHeroHp: function (newHp) {
        this.hero.setHp(newHp);
        mainHeroHp = this.hero.getHp();
        this.heroLabel.setString('HP: '+mainHeroHp);
    },
    update: function(dt) {

        if(this.monster.mcheck()) {
            this.monsterGetAttacked();
        }
        if(this.hero.hcheck()) {
            this.heroGetAttacked();
        }

        if (this.tap.speed == 0 && this.tap.closeTo(this.guage)==true) {
            this.monster.mGetAtked();
        }
        else if(this.tap.speed == 0 && this.tap.closeTo(this.guage)==false){
            this.hero.hGetAtked();
        }

        if (this.monster.isDead()&& stage <= 12) {
            this.passTheLevel();
        }

        if (this.hero.isDead()) {
           this.gameOver();
        }

        if (stage == 13 && this.monster.isDead()) {
            this.stageLabel.setString('Game Clear!!');
        }
    },

    attackCommand: function() {
        this.attack = new cc.MenuItemImage(
            'res/Mechanic/AttackButton.jpg',
            'res/Mechanic/AttackButtonPush.jpg',
            function() {
                this.tap.runAction(cc.FadeIn.create(0));
                attackID = 1;
            }, this);
        this.attackButton = new cc.Menu (this.attack);
        this.attackButton.setPosition( new cc.Point (205, 51.5) );
        this.addChild(this.attackButton);
    },

    spAttackCommand: function() {
        this.SPAttack = new cc.MenuItemImage(
            'res/Mechanic/SPButton.jpg',
            'res/Mechanic/SPButtonPush.jpg',
            function() {
                SPHit = 3;
            }, this);
        this.SPButton = new cc.Menu (this.SPAttack);
        this.SPButton.setPosition( new cc.Point (595, 51.5) );
        this.addChild(this.SPButton);
    },
    tapRandom: function() {
        var random = Math.round(Math.random());
        var x = 0;
        if (random == 0)
            x = 40;
        else
            x = 760;
        this.tap.setPosition(new cc.Point(x ,150));
    },
    monsterGetAttacked: function() {
        this.setMonsterHp(mainMonsterHp -= this.hero.getPower());
        this.tapRandom();
        if (countSucces < 5) {
            countSucces++;
            this.spLabel.setString('SP charge: ' + countSucces);
        }
        if (countSucces == 5){
            SPAttackID = 1;
            this.spLabel.setString('SP charge: MAX!!');
        }
        if (SPHit > 0) {
            this.setHeroHp(mainHeroHp +=  this.hero.getPower()/2);
            SPHit--;
        }
        this.tap.run();
    },
    heroGetAttacked: function() {
        this.setHeroHp(mainHeroHp -= this.monster.getPower());
        this.tapRandom();
        this.tap.run();
    },
    passTheLevel:function() {
        this.setMonsterHp(20);
        var speed = this.tap.getSpeed();
        if (speed < 0) {
            speed *= -1;
        }
        this.tap.setSpeed(speed + 2);
        stage++;
        this.stageLabel.setString('Stage: ' + stage);
    },
    gameOver:function() {
        this.setHeroHp(50);
        this.setMonsterHp(20);
        this.tap.setSpeed(defaultSpeed);
        stage = 1;
        this.stageLabel.setString('Stage: '+ stage);
    }

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

var mainHeroHp = 0;
var mainMonsterHp = 0;
var stage = 1;
var attackID = 0;
var SPAttackID = 0;
var SPHit = 0;
var countSucces = 0;