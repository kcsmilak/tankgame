class Body {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.dx = 0;
    this.dy = 0;

    this.sdx = 0;
    this.sdy = 0;
    
    this.angle = 0;
    this.pitch = 0;
    
    this.id = Math.floor(Math.random()*10000);

    this.updateCount = 0;
    this.createTime = new Date();

    this.creatorId = null;

    this.width = 1;
  }

  toString() {
      return JSON.stringify(this);
  }

  update() { 
    this.x += this.dx + this.sdx;
    this.y += this.dy + this.sdy;
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
  
  overlapsWall(gameMap) {
    return this.overlapWallX(gameMap) || this.overlapWallY(gameMap);
  }
  
  overlapWallY(gameMap) {
      return this.overlapWallYPos(this.y0(),gameMap) || 
        this.overlapWallYPos(this.y1(),gameMap);
  }
  
  overlapWallYPos(pos, gameMap) {
    let overlap = false;

    let frameX = this.x0() + this.dx;
    let frameY = pos + this.dy;
    let frameMapX = Math.trunc(frameX / 100);
    let frameMapY = Math.trunc(frameY / 100);
    let oldMapX = Math.trunc(this.x / 100);
    let oldMapY = Math.trunc(this.y / 100);

    // test out of range
    if (frameMapY < 0 || frameMapY >= gameMap.length) {
        console.log("Out of range Y");
        return true;
    }

    if (gameMap[frameMapY][oldMapX] == 1) {
      overlap = true;
    }

    return overlap;      
  }
  
  
  overlapWallX(gameMap) {
      return this.overlapWallXPos(this.x0(),gameMap) || 
        this.overlapWallXPos(this.x1(),gameMap);
  }
  
  overlapWallXPos(pos, gameMap) {
          let overlap = false;

    let frameX = pos + this.dx;
    let frameY = this.y0() + this.dy;
    let frameMapX = Math.trunc(frameX / 100);
    let frameMapY = Math.trunc(frameY / 100);
    let oldMapX = Math.trunc(this.x / 100);
    let oldMapY = Math.trunc(this.y / 100);


    // test out of range
    if (oldMapY < 0 || oldMapY >= gameMap.length) {
        console.log("Out of range Y");
        return true;
    }    
    //console.log(`x=${this.x} y=${this.y} x0=${this.x0()} y0=${this.y0()} oldMapY=${oldMapY} frameMapX=${frameMapX}`);
    if (gameMap[oldMapY][frameMapX] == 1) {
      overlap = true;
      //console.log(`hit p=${pos}`);
    }

    return overlap;      
  }  

  
  bounceWall(gameMap) {
      
    // move the object back
    this.x -= this.dx;
    this.y -= this.dy;
    
    // move just the y side
    this.y += this.dy;
    if (this.overlapWallY(gameMap)) {
      this.y -= this.dy;
      this.dy *= -1;

    }
    
    this.x += this.dx;    
    if (this.overlapWallX(gameMap)) {
      this.x -= this.dx;
      this.dx *= -1;
    }         
  }
  
  stickWall(gameMap) {

    // move the object back
    this.x -= this.dx;
    this.y -= this.dy;
    
    // move just the y side
    this.y += this.dy;
    if (this.overlapWallY(gameMap)) {
      this.y -= this.dy;
      this.dy = 0;
    }
    
    this.x += this.dx;    
    if (this.overlapWallX(gameMap)) {
      this.x -= this.dx;
      this.dx = 0
    }      
  }
  
  
  turn(speed) {
    this.angle = (this.angle + speed) % 360;
  }

  pitch(speed) {
      this.alpha = (this.alpha + speed) % 360;
  }
  
  accelerate(speed) {
    let cos = Math.trunc(speed*Math.cos(Math.PI * this.angle/180));
    let sin = Math.trunc(speed*Math.sin(Math.PI * this.angle/180));
    
    this.dx += cos;
    this.dy += sin;  
    console.log(`accel: ${cos} ${sin}`);

  }
  
  move(speed) {
    let cos = Math.trunc(speed*Math.cos(Math.PI * (this.angle+90)/180));
    let sin = Math.trunc(speed*Math.sin(Math.PI * (this.angle+90)/180));
    
    this.dx += cos;
    this.dy -= sin;    
    //console.log(`move : ${cos} ${sin}`);

  }  

  strafe(speed) {
    let cos = Math.trunc(speed*Math.cos(Math.PI * (this.angle-180)/180));
    let sin = Math.trunc(speed*Math.sin(Math.PI * (this.angle-180)/180));
    
    this.dx -= cos;
    this.dy += sin;    
    //console.log(`strafe: ${cos} ${sin}`);
  }

  stop() {
      this.dx = 0;
      this.dy = 0;
  }

}

if (typeof(module) !== 'undefined') { module.exports = Body; }
