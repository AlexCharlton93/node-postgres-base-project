import { errorTypes } from './errors.constants';
import { HttpError } from './http.errors';
import { statusCodes } from '../status-codes';

export function controllerCatch(err, request, response) {
	let errorMessage;
	let responseCode;

	if (err instanceof HttpError) {
		switch (err.errorType) {
		case errorTypes.ACCESS_FORBIDDEN:
			responseCode = statusCodes.FORBIDDEN;
			break;
		case errorTypes.UNAUTHORISED:
			responseCode = statusCodes.UNAUTHORISED;
			break;
		case errorTypes.NOT_FOUND:
			responseCode = statusCodes.NOT_FOUND;
			break;
		case errorTypes.INVALID_OPERATION:
		case errorTypes.INVALID_PARAMETERS:
			responseCode = statusCodes.BAD_REQUEST;
			break;
		default:
			responseCode = statusCodes.INTERNAL_SERVER_ERROR;
		}
		errorMessage = err.userMessage;
	} else {
		errorMessage = err.message;
		responseCode = statusCodes.INTERNAL_SERVER_ERROR;
	}

	response.status(responseCode);
}
