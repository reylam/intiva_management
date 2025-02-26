const router = require("express").Router();
const categoryController = require("../controllers/categoryController")

router.get('/', categoryController.getAll)
router.post('/', categoryController.createCategory)

module.exports = router