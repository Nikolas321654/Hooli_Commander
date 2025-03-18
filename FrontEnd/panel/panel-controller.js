import { PanelModel } from './panel-model.js';
import { PanelView } from './panel-view.js';

export class PanelController {
  constructor() {
    this.model = new PanelModel();
    this.view = new PanelView();
  }
}
