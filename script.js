// modified from the following code (Written by Mike Bostock): https://bl.ocks.org/mbostock/3180395

var config = {
	width:  800,
	height: 700,
  margin: 'auto',
  display: 'block',
}

var canvas = d3.select('body').append('canvas')
		.attr('width', config.width + 'px')
		.attr('height', config.height + 'px')
    .style('display', config.display)
    .style('margin', config.margin)

fetch('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json')
.then(response => response.json())
.then(data => {
  var simulation = d3.forceSimulation(data.nodes)

	var context = canvas.node().getContext('2d')

  const flags = []
  data.nodes.forEach((d, i) => {
    // modified from Thomas's answer on this Stack Overflow thread: https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas

    let flag = document.createElement('div') 
    flag.classList.add('flag', 'flag-' + d.code)
    flag.onerror = () => { alert('not working!') }
    flag.style.position = 'absolute'
    flag.style.left = d.x + 350 + 'px'
    flag.style.top = d.y + 480 + 'px'
    flags.push({div: flag, code: d.code})

    document.body.appendChild(flag)

  })

//	var force = simulation.nodes(data.nodes)
//
//  force
//			 .links(data.links)
//       .charge(0)
//       .charge(-75)
//			 .on('tick', tick)
//  
//  force.start()

  function tick() {
	  context.clearRect(0, 0, config.width, config.height)

		context.strokeStyle = "#ccc"
		context.beginPath();

		data.links.forEach(d => {
		  context.moveTo(d.source.x, d.source.y)
			context.lineTo(d.target.x, d.target.y)
		})

		context.stroke()

    data.nodes.forEach(d => {
      let current_flag = flags.filter(e => d.code === e.code)[0].div
      current_flag.style.left = d.x + 'px'
      current_flag.style.top = d.y + 49 + 'px'
    })
	}
})
