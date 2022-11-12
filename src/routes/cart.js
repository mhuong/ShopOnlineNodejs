const express=require('express')
const router=express.Router()

const cartController=require("../app/controllers/CartController")

//cartsController.index
router.get("/update/:slug", cartController.updateCart);
router.get("/clear", cartController.clear);
router.get("/courses",cartController.showCart)
router.post("/:id",cartController.addCart)


module.exports=router;