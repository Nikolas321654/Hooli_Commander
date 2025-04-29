import { AppModel } from './app-model.js';
import { AppView } from './app-view.js';
import { Dialog } from '../dialog/dialog.js';
export class AppController {
  constructor() {
    this.model = new AppModel();
    this.view = new AppView();
    this.init();
  }

  init() {
    this.view.on('panelClick', this.onPanelClick.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onKeyDown(event) {
    if (Dialog.isDialogOpen()) return;

    if (event.code === 'Tab') {
      event.preventDefault();
      this.switchActivePanel();
      return;
    }
    const keys = [
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Backspace',
    ];
    if (keys.includes(event.code)) {
      event.preventDefault();
      this.sendPanelKeyDown(event.code);
    }
  }

  sendPanelKeyDown(key) {
    if (!key) return;
    this.model.panels[this.model.activePanelIndex].keyDown(key);
  }

  switchActivePanel() {
    this.model.switchActivePanel();
    this.view.renderActivePanel(this.model.activePanelIndex);
  }

  onPanelClick(index) {
    this.model.setActivePanel(index);
  }
}
