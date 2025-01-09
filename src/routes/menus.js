const { Router } = require('express')
const router = Router();
const { getMenus, getMenuById, createMenu, updateMenu, deleteMenu } = require('../controllers/menus')

//* GET ALL MENUS
router.get('/', getMenus);

//* GET MENU BY ID
router.get('/:id', getMenuById);

//* CREATE MENU
router.post('/', createMenu)

//* UPDATE MENU
router.put('/:id', updateMenu)

//* DELETE MENU
router.delete('/:id', deleteMenu)

module.exports = router;