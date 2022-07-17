class Carousel {
  constructor() {
    this.init();
    this.attachEventHandlers();
  }

  init() {
    const app = document.getElementById("app");

    app.insertAdjacentHTML(
      "beforeend",
      `<div class="carousel">
            <div class="carousel-item fade" id="0">Content 1</div>
            <div class="carousel-item fade" id="1">Content 2</div>
            <div class="carousel-item fade" id="2">Content 3</div>

            <div class="btns">
                <button class="prev"><</button>
                <button class="next">></button>
            </div>
        </div>`
    );
  }

  addCarouselNav(carouselItems) {
    const carouseNavFragment = document.createDocumentFragment();

    carouselItems.forEach((_) => {
      const carouselBtn = document.createElement("span");
      carouselBtn.className = "carousel-btn";
      carouseNavFragment.appendChild(carouselBtn);
    });

    const carouselNav = document.createElement("div");
    carouselNav.className = "carousel-nav";
    carouselNav.appendChild(carouseNavFragment);

    const carousel = document.querySelector(".carousel");
    carousel.appendChild(carouselNav);

    return carouselNav;
  }

  attachEventHandlers() {
    const carouselItems = document.querySelectorAll(".carousel-item");
    const totalCarouselItems = carouselItems.length;

    const carouselNav = this.addCarouselNav(carouselItems);

    const carouselBtns = carouselNav.querySelectorAll(".carousel-btn");
    carouselBtns.forEach((carouselBtn, i) => {
      carouselBtn.addEventListener("click", () => {
        //remove selected class from previously selected carousel buttons and carousel items
        const selectedItemId = this.getIdOfSelectedItem();
        this.unselectTheSelected(carouselItems, carouselBtns, selectedItemId);

        //select the clicked button and content for it
        this.selectTheGivenItem(carouselItems, carouselBtns, i);
      });
    });

    document.querySelector(".prev").addEventListener("click", () => {
      const selectedItemId = this.getIdOfSelectedItem();
      const prevItemId =
        (selectedItemId - 1 + totalCarouselItems) % totalCarouselItems;

      this.unselectTheSelected(carouselItems, carouselBtns, selectedItemId);
      this.selectTheGivenItem(carouselItems, carouselBtns, prevItemId);
    });

    document.querySelector(".next").addEventListener("click", () => {
      const selectedItemId = this.getIdOfSelectedItem();
      const nextItemId = (selectedItemId + 1) % totalCarouselItems;

      this.unselectTheSelected(carouselItems, carouselBtns, selectedItemId);
      this.selectTheGivenItem(carouselItems, carouselBtns, nextItemId);
    });

    // show 1st content as selected on page load
    this.selectTheGivenItem(carouselItems, carouselBtns, 0);
  }

  getIdOfSelectedItem() {
    const currentSelected = document.querySelector(".carousel-item.selected");
    return +currentSelected.getAttribute("id");
  }

  unselectTheSelected(items, btns, selectedItemId) {
    items[selectedItemId].classList.remove("selected");
    btns[selectedItemId].classList.remove("selected");
  }

  selectTheGivenItem(items, btns, itemId) {
    items[itemId].classList.add("selected");
    btns[itemId].classList.add("selected");
  }
}

export default Carousel;
