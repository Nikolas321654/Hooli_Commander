export class NotFoundError extends Error {
  constructor() {
    super('Не знайдено');
  }
}

export class AccessDeniedError extends Error {
  constructor() {
    super('Доступ заборонено');
  }
}

export class UnknownError extends Error {
  constructor() {
    super('Невідома помилка');
  }
}
