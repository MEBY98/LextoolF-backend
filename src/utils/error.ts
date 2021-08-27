export function createError(name, message) {
  const err = new Error();
  err.name = name;
  err.message = message;
  return err;
}

export function nullError(item, stage) {
  throw createError('nullError', `Error on ${stage}, ${item} cannot be null`);
}

export function notFoundError(item, stage) {
  throw createError(
    'notFoundError',
    `Error on ${stage}, ${item} not found on database`,
  );
}
