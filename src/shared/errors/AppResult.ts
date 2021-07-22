class AppResult {
  public readonly message: string;
  public readonly status_code: number;
  public readonly success: boolean;
  public readonly data: any;

  constructor(
    message: string,
    status_code: number,
    success: boolean,
    data: any,
  ) {
    this.message = message;
    this.status_code = status_code;
    this.success = success;
    this.data = data;
  }
}

export default AppResult;
