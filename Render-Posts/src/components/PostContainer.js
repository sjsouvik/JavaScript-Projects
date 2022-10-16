import { Post } from "./Post";
import { PostDetails } from "./PostDetails";

export class PostContainer {
  constructor(root, posts) {
    this.root = root;

    this.posts = posts;

    const postFragment = document.createDocumentFragment();

    posts.forEach((post) => {
      const postView = new Post(post.id, post.title);
      postFragment.appendChild(postView.root);
    });

    this.root.appendChild(postFragment);

    this.renderSelectedPostDetails();
  }

  renderSelectedPostDetails(postId = 0) {
    const selectedPostConatiner = document.querySelector(".selected-post");
    selectedPostConatiner.innerHtml = "";

    const postDetails = new PostDetails(this.posts[postId]);
    selectedPostConatiner.appendChild(postDetails.root);
  }

  getPosts() {
    return [
      { id: 1, title: "apple", body: "One apple a day keeps the doctor away" },
      {
        id: 2,
        title: "banana",
        body: "One banana a day keeps the doctor away",
      },
      {
        id: 3,
        title: "watermelon",
        body: "One watermelon a day keeps the doctor away",
      },
    ];
  }
}
