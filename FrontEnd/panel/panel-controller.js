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
    this.view.renderPath(this.model.path);
    this.view.renderSelectedDisk(this.model.currentDiskIndex);
    this.view.renderContent([...this.model.content]);
    this.view.renderCurrentItem(0);
  }

  changeDirectory(index) {}
}
