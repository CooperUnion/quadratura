const five = require('johnny-five');
const Oled = require('oled-js');

const board = new five.Board();

board.on('ready', () => {
  console.log('Connected to Arduino, ready.');

  const opts = {
    width: 128,
    height: 64,
    secondaryPin: 12
  };

  const oled = new Oled(board, five, opts);
  // do cool oled things here
});
