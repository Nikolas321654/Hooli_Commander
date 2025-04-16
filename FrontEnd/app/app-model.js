import { PanelController } from '../panel/panel-controller.js';
export class AppModel {
  constructor() {
    this.panels = [new PanelController(0), new PanelController(1)];
    this.activePanelIndex = 0;
  }

  setActivePanel(index) {
    this.activePanelIndex = index;
  }

  switchActivePanel() {
    this.activePanelIndex = this.activePanelIndex === 1 ? 0 : 1;
  }
}
