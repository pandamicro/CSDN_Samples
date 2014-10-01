var BatchLayer = cc.Layer.extend({
    ctor: function() {
        var batchNode, logo, star, panel, fish, ribbon, gift, text1, winSize = cc.director.getWinSize();
        this._super();

        // 通过TexturePacker打包的精灵帧列表添加精灵帧
        cc.spriteFrameCache.addSpriteFrames(res.fishTex_plist);
        // 添加TexturePacker打包的精灵帧贴图
        var tex = cc.textureCache.addImage(res.fishTex_png);

        // 创建SpriteBatchNode子结点，并用它来包含所有精灵对象，注意：请将project.json中的renderMode字段设为2来开启WebGL渲染
        batchNode = new cc.SpriteBatchNode(tex);
        // batchNode是这个图层的直接子结点
        this.addChild(batchNode);

        // 给SpriteBatch添加子结点，注意：他们必须和batchNode使用同一张贴图
        bg = new cc.Sprite("#bg.jpg");
        bg.x = winSize.width/2;
        bg.y = winSize.height/2;
        batchNode.addChild(bg);

        logo = new cc.Sprite("#logo.png");
        logo.x = winSize.width/2;
        logo.y = winSize.height - 70;
        batchNode.addChild(logo);

        star = new cc.Sprite("#star.png");
        star.x = winSize.width/2;
        star.y = winSize.height - 120;
        batchNode.addChild(star);

        panel = new cc.Sprite("#panel.png");
        panel.x = winSize.width/2;
        panel.y = winSize.height/2 - 30;
        batchNode.addChild(panel);

        // 位置是凑出来的，请勿模仿这种写法
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
        batchNode.addChild(gift);

        text1 = new cc.LabelTTF("选择下方你最喜欢的鱼，我们将借助\n神秘力量来测你的幸运指数！", "Arial", 14, cc.size(300, 40), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
        text1.x = winSize.width/2;
        text1.y = 630;

        this.addChild(text1);
    }
});