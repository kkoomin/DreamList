
function initMap() {
    var center = new google.maps.LatLng(34.972129, 19.7774483);

    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 2.3,
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

    map.addListener('click', function(e) {
        // console.log(e.latLng.lat())
        placeMarkerAndPanTo(e.latLng, map);
      });
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

  function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    // map.panTo(latLng);
  }