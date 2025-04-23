import { serverUrl } from '../config.js';
import { AccessDeniedError, NotFoundError, UnknownError } from '../error.js';

const errors = {
  400: AccessDeniedError,
  404: NotFoundError,
  500: UnknownError,
};

export class ApiService {
  constructor() {}

  async get(path, queryParams) {
    const url = new URL(path, serverUrl);
    if (queryParams) {
      for (const param in queryParams) {
        url.searchParams.append(param, queryParams[param]);
      }
    }
    const response = await fetch(url);
    const error = errors[response.status];
    if (error) {
      throw new error();
    }
    return response.json();
  }

  post(path, data) {}

  put(path, data) {}

  delete(path) {}
}
