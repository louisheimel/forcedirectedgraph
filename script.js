// code inspiration from https://medium.com/ninjaconcept/interactive-dynamic-force-directed-graphs-with-d3-da720c6d7811
fetch('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json')
.then(response => response.json())
.then(data => {
  const config = {
    width: 80 + '%',
    height: 700 + 'px',
		background_color: '#ffffff',
		fill: 'cadetblue',
    display: 'block',
    margin: '0 auto',
    border: '1px solid black'
  }


		var root = d3.select('body')
					.append('canvas')
					.style('background-color', config.background_color)
					.style('width', config.width)
					.style('height', config.height)
					.style('border', config.border)
					.style('padding', config.padding + 'px')
					.style('display', config.display)
					.style('margin', config.margin)

		var simulation = d3.forceSimulation(data.nodes)
      .force("collisionForce", d3.forceCollide(15))
			.force("link", d3.forceLink(data.links))
			.force("center", d3.forceCenter()).on('tick', renderTick);

		renderCurrentNodeState()

		console.log(data)

    var img_src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
		function renderCurrentNodeState() {
			root.selectAll('.node')
          .data(simulation.nodes())
          .enter()
          .append('div')
          .attr('class', 'styled')
					.style('left', d => d.x)
					.style('top', d => d.y)
      //.append('div').style('position', 'absolute').style('left', d => d.x + 400).style('top', d => d.y + 400).style('width', '5px').style('height', '5px').style('border-radius', '2.5px').style('background-color', 'black')
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
