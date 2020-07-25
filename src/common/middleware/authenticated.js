import jwt from 'jsonwebtoken';
import { statusCodes } from '../status-codes';
import { config } from '../config';

export function verifyToken(req, res, next) {
	// eslint-disable-next-line dot-notation
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');

		const bearerToken = bearer[1];

		jwt.verify(bearerToken, config.secretKey, (err) => {
			if (err) {
				res.sendStatus(statusCodes.FORBIDDEN);
			} else {
				req.token = bearerToken;
			}
		});

		next();
	} else {
		res.sendStatus(statusCodes.FORBIDDEN);
	}
}
