var res = {
    HelloWorld_bg : "res/HelloWorld_vert.jpg",
    texturePack_plist : "res/textureTransparentPack.plist",
    texturePack_png : "res/textureTransparentPack.png",
    fishTex_plist : "res/fishTex.plist",
    fishTex_png : "res/fishTex.png",
    bullet_plist : "res/textureOpaquePack.plist",
    bullet_png : "res/textureOpaquePack.png",
    explosion_plist : "res/textureOpaquePack.plist",
    explosion_png : "res/textureOpaquePack.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}