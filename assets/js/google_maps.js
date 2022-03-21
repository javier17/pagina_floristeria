/**
 * Google Maps
 */

var map;
function initMap() {
  var myLatLng = {lat: 34.048233, lng:  -118.256015};
  
  var styleArray = [
    {
        "featureType": "administrative.neighborhood",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    }
  ]

  var mapOptions = {
    zoom: 14,
    center: myLatLng,
    styles: styleArray,
    scrollwheel: false
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  var image = 'assets/img/map_marker.png';
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    icon: image,
    title: 'Groggery'
  });
  
};