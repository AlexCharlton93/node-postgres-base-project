import mongoose from 'mongoose';
import { config } from '../config';

mongoose.Promise = global.Promise;

export async function databaseService() {
	const { database } = config;

	await mongoose.connect(`mongodb://${database.uri}:${database.port}/${database.databaseName}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
}
