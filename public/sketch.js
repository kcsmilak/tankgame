const _socket = io.connect();


// globals
let _localGame = 0;
let _gameServer;
let _gameClient= new GameClient();

let debugString = '';
let textures = [];

let _playerId;
let _gameTick = 0;
let _objectsRendered = 0;
let _serverHeartbeats = 0;

let _useMouse = 0;

let _playerName = "(Player Unknown #" + Math.trunc(100*Math.random()) + ")" ;

class ServerConnection {

    constructor(gameClient) {
        this.gameClient = gameClient;
        this.gameTick = 0;
        this.playerId = '<undefined>';
    }
    
    connect() {
        let socket = io.connect();
        socket.on("login", playerId => this.login(playerId));
        socket.on("heartbeat", data => this.heartbeat(data));  
        this.socket = socket;
        
        document.keyPressed = this.keyPressed;
        document.keyReleased = this.keyReleased;
    }
    
    sendHeartbeat() {
        let data = { id: _playerName, time: new Date().toUTCString()};
        this.socket.emit('heartbeat', data);
    }
    
    keyPressed() {
        this.setKey(keyCode, true);
    }
    
    keyReleased() {
        this.setKey(keyCode, false);
    }
    
    setKey(keyCode, value) {
        //_game.setKey(keyCode, value);
    
        let data = { 'id': _playerName, 'keyCode': keyCode, 'value': value };
        //console.log(data);
        this.socket.emit('setKey', data);
        this.gameServer.recordInput(_playerName, keyCode, value);
    }    
        
    login(playerId) {
        _playerId = playerId;
        let _playerColor = { 
            r: Math.trunc(255*Math.random()), 
            g: Math.trunc(255*Math.random()), 
            b: 255*Math.trunc(Math.random())};
        let data = { name : _playerName, color: _playerColor} ;
        this.gameClient.setPlayerId(_playerName);
        console.log(`login ${data.name}`);
        this.socket.emit('login', data)
    }
    
    heartbeat(data) {
        this.gameTick++;
    
        data = JSON.parse(data);
        if (0 == this.gameTick % 1000) console.log(data);
    
        //_game.fromJson(data);
        if (null != _gameClient) {
            this.gameClient.serverUpdate(data);
        }
    }
    
    localHeartbeat(data) {
        if (null != this.gameClient) {
            this.gameClient.update(data);
        }   
    }
    
}

if (document.cookie.length > 0 ) {
    _playerName = document.cookie;
}


function sendHeartbeat() {
    let data = { id: _playerName, time: new Date().toUTCString()};
    _socket.emit('heartbeat', data);
}


function keyPressed() {
    setKey(keyCode, true);
}

function keyReleased() {
    setKey(keyCode, false);
}

function setKey(keyCode, value) {
    //_game.setKey(keyCode, value);

    let data = { 'id': _playerName, 'keyCode': keyCode, 'value': value };
    //console.log(data);
    _socket.emit('setKey', data);
    if (_gameServer)
        _gameServer.recordInput(_playerName, keyCode, value);
}

function login(playerId) {
    _playerId = playerId;
    let _playerColor = { 
        r: Math.trunc(255*Math.random()), 
        g: Math.trunc(255*Math.random()), 
        b: 255*Math.trunc(Math.random())};
    let data = { name : _playerName, color: _playerColor} ;
    _gameClient.setPlayerId(_playerName);
    console.log(`login ${data.name}`);
    _socket.emit('login', data)
}

function heartbeat(data) {
    _gameTick++;

    data = JSON.parse(data);
    if (0 == _gameTick % 1000) console.log(data);

    //_game.fromJson(data);
    if (null != _gameClient) {
        _gameClient.serverUpdate(data);
    }
}

function localHeartbeat(data) {
    if (null != _gameClient) {
        _gameClient.update(data);
    }   
}

setInterval( () => { 
    sendHeartbeat();
}, 1000 * 1); 

function preload() {
  textures[3] = loadImage('assets/grass.jpg');
  textures[1] = loadImage('assets/rock.jpg');
  textures[2] = loadImage('assets/water.jpg');
  textures[0] = loadImage('assets/dirt.jpg');
}

  
  
function setup() {
  createCanvas(windowWidth, windowHeight);
  //_gameClient = new GameClient(this);
  _gameClient.setup(this);

    _serverConnection = new ServerConnection(_gameClient);
    _serverConnection.connect();

  if (_localGame != null && _localGame) {
  _gameServer = new GameServer(localHeartbeat);
  _gameServer.setup();
  }

}

function draw() {
    
    if (_localGame != null && _localGame) {
      _gameServer.update();
    }
    _gameClient.render();
}


/* mouse controls */
{
  document.body.addEventListener("mousemove", function(e) {
    if (_useMouse) {
      //console.mx = 
      let mx = Math.max(-100, Math.min(e.movementX, 100));
      //console.my = 
      let my = Math.max(-100, Math.min(e.movementY, 100));
      console.log("mouse" + e);
      setKey("mouse", { mx:mx, my:my});
    }
  });

  function mouseClicked() {
    //got this stuff from Willard's Minecraft
    if (canvas.requestPointerLock) {
      canvas.requestPointerLock();
      _useMouse = true;
    }
  }

  function mouseWheel(event) {
    //print(event.delta);
    //move the square according to the vertical scroll amount
    player.zoom += event.delta;
  }
}

_socket.on("login", playerId => login(playerId));
_socket.on("heartbeat", data => heartbeat(data));









