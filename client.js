var serverAdress = 'http://ardium.herokuapp.com/'
    , nowjsClientLibPath = 'now/lib/nodeclient/now.js'
    , nowjs = require(nowjsClientLibPath)
    , now = nowjs.nowInitialize(serverAdress)
    , five = require("johnny-five");

console.log('Initializing nowjs socket with ' + serverAdress + '...');

now.ready(function()
{
    console.log('Ready ;)');

    var board = new five.Board()
        , leds = {}
        , buttons = {}
        , buttonHandler = function(eventType, buttonId)
        {
            return function()
            {
                console.log(eventType, buttonId);
                now.name = 'LED_' + (parseInt(buttonId.replace(/[A-Z_]+/, '')) - 4);
                now.sendAll(eventType == 'up' ? 'OFF' : 'ON');
            };
        };

    board.on("ready", function()
    {
        for (var i = 10 ; i <= 13 ; i++)
        {
            var buttonId = 'BUTTON_' + i;
            buttons[buttonId] = new five.Button(i);
            buttons[buttonId].on('down', buttonHandler('down', buttonId))
            buttons[buttonId].on('hold', buttonHandler('hold', buttonId))
            buttons[buttonId].on('up', buttonHandler('up', buttonId))
        }

        for (var i = 6 ; i <= 9 ; i++)
        {
            leds['LED_' + i] = new five.Led(i);
        }

        // board.repl.inject(leds);
        // board.repl.inject(buttons);
    });

    now.onMessageReceived = function(name, message)
    {
        console.log('received', name, message);

        if (leds[name])
        {
            return console.log('No Led associated to this name:', name);
        }

        // put the correponding Led ON
        if (message == 'ON')
        {
            leds[name].on();
        }
        // or OFF
        else if (message == 'OFF')
        {
            leds[name].off();
        }
    }
});
