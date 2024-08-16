const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/batteries', (req, res) => {
    connection.query('SELECT * FROM battery', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/battery/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM battery WHERE battery_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Battery not found');
        }
        res.json(results[0]);
    });
});

router.post('/battery', (req, res) => {
    const { tubewell_id, capacity } = req.body;
    if (!tubewell_id || !capacity) {
        return res.status(400).json({ error: 'Tubewell ID and Capacity are required' });
    }
    const query = 'INSERT INTO battery (tubewell_id, capacity) VALUES (?, ?)';
    connection.query(query, [tubewell_id, capacity], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Battery added successfully');
    });
});

router.put('/battery/:id', (req, res) => {
    const { id } = req.params;
    const { tubewell_id, capacity } = req.body;
    if (!tubewell_id || !capacity) {
        return res.status(400).json({ error: 'Tubewell ID and Capacity are required' });
    }
    const query = 'UPDATE battery SET tubewell_id = ?, capacity = ? WHERE battery_id = ?';
    connection.query(query, [tubewell_id, capacity, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Battery not found');
        }
        res.status(200).send('Battery updated successfully');
    });
});

router.delete('/battery/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM battery WHERE battery_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Battery not found');
        }
        res.status(200).send('Battery deleted successfully');
    });
});

module.exports = router;
