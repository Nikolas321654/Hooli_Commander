import { ApiService } from './api-service.js';
export class Api {
  constructor() {
    if (Api.instance) {
      return Api.instance;
    }
    this.apiService = new ApiService();
    Api.instance = this;
    return this;
  }

  dir(path) {
    return this.apiService.get('dir', { path });
  }

  disks() {
    return this.apiService.get('disks');
  }
}
