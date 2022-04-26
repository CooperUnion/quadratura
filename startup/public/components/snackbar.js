const snackbar = document.createElement('div')
snackbar.classList.add('mdl-js-snackbar','mdl-snackbar')
const snackbarText = document.createElement('div')
snackbarText.classList.add('mdl-snackbar__text')
const snackbarAction = document.createElement('button')
snackbarAction.classList.add('mdl-snackbar__action')
snackbar.appendChild(snackbarText)
snackbar.appendChild(snackbarAction)

export default snackbar