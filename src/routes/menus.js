const { Router } = require('express')
const router = Router();
const authenticateJWT = require('../middlewares/authenticateJWT');
const { getMenus, getMenuById, createMenu, updateMenu, deleteMenu } = require('../controllers/menus')


//* GET ALL MENUS
router.get('/', authenticateJWT, getMenus);

//* GET MENU BY ID
router.get('/:id', authenticateJWT, getMenuById);

//* CREATE MENU
router.post('/',  authenticateJWT,createMenu)

//* UPDATE MENU
router.put('/:id', authenticateJWT, updateMenu)

//* DELETE MENU
router.delete('/:id',  authenticateJWT, deleteMenu)

module.exports = router;