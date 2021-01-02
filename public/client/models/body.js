class Body {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.angle = 0;

        this.color = { r: 128, g: 128, b: 128};
    }

    draw(g) {

        g.push();
        g.translate(this.x, this.y);

        let rotateAngle = 180 / this.angle;
        g.rotate(PI / rotateAngle);

        // draw orientation line
        g.stroke(0, 255, 255);
        g.noFill();
        g.line(0, 0,
            0 + this.width * 2, 0);

        // draw bounding box
        g.stroke(0, 0, 0);
        g.noFill();
        g.rect(-this.width / 2, -this.height / 2, this.width, this.height);



        g.pop();

        // draw bounding box
        g.stroke(100, 100, 100);
        //noFill();
        //fill(200,200,200);
        //rect(this.x0(), this.y0(), this.width, this.height);

        
    }

    draw3D(g) {
        
    }


    x0() {
        return this.x - this.width / 2;
    }

    y0() {
        return this.y - this.height / 2;
    }

    x1() {
        return this.x0() + this.width;
    }

    y1() {
        return this.y0() + this.height;
    }

    fromJson(jsonObject) {

    }
}

