import { Api } from '../api/api.js';

export class PanelModel {
  disks = [];
  content = [];
  path = [];
  currentDiskIndex = 0;

  constructor() {
    this.api = new Api();
  }

  async init() {
    this.disks = await this.api.disks();
    this.content = await this.api.dir(this.disks[this.currentDiskIndex]);
    this.path = [this.disks[this.currentDiskIndex]];
  }

  async setDisks() {}
}
