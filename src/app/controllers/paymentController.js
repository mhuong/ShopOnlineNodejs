const OrderTable = require("../models/OrderTable");
const { mutipleMongooseToObject } = require("../../util/mongose");
const Course=require('../models/Course');
const Users = require('../models/users')
const {mongooseToObject}=require('../../util/mongose');
const nodemailer = require("nodemailer");

class paymentController {
  //GET/payment/buy
  buyCart(req, res, next) {
    var status = "View products added to cart here"
    var quantity;
    var cart = req.session.cart;
    if (req.session.cart) {
        quantity = cart.length;
    } else {
        quantity = 0;
    }
    if (req.session.cart) {
        var TotalS=0;
        var sum = 0;
        var cart = req.session.cart;
        for (var i = 0; i < cart.length; i++) {
            sum += cart[i].price * cart[i].qty;
        }
        console.log(sum);
        console.log(cart[0].price);
        var total = sum;
        TotalS=total+40;
        res.render('payment', {
            user: req.session._id,
            cart: req.session.cart,
            status,
            auth: req.session.isAuthenticated,
            role: req.session.role,
            total,
            quantity,
            TotalS,
        })
    } else {
        status = "Your cart is empty";
        res.render('payment', {
            status,
            user: req.session._id,
            auth: req.session.isAuthenticated,
            role: req.session.role,
            quantity
        })
    }
}

  //post/add
  buyAdd(req,res,next){
    //res.json(req.body)
    const OrderTables=new OrderTable(req.body);
    OrderTables.save()
        .then(()=>res.redirect('/payment/orderCart'))
        .catch(error =>{
            
        });
  }

  //GET/payment/orderCart
  /*orderCart(req,res,next){
    OrderTable.find({})
        .then(ordertables=>{
            res.render('MyOrder',{
                ordertables:mutipleMongooseToObject(ordertables)
            });
        })
        .catch(next);
    }*/
    orderCart(req,res,next){
        delete req.session.cart
        if(req.session.role){
            Promise.all([OrderTable.find({}).sortable(req), OrderTable.countDocumentsDeleted()])
            .then(([ordertables, deletedCount]) =>{
                res.render('MyOrder', {
                    deletedCount,
                    ordertables: mutipleMongooseToObject(ordertables),
                    auth: req.session.isAuthenticated,
                    role: req.session.role,
                })
            })
            .catch(next);
        }else{
            Promise.all([OrderTable.find({user: req.session._id}).sortable(req), OrderTable.countDocumentsDeleted()])
            .then(([ordertables, deletedCount]) =>{
                res.render('MyOrder', {
                    deletedCount,
                    ordertables: mutipleMongooseToObject(ordertables),
                    auth: req.session.isAuthenticated,
                    role: req.session.role,
                })
            })
            .catch(next);
        }
    }

    //get/payment/buynows
    buynows(req,res,next){
        var pricenow=0;

        Course.findById(req.params.id)
            .then(course=>res.render('buys/payment-now',{
                course:mongooseToObject(course),
                user: req.session._id,
                pricenow:parseInt(course.gia)+40,
                auth: req.session.isAuthenticated,
                role: req.session.role
            }))
            .catch(next);
    }

    //post/payment/buynow
    buynow(req,res,next){
        //res.json(req.body)
        res.redirect('/payment/orderCart')
      }

    //get/payment/:id/edit
    edit(req,res,next){
        OrderTable.findById(req.params.id)
            .then(ordertables=>res.render('buys/edit',{
                ordertables:mongooseToObject(ordertables),
                auth: req.session.isAuthenticated,
                role: req.session.role,
            }))
            .catch(next);
    }

    //put/payment/:id
    update(req,res,next){
        OrderTable.updateOne({_id:req.params.id},req.body)
            .then(()=>res.redirect('/payment/orderCart'))
            .catch(next);
    }

      //delete/payment/cancel-order/:id
    cancel_order(req,res,next){
        OrderTable.delete({ _id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next);
    }

    // [DELETE]/payment/cancel/:id/force
    force_order(req, res, next) {
        OrderTable.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

   // [PATCH] /payment/:id/restore
   restore(req, res, next) {
        OrderTable.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /payment/trashbuy
    trashbuy(req, res, next) {
        OrderTable.findDeleted({}).sortable(req)
            .then((ordertables) =>
                res.render('buys/cancel-order', {
                    ordertables: mutipleMongooseToObject(ordertables),
                    auth: req.session.isAuthenticated,
                    role: req.session.role,
                }),
            )
            .catch(next);
    }

    //post/payment/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action){
            case 'delete':
                OrderTable.delete({ _id:{$in:req.body.courseIds}})
                    .then(()=>res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message:'action is invalid'});
        }
    }

    //post/payment/handle-form-delete-actions
    handleFormDActions(req, res, next) {
        switch(req.body.action){
            case 'delete':
                OrderTable.deleteOne({ _id:{$in:req.body.courseIds}})
                    .then(()=>res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                OrderTable.restore({ _id:{$in:req.body.courseIds}})
                    .then(()=>res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message:'action is invalid'});
        }
    }
    postMail(req, res){
        Users.findOne({ _id: req.session._id }, (err, user) => {
            if(err){ console.log(err)}
            if (!user) {
            return res.redirect("back");
            } else {
            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                user: "info.haihuynh@gmail.com",
                pass: "sgraajknpklqknwk"
                }
            });
            console.log(req.body)
            const OrderTables = new OrderTable(req.body);
            OrderTables.save()
            .then(OrderTables=>{
                var mainOptions = {
                    from: "Crepp so gud",
                    to: user.email,
                    subject: "Contact",
                    text: "text ne",
                    html: "<p>Cảm ơn bạn đã mua hàng từ Website</p>"+"<br> <p>Mã hóa đơn của bạn là: <p>" + OrderTables._id
                };
                transporter.sendMail(mainOptions, (err, info) => {
                    if (err) {
                    console.log(err);
                    } else {
                    console.log("Sent:" + info.response);
                    }
                    res.redirect("/payment/buynow")
                })  
            })
            .catch(err=>{
                console.log(err)
            })
            }
        });
    }

}

module.exports = new paymentController();
