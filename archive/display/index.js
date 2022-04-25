const p5 = require('node-p5');
const {Buffer} = require('buffer');

function sketch(p) {
    p.setup = () => {
        let canvas = p.createCanvas(320, 240);
        setTimeout(() => {

            // p.loadPixels()
            // console.log(p.pixels)

            // process.stdout.write(Buffer.from(canvas.canvas.toDataURL()))            
            process.stdout.write(canvas.canvas.toDataURL())            
        }, 100);
    }
    p.draw = () => {
        p.background(200);
        p.text('hello world!', 50, 100);
        p.text(Math.round(Math.random()*1000), 50, 150)
    }
}

let p5Instance = p5.createSketch(sketch);