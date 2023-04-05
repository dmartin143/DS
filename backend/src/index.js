const express = require('express');
const mysql = require('mysql2');

const router = express.Router();
const app = express();
const port = 3000;

const configDB = require('./configDB.json')

const pool = mysql.createPool(configDB);

app.get('/', (req, res) => {
    res.send('Test')
})

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
})