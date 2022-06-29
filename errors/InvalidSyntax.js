class InvalidSyntax extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidSyntax';
  }
}

module.exports = InvalidSyntax;