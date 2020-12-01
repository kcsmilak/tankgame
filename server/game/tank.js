const Body = require('./body');
const Bullet = require('./bullet');

class Tank extends Body {
  constructor(x, y) {
    super(x,y);
    
    this.diameter = 50;
    
    this.width = this.diameter;
    this.height = this.diameter;

    this.shield = false;

    this.health = 100;
    this.ammo = 10;
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
  
  fire() {

        if (this.ammo <= 0) return null;
        this.ammo--;
      let tank = this;
        let x = tank.x;
        let y = tank.y;
        let w = tank.width;
        let h = tank.height;
        let angle = tank.angle;
        //console.log(`fire! ${x},${y}@${angle}`);


        let speed = 10;

        let cos = Math.cos(Math.PI * angle / 180);
        let sin = Math.sin(Math.PI * angle / 180);

        x = tank.x + tank.width * cos;
        y = tank.y + tank.height * sin;

        let dx = speed * cos;
        let dy = speed * sin;

        //console.log(`fire ${tank.id} ${x},${y} - ${dx},${dy}`);


        let bullet = new Bullet(x, y, dx, dy);
        bullet.angle = angle;
        bullet.creatorId = tank.id;
        //bullets[bullet.id] = bullet;
        return bullet;      
  }

}

if (typeof(module) !== 'undefined') { module.exports = Tank; }
