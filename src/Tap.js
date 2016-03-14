var Tap = cc.Sprite.extend({
    var: startSpeed = 0,
    ctor: function() {

        this._super();
        this.initWithFile('res/Mechanic/tap.png');
        this.speed = 5

    },
    update: function(dt) {
        var pos = this.getPosition();
        if (pos.x <= 0) {
            this.speed *= -1;
        } else if (pos.x >= 800) {
            this.speed *= -1;
        }
        this.setPosition(new cc.Point(pos.x + this.speed, pos.y));

    },
    stop: function() {
        startSpeed = this.speed;
        this.speed = 0;
    },
    run: function() {
        this.speed = startSpeed;
    }

});