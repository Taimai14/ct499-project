const express = require("express");
const router = express.Router();
const staffs = require("../controllers/staff.controller");

router.post("/auth/staffregister", staffs.register);
router.post("/auth/stafflogin", staffs.login);
router
  .route("/")
  .get(staffs.findAll)
  .post(staffs.create)
  .delete(staffs.deleteALL);

router
  .route("/:id")
  .get(staffs.findOne)
  .put(staffs.update)
  .delete(staffs.delete);

module.exports = router;
