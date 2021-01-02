

class AmmoPack extends Powerup {
  constructor(x, y, img) {
    super(x,y);
    //this.img = loadImage('assets/icons/ammo.png');
    //this.img = _ammoImg;
    this.img = img;
    this.width = this.height = 50;

  }
  
  draw(g) {


    g.fill(55,55,55,200);
    g.stroke(128);
    g.ellipse(this.x, this.y, this.width*1.2);

    g.image(this.img, this.x-this.width/2, this.y-this.height/2, this.width, this.height);

    //super.draw();    
  }

  draw3D(g) {
      g.push();
      g.stroke(0);
      g.translate(this.x, this.y);
      g.fill(0,255,0,100);
      g.rotateZ(frameCount * 0.01);
      g.rotateX(frameCount * 0.01);
      g.box(40);
      g.texture(this.img);
      g.box(42);
      g.pop();
      //console.log('ack');
  }

  fromJson(jsonObject) {
      //super(jsonObject);

  }

}

