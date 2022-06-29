class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class NotInsertedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotInsertedError';
  }
}


module.exports = {
  NotFoundError,
  NotInsertedError,
};