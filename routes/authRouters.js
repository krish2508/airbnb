const{singupPage,loginPage,createUser,loginUser}=require("../controllers/authController.js");
const express=require('express');
const router = express.Router();
router.get("/signup", singupPage);
router.get("/", loginPage);
router.post("/signup", createUser);
router.post("/login", loginUser);
module.exports=router;
