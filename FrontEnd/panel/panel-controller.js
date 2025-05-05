import { PanelModel } from './panel-model.js';
import { PanelView } from './panel-view.js';
import { Dialog } from '../dialog/dialog.js';

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

  updateView() {
    this.view.renderPath(this.model.path);
    this.view.renderContent([...this.model.content]);
    this.view.renderCurrentItem(0);
  }

  renderDiskContent() {
    if (this.model.disks[0] !== '/') {
      this.view.renderSelectedDisk(this.model.currentDiskIndex);
    }
    this.updateView();
  }

  initCallbacks() {
    this.view.on('changeDisk', this.changeDisk.bind(this));
    this.view.on('openContentItem', this.openContentItem.bind(this));
    this.view.on('upClick', this.upClick.bind(this));
    this.view.on('rootClick', this.rootClick.bind(this));
  }

  setCurrentItem(dirName) {
    if (dirName) {
      const index = this.model.content.findIndex(
        (item) => item.name === dirName
      );
      if (index !== -1) {
        this.view.renderCurrentItem(index);
      }
    }
  }

  async openContentItem(index) {
    if (!this.model.content[index].isDirectory) return;
    try {
      const parentDir = await this.model.changeDirectory(index);
      this.updateView();
      this.setCurrentItem(parentDir);
    } catch (error) {
      const dialog = new Dialog();
      dialog.showDialog('Error', error.message);
    }
  }

  async changeDisk(index) {
    await this.model.changeDisk(index);
    this.renderDiskContent();
  }

  async upClick() {
    if (this.model.isRoot()) return;
    const parentDir = await this.model.upDirectory();
    this.updateView();
    this.setCurrentItem(parentDir);
  }

  async rootClick(index) {
    if (this.model.isRoot()) return;
    await this.model.changeDisk(index);
    this.renderDiskContent(0);
  }

  onEnter() {
    const index = this.view.currentItemIndex;
    this.openContentItem(index);
  }

  saveUpIndex() {
    this.view.renderCurrentItem(0);
  }

  onArrowUp() {
    let index = this.view.currentItemIndex;
    if (index === 0) return;
    index -= 1;
    this.view.renderCurrentItem(index);
  }

  onArrowDown() {
    let index = this.view.currentItemIndex;
    if (index === this.model.content.length - 1) return;
    index += 1;
    this.view.renderCurrentItem(index);
  }

  onArrowLeft() {
    this.view.renderCurrentItem(0);
  }

  onArrowRight() {
    this.view.renderCurrentItem(this.model.content.length - 1);
  }

  onBackspace() {
    this.upClick();
  }

  keyDown(key) {
    const callbacks = {
      Enter: this.onEnter,
      ArrowUp: this.onArrowUp,
      ArrowDown: this.onArrowDown,
      ArrowLeft: this.onArrowLeft,
      ArrowRight: this.onArrowRight,
      Backspace: this.onBackspace,
    };
    callbacks[key]?.call(this);
  }
}
