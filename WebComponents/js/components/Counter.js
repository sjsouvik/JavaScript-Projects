export class Counter extends HTMLElement {
  // styles of ":host" selector will apply to the main element i.e. counter-component element
  css = `
    :host{
        display: flex;
        gap: 1rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 20rem;
        border: 1px solid lightgray;
        border-radius: 0.5rem;
        padding: 1rem;
        font-size: 2rem;
    }

    .btn{
        cursor: pointer;
        padding: 0.25rem 2rem;
        font-size: 2rem
    }
`;
  constructor() {
    super();

    this.value = 0;

    this.attachShadow({ mode: "open" });
    this.render();
  }

  template() {
    return `
        <div>${this.value}</div>
        <div class="buttons">
            <button class="btn btn-increment">+</button>
            <button class="btn btn-decrement">-</button>
        </div>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = `
        <style>${this.css.trim()}</style>
        ${this.template().trim()}
    `;
    this.addEvents();
  }

  addEvents() {
    this.shadowRoot
      .querySelector(".btn-increment")
      .addEventListener("click", this.onIncrement);
    this.shadowRoot
      .querySelector(".btn-decrement")
      .addEventListener("click", this.onDecrement);
  }

  onIncrement = () => {
    this.value += 1;
    this.render();
  };

  onDecrement = () => {
    this.value = Math.max(0, this.value - 1);
    this.render();
  };
}
