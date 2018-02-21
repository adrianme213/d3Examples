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
  var xScale = d3.scaleTime(). // set as this for x
  domain(xExtent).range([
    margin.left, width - margin.right
  ]) // only within given area
  var yExtent = d3.extent(data, d => d[city]);
  var yScale = d3.scaleLinear().domain(yExtent).range([
    height - margin.bottom,
    margin.top
  ]);

  var heightScale = d3.scaleLinear().domain(yExtent).range([
    0, height - margin.top - margin.bottom
  ]);
  // Create Rectangles -------------------------------------------------------
  var svg = d3.select('svg');

  var rect = svg.selectAll('rect').data(data).enter().append('rect').attr('width', 5).attr('height', d => heightScale(d[city])).attr('x', d => xScale(d.date)).attr('y', d => yScale(d[city])).attr('fill', 'blue').attr('stroke', 'white');

  // Define Axes
  var xAxis = d3.axisBottom().scale(xScale);
  var yAxis = d3.axisLeft().scale(yScale);

  svg.append('g').call(xAxis).attr('transform', 'translate(' + [
    0, height - margin.bottom
  ] + ')')
  svg.append('g').call(yAxis).attr('transform', 'translate(' + [margin.left, 0] + ')')

});
