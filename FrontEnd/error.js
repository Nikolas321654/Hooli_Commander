export class NotFoundError extends Error {
  constructor() {
    super('Not found');
  }
}

export class AccessDeniedError extends Error {
  constructor() {
    super('Access denied');
  }
}

export class UnknownError extends Error {
  constructor() {
    super('Unknown error');
  }
}
