const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/solarpanels', (req, res) => {
    connection.query('SELECT * FROM solarpanel', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/solarpanel/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM solarpanel WHERE panel_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Solar Panel not found');
        }
        res.json(results[0]);
    });
});

router.post('/solarpanel', (req, res) => {
    const { tubewell_id, capacity } = req.body;
    if (!tubewell_id || !capacity) {
        return res.status(400).json({ error: 'Tubewell ID and Capacity are required' });
    }
    const query = 'INSERT INTO solarpanel (tubewell_id, capacity) VALUES (?, ?)';
    connection.query(query, [tubewell_id, capacity], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Solar Panel added successfully');
    });
});

router.put('/solarpanel/:id', (req, res) => {
    const { id } = req.params;
    const { tubewell_id, capacity } = req.body;
    if (!tubewell_id || !capacity) {
        return res.status(400).json({ error: 'Tubewell ID and Capacity are required' });
    }
    const query = 'UPDATE solarpanel SET tubewell_id = ?, capacity = ? WHERE panel_id = ?';
    connection.query(query, [tubewell_id, capacity, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Solar Panel not found');
        }
        res.status(200).send('Solar Panel updated successfully');
    });
});

router.delete('/solarpanel/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM solarpanel WHERE panel_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Solar Panel not found');
        }
        res.status(200).send('Solar Panel deleted successfully');
    });
});

module.exports = router;
