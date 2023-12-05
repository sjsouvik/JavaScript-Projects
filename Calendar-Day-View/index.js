import { getElement } from "./utils.js";

const events = [
  { startTime: "1:30", endTime: "2:00" },
  { startTime: "3:45", endTime: "4:45" },
];

class DayView {
  constructor(root) {
    this.root = root;
    this.render();

    this.events = this.transformData(events);
    this.renderEvents(events);
  }

  render() {
    const html = Array(24)
      .fill(null)
      .map(
        (_, index) =>
          `<div class="slot">
              <div class="time">${index > 12 ? index % 12 : index}${
            index > 12 ? "PM" : "AM"
          }</div>
              <div class="slot-events" data-hour=${index}>
                
              </div>  
            </div>`
      )
      .join("");

    const element = getElement(html);
    this.root.appendChild(element);
  }

  renderEvents() {
    this.events.forEach(
      ({ startTime, endTime, startHour, startMin, endHour, endMin }) => {
        const eventHtml = `
        <div class="event">
            <p>
              ${startTime} - ${endTime}
            </p>
        </div>`;

        const eventNode = getElement(eventHtml);

        // const top = (startHour + startMin / 60) * 51;
        const top = (startMin * 51) / 60;
        const height =
          (endHour + endMin / 60 - (startHour + startMin / 60)) * 51;
        const eventEl = eventNode.querySelector(".event");
        eventEl.style.top = `${top}px`;
        eventEl.style.height = `${height}px`;

        const slot = document.querySelector(`[data-hour="${startHour}"]`);
        slot.appendChild(eventNode);
      }
    );
  }

  transformData(events) {
    return events.map((event) => {
      let [startHour, startMin] = event.startTime.split(":");
      let [endHour, endMin] = event.endTime.split(":");

      startHour = Number(startHour);
      startMin = Number(startMin);
      endHour = Number(endHour);
      endMin = Number(endMin);

      return { ...event, startHour, startMin, endHour, endMin };
    });
  }
}

const root = document.getElementById("root");
new DayView(root);
