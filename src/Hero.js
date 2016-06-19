var Hero = cc.Sprite.extend({
    var: heroHp = 0,
    var: heroPower = 0,

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

    resetHp: function () {
        heroHp = heroHpDefault;
    },

    getPower: function () {
        return heroPower;
    },

    setPower: function (newPower) {
        heroPower = newPower;
    },

    resetPower: function () {
        heroPower = heroPowerDefault;
    },

    isDead: function () {
        return heroHp <= 0;
    }
});
