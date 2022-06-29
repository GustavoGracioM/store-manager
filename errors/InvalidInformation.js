class InvalidInformation extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidInformation';
  }
}

module.exports = InvalidInformation;