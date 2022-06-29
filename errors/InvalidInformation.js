class InvalidInformation extends Error {
  constructor(message, code) {
    super(message, code);
    this.name = 'InvalidInformation';
    this.code = code;
  }
}

module.exports = InvalidInformation;