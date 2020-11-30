const Body = require('./body');

class Bullet extends Body {
  constructor(x, y, dx, dy) {
    super(x,y);
    
    this.diameter = 10;
    
    this.dx = dx;
    this.dy = dy;
    
    this.width = this.diameter;
    this.height = this.diameter;  
  }
  
  update() {
    super.update();
  }
}

if (typeof(module) !== 'undefined') { module.exports = Bullet; }
