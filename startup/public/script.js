
window.onload = async ()=>{

  const services = await fetch('/services').then(r=>r.json())
  const list = document.createElement('ul')
  list.classList.add('demo-list-control','mdl-list')

  const materialCard = document.createElement('div')
  materialCard.classList.add('demo-card-wide','mdl-card','mdl-shadow--2dp')

  const title = document.createElement('h2')
  title.classList.add('mdl-card__title-text')
  title.innerText = 'Quadratura Control Panel'

  const materialTitle = document.createElement('div')
  materialTitle.classList.add('mdl-card__title')
  materialTitle.appendChild(title)

  const codeserver = document.createElement('a')
  codeserver.setAttribute('href','/edit')
  codeserver.innerText = "Edit your project"
  codeserver.classList.add('mdl-button','mdl-js-button','mdl-button--raised','mdl-js-ripple-effect','mdl-button--accent')


  for(let serviceData of services) {

    const { service, url } = serviceData
    const index = services.indexOf(serviceData)

    const status = await fetch(`/status/${service}`).then(r=>parseInt(r.status)) === 200

    const materialItemContainer = document.createElement('span')
    materialItemContainer.classList.add('mdl-list__item-secondary-action')

    const materialItemLabel = document.createElement('label')
    materialItemLabel.classList.add('mdl-switch','mdl-js-switch','mdl-js-ripple-effect')
    materialItemLabel.setAttribute('for', `${service}-${index}`)

    const statusItem = document.createElement('input')
    statusItem.setAttribute('type', 'checkbox')
    statusItem.setAttribute('name', service)
    statusItem.setAttribute('id',`${service}-${index}`)
    statusItem.checked = status
    statusItem.classList.add('mdl-switch__input')

    statusItem.addEventListener('change', async (e)=>{
      await fetch(`/${e.target.checked ? 'start' : 'stop'}/${e.target.name}`)
      window.location.reload()
    })

    const statusLabel = document.createElement('span')
    statusLabel.innerHTML = url !== undefined && status
      ? `<a href="${url}">${service}</a> is ${ status ? 'running':'not running'}`
      : `${service} is ${ status ? 'running' : 'not running'}`
    statusLabel.classList.add(status ? 'online' : 'offline')

    const materialStatusContainer = document.createElement('span')
    materialStatusContainer.classList.add('mdl-list__item-primary-content') 
    materialStatusContainer.appendChild(statusLabel)

    const item = document.createElement('li')
    item.classList.add('mdl-list__item')

    materialItemLabel.appendChild(statusItem)
    materialItemContainer.appendChild(materialItemLabel)

    item.appendChild(materialStatusContainer)
    item.appendChild(materialItemContainer)
    list.appendChild(item)
  }

  materialCard.appendChild(materialTitle)
  materialCard.appendChild(codeserver)
  materialCard.appendChild(list)




  const loader = document.createElement('div')
  const snackbar = document.createElement('div')
  snackbar.classList.add('mdl-js-snackbar','mdl-snackbar')
  const snackbarText = document.createElement('div')
  snackbarText.classList.add('mdl-snackbar__text')
  const snackbarAction = document.createElement('button')
  snackbarAction.classList.add('mdl-snackbar__action')
  snackbar.appendChild(snackbarText)
  snackbar.appendChild(snackbarAction)


  loader.classList.add('mdl-progress','mdl-js-progress','mdl-progress__indeterminate')
  loader.setAttribute('style','visibility:hidden')

  const accesspoints = await fetch('/wifi').then(r=>r.json())
  console.log(accesspoints)

  const materialWifiCard = document.createElement('div')
  materialWifiCard.classList.add('demo-card-wide','mdl-card','mdl-shadow--2dp')

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

  materialWifiCard.appendChild(materialWifiTitle)
  materialWifiCard.appendChild(loader)
  materialWifiCard.appendChild(materialAPList)
  materialWifiCard.appendChild(addApForm)



  const body = document.querySelector('body')
  body.appendChild(materialCard)
  body.appendChild(materialWifiCard)
  body.appendChild(snackbar)
  componentHandler.upgradeDom()
}

