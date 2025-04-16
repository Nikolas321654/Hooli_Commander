export class AppView {
  constructor() {
    this.events = {};
    this.panels = document.querySelector('.panels');
    this.panels.querySelector('.panel').classList.add('panel_active');
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
    this.renderActivePanel(index);
  }

  on(event, callback) {
    this.events[event] = callback;
  }

  emit(event, ...data) {
    const callback = this.events[event];
    if (callback) callback(...data);
  }

  renderActivePanel(index) {
    this.panels.querySelector('.panel_active').classList.remove('panel_active');
    this.panels.querySelectorAll('.panel')[index].classList.add('panel_active');
    this.emit('panelClick', index);
  }
}
