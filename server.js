var fs = require('fs'),
    http = require('http'),

    server = http.createServer(function(request, response)
        {
            fs.readFile('./index.html', function(error, content)
            {
                if (error)
                {
                    response.writeHead(500);
                    response.end();
                }
                else
                {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                }
            });
        }
    );

server.listen(process.env.PORT || 8080);

var everyone = require("now").initialize(server);

console.log('Required everyone...');

everyone.now.sendAll = function(message)
{
    console.log('##### ', message);
    everyone.now.onMessageReceived(this.now.name, message);
};
