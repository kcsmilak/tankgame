class Body {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.angle = 0;

        this.color = { r: 128, g: 128, b: 128};
    }

    draw() {

        push();
        translate(this.x, this.y);

        let rotateAngle = 180 / this.angle;
        rotate(PI / rotateAngle);

        // draw orientation line
        stroke(0, 255, 255);
        noFill();
        line(0, 0,
            0 + this.width * 2, 0);

        // draw bounding box
        stroke(0, 0, 0);
        noFill();
        rect(-this.width / 2, -this.height / 2, this.width, this.height);



        pop();

        // draw bounding box
        stroke(100, 100, 100);
        //noFill();
        //fill(200,200,200);
        //rect(this.x0(), this.y0(), this.width, this.height);

        
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

}

