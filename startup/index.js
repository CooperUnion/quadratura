//app setup and auth
import express from 'express'
import exphbs from 'express-handlebars'
import { networkInterfaces} from 'os'
import { exec, execSync } from 'child_process'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()


const nets = networkInterfaces()
const address = nets.wlan0[0].address || 'localhost'

//handlebars interception of .html files for custom rendering
app.engine('html', exphbs({extname: '.html'}));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

class AccessPoints {
  constructor() {
    this.accessPoints = []
  }

  list() {
    try {
      const wpa = execSync('cat /etc/wpa_supplicant/wpa_supplicant.conf | grep "ssid"')
      const accessPoints = wpa
        .toString()
        .split('\n')
        .map((row)=>{
          return row
            .trim()
            .substring(6, row.length-2)
        })
        .filter((row)=>{
          if(row.length===0) return false
          if(row.substr(0,4)==='sid=') return false
          return true
        })
      return accessPoints
    } catch (e) {
      return []
    }
  }

  add(ssid, passphrase) {
    const network = `
    network={
	ssid="${ssid}"
	psk="${passphrase}"
	key_mgmt=WPA-PSK
        scan_ssid=1
    }`

    console.log(network.split('\n'))
    network.split('\n').forEach((line)=>{
      execSync(`sudo echo '${line}' >> /etc/wpa_supplicant/wpa_supplicant.conf`)
    })
    exec(`sudo reboot`)

    return network
  }
}

class Services {

  constructor() {
    this.services = [
     // {service:'codeserver','url':`http://${address}:8080`},
     // {service:'startup'},
     // {service:'display'}
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

index.get('/edit', (req, res)=>{
  return res.redirect(`http://${address}:8080`)
})

const accesspoints = new AccessPoints()
const wifi = express.Router()
const json = bodyParser.json()

wifi.get('/', (req, res)=>{
  res.end(JSON.stringify(accesspoints.list()))
})

wifi.post('/', json, (req, res)=>{
  const {ssid, passphrase} = req.body
  const network = accesspoints.add(ssid, passphrase)
  res.json({
    ssid,
    passphrase,
    network
  })
})

//attach routers
app.use('/wifi/', wifi)
app.use('/', index)

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
