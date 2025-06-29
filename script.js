//your code here
const imageContainer = document.getElementById("image-container");
const verifyBtn = document.getElementById("verify");
const resetBtn = document.getElementById("reset");
const message = document.getElementById("para");

const images = [
  "img1", "img2", "img3", "img4", "img5"
];

let selected = [];
let imageElements = [];

function getRandomDuplicate(images) {
  const randomIndex = Math.floor(Math.random() * images.length);
  const duplicate = images[randomIndex];
  return [...images, duplicate];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createImages() {
  imageContainer.innerHTML = "";
  selected = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  message.textContent = "";

  let randomImages = getRandomDuplicate(images);
  randomImages = shuffle(randomImages);

  imageElements = randomImages.map((cls, index) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.class = cls;
    img.addEventListener("click", () => onImageClick(img));
    imageContainer.appendChild(img);
    return img;
  });
}

function onImageClick(img) {
  if (selected.includes(img)) return;

  img.classList.add("selected");
  selected.push(img);

  if (selected.length === 1) {
    resetBtn.style.display = "inline-block";
  } else if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  } else {
   
    return;
  }
}

resetBtn.addEventListener("click", () => {
  selected.forEach(img => img.classList.remove("selected"));
  selected = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  message.textContent = "";
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  const [first, second] = selected;
  if (first.dataset.class === second.dataset.class) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.onload = createImages;
