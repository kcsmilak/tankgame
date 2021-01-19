
class GameData {
    constructor(gameMap) {
        this.bullets = [];
        this.players = [];
        this.powerups = [];
        this.gameMap = gameMap;
    }
}


class GameClient {
    constructor(canvas) {

        this.bullets = [];
        this.players = [];
        this.powerups = [];

        this.fpsMeter = new FpsMeterModel();
        this.serverUpdateMeter = new ServerUpdateMeterModel();
        this.objectMeter = new GenericMeterModel("objects");
        this.objectMeter.setMaxValue(1000);

        this.fpsCounter = new Counter();

        this.resolution = 1;

        this.fps = 0;
        this.fpss = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
        this.fpssi = 0;
        this.objectsRendered = 0;

    }

    setup(canvas) {
        let map = new Map();
        map.loadGameMap();
        let gameMap = map.gameMap;

        //this.display = new Display(canvas);
        let mapModel = new MapModel(gameMap);

        this.playerModel = null;



        this.canvas = canvas;
        let g = canvas;

        g.frameRate(60);

        this.gDebug = g.createGraphics(
            windowWidth * 1 * this.resolution,
            windowHeight * 1 * this.resolution);
        this.gMain = g.createGraphics(
            windowWidth * this.resolution,
            windowHeight * this.resolution, WEBGL);
        this.gRadar = g.createGraphics(
            windowWidth * 0.25 * this.resolution,
            windowHeight * 0.25 * this.resolution, WEBGL);
        this.gMap = g.createGraphics(
            windowWidth * 0.75 * this.resolution,
            windowHeight * 0.75 * this.resolution, WEBGL);


        this.debugView = new DebugView(this.gDebug);
        this.radarView = new RadarView(this.gRadar, mapModel);
        this.mapView = new MapView(this.gMap, mapModel);
        this.mainView = new MainView(this.gMain, mapModel);

        this.hudWindow = createGraphics(300, 300);

        this.healthMeter = new Meter(this.hudWindow.width, "red", "Health");
        this.shieldMeter = new Meter(this.hudWindow.width, "purple", "Shield");
        this.ammoMeter = new Meter(this.hudWindow.width, "brown", "Ammo");
        this.ammoMeter.max = 30;


        this.showHud = true;
        this.showRadar = true;
        this.showMap = false;
        this.showCounters = true;
        this.showFirstPerson = true;

    }

    setPlayerId(playerId) {
        this.playerId = playerId;
    }

    localUpdate(data) {
        // update player model
        let player = data;
        //this.playerModel = new PlayerModel(player);
    }

    serverUpdate(data) {

        if (frameCount % 100 == 0) console.log(data);

        if (null !== data.tanks) {
            this.players = [];
            for (let json of data.tanks) {
                // adapt server object to client expectation
                json.theta = (json.angle + 360) % 360;
                json.alpha = 0;
                let playerModel = new PlayerModel(json);
                this.players.push(playerModel);

                if (null == this.playerModel) {
                    this.playerModel = new PlayerModel(json);
                }

                if (json.id == this.playerId) {
                    //this.playerModel = playerModel;
                    this.playerModel.x = json.x;
                    this.playerModel.y = json.y;
                    this.playerModel.theta = json.theta;
                    this.playerModel.alpha = json.alpha;
                    this.playerModel.crouch = json.crouch;
                    if (json.alpha != 0) console.log(json);
                }


            }
        }

        if (null != data.bullets) {
            this.bullets = [];
            for (let json of data.bullets) {
                if (null == json) continue;
                this.bullets.push(
                    new Bullet(json.x, json.y));
            }
        }

        if (null != data.powerups) {
            this.powerups = [];
            for (let json of data.powerups) {
                if (null == json) continue;
                this.powerups.push(
                    new AmmoPack(json.x, json.y));
            }
        }

        if (1 && null != data.players) {

            // get the player we care about
            let player = null;
            for (let cur_player of data.players) {
                //console.log(`cur=${cur_player.id} id=${this.playerId}`);
                if (cur_player.id == this.playerId) {
                    player = cur_player;
                    break;
                }
            }
            if (player != null) {
                //console.log(`updating player: ${player.health} ${player}`);
                this.healthMeter.level = player.tank.health;
                this.ammoMeter.level = player.tank.ammo;
                this.shieldMeter.level = player.tank.shieldPower;
            }
        }

        _serverHeartbeats++;
        this.serverUpdateMeter.update();
    }

