var UpgradeLayer = cc.LayerColor.extend({
    init: function () {
        this._super(new cc.Color(127, 127, 127, 255));
        this.setPosition(new cc.Point(0, 0));
        this.GoBack();
        this.hpButton();
        this.powerButton();
        this.speedButton();
        this.createUpgradePointLabel();
        this.createHpUpgradeLabel();
        this.createPowerUpgradeLabel();
        this.createSpeedUpgradeLabel();
        this.addKeyboardHandlers();
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
        if (keyCode == cc.KEY.z) {
            this.hpUpgrade();
        }

        if (keyCode == cc.KEY.x) {
            this.powerUpgrade();
        }

        if (keyCode == cc.KEY.c) {
            cc.director.runScene(new StartScene());
        }
    },

    setHeroHp: function (newHp) {
        this.hero.setHp(newHp);
        mainHeroHp = newHp;
        this.heroLabel.setString('HP: ' + newHp);
    },

    GoBack: function () {
        this.back = new cc.MenuItemImage(
            'res/Mechanic/BackButton.jpg',
            'res/Mechanic/BackButtonPush.jpg',
            function () {
                cc.director.runScene(new StartScene());
            }, this);
        this.backButton = new cc.Menu(this.back);
        this.backButton.setPosition(new cc.Point(665, 51.5));
        this.addChild(this.backButton);
    },

    hpButton: function () {
        var hpUp = new cc.MenuItemImage(
            'res/Mechanic/Upgrade.jpg',
            'res/Mechanic/UpgradePush.jpg',
            function () {
                this.hpUpgrade();
            }, this);
        var hpUpButton = new cc.Menu(hpUp);
        hpUpButton.setPosition(new cc.Point(665, 525));
        this.addChild(hpUpButton);
    },

    powerButton: function () {
        var powerUp = new cc.MenuItemImage(
            'res/Mechanic/Upgrade.jpg',
            'res/Mechanic/UpgradePush.jpg',
            function () {
                this.powerUpgrade();
            }, this);
        var powerUpButton = new cc.Menu(powerUp);
        powerUpButton.setPosition(new cc.Point(665, 400));
        this.addChild(powerUpButton);
    },

    speedButton: function () {
        var speed = new cc.MenuItemImage(
            'res/Mechanic/Upgrade.jpg',
            'res/Mechanic/UpgradePush.jpg',
            function () {
                this.speedUpgrade();
            }, this);
        var speedButton = new cc.Menu(speed);
        speedButton.setPosition(new cc.Point(665, 275));
        this.addChild(speedButton);
    },

    hpUpgrade: function () {
        if (upPoint > 0) {
            hpUpgrade += 1;
            upPoint -= 1;
            // FEATURE: 18/6/59 add hero when player add upgrade point
            mainHeroHp += (3 * hpUpgrade * stage);
            mainHeroHp.toFixed(0);

            this.upPointLabel.setString('Upgrade Point: ' + upPoint);
            this.hpUpLabel.setString('HP UPGRADED(' + mainHeroHp + '+' + (3 * (hpUpgrade + 1) * stage) + '): ' + hpUpgrade);
        }
    },

    powerUpgrade: function () {
        // powerUpgrade should add by 1 because it show the future power
        const power = ((3 / 2) * ((powerUpgrade + 1) / 10) * (stage / 4)).toFixed(3);

        if (upPoint > 0) {
            powerUpgrade += 1;
            upPoint -= 1;
            // FEATURE: 18/6/59 add power of hero when player upgrade it
            mainHeroPower += ((3 / 2) * (powerUpgrade / 10) * (stage / 4));
            mainHeroPower.toFixed(2);

            this.upPointLabel.setString('Upgrade Point: ' + upPoint);
            this.powerUpLabel.setString('POWER UPGRADED(' + mainHeroPower + '+' + power + '): ' + powerUpgrade);
        }
    },

    speedUpgrade: function () {
        if (upPoint > 0) {
            speedUpgrade += 1;
            upPoint -= 1;
            // FEATURE: 18/6/59 decrease speed when user update speed
            Tap.decreaseSpeed();

            this.upPointLabel.setString('Upgrade Point: ' + upPoint);
            this.speedLabel.setString('SPEED UPGRADED(' + (Tap.getSpeed() - 1).toFixed(0) + '-1): ' + speedUpgrade);
        }
    },

    createUpgradePointLabel: function () {
        this.upPointLabel = cc.LabelTTF.create('Upgrade Point: ' + upPoint, 'Arial', 30);
        this.upPointLabel.setPosition(new cc.Point(650, 150));
        this.addChild(this.upPointLabel);
    },

    createHpUpgradeLabel: function () {
        this.hpUpLabel = cc.LabelTTF.create('HP UPGRADED(' + Hero.getHp() + '+' + (3 * (hpUpgrade + 1) * stage) + '): ' + hpUpgrade, 'Arial', 30);
        this.hpUpLabel.setPosition(new cc.Point(250, 525));
        this.addChild(this.hpUpLabel);
    },

    createPowerUpgradeLabel: function () {
        const power = ((3 / 2) * ((powerUpgrade + 1) / 10) * (stage / 4)).toFixed(3);

        this.powerUpLabel = cc.LabelTTF.create('POWER UPGRADED(' + Hero.getPower() + '+' + power + '): ' + powerUpgrade, 'Arial', 30);
        this.powerUpLabel.setPosition(new cc.Point(250, 400));
        this.addChild(this.powerUpLabel);
    },

    createSpeedUpgradeLabel: function () {
        this.speedLabel = cc.LabelTTF.create('SPEED UPGRADED(' + Tap.getSpeed() + '-1): ' + speedUpgrade, 'Arial', 30);
        this.speedLabel.setPosition(new cc.Point(250, 275));
        this.addChild(this.speedLabel);
    }
});

var UpgradeScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new UpgradeLayer();
        layer.init();
        this.addChild(layer);
    }
});

var hpUpgrade = 0;
var powerUpgrade = 0;
var speedUpgrade = 0;

