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
        console.log(this.speed);
        this.setPosition(new cc.Point(pos.x + this.speed, pos.y));
    },

    stop: function () {
        // hide the tap
        this.setOpacity(0);
        // random position
        this.rePosition();
        // set speed
        this.speed = 0;
        // unUpdate
        this.unscheduleUpdate()
    },

    start: function () {
        this.setOpacity(255);
        this.speed = tSpeed + stage + 1;
        this.setStartSpeed();
        this.scheduleUpdate();
    },

    closeTo: function (obj) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return !!((Math.abs(myPos.x - oPos.x) <= 10) &&
        (Math.abs(myPos.y - oPos.y) <= 20));
    },

    getSpeed: function () {
        return this.speed;
    },

    rePosition: function () {
        var random = Math.round(Math.random());
        var x = 0;
        if (random == 0)
            x = 40;
        else
            x = 760;
        this.setPosition(new cc.Point(x, 150));
    },

    setStartSpeed: function () {

        var random = Math.round(Math.random() * 2);
        if (random == 0) {
            this.speed *= -1;
        }
    }
});
