

class ScopeModel {
  render(g) {
    g.push();
    g.fill(0);
    g.line(0,-100,0,100);
    g.line(100,0,-100,0);

    g.pop();
  }
}

class MapModel {
  
  constructor(gameMap) {
    this.gameMap = gameMap;
  }
   
  render(g, camera = null) {

    let gameMap = this.gameMap;
    
    g.push();


    if (null == camera) {
      camera = new Camera();
      console.log("Made new camera");
    }    



    for (let rowIndex = 0; rowIndex < gameMap.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < gameMap[rowIndex].length; 
            columnIndex++) {
        let cell = gameMap[rowIndex][columnIndex];

        let scaleX = 100;
        let scaleY = 100;

        let y = rowIndex;
        let x = columnIndex;

        let darkness = false;
        let skip = false;

        
        let posx = x * scaleX;
        let posy = y * scaleY;

        let dx = posx - (camera.x);
        let dy = posy - (camera.y);

        let distance = Math.abs(Math.sqrt(Math.pow(Math.abs(dx), 2) + 
        Math.pow(Math.abs(dy), 2)));
        if (distance > camera.dof) skip = true;

        let theta = (camera.theta + 90) % 360;
        let gamma = Math.atan2(-dy, dx) * 180 / Math.PI;
        let beta = (theta - (gamma));
        if (beta > 180) beta -= 360;
        if (beta > camera.fov || beta < -camera.fov) skip = true;
        
        if (skip) continue;

        if (camera.wallsOnly && cell != 1) continue;


        this.objectsRendered++;

        g.push();


        g.stroke(50, 50, 50, 200);

        g.fill(255);

        if (!darkness && null != textures[cell]) {
          g.texture(textures[cell]);
          //g.noStroke();
          g.stroke(0);
        } else {
          //g.noStroke();
          g.stroke(0);
        }


        if (darkness) {
          g.fill(128);
        }

        //g.translate(0,scaleX/2,0);
        g.translate(x * scaleX + scaleX/2, 0, y * scaleY + scaleY/2);



        switch (cell) {
          case '0':
          case 0: // dirt
            g.box(scaleX);
            break;
          case '1':
          case 1: // wall

            g.translate(0, -scaleX, 0);
            g.box(scaleX);
            break;
          case '2':
          case 2:
          case 'w': // water
            g.translate(0, scaleX * 0.1, 0);

            g.box(scaleX);
            break;
          case '3':
          case 3:
          case '3': // grass
            g.translate(0, -scaleX * 0.1, 0);

            g.box(scaleX);
            break;
          case '4': // lava
          case 4:
          case 'l':
            g.box(scaleX);
            break;
          case '5': // base
          case 5:
            g.box(scaleX);
            break;
          default:
            g.box(scaleX);
            break;
        }
        g.pop();


      }
    }


    g.pop();

  }  
}


class PlayerModel {
  constructor(player) {
      this.id = player.id;
    this.x = player.x;
    this.y = player.y;
    this.theta = player.theta;
    this.alpha = player.alpha;
  }
  
  render(g) {
      let size = 50;
    g.push();
    g.translate(this.x, -75, this.y);
    g.rotateY((this.theta + 90) * Math.PI / 180);
    g.fill(color(128));
    g.box(size);
    //g.line(0, 0, 100, 100);
    g.translate(size*.8, 0, 0);
    g.box(20);
    g.pop();    
  }
}



class CoordinatesModel {
  render(g) {
    //g.debugMode();
    g.push();

    //            X     Y
    this.renderBox(g, 100, 100, color(255, 0, 0)); // red 
    this.renderBox(g, -100, 100, color(0, 255, 0)); // green
    this.renderBox(g, 100, -100, color(0, 0, 255)); // blue
    this.renderBox(g, -100, -100, color(255, 255, 0)); // yellow

    //g.strokeWidth(5);
    g.stroke(255, 0, 0);
    g.line(0, 0, 0, windowWidth, 0, 0);
    g.stroke(255, 255, 0);
    g.line(0, 0, 0, 0, windowHeight, 0);
    g.stroke(0, 0, 255);
    g.line(0, 0, 0, 0, 0, 1000);
    g.pop();
  }

  renderBox(g, x, y, color) {
    let size = 50;
    g.push();
    g.fill(color);
    g.stroke(0);
    //g.rect(x - size/2, y - size/2, size, size);
    g.translate(x, -size*2, y);
    g.box(size);
    g.pop();
  }
}