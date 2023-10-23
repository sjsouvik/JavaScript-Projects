import { debounce, mockData } from "./utils.js";

export class Input {
  constructor(rootEl) {
    this.root = rootEl;
    this.render();
    this.addEvents();
  }

  render() {
    const container = document.createElement("div");
    container.classList.add("container");
    const input = document.createElement("input");
    input.classList.add("search-box");
    input.type = "search";
    input.setAttribute("placeholder", "Type to search");
    container.appendChild(input);
    this.root.appendChild(container);

    this.input = input;
    this.container = container;
  }

  addEvents() {
    const debouncedSearch = debounce(this.search.bind(this), 300);

    this.input.addEventListener("input", (e) => {
      debouncedSearch(e.target.value);
    });
  }

  search(searchText) {
    if (searchText === "" && this.searchList) {
      this.searchList.remove();
      return;
    }

    const filteredData = mockData.filter((data) =>
      data.title.toLowerCase().includes(searchText.toLowerCase())
    );

    this.renderSearchList(filteredData);
  }

  renderSearchList(data) {
    this?.searchList?.remove();
    const list = document.createElement("ul");
    list.classList.add("search-list");

    if (data.length === 0) {
      const listItem = document.createElement("li");
      listItem.classList.add("search-item");
      listItem.textContent = "No match found";
      list.appendChild(listItem);
    } else {
      const fragment = document.createDocumentFragment();
      data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("search-item");
        listItem.textContent = item.title;
        fragment.appendChild(listItem);
      });

      list.appendChild(fragment);
    }

    this.container.appendChild(list);

    this.searchList = list;
  }
}
