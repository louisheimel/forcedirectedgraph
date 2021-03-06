// modified from the following code (Written by Mike Bostock): https://bl.ocks.org/mbostock/3180395

var config = {
	width:  screen.width,
	height: screen.height,
  leftFlagOffset: 500,
  topFlagOffset: 375,
  leftLinkOffset: 0,
  topLinkOffset: -40,
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
    flag.style.draggable = 'true' 
    flag.classList.add('flag', 'flag-' + e.code)
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

	// code modified from this Stack Overflow post: https://stackoverflow.com/questions/39218916/how-to-make-a-html-div-draggable-using-d3

	const addDivDragging = (sim) => {
    const isADiv = (e) => e.target.tagName === 'DIV'


		const divState = 
			{ dragging: false,
				mouseTarget: null,
				flagCode: null, 
			};

		const divMove = (e) => {
			// e is a mousedrag event
			// update x and y coordinates of currently moving div
			let current_flag = sim.nodes().filter(d => d.code === divState.flagCode)[0]
			current_flag.x = e.clientX - 8 - config.leftFlagOffset 
	  	current_flag.y = e.clientY - 5 - config.topFlagOffset 
		}

    window.addEventListener('mousedown', (e) => {
			if (isADiv(e)) {
				sim.restart()
				divState.dragging = true;
				divState.mouseTarget = e.target
				divState.flagCode = e.target.classList[1].split('-')[1]
				window.addEventListener('mousemove', divMove)
			}
    })

		window.addEventListener('mouseup', (e) => {
				if (divState.dragging) {
					divState.dragging = false;
					divState.mouseTarget = null
					window.removeEventListener('mousemove', divMove)
				}
    })
	}


  const renderNodes = (arr) => {
    arr.forEach((d, i) => {
      update(d)
    })
  }

  var simulation = d3.forceSimulation(data.nodes)
                     .force('xAxis', d3.forceX().x(config.width / 2))
                     .force('yAxis', d3.forceY().y(config.height / 2))
                     .force('repelForce', d3.forceManyBody().strength(-50))
                     .force('link', d3.forceLink(data.links))
                     .force('center', d3.forceCenter())
										 .alphaTarget(.03)
						

  addDivDragging(simulation)
  

  renderNodes(simulation.nodes())
  simulation.on('tick', function(d) { renderNodes(this.nodes()); tick(); })
	var context = canvas.node().getContext('2d')

  function tick() {

    const drawLink = d => {
      var linkOffsetX = config.leftLinkOffset,
        linkOffsetY = config.topLinkOffset;

		  context.moveTo(d.source.x + config.leftFlagOffset + linkOffsetX, d.source.y + config.topFlagOffset + linkOffsetY)
			context.lineTo(d.target.x + config.leftFlagOffset + linkOffsetX, d.target.y + config.topFlagOffset + linkOffsetY)
		},
    drawFlag = d => {
      let current_flag = flags.filter(e => d.code === e.code)[0].div
      current_flag.style.left = d.x + config.leftFlagOffset + 'px'
      current_flag.style.top = d.y + config.topFlagOffset + 'px'
    }
    
	  context.clearRect(0, 0, config.width, config.height)

		context.strokeStyle = "#ccc"
		context.beginPath();


		data.links.forEach(drawLink)

		context.stroke()

     
    data.nodes.forEach(drawFlag)
	}
})
