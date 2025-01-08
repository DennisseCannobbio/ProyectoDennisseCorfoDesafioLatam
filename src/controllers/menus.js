const { Pool } = require('pg');

// * CONNECTION TO DB
const pool = new Pool({
    user: 'denni',
    host: 'localhost',
    database: 'desafio-latam', 
    password: '12345',
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('An error has ocurred while connecting to db', err.stack);
    }

    client.query('SELECT NOW()', (err, result) => {
        release(); 

        if (err) {
            return console.error('An error has ocurred while executing the query:', err.stack);
        }

        console.log('Connection successfull, database time:', result.rows[0].now);
    });
});


// * CALLS TO DB * //
const getMenus = async () => {
    const { rows } = await pool.query('SELECT * FROM menus');
    return rows;
}

const getMenuById = async(id) => {
    const query = `SELECT * FROM menus WHERE id = $1`;
    const params = [id]
    const { rows } = await pool.query(query, params);
    return rows;
}

const createMenu = async (name, description, price) => {
    const query = `INSERT INTO menus (name, description, price)
    VALUES ($1, $2, $3)`
    const params = [name, description, price];
    await pool.query(query, params);
    console.log('Menu created!');
}

const updateMenu = async (id, name, description, price) => {
    const query = `
        UPDATE menus
        SET name = $1, description = $2, price = $3
        WHERE id = $4;
    `;
    params =  [name, description, price, id]
    const res = await pool.query(query,params);
    console.log('Menu updated!');
    
};

const deleteMenu = async (id) => {
    const query = `
        DELETE FROM menus WHERE id = $1
    `;
    params = [id]
    const res = await pool.query(query, params);
    console.log('Menu deleted!');
    
};

module.exports = {
    getMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
}