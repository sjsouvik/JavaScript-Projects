import { Messages } from "./Messages.js";
import { transformToObj } from "./utils.js";

export class ChatDetails {
  constructor(selectedChat) {
    this.selectedChat = selectedChat;

    this.getHtml();
  }

  getHtml() {
    const messages = transformToObj(this.selectedChat.messageList);
    const messagesHtmlString = new Messages(messages).messagesHtml;

    const chatDetailsHtmlString = `
    <section class="chat-view">
        <header class="chat-title">
        <img src=${this.selectedChat.imageURL} height="40" width="40" />
        <p>${this.selectedChat.title}</p>
        </header>
        <section class="messages-section">
        ${messagesHtmlString}
        </section>
        <form class="send-message" >
            <input
                type="text"
                placeholder="Type a Message..."
                class="message-input"        
            />
            <button class="send-btn">Send</button>
        </form>
    </section>
    `;

    this.chatDetailsHtml = chatDetailsHtmlString;
  }
}
