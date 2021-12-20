export default class AppError extends Error {
  constructor(message, name) {
    super(message);
    this.name = name;
  }
}
