const router = require("express").Router();
const AuthController = require("../controllers/authController");
const auth = require("../middlewares/AuthMiddleware");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/users", auth, AuthController.all);
router.post("/logout", auth, AuthController.logout);

module.exports = router;
