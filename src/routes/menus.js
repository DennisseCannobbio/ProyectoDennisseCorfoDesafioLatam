const { Router } = require('express')
const router = Router();
const { getMenus, getMenuById, createMenu, updateMenu, deleteMenu } = require('../controllers/menus')

// * MENUS CALLS  * //
//! GET MENUS
router.get('/', async (req, res) => {
    try {
        const menus = await getMenus();

        if (!menus) {
            return res.status(404).json({ error: 'Menus not found' });
        }

        res.json(menus)
        
    } catch (error) {
        console.error('Error getting the menus:', err);
        return res.status(500).json({ error: 'Error getting the menus' });
    }
});

//! GET MENU BY ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await getMenuById(id);

        if (!menu) {
            return res.status(404).json({ error: 'Menu not found' });
        }
        
        res.json(menu)
        
    } catch (error) {
        console.error('Error getting the menu:', error);
        return res.status(500).json({ error: 'Error getting the menu' });

    }
});

//! CREATE MENU
router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        await createMenu(name, description, price)
        res.send(`Menu created :D!`)
    } catch (err) {
        console.error('Error creating the menu:', err);
        return res.status(500).json({ error: 'Error creating the menu' });
    }
});

//! UPDATE
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const result = await updateMenu(id, name, description, price);
        res.send(`Menu with id ${id} updated :D`);
    } catch (error) {
        return res.status(500).json({ error: 'Error updating the menu' });

    }
});

//! DELETE
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteMenu(id);
        res.send("Menu deleted :D")
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting the menu' });
    }
});

module.exports = router;