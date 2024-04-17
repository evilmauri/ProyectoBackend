const io = require('socket.io-client');

let socket = io.connect('http://localhost:3000',{reconnect: true});

socket.on('connect',function(){
    console.log("\n\nSocket connected from NodeJS\n\n")
})

module.exports = socket;


//Para que todo esto se ejecute tenemos que importarlo hacia server.js que seria nuestro Servidor