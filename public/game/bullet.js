
class Bullet extends Body {
  constructor(x, y, dx, dy) {
    super(x,y);
    
    this.diameter = 0;
  }
  
  draw() {

    fill(200, 200, 200);
    stroke(0);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    
    //super.draw();    
  } 

}

