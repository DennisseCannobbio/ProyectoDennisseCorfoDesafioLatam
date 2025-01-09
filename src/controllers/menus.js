const Menu = require('../models/Menu')

//* GET ALL MENUS
const getMenus = async (req, res) => {
    try {
        const menus = await Menu.findAll(); 

        if(menus) {
            res.status(200).json(menus);
        } else {
            res.status(404).json({ error: 'There are not menus on the database'})
        }
    } catch (error) {
        res.status(500).json({ error: 'An error has ocurred while getting the menus' });
    }
};

//* GET MENU BY ID
const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id)

        if(menu) {
            res.status(200).json(menu);
        } else {
            res.status(404).json({ error: 'Menu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error has ocurred while getting the menu' });
    }
};

//* CREATE MENU
const createMenu = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newMenu = await Menu.create({ name, description, price });
        res.status(201).json(newMenu);
    } catch (error) {
        res.status(500).json({ error: 'An error has ocurred while creating the menu' });
    }
}

//* UPDATE MENU
const updateMenu = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const menu = await Menu.findByPk(req.params.id);

        if (menu) {
            menu.name = name;
            menu.description = description;
            menu.price = price;
            await menu.save();
            res.status(200).json(menu);
        } else {
            res.status(404).json({ error: 'Menu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error has ocurred while updating the menu' });
    }
}

const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (menu) {
            await menu.destroy();
            res.status(204).json(); 
        } else {
            res.status(404).json({ error: 'Menu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error has ocurred while deleting the menu' });
    }
};
module.exports = {
    getMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
}