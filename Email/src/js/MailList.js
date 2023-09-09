import { getElementFromHtml } from "./utils.js";

const mails = [
  { subject: "mail 1", content: "dxsk msm", tags: ["inbox"] },
  { subject: "mail 2", content: "dxsk msm", tags: ["inbox", "important"] },
];

export class MailList {
  constructor(emailType, mailsRoot) {
    this.elements = {};

    this.renderMails(emailType, mailsRoot);
  }

  renderMails(emailType, mailsRoot) {
    const filteredMails = mails.filter((mail) => mail.tags.includes(emailType));

    let mailList = "";
    filteredMails.forEach((mail) => {
      const mailEl = `
        <li class="mail">            
            <h2>${mail.subject}</h2>
            <p>${mail.content}</p>            
        </li>
        `;
      mailList += mailEl;
    });

    mailsRoot.innerHTML = `<ul>${mailList}</ul>`;
  }
}
