export class ValidationState {
  public is_valid!: boolean;
  public error_message!: null | string;
  constructor() {
    this.is_valid = true;
    this.error_message = null;
  }

  setError(message: string) {
    this.is_valid = false;
    this.error_message = message;

    return this;
  }
}
