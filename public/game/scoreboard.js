class Scoreboard {
    constructor() {
    }

    render(g, serverUpdate) {
        g.push();

        let margin = 12;
        let size = 20;

        // draw a background
        if (0) {
        g.stroke(0);
        g.fill(100, 100, 100, 150);
        g.rect(0, 0, 220, 200);
        }

        // write stuff
        g.textSize(size);
        g.fill(0);
        g.noStroke();
        g.textFont('Courier');

        if (null != serverUpdate) {

            let scoreboard = ""
            //let scoreboard = "-[ S C O R E S ]- \n\n";
            for (let player of serverUpdate.players) {
                scoreboard += `${player.id}\t${player.score}\n`;
            }
            g.text(scoreboard, 0 + margin, 0 + size + margin);
        }

        g.pop();
    }
}