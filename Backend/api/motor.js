const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/motors', (req, res) => {
    connection.query('SELECT * FROM motor', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/motor/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM motor WHERE motor_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Motor not found');
        }
        res.json(results[0]);
    });
});

router.post('/motor', (req, res) => {
    const { tubewell_id, power } = req.body;
    if (!tubewell_id || !power) {
        return res.status(400).json({ error: 'Tubewell ID and Power are required' });
    }
    const query = 'INSERT INTO motor (tubewell_id, power) VALUES (?, ?)';
    connection.query(query, [tubewell_id, power], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Motor added successfully');
    });
});

router.put('/motor/:id', (req, res) => {
    const { id } = req.params;
    const { tubewell_id, power } = req.body;
    if (!tubewell_id || !power) {
        return res.status(400).json({ error: 'Tubewell ID and Power are required' });
    }
    const query = 'UPDATE motor SET tubewell_id = ?, power = ? WHERE motor_id = ?';
    connection.query(query, [tubewell_id, power, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Motor not found');
        }
        res.status(200).send('Motor updated successfully');
    });
});

router.delete('/motor/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM motor WHERE motor_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Motor not found');
        }
        res.status(200).send('Motor deleted successfully');
    });
});

module.exports = router;
