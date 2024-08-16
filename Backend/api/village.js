const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/villages', (req, res) => {
    connection.query('SELECT * FROM village', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/village/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM village WHERE village_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(404).send('Village not found');
        }
        res.json(results[0]);
    });
});

router.post('/village', (req, res) => {
    const { village_name, tehsil_id } = req.body;
    if (!village_name || !tehsil_id) {
        return res.status(400).json({ error: 'Village name and Tehsil ID are required' });
    }
    const query = 'INSERT INTO village (village_name, tehsil_id) VALUES (?, ?)';
    connection.query(query, [village_name, tehsil_id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('Village added successfully');
    });
});

router.put('/village/:id', (req, res) => {
    const { id } = req.params;
    const { village_name, tehsil_id } = req.body;
    if (!village_name || !tehsil_id) {
        return res.status(400).json({ error: 'Village name and Tehsil ID are required' });
    }
    const query = 'UPDATE village SET village_name = ?, tehsil_id = ? WHERE village_id = ?';
    connection.query(query, [village_name, tehsil_id, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Village not found');
        }
        res.status(200).send('Village updated successfully');
    });
});

router.delete('/village/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM village WHERE village_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Village not found');
        }
        res.status(200).send('Village deleted successfully');
    });
});

module.exports = router;
