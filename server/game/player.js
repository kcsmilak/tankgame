const PlayerInput = require('./playerinput');
const Tank = require('./bodies/tank');

class Player {
  constructor(id, x, y) {
      this.id = id;
      this.playerInput = new PlayerInput();
      this.tank = new Tank(x,y);
      this.tank.creatorId = id;
      console.log(`add tank: ${this.tank.creatorId}`);
      this.score = 0;
      this.heartbeatTime = new Date();
  }
}

if (typeof(module) !== 'undefined') { module.exports = Player; }

