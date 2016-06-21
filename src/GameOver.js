var GameOverLayer = cc.LayerColor.extend({
    var: current = 0,

    init: function () {
        this._super(new cc.Color(220, 20, 60, 255));
        this.setPosition(new cc.Point(0, 0));
        this.createScoreLabel();
        this.addKeyboardHandlers();
        if (stage - 1 > current)
            current = stage - 1;
        if (stage == 1) {
            this.stageLabel.setString('Keep Trying!!', 'Arial', 40);
        } else if (stage > 1) {
            this.stageLabel.setString('The Highest stage that you can reach is\n                                ' +
                current, 'Arial', 40);
        } else if (gameClear) {
            this.stageLabel.setString('Congratulations you have clear the game!!', 'Arial', 40);
        }
        this.replay();
        return true;
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
        if (keyCode == cc.KEY.space) {
            stage = 1;
            gameClear = false;
            cc.director.runScene(cc.TransitionCrossFade.create(0.5, new TitleScene()));
        }

    },

    replay: function () {
        this.SPAttack = new cc.MenuItemImage(
            'res/Mechanic/RestartBtn.jpg',
            'res/Mechanic/RestartBtn_push.jpg',
            function () {
                stage = 1;

                countSuccess = 0;
                SPHit = 0;
                upPoint = 0;

                hpUpgrade = 0;
                powerUpgrade = 0;
                speedUpgrade = 0;

                gameClear = false;
                cc.director.runScene(cc.TransitionCrossFade.create(0.5, new TitleScene()));
            }, this);
        this.startGame = new cc.Menu(this.SPAttack);
        this.startGame.setPosition(new cc.Point(400, 200));
        this.addChild(this.startGame);
    },

    createScoreLabel: function () {
        this.stageLabel = cc.LabelTTF.create('', 'Arial', 40);
        this.stageLabel.setPosition(new cc.Point(400, 450));
        this.addChild(this.stageLabel);
    }
});
var GameOverScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameOverLayer();
        layer.init();
        this.addChild(layer);
    }
});
