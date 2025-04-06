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
    await this.changeDisk(0);
  }

  async getContent(path) {
    const requestPath = [...path];
    if (path.length === 1) requestPath[0] = path[0] + '/';
    this.content = (await this.api.dir(requestPath.join('/'))).sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (b.isDirectory && !a.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });

    if (this.path.length > 1) {
      this.content = [
        { name: '..', size: '<DIR>', date: '', isDirectory: true },
        ...content,
      ];
    }

    this.path = path;
  }

  async changeDisk(index) {
    await this.getContent([this.disks[index]]);
    this.currentDiskIndex = index;
  }
}
