import "./styles.css";

const imageContainer = document.getElementById("image-container");

let page = -1;

const loadAndAddImages = async () => {
  page++;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
  );

  const images = await response.json();

  images.forEach((image) => {
    const imgEl = document.createElement("img");
    imgEl.src = image.url;
    imgEl.height = "200";
    imgEl.width = "200";
    imageContainer.appendChild(imgEl);
  });
};

loadAndAddImages();

// scrollY --> height of the part that we have scrolled from the top(or, invisible part at the top)
// innerHeight --> height of the visible part in the screen
// scrollHeight --> total height of the html document

// not good for web performance, use IntersectionObserver instead
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    loadAndAddImages();
  }
});
