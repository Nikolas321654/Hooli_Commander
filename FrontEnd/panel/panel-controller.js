import { PanelModel } from './panel-model.js';
import { PanelView } from './panel-view.js';

export class PanelController {
  constructor() {
    this.view = new PanelView();
    this.model = new PanelModel();
    this.model.init().then(() => {
      this.initView();
    });
  }

  initView() {
    this.view.renderDisks(this.model.disks);
  }
}
