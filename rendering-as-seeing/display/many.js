const p5 = require('node-p5');
const {Buffer} = require('buffer');

function sketch(p) {

    function outputBase64(canvas) {
      try {
        // return process.stdout.write(canvas.canvas.toDataURL())
        return console.log(canvas.canvas.toDataURL())
      } catch (e) {
        console.log(e)
      }
    }

    p.setup = () => {
        let canvas = p.createCanvas(320, 240);
        setInterval(() => {
            outputBase64(canvas)
        }, 33.3);
    }
    p.draw = () => {
        p.background(200);
        p.text('hello world!', 50, 100);
        p.text(Math.round(Math.random()*1000), 50, 150)
    }
}

let p5Instance = p5.createSketch(sketch);