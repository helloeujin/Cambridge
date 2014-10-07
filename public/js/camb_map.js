L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

var southWest = L.latLng(42, -72.2),
    northEast = L.latLng(42.72, -70),
    bounds = L.latLngBounds(southWest, northEast);

// zoom level : 10 - 18
var map = L.map('map', {
	minZoom: 10,
	maxZoom: 18,
	maxBounds: bounds
}).setView([42.3783903,-71.1129096-0.025], 13);

var layers = document.getElementById('menu-ui');
var base_layer = L.mapbox.tileLayer('examples.map-20v6611k'); // grey
// var base_layer = L.mapbox.tileLayer('examples.map-zswgei2n'); // color

var sewer_network = L.mapbox.tileLayer('meggonagul.z7pynwmi', {
	accessToken: L.mapbox.accessToken
});

var total_population;
var zoning;
// var sewer;

var popup = new L.Popup({ autoPan: false });

// total populcation data mapping
var rateById = d3.map();
var popAcrebyID = d3.map(); // population per acre
var housingAcrebyID = d3.map(); // housing units per acre
var zoneById = d3.map(); // mapping the zone info

// age population data
var under_18 = d3.map();
var over_65 = d3.map()

queue()  
	.defer(d3.json, "tracts_2010.geojson")
	.defer(d3.json, "CDD_ZoningDistricts.geojson")
	// .defer(d3.json, "Sewers_with_Load_and_Her.json")
	// .defer(d3.json, "CDD_ZoningDistricts.geojson", function(d) {
	// 	// zoneById.set(d.id, +d.)
	// })
	.defer(d3.csv, "camb_tract_pop_2010.csv", function(d) { 
		rateById.set(d.id, +d.population);
		popAcrebyID.set(d.id, + d.population_per_acre);
		housingAcrebyID.set(d.id, + d.housing_units_per_acre);
	})
	.await(ready);


function addLayer(layer, name, zIndex) {
    layer
        .setZIndex(zIndex);

    var link = document.createElement('a');
        link.href = '#';
        link.className = '';
        link.innerHTML = name;

    if(layer == base_layer) {
    	layer.addTo(map);
    	link.className = 'active';
    }

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';

            if(layer == total_population) {
            	hideAge();
            } else if(layer == base_layer) {
            	$("#viz_left").css("background-color", "rgba(0, 0, 0, 0.3)");
            	$("#viz_right").css( "background-color", "rgba(0, 0, 0, 0.3)" );
            	$(".axis line").css("stroke", "rgba(255,255,255,0.7)");
            	$(".axis path").css("stroke", "rgba(255,255,255,0.7)");
            	$(".axis text").css("fill", "white");
            	$( "#des_age" ).css("color", "rgba(255,255,255,0.9)");	
            }
        } else {
            map.addLayer(layer);
            this.className = 'active';
            if(layer == total_population) {
            	addAge();
            } else if(layer == base_layer) {
            	$("#viz_left").css( "background-color", "rgba(255, 255,255,0.8)" );
            	$("#viz_right").css( "background-color", "rgba(255, 255,255,0.8)" );
            	$(".axis line").css("stroke", "#000");
            	$(".axis path").css("stroke", "#000");
            	$(".axis text").css("fill", "black");
            	$( "#des_age" ).css("color", "black");	
            }
        }
    };

    layers.appendChild(link);
}


// // add layers
function ready(error, tract, district) {
	console.log("data uploaded");
	// console.log(pop);

	total_population = L.geoJson(tract,  {
		style: getStyle,
	    onEachFeature: onEachFeature
	});

	zoning = L.geoJson(district, {
		style: getZoneStyle,
		onEachFeature: onEachDistrict
	});

	// sewer = L.geoJson(sewer, {
	// 	style: getSewerStyle
	// });

	addLayer(base_layer, 'Base Map', 1);
	addLayer(total_population, 'Total population', 2);
	addLayer(zoning, 'Zoning districts', 3);
	addLayer(sewer_network, 'Sewer network', 4);
}


// function getSewerStyle(feature) {
// 	return {
// 		weight: 1,
// 		color: 'red'
// 	};
// }


// style for total population
function getStyle(feature) {
	var id = feature.properties.NAME10;
	var c = getColor( rateById.get(id) );

	return {
		weight: 1,
		opacity: 0.6,
		color: 'white',
		fillOpacity: 0.85,
		fillColor: c
	};
}

