const Body = require('./body');

class Wall extends Body {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;

        this.color = {
            r: 100,
            g: 100,
            b: 100
        };

        this.pulse = 0;

    }

    update() {
        let variance = 0;
        //let modifier = variance-variance*2*Math.random();

        this.pulse = (++this.pulse) % variance;
        let modifier = variance - this.pulse * 2;

        this.color = {
            r: 50,// + modifier,
            g: 50,
            b: 50
        };
    }
}

if (typeof (module) !== 'undefined') { module.exports = Wall; }

