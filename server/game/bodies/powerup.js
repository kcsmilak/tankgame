const Body = require('./body');

class Powerup extends Body {
  constructor(x, y) {
    super(x,y);

    this.width = 20;
    this.height = 20;
  }
  
  update() {
    super.update();
  }

  apply(tank) {

  }

}

if (typeof(module) !== 'undefined') { module.exports = Powerup; }
