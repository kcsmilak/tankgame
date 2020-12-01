const Powerup = require('./powerup');

class AmmoPack extends Powerup {
  constructor(x, y) {
    super(x,y);
  }
  
  update() {
    super.update();
  }

  apply(tank) {
      tank.ammo += 10;
      super.apply(tank);
  }
}

if (typeof(module) !== 'undefined') { module.exports = AmmoPack; }
