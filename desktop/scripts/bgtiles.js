let tileSize = 30;
let tileBorders = false;
let hoverAffectedRadius = 5; // 0 is disabled
let tileBorderRadius = 2; // Expressed in pixels

let columns;
let rows;

const wrapper = document.getElementById("tiles-container");

const updateGrid = () => {
	wrapper.innerHTML = "";

	columns = Math.floor(wrapper.clientWidth / tileSize);
	rows = Math.floor(wrapper.clientHeight / tileSize);

	wrapper.style.setProperty("--columns", columns);
	wrapper.style.setProperty("--rows", rows);
	wrapper.style.setProperty("--borderRadius", tileBorderRadius + "px");

	createTiles(columns * rows);
};

const createTiles = (quantity) => {
	Array.from(Array(quantity)).map((tile, index) => {
		wrapper.appendChild(createTile(index));
	});
};

const createTile = (index) => {
	const tile = document.createElement("div");

	tile.style.borderRadius = tileBorderRadius + "px";
	tile.classList.add("tile");
	if (tileBorders) tile.classList.add("tile-bordered");
	else tile.classList.add("tile-noborder");

	tile.onmouseover = () => {
		handleMouseOver(index);
	};

	tile.onmouseout = () => {
		clearOpacity();
	};

	return tile;
};

const handleMouseOver = (index) => {
	let x_c = Math.floor(index / columns);
	let y_c = index - x_c * columns;
	let rad = hoverAffectedRadius;

	let op = 1;
	for (let r = rad; r > 0; r--) {
		for (let i = 0; i < wrapper.children.length; i++) {
			let x = Math.floor(i / columns);
			let y = i - x * columns;

			if (Math.pow(x - x_c, 2) + Math.pow(y - y_c, 2) <= Math.pow(r, 2)) {
				wrapper.children[i].style.opacity = op;
			}
		}

		if (op > 0) {
			op -= 0.2;
		}
	}

	wrapper.children[index].style.opacity = op;
};

const clearOpacity = () => {
	for (let i = 0; i < rows * columns; i++) {
		wrapper.children[i].style.opacity = 1;
	}
};

const updateSettings = () => {
	let newTileSize = document.getElementById("bgtiles-size").value;
	let newHoverRadius = document.getElementById("bgtiles-hover-radius").value;
	let newBorderRadius = document.getElementById(
		"bgtiles-border-radius"
	).value;
	let newBorderVisibility = document.getElementById(
		"bgtiles-border-visible"
	).checked;

	if (newTileSize != tileSize) {
		document.getElementById("bgtiles-border-radius").max = Math.ceil(
			newTileSize / 2
		);
	}

	if (newHoverRadius != hoverAffectedRadius) {
		hoverAffectedRadius = newHoverRadius;
	} else {
		tileSize = newTileSize;
		tileBorders = newBorderVisibility;
		tileBorderRadius = newBorderRadius;

		updateGrid();
	}
};

updateGrid();
window.onresize = () => {
	updateGrid();
};
