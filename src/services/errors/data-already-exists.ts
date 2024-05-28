export class DataAlreadyExists extends Error {
  constructor() {
    super("This data has been used before.");
  }
}
