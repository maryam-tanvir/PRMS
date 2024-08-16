const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/tehsils', (req, res) => {
    connection.query('SELECT * FROM tehsil', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/tehsil/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM tehsil WHERE tehsil_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Tehsil not found');
        }
        res.json(results[0]);
    });
});

router.post('/tehsil', (req, res) => {
    const { tehsil_name, district_id } = req.body;
    if (!tehsil_name || !district_id) {
        return res.status(400).json({ error: 'Tehsil name and District ID are required' });
    }
    const query = 'INSERT INTO tehsil (tehsil_name, district_id) VALUES (?, ?)';
    connection.query(query, [tehsil_name, district_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Tehsil added successfully');
    });
});

router.put('/tehsil/:id', (req, res) => {
    const { id } = req.params;
    const { tehsil_name, district_id } = req.body;
    if (!tehsil_name || !district_id) {
        return res.status(400).json({ error: 'Tehsil name and District ID are required' });
    }
    const query = 'UPDATE tehsil SET tehsil_name = ?, district_id = ? WHERE tehsil_id = ?';
    connection.query(query, [tehsil_name, district_id, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Tehsil not found');
        }
        res.status(200).send('Tehsil updated successfully');
    });
});

router.delete('/tehsil/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tehsil WHERE tehsil_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Tehsil not found');
        }
        res.status(200).send('Tehsil deleted successfully');
    });
});

module.exports = router;
