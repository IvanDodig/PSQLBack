/** @format */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get All genres
router.get('/', async (req, res) => {
	try {
		const { rows } = await db.query('SELECT * FROM genres');
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Get specific genre
router.get('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		const { rows } = await db.query('SELECT * FROM genres WHERE id = $1', [Id]);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create  new genre
router.post('/', async (req, res) => {
	const { name } = req.body;
	try {
		const { rows } = await db.query('INSERT INTO genres (name) VALUES ($1)', [
			name,
		]);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the genre
router.patch('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	const { name } = req.body;
	try {
		const { rows } = await db.query(
			'UPDATE genres SET name = $1 WHERE Id = $2',
			[name, Id],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete genre
router.delete('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		await db.query('DELETE FROM genres WHERE id = $1', [Id]);
		res.json({ msg: 'Žanr je izbrisan' });
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
