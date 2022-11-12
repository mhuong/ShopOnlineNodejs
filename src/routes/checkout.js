const express=require('express')
const router=express.Router()

const checkoutController=require("../app/controllers/checkoutController")

//newsController.index
router.get("/get-checkout",checkoutController.getCheckout)

router.post("/post-checkout", checkoutController.postCheckout)

module.exports=router;