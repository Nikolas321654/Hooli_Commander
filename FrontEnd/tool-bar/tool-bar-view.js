export class ToolBarView {
  constructor() {
    this.events = {};
    this.infoButton = document.querySelector('.info-button');
    this.initListeners();
  }

  on(eventName, callback) {
    this.events[eventName] = callback;
  }

  emit(eventName, ...data) {
    const callback = this.events[eventName];
    if (callback) callback(...data);
  }

  initListeners() {
    this.infoButton.addEventListener('click', () => {
      this.emit('showInfoDialog');
    });
  }

  formatAuthor(author) {
    return `<p>${author.name}</p><p>${author.specialty}</p><p><a href="mailto:${author.email}">${author.email}</a></p>`;
  }
}
