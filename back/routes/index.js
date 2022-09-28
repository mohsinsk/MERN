const router = require("express").Router();

const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");

router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/users", usersController.getUsers);

module.exports = router;
