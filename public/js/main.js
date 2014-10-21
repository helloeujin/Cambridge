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

new L.Control.Zoom({ position: 'topright' }).addTo(map);

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

var destinations_5 = { 
    type: 'LineString', 
    coordinates: [ 
        [ -71.12132549285889, 42.38798160584841 ],
        [ -71.1194372177124, 42.38818763688444 ],
        [ -71.11920118331909, 42.38728426501647 ],
        [ -71.11967325210571, 42.382878159760374 ],
        [ -71.11990928649902, 42.38056403818841 ],
        [ -71.11997365951538, 42.38012022430427 ],
        [ -71.12059593200684, 42.37807546981966 ],
        [ -71.12076759338379, 42.37788525671513 ],
        [ -71.1224627494812, 42.377378018952875 ],
        [ -71.12272024154662, 42.377124398535294 ],
        [ -71.12226963043213, 42.3765854517469 ],
        [ -71.12450122833252, 42.37601479716476 ],
        [ -71.12565994262694, 42.37626842206366 ],
        [ -71.126389503479, 42.37468324964047 ],
        [ -71.12647533416748, 42.374144281901934 ],
        [ -71.1266040802002, 42.373605309538036 ],
        [ -71.12686157226562, 42.373351673883974 ]
    ]   
};

var destinations_6 = { 
    type: 'LineString', 
    coordinates: [ 
        [ -71.13113164901733, 42.382323412361465 ],
        [ -71.12937211990356, 42.38381329428018 ],
        [ -71.13261222839355, 42.388583848514614 ],
        [ -71.13278388977051, 42.39085013097515 ],
        [ -71.1393928527832, 42.39195947018157 ],
        [ -71.1399507522583, 42.392117945610515 ],
        [ -71.14125967025757, 42.39279938539535 ],
        [ -71.14415645599365, 42.393655136505984 ],

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

var destinations_7 = { 
    type: 'LineString', 
    coordinates: [ 
        [ -71.10471725463867, 42.36726411090043 ],
        [ -71.09823703765869, 42.36345908443492 ],
        [ -71.09360218048096, 42.36307856911308 ],
        [ -71.08843088150024, 42.37206762766684 ],
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

var trails_5 = { 
    type: 'LineString', 
    coordinates: [ ] 
};

var trails_6 = { 
    type: 'LineString', 
    coordinates: [ ] 
};

var trails_7 = { 
    type: 'LineString', 
    coordinates: [ ] 
};

var delta = 0.00004;

getDestinations(destinations, trails);
getDestinations(destinations_2, trails_2);
getDestinations(destinations_3, trails_3);
getDestinations(destinations_4, trails_4);
getDestinations(destinations_5, trails_5);
getDestinations(destinations_6, trails_6);
getDestinations(destinations_7, trails_7);

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
    weight: 1.5
};


var marker = L.marker([0,0], {icon: myIcon}).addTo(map);
marker.bindPopup('Path 1');
var polyline = L.polyline([], polyline_options).addTo(map);
var cnt = 0;

var marker_2 = L.marker([0,0], {icon: myIcon}).addTo(map);
marker_2.bindPopup('Path 2');
var polyline_2 = L.polyline([], polyline_options).addTo(map);
var cnt_2 = 0;

var marker_3 = L.marker([0,0], {icon: myIcon}).addTo(map);
marker_3.bindPopup('Path 3');
var polyline_3 = L.polyline([], polyline_options).addTo(map);
var cnt_3 = 0;

var marker_4 = L.marker([0,0], {icon: myIcon}).addTo(map);
marker_4.bindPopup('Path 4');
var polyline_4 = L.polyline([], polyline_options).addTo(map);
var cnt_4 = 0;

var marker_5 = L.marker([0,0], {icon: myIcon}).addTo(map);
marker_5.bindPopup('Path 5');
var polyline_5 = L.polyline([], polyline_options).addTo(map);
var cnt_5 = 0;

var marker_6 = L.marker([0,0], {icon: myIcon}).addTo(map);
marker_6.bindPopup('Path 6');
var polyline_6 = L.polyline([], polyline_options).addTo(map);
var cnt_6 = 0;

var marker_7 = L.marker([0,0], {icon: myIcon}).addTo(map);
marker_7.bindPopup('Path 7');
var polyline_7 = L.polyline([], polyline_options).addTo(map);
var cnt_7 = 0;

var speed = 2; // higher -> slower

tick();
tick_2();
tick_3();
tick_4();
tick_5();
tick_6();
tick_7();

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

function tick_5() {
    var lat = trails_5.coordinates[cnt_5][1];
    var lon = trails_5.coordinates[cnt_5][0];

    polyline_5.addLatLng(L.latLng(lat, lon));
    marker_5.setLatLng(L.latLng(lat, lon));

    if (++cnt_5 < trails_5.coordinates.length) setTimeout(tick_5, speed);
}

function tick_6() {
    var lat = trails_6.coordinates[cnt_6][1];
    var lon = trails_6.coordinates[cnt_6][0];

    polyline_6.addLatLng(L.latLng(lat, lon));
    marker_6.setLatLng(L.latLng(lat, lon));

    if (++cnt_6 < trails_6.coordinates.length) setTimeout(tick_6, speed);
}

function tick_7() {
    var lat = trails_7.coordinates[cnt_7][1];
    var lon = trails_7.coordinates[cnt_7][0];

    polyline_7.addLatLng(L.latLng(lat, lon));
    marker_7.setLatLng(L.latLng(lat, lon));

    if (++cnt_7 < trails_7.coordinates.length) setTimeout(tick_7, speed);
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

