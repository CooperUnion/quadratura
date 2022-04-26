import createCard from './card.js'
import loader from './loader.js'
import snackbar from './snackbar.js'

const card = createCard()

const remote = document.createElement('a')
remote.setAttribute('href','/edit')
remote.innerText = "Edit your project"
remote.classList.add('mdl-button','mdl-js-button','mdl-button--raised','mdl-js-ripple-effect','mdl-button--accent')
remote.setAttribute('style','margin-top:15px;')

const url = await fetch('/remote')
  .then(r=>r.json())
  .then(r=>r.url)

const remoteTitle = document.createElement('h2')
remoteTitle.classList.add('mdl-card__title-text')
remoteTitle.innerText = 'Remote Sketch Url'

const materialRemoteTitle = document.createElement('div')
materialRemoteTitle.classList.add('mdl-card__title')
materialRemoteTitle.appendChild(remoteTitle)

const materialRemoteList = document.createElement('ul')
materialRemoteList.classList.add('demo-list-item','mdl-list')

const li = document.createElement('li')
li.innerText = url
li.classList.add('mdl-list__item')
materialRemoteList.appendChild(li)

const updateRemoteForm = document.createElement('form')
updateRemoteForm.setAttribute('style','padding:16px;')

const updateRemote = document.createElement('div')
updateRemote.classList.add('mdl-textfield','mdl-js-textfield')

const updateUrl = document.createElement('input')
updateUrl.classList.add('mdl-textfield__input')
updateUrl.setAttribute('type','text')
updateUrl.setAttribute('id','url')
const updateUrlLabel = document.createElement('label')
updateUrlLabel.classList.add('mdl-textfield__label')
updateUrlLabel.setAttribute('for','url')
updateUrlLabel.innerText = 'Remote sketch url'


const submitUrl = document.createElement('input')
submitUrl.setAttribute('type','submit')
submitUrl.setAttribute('name','add')
submitUrl.setAttribute('value','Update remote sketch url')
submitUrl.classList.add('mdl-button','mdl-js-button','mdl-button--raised','mdl-js-ripple-effect','mdl-button--accent')
submitUrl.addEventListener('click', async (e)=>{
  e.preventDefault()
  updateUrl.setAttribute('disabled','true')
  submitUrl.setAttribute('disabled','true')
  loader.setAttribute('style','')

  snackbar.MaterialSnackbar.showSnackbar({
    message: 'Updating remote sketch url.',
    timeout: 5000
  })

  const updatedUrl = document.querySelector('#url').value
  const updatingUrl = await fetch('/remote', {
    method:'post',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({url:updatedUrl})
  }).then(r=>parseInt(r.status))

  if(updatingUrl === 200) {
    loader.setAttribute('style','visibility:hidden;')
    snackbar.MaterialSnackbar.showSnackbar({
      message: 'Fetching latest sketch.js file',
      timeout: 5000
    })

    const updatingSketch = await fetch('/remote/fetch')
      .then(r=>parseInt(r.status))

    if(updatingSketch.status===200) {
      snackbar.MaterialSnackbar.showSnackbar({
        message: 'Latest sketch.js file updated successfull.',
        timeout: 5000
      })
      setTimeout(()=>{
        window.location.reload()
      }, 5000)
    } else {
      snackbar.MaterialSnackbar.showSnackbar({
        message: 'Latest sketch.js file failed. Please try again.',
        timeout: 5000
      })
    }
  }
})

updateRemote.appendChild(updateUrl)
updateRemote.appendChild(updateUrlLabel)

updateRemoteForm.appendChild(updateRemote)
updateRemoteForm.appendChild(submitUrl)
updateRemoteForm.appendChild(remote)

card.appendChild(materialRemoteTitle)
card.appendChild(loader)
card.appendChild(materialRemoteList)
card.appendChild(updateRemoteForm)


export default card