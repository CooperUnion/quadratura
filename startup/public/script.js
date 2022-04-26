import title from './components/title.js'
import services from './components/services.js'
import snackbar from './components/snackbar.js'
import wifi from './components/wifi.js'

const body = document.querySelector('body')
body.appendChild(title)
body.appendChild(services)
body.appendChild(wifi)
body.appendChild(snackbar)
componentHandler.upgradeDom()
