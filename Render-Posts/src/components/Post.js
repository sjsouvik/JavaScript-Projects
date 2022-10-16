import { PostContainer } from "./PostContainer";
import { getElementFromHtmlString } from "../helper/utils";

export class Post {
  constructor(id, title) {
    const postHtml = `
        <div class="post-title"></div>
        `;

    this.root = getElementFromHtmlString(postHtml);
    this.root.textContent = title;
    this.root.dataset.id = id;

    this.root.addEventListener("click", () => {
      console.log(id);
      new PostContainer().renderSelectedPostDetails(id);
    });
  }
}
