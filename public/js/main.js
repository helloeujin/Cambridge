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
// sewer_network.setZIndex(0).addTo(map);


/////////////////////////////////////////////////////////////////////////
// Creating trails
/////////////////////////////////////////////////////////////////////////

var destinations = { 
    type: 'LineString', 
    coordinates: [ 
        [ -71.10735654830933, 42.378091320885694 ],
        [ -71.11572504043579, 42.37633182812836 ],
        [ -71.11570358276367, 42.37538073043613 ],
        [ -71.11587524414062, 42.374493026260886 ],
        [ -71.11647605895995, 42.37274928510041 ],
        [ -71.11709833145142, 42.371401815589664 ],
        [ -71.11814975738525, 42.36964213541028 ],
        [ -71.11806392669678, 42.36938848375174 ],
        [ -71.1168622970581, 42.36834215983325 ],
        [ -71.11604690551758, 42.36640800003894 ],
        [ -71.1161756515503, 42.36266634158045 ],
        [ -71.11514568328856, 42.3616516161 ],
        [ -71.11433029174805, 42.36044660837456 ],
        [ -71.11450195312499, 42.35946355861491 ],
        [ -71.11321449279785, 42.35667288195273 ],
        [ -71.11081123352051, 42.35524578349561 ],
        [ -71.11081123352051, 42.355023787489614 ],
        [ -71.11209869384766, 42.353993081475146 ]
    ]
};

var destinations_2 = { 
    type: 'LineString', 
    coordinates: [ 
        [ -71.14750385284424, 42.37867780751619 ],
        [ -71.14595890045166, 42.37531732341116 ],
        [ -71.14475727081297, 42.37542828566284 ],
        [ -71.14274024963379, 42.375444137397075 ],
        [ -71.13844871520996, 42.37471495348106 ],
        [ -71.13679647445679, 42.37504784284085 ],
        [ -71.1319899559021, 42.374778361114195 ],
        [ -71.13201141357422, 42.37460398996901 ],
        [ -71.131432056427, 42.37428695028283 ],
        [ -71.13033771514893, 42.37436621035443 ],
        [ -71.12909317016602, 42.37425524622619 ],
        [ -71.12819194793701, 42.3740016131969 ],
        [ -71.12688302993774, 42.37333582162159 ],
        [ -71.12587451934814, 42.37262246567295 ],
        [ -71.12484455108643, 42.37160790103443 ],
        [ -71.12424373626709, 42.3706250259125 ],
        [ -71.12321376800537, 42.36967384179557 ],
        [ -71.11870765686035, 42.36959457580231 ],
        [ -71.11806392669678, 42.36938848375174 ],
        [ -71.1168622970581, 42.36834215983325 ],
        [ -71.11604690551758, 42.36640800003894 ],
        [ -71.1161756515503, 42.36266634158045 ],
        [ -71.11514568328856, 42.3616516161 ],
        [ -71.11433029174805, 42.36044660837456 ],
        [ -71.11450195312499, 42.35946355861491 ],
        [ -71.11321449279785, 42.35667288195273 ],
        [ -71.11081123352051, 42.35524578349561 ],
        [ -71.11081123352051, 42.355023787489614 ],
        [ -71.11209869384766, 42.353993081475146 ]
    ]
};

var destinations_3 = { 
    type: 'LineString', 
    coordinates: [ 
        [ -71.13314867019653, 42.383385353092905 ],
        [ -71.14072322845459, 42.386824649778184 ],
        [ -71.1409592628479, 42.38669785877544 ],
        [ -71.1431050300598, 42.388124242791534 ],
        [ -71.14319086074829, 42.38844121261586 ],
        [ -71.14374876022337, 42.38859969692781 ],
        [ -71.14396333694458, 42.38950304986545 ],
        [ -71.14424228668213, 42.395033822086 ],
        [ -71.14334106445312, 42.39684032976027 ],
        [ -71.1428689956665, 42.397727717992005 ],
        [ -71.14145278930663, 42.39875770645379 ],
        [ -71.1410665512085, 42.399153851360516 ],
        [ -71.13909244537354, 42.40010458893289 ],
        [ -71.13789081573486, 42.40010458893289 ],
        [ -71.13630294799805, 42.400928549843314 ],
        [ -71.1344575881958, 42.40270319813126 ],
        [ -71.13441467285156, 42.40412921841742 ]
    ]
};

var destinations_4 = { 
    type: 'LineString', 
    coordinates: [ 
        [ -71.11218452453612, 42.381562607958145 ],
        [ -71.1111330986023, 42.38077009356828 ],
        [ -71.11003875732422, 42.38004097149487 ],
        [ -71.11010313034058, 42.37972395925691 ],
        [ -71.10956668853758, 42.37966055661726 ],
        [ -71.10851526260376, 42.37882046559804 ],
        [ -71.1081075668335, 42.37780600108486 ],
        [ -71.10875129699707, 42.374810064906775 ],
        [ -71.08830213546753, 42.37208348024931 ],
        [ -71.08819484710692, 42.37211518540227 ],
        [ -71.08718633651732, 42.376886628463524 ]
    ]   
};


// ANIMATION

var trails = { 
    type: 'LineString', 
    coordinates: [ ] 
};

var trails_2 = { 
    type: 'LineString', 
    coordinates: [ ] 
};

var trails_3 = { 
    type: 'LineString', 
    coordinates: [ ] 
};

var trails_4 = { 
    type: 'LineString', 
    coordinates: [ ] 
};

var delta = 0.00004;

getDestinations(destinations, trails);
getDestinations(destinations_2, trails_2);
getDestinations(destinations_3, trails_3);
getDestinations(destinations_4, trails_4);

