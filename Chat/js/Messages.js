import { getTimeFromTimestamp } from "./utils.js";

export class Messages {
  constructor(messages) {
    this.messages = messages;

    this.getHtml();
  }

  getHtml() {
    const messagesHtmlString = `
    <ul class="messages">
    ${Object.keys(this.messages)
      .map(
        (messageDate) =>
          `<label class="msg-date">${messageDate}</label>
        ${this.messages[messageDate]
          .map(
            (item) =>
              `<li            
            class=${`"msg ${item.sender === "USER" ? "user-msg" : "bot-msg"} ${
              item?.messageType === "optionedMessage" ? "option-msg" : ""
            }"`}
          >
            <p>${item.message}</p>
            <p class="msg-time">${getTimeFromTimestamp(item.timestamp)}</p>
          </li>`
          )
          .join("")}`
      )
      .join("")}    
  </ul>
    `;

    this.messagesHtml = messagesHtmlString;
  }
}
