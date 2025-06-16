export class SuccessResponseFactory {
  static buildResponse<T>(message: string, data?: T) {
    return {
      statusCode: 200,
      message,
      data: data ?? null,
      timestamp: new Date().toISOString(),
    };
  }

  static buildCreatedResponse<T>(message: string, data?: T) {
    return {
      statusCode: 201,
      message,
      data: data ?? null,
      timestamp: new Date().toISOString(),
    };
  }

  static buildNoContentResponse(message: string) {
    return {
      statusCode: 204,
      message,
      timestamp: new Date().toISOString(),
    };
  }
}
