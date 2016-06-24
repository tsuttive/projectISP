var TitleLayer = cc.LayerColor.extend({

    init: function () {
        this._super(new cc.Color(127, 127, 127, 255));
        this.setPosition(new cc.Point(0, 0));
        this.createButton();
        this.addKeyboardHandlers();
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
            this.play();
        }
    },

    play: function () {
        cc.director.runScene(cc.TransitionCrossFade.create(0.5, new StartScene()));
    },

    createButton: function () {
        this.SPAttack = new cc.MenuItemImage(
            'res/Others/HowToPlay.jpg',
            'res/Others/HowToPlay.jpg',
            this.play, this);
        this.startGame = new cc.Menu(this.SPAttack);
        this.startGame.setPosition(new cc.Point(400, 300));
        this.addChild(this.startGame);
    }
});
var TitleScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new TitleLayer();
        layer.init();
        this.addChild(layer);
    }
});
