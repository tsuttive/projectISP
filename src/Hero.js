var Hero = cc.Sprite.extend({
    var: heroHp = 100,
    ctor: function() {
        this._super();

    },
    getHeroHp: function() {
        return heroHp;
    }


})