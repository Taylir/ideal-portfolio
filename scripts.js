//Below Code is for the gradient grid

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
    delay: anime.stagger(gridSpeed > 1200 ? 18 : 36, {
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

//Above code is for the Gradient Grid

//Below Code is for the card actions

let activeIndex = 0;

const groups = document.getElementsByClassName("card-group");

function handleRight() {
  const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;

  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
    nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);

  currentGroup.dataset.status = "after";

  setTimeout(() => {
    nextGroup.dataset.status = "becoming-active-from-before";
  }, 0);

  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  }, 100);
}

function handleLeft() {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;

  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
    nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);

  currentGroup.dataset.status = "before";

  setTimeout(() => {
    nextGroup.dataset.status = "becoming-active-from-after";
  }, 0);

  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  }, 100);
}

// above code for card carousel

//Below code for checking if input has value

function checkValue(eve, selClass) {
  const labels = document.querySelector(`.${selClass}`);
  if (eve.target.value) {
    labels.classList.add("value-true");
  } else if (!eve.target.value) {
    labels.classList.remove("value-true");
  }
  console.log(labels);
}
