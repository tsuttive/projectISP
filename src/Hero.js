var Hero = cc.Sprite.extend({
    var: heroHp = 100,
    var: heroPower = 10,

    ctor: function () {
        this._super();
        this.initWithFile('res/Character/char1.png');

    },

    getHp: function () {
        return heroHp;
    },

    setHp: function (newHp) {
        heroHp = newHp;
    },

    getPower: function () {
        return heroPower;
    },

    setPower: function (newPower) {
        heroPower = newPower;
    },

    isDead: function () {
        return heroHp <= 0;
    }
});
