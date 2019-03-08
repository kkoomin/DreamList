const listEl = document.querySelector('#dreamlistbox')
const apiKey = "563492ad6f91700001000001c18533741b8a4f53b6ae2ee3056cf5fd"
// 9
//https://i.pinimg.com/originals/95/bf/d4/95bfd42f1c50096a64fdb56350cceb4e.jpg
renderDreamList()

async function renderDreamList(){
  listEl.innerHTML = ""
  const userDreamlist = await fetchDreamList(sessionStorage.user_id)
  userDreamlist.forEach((cityObject)=>{
    renderSingleDestination(cityObject)
  })
}

async function renderSingleDestination(cityObject){
  const cityEl = document.createElement('div')
  cityEl.classList = 'dreamlist shadow p-3 mb-5 bg-white rounded'
  const cityPicture = await fetchpicture(cityObject.name)
  // const cityPicture = "https://i.pinimg.com/originals/95/bf/d4/95bfd42f1c50096a64fdb56350cceb4e.jpg"

  cityEl.innerHTML =
  `<div class="dreamlist-picture" >
  <img class="center-fit" src=${cityPicture} style="z-index: -1">
  <div class="picture-label"><h3>${cityObject.name}<h3></div>
  </div>
  `
  listEl.appendChild(cityEl)
}

function fetchDreamList(user_id){
  return fetch(`http://localhost:3000/users/${user_id}/listDestinations`)
    .then (res=>res.json())
}

function fetchpicture (word){
  console.log(word)
  const pictureAPIurl = `https://api.pexels.com/v1/search?query=${word}&per_page=1&page=2`
  return fetch(pictureAPIurl, {
    headers: {
      Authorization: `${apiKey}`
    }
  })
  .then(res => {
      console.log(res)
      return res.json()})
    .then (val => {
      console.log(val)
      if (val.photos.length===0) {
        return 36717
      }
      else {
        return val.photos[0].id
      }
    })
    .then (photoId => {
      return fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
        headers: {
          Authorization: `${apiKey}`
        }
      })
    })
    .then(res => res.json())
    .then (val => {console.log(val); return val.src.landscape})
}
