
class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.theta = 0;
    this.alpha = 0;
    
    this.dof = 1000;
    this.fov = 45;
    this.wallsOnly = 1;
    this.removePerspective = 1;
    this.useClipping = 1;
  }
  
  set(g) {
    if (this.removePerspective)
      g.translate(0, 0, (g.height / 2.0) / Math.tan(PI * 30.0 / 180.0));// - 100);

    //g.translate(0, 125, 0);

    g.rotateX(-this.alpha * Math.PI / 180);
    g.rotateY(-this.theta * Math.PI / 180);
    

    g.translate(-this.x, this.z, -this.y)    
  }
}