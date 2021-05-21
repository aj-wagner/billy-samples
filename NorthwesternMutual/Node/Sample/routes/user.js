const express = require("express");
const router = express.Router();

const { User } = require("../controllers/controllers");

router.post("/signin", User.signIn);
router.post("/signup", User.signUp);
router.post("/check", User.checkForm);

module.exports = router;
