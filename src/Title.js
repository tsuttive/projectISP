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
        // FEATURE: 25/6/59 login via facebook (redirect)
        var provider = new firebase.auth.FacebookAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user;
            if (user) {
                cc.director.runScene(cc.TransitionCrossFade.create(0.5, new StartScene()));
                console.log(user.displayName);
                console.log(user.email);
            }
        }).catch(function (error) {
            console.error("contact developer to fix this.");
            console.error(error.code);
            console.error(error.message);
        });
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
