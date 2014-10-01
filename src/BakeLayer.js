
// Baked Layer测试图层类
var BakeLayer = cc.Layer.extend({
    ships : null,
    count : 500,
    // 开启或者关闭动作来观察Baked Layer的效果
    enable_action : true,

    ctor: function() {
        var sprite, i, x, y, scale, winSize = cc.director.getWinSize();
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.texturePack_plist);
        cc.textureCache.addImage(res.texturePack_png);

        this.ships = [];

        for (i = 0; i < this.count; ++i) {
            x = Math.round(Math.random() * winSize.width);
            y = Math.round(Math.random() * winSize.height);
            scale = Math.random() * 0.8;
            sprite = new cc.Sprite("#ship03.png");
            sprite.attr({
                x : x,
                y : y,
                scale : scale.toPrecision(2)
            });
            this.ships.push(sprite);
            this.addChild(sprite);

            if (this.enable_action) {
                sprite.runAction(
                    cc.sequence(
                        cc.rotateTo(1, 90),
                        cc.rotateTo(1, 0)
                    ).repeatForever()
                );
            }
        }

        // 去掉注释以开启BAKE功能
        //this.bake();
    }
});

