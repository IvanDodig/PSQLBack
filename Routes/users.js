/** @format */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get All users
router.get('/', async (req, res) => {
	try {
		const { rows } = await db.query('SELECT * FROM users');
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Get specific user
router.get('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [Id]);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create  new user
router.post('/', async (req, res) => {
	const { firstName, lastName, email, password, role } = req.body;
	try {
		const { rows } = await db.query(
			'INSERT INTO users (firstname, lastname, email, password, role) VALUES ($1,$2,$3,$4,$5)',
			[firstName, lastName, email, password, role],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the user
router.patch('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	const { firstName, lastName, email, password, role } = req.body;
	console.log(req.params.id);
	try {
		const { rows } = await db.query(
			'UPDATE users SET  firstname = $1, lastname = $2, email = $3, password = $4, role = $5 WHERE Id = $6',
			[firstName, lastName, email, password, role, Id],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete user
router.delete('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		await db.query('DELETE FROM users WHERE id = $1', [Id]);
		res.json({ msg: 'Korisnik je izbrisan' });
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
