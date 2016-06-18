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

    getPower: function () {
        return monsterPower;
    },

    setPower: function (newPower) {
        monsterPower = newPower;
    },

    isDead: function () {
        return monsterHp <= 0;
    }
});
