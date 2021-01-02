// Setup server

const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const TankGame = require("./game/tankgame");
const port = process.env.port || 8080;

const GAME_SPEED = 1000/60;

console.log("--------------------------------------------");

// Setup Game & Regular Loop
let game = new TankGame(1000,1000);

setInterval( () => { 
    game.gameLoop(renderCallback);
}, GAME_SPEED); 

// Define Bindings for New Connections
io.sockets.on("connection", socket => {
    console.log(`connected: ${socket.id}`);

    socket.emit('login', socket.id);

    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
        io.sockets.emit('disconnect', socket.id);
        //game.removePlayer(socket.id);
    });

    socket.on('setKey', (data) => {
        console.log(data);
        game.recordInput(data.id, data.keyCode, data.value);        
    });

    socket.on('heartbeat', (data) => {
        //console.log(data);
        let player = game.getPlayerById(data.id);
        if (null != player) {
            player.heartbeatTime = new Date(data.time);
        }
    });

    socket.on('login', (data) => {
        console.log(`login: ${data.name}`);
        
        if (null == game.getPlayerById(data.name)) {
            let player = game.addPlayer(data.name)
            player.tank.color = data.color;
        }

    });

});

// Setup serving for Web Client HTML/JS
app.use(express.static("public"));

// Begin Listening
server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

function renderCallback(data) {
    io.sockets.emit("heartbeat", data);
};


const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

rl.prompt();

rl.on('line', (line) => {
    switch (line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        case 'game':
            console.log(game);
            break;
        case 'players':
            console.log(game.players);
            break;
        case 'tanks':
            console.log(game.tanks);
            break;
        case 'quit':
            console.log('Have a great day!');
            process.exit(0);
            break;
        default:
            break;
    }
    
    rl.prompt();
    }).on('close', () => {

});

