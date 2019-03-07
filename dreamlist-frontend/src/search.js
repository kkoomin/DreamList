const searchForm = document.querySelector('#search-form')
const buzzwordInput = document.querySelector('input#buzzword')
const priceLow = document.querySelector('#priceLow')
const priceLowMenu = document.querySelector('#priceLowMenu')
const priceHigh = document.querySelector('#priceHigh')
const priceHighMenu = document.querySelector('#priceHighMenu')
const weatherInput = document.querySelector('#weather')
const weatherMenu = document.querySelector('#weatherMenu')
const searchDirectEl = document.querySelector('#searchDirect')

//////////// DROPDOWN SELECTOR //////////////////////////////////////
initiateSelectionList()
loadSelect2()

function loadSelect2(){
  $(document).ready(function() {
      $('.js-example-basic-single').select2();
  });
}

async function initiateSelectionList (){
  const list = await getWorldCities()
  list.forEach((city)=>{
    const optionEl = document.createElement('option')
    optionEl.innerText = `${city.name}, ${city.country}`
    optionEl.value =  `${city.id}`
    searchDirectEl.appendChild(optionEl)
  })
}

function getWorldCities(){
  return fetch('http://localhost:3000/destinations/worldcities')
    .then(res => res.json())
}

///////////// Search by criteria ///////////////////////////////////////////////
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
  if (searchDirectEl.value === "0") {
    const lowPrice = priceLow.innerText.length
    const highPrice = priceHigh.innerText.length
    const buzzword = buzzwordInput.value
    const weather = weatherInput.innerText
    getSearchResults(buzzword,lowPrice,highPrice,weather)
      .then(latlng_array =>mapSearchResult(latlng_array))
    event.target.reset()
  }
  else {
    const destinationId = parseInt(searchDirectEl.value)
    getSepecificCity(destinationId)
      .then(latlng_array => mapSearchResult(latlng_array))
    event.target.reset()
  }
}

function getSepecificCity(id){
  return fetch(`http://localhost:3000/searchresult/${id}`)
    .then(res => res.json())
}

function getSearchResults(buzzword,pricelow,pricehigh,weather){
  return fetch('http://localhost:3000/searchresult', {
    method: 'POST',
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({buzzword,pricelow,pricehigh,weather})})
    .then(res => res.json())
}
