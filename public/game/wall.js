class Wall extends Body {
  constructor(x, y, width, height, boundary) {
    super(x,y);
    this.width = width;
    this.height = height;
    this.boundary = boundary;
  }
  
  draw(g) {
        g.fill(this.color.r, this.color.g, this.color.b);
        //noStroke();
        g.stroke(0);
        g.rect(this.x0(), this.y0(), this.width, this.height);
        //super.draw();
  }

   draw3D(g) {
       let height = 100;
        g.push();
        g.fill(this.color.r, this.color.g, this.color.b);
        //noStroke();
        g.stroke(0);
        g.translate(this.x, this.y);
        if (this.boundary) {
        } else {
            height = 400;
            g.texture(this.assets.groundImg);
        }
        g.box(this.width, this.height, height);
        //super.draw();
        g.pop();
  } 
}

