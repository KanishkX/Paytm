const express = require("express");
const router = express.Router();
const UserRouter = require("./user");
const Account = require("./account");

router.use("/user",UserRouter);
router.use("/account",Account);

module.exports = router;