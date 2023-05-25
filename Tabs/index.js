class Tabs {
  constructor(tabsRef) {
    this.tabsRef = tabsRef;
    this.tabNav = this.tabsRef.querySelector(".tab-nav");
    this.tabLinks = this.tabsRef.querySelectorAll("a");

    this.addEvents();
  }

  addEvents() {
    const tabClickHandler = (e) => {
      const clickedTabLink = e.target.closest("a");

      const indexOfActiveTab = Array.from(this.tabLinks).findIndex(
        (link) => link.href === clickedTabLink.href
      );

      this.tabLinks.forEach((tabLink, index) => {
        if (index === indexOfActiveTab) {
          tabLink.style.borderBottomColor = "black";
        } else {
          tabLink.style.borderBottomColor = "transparent";
        }
      });
    };

    this.tabNav.addEventListener("click", tabClickHandler);
  }
}

const tabs = new Tabs(document.querySelector(".tabs"));