function getColor(d) {
	if (d >= 0 && d < 1000) { return 'rgb(222,235,247)'; }
	else if (d >= 1000 && d < 2000) { return "rgb(198,219,239)"; }
	else if (d >= 2000 && d < 3000) { return "rgb(158,202,225)"; }
	else if (d >= 3000 && d < 4000) { return "rgb(107,174,214)"; }
	else if (d >= 4000 && d < 5000) { return "rgb(66,146,198)"; }
	else if (d >= 5000 && d < 6000) { return "rgb(33,113,181)"; }
	else if (d >= 6000 && d < 7000) { return "rgb(8,81,156)"; }
	else if (d >= 7000) { return "rgb(8,48,107)"; }
}


// style for districts
function getZoneStyle(feature) {
	var id = feature.properties.ZONE_TYPE;
	var info = getZoneInfo(id);
	var c = getZoneColor(info);

	return {
		weight: 1,
		color: 'white',
		fillOpacity: 0.7,
		fillColor: c
	};
}

function getZoneColor(d) {
	if(d == 'Residential') { return "yellow"; }
	if(d == 'Institution') { return "orange"; }
	if(d == 'Business') { return "purple"; }
	if(d == 'Commercial') { return "red"; }
	if(d == 'Other') { return "grey"; }
}

function getZoneInfo(d) {
	if(d == 'A-1') { return 'Residential'; }
	if(d == 'A-2') { return 'Residential'; }
	if(d == 'B') { return 'Residential'; }
	if(d == 'C') { return 'Residential'; }
	if(d == 'C-1') { return 'Residential'; }
	if(d == 'C-1A') { return 'Residential'; }
	if(d == 'C-2') { return 'Residential'; }
	if(d == 'C-2A') { return 'Residential'; }
	if(d == 'C-2B') { return 'Residential'; }

	if(d == 'C-3') { return 'Institution'; }
	if(d == 'C-3A') { return 'Institution'; }
	if(d == 'C-3B') { return 'Institution'; }

	if(d == 'O-1') { return 'Business'; }
	if(d == 'O-2') { return 'Business'; }
	if(d == 'O-2A') { return 'Business'; }
	if(d == 'O-3') { return 'Business'; }
	if(d == 'O-3A') { return 'Business'; }

	if(d == 'BA') { return 'Commercial'; }
	if(d == 'BA-1') { return 'Commercial'; }
	if(d == 'BA-2') { return 'Commercial'; }
	if(d == 'BA-3') { return 'Commercial'; }
	if(d == 'BB') { return 'Commercial'; }
	if(d == 'BB-1') { return 'Commercial'; }
	if(d == 'BB-2') { return 'Commercial'; }
	if(d == 'BC') { return 'Commercial'; }
	if(d == 'BC-1') { return 'Commercial'; }

	if(d == 'IA-1') { return 'Business'; }
	if(d == 'IA-2') { return 'Business'; }
	if(d == 'IA') { return 'Business'; }
	if(d == 'IB-1') { return 'Business'; }
	if(d == 'IB-2') { return 'Business'; }
	if(d == 'IB') { return 'Business'; }
	if(d == 'IC') { return 'Business'; }
	if(d == 'MXD') { return 'Business'; }
	if(d == 'ASD') { return 'Business'; }

	if(d == 'NP') { return 'Business'; }
	if(d == 'CRDD') { return 'Business'; }

	if(d == 'SD-1') { return 'Residential'; }
	if(d == 'SD-2') { return 'Residential'; }

	if(d == 'SD-3') { return 'Business'; }
	if(d == 'SD-4') { return 'Business'; }
	if(d == 'SD-4A') { return 'Business'; }
	if(d == 'SD-5') { return 'Business'; }

	if(d == 'SD-6') { return 'Institution'; }

	if(d == 'SD-7') { return 'Commercial'; }

	if(d == 'SD-8') { return 'Residential'; }
	if(d == 'SD-8A') { return 'Residential'; }
	if(d == 'SD-9') { return 'Residential'; }
	if(d == 'SD-10(F)') { return 'Residential'; }
	if(d == 'SD-10(H)') { return 'Residential'; }

	if(d == 'SD-11') { return 'Business'; }

	if(d == 'SD-12') { return 'Residential'; }
	if(d == 'SD-13') { return 'Residential'; }
	if(d == 'SD-14') { return 'Residential'; }
	if(d == 'SD-15') { return 'Residential'; }

	if(d == 'OS') { return 'Other'; }
	if(d == 'AOD') { return 'Other'; }
	if(d == 'PUD') { return 'Other'; }
	if(d == 'MXR') { return 'Other'; }
}


