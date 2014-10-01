var margin = {top: 100, right: 5, bottom: 10, left: 5},
    width = 150 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, 1400])
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


var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");


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
      return i*16 + 20; 
    })
    .attr("width", function(d) { 
      return x(d.under_18); 
    })
    .attr("height", 3);


  console.log("hi");

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
      return i*16 + 20; 
    })
    .attr("width", function(d) { 
      return x(d.over_65); 
    })
    .attr("height", 3);
});

// svg_left.append("g")
//       .attr("class", "x axis")
//       .call(xAxis);
