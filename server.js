var fs = require('fs'),
    http = require('http'),

    server = http.createServer(function(request, response){});

server.listen(process.env.PORT || 8080);

var everyone = require("now").initialize(server);

console.log('Required everyone...');

everyone.now.sendAll = function(message)
{
    console.log('##### ', message);
    everyone.now.onMessageReceived(this.now.name, message);
};
