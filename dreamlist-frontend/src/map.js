let map

function initMap() {
    var center = new google.maps.LatLng(34.972129, 19.7774483);

    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 2.4,
      zoomControl: false,
      fullscreenControl: false
    });

    // var coordInfoWindow = new google.maps.InfoWindow();
    // coordInfoWindow.setContent(createInfoWindowContent(center, map.getZoom()));
    // coordInfoWindow.setPosition(center);
    // coordInfoWindow.open(map);

    // map.addListener('zoom_changed', function() {
    //   coordInfoWindow.setContent(createInfoWindowContent(center, map.getZoom()));
    //   coordInfoWindow.open(map);
    // });

    // map.addListener('click', function(e) {
    //     placeMarkerAndPanTo(e.latLng, map);
    //   });
}


  var TILE_SIZE = 256;

  function createInfoWindowContent(latLng, zoom) {
    var scale = 1 << zoom;

    var worldCoordinate = project(latLng);

    var pixelCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale),
        Math.floor(worldCoordinate.y * scale));

    var tileCoordinate = new google.maps.Point(
        Math.floor(worldCoordinate.x * scale / TILE_SIZE),
        Math.floor(worldCoordinate.y * scale / TILE_SIZE));

    return [
      'LatLng: ' + latLng,
      'Zoom level: ' + zoom,
      'World Coordinate: ' + worldCoordinate,
      'Pixel Coordinate: ' + pixelCoordinate,
      'Tile Coordinate: ' + tileCoordinate
    ].join('<br>');
  }

  function project(latLng) {
    var siny = Math.sin(latLng.lat() * Math.PI / 180);

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);

    return new google.maps.Point(
        TILE_SIZE * (0.5 + latLng.lng() / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
  }

  function placeMarkerAndPanTo(destinationInfo, latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    marker.addListener('click',function(){
      const infoWindow = createInfoWindow(destinationInfo)
      infoWindow.open(map,marker)
      infoWindow.addListener('domready', () => {
        console.log('infowindow domready')
          const button = document.querySelector(`#add-Btn-${destinationInfo[0].id}`)
          button.addEventListener('click', (e)=>addToList(e))
      })
    })
  }

  function addToList(e){
    const destination_id = parseInt(e.target.id.split('-')[e.target.id.split('-').length-1])
    const user_id = '' //////////////////TO BE CHANGED ONCE WE BUILD IN THE USER ROUTE!!!!!!

    fetch('http://localhost:3000/add-destination', {
      method: 'POST',
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({destination_id,user_id})})
      .then(res => res.json())
      .then(val => console.log(val))
      .then(sth => window.alert('added'))

  }

  function createInfoWindow(destinationInfo){
    const destinationObject = destinationInfo[0]
    const destinationBuzzwords = destinationInfo[1]
    const content = `<h6>${destinationObject.name}</h6>` + `<p>A city in ${destinationObject.country}, weather is ${destinationObject.weather}, and is suitable for travelers looking ${destinationBuzzwords}.</p>` +  `<button class="btn btn-success btn-sm add" id="add-Btn-${destinationObject.id}">Add to dreamlist</button>`
    const infoWindow = new google.maps.InfoWindow({
      content: content
    })
    return infoWindow
  }

  function mapSearchResult(lanlng_arrays){
    let i = 0;
    const times = lanlng_arrays.length
    if (times == 0) {
      window.alert('no match')
    }
    else {
      function mapLoop(){
        setTimeout(()=>{
          let latLng = new google.maps.LatLng(parseFloat(lanlng_arrays[i][2]), parseFloat(lanlng_arrays[i][3]))
          let destinationInfo = [lanlng_arrays[i][0],lanlng_arrays[i][1]]
          placeMarkerAndPanTo(destinationInfo, latLng, map)
          i++
          if (i<times) {mapLoop()}
        },750)
      }
      mapLoop()
    }
  }
