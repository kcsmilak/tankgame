

class TankGame {

    constructor(g) {
        this.assets = new Assets();
    }

    preload(g) {
        this.assets.preload(g);
    }

    setup(g) {

        this.resetWorld();
        this.showDebug = false;
        this.showRadar = true;
        this.showHud = true;
        this.showScoreboard = true;
        this.showFirst = true;
        this.showTest = false;

        this.serverUpdate = null;
        this.serverUpdateCount = 0;

        this.scoreboard = new Scoreboard();
        this.radar = new Radar();        
        this.firstPerson = new FirstPerson(this.assets);


        this.radarWindow = g.createGraphics(300, 300);
        this.mapWindow = g.createGraphics(100, 100, WEBGL);
        this.debugWindow = g.createGraphics(200, 600);
        this.scoreWindow = g.createGraphics(400, 400);
        this.hudWindow = g.createGraphics(300,300);

        this.testWindow = g.createGraphics(100, 100, WEBGL);
        
        
        this.firstWindow = g.createGraphics(width, height, WEBGL);

        this.healthMeter = new Meter(this.hudWindow.width, "red", "Health");
        this.shieldMeter = new Meter(this.hudWindow.width, "purple", "Shield");
        this.ammoMeter = new Meter(this.hudWindow.width, "brown", "Ammo");
        this.ammoMeter.max = 30;     
        


    }



    resetWorld() {
        this.width = 0;
        this.height = 0;
        this.walls = [];
        this.bullets = [];
        this.tanks = [];
        this.powerups = [];
        this.followTank = null;

    }

    processInput(player, input) {

    }

    update() {
    }

    getTankById(id) {
        for (let tank of this.tanks) {
            if (id == tank.id) return tank;
        }
        return null;
    }

    render(g) {
        this.testWindow.clear();
        this.radarWindow.clear();
        this.mapWindow.clear();
        this.debugWindow.clear();
        this.scoreWindow.clear();
        this.hudWindow.clear();
        this.firstWindow.clear();

        let debugText = '';
        {
            if (null != this.followTank) {

                debugText += `\n\nid: ${this.followTank.id}`;
                let px = this.followTank.x;
                let py = this.followTank.y;

                let vx = px - g.width / 2;
                let vy = py - g.height / 2;

                debugText += `\n\npx: ${px}\npy: ${py}`;
                debugText += `\n\nvx: ${vx}\nvy: ${vy}`;
                debugText += `\n\nvw: ${g.width}\nvh: ${g.height}`;
                debugText += `\n\na : ${this.followTank.angle}`;

                debugText += `\n\nshield: ${this.followTank.shieldPower}`;
                debugText += `\nammo: ${this.followTank.ammo}`;
                debugText += `\nhealth: ${this.followTank.health}`;

            }


            if (this.showFirst) { // Draw First Person
                g.push();
                this.firstPerson.render(this.firstWindow, this);
                g.image(this.firstWindow, 0, 0);
                g.pop();
            }

            if (this.showDebug) { // Draw Debug
                g.push();
                this.renderDebug(this.debugWindow, debugText);
                g.image(this.debugWindow, 0, g.height-this.debugWindow.height);
                g.pop();
            }

            if (this.showScoreboard) { // Draw Scoreboard
                g.push();
                this.scoreboard.render(this.scoreWindow, this.serverUpdate);
                g.image(this.scoreWindow, width/2 - this.scoreWindow.width/4, 0);
                g.pop();
            }

            if (this.showHud) { // Draw HUD
                g.push();

                this.hudWindow.push();
                this.healthMeter.draw(this.hudWindow);
                this.hudWindow.translate(0,100);                
                this.shieldMeter.draw(this.hudWindow);
                this.hudWindow.translate(0,100);                
                this.ammoMeter.draw(this.hudWindow);
                this.hudWindow.pop();

                g.image(this.hudWindow,10,10);

                g.pop();    
            }

            if (this.showRadar) { // Draw Radar
                g.push();
                g.translate(g.width - this.radarWindow.width, 0);
                //g.scale(0.25);
                this.radar.render(this.radarWindow, this);
                g.image(this.radarWindow, 0, 0);
                g.noFill();
                g.stroke(200);
                g.rect(0,0, this.radarWindow.width, this.radarWindow.height);
                g.pop();
            }



            if (this.showTest) { // Draw Test 
                g.push();
                this.renderBox(this.testWindow);
                g.image(this.testWindow, 0, 0);
                g.pop();
            }


        }

        
    }

