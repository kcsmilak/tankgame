class FirstPerson {
    constructor(assets) {
        this.assets = assets;

    }

    render(g, game) {

        if (null == game.followTank) return;

        let followTank = game.followTank;

        g.push();
        
        g.translate(0, 50, 100);


        let per = (800 / 2.0) / tan(PI * 30.0 / 180.0);

        // remove camera angle
        g.translate(0, 0, per);

        // adjust camera angle
        if (1) { // first person
            // rotate to ground and add height perspective
            g.rotateX(90 * Math.PI / 180);
            g.translate(0, 100, -200);
        }

        let angle = -followTank.angle;
        g.rotateZ(-90 * Math.PI / 180);
        g.rotateZ((angle) * Math.PI / 180);



        if (1) g.translate(-followTank.x, -followTank.y);


        if (1) { // Draw floor
            g.push();
            g.background(100, 100, 100, 200);
            g.translate(game.width/2,game.height/2);
            g.texture(this.assets.groundImg);
            g.plane(game.width, game.height);
            g.pop();
        }

        if (1) { // Draw sky
            g.push();
            if (1) g.translate(followTank.x, followTank.y);

            g.normalMaterial();
            g.stroke(50);
            g.fill(64,196,255);
            //g.fill(0,0,100);
            //g.translate(800,800);
            //g.sphere(game.width*2);
            g.sphere(8000);
            g.pop();
        }

        g.translate(0, 0, 30);


        if (1) { // Draw lights
            //g.push();
            //g.lights();
            //g.translate(100,100,100);
            g.lights();
            //g.ambientLight(30);
            //g.pop();
            g.push();

            //g.translate(100,100,100);
            //g.directionalLight(250,250,250,-1,-1,-1);
            //g.directionalLight(50,50,50, 1, 1, -1);
            g.pointLight(255,255,255,0,0,100);
            //g.box(50);

            g.pop();
        }


        if (1) { // Draw walls
            for (let wall of game.walls) {
                wall.draw3D(g);
            }
        }


        if (1) { // Draw powerups
            for (let powerup of game.powerups) {
                powerup.draw3D(g);
            }
        }

        if (1) { // Draw bullets
            for (let bullet of game.bullets) {
                bullet.draw3D(g);
            }
        }

        if (1) { // Draw tanks
            for (let tank of game.tanks) {
                tank.draw3D(g,this.assets);
            }
        }



        g.pop();        
    }
}