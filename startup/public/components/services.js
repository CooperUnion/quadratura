import card from './card.js'

const services = await fetch('/services').then(r=>r.json())
const list = document.createElement('ul')
list.classList.add('demo-list-control','mdl-list')

for(let serviceData of services) {

  const { service, url } = serviceData
  const index = services.indexOf(serviceData)

  const statusRequest = await fetch(`/status/${service}`)
    .then(r=>parseInt(r.status))
    .catch(console.log)

  const status = statusRequest === 200
  
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

card.appendChild(list)

export default card