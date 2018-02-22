// constants
const rectWidth = 100;
const height = 300;
const data = [
  [100, 250, 175, 200, 120],
  [230, 120, 300, 145, 75, 250],
  [240, 250, 300]
]

const colors = d3.scaleOrdinal(d3.schemeCategory10);
const svg = d3.select('svg');
const updateBars = (data) => {
  // object constancy
  let bars = svg.selectAll('rect')
  .data(data, d=> d);

  // exit
  bars.exit().remove();

  // enter
  const enter = bars.enter().append('rect')
  .attr('width', rectWidth)
  .attr('stroke', '#fff');


  // enter + update
  bars = enter.merge(bars)
  .attr('x', (d, i) => i * rectWidth)
  .attr('y', d => height - d)
  .attr('height', d => d)
  .attr('fill', d => colors(d));

}

let chosenOne = 0;
setInterval(() => {
  updateBars(data[chosenOne]);
  if (chosenOne === 2) { chosenOne = 0}
  else { chosenOne++ };
}, 3000);
