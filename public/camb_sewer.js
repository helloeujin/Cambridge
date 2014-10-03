
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
	// console.log(data);

	// sewer 
	L.geoJson(data, {
		style: function(feature) {

			return {
				color: "rgba(255,20,20,1)",
				weight: 1,
				opacity: 1
			};
		}
	}).addTo(map);
}


//  maps
var mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';

var grayscale   = L.tileLayer(mbUrl, {id: 'examples.map-20v6611k'}),
	streets  = L.tileLayer(mbUrl, {id: 'examples.map-i875mjb7'});

var map = L.map('map', {
	center: [42.3783903,-71.1129096 - 0.015],
	zoom: 13,
	layers: grayscale
});


