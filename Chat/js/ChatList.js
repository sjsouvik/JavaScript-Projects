import { ChatDetails } from "./ChatDetails.js";
import { Messages } from "./Messages.js";
import {
  getDateFromTimestamp,
  getElementFromHtmlString,
  transformToObj,
} from "./utils.js";

export class ChatList {
  constructor(app, data) {
    this.chats = data;
    this.app = app;

    this.render();
    this.addEvents();
  }

  getListHtml(chats) {
    const listHtml = `
    ${chats
      .map(
        (chat) =>
          `<li class="chat-item" role="button" data-chat-id=${chat.id}>
                  <img src=${chat.imageURL} height="40" width="40" />
                  <div>
                      <p>${chat.title}</p>
                      <p>${chat.orderId}</p>
                  </div>
                  <div class="latest-message-date">
                      ${getDateFromTimestamp(
                        chat.latestMessageTimestamp
                      ).toLocaleString()}
                  </div>
              </li>`
      )
      .join("")}
    `;

    return listHtml;
  }

  render() {
    const chatListHtmlString = `
    <ul class="chats">
        ${this.getListHtml(this.chats)}
    </ul>`;

    const htmlString = `
    <div class="container">
        <section class="chat-list">
            <label>Filter by Title / Order ID           
                <input type="search" placeholder="Start typing to search" class="search-box" />
            </label>
            ${chatListHtmlString}
        </section>
    </div>
    `;

    const chatList = getElementFromHtmlString(htmlString);
    this.app.appendChild(chatList);

    this.container = document.querySelector(".container");
    this.chatList = document.querySelector(".chat-list");
    this.chatsEl = document.querySelector(".chats");
    this.searchInput = document.querySelector(".search-box");
  }

  addEvents() {
    this.searchInput.addEventListener("input", (e) => {
      const { value } = e.target;

      const filteredChats = this.chats.filter(
        (chat) =>
          chat.title.toLowerCase().includes(value.toLowerCase()) ||
          chat.orderId.toLowerCase().includes(value.toLowerCase())
      );

      const filteredChatListHtmlString = this.getListHtml(filteredChats);
      this.chatsEl.innerHTML = filteredChatListHtmlString;
    });

    this.chatsEl.addEventListener("click", (e) => {
      const list = e.target.closest("li");
      const { chatId } = list.dataset;

      this.selectedChatEl?.classList.remove("selected");
      this.selectedChatEl = list;
      list.classList.add("selected");

      this.selectedChatId = Number(chatId);
      this.selectedChat = this.chats.find(
        (chat) => chat.id === this.selectedChatId
      );

      this.container.classList.add("divide");
      this.renderChatDetails();
    });
  }

  renderChatDetails() {
    this.selectedChat = this.chats.find(
      (chat) => chat.id === Number(this.selectedChatId)
    );
    this.chatDetailsSec = document.querySelector(".chat-view");
    this.chatDetailsSec?.remove();

    const chatDetailsHtmlString = new ChatDetails(this.selectedChat)
      .chatDetailsHtml;

    const chatDetailsHtml = getElementFromHtmlString(chatDetailsHtmlString);
    this.container.appendChild(chatDetailsHtml);

    this.messagesSec = document.querySelector(".messages-section");
    this.messageForm = document.querySelector(".send-message");
    this.messageInput = document.querySelector(".message-input");
    this.sendBtn = document.querySelector(".send-btn");
    this.addChatDetailsEvents();
  }

  addChatDetailsEvents() {
    this.messageForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.messageInput.value === "") {
        return;
      }

      this.addNewMessage();
    });
  }

  addNewMessage() {
    const messageToAdd = {
      messageId: crypto.randomUUID(),
      message: this.messageInput.value,
      messageType: "text",
      sender: "USER",
      timestamp: Date.now(),
    };

    this.chats = this.chats.map((chat) =>
      chat.id === this.selectedChatId
        ? { ...chat, messageList: [...chat.messageList, messageToAdd] }
        : chat
    );

    this.selectedChat = this.chats.find(
      (chat) => chat.id === this.selectedChatId
    );

    const messages = transformToObj(this.selectedChat.messageList);
    const messagesHtmlString = new Messages(messages).messagesHtml;
    this.messagesSec.innerHTML = messagesHtmlString;
    this.messageInput.value = "";
  }
}
