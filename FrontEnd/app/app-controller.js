import { AppModel } from './app-model.js';
import { AppView } from './app-view.js';

export class AppController {
  constructor() {
    this.model = new AppModel();
    this.view = new AppView();
    this.init();
  }

  init() {
    this.view.on('setActivePanel', (index) => this.setPanelIndex(index));
  }

  setPanelIndex(index) {}

  switchActivePanel(event) {}

  sendPanelEvent(event) {}

  onKeyDown(event) {}

  onPanelClick(event) {}
}
