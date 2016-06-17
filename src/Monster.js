var Monster = cc.Sprite.extend({
    var: monsterHp = 50,
    var: monsterPower = 7,

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
