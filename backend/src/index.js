const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Test')
})

app.listen(port, () => {
    console.log('Application listening on port ${port}');
})