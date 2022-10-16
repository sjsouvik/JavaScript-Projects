import { PostContainer } from "./components/PostContainer";

import "./styles.css";

const loadPosts = async () => {
  const url = "https://jsonplaceholder.typicode.com";
  const response = await fetch(`${url}/posts`);
  const posts = await response.json();

  new PostContainer(document.querySelector(".posts"), posts.slice(0, 20));
};

loadPosts();
