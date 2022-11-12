const Dg =require('../models/dg');
const {mongooseToObject, mutipleMongooseToObject}=require('../../util/mongose');
const OrderTable =require('../models/OrderTable');

class checkoutController{
    

    getCheckout(req,res,next){
         res.render('checkout',{
            status: "Enter the order id to check out.",
            auth: req.session.isAuthenticated,
            role: req.session.role
         })
   }
   postCheckout (req, res, next) {
       const order = OrderTable.findOne({_id: req.body._id})
       .lean()
       .populate("user")
       .then(order=>{
           console.log(order)
           res.render('orcheckout',{
                user: order.user,
                order: order,
                auth: req.session.isAuthenticated,
                role: req.session.role
           })
       })
   }
}

module.exports=new checkoutController;