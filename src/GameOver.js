var GameOverLayer = cc.LayerColor.extend({

    init: function () {
        this._super(new cc.Color(220, 20, 60, 255));
        this.setPosition(new cc.Point(0, 0));

        this.createScoreLabel();
        this.createHighScoreLabel();
        this.createReplayButton();

        this.addKeyboardHandlers();

        // check can win at least 1 stage?
        if (stage <= 1) {
            this.stageLabel.setString('Keep Trying!!');
        } else {
            const current = stage - 1;
            // save highest stage in local storage
            if (localStorage.getItem("stage") < current) {
                localStorage.setItem("stage", current);
            }
            var historyStage = localStorage.getItem("stage");

            this.highStageLabel.setString('The Highest stage ever is  ' + historyStage);
            this.stageLabel.setString('The Highest stage on this play is  ' + current);
        }

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
            this.replay();
        }
    },

    replay: function () {
        stage = 1;

        countSuccess = 0;
        upPoint = 0;

        hpUpgrade = 0;
        powerUpgrade = 0;
        speedUpgrade = 0;
        cc.director.runScene(cc.TransitionCrossFade.create(0.5, new TitleScene()));
    },

    createReplayButton: function () {
        this.button = new cc.MenuItemImage(
            'res/Mechanic/RestartBtn.jpg',
            'res/Mechanic/RestartBtn_push.jpg',
            this.replay, this);
        this.startGame = new cc.Menu(this.button);
        this.startGame.setPosition(new cc.Point(screenWidth / 2, 100));
        this.addChild(this.startGame);
    },

    createHighScoreLabel: function () {
        this.highStageLabel = cc.LabelTTF.create('', 'Arial', 40);
        this.highStageLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 100));
        this.addChild(this.highStageLabel);
    },

    createScoreLabel: function () {
        this.stageLabel = cc.LabelTTF.create('', 'Arial', 40);
        this.stageLabel.setPosition(new cc.Point(screenWidth / 2, screenHeight - 200));
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
