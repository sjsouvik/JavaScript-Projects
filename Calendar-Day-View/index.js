import { getElement } from "./utils.js";

class DayView {
  constructor(root) {
    this.root = root;
    this.render();
    this.renderEvents();
  }

  render() {
    const html = Array(24)
      .fill(null)
      .map(
        (_, index) =>
          `<div class="slot">
                <div>${index > 12 ? index % 12 : index}${
            index > 12 ? "PM" : "AM"
          }</div>
                <div class="line"></div>
            </div>`
      )
      .join("");

    const element = getElement(html);
    this.root.appendChild(element);
  }

  renderEvents() {
    const events = [{ startTime: "1:00", endTime: "2:00" }];

    const fragment = document.createDocumentFragment();
    events.forEach((event) => {
      const eventHtml = `
        <div class="event">
            <p>
                ${event.startTime} - ${event.endTime}
            </p>
        </div>`;

      const eventNode = getElement(eventHtml);

      const [startHour, startMin] = event.startTime.split(":");
      const [endHour, endMin] = event.endTime.split(":");

      const top = (Number(startHour) + Number(startMin) / 60) * 60;
      const height =
        Number(endHour) +
        Number(endMin) / 60 -
        (Number(startHour) + Number(startMin) / 60) * 60;
      const eventEl = eventNode.querySelector(".event");
      eventEl.style.top = `${top}px`;
      eventEl.style.height = `${height}px`;

      fragment.appendChild(eventNode);
    });

    this.root.appendChild(fragment);
  }
}

const root = document.getElementById("root");
new DayView(root);
