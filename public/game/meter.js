
class Meter {
    constructor(size, color, name) {
        this.min = 0;
        this.max = 100;
        this.level = 75;
        this.name = name;
        this.size = size;

        this.icon = loadImage('assets/icons/' + this.name.toLowerCase() + '.png');

        this.meterColor = color;
        this.loadAssets();
    }

    loadAssets() {

        if (1) {

            this.meterIconHolder = this.loadMeterImage('icon_holder');

            this.meterBarHolderLeftEdge = this.loadMeterImage('bar_holder_left_edge');
            this.meterBarHolderRightEdge = this.loadMeterImage('bar_holder_right_edge');
            this.meterBarHolderCenterRepeating = this.loadMeterImage('bar_holder_center-repeating');


            this.meterBarLeftEdge = this.loadMeterImage('bar_left_edge');
            this.meterBarRightEdge = this.loadMeterImage('bar_right_edge');
            this.meterBarCenterRepeating = this.loadMeterImage('bar_center-repeating');

            this.meterTextBackgroundLeftEdge = this.loadMeterImage('text_background_left_edge');
            this.meterTextBackgroundRightEdge = this.loadMeterImage('text_background_right_edge');
            this.meterTextBackgroundCenterRepeating = this.loadMeterImage('text_background_center_repeating');

        } else {
            this.meterIconHolder = loadImage('assets/red/meter_icon_holder_red.png')

            this.meterBarHolderLeftEdge = loadImage('assets/red/meter_bar_holder_left_edge_red.png');
            this.meterBarHolderRightEdge = loadImage('assets/red/meter_bar_holder_right_edge_red.png');
            this.meterBarHolderCenterRepeating = loadImage('assets/red/meter_bar_holder_center-repeating_red.png');


            this.meterBarLeftEdge = loadImage('assets/red/meter_bar_left_edge_red.png');
            this.meterBarRightEdge = loadImage('assets/red/meter_bar_right_edge_red.png');
            this.meterBarCenterRepeating = loadImage('assets/red/meter_bar_center-repeating_red.png');

            this.meterTextBackgroundLeftEdge = loadImage('assets/red/meter_text_background_left_edge_red.png');
            this.meterTextBackgroundRightEdge = loadImage('assets/red/meter_text_background_right_edge_red.png');
            this.meterTextBackgroundCenterRepeating = loadImage('assets/red/meter_text_background_center_repeating_red.png');
        }

    }

    loadMeterImage(part) {
        let filename = 'assets/' + this.meterColor + '/' + 'meter_' + part + '_' + this.meterColor + '.png';
        //console.log(filename);
        return loadImage(filename);
    }

    draw(g) {

        let meterOffset = 234;
        let meterWidth = meterOffset +
            this.meterBarHolderLeftEdge.width +
            this.meterBarHolderCenterRepeating.width * 10 +
            this.meterBarHolderRightEdge.width;


        g.push(); {
            g.scale(this.size / meterWidth);

            // draw meter text & background
            g.push(); {

                g.translate(meterWidth, 200);

                // draw meter text background 
                g.push(); {


                    g.translate(-this.meterTextBackgroundLeftEdge.width, 0);
                    g.image(this.meterTextBackgroundRightEdge, 0, 0);

                    for (let i = 0; i < 15; i++) {
                        g.translate(-this.meterTextBackgroundCenterRepeating.width, 0);
                        g.image(this.meterTextBackgroundCenterRepeating, 0, 0);
                    }

                    g.translate(-this.meterTextBackgroundRightEdge.width, 0);
                    g.image(this.meterTextBackgroundLeftEdge, 0, 0);

                }
                g.pop();

                // draw meter text
                g.push(); {

                    g.translate(-80, 260);
                    g.textSize(100);
                    g.textAlign(RIGHT);
                    g.textStyle(BOLD);
                    g.fill(255);
                    g.text(`${this.name}:                   `, 0, 0);
                    g.text(`${Math.trunc(this.level)} / ${this.max}`, 0, 0);

                }
                g.pop();
            }
            g.pop();

            g.push(); {
                // displace to center of meter icon holder
                //g.translate(this.meterIconHolder.width / 2 * 0.8, 0);
                g.translate(meterOffset, 0);

                // draw meter bar holder
                g.push(); {
                    g.image(this.meterBarHolderLeftEdge, 0, 0);
                    g.translate(this.meterBarHolderLeftEdge.width, 0);

                    for (let i = 0; i < 10; i++) {
                        g.image(this.meterBarHolderCenterRepeating, 0, 0);
                        g.translate(this.meterBarHolderCenterRepeating.width, 0);
                    }

                    g.image(this.meterBarHolderRightEdge, 0, 0);
                    g.translate(this.meterBarHolderRightEdge.width, 0);
                }
                g.pop();

                // draw meter bar
                g.push(); {
                    g.image(this.meterBarLeftEdge, 0, 0);
                    g.translate(this.meterBarLeftEdge.width, 0);

                    for (let i = 0; i < Math.min(this.level, this.max) / this.max * 100; i++) {
                        g.image(this.meterBarCenterRepeating, 0, 0);
                        g.translate(this.meterBarCenterRepeating.width, 0);
                    }

                    g.image(this.meterBarRightEdge, 0, 0);
                    g.translate(this.meterBarRightEdge.width, 0);
                }
                g.pop();


            }
            g.pop();

            g.push(); {
                g.translate(0, 5);
                g.image(this.meterIconHolder, 0, 0);

                g.push(); {
                    // displace to center of icon holder
                    g.translate(this.meterIconHolder.width / 2, this.meterIconHolder.height / 2);
                    // center justify the icon
                    g.translate(-this.icon.width / 2, -this.icon.height / 2)
                    g.image(this.icon, 0, 0);
                }
                g.pop();
            }
            g.pop();

            /*
            g.push();
            g.translate(-this.width/2, -this.height/2);
            g.fill(200);
            g.rect(0,0,this.width,this.height);
            g.pop();
            g.push();
            translate(-this.width/2, -this.height/4)
            g.fill(200,0,0);
            g.rect(0,0,this.width,this.height/2);
            g.pop();
            
            */
        }
        g.pop();

    }
}