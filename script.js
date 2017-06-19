// code inspiration from https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811
fetch('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json')
.then(response => response.json())
.then(data => {
  const config = {
    width: 1000,
    height: 500,
		fill: 'cadetblue',
    display: 'block',
    margin: '0 auto',
    border: '1px solid black'
  }


  console.log(data)
		var root = d3.select('body')
					.append('svg')
					.attr('width', config.width)
					.attr('height', config.height)
					.style('border', config.border)
					.style('padding', config.padding)
					.style('display', config.display)
					.style('margin', config.margin)

		var simulation = d3.forceSimulation(data.nodes)
			.force("charge", d3.forceManyBody())
			.force("link", d3.forceLink(data.links))
			.force("center", d3.forceCenter()).on('tick', renderTick);

		renderCurrentNodeState()
		root.append('circle').attr('x', 50).attr('y', 50).attr('r', 5)

		var svg = d3.select('body').append('svg')

		console.log(data)
		function renderCurrentNodeState() {
			root.selectAll('.node').data(simulation.nodes()).enter().append('circle').attr('cx', nd => nd.x + 400).attr('cy', nd => nd.y + 250).attr('r', '5')
		}
		function renderTick() {
			//from StackOverflow: https://stackoverflow.com/questions/3674265/is-there-an-easy-way-to-clear-an-svg-elements-contents
			root.selectAll('*').remove()
		  renderCurrentNodeState()
		}
  console.log(data)
})
.catch(err => {
  console.log(err)
})
