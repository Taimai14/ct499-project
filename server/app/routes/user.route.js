const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");

router.post("/auth/register", users.register);
router.post("/auth/login", users.login);
router.route("/").get(users.findAll).post(users.create).delete(users.deleteALL);

router.route("/:id").get(users.findOne).put(users.update).delete(users.delete);

module.exports = router;
