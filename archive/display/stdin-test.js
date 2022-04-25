#!/usr/bin/env node
const {Buffer} = require("buffer")
const {decode} = require('image-data-uri')
 
if (process.stdin.isTTY) {
  // do readline stuff here
} else {
  var buf = '';
  process.stdin.on('data', function(d) {
    buf += d;
  }).on('end', function() {
    const newbuf = Buffer.from(buf)
    // do something with buffered text in `buf`
  // const dataUrl = bufferToDataUrl("image/png", buf)
    console.log("final output", decode(buf).dataBuffer)
  })
}