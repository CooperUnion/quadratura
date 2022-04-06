const p5 = require('node-p5');
const {Buffer} = require('buffer');

function sketch(p) {

    function streamBase64(canvas) {
      try {
        // buffer
        // return console.log(Buffer.from(canvas.canvas.toDataURL()))
        // base64
        return console.log(canvas.canvas.toDataURL())
        // return console.log("test")
      } catch (e) {
        console.log(e)
      }
    }

    p.setup = () => {
        let canvas = p.createCanvas(320, 240);
        setInterval(() => {

            // p.loadPixels()
            // console.log(p.pixels)

            // console.log(canvas.canvas.toDataURL())
            streamBase64(canvas)
        }, 000);
    }
    p.draw = () => {
        p.background(200);
        p.text('hello world!', 50, 100);
        p.text(Math.round(Math.random()*1000), 50, 150)
    }
}

let p5Instance = p5.createSketch(sketch);