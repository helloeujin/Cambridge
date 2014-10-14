
L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

var southWest = L.latLng(42, -72.2),
    northEast = L.latLng(42.72, -70),
    bounds = L.latLngBounds(southWest, northEast);

// zoom level : 10 - 18
var map = L.map('map', {
	minZoom: 2,
	maxZoom: 18,
	maxBounds: bounds,
	zoomControl: false
}).setView([42.3783903-0.001,-71.1129096-0.013], 15);

// new L.Control.Zoom({ position: 'topright' }).addTo(map);

var base_layer = L.mapbox.tileLayer('examples.map-20v6611k'); // grey
// var base_layer = L.mapbox.tileLayer('examples.map-zswgei2n'); // color

var sewer_network = L.mapbox.tileLayer('meggonagul.z7pynwmi', {
	accessToken: L.mapbox.accessToken
});

sewer_network
	.addTo(map);

// base_layer
//     .setZIndex(0)
// 	.addTo(map);


// Generate a GeoJSON line. You could also load GeoJSON via AJAX
// or generate it some other way.

// var geojson = { type: 'LineString', coordinates: [] };
var geojson = { 
	type: 'LineString', 
	coordinates: [ [ -71.11572504043579, 42.37633182812836], [  -71.10735654830933, 42.378091320885694] ] 
};

var start = [ geojson.coordinates[0][0], geojson.coordinates[0][1]];
var end = [ geojson.coordinates[1][0], geojson.coordinates[1][1]];
// var momentum = [0.000001, 0.000001];

var tx = end[0] - start[0];
var ty = end[1] - start[1]; 

for (var i = 0; i < 280; i++) {
	start[0] += tx/280;
    start[1] += ty/280;

    geojson.coordinates.push(start.slice());
}

// Add this generated geojson object to the map.
// L.geoJson(geojson).addTo(map);

// // Create a counter with a value of 0.
var j = 0;

// Create a marker and add it to the map.
// var marker = L.marker([0, 0], {
//   icon: L.mapbox.marker.icon({
//     'marker-color': '#f86767'
//   })
// }).addTo(map);

var marker = L.circleMarker([0,0], {
    radius: 4,
    fillColor: 'white',
    fillOpacity: 1,
    weight: 10,
    color: '#fff'
    // opacity: 1
}).addTo(map);

tick();

function tick() {
    // Set the marker to be at the same point as one
    // of the segments or the line.
    marker.setLatLng(L.latLng(
        geojson.coordinates[j][1],
        geojson.coordinates[j][0]));

    // Move to the next point of the line
    // until `j` reaches the length of the array.
    if (++j < geojson.coordinates.length) setTimeout(tick, 2);

    if(j>280) j = 0;
}


/////////////////////////////////////////////////////////////////////////
// for getting coordinates
/////////////////////////////////////////////////////////////////////////


// var coordinates = document.getElementById('coordinates');

// var marker2 = L.marker([42.3783903-0.001,-71.1129096-0.013], {
//     icon: L.mapbox.marker.icon({
//       'marker-color': '#f86767'
//     }),
//     draggable: true
// }).addTo(map);

// // every time the marker is dragged, update the coordinates container
// marker2.on('dragend', ondragend);

// // Set the initial marker coordinate on load.
// ondragend();

// function ondragend() {
//     var m = marker2.getLatLng();
//     coordinates.innerHTML = 'Latitude: ' + m.lat + '<br />Longitude: ' + m.lng;
// }

