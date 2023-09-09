import { MailDetails } from "./MailDetails.js";

const mails = [
  {
    id: crypto.randomUUID(),
    subject: "mail 1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nostrum blanditiis itaque ipsam aliquid a quos, quam perspiciatis accusantium id inventore eos nemo dicta provident dolorum! Sint quam blanditiis aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolore molestiae adipisci illo corporis et alias quo. Error ducimus tempora consequatur quas cumque expedita tenetur dignissimos alias necessitatibus. Soluta, fuga. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, totam officiis. Voluptatum accusantium, placeat inventore libero fuga impedit quo vitae, nihil repudiandae nostrum expedita quos, facilis illo cum qui cupiditate. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente magnam inventore harum molestias esse natus numquam, provident quisquam, minima earum expedita labore soluta pariatur! Consectetur praesentium voluptatem voluptates sed aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, molestiae. Id accusamus voluptatem temporibus officia dolore necessitatibus praesentium, magni consectetur voluptates. Maxime ut molestiae hic, similique provident officia? Fuga, deleniti?",
    tags: ["inbox"],
  },
  {
    id: crypto.randomUUID(),
    subject: "mail 2",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nostrum blanditiis itaque ipsam aliquid a quos, quam perspiciatis accusantium id inventore eos nemo dicta provident dolorum! Sint quam blanditiis aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dolore molestiae adipisci illo corporis et alias quo. Error ducimus tempora consequatur quas cumque expedita tenetur dignissimos alias necessitatibus. Soluta, fuga. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, totam officiis. Voluptatum accusantium, placeat inventore libero fuga impedit quo vitae, nihil repudiandae nostrum expedita quos, facilis illo cum qui cupiditate. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente magnam inventore harum molestias esse natus numquam, provident quisquam, minima earum expedita labore soluta pariatur! Consectetur praesentium voluptatem voluptates sed aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere, molestiae. Id accusamus voluptatem temporibus officia dolore necessitatibus praesentium, magni consectetur voluptates. Maxime ut molestiae hic, similique provident officia? Fuga, deleniti?",
    tags: ["inbox", "important"],
  },
];

export class MailList {
  constructor(emailType, mailsRoot) {
    this.elements = {};

    this.renderMails(emailType, mailsRoot);
    this.addEvents(mailsRoot);
  }

  renderMails(emailType, mailsRoot) {
    const filteredMails = mails.filter((mail) => mail.tags.includes(emailType));

    let mailList = "";
    filteredMails.forEach((mail) => {
      const mailEl = `
        <li class="mail" data-mail-id=${mail.id}>            
            <h2>${mail.subject}</h2>
            <p class="line-2">${mail.content}</p>            
        </li>
        `;
      mailList += mailEl;
    });

    mailsRoot.innerHTML = `<ul>${mailList}</ul>`;
  }

  addEvents(mailsRoot) {
    mailsRoot.addEventListener("click", (e) => {
      const selectedMail = e.target.closest("li");
      const selectedMailId = selectedMail?.dataset.mailId;
      const selectedMailDetails = mails.find(
        (mail) => mail.id === selectedMailId
      );

      this.selectedMail?.classList.remove("active");
      this.selectedMail = selectedMail;
      selectedMail.classList.add("active");
      document.querySelector(".mail-details").innerHTML = new MailDetails(
        selectedMailDetails
      ).root;
    });
  }
}
