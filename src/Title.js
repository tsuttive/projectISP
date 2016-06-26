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
        // FEATURE: 25/6/59 login via facebook or guest
        var facebook = confirm("Sign in facebook account, to keep your high score.\nor you can play like guest but no any data will keep.\nDo you want to login facebook");

        if (facebook) {
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider);
            console.info("login as facebook");
        } else {
            firebase.auth().signInAnonymously();
            console.info("login as anonymously");
        }

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) this.openStartScene(user);
        });
    },

    openStartScene: function (user) {
        if (user) {
            console.log(firebase.auth().currentUser.displayName ? firebase.auth().currentUser.displayName : "guest");
            console.log(firebase.auth().currentUser.email ? firebase.auth().currentUser.email : "guest@guest.com");
            cc.director.runScene(cc.TransitionCrossFade.create(0.5, new StartScene()));
        }
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
