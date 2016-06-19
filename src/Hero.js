var Hero = cc.Sprite.extend({
    var: heroHp = 0,
    var: heroPower = 0,

    ctor: function () {
        this._super();
        this.initWithFile('res/Character/char1.png');

    },

    setHp: function (newHp) {
        heroHp = newHp;
    },

    resetHp: function () {
        heroHp = heroHpDefault;
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

Hero.getHp = function () {
    return heroHp;
};

Hero.getPower = function () {
    return heroPower;
};