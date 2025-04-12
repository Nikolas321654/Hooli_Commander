import { PanelController } from '../panel/panel-controller.js';
export class AppModel {
  constructor() {
    this.panels = [new PanelController(0), new PanelController(1)];
  }

  setActivePanel(index) {}

  switchActivePanel(index) {}
}
