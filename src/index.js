const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/menus', require('./routes/menus') );


const port = process.env.DEFAULT_PORT || 3000;
app.listen(port, console.log('Server listening on port 3000'));

module.exports = app;