function onEachFeature(feature, layer) {
	layer.on({
		mousemove: mousemove,
		mouseout: mouseout
	});
}

function onEachDistrict(feature, layer) {
	layer.on({
		mousemove: mousemoveD,
		mouseout: mouseoutD
	});
}


var closeTooltip;

function mousemove(e) {
  var layer = e.target;
  var tract = layer.feature.properties.NAME10;
  var pop = rateById.get(tract);
  var pop_per_acre = popAcrebyID.get(tract);
  var housing_per_acre = housingAcrebyID.get(tract);

  popup.setLatLng(e.latlng);
  popup.setContent(
  	"<span style='font-weight:bold;font-size:13px'>Tract "+ tract +"</span><br>"
	+ "<span style='font-style:italic; color:grey;font-size:11px'>" 
		+ "Total population "+ pop +"</span><br>"
	+"<span style='font-size:11px'>Population per acre: " + pop_per_acre
		+"<br>Housing units per acre: " + housing_per_acre +"</span>"
  );


  if (!popup._map) popup.openOn(map);
  window.clearTimeout(closeTooltip);

  // highlight feature
  layer.setStyle({
      weight: 1.2,
      opacity: 1,
      fillOpacity: 0.9,
      color: "black"
  });

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }

  // link to viz
  svg_left.selectAll(".bar").each(function(d, i) {
		if(d.id ==  tract) {
			d3.select(this).attr("height", 8);
			d3.select(this).attr("y", i*15 + 20-4);
		}
	});

	svg_right.selectAll(".bar").each(function(d, i) {
		if(d.id ==  tract) {
			d3.select(this).attr("height", 8);
			d3.select(this).attr("y", i*15 + 20-4);
		}
	});
}


function mouseout(e) {
  total_population.resetStyle(e.target);
  closeTooltip = window.setTimeout(function() {
      map.closePopup();
  }, 100);

  // link to viz
  var layer = e.target;
  var tract = layer.feature.properties.NAME10;

  svg_left.selectAll(".bar").each(function(d, i) {
		if(d.id ==  tract) {
			d3.select(this).attr("height", 2);
			d3.select(this).attr("y", i*15 + 20);
		}
	});

	svg_right.selectAll(".bar").each(function(d, i) {
		if(d.id ==  tract) {
			d3.select(this).attr("height", 2);
			d3.select(this).attr("y", i*15 + 20);
		}
	});
}

///////////////District
var closeTooltipD;

function mousemoveD(e) {
  var layer = e.target;
  var id = layer.feature.properties.ZONE_TYPE;
  var info = getZoneInfo(id);

  popup.setLatLng(e.latlng);
  popup.setContent(
  	"<span style='font-weight:bold;font-size:13px'>"+ info +" area</span><br>"
  	+"<span style='font-size:11px'>     zone type: " + id +"</span>"
  );

  if (!popup._map) popup.openOn(map);
  window.clearTimeout(closeTooltipD);

  // highlight feature
  layer.setStyle({
      weight: 1.2,
      opacity: 1,
      fillOpacity: 0.9,
      color: "black"
  });

  if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
  }
}


function mouseoutD(e) {
  zoning.resetStyle(e.target);
  closeTooltipD = window.setTimeout(function() {
      map.closePopup();
  }, 100);
}


function addAge() {
	//legend.addTo(this);
    $( "#viz_left" ).css( "visibility", "visible");
    $( "#viz_right" ).css( "visibility", "visible" );
    $( "#des_age" ).css( "visibility", "visible" );
}


function hideAge() {
// 		this.removeControl(legend);
	$( "#viz_left" ).css( "visibility", "hidden" );
	$( "#viz_right" ).css( "visibility", "hidden" );
	$( "#des_age" ).css( "visibility", "hidden" );	
}


// legend
//  map.legendControl.addLegend(getLegendHTML());

// function getLegendHTML() {
// var grades = [0, 10, 20, 50, 100, 200, 500, 1000],
// labels = [],
// from, to;

// for (var i = 0; i < grades.length; i++) {
//   from = grades[i];
//   to = grades[i + 1];

//   labels.push(
//     '<li><span class="swatch" style="background:' + getColor(from + 1) + '"></span> ' +
//     from + (to ? '&ndash;' + to : '+')) + '</li>';
// }

// return '<span>People per square mile</span><ul>' + labels.join('') + '</ul>';
// }