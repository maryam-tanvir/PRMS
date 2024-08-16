const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/tubewells', (req, res) => {
    connection.query('SELECT * FROM tubewell', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/tubewell/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM tubewell WHERE tubewell_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Tubewell not found');
        }
        res.json(results[0]);
    });
});

router.post('/tubewell', (req, res) => {
    const { village_id, installation_date, capacity } = req.body;
    if (!village_id || !installation_date || !capacity) {
        return res.status(400).json({ error: 'Village ID, Installation Date, and Capacity are required' });
    }
    const query = 'INSERT INTO tubewell (village_id, installation_date, capacity) VALUES (?, ?, ?)';
    connection.query(query, [village_id, installation_date, capacity], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Tubewell added successfully');
    });
});

router.put('/tubewell/:id', (req, res) => {
    const { id } = req.params;
    const { village_id, installation_date, capacity } = req.body;
    if (!village_id || !installation_date || !capacity) {
        return res.status(400).json({ error: 'Village ID, Installation Date, and Capacity are required' });
    }
    const query = 'UPDATE tubewell SET village_id = ?, installation_date = ?, capacity = ? WHERE tubewell_id = ?';
    connection.query(query, [village_id, installation_date, capacity, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Tubewell not found');
        }
        res.status(200).send('Tubewell updated successfully');
    });
});

router.delete('/tubewell/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tubewell WHERE tubewell_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Tubewell not found');
        }
        res.status(200).send('Tubewell deleted successfully');
    });
});

module.exports = router;
