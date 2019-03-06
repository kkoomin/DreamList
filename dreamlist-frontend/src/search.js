const searchForm = document.querySelector('#search-form')
const buzzwordInput = document.querySelector('input#buzzword')
const priceLow = document.querySelector('#priceLow')
const priceLowMenu = document.querySelector('#priceLowMenu')
const priceHigh = document.querySelector('#priceHigh')
const priceHighMenu = document.querySelector('#priceHighMenu')
const weatherInput = document.querySelector('#weather')
const weatherMenu = document.querySelector('#weatherMenu')

priceLowMenu.addEventListener('click', e=>{
  priceLow.innerText = event.target.innerText
})

priceHighMenu.addEventListener('click', e=>{
  priceHigh.innerText = event.target.innerText
})

weatherMenu.addEventListener('click', e=>{
  weatherInput.innerText = event.target.innerText
})

searchForm.addEventListener('submit', showResult)

function showResult(){
  event.preventDefault()
  const lowPrice = priceLow.innerText.length
  const highPrice = priceHigh.innerText.length
  const buzzword = buzzwordInput.value
  const weather = weatherInput.innerText
  getSearchResults(buzzword,lowPrice,highPrice,weather)
    .then(latlng_array => mapSearchResult(latlng_array))
  event.target.reset()
}

function getSearchResults(buzzword,pricelow,pricehigh,weather){
  return fetch('http://localhost:3000/searchresult', {
    method: 'POST',
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({buzzword,pricelow,pricehigh,weather})})
    .then(res => res.json())
}
