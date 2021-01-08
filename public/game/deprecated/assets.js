
class Assets {
    constructor() {

    }

    preload(g) {
        this.loading = createGraphics(100, 100);
        this.loading.text("Loading...",0,0);
        //this.img = loading;
        //this.ammoImg = loading;
        
        this.groundImg = loadImage('game/14176.jpg');
        this.ammoImg = loadImage('game/img/ammo.png');
        //this.tankModel = loadModel('assets/models/amongus.obj');
        this.tankTexture = loadImage('assets/textures/3fea26f0.jpg');
    }
}
