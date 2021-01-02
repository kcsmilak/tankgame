class Game {
  constructor() {
    this.player = new Player();
    this.map = new Map();
  }
  
  setup() {
    this.map.loadGameMap();
  }

  update() {
    this.player.update(this.map.gameMap);
  }
}
