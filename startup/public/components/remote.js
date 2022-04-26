import card from './card.js'

const remote = document.createElement('a')
remote.setAttribute('href','/edit')
remote.innerText = "Edit your project"
remote.classList.add('mdl-button','mdl-js-button','mdl-button--raised','mdl-js-ripple-effect','mdl-button--accent')

card.appendChild(remote)
export default card