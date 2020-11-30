
class TankGame {

    constructor(width, height) {
        this.viewWidth = width;
        this.viewHeight = height;



        this.serverUpdate = null;
        this.serverUpdateCount = 0;

        this.img = loadImage('game/14176.jpg');


        this.create();
    }

    create() {
        this.walls = [];
        this.bullets = [];
        this.tanks = [];
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

    render() {

        let debugText = '';
        {
            push();


            {
                push();
 

                let viewWidth = this.viewWidth;
                let viewHeight = this.viewHeight;

                if (null != this.followTank) {

                    debugText += `\n\nid: ${this.followTank.id}`;
                    let px = this.followTank.x;
                    let py = this.followTank.y;

                    let vx = px - viewWidth / 2;
                    let vy = py - viewHeight / 2;

                    debugText += `\n\npx: ${px}\npy: ${py}`;
                    debugText += `\n\nvx: ${vx}\nvy: ${vy}`;
                    debugText += `\n\nvw: ${viewWidth}\nvh: ${viewHeight}`;

                    debugText += `\n\nshield: ${this.followTank.shieldPower}`;

                    translate(-vx, -vy);
                }

                { // Draw world
                    background(0);
                    if (null != this.serverUpdate) {
                        image(this.img, 0, 0, this.serverUpdate.width, this.serverUpdate.height);
                    }
                    for (let wall of this.walls) {
                        wall.draw();
                    }
                }

                { // Draw bullets
                    for (let bullet of this.bullets) {
                        bullet.draw();
                    }
                }

                { // Draw tanks
                    for (let tank of this.tanks) {
                        tank.draw();
                    }
                }
            }
            pop();

            { // Draw Debug
                this.renderDebug(debugText);
            }

            { // Draw Scoreboard
                this.renderScoreboard();
            }
            pop();
        }
    }

    renderDebug(debugText) {
        push();

        // move to debug output location
        let ox = 5;
        let oy = 5;
        let margin = 12;
        let size = 12;
        translate(ox, oy);

        // draw a background
        stroke(0);
        fill(100, 100, 50, 150);
        rect(0, 0, 200, 400);

        // write stuff
        textSize(size);
        fill(0);
        noStroke();
        textFont('Courier');
        text(`DEBUG${debugText}`, ox + margin, oy + margin);

        pop();
    }

    renderScoreboard() {
        push();

        // move to debug output location
        let ox = this.viewWidth - 220 - 5;
        let oy = 5;
        let margin = 12;
        let size = 20;
        translate(ox, oy);

        // draw a background
        stroke(0);
        fill(100, 100, 100, 150);
        rect(0, 0, 220, 200);

        // write stuff
        textSize(size);
        fill(0);
        noStroke();
        textFont('Courier');

        if (null != this.serverUpdate) {

            let scoreboard = "-[ S C O R E S ]- \n\n";
            for (let player of this.serverUpdate.players) {
                scoreboard += `${player.id}\t${player.score}\n`;
            }
            text(scoreboard, 0+margin,0+size+margin);//ox+margin, oy+margin);
        }

        pop();
    }

    fromJson(json) {

        this.serverUpdateCount++;
        this.create();

        let jsonObject = JSON.parse(json);

        this.serverUpdate = jsonObject;
        //this.width = jsonObject.width;
        //this.height = jsonObject.width;

        for (let serverObject of jsonObject.walls) {
            let wall = new Wall(serverObject.x, serverObject.y, serverObject.width, serverObject.height);
            wall.color = serverObject.color;
            this.walls.push(wall);
        }

        for (let serverObject of jsonObject.tanks) {
            let tank = new Tank(serverObject.x, serverObject.y);
            tank.fromJson(serverObject);
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

        this.followTank = this.getTankById(this.playerId);


    }
}

