var Monster = cc.Sprite.extend({
    var: monsterHp = monsterHpDefault,
    var: monsterPower = monsterPowerDefault,

    ctor: function () {
        this._super();
        this.initWithFile('res/Character/char2.png');
    },

    resetHp: function () {
        monsterHp = monsterHpDefault;
    },

    resetPower: function () {
        monsterPower = monsterPowerDefault;
    },

    isDead: function () {
        return monsterHp <= 0;
    }
});

Monster.getHp = function () {
    return Number(monsterHp);
};

Monster.setHp = function (newHp) {
    monsterHp = Number(newHp);
};

Monster.getPower = function () {
    return Number(monsterPower);
};

Monster.setPower = function (newPower) {
    monsterPower = Number(newPower);
};