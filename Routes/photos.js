/** @format */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get All photos
router.get('/', async (req, res) => {
	try {
		const { rows } = await db.query(
			'SELECT *, photos.id as id FROM photos INNER JOIN movies ON photos.movieid = movies.id',
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Get specific photo
router.get('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		const { rows } = await db.query('SELECT * FROM photos WHERE id = $1', [Id]);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create  new photo
router.post('/', async (req, res) => {
	const { movieId, url } = req.body;
	try {
		const { rows } = await db.query(
			'INSERT INTO photos (movieid, url) VALUES ($1,$2)',
			[movieId, url],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the photo
router.patch('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	const { movieId, url } = req.body;
	try {
		const { rows } = await db.query(
			'UPDATE photos SET  movieid = $1, url = $2 WHERE Id = $3',
			[movieId, url, Id],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete photo
router.delete('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		await db.query('DELETE FROM photos WHERE id = $1', [Id]);
		res.json({ msg: 'Slika je izbrisana' });
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
