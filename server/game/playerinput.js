class PlayerInput {
    constructor() {

        this.turn = 0;
        this.move = 0;
        this.strafe = 0;
        
        this.turbo = false;
        this.crouch = false;

        this.fire = false;
        this.shield = false;

        this.reset = false;
        this.colorCycle = false;

        this.heartbeatTime = null;

        this.mx = 0;
        this.my = 0;
    }

    setKey(keyCode, value) {
        switch (keyCode) {
            case 37: // left
                this.turn = value;
                break;
            case 39: // right
                this.turn = -value;
                break;
            case 38: // up
                this.move = value;
                break;
            case 40:  // down
                this.move = -value;
                break;
            case 32: // SPACE
                this.fire = value;
                break;

            case 16: // LEFT SHIFT
                this.speed = value;
                break;

            case 65:  // a
                this.strafe = -value;
                break;
            case 68:  // d
                this.strafe = value;
                break;
            case 87:  // w
                this.move = value;
                break;
            case 83:  // s
                this.move = -value;
                break;
            case 69:  // e
                this.fire = value;
                break;
            case 88: // x
                this.shield = value;
                break;
            case 90: // z
                this.strafe = value;
                break;
            case 67: // c
                this.colorCycle = value;
                break;

            case 82:  //r
                this.reset = value;
                break;

            case "mouse":
                this.mx = value.mx;
                this.my = value.my;
                break;


        }
    }
}

if (typeof (module) !== 'undefined') { module.exports = PlayerInput; }
