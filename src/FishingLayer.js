var FishingLayer = cc.Layer.extend({
    ctor: function() {
        var logo, star, panel, fish, ribbon, gift, text1, winSize = cc.director.getWinSize();
        this._super();

        // 通过TexturePacker打包的精灵帧列表添加精灵帧
        cc.spriteFrameCache.addSpriteFrames(res.fishTex_plist);
        // 添加TexturePacker打包的精灵帧贴图
        cc.textureCache.addImage(res.fishTex_png);

        // 创建并添加所有子结点
        bg = new cc.Sprite("#bg.jpg");
        bg.x = winSize.width/2;
        bg.y = winSize.height/2;
        this.addChild(bg);

        logo = new cc.Sprite("#logo.png");
        logo.x = winSize.width/2;
        logo.y = winSize.height - 70;
        this.addChild(logo);

        star = new cc.Sprite("#star.png");
        star.x = winSize.width/2;
        star.y = winSize.height - 120;
        this.addChild(star);

        panel = new cc.Sprite("#panel.png");
        panel.x = winSize.width/2;
        panel.y = winSize.height/2 - 30;
        this.addChild(panel);

        for (var i = 0; i < 4; ++i) {
            fish = new cc.Sprite("#fish" + (i+1) + ".png");
            fish.x = 0.27 * panel.width + (i % 2) * panel.width * 0.45;
            fish.y = 390 - Math.floor(i/2) * 200;
            panel.addChild(fish);

            ribbon = new cc.Sprite("#ribbon" + (i+1) + ".png");
            ribbon.x = 0.28 * panel.width + (i % 2) * panel.width * 0.44;
            ribbon.y = 320 - Math.floor(i/2) * 200;
            panel.addChild(ribbon);
        }

        gift = new cc.Sprite("#gift.png");
        gift.x = winSize.width/2;
        gift.y = 100;
        this.addChild(gift);

        text1 = new cc.LabelTTF("选择下方你最喜欢的鱼，我们将借助\n神秘力量来测你的幸运指数！", "Arial", 14, cc.size(300, 40), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        text1.x = winSize.width/2;
        text1.y = 630;
        this.addChild(text1);

        // 对当前图层使用Bake功能
        // 若不再需要Bake功能，请使用unbake函数来取消
        this.bake();
    }
});