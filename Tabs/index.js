class Tabs {
  constructor(tabsRef) {
    this.tabsRef = tabsRef;
    this.tabNav = this.tabsRef.querySelector(".tab-nav");
    this.tabLinks = this.tabsRef.querySelectorAll("a");
    this.tabContent = this.tabsRef.querySelector(".tab-content");
    this.articles = this.tabsRef.querySelectorAll("article");

    this.addEvents();
    this.setActiveTab(0);
  }

  setActiveTab(indexOfActiveTab) {
    this.tabLinks.forEach((tabLink, index) => {
      if (index === indexOfActiveTab) {
        tabLink.style.borderBottomColor = "black";
      } else {
        tabLink.style.borderBottomColor = "transparent";
      }
    });
  }

  addEvents() {
    const tabClickHandler = (e) => {
      e.preventDefault();

      const clickedTabLink = e.target.closest("a");
      if (!clickedTabLink) {
        return;
      }

      const indexOfActiveTab = Array.from(this.tabLinks).findIndex(
        (link) => link.href === clickedTabLink.href
      );

      this.setActiveTab(indexOfActiveTab);
      this.tabContent.children[indexOfActiveTab]?.scrollIntoView({
        behavior: "smooth",
      });
    };

    const tabContentScrollHandler = (e) => {
      const targetDomRect = e.target.getBoundingClientRect();

      const indexOfActiveTab = Array.from(this.articles).findIndex(
        (article) => {
          const articleDomRect = article.getBoundingClientRect();
          return Math.round(articleDomRect.left - targetDomRect.left) === 0;
        }
      );

      if (indexOfActiveTab !== -1) {
        this.setActiveTab(indexOfActiveTab);
      }
    };

    this.tabNav.addEventListener("click", tabClickHandler);
    this.tabContent.addEventListener("scroll", tabContentScrollHandler);
  }
}

const tabs = new Tabs(document.querySelector(".tabs"));
