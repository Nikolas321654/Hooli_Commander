import { PanelController } from '../panel/panel-controller.js';
export class AppModel {
  constructor() {
    this.panels = [new PanelController(), new PanelController()];
  }
  activePanelIndex = 0;
}
