import { Api } from '../api/api.js';

export class PanelModel {
  constructor() {
    this.api = new Api();
  }

  async init() {
    this.disks = await this.api.disks();
  }

  async setDisks() {}
}
