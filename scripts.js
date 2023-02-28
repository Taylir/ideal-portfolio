const wrapper = document.getElementById("tiles");
const bodyWrapper = document.querySelector(".tiles__wrapper");

let columns = 0,
  rows = 0,
  toggled = false,
  gridSpeed = 900;

function toggle() {
  toggled = !toggled;

  bodyWrapper.classList.toggle("toggled");
}

const handleOnClick = (index) => {
  toggle();

  anime({
    targets: ".tile",
    opacity: toggled ? 1 : 0,
    delay: anime.stagger(gridSpeed > 1200 ? 15 : 30, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

function goodGridSpeed() {
  gridSpeed = window.visualViewport.width;
}

const createTile = (index) => {
  const tile = document.createElement("div");

  tile.classList.add("tile");

  tile.style.opacity = toggled ? 1 : 0;

  tile.onclick = (e) => handleOnClick(index);

  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";

  (columns = Math.floor(document.body.clientWidth / 50)),
    (rows = Math.floor(document.body.clientHeight / 50));

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
};

createGrid();
window.onresize = () => {
  createGrid();
  goodGridSpeed();
};
