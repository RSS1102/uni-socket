let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http, {
    allowEIO3: true,
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        credentials: true
    }
});

require("./model/socket")(io)


http.listen(3000, function() {
    console.log('listening on *:3000');
});