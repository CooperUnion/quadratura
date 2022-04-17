//TODO: read docker status

//app setup and auth
const express = require("express");
const app = express();
const exphbs  = require('express-handlebars');

//handlebars interception of .html files for custom rendering
app.engine('html', exphbs({extname: '.html'}));
app.set('view engine', 'html');

app.use(express.static("public"));


const index = express.Router()
// index.use(indexRouter)
index.get('/', (req, res)=>{
    res.end("ok")
})
 
//attach routers
app.use('/', index)

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
