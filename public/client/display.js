class Controller {
  constructor() {
    var mx = 0,
      my = 0;
    var sensitivityX = 0.15;
    var sensitivityY = 0.15;
    this.useMouse = false;

    this.mx = 0;
    this.my = 0;
  }
}





class Display {
  constructor(g) {

    this.resolution = 0.5;
    
    this.fps = 0;
    this.fpss = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
    this.fpssi = 0;
    this.objectsRendered = 0;

    this.g = g;

    this.g.background(0, 0, frameCount % 100);

    this.gDebug = g.createGraphics(
        windowWidth * 0.5 * this.resolution, 
        windowHeight * 0.5 * this.resolution);
    this.gMain = g.createGraphics(
        windowWidth * this.resolution, 
        windowHeight * 0.5* this.resolution, WEBGL);
    this.gRadar = g.createGraphics(
        windowWidth * 0.25* this.resolution, 
        windowHeight * 0.25* this.resolution, WEBGL);
    this.gMap = g.createGraphics(
        windowWidth * 0.5* this.resolution, 
        windowHeight * 0.5* this.resolution, WEBGL);
  }

  update() {
    this.g.background(0, 0, frameCount % 100);
    this.g.fill(100);
    this.g.rect(0, 0, 100, 100);

    this.render();
  }

  render() {

    let g = this.g;
    g.clear();
    g.background(128);

    this.objectsRendered = 0;

    g.push();
    g.scale(1/this.resolution);    
    g.image(this.gMain, 0, 0);
    g.pop();


    g.push();
    g.scale(1/this.resolution);
    g.image(this.gRadar, g.width* this.resolution - this.gRadar.width, 0);
    g.pop();


    g.push();
    g.scale(1/this.resolution);
    g.image(this.gDebug, 0, g.height*this.resolution - this.gMap.height );
    g.pop();

    g.push();
    g.scale(1/this.resolution);
    g.image(
        this.gMap, g.width* this.resolution - this.gMap.width, 
        g.height* this.resolution - this.gMap.height);
    g.pop();

    this.updateFps();

  }

  updateFps() {
    if (frameCount % 5 == 0) {
      let cfps = Math.trunc(getFrameRate());


      this.fpss[this.fpssi] = cfps;

      this.fpssi = (this.fpssi + 1) % this.fpss.length;

      let tfps = 0;
      for (let i = 0; i < this.fpss.length; i++) {
        tfps += this.fpss[i];
      }

      this.fps = Math.trunc(tfps / this.fpss.length);


    }
  }

}

