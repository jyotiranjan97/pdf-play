import { AxiosError } from 'axios';

/**
 * Base class for all errors thrown by a service.
 */
class ServiceError extends Error {
  constructor(message?: string | undefined) {
    super(message || 'Unknown Service Error');
  }
}

/**
 * Thrown when the status is 401
 */
class UnauthorizedAccessError extends ServiceError {
  constructor(message?: string | undefined) {
    super(message || 'Not authorized, Please login again');
  }
}

/**
 * Thrown when the status is 403
 */
class AccessControlError extends ServiceError {
  constructor(message?: string | undefined) {
    super(message || 'Access denied');
  }
}
/**
 * Thrown when the status is 404
 */
class NotFoundError extends ServiceError {
  constructor(message?: string | undefined) {
    super(message || 'Resource not found');
  }
}

/**
 * Thrown when the status is 500 or 503
 */
class ServerError extends ServiceError {
  constructor(message?: string | undefined) {
    super(message || 'Internal server error');
  }
}

/**
 * Handles multiple type of Errors, for example - server error, not-found error etc.
 * @param error Error object
 */
export const toServiceError = (error: any) => {
  if (error instanceof AxiosError) {
    const axiosError = error;

    const response = axiosError?.response;
    const message: string | undefined = getErrorMessage(response?.data);

    switch (response?.status) {
      case 401:
        throw new UnauthorizedAccessError(message);
      case 403:
        throw new AccessControlError(message);
      case 404:
        throw new NotFoundError(message);
      case 500:
        throw new ServerError(message);
      case 503:
        throw new ServerError(message);
      default: {
        const errorResponse: any = axiosError.toJSON();
        const errorMessage = errorResponse.message ?? '';
        throw new ServiceError(message || errorMessage);
      }
    }
  }
  throw error;
};

// Get custom error message from error response, for example - Bad Request
function getErrorMessage(errorResponse: Record<any, any>): string | undefined {
  if (errorResponse?.detail) {
    return errorResponse?.detail;
  }

  let errorMessage = '';

  if (errorResponse?.errors) {
    for (const key in errorResponse?.errors) {
      let subError = '';
      if (Array.isArray(errorResponse?.errors[key])) {
        errorResponse?.errors[key]?.forEach((err: any) => {
          subError = subError + err + ' ';
        });
      }

      errorMessage = errorMessage + subError + '\n';
    }
  } else if (errorResponse?.message) {
    errorMessage = errorMessage + errorResponse?.message;
  }
  return errorMessage;
}
