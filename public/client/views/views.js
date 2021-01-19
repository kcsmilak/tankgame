
class DebugView {

    constructor(g) {
        this.g = g;
    }

    render(gameClient) {

        let g = this.g;

        let game = gameClient.game;
        if (null != game) {
            let player = gameClient.game.player;
            if (null != player) {
                debugString += player.toString();
            }
        }

        let display = gameClient.display;
        debugString += `\n`;
        debugString += `\ncnt:${frameCount}`;
        //debugString += `\nfps:${display.fps}`;
        debugString += `\nobj:${_objectsRendered}`;
        debugString += `\nsrv:${_serverHeartbeats}`;
        debugString += `\n`;



        g.clear();
        g.push();
        //g.background(128, 128, 128, 100);
        //g.background(0);
        g.fill(0);
        g.noStroke();
        g.textSize(g.height / 60);
        g.textAlign(LEFT, TOP);
        g.textFont('courier');
        g.text(debugString, 0, 0);
        g.fill(0, 0, 0, 100);
        g.noStroke();
        //g.rect(0, 0, g.width, g.height);
        g.pop();

        debugString = '';
        return g;
    }
}

class MainView {

    constructor(g, mapModel) {
        this.g = g;
        this.coordinatesModel = new CoordinatesModel();
        this.mapModel = mapModel;
        this.camera = new Camera();
        this.resetCamera();
        this.cameraOffset = 100;

        this.defaultZ = 150;
    }

    resetCamera() {
        this.camera.dof = 1500;
        this.camera.fov = 65;
        this.camera.z = this.defaultZ;
        this.camera.x = 0;
        this.camera.y = 0;
        this.camera.theta = 0;
        this.camera.alpha = 0;
        this.camera.wallsOnly = 0;
    }

    render(playerModel, players, bullets, powerups = null) {

        let g = this.g;

        g.push();
        g.clear();
        g.background(220);

        this.camera.x = (playerModel.x + this.cameraOffset * Math.sin(playerModel.theta * Math.PI / 180));
        this.camera.y = (playerModel.y + this.cameraOffset * Math.cos(playerModel.theta * Math.PI / 180));
        this.camera.theta = playerModel.theta;
        this.camera.alpha = playerModel.alpha;
        
        this.camera.z = this.defaultZ - (playerModel.crouch?1:0) * 50;
        this.camera.set(g);

        this.mapModel.render(g, this.camera);
        //this.coordinatesModel.render(g);

        for (let player of players) {
            if (playerModel.id !== player.id) {
                
                //TODO: BUG!!!! For some reson cah't surpress own character.
                
                /layer.render(g);
                //console.log(`${playerModel.id} != ${player.id}`);
            } else {
                //console.log("not drawing match");
            }
        }

        for (let bullet of bullets) {
            bullet.draw3D(g);
        }

        for (let powerup of powerups) {
            powerup.draw3D(g);
        }


        g.push();
        if (1) {
            g.translate(playerModel.x, 0, playerModel.y);
            g.fill(0, 0, 0);
            g.sphere(2200, 2200);
            g.fill(0, 0, 0, 100);
            g.sphere(2000, 2000);
            g.fill(0, 0, 0, 200);
            g.sphere(1800, 1800);
            g.fill(128, 128, 128, 200);
            g.fill(0, 200, 255, 200);
            g.sphere(1500, 1500);
        }
        g.pop();


        //this.camera.z = this.defaultZ - (playerModel.crouch?1:0) * 50;
        //this.camera.set(g);

        g.pop();
        return g;
    }

}

class RadarView {
    constructor(g, mapModel) {
        this.g = g;


        this.coordinatesModel = new CoordinatesModel();
        this.mapModel = mapModel;
        this.camera = new Camera();
        this.camera.z = 800;
        this.camera.fov = 180;
        this.camera.dof = 800;//g.width * 5;
        this.camera.removePerspective = 0;
        this.camera.useClipping = 1;

    }

    render(playerModel, players, bullets, powerups = null) {

        let g = this.g;

        g.push();
        g.clear();
        g.fill(255, 255, 255, 200);
        g.circle(0, 0, g.width * 0.8);
        //g.background(220);
        //g.ortho();

        // move the world view to be in range with the center
        //g.translate(-player.x, -player.y, 0);
        g.rotateX(-90 * Math.PI / 180);


        this.camera.x = playerModel.x;
        this.camera.y = playerModel.y;
        this.camera.theta = playerModel.theta;
        //this.camera.alpha = playerModel.alpha;

        this.camera.set(g);

        let scale = 4;
        g.ortho(-g.width * scale, g.width * scale, -g.height * scale, g.height * scale, -2000, 2000);


        this.mapModel.render(g, this.camera);
        //this.coordinatesModel.render(g);
        //playerModel.render(g);
        for (let player of players) {
            player.render(g);
        }

        for (let bullet of bullets) {
            bullet.draw3D(g);
        }

        if (powerups != null) {
            for (let powerup of powerups) {
                powerup.draw3D(g);
            }
        }

        g.pop();

        return g;

    }
}



class MapView {
    constructor(g, mapModel) {
        this.g = g;
        this.coordinatesModel = new CoordinatesModel();
        this.mapModel = mapModel;
        this.camera = new Camera();
        this.camera.fov = 180;//65;
        this.camera.dof = 2500;
        this.camera.wallsOnly = 0;
        this.camera.removePerspective = 0;
        this.camera.useClipping = 0;
        this.camera.z = 1500;
    }

    render(playerModel, players, bullets, powerups = null) {
        let g = this.g;

        g.push();
        g.clear();
        g.background(0);
        //g.translate(0,0,-this.camera.z);

        //g.ortho();



        // move the world view to be in range with the center
        //g.translate(-playerModel.x, -playerModel.y, 0);
        g.rotateX(-90 * Math.PI / 180);

        this.camera.x = playerModel.x;
        this.camera.y = playerModel.y;
        //this.camera.theta = playerModel.theta;

        this.camera.set(g);

        let scale = 2;
        //g.ortho(-g.width * scale, g.width * scale, -g.height * scale, g.height * scale, 0, 2000);
        g.ortho(-g.width * scale, g.width * scale, -g.height * scale, g.height * scale, 0, 2500);


        this.mapModel.render(g, this.camera);
        //this.coordinatesModel.render(g);
        playerModel.render(g);

        for (let player of players) {
            //player.render(g);
        }

        for (let bullet of bullets) {
            //bullet.draw3D(g);
        }

        if (powerups != null) {
            for (let powerup of powerups) {
                powerup.draw3D(g);
            }
        }

        g.pop();
        return g;

    }
}