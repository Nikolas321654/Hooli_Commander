import { ApiService } from './api-service.js';
export class ApiController {
  constructor() {
    if (ApiController.instance) {
      return ApiController.instance;
    }
    this.apiService = new ApiService();
    ApiController.instance = this;
    return this;
  }

  dir(path) {
    return this.apiService.get('dir', { path });
  }

  disks() {
    return this.apiService.get('disks');
  }
}
