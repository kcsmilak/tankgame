

class Player {
  constructor() {
    this.x = 700;
    this.y = 600;

    this.velocity = 0;
    this.strafe = 0;

    this.yaw = 0;
    this.pitch = 0;
    this.roll = 0;

    this.theta = -145;
    this.alpha = 0;

    this.zoom = -10;

    this.dx = 0;
    this.dy = 0;

    this.speed = 4;
  }

  update(map) {

    this.alpha += this.pitch;
    this.theta += this.yaw;

    this.alpha = Math.max(-15, Math.min(30, this.alpha));
    this.theta = (this.theta + 360) % 360;

    this.dx = 0;
    this.dy = 0;
    this.dx += this.velocity * Math.cos((this.theta + 90) * Math.PI / 180);
    this.dy -= this.velocity * Math.sin((this.theta + 90) * Math.PI / 180);

    this.dx += this.strafe * Math.cos((this.theta + 0) * Math.PI / 180);
    this.dy -= this.strafe * Math.sin((this.theta + 0) * Math.PI / 180);


    let frameDx = this.dx * this.speed;
    let frameDy = this.dy * this.speed;

    let frameX = this.x + frameDx;
    let frameY = this.y + frameDy;
    let frameMapX = Math.trunc(frameX / 100);
    let frameMapY = Math.trunc(frameY / 100);

    let oldMapX = Math.trunc(this.x / 100);
    let oldMapY = Math.trunc(this.y / 100);

    if (map[frameMapY][oldMapX] == 1) {
      frameDy = 0;
    }
    if (map[oldMapY][frameMapX] == 1) {
      frameDx = 0;
    }

    this.x += frameDx;
    this.y += frameDy;

  }

  toString() {
    let string = '';

    string += `x:  ${Math.trunc(this.x)}`;
    string += `\ny:  ${Math.trunc(this.y)}`;
    string += '\n';
    string += `\ndx: ${Math.trunc(this.dx)}`;
    string += `\ndy: ${Math.trunc(this.dy)}`;
    string += `\nv:  ${Math.trunc(this.velocity)}`;
    string += `\ns:  ${Math.trunc(this.strafe)}`;
    string += '\n';
    string += `\nt:  ${Math.trunc(this.theta)}`;
    string += `\na:  ${Math.trunc(this.alpha)}`;
    string += '\n';
    string += `\ny:  ${Math.trunc(this.yaw)}`;
    string += `\np:  ${Math.trunc(this.pitch)}`;
    string += `\nr:  ${Math.trunc(this.roll)}`;
    string += '\n';
    string += `\nz:  ${Math.trunc(this.zoom)}`;

    return string;
  }
  
  toJson() {
      return {
          x : this.x,
          y : this.y,
          theta : this.theta,
          alpha : this.alpha
      }
  }
}