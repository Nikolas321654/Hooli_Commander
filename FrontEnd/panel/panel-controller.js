import { PanelModel } from './panel-model.js';
import { PanelView } from './panel-view.js';

export class PanelController {
  constructor(index) {
    this.view = new PanelView(index);
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
    this.view.on('openContentItem', this.openContentItem.bind(this));
    this.view.on('upClick', this.upClick.bind(this));
    this.view.on('rootClick', this.rootClick.bind(this));
  }

  async openContentItem(index) {
    await this.model.changeDirectory(index);
    this.view.renderPath(this.model.path);
    this.view.renderContent([...this.model.content]);
  }

  async changeDisk(index) {
    await this.model.changeDisk(index);
    this.renderDiskContent();
  }

  async upClick() {
    if (this.model.isRoot()) return;
    await this.model.upDirectory();
    this.view.renderPath(this.model.path);
    this.view.renderContent([...this.model.content]);
  }

  async rootClick(index) {
    if (this.model.isRoot()) return;
    await this.model.changeDisk(index);
    this.renderDiskContent();
  }
}
