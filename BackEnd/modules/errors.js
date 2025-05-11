export function handleError(error, res) {
  const errorObj = errors[error.code] || unknownError;
  res.statusCode = errorObj.statusCode;
  res.end(errorObj.message);
}

const unknownError = { statusCode: 500, message: 'Unknown error' };
const errors = {
  ENOENT: { statusCode: 404, message: 'Not found' },
  EACCES: { statusCode: 403, message: 'Access denied' },
  EPERM: { statusCode: 403, message: 'Access denied' },
};
