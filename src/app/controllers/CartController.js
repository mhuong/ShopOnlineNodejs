const Course=require('../models/Course');
const {mongooseToObject}=require('../../util/mongose');
const Users = require('../models/users')



class CartController{
     //post/carts/:id
    addCart(req, res, next) {
        Course.findOne({ _id: req.params.id })
            .then(course => {
                if (typeof req.session.cart == 'undefined') {
                    req.session.cart = [];
                    req.session.cart.push({
                        qty: 1,
                        _id: course._id,
                        name: course.name,
                        price: course.gia,
                        image: course.image,
                        slug: course.slug,
                    });
                    console.log(req.session.cart[0]._id)
                } else {
                    var cart = req.session.cart;
                    var newItem = true;
                    for (var i = 0; i < cart.length; i++) {
                        if (cart[i].slug == course.slug) {
                            cart[i].qty++;
                            newItem = false;
                            break;
                        }
                    }
                    if (newItem) {
                        cart.push({
                            qty: 1,
                            _id: course._id,
                            name: course.name,
                            price: course.gia,
                            image: course.image,
                            slug: course.slug,
                        });
                    }
                }
                var arr =[]
                const user = Users.findOne({_id: req.session._id})
                .then(user=>{
                    arr = user.courses
                    for(var i=0; i < req.session.cart.length; i++){
                        arr.push(req.session.cart[i]._id)
                    }
                    console.log(arr)
                    const us = Users.findOneAndUpdate({
                        _id: req.session._id
                    },{
                        courses: arr
                    })
                    .then(
                        (us)=>{
                            console.log(us.courses)
                        }
                    )
                    .catch(err=>{
                        console.log(err)
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
                
                // res.render('carts', {
                //     cart: req.session.cart,
                //     name: req.session.cart.name,
                //     price: req.session.cart.price,
                //     image: req.session.cart.image,
                //     qty: req.session.cart.qty,
                //     slug: req.session.cart.slug
                // });
                res.redirect('/');
            })
            .catch(next);
    }


    showCart(req, res, next) {
        var status = "View products added to cart here"
        var quantity;
        var cart = req.session.cart;
        if (req.session.cart) {
            quantity = cart.length;
        } else {
            quantity = 0;
        }
        if (req.session.cart) {
            var sum = 0;
            var cart = req.session.cart;
            for (var i = 0; i < cart.length; i++) {
                sum += cart[i].price * cart[i].qty;
            }
            console.log(sum);
                console.log(cart[0].price);
            var total = sum;
            res.render('carts', {
                cart: req.session.cart,
                status,
                auth: req.session.isAuthenticated,
                total,
                quantity
            })
        } else {
            status = "Your cart is empty";
            res.render('carts', {
                status,
                auth: req.session.isAuthenticated,
                quantity
            })
        }
    }
    
    updateCart(req, res, next) {
        var status = "View products added to cart here"
        var slug = req.params.slug;
        var cart = req.session.cart;
        var action = req.query.action;

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].slug == slug) {
                switch (action) {
                    case "add":
                        cart[i].qty++;
                        break;
                    case "remove":
                        cart[i].qty--;
                        if (cart[i].qty < 1) {
                            cart.splice(i, 1);
                        }
                        if (cart.length == 0) {
                            delete req.session.cart;
                            status = "Your cart is empty";
                        }
                        break;
                    case "clear":
                        cart.splice(i, 1);
                        if (cart.length == 0) {
                            delete req.session.cart;
                            status = "Your cart is empty";
                        }
                        break;
                    default:
                        console.log('update problem');
                        break;
                }
                break;
            }
        }
        var sum = 0;
        for (var i = 0; i < cart.length; i++) {
            sum += cart[i].price * cart[i].qty;
        }
        var total = sum;
        console.log(sum);
        var quantity;
        var cart = req.session.cart;
        if (req.session.cart) {
            quantity = cart.length;
        } else {
            quantity = 0;
        }
        res.render('carts', {
            cart: req.session.cart,
            status,
            auth: req.session.isAuthenticated,
            total,
            quantity
        })
    }
    clear(req, res, next) {
        delete req.session.cart;
        res.redirect('courses');
    }
}

module.exports=new CartController;