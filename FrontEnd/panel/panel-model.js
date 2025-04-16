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

    if (path.length > 1) {
      this.content = [
        { name: '..', size: '<DIR>', date: '', isDirectory: true },
        ...this.content,
      ];
    }

    this.path = path;
  }

  async changeDirectory(index) {
    const newPath = [...this.path];
    if (!this.content[index].isDirectory) return;

    let parentDir = '';
    if (this.content[index].name !== '..') {
      newPath.push(this.content[index].name);
    } else {
      parentDir = newPath.pop();
    }
    await this.getContent(newPath);
    return parentDir;
  }

  async upDirectory() {
    const path = [...this.path];
    const parentDir = path.pop();
    await this.getContent(path);
    return parentDir;
  }

  isRoot() {
    return this.path.length === 1;
  }

  async changeDisk(index) {
    await this.getContent([this.disks[index]]);
    this.currentDiskIndex = index;
  }
}
