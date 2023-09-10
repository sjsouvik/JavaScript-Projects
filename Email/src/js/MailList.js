import { MailDetails } from "./MailDetails.js";
import { getElementFromHtml } from "./utils.js";

let mails = [
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
  constructor(emailType, root) {
    this.elements = {};

    document.querySelector(".mails")?.remove();
    document.querySelector(".mail-details")?.remove();

    this.elements.mailsSection = getElementFromHtml(
      `<section class="mails"></section>`
    );
    root.append(this.elements.mailsSection);

    this.elements.mailDetails = getElementFromHtml(
      `<section class="mail-details"></section>`
    );
    this.elements.mailDetails.innerHTML = "";
    root.append(this.elements.mailDetails);

    this.renderMails(emailType);
    this.addEvents();
  }

  renderMails(emailType) {
    const filteredMails = mails.filter((mail) => mail.tags.includes(emailType));

    let mailList = "";
    filteredMails.forEach((mail) => {
      const markedAsImportant = mail.tags.some((tag) => tag === "important");

      const mailEl = `
        <li class="mail" data-mail-id=${mail.id}>            
            <h2>${mail.subject}</h2>
            <p class="line-2">${mail.content}</p> 
            <section class="actions">
              <button data-action="read">Read</button>           
              <button data-action="important">${
                markedAsImportant ? "Marked as Important" : "Mark as important"
              }</button>           
            </section>
        </li>
        `;
      mailList += mailEl;
    });

    this.elements.mailsSection.innerHTML = `<ul>${mailList}</ul>`;
  }

  addEvents() {
    this.elements.mailsSection.addEventListener("click", (e) => {
      const selectedMail = e.target.closest("li");
      const selectedMailId = selectedMail?.dataset.mailId;

      if (e.target.dataset.action === "important") {
        this.handleMarkAsImportant({
          targetElement: e.target,
          selectedMail,
          selectedMailId,
        });
        return;
      }

      const selectedMailDetails = mails.find(
        (mail) => mail.id === selectedMailId
      );

      this.selectedMail?.classList.remove("active");
      this.selectedMail = selectedMail;
      selectedMail.classList.add("active");
      this.elements.mailDetails.innerHTML = new MailDetails(
        selectedMailDetails
      ).root;
    });
  }

  handleMarkAsImportant({ targetElement, selectedMail, selectedMailId }) {
    if (targetElement.textContent.toLowerCase() === "mark as important") {
      mails = mails.map((mail) =>
        mail.id === selectedMailId
          ? { ...mail, tags: mail.tags.concat("important") }
          : mail
      );

      targetElement.textContent = "Marked as important";
    } else {
      mails = mails.map((mail) =>
        mail.id === selectedMailId
          ? {
              ...mail,
              tags: mail.tags.filter((tag) => tag !== "important"),
            }
          : mail
      );
      targetElement.textContent = "Mark as important";
      if (location.pathname.includes("important")) {
        selectedMail.remove();
        this.elements.mailDetails.innerHTML = "";
      }
    }
  }
}