    render() {

        debugString += `id:  ${this.playerId}`;
        //debugString += `\nl:${this.game.map.gameMap.length}`;
        //debugString += ` w:${this.game.map.gameMap[0].length}\n`;

        let playerModel = this.playerModel;
        _objectsRendered = 0;

        this.objectMeter.update(_objectsRendered);

        let g = this.canvas;


        this.fpsMeter.update();
        this.objectsRendered = 0;

        //this.updateFps();
        if (frameCount % 5 == 0) {
            this.fpsCounter.update(Math.trunc(getFrameRate()));
            this.fps = this.fpsCounter.average();
        }

        if (null != playerModel) {

            debugString += `\nid:  ${playerModel.id}`;
            debugString += `\nx:   ${playerModel.x}`;
            debugString += `\ny:   ${playerModel.y}`;
            debugString += `\nt:   ${playerModel.theta}`;
            debugString += `\na:   ${playerModel.alpha}`;
            debugString += `\nfps: ${frameRate()}`;


            if (this.showFirstPerson) {
                this.mainView.render(playerModel, this.players, this.bullets, this.powerups);
                g.push();
                g.scale(1 / this.resolution);
                g.image(this.gMain, 0, 0);
                g.pop();
            }

            if (this.showRadar) {
                this.radarView.render(playerModel, this.players, this.bullets, this.powerups);
                g.push();
                g.scale(1 / this.resolution);
                g.image(this.gRadar, g.width * this.resolution - this.gRadar.width, 0);
                g.pop();

            }
            if (this.showMap) {
                this.mapView.render(playerModel, this.players, this.bullets, this.powerups);
                g.push();
                g.scale(1 / this.resolution);
                g.image(
                    this.gMap, 
                    g.width/2 - this.gMap.width/2,//g.width * this.resolution - this.gMap.width,
                    g.height/2 - this.gMap.height/2);//g.height * this.resolution - this.gMap.height);
                g.pop();
            }



            if (this.showHud) { // Draw HUD

                this.hudWindow.clear();
                this.hudWindow.push();
                this.healthMeter.draw(this.hudWindow);
                this.hudWindow.translate(0, 100);
                this.shieldMeter.draw(this.hudWindow);
                this.hudWindow.translate(0, 100);
                this.ammoMeter.draw(this.hudWindow);
                this.hudWindow.pop();

                push();
                image(this.hudWindow, 10, 10);
                pop();
            }

            this.objectMeter.update(_objectsRendered);

            if (this.showCounters) {
                g.push();
                g.translate(0,g.height-100);
                g.scale(0.5,0.5);
                this.fpsMeter.render(g, 0, 0);
                this.serverUpdateMeter.render(g, 200, 0);
                this.objectMeter.render(g, 400, 0);
                g.pop();
            }
            if (1) {
                this.debugView.render(this);
                g.push();
                g.scale(1 / this.resolution);
                g.image(this.gDebug,
                    0,
                    0);//g.height*this.resolution - this.gDebug.height );
                g.pop();
            }
        }






        if (null != playerModel) {

        }

    }


    // TODO: should be "handleInput". also consider moving to input handler
    recordInput(keyCode, value) {
        if (value) {
            switch (keyCode) {
                case 77: //m
                    this.showMap = !this.showMap;
                    break;
                case 72: //h
                    this.showHud = !this.showHud;
                    break;
                case 49: //1
                    this.showRadar = !this.showRadar;
                    break;
                case 50: //2
                    this.showFirstPerson = !this.showFirstPerson;
                    break;                    
                case 67: //c
                    this.showCounters = !this.showCounters;
            }

        }
    }
}
