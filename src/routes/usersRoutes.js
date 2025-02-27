const express = require("express");
const { getMembersInSameDivision } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/members", verifyToken, getMembersInSameDivision);

module.exports = router;
