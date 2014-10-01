var margin = {top: 127, right: 5, bottom: 10, left: 5},
    width = 150 - margin.left - margin.right,
    height = 750 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, 1500])
    .range([0, width]);

var tx = d3.scale.linear()
    .domain([1500, 0])
    .range([0, width]);

var svg_left = d3.select("#viz_left").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg_right = d3.select("#viz_right").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var xAxis_left = d3.svg.axis()
    .scale(tx)
    .ticks(2)
    .orient("bottom");

var xAxis_right = d3.svg.axis()
    .scale(x)
    .ticks(2)
    .orient("bottom");

var des_age = d3.select("body")
  .append("div")
  .attr("id", "des_age");


d3.csv("camb_tract_age_2010.csv", function(error, data) {
  svg_left.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", function(d, i) { 
      return "bar positive";
    })
    .attr("x", function(d) { 
      return width - x(d.under_18); 
    })
    .attr("y", function(d, i) { 
      return i*15 + 20; 
    })
    .attr("width", function(d) { 
      return x(d.under_18); 
    })
    .attr("height", 3);


  svg_right.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", function(d, i) { 
      return "bar negative";
    })
    .attr("x", function(d) { 
      return 0; 
    })
    .attr("y", function(d,i) { 
      return i*15 + 20; 
    })
    .attr("width", function(d) { 
      return x(d.over_65); 
    })
    .attr("height", 3);
});

svg_left.append("g")
      .attr("transform", "translate(0,520)")
      .attr("class", "x axis")
      .call(xAxis_left);

svg_right.append("g")
      .attr("transform", "translate(0,520)")
      .attr("class", "x axis")
      .call(xAxis_right);


des_age.attr("class", "des_age");

des_age.html(function() {
  return "<span style='font-weight:bold;font-size:14px'>Tract " 
      + 'population by age' +"</span><br><br>"
    + "<span style='position:absolute;left:115px;'>" 
      + "Over 65 " 
    +"</span>"
    + "<span style='position:absolute;left:60px;'>" 
      +"Under 18 " 
      +"</span>"
    ;
});

// des_age.style("visibility", "visible");
