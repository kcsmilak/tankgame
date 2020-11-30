class Body {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.dx = 0;
    this.dy = 0;
    
    this.angle = 0;
    
    this.id = Math.random(0,10000);

    this.updateCount = 0;
    this.createTime = new Date();

    this.creatorId = null;
  }

  update() { 
    this.x += this.dx;
    this.y += this.dy;
    this.updateCount++;
  }

  x0() {
    return this.x - this.width / 2;
  }

  y0() {
    return this.y - this.height / 2;
  }

  x1() {
    return this.x0() + this.width;
  }

  y1() {
    return this.y0() + this.height;
  }

  overlaps(body) {
    let hit = this.overlapsX(body) && this.overlapsY(body);
    return hit;
  }

  overlapsX(body) {
    let rect1 = this;
    let rect2 = body;
    if (rect1.x0() < rect2.x0() + rect2.width &&
      rect1.x0() + rect1.width > rect2.x0()) {
      return true
    }
    return false;
  }

  overlapsY(body) {
    let rect1 = this;
    let rect2 = body;
    if (rect1.y0() < rect2.y0() + rect2.height &&
      rect1.y0() + rect1.height > rect2.y0()) {
      return true
    }
    return false;
  }

  bounce(body) {

    let ball = this;
    let dx = ball.dx;
    let dy = ball.dy;

    // move the ball back
    ball.x -= dx;
    ball.y -= dy;

    // test which side the collision was
    ball.x += dx;
    if (ball.overlaps(body)) {
      ball.x -= dx;
      ball.dx *= -1;
    }

    ball.y += dy;
    if (ball.overlaps(body)) {
      ball.y -= dy;
      ball.dy *= -1;
    }

  }
  
  stick(body) {
    let ball = this;
    let dx = ball.dx;
    let dy = ball.dy;

    // move the ball back
    ball.x -= dx;
    ball.y -= dy;

    // test which side the collision was
    ball.x += dx;
    if (ball.overlaps(body)) {
      ball.x -= dx;
      ball.dx *= 0;
    }

    ball.y += dy;
    if (ball.overlaps(body)) {
      ball.y -= dy;
      ball.dy *= 0;
    }    
    
    // stick it!
    ball.dx = 0;
    ball.dy = 0;
  }
  
  turn(rotateSpeed) {
    this.angle = (this.angle + rotateSpeed) % 360;
  }
  
  accelerate(speed) {
    let cos = Math.trunc(speed*Math.cos(Math.PI * this.angle/180));
    let sin = Math.trunc(speed*Math.sin(Math.PI * this.angle/180));
    
    this.dx += cos;
    this.dy += sin;    
  }
  
  move(speed) {
    let cos = Math.trunc(speed*Math.cos(Math.PI * this.angle/180));
    let sin = Math.trunc(speed*Math.sin(Math.PI * this.angle/180));
    
    this.dx = cos;
    this.dy = sin;    
  }  

  strafe(speed) {
      let angle = (this.angle/180 + 90) % 360 ;
    let cos = Math.trunc(speed*Math.cos(Math.PI * angle));
    let sin = Math.trunc(speed*Math.sin(Math.PI * angle));
    

    console.log(`strafe ${speed} ${angle} ${cos} ${sin}`);

    this.dx = cos;
    this.dy = sin;    
  }

}

if (typeof(module) !== 'undefined') { module.exports = Body; }
