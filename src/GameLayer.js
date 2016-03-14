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
    this.tap.scheduleUpdate();
    this.addKeyboardHandlers();
    this.scheduleUpdate();
    return true;
  },

  onKeyDown: function( keyCode, event ) {
    if (keyCode == cc.KEY.space){
      if (this.tap.speed == 0){
        this.tap.run();
      }else {
        this.tap.stop();
      }
    }
  },
  onKeyUp: function( keyCode, event ) {

  },
  addKeyboardHandlers: function() {
    var self = this;
    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed : function( keyCode, event ) {
        self.onKeyDown( keyCode, event );
      },
      onKeyReleased: function( keyCode, event ) {
        self.onKeyUp( keyCode, event );
      }
    }, this);
  },
    update: function(dt) {

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
