import { getElement, getMeridian } from "./utils.js";
import { events } from "./data.js";

const gapBw2slots = 51;

class DayView {
  constructor(root) {
    this.root = root;
    this.renderSlots();

    this.queue = [];
    this.events = events;
    this.transformData(events);
    this.renderEvents();
  }

  renderSlots() {
    const html = Array(24)
      .fill(null)
      .map(
        (_, index) =>
          `<div class="slot">
              <div class="time">${index > 12 ? index % 12 : index}${getMeridian(
            index
          )}</div>
              <div class="slot-events" data-hour=${index}>
              </div>  
            </div>`
      )
      .join("");

    const element = getElement(html);
    this.root.appendChild(element);
  }

  getOverlapsCount(eventDetails) {
    let deleteCount = 0;

    // queue will contain only the events that are overlapping
    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];

      // condition to find out the number of events that are not overlapped and delete them
      if (
        eventDetails.startHour > item.endHour ||
        (eventDetails.startHour === item.endHour &&
          eventDetails.startMin >= item.endMin)
      ) {
        deleteCount++;
      }
    }

    this.queue.splice(0, deleteCount, eventDetails);
    return this.queue.length;
  }

  renderEvents() {
    this.events.forEach((event) => {
      const {
        startTime,
        endTime,
        startHour,
        startMin,
        endHour,
        endMin,
        color,
        title,
      } = event;
      const eventHtml = `
        <div class="event">
            <p class="mr-1">
              ${startTime}${getMeridian(startHour)} - ${endTime}${getMeridian(
        endHour
      )}
            </p>
            <p class="mr-1">${title}</p>
        </div>`;

      const eventNode = getElement(eventHtml);

      const overlaps = this.getOverlapsCount(event);
      const top = (startMin * gapBw2slots) / 60;
      const height =
        (endHour + endMin / 60 - (startHour + startMin / 60)) * gapBw2slots;
      const width = 100 / overlaps;
      const eventEl = eventNode.querySelector(".event");

      eventEl.style.top = `${top}px`;
      eventEl.style.height = `${height}px`;
      eventEl.style.width = `${width}%`;
      eventEl.style.backgroundColor = color;

      if (overlaps > 1) {
        eventEl.classList.add("overlap-event");
      }

      const slot = document.querySelector(`[data-hour="${startHour}"]`);
      slot.appendChild(eventNode);
    });
  }

  transformData() {
    this.events = this.events.map((event) => {
      let [startHour, startMin] = event.startTime.split(":");
      let [endHour, endMin] = event.endTime.split(":");

      startHour = Number(startHour);
      startMin = Number(startMin);
      endHour = Number(endHour);
      endMin = Number(endMin);

      return { ...event, startHour, startMin, endHour, endMin };
    });

    this.events = this.events.sort((a, b) => {
      if (a.startHour < b.startHour || a.endHour < b.endHour) {
        return -1;
      }

      if (a.startHour === b.startHour) {
        return a.startMin - b.startMin;
      }

      return 1;
    });
  }
}

const root = document.getElementById("root");
new DayView(root);
