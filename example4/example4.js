var city = 'San Francisco';
var width = 800;
var height = 300;
var margin = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20
};

// dataset of city temperatures across time
d3.tsv('data.tsv', (err, data) => {
  // clean the data
  data.forEach(d => {
    d.date = d3.timeParse("%Y%m%d")(d.date);
    d.date = new Date(d.date); // x
    d[city] = ++d[city]; // y
  });

  // Setup scales ------------------------------------------------------------
  var xExtent = d3.extent(data, d => d.date);
  var xScale = d3.scaleTime() // set as this for x
    .domain(xExtent)
    .range([margin.left, width - margin.right]) // only within given area
  var yMax = d3.max(data, d => d[city]);
  // var yExtent = d3.extent(data, d => d[city]);
  var yScale = d3.scaleLinear()
    .domain([0, yMax])
    .range([height - margin.bottom, margin.top]);

  // TBD -------------------------------------------------------
  var line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d[city]))
    .curve(d3.curveCatmullRom);

  var svg = d3.select('svg');
  svg.append('path')
    .attr('d', line(data))
    .attr('fill', 'none')
    .attr('stroke', 'blue');

  // Define Axes
  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(d => d3.timeFormat('%b %Y')(d));
  var yAxis = d3.axisLeft()
    .scale(yScale);

  svg.append('g').call(xAxis).attr('transform', 'translate(' + [
    0, height - margin.bottom
  ] + ')')
  svg.append('g').call(yAxis).attr('transform', 'translate(' + [margin.left, 0] + ')')

});
