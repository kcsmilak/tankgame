const _socket = io.connect();

let game;
let _playerId;

let _gameTick = 0;

let _playerName = "Player Unknown " + Math.trunc(255*Math.random()) ;
if (document.cookie.length > 0 ) {
    _playerName = document.cookie;
}

let _playerColor = { 
    r: Math.trunc(255*Math.random()), 
    g: Math.trunc(255*Math.random()), 
    b: 255*Math.trunc(Math.random())};

_socket.on("login", playerId => login(playerId));
_socket.on("heartbeat", data => heartbeat(data));

function setup() {

    let viewWidth = windowWidth;
    let viewHeight = windowHeight;
    game = new TankGame(viewWidth, viewHeight);
    createCanvas(viewWidth, viewHeight);


    input = createInput();
    input.position(5, viewHeight - 40);

    button = createButton('submit');
    button.position(input.x + input.width, input.y);
    button.mousePressed(greet);


}


function greet() {
  const name = input.value();
  _playerName = name;
  document.cookie = name; 
  login(name);
}

function draw() {


    game.render();
}

function keyPressed() {
    setKey(keyCode, true);
}

function keyReleased() {
    setKey(keyCode, false);
}

function setKey(keyCode, value) {
    let data = { 'id': _playerName, 'keyCode': keyCode, 'value': value };
    console.log(data);
    _socket.emit('setKey', data);
}

function sendHeartbeat() {
    let data = { id: _playerName, time: new Date().toUTCString()};
    console.log(data);
    _socket.emit('heartbeat', data);
}

function login(playerId) {
    _playerId = playerId;
    let data = { name : _playerName, color: _playerColor} ;
    game.playerId = _playerName;
    console.log(`login ${data.name}`);
    _socket.emit('login', data)
}

function heartbeat(data) {
    _gameTick++;

    if (0 == _gameTick % 1000) console.log(data);

    game.fromJson(data);
}

setInterval( () => { 
    sendHeartbeat();
}, 1000); 
