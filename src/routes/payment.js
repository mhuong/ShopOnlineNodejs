const express = require("express");
const router = express.Router();
const auth = require('../app/midleware/auth')
const paymentController = require("../app/controllers/paymentController");

//newsController.index
router.put("/:id",paymentController.update)
router.get("/buy",auth.emailVerify, paymentController.buyCart);
router.get("/trashbuy", paymentController.trashbuy);
router.get("/buynows/:id", auth.emailVerify, paymentController.buynows);
router.post("/handle-form-actions",paymentController.handleFormActions)
router.post("/handle-form-delete-actions",paymentController.handleFormDActions)
router.post("/add", paymentController.buyAdd);
router.get("/buynow", paymentController.buynow);
router.delete("/cancel-order/:id", paymentController.cancel_order);
router.delete("/cancel/:id/force",paymentController.force_order);
router.get("/:id/edit",paymentController.edit)
router.get("/orderCart", paymentController.orderCart);
router.patch("/:id/restore",paymentController.restore)
router.post("/postMail", paymentController.postMail)

module.exports = router;
