
class Bullet extends Body {
    constructor(x, y) {
        super(x, y);

        this.diameter = 50;
    }

    draw(g) {
        g.push();
        g.translate(this.x,this.y);
        g.fill(200, 200, 200);
        g.stroke(0);
        g.ellipse(0,0, this.diameter, this.diameter);
        g.pop();

        //super.draw();    
    }

    draw3D(g) {
        g.push();
        g.translate(this.x,0,this.y);
        g.normalMaterial();
        g.fill(200, 200, 200);
        g.stroke(0);
        g.sphere(this.diameter);
        g.pop();
    }

}

