/** @format */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get All comments
router.get('/', async (req, res) => {
	try {
		const { rows } = await db.query(
			'SELECT * , comments.id as id FROM comments INNER JOIN movies ON comments.movieid = movies.id',
		);
		res.json({ data: rows });
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Get specific comment
router.get('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		const { rows } = await db.query('SELECT * FROM comments WHERE id = $1', [
			Id,
		]);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create  new comment
router.post('/', async (req, res) => {
	const { text, review, movieId } = req.body;
	console.log(req.body);
	try {
		const { rows } = await db.query(
			'INSERT INTO comments (text, review, movieid) VALUES ($1,$2,$3)',
			[text, parseInt(review), movieId],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the comment
router.patch('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	const { text, review, movieId } = req.body;
	try {
		const { rows } = await db.query(
			'UPDATE comments SET  text = $1, review = $2, movieid = $3 WHERE Id = $4',
			[text, review, movieId, Id],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete comment
router.delete('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		await db.query('DELETE FROM comments WHERE id = $1', [Id]);
		res.json({ msg: 'Komentar je izbrisan' });
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
