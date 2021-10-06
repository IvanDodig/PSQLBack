/** @format */

const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'movies',
	password: 'postgres',
	port: '5432',
});

pool.on('connect', () => {
	console.log('Uspješno spojeno na bazu!');
});

module.exports = {
	query: (text, params) => pool.query(text, params),
};
