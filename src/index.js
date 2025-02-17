const express = require('express');
const http = require('http');
const sequelize = require('./config/database'); 
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const socketHandler = require('./listeners/socketManager');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// * Routes
app.use('/api/menus', require('./routes/menus') );
app.use('/api/auth', require('./routes/auth'));

// * Optional Route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// * Port
const PORT = process.env.PORT || 3000;

// * Server Listening
sequelize.sync()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Sincronization error with database:', error);
    });


// * Middlewares
app.use(express.json());
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

// * Socket Config
socketHandler(server);