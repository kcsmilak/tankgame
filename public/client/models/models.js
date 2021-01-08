

class ScopeModel {
    render(g) {
        g.push();
        g.fill(0);
        g.line(0, -100, 0, 100);
        g.line(100, 0, -100, 0);

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

        debugString += `\ncam t=${camera.theta} dof=${camera.dof} fov=${camera.fov}\n`;


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

                //debugString += `x=${posx} y=${posy} dx=${dx.toFixed(0)} dy${dy.toFixed(0)} t=${theta.toFixed(0)} g=${gamma.toFixed(0)} b=${beta.toFixed(0)} skip=${skip}\n`;

                if (skip) continue;

                if (camera.wallsOnly && cell != 1) continue;


                _objectsRendered++;

                //if (_objectsRendered > 300 ) continue;

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
                g.translate(x * scaleX + scaleX / 2, 0, y * scaleY + scaleY / 2);



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

        g.push();
        g.translate(-camera.x, 0, -camera.y);
        g.fill(200);
        g.sphere(10);
        g.pop();


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
        g.translate(size * .8, 0, 0);
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
        g.translate(x, -size * 2, y);
        g.box(size);
        g.pop();
    }
}



class FpsMeterModel {
  constructor() {
    this.history = new CounterHistory();
    this.meter = new MeterModel(this.history,"fps");
  }
  
  update() {
    this.history.addValue(frameRate());
  }
  
  render(g, x=0,y=0) {
    this.meter.render(g, x,y);
  }
}

class ServerUpdateMeterModel {
  constructor() {
      this.metric = new MetricPerSecond();    
    this.history = new CounterHistory();
    this.meter = new MeterModel(this.history,"server");
  }
  
  update() {
    this.metric.addValue();
  }
  
  render(g, x=0,y=0) {
    this.history.addValue(this.metric.current());
    this.meter.render(g, x,y);
  }
}

class MeterModel {
    constructor(counter, title = "", width = 200, height = 100) {
        this.title = title;
        this.counter = counter;
        this.backgroundColor = [100, 100, 100, 100];
        this.foregroundColor = [255, 0, 0, 100];

        this.textColor = [200];

        this.width = width;
        this.height = height;

        this.stroke = true;

        this.g = createGraphics(this.width, this.height);

    }

    render(canvas = this.canvas, x = 0, y = 0) {

        canvas.push();
        canvas.translate(x, y);
        let g = this.g;
        g.clear();
        //let g = canvas.createGraphics(this.width, this.height);

        let width = g.width;
        let height = g.height;

        g.push();
        g.background(this.backgroundColor);

        g.fill(this.foregroundColor);
        if (!this.stroke) g.noStroke();
        let xstep = width / this.counter.size;
        let ystep = height / this.counter.maxValue;
        for (let i = 0; i < this.counter.size; i++) {
            let value = this.counter.valueAt(i);
            g.rect(width - i * xstep, height - value * ystep, xstep, value * ystep);

        }

        g.fill(this.textColor);
        let textSize = height / 2;
        let textMargin = height / 20;
        g.textSize(textSize);
        g.textAlign(LEFT, TOP);
        g.text(this.title, textMargin, textMargin);
        g.text(`${this.counter.average().toFixed(0)}`, textMargin, textSize + textMargin);
        g.pop();
        canvas.image(g, 0, 0);
        canvas.pop();
    }
}

class CounterHistory {
    constructor() {
        this.size = 100;
        this.values = [];
        this.maxValue = 100;
        this.current = 0;
    }

    addValue(value) {
        this.current = value;

        this.values.push(value);
        if (this.values.length > this.size) {
            this.values.shift();
        }
    }

    average() {
        let total = 0;
        for (let i = 0; i < this.values.length; i++) {
            total += this.values[i];
        }
        return total / this.values.length;
    }

    valueAt(offset) {
        return this.values[this.values.length - offset];
    }
}

class MetricPerSecond {
    constructor() {
        this.values = [];
        this.maxSize = 100;
    }

    addValue() {
        this.values.push(Date.now());
        if (this.values.length > this.maxSize) this.values.shift();
    }

    current() {
        let count = 0;
        let currentTime = Date.now();
        let timeWindow = 1000;
        for (let i = 0; i <= this.values.length; i++) {
            let timestamp = this.values[i];
            if (currentTime - timestamp < timeWindow) {
                count++;
            }
        }
        return count;
    }


}