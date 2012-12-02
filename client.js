var serverAdress = 'http://ardium.herokuapp.com/'
    , nowjsClientLibPath = 'now/lib/nodeclient/now.js'
    , nowjs = require(nowjsClientLibPath)
    , now = nowjs.nowInitialize(serverAdress);

console.log('Initializing nowjs socket with ' + serverAdress + '...');

now.ready(function()
{
    console.log('Ready ;)');

    now.name = 'Francois';

    now.receiveMessage = function(name, message)
    {
        console.log('received', name, message);
    }

    now.distributeMessage('Test: ' + new Date());
});