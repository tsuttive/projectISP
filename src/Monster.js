var Monster = cc.Sprite.extend({
    var: monsterHp = 300,
    ctor: function() {
        this._super();

    },
    getMonsterHp: function() {
        return monsterHp;
}
})