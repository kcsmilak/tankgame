class Wall extends Body {
  constructor(x, y, width, height) {
    super(x,y);
    this.width = width;
    this.height = height;
  }
  
  draw() {
        fill(this.color.r, this.color.g, this.color.b);
        //noStroke();
        stroke(0);
        rect(this.x0(), this.y0(), this.width, this.height);
        //super.draw();
  }
}

