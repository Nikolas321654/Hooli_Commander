import { serverUrl } from '../config.js';

export class ApiService {
  constructor() {}

  get(path, queryParams) {
    const url = new URL(path, serverUrl);
    if (queryParams) {
      for (const param in queryParams) {
        url.searchParams.append(param, queryParams[param]);
      }
    }
    return fetch(url).then((response) => response.json());
  }

  post(path, data) {}

  put(path, data) {}

  delete(path) {}
}
