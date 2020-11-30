class PlayerInput {
    constructor() {

        this.left = false;
        this.right = false;

        this.up = false;
        this.down = false;

        this.fire = false;
        this.shield = false;

        this.reset = false;

        this.strafeLeft = false;
        this.strafeRight = false;

        this.speed = false;

        this.heartbeatTime = null;
    }

    setKey(keyCode, value) {
        switch (keyCode) {
            case 37: // left
                this.left = value;
                break;
            case 39: // right
                this.right = value;
                break;
            case 38: //up
                this.up = value;
                break; //up
            case 40: 
                this.down = value;
                break;
            case 32: // SPACE
                this.fire = value;
                break;

            case 16: // LEFT SHIFT
                this.speed = value;
                break;

            case 65:  //a
                this.left = value;
                break;
            case 68:  //d
                this.right = value;
                break;
            case 87:  //w
                this.up = value;
                break;
            case 83:  //s
                this.shield = value;
                break;
            case 69:  //e
                this.fire = value;
                break;
            case 88: // x
                this.down = value;
                break;
            case 90: // z
                this.strafeLeft = value;
                break;
            case 67: // c
                this.strafeRight = value;
                break;

            case 82:  //r
                this.reset = value;
                break;


        }
    }
}

if (typeof (module) !== 'undefined') { module.exports = PlayerInput; }
