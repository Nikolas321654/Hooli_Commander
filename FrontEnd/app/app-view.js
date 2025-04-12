export class AppView {
  constructor() {
    this.events = {};
    this.panels = document.querySelector('.panels');
    this.panels.querySelector('.panel').classList.add('active__panel');
    this.initListeners();
  }

  initListeners() {
    this.panels.addEventListener('click', this.setActivePanel.bind(this));
    this.panels.addEventListener('dblclick', this.setActivePanel.bind(this));
  }

  setActivePanel(event) {
    const panel = event.target.closest('.panel');
    if (!panel) return;
    const index = +panel.dataset.index;
    this.panels
      .querySelector('.active__panel')
      .classList.remove('active_panel');
    panel.classList.add('active_panel');
    this.emit('panelClick', index);
  }

  on(event, callback) {
    this.events[event] = callback;
  }

  emit(event, data) {
    const callback = this.events[event];
    if (callback) callback(...data);
  }
}
