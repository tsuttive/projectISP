var GameLayer = cc.LayerColor.extend({
  init: function() {
    this._super( new cc.Color( 127, 127, 127, 255 ) );
    this.setPosition( new cc.Point( 0, 0 ) );
    this.guage = new Guage();
    this.guage.setPosition(new cc.Point(400,150));
    this.addChild(this.guage);
    this.tap = new Tap();
    this.tap.setPosition(new cc.Point(200,150));
    this.addChild(this.tap);
    return true;
  }
});

var StartScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer = new GameLayer();
    layer.init();
    this.addChild( layer );
  }
});
