const express = require('express');
const app = express();
const sequelize = require('./config/database'); 

app.use(express.json());

app.use('/api/menus', require('./routes/menus') );

sequelize.sync()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server listening on port    ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Sincronization error with database:', error);
    });