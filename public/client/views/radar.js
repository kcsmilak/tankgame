class Radar {

    constructor() {
    }

    render(g, game) {

        g.push();

        g.translate(g.width/2, g.height/2);
        g.scale(0.25);        

        if (null != game.followTank) {
            g.translate(-game.followTank.x, -game.followTank.y);
        }


        if (1) { // Draw walls
            for (let wall of game.walls) {
                wall.draw(g);
            }
        }

        if (1) { // Draw powerups
            for (let powerup of game.powerups) {
                powerup.draw(g);
            }
        }

        if (1) { // Draw bullets
            for (let bullet of game.bullets) {
                bullet.draw(g);
            }
        }

        if (1) { // Draw tanks
            for (let tank of game.tanks) {
                tank.draw(g);
            }
        }

        g.pop();
    }    
}