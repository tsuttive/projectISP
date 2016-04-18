var UpgradeLayer = cc.LayerColor.extend({

    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.GoBack();
        this.hpUpgradeFn();
        this.powerUpgradeFn();
        this.createUpgradePointLabel();

    },
    update: function() {
        heroMaxHp += (3*hpUpgrade);
        heroPower += (powerUpgrade);
    },
    GoBack: function() {
        this.back = new cc.MenuItemImage(
            'res/Mechanic/BackButton.jpg',
            'res/Mechanic/BackButtonPush.jpg',
            function() {
                cc.director.runScene(new StartScene());
            }, this);
        this.backButton = new cc.Menu (this.back);
        this.backButton.setPosition( new cc.Point (665, 51.5) );
        this.addChild(this.backButton);
    },
    hpUpgradeFn: function() {
        this.hpUp = new cc.MenuItemImage(
            'res/Mechanic/Hp.jpg',
            'res/Mechanic/HpPush.jpg',
            function() {
                if (upPoint > 0) {
                    hpUpgrade += 1;
                    upPoint-=1;
                    this.upPointLabel.setString('Upgrade Point: '+upPoint);
                    this.update();
                }
            }, this);
        this.hpUpButton = new cc.Menu (this.hpUp);
        this.hpUpButton.setPosition( new cc.Point (665, 501.5) );
        this.addChild(this.hpUpButton);
    },
    powerUpgradeFn: function() {
        this.powerUp = new cc.MenuItemImage(
            'res/Mechanic/Power.jpg',
            'res/Mechanic/PowerPush.jpg',
            function() {
                if (upPoint > 0) {
                    powerUpgrade += 1;
                    upPoint-=1;
                    this.upPointLabel.setString('Upgrade Point: '+upPoint);
                    this.update();
                }
            }, this);
        this.powerUpButton = new cc.Menu (this.powerUp);
        this.powerUpButton.setPosition( new cc.Point (665, 301.5) );
        this.addChild(this.powerUpButton);
    },
    createUpgradePointLabel: function() {
        this.upPointLabel = cc.LabelTTF.create( 'Upgrade Point: '+upPoint, 'Arial', 30 );
        this.upPointLabel.setPosition( new cc.Point( 650, 220 ) );
        this.addChild(this.upPointLabel);
    },
});


var UpgradeScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new UpgradeLayer();
        layer.init();
        this.addChild( layer );
    }
});

var hpUpgrade = 0;
var powerUpgrade = 0;