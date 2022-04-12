const p5 = require('node-p5');

//Artwork by Ricky Yurewitch
//https://editor.p5js.org/Ricky1280/sketches/sfAlfsPlF

let zoom = 2.5
let it = 0;
let it2 = 0
let anything = 0;
let frameCountDiv = 320
let width = 320
let height = 240
let offsetx = width/25
let offsety = height/25
let canvas
let fps = 60

function sketch(p) {
    p.setup = () => {
        canvas = p.createCanvas(320, 240);

        p.colorMode('HSB')
        p.rectMode('CENTER')
        p.frameRate(fps)
        p.stroke(0)
        p.noFill()

    }
    p.draw = () => {
        p.background("white");
        for (let i=0; i<height/2.7;i=i+10) {
            for (let j=0; j<width/2.7;j=j+10) {
                let ellipseScale = Math.cos(i*j)*(p.sin(it)*p.cos(it)*10)+p.sin(it)*zoom
                    // 0 to 1 over time in a wave that increments at the end of the for loop
                    // * scale by that ^
        
                let frameScale = 5*(1*(Math.abs(ellipseScale * p.sin( p.frameCount/frameCountDiv + i * anything ) * p.cos( p.frameCount/frameCountDiv * 0.5 + j * anything ) * 8 )))
            
                p.fill(frameScale+80, frameScale, frameScale);
                p.noStroke()
            
                p.rect(j*zoom+offsetx, 
                    i*zoom+offsety, 
                    ellipseScale * p.sin( p.frameCount/frameCountDiv + i * anything ) * p.cos( p.frameCount/frameCountDiv * 0.5 + j * anything ) * 4 + 10, 
                    ellipseScale * p.sin( p.frameCount/frameCountDiv + i * anything ) * p.cos( p.frameCount/frameCountDiv * 0.5 + j * anything ) * 4 + 10, 
                    100/((Math.abs(ellipseScale * p.sin( p.frameCount/frameCountDiv + i * anything ) * p.cos( p.frameCount/frameCountDiv * 0.5 + j * anything ) * 4 + 10))));
            }
        }
  
        it = (it+p.PI/280)
        it2 = p.sin(it)
        anything = anything+0.0002
	console.log(canvas.canvas.toDataURL())
    }
}
let p5Instance = p5.createSketch(sketch);
