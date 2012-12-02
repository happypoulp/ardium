var fs = require('fs'),
    http = require('http'),

    server = http.createServer(function(request, response){});

server.listen(process.env.PORT || 8080);

var everyone = require("now").initialize(server);

console.log('Required everyone...');

everyone.now.distributeMessage = function(message, color)
{
    console.log('#####', message, color);
    // this.now refers to the `now` of the caller's scope
    everyone.now.receiveMessage(this.now.name, message, color);
};
