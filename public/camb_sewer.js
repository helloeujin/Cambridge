L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

// //  maps
// var map = L.mapbox.map('map', 'examples.map-20v6611k', {
// 	minZoom: 10,
// 	maxZoom: 18
// }).setView([42.3783903,-71.1129096+0.02], 13);

 // maps
var map = L.mapbox.map('map', {
	minZoom: 10,
	maxZoom: 18,
	color: "black"
}).setView([42.3783903,-71.1129096], 13);

queue() // upload data using queue 
	// .defer(d3.json, "sewer_network.geojson")// cambridge drainage data
	// .defer(d3.json, "infra_drainage.geojson")
	// .defer(d3.json, "sewer_network.geojson", function(d) { 
	// 	console.log(d);
	// })
	.defer(d3.json, "Sewers_with_Load_and_Her.json")
	.await(ready);


function ready(error, data) {
	console.log("sewer data uploaded");

	// $('#data').html(data);
	// console.log(data);

	// layer.addTo(map);

	// sewer 
	L.geoJson(data, {
		style: getStyle
		// style: function(feature) {

		// 	return {
		// 		color: "rgba(255,20,20,1)",
		// 		weight: 1,
		// 		opacity: 1
		// 	};
		// }
	}).addTo(map);

	var featureLayer = L.mapbox.featureLayer(data)
	    // hide all markers
	    .setFilter(function(d) { 
	    	// console.log(d.properties.WATERTYPE);
	    	if (d.properties.WATERTYPE == 'COMB') {
	    		// $('#data').html(d);
	    		// console.log(d);
	    		return true;
	    	} else {
	    		return false;
	    	}
	    });

	// console.log(featureLayer._geojson.features);
	    // featureLayer.addTo(map);

	    // console.log(featureLayer._geojson.features);

	// map.featureLayer.setFilter(function(f) {
	//        return f.properties['marker-symbol'] === 'fast-food';
	//    });
}

// style for total population
function getStyle(feature) {
	var type = feature.properties.WATERTYPE;
	var c = getColor( type );

	return {
		weight: 1,
		opacity: 1,
		color: c
		// fillOpacity: 0.85,
		// fillColor: c
	};
}

function getColor(d) {
	if (d == 'COMB') { return 'red'; }
	else { return "grey"; }
}




