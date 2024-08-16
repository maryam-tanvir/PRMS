const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/districts', (req, res) => {
    connection.query('SELECT * FROM district', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/district/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM district WHERE district_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('District not found');
        }
        res.json(results[0]);
    });
});

router.post('/district', (req, res) => {
    const { district_name } = req.body;
    if (!district_name) {
        return res.status(400).json({ error: 'District name is required' });
    }
    const query = 'INSERT INTO district (district_name) VALUES (?)';
    connection.query(query, [district_name], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('District added successfully');
    });
});

router.put('/district/:id', (req, res) => {
    const { id } = req.params;
    const { district_name } = req.body;
    if (!district_name) {
        return res.status(400).json({ error: 'District name is required' });
    }
    const query = 'UPDATE district SET district_name = ? WHERE district_id = ?';
    connection.query(query, [district_name, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('District not found');
        }
        res.status(200).send('District updated successfully');
    });
});

router.delete('/district/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM district WHERE district_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('District not found');
        }
        res.status(200).send('District deleted successfully');
    });
});

module.exports = router;


