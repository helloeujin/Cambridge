// Cambridge

// var map = L.map('map').setView([42.3783903,-71.1129096], 13);

// L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
// 	maxZoom: 18,
// 	id: 'examples.map-20v6611k' // light grey !
// 	// id: 'examples.map-0l53fhk2' // dark grey & brown
// 	// id: 'examples.map-8ced9urs' // black & white !
// 	// id: 'examples.map-i875kd35' // blue & yellow like google map
// 	// id: 'examples.map-zr0njcqy' // blue & yellow like google map
// }).addTo(map);


var population = new L.LayerGroup(); // population layer
var sewer = new L.LayerGroup();

// populcation data
var rateById = d3.map();
var popAcrebyID = d3.map(); // population per acre
var housingAcrebyID = d3.map(); // housing units per acre


var quantize = d3.scale.quantize()
	.domain([0, 9000])
	.range(d3.range(9).map(function(i) { return "q"+i+"-9"; }));


queue() // upload data using queue 
	.defer(d3.json, "tracts_2010.geojson") // cambridge geo data
	.defer(d3.json, "infra_drainage.geojson")// cambridge drainage data
	.defer(d3.csv, "camb_tract_pop_2010.csv", function(d) { 
		rateById.set(d.id, +d.population); // cambridge CDD data
		popAcrebyID.set(d.id, + d.population_per_acre);
		housingAcrebyID.set(d.id, + d.housing_units_per_acre);
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


// legend !
var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {
	var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
		labels = [],
		from, to;

	labels.push("2010 Population");

	for(var i = 0; i < grades.length; i++) {
		from = grades[i];
		to = grades[i + 1];

		labels.push(
					'<i style="background:' + getColor("q"+i+"-9") + '"></i> ' +
					from + (to ? ' &ndash; ' + to : '+'));
	}

	div.innerHTML = labels.join('<br>');
	return div;
}


function highlightFeature(e) {
	var layer = e.target;

	// mouse position
	var x = e.containerPoint.x;
	var y = e.containerPoint.y;
    // console.log(x + "," + y);

	layer.setStyle({
		weight: 1.5,
		color: "rgba(0,0,0,1)"
	});

	// if(!L.Browser.ie && !L.Browser.opera) {
	// 	layer.bringToFront();
	// } // draw line above other features

	var tract = layer.feature.properties.NAME10;
	var pop = rateById.get(tract);
	var pop_per_acre = popAcrebyID.get(tract);
	var housing_per_acre = housingAcrebyID.get(tract);

	tooltip.style("left", x-70+"px");
	tooltip.style("top", y+40+"px");

	tooltip.html(function(d) {
		return "<span style='font-weight:bold;font-size:14px'>Tract " 
				+ tract +"</span><br>"
			+ "<span style='font-style:italic; color:grey;'>" 
				+ "Total population "+ pop 
			+"</span><br>"
				+"Population per acre: " + pop_per_acre
				+"<br>Housing units per acre: " + housing_per_acre
			;
	});

	tooltip.style("visibility", "visible");
}


function resetHighlight(e) {
	var layer = e.target;
	var tract = layer.feature.properties.NAME10;
	var c = getColor( quantize(rateById.get(tract)) );

	layer.setStyle({
		weight: 1.3,
		color: c
	});
	tooltip.style("visibility", "hidden");
}
 

function ready(error, tract, drainage) {
	console.log("tract geographic data uploaded");

	L.geoJson(tract, {
		style: function(feature) {
			var tract = feature.properties.NAME10;
			var c = getColor( quantize( rateById.get(tract) ) );

			return {
				color: c,
				weight: 1.3,
				fillColor: c,
				fillOpacity: 0.84
			};
		},

		onEachFeature: onEachFeature
	}).addTo(population);

	L.geoJson(drainage, {
		style: function(feature) {

			return {
				color: "rgba(255,0,0,1)",
				weight: 4,
				// fillOpacity: 1,
				opacity: 1
			};
		}
	}).addTo(sewer);
}


//  maps
var mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';

var grayscale   = L.tileLayer(mbUrl, {id: 'examples.map-20v6611k'}),
	streets  = L.tileLayer(mbUrl, {id: 'examples.map-i875mjb7'});

var map = L.map('map', {
	center: [42.3783903,-71.1129096],
	zoom: 13,
	layers: [grayscale, population]
});


// layers
var baseLayers = {
	"Grayscale": grayscale,
	"Streets": streets
};

var overlays = {
	"Sewage network": sewer,
	"Total population": population
};

L.control.layers(baseLayers, overlays, {collapsed:false}).addTo(map);
legend.addTo(map);

// legend control depend on overlay selection
map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Population') {
    	// console.log(this);
        legend.addTo(this);
    }
});

map.on('overlayremove', function (eventLayer) {
	if (eventLayer.name === 'Population') {
		this.removeControl(legend);
	}
});


////////
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

