class Tank extends Body {
    constructor(x, y) {
        super(x, y);
        this.diameter = 20;
        //this.img = loadImage('game/tank-clipart-tank13.png');
    }

    fromJson(serverTank) {
        this.angle = serverTank.angle;
        this.id = serverTank.id;
        this.dx = serverTank.dx;
        this.dy = serverTank.dy;
        this.diameter = serverTank.diameter;
        this.color = serverTank.color;        
        this.shield = serverTank.shield;
        this.shieldPower = serverTank.shieldPower;
        this.health = serverTank.health;
        this.ammo = serverTank.ammo;
    }

    draw() {
        //console.log(`tank: ${this.x},${this.y} ${this.color.r}`);

        push();

        translate(this.x, this.y);

        let rotateAngle = 180 / this.angle;
        rotate(PI / rotateAngle);        

        fill(this.color.r, this.color.g, this.color.b);
        //noStroke();
        stroke(50);

        if (1) {
            ellipse(0,0, this.diameter, this.diameter);        
            rect(0,-4,this.diameter + this.diameter*.1, 8);
        } else {
            image(this.img, 0,0,this.diameter,this.diameter);
        }

        // draw shield
        if (this.shield) {
            stroke(255,255,255);
            noFill();
            ellipse(0,0, this.diameter*2.2, this.diameter*2.2);        
        }

        pop();

        // draw player name
        noStroke();
        textSize(6);
        fill(128,128,128)
        text(`${this.id}`, this.x0(), this.y0());


        super.draw();
    }

}

if (typeof (module) !== 'undefined') { module.exports = Tank; }
