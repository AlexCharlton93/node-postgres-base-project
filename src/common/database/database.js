import { Sequelize } from 'sequelize';
import { config } from '../config';

const { database } = config;

export const db = new Sequelize(`${database.databaseName}`, `${database.user}`, `${database.password}`, {
	host: 'localhost',
	dialect: 'postgres'
});
