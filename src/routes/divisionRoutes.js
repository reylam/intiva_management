const express = require("express");
const router = express.Router();
const DivisionController = require("../controllers/divisionController");

router.get("/", DivisionController.getAll);
router.get("/:id", DivisionController.getById);
router.post("/", DivisionController.create);
router.put("/:id", DivisionController.update);
router.delete("/:id", DivisionController.delete);

module.exports = router;
