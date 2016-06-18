//noinspection JSDuplicatedDeclaration
var Tap = cc.Sprite.extend({
    var: timer = 0,

    ctor: function () {
        this._super();
        this.initWithFile('res/Mechanic/tap.png');

        this.setSpeed();
    },

    update: function (dt) {
        if (timer != 0) {
            timer++;
            if (timer % 60 == 0) {
                if (this.speed > 0)
                    this.speed += 0.07;
                else
                    this.speed -= 0.07;
            }
        }
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
        timer = 0;
        return (this.getOpacity() == 0) && (this.speed == 0);
    },

    start: function () {
        timer = 1;
        this.rePos();
        this.setOpacity(255);
        this.setSpeed();
        this.setStartPos();
        this.scheduleUpdate();
    },

    closeTo: function (obj) {
        var myPos = this.getPositionX();
        var oPos = obj.getPositionX();
        return (Math.abs(myPos - oPos) <= 15);
    },

    getSpeed: function () {
        return this.speed;
    },

    /**
     * set by using state and tSpeed
     */
    setSpeed: function () {
        // FEATURE: 18/6/59 increase speed by stage
        this.speed = tSpeed + stage + stage;
    },

    removeSpeed: function (decrease) {
        this.speed -= decrease;
    },

    rePos: function () {
        var random = Math.round(Math.random() * 760);
        while (random <= 40) {
            random = Math.round(Math.random() * 760);
        }
        this.setPosition(new cc.Point(random, 150));
    },

    setStartPos: function () {

        var random = Math.round(Math.random() * 2);
        if (random == 0) {
            this.speed *= -1;
        }
    }
});
