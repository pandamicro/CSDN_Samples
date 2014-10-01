
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.winSize;

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_bg);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);

        // 利用注释来启用其他示例
        //this.addChild(new ObjPoolLayer());
        this.addChild(new FishingLayer());
        //this.addChild(new BakeLayer());
        //this.addChild(new BatchLayer());
    }
});

