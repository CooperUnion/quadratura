
window.onload = async ()=>{

  const services = await fetch('/services').then(r=>r.json())
  const list = document.createElement('ul')

  for(let serviceData of services) {

    const { service, url } = serviceData
    const status = await fetch(`/status/${service}`).then(r=>parseInt(r.status)) === 200

    const statusItem = document.createElement('input')
    statusItem.setAttribute('type', 'checkbox')
    statusItem.setAttribute('name', service)
    statusItem.checked = status

    statusItem.addEventListener('change', async (e)=>{
      await fetch(`/${e.target.checked ? 'start' : 'stop'}/${e.target.name}`)
      window.location.reload()
    })

    const statusLabel = document.createElement('span')
    statusLabel.innerHTML = url !== undefined && status
      ? `<a href="${url}">${service}</a> is ${ status ? 'running':'not running'}`
      : `${service} is ${ status ? 'running' : 'not running'}`
    statusLabel.classList.add(status ? 'online' : 'offline')

    const item = document.createElement('li')
    item.appendChild(statusLabel)
    item.appendChild(statusItem)
    list.appendChild(item)
  }

  document.querySelector("body").appendChild(list)

}

