const router = require("express").Router();
const subcategoryController = require("../controllers/subcategoryController")

router.get('/', subcategoryController.getAll)
router.post('/', subcategoryController.createSubCategory)

module.exports = router