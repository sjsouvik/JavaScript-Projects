export class MailDetails {
  constructor(mailDetails) {
    this.root = `
        <article>
            <h2>${mailDetails.subject}</h2>
            <p>${mailDetails.content}</p>
        </article>
    `;
  }
}
