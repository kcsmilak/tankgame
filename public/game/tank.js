class Tank extends Body {
    constructor(x, y) {
        super(x, y);
        this.diameter = 20;
        //this.img = loadImage('game/tank-clipart-tank13.png');
        //this.model = loadModel('assets/models/tank.obj');
        this.texture = null;
        this.model = null;        
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

    draw(g,) {

        //console.log(`tank: ${this.x},${this.y} ${this.color.r}`);

        g.push();

        g.translate(this.x, this.y);

        let rotateAngle = 180 / this.angle;
        g.rotate(PI / rotateAngle);

        g.fill(this.color.r, this.color.g, this.color.b);
        g.fill(200, 200, 200);
        //noStroke();
        g.stroke(50);

        if (1) {
            g.ellipse(0, 0, this.diameter, this.diameter);
            g.rect(0, -4, this.diameter + this.diameter * .1, 8);
        } else {
            //g.image(this.img, 0,0,this.diameter,this.diameter);
        }

        // draw shield
        if (this.shield) {
            g.push();
            g.strokeWeight(50 * Math.min(100, this.shieldPower) / 100)
            g.stroke(255, 255, 255);
            g.noFill();
            g.ellipse(0, 0, this.diameter * 2.2, this.diameter * 2.2);
            g.pop();
        }

        g.pop();

        // draw player name
        //g.noStroke();
        // g.textSize(6);
        //g.fill(128,128,128)
        //g.text(`${this.id}`, this.x0(), this.y0());


        if (0) super.draw(g);
    }

    draw3D(g, assets) {

        //console.log(`tank: ${this.x},${this.y} ${this.color.r}`);

        g.push();

        g.translate(this.x, this.y);

        let rotateAngle = 180 / this.angle;
        g.rotate(PI / rotateAngle);

        g.fill(this.color.r, this.color.g, this.color.b);
        //g.fill(200, 200, 200);
        //noStroke();
        g.stroke(50);

        // draw shield
        if (this.shield) {
            g.push();
            //g.strokeWeight(50 * Math.min(100, this.shieldPower) / 100)
            //g.stroke(255, 255, 255);
            g.fill(0,0,255,100);
            g.sphere(this.diameter * 0.6 * (1 + this.shieldPower/100) * 1.2);
            g.pop();
        }        

        if (this.model == null) {
            //g.ellipse(0, 0, this.diameter, this.diameter);
            //g.rect(0, -4, this.diameter + this.diameter * .1, 8);
            g.rotateZ(90 * Math.PI/180);
            g.rotateX(90 * Math.PI/180);
            //g.noStroke();
            //g.normalMaterial();
            g.cylinder(this.diameter*0.6,30);
            g.rotateX(90 * Math.PI/180);
            g.translate(0,this.diameter,0);
            g.box(this.diameter*0.5);
        } else {
            //g.image(this.img, 0,0,this.diameter,this.diameter);
            g.push();
            g.scale(0.5);
            g.rotateX(90 * Math.PI/180);
            g.rotateY(90 * Math.PI/180);
            g.translate(0,0,-100);
            g.noStroke();
            //g.directionaLight(255,255,255,1,1,-1);
            //g.ambientLight(60,60,60);
            //g.pointLight(255, 255, 255, 0, 0, 100);

            g.normalMaterial();

            if (this.texture != null ) {
                g.texture(this.texture);
            }
            g.model(this.model);
            g.pop();
        }

        g.pop();

        if (0) super.draw(g);
    }
}


if (typeof (module) !== 'undefined') { module.exports = Tank; }
