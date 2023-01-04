const board = document.getElementById('board')
const gridSize = document.getElementById('gridSize')
const rangeLabel = document.getElementById('rangeLabel')
gridSize.addEventListener('change', createGrid)

const body = document.getElementsByTagName('body')[0]

let mouseDown = false

body.addEventListener('mouseup', () => (mouseDown = false))

const colorInput = document.getElementById('colorInput')

colorInput.addEventListener('click', () => {
	booleanReset()
	color = colorInput.value
})

colorInput.addEventListener('change', () => {
	booleanReset()
	color = colorInput.value
})

const eraser = document.getElementById('eraser')

eraser.addEventListener('click', () => {
	booleanReset()
	color = 'white'
})

const rgb = document.getElementById('rgb')

let randomColor = false

rgb.addEventListener('click', () => {
	booleanReset()
	randomColor = true
})

const resetGrid = document.getElementById('reset')

resetGrid.addEventListener('click', createGrid)

const gridLines = document.getElementById('gridLines')

gridLines.addEventListener('click', () => {
	if (board.classList.contains('board')) return board.classList.remove('board')
	board.classList.add('board')
})

const darken = document.getElementById('darken')
let darkenColor = false

darken.addEventListener('click', () => {
	booleanReset()
	darkenColor = true
})

const lighter = document.getElementById('lighter')

let lightenColor = false

lighter.addEventListener('click', () => {
	booleanReset()
	lightenColor = true
})

function createGrid() {
	if (board.firstChild) cleanGird()
	rangeLabel.textContent = `${gridSize.value}x${gridSize.value}`
	for (let i = 0; i < gridSize.value * gridSize.value; i++) {
		const item = document.createElement('div')
		item.style.backgroundColor = '#fff'
		item.style.flex = `1 1 ${100 / gridSize.value}%`
		item.style.userSelect = 'none'

		item.addEventListener('mouseover', paintItem)

		item.addEventListener('mousedown', () => {
			mouseDown = true
		})

		item.addEventListener('mousedown', paintItem)

		board.appendChild(item)
	}
}

function paintItem() {
	if (!mouseDown) return
	if (!randomColor & !darkenColor & !lightenColor)
		return (this.style.backgroundColor = color)

	if (randomColor) {
		this.style.backgroundColor = getRandomColor()
	} else if (darkenColor) {
		this.style.backgroundColor = darkenLightenColor(
			this.style.backgroundColor,
			10
		)
	} else if (lightenColor) {
		this.style.backgroundColor = darkenLightenColor(
			this.style.backgroundColor,
			-10
		)
	}
}

function getRandomColor() {
	return `rgb(${Math.floor(Math.random() * 245)} ${Math.floor(
		Math.random() * 245
	)} ${Math.floor(Math.random() * 245)})`
}

function booleanReset() {
	darkenColor = false
	lightenColor = false
	randomColor = false
}

function cleanGird() {
	let elementChild = board.firstChild
	while (elementChild) {
		elementChild = board.firstChild
		if (elementChild) board.removeChild(elementChild)
	}
}

function darkenLightenColor(color, percent) {
	if (typeof color === 'string' && color[0] === '#') {
		// A cor é um string no formato hexadecimal
		let usePound = false

		if (color[0] === '#') {
			color = color.slice(1)
			usePound = true
		}

		let num = parseInt(color, 16)

		let r = (num >> 16) * (1 - percent / 100)

		if (r < 0) r = 0
		else if (r > 255) r = 255

		let b = ((num >> 8) & 0x00ff) * (1 - percent / 100)

		if (b < 0) b = 0
		else if (b > 255) b = 255

		let g = (num & 0x0000ff) * (1 - percent / 100)

		if (g < 0) g = 0
		else if (g > 255) g = 255

		return 'rgb(' + r + ', ' + g + ', ' + b + ')'
	} else if (
		typeof color === 'string' &&
		color.match(/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i)
	) {
		// A cor é uma string no formato RGB
		let parts = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)
		return (
			'rgb(' +
			Math.max(0, Math.min(255, parseInt(parts[1], 10) - percent)) +
			', ' +
			Math.max(0, Math.min(255, parseInt(parts[2], 10) - percent)) +
			', ' +
			Math.max(0, Math.min(255, parseInt(parts[3], 10) - percent)) +
			')'
		)
	} else {
		console.log('invalid color')
	}
}

createGrid()
