
// 给子弹精灵类添加reuse和unuse函数来支持对象缓冲池
var Bullet = cc.Sprite.extend({
    speed : 900,
    destination : 0,
    id : 0,
    ctor : function(id, x, y) {
        this._super("#W1.png");

        this.id = id;
        this.reuse(x, y);
        this.scale = 0.8;
    },

    // ObjectPool支持函数，用于重新初始化该节点
    reuse : function(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = -this.speed;
        this.destination = Math.round( Math.random() * (cc.winSize.height - y) );
    },

    // ObjectPool支持函数，用于解除监听器，计时器，复位状态等
    unuse : function() {
    },

    update : function(dt) {
        this.y -= this.velocity * dt;

        if (this.y > this.destination) {
            // 到达目标位置，不再需要该对象
            this.destroy();
        }
    },

    destroy : function() {
        // 不再需要该对象时，将这个对象放回缓冲池
        cc.pool.putInPool(this);
        this.parent.removeBullet(this);
    }
});

// 给敌机精灵类添加reuse和unuse函数来支持对象缓冲池
var Enemy = cc.Sprite.extend({
    id : 0,
    ctor : function (id) {
        var tex = "#E" + Math.floor(Math.random() * 6) + ".png";
        this._super(tex);

        this.id = id;

        this.reuse();
    },

    // ObjectPool支持函数，用于重新初始化该节点
    reuse : function() {
        var startx, starty, endx, endy;
        startx = Math.round(Math.random() * cc.winSize.width);
        starty = cc.winSize.height + 100;
        endx = Math.round(Math.random() * cc.winSize.width);
        endy = Math.round(Math.random() * cc.winSize.height/2);

        this.attr({
            x : startx,
            y : starty,
            scale : 0.4,
            rotation : 180
        });

        this.runAction(cc.sequence(
            cc.moveTo(5, endx, endy),
            cc.callFunc(this.destroy, this)
        ));
    },

    // ObjectPool支持函数，用于解除监听器，计时器，复位状态等
    unuse : function() {
    },

    destroy : function () {
        // 不再需要该对象时，将这个对象放回缓冲池
        cc.pool.putInPool(this);
        this.parent.removeEnemy(this);
    }
});

// 我机精灵类
var Ship = cc.Sprite.extend({
    activate_pool : false,
    bullet_id : 0,
    // 每批子弹的数量，为了增强缓冲池的效果
    count : 5,

    ctor : function (activate_pool) {
        var frame0, frame1, animFrames, animation;
        this._super("#ship02.png");

        // 设置是否开启缓冲池的标记
        this.activate_pool = activate_pool ? true : false;

        frame0 = cc.spriteFrameCache.getSpriteFrame("ship01.png");
        frame1 = cc.spriteFrameCache.getSpriteFrame("ship02.png");
        animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);

        animation = new cc.Animation(animFrames, 0.1);
        this.runAction(cc.animate(animation).repeatForever());

        this.attr({
            x : cc.winSize.width/2,
            y : 120,
            scale : 0.3
        });

        // 每隔1/6秒发射一批子弹
        this.schedule(this.shoot, 1 / 6);
    },

    shoot : function() {
        var offset = 22, i, a, b,
            ax = this.x + offset,
            bx = this.x - offset,
            y = this.y + this.height * this.scale * 0.4;

        for (i = 0; i < this.count; ++i) {
            a = null;
            b = null;
            if (this.activate_pool) {
                // 尝试从缓冲池中取得子弹
                a = cc.pool.getFromPool(Bullet, ax, y);
                b = cc.pool.getFromPool(Bullet, bx, y);
            }

            // 如果缓冲池中没有子弹或者没有开启缓冲池，就创建新的子弹对象
            if (a == null) {
                a = new Bullet(this.bullet_id++, ax, y);
            }
            if (b == null) {
                b = new Bullet(this.bullet_id++, bx, y);
            }

            this.parent.addBullet(a);
            this.parent.addBullet(b);
        }
    }
});

var ObjPoolLayer = cc.Layer.extend({
    bullets : null,
    enemies : null,
    enemy_id : 0,
    ship : null,
    attack_delay : 0,
    attack_count : 5,
    // !!!IMPORTANT!!! 开启或关闭缓冲池支持
    activate_pool : true,
    count : 0,

    ctor : function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.texturePack_plist);
        cc.textureCache.addImage(res.texturePack_png);
        cc.spriteFrameCache.addSpriteFrames(res.bullet_plist);
        cc.textureCache.addImage(res.bullet_png);
        cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);
        cc.textureCache.addImage(res.explosion_png);

        this.bullets = {};
        this.enemies = {};
        //this.explosions = {};

        var bg = new cc.Sprite("#bg01.png");
        bg.x = cc.winSize.width/2;
        bg.y = cc.winSize.height/2;
        bg.scale = 480/bg.width;
        this.addChild(bg);

        this.ship = new Ship(this.activate_pool);
        this.addChild(this.ship);

        this.scheduleUpdate();
    },

    addBullet : function (bullet) {
        this.bullets[bullet.id] = bullet;
        this.addChild(bullet);
    },

    removeBullet : function (bullet) {
        this.removeChild(bullet);
        delete this.bullets[bullet.id];
    },

    removeEnemy : function (enemy) {
        this.removeChild(enemy);
        delete this.enemies[enemy.id];
    },

    update : function (dt) {
        for (var i in this.bullets) {
            this.bullets[i].update(dt);
        }

        if (this.attack_delay == 0) {
            this.attack_delay = 60 + Math.round(Math.random() * 120);

            var count = Math.ceil(Math.random() * this.attack_count), enemy;
            for (i = 0; i < count; i++) {
                enemy = null;
                if (this.activate_pool) {
                    // 尝试从缓冲池中取得敌机
                    enemy = cc.pool.getFromPool(Enemy);
                }
                // 如果缓冲池中没有敌机或者没有开启缓冲池，就创建新的敌机对象
                if (enemy == null)
                    enemy = new Enemy(this.enemy_id++);
                this.enemies[enemy.id] = enemy;
                this.addChild(enemy);
            }
        }
        else this.attack_delay--;
    }
});