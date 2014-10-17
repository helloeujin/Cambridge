L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

var map = L.map('map', {
	minZoom: 2,
	maxZoom: 18
}).setView([40.7590615,-73.969231], 12);

// var base_layer = L.mapbox.tileLayer('examples.map-20v6611k').addTo(map); // grey 
// ('examples.map-zswgei2n'); // color
// ('examples.map-20v6611k'); // grey 
// ('examples.map-h67hf2ic'); // white
// ('examples.map-2k9d7u0c'); // satellite
// ('examples.map-y7l23tes'); // dark
// ('examples.map-h68a1pf7'); // pink
// ('examples.map-8ced9urs'); // black & white

var base_layer = L.mapbox.tileLayer('examples.map-2k9d7u0c').addTo(map);
// base_layer.addTo(map);

base_layer.setOpacity(0.4);

var lats = d3.map();
var lons = d3.map();
var len;

var done = 0;
var path;


queue() // upload data using queue 
    .defer(d3.json, "openpaths_meggonagul.json")
    .await(ready);

var j = 0;

function ready(error, data) {
    path = data;
    done = 1;
    len = data.length;
    // console.log(data.length);

    tick();
}


var myIcon = L.icon({
    iconUrl: '/img/texture.png',
    iconSize: [19, 19],
    opacity: 1
});

var polyline_options = {
    color: 'rgba(255,255,255,0.5)',
    weight: 1
};

var polyline = L.polyline([], polyline_options).addTo(map);
var marker = L.marker([40.7590615,-73.969231], {icon: myIcon}).addTo(map);

function tick() {
    // console.log(len);
    // console.log(done);
    if(done == 1) {
        var lat = path[j].lat;
        var lon = path[j].lon;

        polyline.addLatLng(L.latLng(lat, lon));
        marker.setLatLng(L.latLng(lat, lon));

        if (++j < len) setTimeout(tick, 20);
    }

    // if(j > len) j = 0;
}


