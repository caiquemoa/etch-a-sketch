const board = document.getElementById('board')
const gridSize = document.getElementById('gridSize')
const gridLabel = document.getElementById('gridLabel')
gridSize.addEventListener('change', createGrid)

const body = document.getElementsByTagName('body')[0]

let mouseDown = false

body.addEventListener('mouseup', () => (mouseDown = false))

createGrid()

const colorElement = document.getElementById('color')
const resetGrid = document.getElementById('reset')
const eraser = document.getElementById('eraser')
const rainbow = document.getElementById('rainbow')
const gridLines = document.getElementById('gridLines')
const darken = document.getElementById('darken')
const lighter = document.getElementById('lighter')

let color = colorElement.value

let randomColor = false

let darkenColor = false

let lightenColor = false

colorElement.addEventListener('click', () => {
	booleanReset()
	color = colorElement.value
})

colorElement.addEventListener('change', () => {
	booleanReset()
	color = colorElement.value
})

eraser.addEventListener('click', () => {
	booleanReset()
	color = 'white'
})

rainbow.addEventListener('click', () => {
	booleanReset()
	randomColor = true
})

resetGrid.addEventListener('click', createGrid)

darken.addEventListener('click', () => {
	booleanReset()
	darkenColor = true
})

lighter.addEventListener('click', () => {
	booleanReset()
	lightenColor = true
})

gridLines.addEventListener('click', () => {
	if (board.classList.contains('board')) return board.classList.remove('board')
	board.classList.add('board')
})

function createGrid() {
	if (board.firstChild) cleanGird()
	gridLabel.textContent = `${gridSize.value}x${gridSize.value}`
	for (let i = 0; i < gridSize.value; i++) {
		for (let j = 0; j < gridSize.value; j++) {
			const item = document.createElement('div')
			item.classList.add('gridItem')

			item.addEventListener('mouseover', paintItem)
			item.addEventListener('mousedown', () => {
				mouseDown = true
			})
			item.addEventListener('mousedown', paintItem)

			board.appendChild(item)
			item.style.flex = `1 1 ${100 / gridSize.value}%`
			item.style.backgroundColor = '#fff'
		}
	}
}

function paintItem() {
	if (mouseDown) {
		if (randomColor) {
			this.style.backgroundColor = `rgb(${Math.floor(
				Math.random() * 245
			)} ${Math.floor(Math.random() * 245)} ${Math.floor(Math.random() * 245)})`
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
		} else {
			this.style.backgroundColor = color
		}
	}
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
		// A cor não é um formato válido
		console.log('cor invalida')
	}
}
