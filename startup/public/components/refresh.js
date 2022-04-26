import snackbar from './snackbar.js'
const latest = document.createElement('div')

const action = document.createElement('button')
action.classList.add('mdl-button','mdl-js-button','mdl-button--raised','mdl-js-ripple-effect','mdl-button--accent')
action.setAttribute('style','margin-top: 15px')
action.innerText = 'Fetch the latest sketch.js file'
action.addEventListener('click', async function(e) {
  e.preventDefault()
  const status = await fetch('/remote/fetch?start=true')
    .then(r=>parseInt(r.status))

  const message = status === 200
    ? 'Latest sketch.js has been downloaded'
    : 'Error in downloading the latest file.'

    snackbar.MaterialSnackbar.showSnackbar({
      message,
      timeout: 5000
    })
})

latest.appendChild(action)




export default latest
