import { getElementFromHtmlString } from "../helper/utils";

export class PostDetails {
  constructor(selectedPost) {
    const postDetailsHtml = `<div class="post-details"></div>`;
    this.root = getElementFromHtmlString(postDetailsHtml);

    this.root.textContent = selectedPost.body;
  }
}
