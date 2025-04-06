import { PanelModel } from './panel-model.js';
import { PanelView } from './panel-view.js';

export class PanelController {
  constructor() {
    this.view = new PanelView();
    this.model = new PanelModel();
    this.model.init().then(() => {
      this.initView();
      this.initCallbacks();
    });
  }

  initView() {
    this.view.renderDisks(this.model.disks);
    this.renderDiskContent();
  }

  renderDiskContent() {
    this.view.renderPath(this.model.path);
    this.view.renderSelectedDisk(this.model.currentDiskIndex);
    this.view.renderContent([...this.model.content]);
    this.view.renderCurrentItem(0);
  }

  initCallbacks() {
    this.view.on('changeDisk', this.changeDisk.bind(this));
    this.view.on('changeDirectory', this.changeDirectory.bind(this));
    this.view.on('up', this.upClick.bind(this));
    this.view.on('root', this.rootClick.bind(this));
  }

  async changeDisk(index) {
    await this.model.changeDisk(index);
    this.renderDiskContent();
  }

  changeDirectory(index) {
    console.log('changeDirectory', index);
  }

  upClick(index) {
    console.log('up', index);
  }

  rootClick(index) {
    console.log('root', index);
  }
}