function getDestinations(dns, trs) {

    for(var i = 0; i < dns.coordinates.length-1; i++ ) {
        var start = [ dns.coordinates[i][0], dns.coordinates[i][1]];
        var end = [ dns.coordinates[i+1][0], dns.coordinates[i+1][1]];

        buildTrails( start, end, trs );
    }
}

function buildTrails(start, end, trs) {
    var dx = end[0] - start[0];
    var dy = end[1] - start[1];

    var size = Math.sqrt( Math.pow(dx,2) + Math.pow(dy,2) )/ delta;

    for (var i = 0; i < size; i++) {
        start[0] += dx/size;
        start[1] += dy/size;

        trs.coordinates.push(start.slice());
    }
}

/////////////////////////////////////////////////////////////////////////
// Animating trails
/////////////////////////////////////////////////////////////////////////

// var j = 0;

var myIcon = L.icon({
    iconUrl: '/img/texture.png',
    iconSize: [10, 10],
    opacity: 0.0
});

var polyline_options = {
    color: 'rgba(255,255,255,0.5)',
    // color: '#1b4c5a',
    // opacity: 1,
    weight: 1
};


var marker = L.marker([0,0], {icon: myIcon}).addTo(map);
var polyline = L.polyline([], polyline_options).addTo(map);
var cnt = 0;

var marker_2 = L.marker([0,0], {icon: myIcon}).addTo(map);
var polyline_2 = L.polyline([], polyline_options).addTo(map);
var cnt_2 = 0;

var marker_3 = L.marker([0,0], {icon: myIcon}).addTo(map);
var polyline_3 = L.polyline([], polyline_options).addTo(map);
var cnt_3 = 0;

var marker_4 = L.marker([0,0], {icon: myIcon}).addTo(map);
var polyline_4 = L.polyline([], polyline_options).addTo(map);
var cnt_4 = 0;

var speed = 10;

tick();
tick_2();
tick_3();
tick_4();

function tick() {
    var lat = trails.coordinates[cnt][1];
    var lon = trails.coordinates[cnt][0];

    polyline.addLatLng(L.latLng(lat, lon));
    marker.setLatLng(L.latLng(lat, lon));

    if (++cnt < trails.coordinates.length) setTimeout(tick, speed);
}

function tick_2() {
    var lat = trails_2.coordinates[cnt_2][1];
    var lon = trails_2.coordinates[cnt_2][0];

    polyline_2.addLatLng(L.latLng(lat, lon));
    marker_2.setLatLng(L.latLng(lat, lon));

    if (++cnt_2 < trails_2.coordinates.length) setTimeout(tick_2, speed);
}

function tick_3() {
    var lat = trails_3.coordinates[cnt_3][1];
    var lon = trails_3.coordinates[cnt_3][0];

    polyline_3.addLatLng(L.latLng(lat, lon));
    marker_3.setLatLng(L.latLng(lat, lon));

    if (++cnt_3 < trails_3.coordinates.length) setTimeout(tick_3, speed);
}

function tick_4() {
    var lat = trails_4.coordinates[cnt_4][1];
    var lon = trails_4.coordinates[cnt_4][0];

    polyline_4.addLatLng(L.latLng(lat, lon));
    marker_4.setLatLng(L.latLng(lat, lon));

    if (++cnt_4 < trails_4.coordinates.length) setTimeout(tick_4, speed);
}


//////////////////////////////////////////////////////////////////////////////////
// // var geojson = { type: 'LineString', coordinates: [] };
// var geojson = { 
// 	type: 'LineString', 
// 	coordinates: [ [ -71.11572504043579, 42.37633182812836], [  -71.10735654830933, 42.378091320885694] ] 
// };

// var start = [ geojson.coordinates[0][0], geojson.coordinates[0][1]];
// var end = [ geojson.coordinates[1][0], geojson.coordinates[1][1]];

// var dx = end[0] - start[0];
// var dy = end[1] - start[1]; 

// var size = 320;

// for (var i = 0; i < size; i++) {
// 	start[0] += dx/size;
//     start[1] += dy/size;

//     geojson.coordinates.push(start.slice());
// }

// var j = 0;

// var myIcon = L.icon({
//     iconUrl: '/img/texture.png',
//     iconSize: [19, 19]
// });

// var polyline_options = {
//     color: 'rgba(255,255,255,0.3)',
//     // color: '#1b4c5a',
//     // opacity: 1,
//     weight: 1
// };

// var marker = L.marker([0,0], {icon: myIcon}).addTo(map);
// var polyline = L.polyline([], polyline_options).addTo(map);

// tick();

// function tick() {
//     var lat = geojson.coordinates[j][1];
//     var lon = geojson.coordinates[j][0];

//     polyline.addLatLng(L.latLng(lat, lon));
//     marker.setLatLng(L.latLng(lat, lon));

//     // getTail(geojson.coordinates[j][1], geojson.coordinates[j][0]);

//     if (++j < geojson.coordinates.length) setTimeout(tick, 2);

//     // if(j>size) j = 0;
// }
////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
// for making tail
/////////////////////////////////////////////////////////////////////////
// 
// var polyline_options = {
//         color: '#999',
//         // color: 'red',
//         weight: 4,
//         opacity: 0.4
//     };

// var polyline = L.polyline([], polyline_options).addTo(map);

// function getTail(lat, lon) {
//     if(j  > 15 && j < 279 ) { 
//         var p_lat = geojson.coordinates[j-14][1];
//         var p_lon = geojson.coordinates[j-14][0];

//         var line_points = [ [ lat, lon ],[ p_lat, p_lon] ]; 

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
//     coordinates.innerHTML = m.lng + ', '+ m.lat;
//     // coordinates.innerHTML = 'Latitude: ' + m.lat + '<br />Longitude: ' + m.lng;
// }

