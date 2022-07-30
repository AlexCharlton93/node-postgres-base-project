import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import { statusCodes } from '../status-codes';

export const verifyToken = (req, res, next) => {
	// eslint-disable-next-line dot-notation
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');

		const bearerToken = bearer[1];

		jwt.verify(bearerToken, process.env.APP_JWT_SECRET_KEY, (err) => {
			if (err) {
				res.status(statusCodes.FORBIDDEN).send({
					message: 'Please login and try again.'
				});
			} else {
				req.token = bearerToken;
			}
		});

		const { userId } = jwt_decode(bearerToken);
		res.locals.userId = userId;

		next();
	} else {
		res.status(statusCodes.FORBIDDEN).send({
			message: 'Please login and try again.'
		});
	}
}
