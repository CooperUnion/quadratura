function createCard () {

  const materialCard = document.createElement('div')
  materialCard.classList.add('demo-card-wide','mdl-card','mdl-shadow--2dp')  
  
  return materialCard
}

export default createCard()