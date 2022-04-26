import createCard from './card.js'
const card = createCard()

const title = document.createElement('h2')
title.classList.add('mdl-card__title-text')
title.innerText = 'Quadratura Control Panel'

const materialTitle = document.createElement('div')
materialTitle.classList.add('mdl-card__title')
materialTitle.appendChild(title)
card.appendChild(materialTitle)
export default card