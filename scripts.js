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
}

//Above code for checking if input has a value and edidting css

//Below code is for small nav menu

let isClicked = false;

function toggleMenu() {
  isClicked = !isClicked;
  const smallToggle = document.querySelector(".small__nav-lines");
  const smallMenuItems = document.querySelector(".small__nav-items");
  if (isClicked) {
    smallToggle.classList.add("active");
    smallMenuItems.classList.add("active");
  } else {
    smallToggle.classList.remove("active");
    smallMenuItems.classList.remove("active");
  }
}

//Above is the code for the small nav

//Below is the code for the email form
function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".contact__loading");
  const success = document.querySelector(".contact__success");
  loading.classList.add("active-loading");

  // setTimeout(() => {
  //   console.log("it worked");
  //   alert(
  //     `The Email service is temporarily unavailable. Please contact me directly on tdl9716@gmail.com`
  //   );
  // }, 500);

  emailjs
    .sendForm(`service_ju9czme`, `template_p5md8rc`, event.target)
    .then((response) => {
      loading.classList.remove("active-loading");
      success.classList.add("success_send");
    })
    .catch((error) => {
      console.log("did not work", error);
      loading.classList.remove("active-loading");
      alert(
        `The Email service is temporarily unavailable. Please contact me directly on taylir@taylorfel.com`
      );
    });
}

//Above is for the email code

//Below is the init for thje AOS

AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});
