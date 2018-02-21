// Set color scheme
const colors = d3.scaleOrdinal(d3.schemeCategory20c);
const data = [1, 1, 2, 3, 5, 8, 13, 2];
const pie = d3.pie()(data); // invoke pie with data
// outputs array of objects with start and end angle for data.

// Makes arc setup for pie chart
const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(100)
  .startAngle(d => d.startAngle)
  .endAngle(d => d.endAngle);

// Create pie with sections
arc(pie); // passes start and end angles to arc creations

const svg = d3.select('svg')
  .append('g')
  .attr('transform', 'translate(200, 200)');

svg.selectAll('path')
  .data(pie).enter().append('path')
  .attr('d', arc)
  .attr('fill', (d, i) => colors(d.value))
  .attr('stroke', '#fff');
