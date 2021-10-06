/** @format */

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get All movie
router.get('/', async (req, res) => {
	try {
		const { rows } = await db.query('SELECT * FROM movies');
		res.json({ data: rows });
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Get specific movie
router.get('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		const { rows } = await db.query('SELECT * FROM movies WHERE id = $1', [Id]);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Create  new movie
router.post('/', async (req, res) => {
	const { genreId, name, year, reservationPrice, buyPrice } = req.body;
	console.log({
		genreId,
		name,
		year: parseInt(year),
		reservationPtice: parseFloat(reservationPrice),
		buyPrice,
	});
	try {
		const { rows } = await db.query(
			'INSERT INTO movies ( genreid, name, year, reservationprice, buyprice) VALUES ($1,$2,$3,$4,$5)',
			[
				genreId,
				name,
				parseInt(year),
				parseFloat(reservationPrice),
				parseFloat(buyPrice),
			],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err.message });
	}
});

// Update the movie
router.patch('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	const { genreId, name, year, reservationPrice, buyPrice } = req.body;
	try {
		const { rows } = await db.query(
			'UPDATE movies SET genreid = $1, name = $2, year = $3, reservationprice = $4, buyprice = $5 WHERE Id = $6',
			[
				genreId,
				name,
				parseInt(year),
				parseFloat(reservationPrice),
				parseFloat(buyPrice),
				Id,
			],
		);
		res.json(rows);
	} catch (err) {
		res.json({ message: err });
	}
});

// Delete movie
router.delete('/:id', async (req, res) => {
	const Id = parseInt(req.params.id);
	try {
		await db.query('DELETE FROM movies WHERE id = $1', [Id]);
		res.json({ msg: 'Film je izbrisan' });
	} catch (err) {
		res.json({ message: err.message });
	}
});
module.exports = router;
