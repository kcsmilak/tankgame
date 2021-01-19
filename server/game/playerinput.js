class PlayerInput {
    constructor() {

        this.turnLeft = false;
        this.turnRight = false;

        this.pitchDown = false;
        this.putchUp = false;

        this.accelerate = false;
        this.decelerate = false;

        this.strafeLeft = false;
        this.strafeRight = false;

        
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
                this.turnLeft = value;
                break;
            case 39: // right
                this.turnRight = -value;
                break;
            case 38: // up
                this.putchUp = value;
                break;
            case 40:  // down
                this.pitchDown = -value;
                break;
            case 32: // SPACE
                this.fire = value;
                break;

            case 16: // LEFT SHIFT
                this.crouch = value;
                break;

            case 65:  // a
                this.strafeLeft = value;
                break;
            case 68:  // d
                this.strafeRight = value;
                break;
            case 87:  // w
                this.accelerate = value;
                break;
            case 83:  // s
                this.decelerate = -value;
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
