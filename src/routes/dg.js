const express=require('express')
const router=express.Router()

const dg =require("../app/controllers/dg")

//newsController.index
router.post("/in",dg.in)
router.get("/create",dg.create)
router.get("/see",dg.see)

module.exports=router;