class GameClient {
    constructor(canvas) {
        
        this.bullets = [];
        this.players = [];

  
    }
    
    setup(canvas) {
        let map = new Map();
        map.loadGameMap();
        let gameMap = map.gameMap;

        this.display = new Display(canvas);
        let mapModel = new MapModel(gameMap);

        this.playerModel = null;

        this.debugView = new DebugView(this.display.gDebug);
        this.radarView = new RadarView(this.display.gRadar,mapModel);
        this.mapView = new MapView(this.display.gMap,mapModel);
        this.mainView = new MainView(this.display.gMain,mapModel);            
    }
    
    setPlayerId(playerId) {
        this.playerId = playerId;
    }
    
    update(data) {
        // update player model
        let player = data;
        //this.playerModel = new PlayerModel(player);
    }
    
    serverUpdate(data) {
        
        this.players = [];
        for (let json of data.tanks) {
            // adapt server object to client expectation
            json.theta = (json.angle + 360) % 360;
            json.alpha = 0;
            let playerModel = new PlayerModel(json);
            this.players.push(playerModel);
            
            if (json.id == this.playerId) {
                this.playerModel = playerModel;
            }
            
            
        }        
        
        if (null != data.bullets) {
        this.bullets = [];
        for (let json of data.bullets) {
            if (null == json) continue;
            this.bullets.push(
                new Bullet(json.x, json.y));
        }
        }
    }
    
    render() {
        
        debugString += `id:  ${this.playerId}`;
        //debugString += `\nl:${this.game.map.gameMap.length}`;
        //debugString += ` w:${this.game.map.gameMap[0].length}\n`;
        
        let playerModel = this.playerModel;
        
        if (null != playerModel) {
            
            debugString += `\nid:  ${playerModel.id}`;
            debugString += `\nx:   ${playerModel.x}`;
            debugString += `\ny:   ${playerModel.y}`;
            debugString += `\nt:   ${playerModel.theta}`;
            debugString += `\na:   ${playerModel.alpha}`;
            
            this.debugView.render(this);
            this.mainView.render(playerModel, this.players);
            this.radarView.render(playerModel, this.players);
            this.mapView.render(playerModel, this.players);
        }
        
        this.display.update();        
    }
}