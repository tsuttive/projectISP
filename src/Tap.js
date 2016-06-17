//noinspection JSDuplicatedDeclaration
var Tap = cc.Sprite.extend({

    ctor: function () {
        this._super();
        this.initWithFile('res/Mechanic/tap.png');

        this.speed = tSpeed + stage + 1;
    },

    update: function (dt) {
        var pos = this.getPosition();
        if (pos.x <= 20) {
            this.speed *= -1;
        } else if (pos.x >= 780) {
            this.speed *= -1;
        }
        this.setPosition(new cc.Point(pos.x + this.speed, pos.y));
    },

    stop: function () {
        // hide the tap
        this.setOpacity(0);
        // set speed
        this.speed = 0;
        // unUpdate
        this.unscheduleUpdate()
    },

    isStop: function () {
        return (this.getOpacity() == 0) && (this.speed == 0);
    },

    start: function () {
        this.rePosition();
        this.setOpacity(255);
        this.speed = tSpeed + stage + 1;
        this.setStartSpeed();
        this.scheduleUpdate();
    },

    closeTo: function (obj) {
        var myPos = this.getPositionX();
        var oPos = obj.getPositionX();
        return (Math.abs(myPos - oPos) <= 10);
    },

    getSpeed: function () {
        return this.speed;
    },

    rePosition: function () {
        var random = Math.round(Math.random() * 760);
        while (random <= 40) {
            random = Math.round(Math.random() * 760);
        }
        this.setPosition(new cc.Point(random, 150));
    },

    setStartSpeed: function () {

        var random = Math.round(Math.random() * 2);
        if (random == 0) {
            this.speed *= -1;
        }
    }
});
