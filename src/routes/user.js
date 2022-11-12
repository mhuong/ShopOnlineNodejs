var express = require("express");
var router = express.Router();
const auth = require('../app/midleware/auth')
const authController = require("../app/controllers/auth");

router.get("/login", auth.isLogin, authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/logout",auth.notLogin, authController.getLogout);

router.get("/register", auth.isLogin, authController.getSignUp);

router.post("/register", authController.postSignUp);

router.get("/verify-email",auth.notLogin, authController.getVerifyEmail)

router.post("/verify-email", authController.postVerifyEmail)

router.get("/change-password", auth.notLogin, authController.getChangePass)

router.post('/change-password', auth.notLogin, authController.postChangePass)

router.get("/info", auth.notLogin, authController.getInfo)

router.get("/update-info", auth.notLogin, authController.getUpdate)

router.post("/update-info", auth.notLogin, authController.postUpdate)

router.get("/forgot-password", auth.isLogin, authController.getResetPass)

router.post("/forgot-password", auth.isLogin, authController.postResetPass)

router.get("/my-products", auth.notLogin, auth.emailVerify, authController.getMyProducts)

router.get("/list", auth.notLogin, authController.getList)

router.get("/remove-user/:id", auth.notLogin, authController.getDelete)

router.get("/contact", authController.getContact)

router.post("/contact", authController.postContact)

module.exports = router;