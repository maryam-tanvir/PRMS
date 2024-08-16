const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000; // You can use any available port

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Middleware to parse JSON
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'prms'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Middleware to parse JSON
app.use(express.json());

const districtRoutes = require('./api/district');
const batteryRoutes = require('./api/battery');
const motorRoutes = require('./api/motor');
const solarPanelRoutes = require('./api/solarpanel');
const tehsilRoutes = require('./api/tehsil');
const tubewellRoutes = require('./api/tubewell');
const villageRoutes = require('./api/village');

app.use('/api', districtRoutes);
app.use('/api', batteryRoutes);
app.use('/api', motorRoutes);
app.use('/api', solarPanelRoutes);
app.use('/api', tehsilRoutes);
app.use('/api', tubewellRoutes);
app.use('/api', villageRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