    renderBox(g) {
        g.push();
        //g.ambientLight(128, 128, 128);
        //g.directionalLight(128, 128, 128, 0, 0, -1);
        
        //g.noLights();
        g.ambientLight(128, 128, 128);
        g.directionalLight(255, 0, 0, 0, 0, -1);  
        g.directionalLight(0, 0, 255, 0, 1, -1);  

        g.rotateX(millis() / 1000);
        g.rotateY(millis() / 1000);
        g.rotateZ(millis() / 1000);

        g.fill(255, 255, 255);
        g.box(50);
        g.pop();
    }

    renderFirstPerson(g) {


    }


    renderDebug(g, debugText) {
        g.push();

        let textMargin = 12;
        let textSize = 12;

        // draw a background
        g.stroke(0);
        g.fill(100, 100, 50, 150);
        g.rect(0, 0, g.width, g.height);

        // write stuff
        g.textSize(textSize);
        g.fill(0);
        g.noStroke();
        g.textFont('Courier');
        g.text(`DEBUG${debugText}`, textMargin, textMargin);

        g.pop();
    }



    fromJson(json) {

        this.serverUpdateCount++;

        this.resetWorld();

        let jsonObject = JSON.parse(json);

        this.serverUpdate = jsonObject;
        this.width = jsonObject.width;
        this.height = jsonObject.width;

        for (let serverObject of jsonObject.walls) {
            let wall = new Wall(serverObject.x, serverObject.y, serverObject.width, serverObject.height, serverObject.boundary);
            wall.color = serverObject.color;
            wall.assets = this.assets;
            this.walls.push(wall);
        }

        for (let serverObject of jsonObject.tanks) {
            let tank = new Tank(serverObject.x, serverObject.y);
            tank.fromJson(serverObject);
            tank.model = this.assets.tankModel;
            tank.texture = this.assets.tankTexture;

            this.tanks.push(tank);
        }

        if (null != jsonObject.bullets && jsonObject.bullets.length > 0) {
            for (let i in jsonObject.bullets) {
                let serverObject = jsonObject.bullets[i];
                if (serverObject == null) continue;

                let bullet = new Bullet(serverObject.x, serverObject.y)
                bullet.angle = serverObject.angle;
                bullet.id = serverObject.id;
                bullet.dx = serverObject.dx;
                bullet.dy = serverObject.dy;
                bullet.diameter = serverObject.diameter;
                this.bullets.push(bullet);

            }
        }

        for (let serverObject of jsonObject.powerups) {
            if (null == serverObject) continue;
            let clientObject = new AmmoPack(serverObject.x, serverObject.y, this.assets.ammoImg);
            clientObject.fromJson(serverObject);
            this.powerups.push(clientObject);
        }

        this.followTank = this.getTankById(this.playerId);

        if (null != this.followTank && null != this.healthMeter ) {
            this.healthMeter.level = this.followTank.health;
            this.ammoMeter.level = this.followTank.ammo;
            this.shieldMeter.level = this.followTank.shieldPower;                        
        }


    }


        setKey(keyCode, value) {
        //console.log(`set ${keyCode} ${value}`);
        switch (keyCode) {
            case 49: // 1
                if (value) this.showDebug = !this.showDebug;
                break;
            case 50: // 2
                if (value) this.showRadar = !this.showRader;
                break;
            case 51: // 3
                if (value) this.showHud = !this.showHud;
                break;                
            case 52: // 4
                if (value) this.showScoreboard = !this.showScoreboard;
                break;                
            case 53: // 5
                if (value) this.showMain = !this.showMain;
                break;                
            case 54: // 6
                if (value) this.showTest = !this.showTest;
                break;                                                    
            }

    }
}

