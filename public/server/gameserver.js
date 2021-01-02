class GameServer {
    constructor(renderCallback) {
        this.game = new Game();
        this.controller = new Controller();
        this.renderCallback = renderCallback;
        
        
        this.keys = [];
    }
    
    setup() {
        this.game.setup();
    }
    
    update() {
        // process input
        this.processInput();

        // update
        this.game.update();

        // render (send data to client)
        //this.render(); 
        this.renderCallback(this.game.player.toJson());
    }
    
    
    keyDown(keyCode) {
        if (null == this.keys[keyCode])
            return false;
        return this.keys[keyCode];
    }


  processInput() {

    let player = this.game.player;

    if (this.keyDown(27)) { // ESCAPE
      useMouse = false;
      this.controller.mx = 0;
      this.controller.my = 0;
    }

    if (this.keyDown(LEFT_ARROW)) {
      player.yaw = 5;
    } else if (this.keyDown(RIGHT_ARROW)) {
      player.yaw = -5;
    } else {
      if (1) {
        if (this.controller.mx > 0) {
          this.controller.mx--;
        }
        if (this.controller.mx < 0) {
          this.controller.mx++;
        }
        player.yaw = -this.controller.mx * 0.15;
      } else {
        player.yaw = 0;
      }
    }

    if (this.keyDown(UP_ARROW)) {
      player.pitch = -5;
    } else if (this.keyDown(DOWN_ARROW)) {
      player.pitch = 5;
    } else {
      if (1) { //if (Math.abs(player.my) > 10 && Math.abs(player.my) < 300) {
        if (this.controller.my > 0) {
          this.controller.my--;
        }
        if (this.controller.my < 0) {
          this.controller.my++;
        }
        player.pitch = this.controller.my * 0.15;
      } else {
        player.pitch = 0;
      }
    }


    if (this.keyDown(87)) { //w
      player.velocity = 5;
    } else
    if (this.keyDown(83)) { //s
      player.velocity = -5;
    } else {
      player.velocity = 0;
    }

    if (this.keyDown(65)) { //a
      player.strafe = -5;
    } else
    if (this.keyDown(68)) { // d
      player.strafe = 5;
    } else {
      player.strafe = 0;
    }

    if (this.keyDown(82)) {
      setup();
    }

  }    
  
  processInputOld() {

    let player = this.game.player;

    if (keyIsDown(27)) { // ESCAPE
      useMouse = false;
      this.controller.mx = 0;
      this.controller.my = 0;
    }

    if (keyIsDown(LEFT_ARROW)) {
      player.yaw = 5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      player.yaw = -5;
    } else {
      if (1) {
        if (this.controller.mx > 0) {
          this.controller.mx--;
        }
        if (this.controller.mx < 0) {
          this.controller.mx++;
        }
        player.yaw = -this.controller.mx * 0.15;
      } else {
        player.yaw = 0;
      }
    }

    if (keyIsDown(UP_ARROW)) {
      player.pitch = -5;
    } else if (keyIsDown(DOWN_ARROW)) {
      player.pitch = 5;
    } else {
      if (1) { //if (Math.abs(player.my) > 10 && Math.abs(player.my) < 300) {
        if (this.controller.my > 0) {
          this.controller.my--;
        }
        if (this.controller.my < 0) {
          this.controller.my++;
        }
        player.pitch = this.controller.my * 0.15;
      } else {
        player.pitch = 0;
      }
    }


    if (keyIsDown(87)) { //w
      player.velocity = 5;
    } else
    if (keyIsDown(83)) { //s
      player.velocity = -5;
    } else {
      player.velocity = 0;
    }

    if (keyIsDown(65)) { //a
      player.strafe = -5;
    } else
    if (keyIsDown(68)) { // d
      player.strafe = 5;
    } else {
      player.strafe = 0;
    }

    if (keyIsDown(82)) {
      setup();
    }

  }    
  
  
    recordInput(id, keyCode, value) {
        console.log(`set key id=${id} c=${keyCode} v=${value}`);
        this.keys[keyCode] = value;
        //player.playerInput.setKey(keyCode, value);
    }  
}