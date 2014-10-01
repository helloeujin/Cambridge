var margin = {top: 30, right: 0, bottom: 10, left: 0},
    width = 150 - margin.left - margin.right,
    height = 130 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([0, 50])
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


d3.tsv("data.tsv", function(error, data) {
  // console.log(data);

  svg_left.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", function(d, i) { 
      // console.log(d);
      // return d.value < 0 ? "bar negative" : "bar positive"; 
      // console.log(i);
      return "bar negative";
    })
    .attr("x", function(d) { 
      return width - x(d.val_1); 
    })
    .attr("y", function(d, i) { 
      return i*12; 
    })
    .attr("width", function(d) { 
      return x(d.val_1); 
    })
    .attr("height", 5);


  console.log("hi");

  svg_right.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", function(d, i) { 
      // console.log(d);
      // return d.value < 0 ? "bar negative" : "bar positive"; 
      // console.log(i);
      console.log(d);
      return "bar positive";
    })
    .attr("x", function(d) { 
      return 0; 
    })
    .attr("y", function(d,i) { 
      return i*12; 
    })
    .attr("width", function(d) { 
      return x(d.val_2); 
    })
    .attr("height", 5);

    // console.log(data.value);
});

// var y = d3.scale.ordinal()
//     .rangeRoundBands([0, height], .2);

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("top");

// var svg = d3.select("#viz").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// d3.tsv("data.tsv", type, function(error, data) {
//   x.domain(d3.extent(data, function(d) { return d.value; })).nice();
//   y.domain(data.map(function(d) { return d.name; }));

//   svg.selectAll(".bar")
//       .data(data)
//     .enter().append("rect")
//       .attr("class", function(d) { return d.value < 0 ? "bar negative" : "bar positive"; })
//       .attr("x", function(d) { return x(Math.min(0, d.value)); })
//       .attr("y", function(d) { return 0; })
//       .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
//       .attr("height", 5);

//   // svg.append("g")
//   //     .attr("class", "x axis")
//   //     .call(xAxis);

//   // svg.append("g")
//   //     .attr("class", "y axis")
//   //   .append("line")
//   //     .attr("x1", x(0))
//   //     .attr("x2", x(0))
//   //     .attr("y2", height);
// });

// function type(d) {
//   d.value = +d.value;
//   return d;
// }
