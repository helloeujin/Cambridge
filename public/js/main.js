
L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

var southWest = L.latLng(42, -72.2),
    northEast = L.latLng(42.72, -70),
    bounds = L.latLngBounds(southWest, northEast);

// zoom level : 10 - 18
var map = L.map('map', {
	minZoom: 10,
	maxZoom: 15,
	maxBounds: bounds,
	zoomControl: false
}).setView([42.3783903+0.001,-71.1129096-0.028], 14);

// new L.Control.Zoom({ position: 'topright' }).addTo(map);

// var base_layer = L.mapbox.tileLayer('examples.map-20v6611k').addTo(map); // grey 
// ('examples.map-zswgei2n'); // color
// ('examples.map-20v6611k'); // grey 
// ('examples.map-h67hf2ic'); // white
// ('examples.map-2k9d7u0c'); // satellite
// ('examples.map-y7l23tes'); // dark
// ('examples.map-h68a1pf7'); // pink
// ('examples.map-8ced9urs'); // black & white

var base_layer = L.mapbox.tileLayer('examples.map-2k9d7u0c');
base_layer.setOpacity(0.1);
base_layer.addTo(map);


// blue: meggonagul.z7pynwmi
// white: meggonagul.c1dlhaor
var sewer_network = L.mapbox.tileLayer('meggonagul.c1dlhaor', {
	accessToken: L.mapbox.accessToken
});

sewer_network.setOpacity(0.15);
sewer_network.addTo(map);
// base_layer.setZIndex(0).addTo(map);

// Generate a GeoJSON line. You could also load GeoJSON via AJAX
// or generate it some other way.

// var geojson = { type: 'LineString', coordinates: [] };

var geojson = { 
	type: 'LineString', 
	coordinates: [ [ -71.11572504043579, 42.37633182812836], [  -71.10735654830933, 42.378091320885694] ] 
};

var start = [ geojson.coordinates[0][0], geojson.coordinates[0][1]];
var end = [ geojson.coordinates[1][0], geojson.coordinates[1][1]];



var tx = end[0] - start[0];
var ty = end[1] - start[1]; 

var size = 320;

for (var i = 0; i < size; i++) {
	start[0] += tx/size;
    start[1] += ty/size;

    geojson.coordinates.push(start.slice());
}

var j = 0;

var myIcon = L.icon({
    iconUrl: '/img/texture.png',
    iconSize: [19, 19]
});

var polyline_options = {
    color: 'rgba(255,255,255,0.3)',
    // color: '#1b4c5a',
    // opacity: 1,
    weight: 1
};

var marker = L.marker([0,0], {icon: myIcon}).addTo(map);
var polyline = L.polyline([], polyline_options).addTo(map);

tick();
// console.log(j);

function tick() {
    var lat = geojson.coordinates[j][1];
    var lon = geojson.coordinates[j][0];

    
    // polyline.addLatLng(L.latLng(lat, lon));
    // marker.setLatLng(L.latLng(lat, lon));

    polyline.addLatLng(L.latLng(lat, lon));
    marker.setLatLng(L.latLng(lat, lon));
    // console.log(j);

    // getTail(geojson.coordinates[j][1], geojson.coordinates[j][0]);

    if (++j < geojson.coordinates.length) setTimeout(tick, 2);

    // if(j>size) j = 0;
}




// // make tail
// var polyline_options = {
//         color: '#999',
//         // color: 'red',
//         weight: 4,
//         opacity: 0.4
//     };

// var polyline = L.polyline([], polyline_options).addTo(map);

// function getTail(lat, lon) {
//     // console.log(lat +","+lon);

//     if(j  > 15 && j < 279 ) { 
//         var p_lat = geojson.coordinates[j-14][1];
//         var p_lon = geojson.coordinates[j-14][0];

//         var line_points = [
//             [ lat, lon ],
//             [ p_lat, p_lon]
//         ]; 

//         // console.log(j);

//         // console.log(line_points);

//         polyline.setLatLngs(line_points);
//     }
// }







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

