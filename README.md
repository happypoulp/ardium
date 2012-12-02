# Just a client for an Arduino Demo.

## 1) "npm install" will install required dependencies :

- nowjs
- johnny-five
- socket.io-client

## 2) Connect your Arduino (with StandardFirmata 2.2 on it)

On the board, there should be:

- N buttons (representing the other client you want to reach) associated to N Led (Led X acknoledge message of button X and turn ON/OFF as the button is DOWN/UP)

Buttons should be connected to digital pins 13 to 10.
Leds should be connected to digital pins 9 to 6.

Buttons and Led will be associated (automatically) by the client like this:

BUTTONS... 13 12 11 10
           |  |  |  |
LEDS.......9  8  7  6