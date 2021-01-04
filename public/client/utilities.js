

class Map {
  constructor() {
    
    this.defaultGameMap1 = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 2, 3, 1, 0, 1],
      [1, 0, 1, 4, 5, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.defaultGameMap = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 3, 0, 0, 1],
      [1, 0, 0, 4, 5, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ];

    this.gameMap = this.defaultGameMap;

  }


  loadGameMap() {
    // Get the most recent earthquake in the database

    //let url = 'map.csv';
    let gameMap = this.gameMap;
    let url =
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2ID9e-LirFTyR4EYUAhHKdEY0RymDYYhHyDZvFERl_LvjQZQAOuavee0DmGCirAWHfFjNE-x7jgAc/pub?gid=0&single=true&output=csv';
    httpGet(url, function(csv) {
      // when the HTTP request completes, populate the variable that holds the
      // earthquake data used in the visualization.

      //let gameMap = []; //defaultGameMap;
      
      for (let row = 0; row < gameMap.length; row++) {
        gameMap[row].splice(0,gameMap[row].length);
      }
      gameMap.splice(0,gameMap.length);      
      
      
      let data = [];

      let rows = csv.split('\n');
      for (let row = 0; row < rows.length; row++) {
        let cols = rows[row].split(',');
        let datatopush = [];
        for (let col = 0; col < cols.length; col++) {
          datatopush.push(cols[col].toString()[0]);
        }
        //gameMap.push(rows[row]);
        gameMap.push(datatopush);
      }
      console.log(gameMap);
      //this.gameMap = gameMap;
    });
  }

}




class Counter {
    constructor() {
        this.fps = 0;
        this.fpss = [60, 60, 60, 60, 60, 60, 60, 60, 60, 60];
        this.fpssi = 0;
    }

    average() {
        return this.fps;
    }

    update(value) {
        let cfps = value;

        this.fpss[this.fpssi] = cfps;

        this.fpssi = (this.fpssi + 1) % this.fpss.length;

        let tfps = 0;
        for (let i = 0; i < this.fpss.length; i++) {
            tfps += this.fpss[i];
        }

        this.fps = Math.trunc(tfps / this.fpss.length);
    }
}