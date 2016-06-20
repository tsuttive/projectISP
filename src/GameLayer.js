var GameLayer = cc.LayerColor.extend({

    init: function () {
        this._super(new cc.Color(60, 179, 113, 255));
        this.setPosition(new cc.Point(0, 0));
        // keyboard
        this.addKeyboardHandlers();
        // update
        this.scheduleUpdate();
        // button
        this.attackCommand();
        this.spAttackCommand();
        this.upgradeCommand();
        // other
        this.createBg();
        this.createGuage();
        this.createTap();
        this.createCharacter();
        // Effect
        this.createHeroEffect();
        this.createMonsterEffect();
        // label
        this.createUpgradePointLabel();
        this.createHeroLabel();
        this.createMonsterLabel();
        this.createStageLabel();
        this.createSPLabel();
        this.createSPHitLabel();
        this.createMuteLabel();
    },

    addKeyboardHandlers: function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                self.onKeyDown(keyCode, event);
            }
        }, this);
    },

    onKeyDown: function (keyCode, event) {
        // isAttack
        if (keyCode == cc.KEY.z) {
            this.attack();
        }
        // sp Attack
        if (keyCode == cc.KEY.x) {
            this.SpAttack();
        }

        // update page
        if (keyCode == cc.KEY.c) {
            cc.director.runScene(new UpgradeScene());
        }
        // sound mute
        if (keyCode == cc.KEY.m) {
            if (sound) {
                this.muteLabel.setString('Mute');
                cc.audioEngine.setEffectsVolume(0);
                cc.audioEngine.setMusicVolume(0);
                sound = false;
            } else {
                this.muteLabel.setString('');
                cc.audioEngine.setEffectsVolume(100);
                cc.audioEngine.setMusicVolume(100);
                sound = true;
            }
        }

        // debug code
        if (keyCode == cc.KEY.q) {
            this.heroAttack();
            console.warn("attack");
        }
        // hack
        if (keyCode == cc.KEY.h) {
            upPoint++;
            console.warn("add upPoint");
        }
        // hack
        if (keyCode == cc.KEY.j) {
            countSuccess = 5;
            console.warn("complete sp charge");
        }

        // debug code
        if (keyCode == cc.KEY.s) {
            console.info("----------------------------------");
            console.info("speed: " + Tap.getSpeed());
            console.info("tSpeed: " + tSpeed);
            console.info("hero hp: " + Hero.getHp());
            console.info("hero power: " + Hero.getPower());
            console.info("monster hp: " + Monster.getHp());
            console.info("monster power: " + Monster.getPower());
            console.info("----------------------------------");
        }
    },

    setHeroHp: function (newHp) {
        Hero.setHp(newHp);
        this.heroLabel.setString('HP: ' + Hero.getHp().toFixed(2));
    },

    setMonsterHp: function (newHp) {
        Monster.setHp(newHp);
        this.monsterLabel.setString('HP: ' + Monster.getHp().toFixed(2));
    },

    // FIXME: 18/6/59 press user press button, program will delay a little
    attackCommand: function () {
        const attack = new cc.MenuItemImage(
            'res/Mechanic/DefendBtn.jpg',
            'res/Mechanic/DefendBtn_push.jpg',
            function () {
                this.attack();
            }, this);
        this.attackButton = new cc.Menu(attack);
        this.attackButton.setPosition(new cc.Point(135, 51.5));
        this.addChild(this.attackButton);
    },

    spAttackCommand: function () {
        const SPAttack = new cc.MenuItemImage(
            'res/Mechanic/SPAttackBtn.jpg',
            'res/Mechanic/SPAttackBtn_push.jpg',
            function () {
                this.spAttack();
            }, this);
        this.SPButton = new cc.Menu(SPAttack);
        this.SPButton.setPosition(new cc.Point(402.5, 51.5));
        this.addChild(this.SPButton);
    },

    upgradeCommand: function () {
        this.Upgrade = new cc.MenuItemImage(
            'res/Mechanic/UpgradeBtn.jpg',
            'res/Mechanic/UpgradeBtn_push.jpg',
            function () {
                tapHere = false;
                cc.director.runScene(new UpgradeScene());
            }, this);
        this.UpgradeButton = new cc.Menu(this.Upgrade);
        this.UpgradeButton.setPosition(new cc.Point(665, 51.5));
        this.addChild(this.UpgradeButton);
    },

    attack: function () {
        if (tapHere) {
            this.tap.stop();
            // hero isAttack
            if (this.tap.closeTo(this.guage)) {
                this.heroAttack(1);
                // monster isAttack
            } else {
                this.monsterAttack();
            }
            tapHere = false;
        } else {
            this.tap.start();
            this.returnEffect();
            tapHere = true;
        }
    },

    spAttack: function () {
        if (countSuccess == 5) {
            this.heroAttack(4);
            countSuccess = 0;
            this.spLabel.setString('SP charge: ' + countSuccess);
            
            this.tap.stop();
            tapHere = false;
        }
    },

    // multiply mean power * multiply to attack monster
    heroAttack: function (multiply) {
        this.setMonsterHp(Monster.getHp() - (Hero.getPower() * multiply));

        if (countSuccess < 5) {
            countSuccess++;
        }

        this.spLabel.setString('SP charge: ' + (countSuccess != 5 ? countSuccess : 'MAX!!'));


        if (this.monster.isDead())
            this.passTheLevel();
        else
            cc.audioEngine.playEffect('res/music/heroSound.mp3');
        this.AttackPos("hero");
    },

    monsterAttack: function () {
        this.setHeroHp(Hero.getHp() - Monster.getPower());

        countSuccess = 0;
        this.spLabel.setString('SP charge: ' + countSuccess);

        if (SPHit > 0) {
            SPHit--;
            this.spHitLabel.setString('SP Hit: ' + SPHit);
        }

        if (this.hero.isDead())
            this.gameOver();
        else
            cc.audioEngine.playEffect('res/music/monsterSound.mp3');

        this.AttackPos("monster");
    },

    AttackPos: function (who) {
        if (who == "hero") {
            this.hero.setPosition(new cc.Point(400, 350));
            this.eff1.setOpacity(255);
        } else {
            this.monster.setPosition(new cc.Point(400, 373));
            this.eff2.setOpacity(255);
        }
    },

    returnEffect: function () {
        this.hero.setPosition(new cc.Point(200, 350));
        this.monster.setPosition(new cc.Point(600, 373));
        this.eff1.setOpacity(0);
        this.eff2.setOpacity(0);
    },

    passTheLevel: function () {
        cc.audioEngine.playEffect('res/music/died.mp3');
        stage++;
        upPoint++;

        // FEATURE: 18/6/59 upgrade hp monster every level
        this.setMonsterHp(monsterHpDefault + (13 * stage));
        Monster.setPower(Monster.getPower());

        this.stageLabel.setString('Stage: ' + stage);
        this.upPointLabel.setString('Upgrade Point: ' + upPoint);

        // expend max level to 50
        if (stage > 50) {
            gameClear = true;
            this.gameOver();
        }
    },

    gameOver: function () {
        cc.audioEngine.playEffect('res/music/died.mp3');

        this.hero.resetHp();
        this.hero.resetPower();
        this.monster.resetHp();
        this.monster.resetPower();

        this.stageLabel.setString('Stage: ' + stage);
        this.spLabel.setString('SP charge: ' + countSuccess);
        this.upPointLabel.setString('Upgrade Point: ' + upPoint);
        this.spHitLabel.setString('SP Hit: ' + SPHit);

        cc.director.runScene(new GameOverScene());
    },

    createGuage: function () {
        this.guage = new Guage();
        this.guage.setPosition(new cc.Point(400, 150));
        this.addChild(this.guage);
    },

    createBg: function () {
        this.bg = new Bg();
        this.bg.setPosition(new cc.Point(400, 420));
        this.addChild(this.bg, 0);
    },

    createTap: function () {
        this.tap = new Tap();
        this.tap.setOpacity(0);
        this.tap.rePos();
        this.addChild(this.tap);
    },

    createCharacter: function () {
        this.hero = new Hero();
        this.monster = new Monster();
        this.addChild(this.hero);
        this.addChild(this.monster);
        // set position
        this.monster.setPosition(new cc.Point(600, 373));
        this.hero.setPosition(new cc.Point(200, 350));
    },

    createHeroLabel: function () {
        this.heroLabel = cc.LabelTTF.create('HP: ' + Hero.getHp().toFixed(2), 'Arial', 40);
        this.heroLabel.setPosition(new cc.Point(200, 500));
        this.addChild(this.heroLabel);
    },

    createMonsterLabel: function () {
        this.monsterLabel = cc.LabelTTF.create('HP: ' + Monster.getHp().toFixed(2), 'Arial', 40);
        this.monsterLabel.setPosition(new cc.Point(600, 500));
        this.addChild(this.monsterLabel);
    },

    createStageLabel: function () {
        this.stageLabel = cc.LabelTTF.create('Stage: ' + stage, 'Arial', 30);
        this.stageLabel.setPosition(new cc.Point(400, 550));
        this.addChild(this.stageLabel);
    },

    createSPLabel: function () {
        this.spLabel = cc.LabelTTF.create('SP charge: ' + (countSuccess != 5 ? countSuccess : 'MAX!!'), 'Arial', 30);
        this.spLabel.setPosition(new cc.Point(150, 220));
        this.addChild(this.spLabel);
    },

    createSPHitLabel: function () {
        this.spHitLabel = cc.LabelTTF.create('SP Hit: ' + SPHit, 'Arial', 30);
        this.spHitLabel.setPosition(new cc.Point(400, 220));
        this.addChild(this.spHitLabel);
    },

    createUpgradePointLabel: function () {
        this.upPointLabel = cc.LabelTTF.create('Upgrade Point: ' + upPoint, 'Arial', 30);
        this.upPointLabel.setPosition(new cc.Point(650, 220));
        this.addChild(this.upPointLabel);
    },

    createMuteLabel: function () {
        this.muteLabel = cc.LabelTTF.create('', 'Arial', 20);
        this.muteLabel.setPosition(new cc.Point(width - 50, height - 50));
        this.muteLabel.setColor(cc.color(255, 0, 0));
        this.addChild(this.muteLabel);
    },

    createHeroEffect: function () {
        this.eff1 = new Effect();
        this.eff1.setPosition(new cc.Point(500, 350));
        this.eff1.setOpacity(0);
        this.addChild(this.eff1);
    },

    createMonsterEffect: function () {
        this.eff2 = new Effect();
        this.eff2.setPosition(new cc.Point(300, 350));
        this.eff2.setOpacity(0);
        this.addChild(this.eff2);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});

// variable
var stage = 1;
// default value
var heroHpDefault = 100;
var heroPowerDefault = 10;
var monsterHpDefault = 50;
var monsterPowerDefault = 7;
// update point
var upPoint = 0;
// SPAttack count
var SPHit = 0;
// charge attack
var countSuccess = 0;
// object speed
var tSpeed = 1;
// 'attack button' tapHere, true = tap is appear; otherwise tap disappear
var tapHere = false;
// is sound or mute
var sound = true;
// is game clear
var gameClear = false;
