var fs = require('fs'),
    http = require('http'),
    

    server = http.createServer(function(request, response)
    {
        var filePath = '.' + request.url;

        if (filePath == './') filePath = './index.html';

        fs.exists(filePath, function(exists)
        {
            if (exists)
            {
                fs.readFile(filePath, function(error, content)
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
            else
            {
                response.writeHead(404);
                response.end();
            }
        });
    }
);

server.listen(process.env.PORT || 8080);

var everyone = require("now").initialize(server);

everyone.now.distributeMessage = function(message, color)
{
    // this.now refers to the `now` of the caller's scope
    everyone.now.receiveMessage(this.now.name, message, color);
};
