import { v4 as uuid } from 'uuid';
import mongoose from 'mongoose';
import { regex } from '../../regex';

function lockdown(next) {
	const error = new Error('This action is locked down');

	return next(error);
}

const name = 'User';

const options = {
	strict: false,
};

const properties = {
	_id: {
		type: String,
		required: true,
		default: uuid,
		validate: regex.uuidv4,
	},
	emailAddress: {
		type: String,
		required: true,
		validate: regex.user.emailAddress,
	},
	password: {
		type: String,
		required: true,
		// TODO: Create password regex
		//validate: regex.user.password,
	},
	role: {
		type: Number,
		required: false,
		validate: regex.user.role,
		// TODO: Create default value for this
	},
	verificationCode: {
		type: String,
		validate: regex.user.verificationCode,
	},
	emailsEnabled: {
		type: Boolean,
		default: true,
	},
};

const schema = new mongoose.Schema(properties, options);

schema.pre('remove', lockdown);

const Model = mongoose.model(name, schema, name);

export {
	lockdown,
	Model,
	name,
	options,
	properties,
	schema,
};
