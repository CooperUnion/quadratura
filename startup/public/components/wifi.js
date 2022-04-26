import card from './card.js'
import loader from './components/loader.js'


const accesspoints = await fetch('/wifi').then(r=>r.json())
console.log(accesspoints)

const wifiTitle = document.createElement('h2')
wifiTitle.classList.add('mdl-card__title-text')
wifiTitle.innerText = 'Wifi Access Points'

const materialWifiTitle = document.createElement('div')
materialWifiTitle.classList.add('mdl-card__title')
materialWifiTitle.appendChild(wifiTitle)

const materialAPList = document.createElement('ul')
materialAPList.classList.add('demo-list-item','mdl-list')

accesspoints.forEach((ap)=>{
  const li = document.createElement('li')
  li.innerText = ap
  li.classList.add('mdl-list__item')
  materialAPList.appendChild(li)
})

const addApForm = document.createElement('form')
addApForm.setAttribute('style','padding:16px;')

const addAp = document.createElement('div')
addAp.classList.add('mdl-textfield','mdl-js-textfield')

const apName = document.createElement('input')
apName.classList.add('mdl-textfield__input')
apName.setAttribute('type','text')
apName.setAttribute('id','ssid')
const apNameLabel = document.createElement('label')
apNameLabel.classList.add('mdl-textfield__label')
apNameLabel.setAttribute('for','ssid')
apNameLabel.innerText = 'Access Point SSID'


const addPass = document.createElement('div')
addPass.classList.add('mdl-textfield','mdl-js-textfield')

const apPass = document.createElement('input')
apPass.classList.add('mdl-textfield__input')
apPass.setAttribute('type','text')
apPass.setAttribute('id','passphrase')
const apPassLabel = document.createElement('label')
apPassLabel.classList.add('mdl-textfield__label')
apPassLabel.setAttribute('for','passphrase')
apPassLabel.innerText = 'Passphrase'

const submitAp = document.createElement('input')
submitAp.setAttribute('type','submit')
submitAp.setAttribute('name','add')
submitAp.setAttribute('value','Add Access Point')
submitAp.classList.add('mdl-button','mdl-js-button','mdl-button--raised','mdl-js-ripple-effect','mdl-button--accent')
submitAp.addEventListener('click', async (e)=>{
  e.preventDefault()
  apName.setAttribute('disabled','true')
  apPass.setAttribute('disabled','true')
  submitAp.setAttribute('disabled','true')
  loader.setAttribute('style','')

  snackbar.MaterialSnackbar.showSnackbar({
    message: 'Adding: Device will now reboot.',
    timeout: 5000
  })

  const ssid = document.querySelector('#ssid').value
  const passphrase = document.querySelector('#passphrase').value
  await fetch('/wifi', {
    method:'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ssid, passphrase})
  })
})

addAp.appendChild(apName)
addAp.appendChild(apNameLabel)
addPass.appendChild(apPass)
addPass.appendChild(apPassLabel)

addApForm.appendChild(addAp)
addApForm.appendChild(addPass)
addApForm.appendChild(submitAp)

card.appendChild(materialWifiTitle)
card.appendChild(loader)
card.appendChild(materialAPList)
card.appendChild(addApForm)

export default card