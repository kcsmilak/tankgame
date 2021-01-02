
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
    debugString += `\nf:  ${frameCount}`;
    debugString += `\nf:  ${display.fps}`;
    debugString += `\nr:  ${display.objectsRendered}`;
    debugString += `\n`;



    g.clear();
    g.push();
    //g.background(128, 128, 128, 100);
    //g.background(0);
    g.fill(0);
    g.noStroke();
    g.textSize(g.height / 20);
    g.textAlign(LEFT, TOP);
    g.textFont('courier');
    g.text(debugString, 0, 0);
    g.fill(0, 0, 0, 0);
    g.stroke(128);
    g.rect(0, 0, g.width, g.height);
    g.pop();

    debugString = '';
    return g;
  }
}

class MainView {

  constructor(g,mapModel) {
    this.g = g;
    this.coordinatesModel = new CoordinatesModel();
    this.mapModel = mapModel;
    this.camera = new Camera();
    this.resetCamera();
    this.cameraOffset = 100;
  }

  resetCamera() {
    this.camera.dof = 3000;
    this.camera.fov = 50;
    this.camera.z = 100;
    this.camera.x = 0;
    this.camera.y = 0;
    this.camera.theta = 0;
    this.camera.alpha = 0;
    this.camera.wallsOnly = 0;    
  }

  render(playerModel, players) {
    
    let g = this.g;

    g.push();
    g.clear();
    g.background(220);

    this.camera.x = (playerModel.x + this.cameraOffset * Math.sin(playerModel.theta * Math.PI / 180));
    this.camera.y = (playerModel.y + this.cameraOffset * Math.cos(playerModel.theta * Math.PI / 180));
    this.camera.theta = playerModel.theta;
    this.camera.alpha = playerModel.alpha;

    this.camera.set(g);
    
    this.mapModel.render(g, this.camera);
    this.coordinatesModel.render(g);

    for (let player of players) {
        
        if (playerModel !== player)
        player.render(g);
    }

    g.push();
    if (0) {
      g.translate(player.x, 0, player.y);
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
    this.camera.dof = g.width*20.5;
    this.camera.removePerspective = 0;
    this.camera.useClipping = 1;
    
  }
  
  render(playerModel, players) {

    let g = this.g;

    g.push();
    g.clear();
    g.fill(255,255,255,200);
    g.circle(0,0,g.width*0.98);
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
           
    let scale = 32;
    g.ortho(-g.width*scale, g.width*scale, -g.height*scale, g.height*scale, -2000, 2000);

    
    this.mapModel.render(g, this.camera);
    //this.coordinatesModel.render(g);
    //playerModel.render(g);
    for (let player of players) {
        player.render(g);
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
    this.camera.fov = 180;
    this.camera.dov = 1000;
    this.camera.wallsOnly = 0;
    this.camera.removePerspective = 0;
    this.camera.useClipping = 1;
    this.camera.z = 1500;
  }
  
  render(playerModel, players) {
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
    
    this.camera.set(g);
    
    let scale = 2;
    g.ortho(-g.width*scale, g.width*scale, -g.height*scale, g.height*scale, -2000, 2000);
    
        
    this.mapModel.render(g, this.camera);
    this.coordinatesModel.render(g);
    //playerModel.render(g);

    for (let player of players) {
        player.render(g);
    }

    g.pop();
    return g;

  }  
}