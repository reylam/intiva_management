const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/register/admin",
  authMiddleware.verifyToken,
  AuthController.registerAdmin
);
router.post(
  "/register/member",
  authMiddleware.verifyToken,
  AuthController.registerMember
);
router.post("/login", AuthController.login);
router.get("/users", authMiddleware.verifyToken, AuthController.allUsers);
router.post("/logout", authMiddleware.verifyToken, AuthController.logout);

module.exports = router;
    