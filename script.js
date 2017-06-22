// modified from the following code (Written by Mike Bostock): https://bl.ocks.org/mbostock/3180395

var config = {
	width:  800,
	height: 700,
  leftFlagOffset: 500,
  topFlagOffset: 320,
  margin: 'auto',
  display: 'block',
}


const flags = []

const update = (e) => {
  // check if e is in array
  const flagIsInList = el => flags.map(e => e.code).includes(e.code)
  if (flagIsInList(e)) {

    let current_flag_element = flags.filter(el => el.code === e.code)[0].div
    current_flag_element.style.left = e.x + config.leftFlagOffset + 'px'
    current_flag_element.style.top = e.y + config.topFlagOffset + 'px'

  } else {
    // push new obj to array
    let flag = document.createElement('div')
    flag.classList.add('flag', 'flag-' + e.code)
    flag.onerror = () => { alert('not working!') }
    flag.style.position = 'absolute'
    flag.style.left = e.x + config.leftFlagOffset + 'px'
    flag.style.top = e.y + config.topFlagOffset + 'px'

    let obj = {code: e.code, div: flag}
    flags.push(obj)

    document.body.appendChild(flag)

    flags.push(obj)
  }
  
  return e
}

var canvas = d3.select('body').append('canvas')
		.attr('width', config.width + 'px')
		.attr('height', config.height + 'px')
    .style('display', config.display)
    .style('margin', config.margin)

fetch('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json')
.then(response => response.json())
.then(data => {
  const renderNodes = (arr) => {
    arr.forEach((d, i) => {
      update(d)
    })
  }

  var simulation = d3.forceSimulation(data.nodes)
                     .force('charge', d3.forceManyBody().strength(-4))
                     .force('link', d3.forceLink(data.links))
                     .force('center', d3.forceCenter())

  renderNodes(simulation.nodes())
  simulation.on('tick', function(d) { renderNodes(this.nodes()); tick(); })
	var context = canvas.node().getContext('2d')

  var linkOffsetX = -230,
      linkOffsetY = -45;
  function tick() {
	  context.clearRect(0, 0, config.width, config.height)

		context.strokeStyle = "#ccc"
		context.beginPath();

		data.links.forEach(d => {
		  context.moveTo(d.source.x + config.leftFlagOffset + linkOffsetX, d.source.y + config.topFlagOffset + linkOffsetY)
			context.lineTo(d.target.x + config.leftFlagOffset + linkOffsetX, d.target.y + config.topFlagOffset + linkOffsetY)
		})

		context.stroke()

    data.nodes.forEach(d => {
      let current_flag = flags.filter(e => d.code === e.code)[0].div
      current_flag.style.left = d.x + config.leftFlagOffset + 'px'
      current_flag.style.top = d.y + config.topFlagOffset + 'px'
    })
	}
})
