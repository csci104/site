class Toc {
  static install() {
    const toc = document.getElementsByClassName("section-nav").item(0);
    if (toc !== null) {
      new Toc(toc);
    }
  }

  constructor(toc) {
    this.waiting = false;
    this.elements = this.getElements(toc);
    this.addEventListeners();
    this.setFirstInView();
  }

  getElements(toc) {
    return Array
      .from(toc.getElementsByTagName("a"))
      .map(link => ({link: link, header: document.getElementById(link.href.split("#", 2)[1])}));
  }

  addEventListeners() {
    window.addEventListener("scroll", () => {
      if (!this.waiting) {
        this.waiting = true;
        requestAnimationFrame(() => this.setFirstInView());
      }
    });
  }

  setFirstInView() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.setLastInView();
    } else {
      this.setFirstInViewRest();
    }
    this.waiting = false;
  }

  setLastInView() {
    for (const pair of this.elements) {
      pair.link.classList.remove("first-in-view");
    }
    this.elements[this.elements.length - 1].link.classList.add("first-in-view");
  }

  setFirstInViewRest() {
    let set = false;
    for (const pair of this.elements) {
      const headerBounds = pair.header.getBoundingClientRect()
      if (!set && headerBounds.top > 0) {
        pair.link.classList.add("first-in-view");
        set = true;
      } else {
        pair.link.classList.remove("first-in-view");
      }
    }
  }
}

class Tasks {
  static install() {
    const percentage = document.getElementById("task-percentage");
    const nextIncomplete = document.getElementById("task-next-incomplete");
    if (percentage && nextIncomplete) {
      new Tasks(percentage, nextIncomplete);
    }
  }

  constructor(percentage, nextIncomplete) {
    this.percentage = percentage;
    this.nextIncomplete = nextIncomplete;
    this.elements = this.getTaskElements();
    this.key = `tasks:${window.location.pathname}`;
    this.addEventListeners();
    this.loadTaskState();
  }

  getTaskElements() {
    return Array
      .from(document.getElementsByClassName("task-list-item"))
      .map(element => ({li: element, input: element.getElementsByTagName("input")[0]}));
  }

  addEventListeners() {
    for (let i = 0; i < this.elements.length; i++) {
      const task = this.elements[i];
      task.input.disabled = false;
      task.input.addEventListener("change", () => {
        this.storeTaskState();
        this.calculateTaskPercentage();
      });
    }
    this.nextIncomplete.addEventListener("click", () => this.goToNextIncomplete());
  }

  goToNextIncomplete() {
    for (const pair of this.elements) {
      if (!pair.input.checked) {
        pair.li.scrollIntoView();
        break;
      }
    }
  }

  storeTaskState() {
    const serialized = this.elements.map(e => e.input.checked ? "1" : "0").join("");
    localStorage.setItem(this.key, serialized);
  }

  loadTaskState() {
    const serialized = localStorage.getItem(this.key);
    if (serialized) {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].input.checked = serialized[i] === "1";
      }
      this.calculateTaskPercentage();
    }
  }

  calculateTaskPercentage() {
    const completed = this.elements.filter(e => e.input.checked).length;
    const total = this.elements.length;
    this.percentage.innerText = `${Math.round(100 * completed / total)}%`;
    if (completed === total) {
      this.nextIncomplete.classList.add("display-none");
    } else {
      this.nextIncomplete.classList.remove("display-none");
    }
  }
}

window.addEventListener("load", () => {
  Toc.install();
  Tasks.install();
});
