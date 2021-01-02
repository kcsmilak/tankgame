class Powerup extends Body {
  constructor(x, y) {
    super(x,y);
    

  }
  
  draw(g) {

    //fill(0, 255, 0);
    //stroke(0);
    //rect(this.x, this.y, this.diameter, this.diameter);
    
    super.draw(g);    
  } 

  draw3D(g) {
      super.draw3D(g);
  }

}

