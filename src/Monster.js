var Monster = cc.Sprite.extend({
    var: monsterHp = 0,
    var: monsterPower = 0,

    ctor: function () {
        this._super();
        this.initWithFile('res/Character/char2.png');
    },

    getHp: function () {
        return monsterHp;
    },

    setHp: function (newHp) {
        monsterHp = newHp;
    },

    resetHp: function () {
        monsterHp = monsterHpDefault;
    },

    getPower: function () {
        return monsterPower;
    },

    setPower: function (newPower) {
        monsterPower = newPower;
    },

    resetPower: function () {
        monsterPower = monsterPowerDefault;
    },

    isDead: function () {
        return monsterHp <= 0;
    }
});
