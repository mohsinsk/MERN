const router = require("express").Router();

const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");

router.post("/login", authController.login);
router.get("/users", usersController.getUsers);

module.exports = router;
