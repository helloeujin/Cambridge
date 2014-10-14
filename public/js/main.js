L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

var southWest = L.latLng(42, -72.2),
    northEast = L.latLng(42.72, -70),
    bounds = L.latLngBounds(southWest, northEast);

// zoom level : 10 - 18
var map = L.map('map', {
	minZoom: 10,
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