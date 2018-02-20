var rectWidth = 100;
var height = 300;
var data = [100, 250, 175, 200, 120];

var svg = d3.select('svg') // selects first svg element
svg.selectAll('rect') // selects all non-existent rect elements in svg
  .data(data) // will map data point to an element
  .enter().append('rect') // enter creates imaginary placeholders and append makes rects
  .attr('x', (d, i) => i * rectWidth) // index times rectangle width to move across horizontally
  .attr('y', d => height - d) // height minus data value since position starts left,top for x,y
  .attr('width', rectWidth) // set width as chosen rectWidth
  .attr('height', d => d) // set height as data value
  .attr('fill', 'red') // sets fill color, duhhhh
  .attr('stroke', '#000000'); // sets color of pen stroke separating rects
