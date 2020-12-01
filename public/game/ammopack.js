class AmmoPack extends Powerup {
  constructor(x, y) {
    super(x,y);
    this.img = loadImage('game/img/ammo.png');

    this.width = this.height = 50;

  }
  
  draw() {


    fill(55,55,55,200);
    stroke(128);
    ellipse(this.x, this.y, this.width*1.2);

    image(this.img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);

    //super.draw();    
  }

  fromJson(jsonObject) {
      //super(jsonObject);

  }

}

