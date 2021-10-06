/** @format */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get All reservations
router.get('/', async (req, res) => {
	try {
		const { rows } = await db.query(
			'SELECT users.firstname, users.lastname, movies.name,reservations.daysNum, reservations.movieid, reservations.userid, reservations.id as id FROM reservations INNER JOIN users ON reservations.userid = users.id INNER JOIN movies ON reservations.movieid = movies.id',
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Get specific reservation
router.get('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		const { rows } = await db.query(
			'SELECT * FROM reservations WHERE id = $1',
			[Id],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create  new reservation
router.post('/', async (req, res) => {
	const { movieId, userId, daysNum } = req.body;
	console.log(req.body);
	try {
		const { rows } = await db.query(
			'INSERT INTO reservations (movieid, userid, daysnum) VALUES ($1,$2,$3)',
			[movieId, userId, parseInt(daysNum)],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the reservation
router.patch('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	const { movieId, userId, daysNum } = req.body;
	try {
		const { rows } = await db.query(
			'UPDATE reservations SET  movieid = $1, userid = $2, daysnum = $3 WHERE Id = $4',
			[movieId, userId, daysNum, Id],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete reservation
router.delete('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		await db.query('DELETE FROM reservations WHERE id = $1', [Id]);
		res.json({ msg: 'Rezervacija je izbrisana' });
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
