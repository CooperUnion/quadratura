//TODO: read docker status

//app setup and auth
import express from 'express'
import exphbs from 'express-handlebars'
import { networkInterfaces} from 'os'
import { execSync } from 'child_process'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()


const nets = networkInterfaces()
const address = nets.wlan0[0].address || 'localhost'

//handlebars interception of .html files for custom rendering
app.engine('html', exphbs({extname: '.html'}));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));


class Services {

  constructor() {
    this.services = [
      {service:'codeserver','url':`http://${address}:8080`},
      {service:'startup'},
      {service:'quadratura'}
    ]
  }

  list() {
    return JSON.stringify(this.services)
  }

  status(service) {
    try {
      return execSync(`sudo systemctl status ${service}`)
    } catch(e) {
      return `Offline: service ${service} isn't running...`
    }
  }

  start(service) {
    execSync(`sudo systemctl start ${service}`)
    return this.status(service)
  }

  stop(service) {
    execSync(`sudo systemctl stop ${service}`)
    return this.status(service)
  }

}

const services = new Services()

const index = express.Router()
// index.use(indexRouter)

index.get('/', (req, res)=>{
  return res.redirect("/index.html")
})

index.get('/services', (req, res)=>{
  return res.end(services.list())
})

index.get('/start/:service', (req, res)=>{
  return res.end(services.start(req.params.service))
})

index.get('/stop/:service', (req, res)=>{
  return res.end(services.stop(req.params.service))
})

index.get('/status/:service', (req, res)=>{
  const status = services.status(req.params.service)
  if(!Buffer.isBuffer(status) && status.substr(0,7) === 'Offline') {
    return res.status(400).end(status)
  }
  return res.end(services.status(req.params.service))
})

//attach routers
app.use('/', index)

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
