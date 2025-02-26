const router = require("express").Router();
const subcategoryController = require("../controllers/subcategoryController");

router.get("/", subcategoryController.getAll);
router.get("/:id?", subcategoryController.getBySubCategory);
router.post("/", subcategoryController.createSubCategory);

module.exports = router;
