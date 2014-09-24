// Cambridge

var map = L.map('map').setView([42.3783903,-71.1129096], 13);

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
	maxZoom: 18,
	id: 'examples.map-20v6611k' // light grey !
	// id: 'examples.map-0l53fhk2' // dark grey & brown
	// id: 'examples.map-8ced9urs' // black & white !
	// id: 'examples.map-i875kd35' // blue & yellow like google map
	// id: 'examples.map-zr0njcqy' // blue & yellow like google map
}).addTo(map);


// populcation data
var rateById = d3.map();


var quantize = d3.scale.quantize()
	.domain([0, 8000])
	.range(d3.range(9).map(function(i) { return "q"+i+"-9"; }));


queue() // upload data using queue 
	.defer(d3.json, "tracts_2010.geojson")
	.defer(d3.csv, "camb_tract_pop_2010.csv", function(d) { 
		rateById.set(d.id, +d.population);
	})
	.await(ready);


// tooltip !
var tooltip = d3.select("body")
	.append("div")
	.attr("id", "tooltip");
	

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight
	})
}


function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 1.4,
		color: "rgba(0,0,0,1)"
	});

	if(!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	} // draw line above other features

	// info.update(layer.feature.properties);
}


function resetHighlight(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 0
	});
}
 

function ready(error, tract) {
	console.log("tract geographic data uploaded");
	// console.log(tract);

	L.geoJson(tract, {
		style: function(feature) {
			var c = getColor( quantize(rateById.get(feature.properties.NAME10)) );

			return {
				color: "rgb(0,0,255)",
				weight: 0,
				fillColor: c,
				fillOpacity: 0.75
			};
		},

		onEachFeature: onEachFeature
	}).addTo(map);
}


function getColor(d) {
	switch(d) {
		case 'q0-9': return "rgb(247,251,255)";
		case 'q1-9': return "rgb(222,235,247)";
		case 'q2-9': return "rgb(198,219,239)";
		case 'q3-9': return "rgb(158,202,225)";
		case 'q4-9': return "rgb(107,174,214)";
		case 'q5-9': return "rgb(66,146,198)";
		case 'q6-9': return "rgb(33,113,181)";
		case 'q7-9': return "rgb(8,81,156)";
		case 'q8-9': return "rgb(8,48,107)";
	}
}

