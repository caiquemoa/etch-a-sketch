const board = document.getElementById('board')
let gridSize = document.getElementById('gridSize')
gridSize.addEventListener('change', createGrid)

createGrid()

function createGrid() {
	if (board.firstChild) cleanGird()

	for (let i = 0; i < gridSize.value; i++) {
		for (let j = 0; j < gridSize.value; j++) {
			const item = document.createElement('div')
			item.classList.add('gridItem')
			board.appendChild(item)
			item.style.flex = `1 1 ${100 / gridSize.value}%`
		}
	}
}

function cleanGird() {
	let elementChild = board.firstChild
	while (elementChild) {
		elementChild = board.firstChild
		if (elementChild) board.removeChild(elementChild)
	}
}
