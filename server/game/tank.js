const Body = require('./body');

class Tank extends Body {
  constructor(x, y) {
    super(x,y);
    
    this.diameter = 50;
    
    this.width = this.diameter;
    this.height = this.diameter;

    this.shield = false;

    this.health = 100;
    this.shieldPower = 100;
    this.shieldCoolDown = 0;

    this.shieldDepleteSpeed = 1;
    this.shieldRegenSpeed = 0.5;

  }
  
  update() {
    // apply gravity
    // this.dy += 0.5;

    // if shield running
    if (this.shield) {

        // reduce power
        this.shieldPower = Math.max(0,this.shieldPower - this.shieldDepleteSpeed);
        
        // if out of power, disable shield and start cooldown
        if (this.shieldPower <= 0) {
            this.shield = false;
        }
    } else {
        this.shieldPower = Math.min(100,this.shieldRegenSpeed + this.shieldPower);
    }
    
    super.update();
  }
  

}

if (typeof(module) !== 'undefined') { module.exports = Tank; }
