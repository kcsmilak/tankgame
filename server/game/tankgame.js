const Tank = require('./bodies/tank');
const Wall = require('./bodies/wall');
const Player = require('./player');
const Bullet = require('./bodies/bullet');
const AmmoPack = require('./bodies/ammopack');

const PlayerInput = require('./playerinput')

const request = require('request');

class GameMap {
    constructor() {
        this.defaultMapData1 = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 2, 3, 1, 0, 1],
            [1, 0, 1, 4, 5, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.mapData = this.defaultMapData1;        
    }
}

class TankGame {

    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.defaultGameMap1 = [
            [1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 2, 3, 1, 0, 1],
            [1, 0, 1, 4, 5, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.gameMap = this.defaultGameMap1;
        this.create();
    }

    gameLoop(renderCallback) {

        // process input
        for (let player of this.players) {
            this.processInput(player);
        }

        // update world & handle collisions
        this.update();

        // render
        this.render(renderCallback);
    }


    addPlayer(id) {
        let x = this.width / 4 + this.width / 2 * Math.random();
        let y = this.height / 4 + this.height / 2 * Math.random();
        let tank = new Tank(x, y);
        tank.id = id;
        this.tanks.push(tank);
        let player = new Player(id);
        player.tank = tank;
        this.players.push(player);

        this.respawnTank(tank);

        return player;
    }

    removePlayer(id) {
        let index = -1;
        for (let i in this.players) {
            if (id == this.players[i].id) index = i;
        }
        if (index >= 0) {
            console.log(`remove player ${id} at index ${index}`);
            this.removeTank(id);
            this.players.splice(index, 1);
        }
    }
    removeTank(creatorId) {
        console.log(`remove tank ${creatorId}`);
        console.log(this.tanks);
        let index = -1;
        for (let i in this.tanks) {
            if (creatorId == this.tanks[i].id) index = i;
        }
        if (index >= 0) {
            console.log(`remove tank ${creatorId} at index ${index}`);
            this.tanks.splice(index, 1);
        }
    }


    getPlayerById(id) {
        for (let player of this.players) {
            if (id == player.id) return player;
        }
        return null;
    }

    create() {

        this.startTime = new Date();

        this.bullets = [];
        this.tanks = [];
        this.players = [];
        this.powerups = [];

        this.loadMap();

        this.spawnAmmoPack();
        this.spawnAmmoPack();

    }

    loadMap() {


        let gameMap = this.gameMap;





        let url =
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2ID9e-LirFTyR4EYUAhHKdEY0RymDYYhHyDZvFERl_LvjQZQAOuavee0DmGCirAWHfFjNE-x7jgAc/pub?gid=0&single=true&output=csv';

        request(url, { csv: true }, (err, res, body) => {
            if (err) { return console.log(err); }

            for (let row = 0; row < gameMap.length; row++) {
                gameMap[row].splice(0, gameMap[row].length);
            }
            gameMap.splice(0, gameMap.length);

            console.log(body);
            let data = body;

            // when the HTTP request completes, populate the variable that holds the
            // earthquake data used in the visualization.


            let csv = data;
            let rows = csv.split('\n');
            for (let row = 0; row < rows.length; row++) {
                let cols = rows[row].split(',');
                let datatopush = [];
                for (let col = 0; col < cols.length; col++) {
                    datatopush.push(cols[col].toString()[0]);
                }
                //gameMap.push(rows[row]);
                gameMap.push(datatopush);
            }
            //console.log(gameMap);

        });





    }




    recordInput(id, keyCode, value) {
        let player = this.getPlayerById(id);
        if (null == player) {
            console.log(`cannot process input ${keyCode}=${value} of missing player ${id}`)
            return;
        } else {
            //console.log(`doing ${keyCode} to player ${player.id}`)
        }
        player.playerInput.setKey(keyCode, value);
    }


    processInput(player) {
        let playerInput = player.playerInput;
        let tank = player.tank;

        let speedModifier = 1;

        //TODO: move these to after process input?
        if (tank.overlapsMapType(this.gameMap,2)) {
            speedModifier = 0.3;
        } 


        // record propertied of the input into the tank object
        tank.crouch = playerInput.crouch;


        tank.stop();

        if (playerInput.fire && !playerInput.shield) {
            this.fire(tank);
            // require multiple clicks for firing
            playerInput.fire = false;
        }

        let rotateSpeed = 6;
        if (playerInput.crouch) {
            rotateSpeed /= 8;
        }

        if (1) { // handle mouse turn
            let turnAmount = 0;
            if (playerInput.mx > 0) {
                playerInput.mx--;
            }
            if (playerInput.mx < 0) {
                playerInput.mx++;
            }
            if (playerInput.mx !=0 ) {
                turnAmount = -playerInput.mx * 0.15;
            }
            tank.turn(turnAmount);
        }

        let turnSpeed = 10;
        if (playerInput.crouch) {
            turnSpeed /= 4;
        }
        tank.turn((playerInput.turnLeft?1:0) * turnSpeed + (playerInput.turnRight?-1:0) * turnSpeed);


        if (1) {
            let speed = 0;
            if (playerInput.my > 0) {
                playerInput.my--;
            }
            if (playerInput.my < 0) {
                playerInput.my++;
            }
            if (playerInput.mx !=0 ) {
                speed = -playerInput.my * 0.15;
            }
            speed = Math.max(-15, Math.min(30, speed));            
            //tank.pitch(speed);
            tank.alpha += speed;
        }


        let strafeSpeed = 20 * speedModifier;
        if (playerInput.crouch) {
            strafeSpeed /= 4;
        }
        tank.strafe((playerInput.strafeLeft?-1:0) * strafeSpeed + (playerInput.strafeRight?1:0) * strafeSpeed);

        let moveSpeed = 20 * speedModifier;
        if (playerInput.crouch) {
            moveSpeed /= 2;
        }
        tank.move((playerInput.decelerate?-1:0) * moveSpeed + (playerInput.accelerate?1:0) * moveSpeed);

        if (playerInput.shield) {
            tank.shield = true;
        } else {
            tank.shield = false;
        }

        if (playerInput.reset) {
            this.respawnTank(tank);
            playerInput.reset = false;
        }

        if (playerInput.colorCycle) {
            tank.color = {
                r: Math.trunc(255 * Math.random()),
                g: Math.trunc(255 * Math.random()),
                b: Math.trunc(255 * Math.random())
            };
        }


    }

    update() {

        if (null === this.gameMap) {
            console.log("Missing Game Map!!");
            return;
        }

        let bullets = this.bullets;
        let tanks = this.tanks;
        let players = this.players;
        let powerups = this.powerups;


        { // check for dead players
            let nowTime = Date.now();
            for (let player of players) {
                let playerTime = player.heartbeatTime.getTime();
                //let timeGap = 0 ; 

                //let timeGap = nowTime.  .getTime() - playerTime.getTime() ; 
                let timeGap = nowTime - playerTime;
                if (timeGap > 1000 * 10) {
                    console.log(`dropping player ${player.id}`);
                    this.removePlayer(player.id);
                } else {
                    //    console.log(`\n\ngap: ${timeGap}\nnow:${nowTime}\nplayer:${playerTime} \n ${playerTime.toFixed()}`);
                }
            }
        }


        { // update objects

            for (let tank of tanks) {
                tank.update();
            }

            for (let key in bullets) {
                let bullet = bullets[key];

                if (bullet != null) {
                    //console.log(`updating bullet ${bullet}`);
                    bullet.update();
                }
            }

            for (let powerup of powerups) {
                if (powerup != null)
                    powerup.update();
            }
        }

        { // delete old bullets
            for (let key in bullets) {
                let bullet = bullets[key];
                if (bullet != null && bullet.updateCount > 100) {
                    console.log("deleting dead bullet");
                    delete bullets[key];
                }
            }
        }


        // test for wall collisions and react
        if (1) {
            for (let tank of tanks) {
                // stick tanks
                if (tank.overlapsWall(this.gameMap)) {
                    tank.stickWall(this.gameMap);
                }
            }

            for (let key in bullets) {
                let bullet = bullets[key];
                // delete bullets
                let collision = false;
                collision = bullet.overlapsWall(this.gameMap)
                if (collision) {
                    //delete bullets[key];
                    bullet.bounceWall(this.gameMap);
                }

            }
        }

        // test for wall collisions and react
        if (0) {
            for (let wall of walls) {

                for (let tank of tanks) {
                    // bounce tanks
                    if (tank.overlaps(wall)) {
                        tank.bounce(wall);
                    }
                }

                for (let key in bullets) {
                    let bullet = bullets[key];
                    // delete bullets
                    let collision = false;
                    collision = bullet.overlaps(wall)
                    if (collision) {
                        //delete bullets[key];
                        bullet.bounce(wall);
                    }

                }
            }
        }

        // test for powerup collisions and react 
        {
            for (let i in this.powerups) {


                let powerup = powerups[i];
                for (let tank of this.tanks) {

                    if (tank.overlaps(powerup)) {
                        console.log("hit");
                        console.log(powerup);

                        powerup.apply(tank);

                        delete powerups[i];

                        this.spawnAmmoPack();

                    }
                }
            }

        }

        // test for bullet collisions
        if (1) {
            for (let i in this.bullets) {
                let bullet = bullets[i];
                for (let tank of this.tanks) {

                    if (bullet.overlaps(tank)) {

                        let player = this.getPlayerById(bullet.creatorId);

                        if (tank.shield) {
                            bullet.bounce(tank);
                        } else {
                            if (1) { //if (player.id != tank.id) {

                                tank.hit(10);

                                if (tank.isKilled()) {
                                    // respawn shot tank  
                                    this.respawnTank(tank);
                                    tank.heal();

                                    // reward shooter if not the same player
                                    if (player.id != tank.id) {
                                        player.score += 1;
                                    }
                                }
                            }

                            delete bullets[i];
                        }
                    }
                }
            }
        }


    }


    getSpawnPoint() {

        let mapData = this.gameMap;

        let x = 0;
        let y = 0;

        let scale = 100;
        let height = mapData.length ;//* scale;
        let width = mapData[0].length ;//* scale;

        while (true) {
            x = Math.trunc(width * Math.random());
            y = Math.trunc(height * Math.random());

            if (mapData[y][x] != 1) break
        }

        let point = { x: x * scale - scale/2, y: y * scale - scale/2 };
        console.log(`selected spawn point: ${point.x},${point.y}`);
        return point;
    }

    spawnAmmoPack() {
        let pos = this.getSpawnPoint();
        this.powerups.push(new AmmoPack(pos.x, pos.y));
    }


    respawnTank(tank) {

        let margin = 100;
        let x0 = margin;
        let x1 = this.width - margin;
        let y0 = margin;
        let y1 = this.height - margin;

        let respawnPoints = [
            [x0, y0],
            [x0, y1],
            [x1, y0],
            [x1, y1]
        ];

        var respawnPoint = respawnPoints[Math.floor(Math.random() * respawnPoints.length)];

        tank.x = 300;//respawnPoint[0];
        tank.y = 300;//respawnPoint[1];

    }

    render(callback) {
        //let data = this.toJson();

        let data = { 
            tanks: this.tanks, 
            bullets: this.bullets,
            players: this.players,
            powerups: this.powerups 
        }

        let json = JSON.stringify(data);
        callback(json);
    }

    fire(tank) {

        let bullet = tank.fire();
        let bullets = this.bullets;
        if (null != bullet) {
            console.log(`adding bullet ${bullet}`);
            bullets.push(bullet);
        }
    }

    reset() {
        this.create();
    }

    toJson() {
        if (this.bullets.length > 0) {
            //console.log(this);
        }
        return JSON.stringify(this);
    }

}

if (typeof (module) !== 'undefined') { module.exports = TankGame; }