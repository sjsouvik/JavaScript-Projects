import { ChatList } from "./ChatList.js";

const app = document.getElementById("app");

const fetchChats = async () => {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/codebuds-fk/chat/chats"
    );

    if (response?.status !== 200) {
      throw new Error(result?.error?.message);
    }

    const data = await response.json();
    new ChatList(app, data);
  } catch (error) {
    console.error(error);
  }
};

fetchChats();
