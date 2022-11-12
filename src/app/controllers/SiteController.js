
const Course=require('../models/Course');
const {mutipleMongooseToObject}=require('../../util/mongose');


class SiteController{
    //GET/  ->Home
    index(req,res,next){
        Course.find({})
            .then(courses=>{
                var quantity;
                var cart = req.session.cart;
                if (req.session.cart) {
                    quantity = cart.length;
                } else {
                    quantity = 0;
                }
                res.render('home',{
                    courses:mutipleMongooseToObject(courses),
                    auth: req.session.isAuthenticated,
                    role: req.session.role,
                    quantity
                });
            })
            .catch(next);
    }

    // /search (theo tên sản phẩm)
    
    search(req,res,next){
        // const k = req.body.key;
        const k = new RegExp(req.body.key, 'i');
       
        const co = Course.find({$or:[{name: k},{slug: k }]} )
        .then(co=>{    
            var quantity;
            var cart = req.session.cart;
            if (req.session.cart) {
                quantity = cart.length;
            } else {
                quantity = 0;
            }   
            res.render('search',{ 
                courses:mutipleMongooseToObject(co) ,
                auth: req.session.isAuthenticated,
                role: req.session.role,
                quantity
            });
            })
        .catch(next);
    }
    
    
    // search(req, res, next) {
    //     const search = new RegExp(req.body.key, 'i');
    //     Course.find({ name: search })
    //         .then(courses => {
    //             // var quantity;
    //             // var cart = req.session.cart;
    //             // if (req.session.cart) {
    //             //     quantity = cart.length;
    //             // } else {
    //             //     quantity = 0;
    //             // }
    //             res.render('search', {
    //                 courses: multipleMongooseToObject(courses),
    //                 // auth: req.session.isAuthenticated,
    //                 // quantity
    //             });
    //         })
    //         .catch(err => {
    //             res.status(500).send(err);
    //         })
    // }
    

}

module.exports=new SiteController;