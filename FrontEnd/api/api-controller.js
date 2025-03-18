import { ApiService } from './api-service.js';
export class ApiController {
  constructor() {
    this.service = new ApiService(baseUrl);
  }
  dir(path) {}
  disks() {}
}
