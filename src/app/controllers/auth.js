const Users = require("../models/users");
const Course = require("../models/Course")
var bcrypt = require("bcrypt");
const { render } = require('express/lib/response');
const CourseController = require('./CourseController');
const nodemailer = require("nodemailer");
var randomstring = require("randomstring");

class authController{
    getLogin (req, res){
        console.log(req.session.cart)
        res.render('login',{
            quantity: req.session.cart[0].quantity,
            auth: req.session.isAuthenticated,
            role: req.session.role
        })
    }
    
    postLogin (req, res){
        const user = Users.findOne({
            username: req.body.username
        })
        .then(
            user => {
                if(!user){           
                    var status = "The username is not found"         
                    return res.render('login', {
                        status: status,
                        auth: req.session.isAuthenticated,
                        role: req.session.role
                    })
                }

                bcrypt.compare(req.body.password, user.password).then(
                    valid =>{
                        if(!valid){
                            var status = "The password is wrong"
                            return res.render('login', {
                                status: status,
                                auth: req.session.isAuthenticated,
                                role: req.session.role
                            })
                        }
                        var sess = req.session; 
                            sess.isAuthenticated = true;
                            sess._id = user._id;
                            sess.role = user.role;
                            sess.auth = user.auth;
                            req.session.save((err) => {
                                console.log(err);
                            })
                            res.redirect('/')
                    }
                ).catch(err=>{
                    res.status(500).send(err)
                })
            }
        ).catch(err=>{
            res.status(500).send(err)
        })
        
    }
    
    getLogout (req, res){
        req.session.destroy();
        res.redirect("/")
    }
        
    getSignUp (req, res){
        const email = req.query.email
        res.render('register',{
            email: email,
            auth: req.session.isAuthenticated,
            role: req.session.role
        })
    }

    postSignUp (req, res){
            const user = Users.findOne({ $or:[
                 {'username':req.body.username}, 
                 {'email':req.body.email}
            ]}).then(
                (user)=>{
                    if(user){
                        var status = "The username or email is already exists!"
                        res.render('register', {
                            status: status,
                            auth: req.session.isAuthenticated,
                            role: req.session.role
                        })       
                    }else{
                        bcrypt.hash(req.body.password, 10).then(
                            (hash) => {
                                const user = new Users({
                                username: req.body.username,
                                email: req.body.email,
                                password: hash
                                });
                                user.save().then(
                                () => {
                                    var sess = req.session; 
                                        sess.isAuthenticated = true;
                                        sess.role = user.role;
                                        sess._id = user._id;
                                        sess.auth = user.auth;
                                        req.session.save((err) => {
                                            console.log(err);
                                        })
                                    res.redirect('/users/verify-email')
                                }
                                ).catch(
                                (error) => {
                                    res.status(500).json({
                                    error: error
                                    });
                                }
                                );
                            }
                            );
                        }
                }
            )
    }
    getVerifyEmail (req, res, next) {
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
            user: "info.haihuynh@gmail.com",
            pass: "sgraajknpklqknwk"
            }
        });
        Users.findOne({ _id: req.session._id })
        .then(user => {
            var verification_token = randomstring.generate({
            length: 10
            });
            var mainOptions = {
            from: "Website",
            to: user.email,
            subject: "Website",
            text: "text ne",
            html:
                "<p>Cảm ơn đã đăng kí tài khoản của Website. Mã kích hoạt của bạn là:</p>" +
                verification_token
            };
            transporter.sendMail(mainOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Sent:" + info.response);
            }
            });
            user.verify_token = verification_token;
            user.save();
            let email = user.email
            res.render('verify-email', {
                email: email,
                auth: req.session.isAuthenticated,
                role: req.session.role
            })
        });
        
    }
    postVerifyEmail (req, res) {
        const token = req.body.token;
        Users.findOne({ _id: req.session._id }, (err, user) => {
            if (token == user.verify_token) {
            user.auth = true;
            user.save();
            req.session.auth = user.auth;
            return res.redirect("/")
            } else if (token != user.verify_token) {
            return res.render("verify-email", {
                message: "The token is wrong, pleasure check the mail again.",
                auth: req.session.isAuthenticated,
                role: req.session.role
            });
            }
        });
    }
    getChangePass (req, res) {
        res.render('change-password',{
            auth: req.session.isAuthenticated,
            role: req.session.role
        })
    }
    postChangePass (req, res){
        Users.findOne({_id: req.session._id}).then(
            user=>{
                bcrypt.compare(req.body.password1, user.password).then(
                    valid =>{
                        if(!valid){
                            var status = "The password is wrong"
                            return res.render('change-password', {
                                status: status,
                                auth: req.session.isAuthenticated,
                                role: req.session.role
                            })
                        }
                        bcrypt.hash(req.body.password2, 10).then(
                            (hash) => {
                                const user = Users.findOneAndUpdate({
                                    _id: req.session._id
                                },{
                                    password: hash
                                },{
                                    new: true
                                  }).then(
                                    () => {   
                                        res.render("home", {
                                            auth: req.session.isAuthenticated,
                                            role: req.session.role
                                        })
                                    }
                                  ).catch(
                                    (error) => {
                                        console.log(error)
                                        res.status(500).json({
                                        error: error
                                        });
                                    }
                                    )
                            }).catch(
                                    (error) => {
                                        console.log(error)
                                        res.status(500).json({
                                        error: error
                                        });
                                    }
                                )
                    }
                )
            }
        )   
    }
    getInfo(req, res){
        const user = Users.findOne({_id: req.session._id})
        .lean()
        .then(user=>{
            console.log(user)
            res.render('info', {
                user: user,
                auth: req.session.isAuthenticated,
                role: req.session.role
            })
        })
    }
    getUpdate (req, res){
        const user = Users.findOne({_id: req.session._id})
        .lean()
        .then(user=>{
            res.render("update-info", {
                user: user,
                auth: req.session.isAuthenticated,
                role: req.session.role
            })
        })
        
    }
    postUpdate (req, res){
        const user = Users.findOneAndUpdate({
            _id: req.session._id
        },{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            description: req.body.description,
            email: req.body.email
        },{
            new: true
          }).then(
            () => {   
                res.redirect("/users/info")
            }
          ).catch(
            (error) => {
                console.log(error)
                res.status(500).json({
                error: error
                });
            }
            )
    }
    getResetPass (req, res){
        res.render("forgot-password",{
            status:"Enter your email to reset password.",
            auth: req.session.isAuthenticated,
            role: req.session.role
        })
    }
    postResetPass (req, res){
        const email = req.body.email;
        Users.findOne({ email: email }, (err, user) => {
            if (!user) {
            return res.redirect("/users/forgot-password");
            } else {
            var transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                user: "info.haihuynh@gmail.com",
                pass: "sgraajknpklqknwk"
                }
            });
            var tpass = randomstring.generate({
                length: 6
            });
            var mainOptions = {
                from: "Crepp so gud",
                to: email,
                subject: "Website",
                text: "text ne",
                html: "<p>Mật khẩu mới của bạn là:</p>" + tpass
            };
            transporter.sendMail(mainOptions, (err, info) => {
                if (err) {
                console.log(err);
                } else {
                console.log("Sent:" + info.response);
                }
            });
            bcrypt.hash(tpass, 10).then(hashPassword => {
                user.password = hashPassword;
                user.save();
            });
            res.render("login", {
                status: "Reset password success! Login now",
                auth: req.session.isAuthenticated,
                    role: req.session.role,
            });
            }
        });
    }
    getMyProducts (req, res){
        const user = Users.findOne({
            _id: req.session._id
        })
        .lean()
        .populate('courses')
        .then(
            (user)=>{
                res.render('my-products', {
                    auth: req.session.isAuthenticated,
                    role: req.session.role,
                    courses: user.courses
                })
            }
        )
        .catch(err=>{
            console.log(err)
        })
        
    }
    getList (req, res){
        const user = Users.find({})
        .lean()
        .then(
            (user)=>{
                res.render('list', {
                    auth: req.session.isAuthenticated,
                    role: req.session.role,
                    users: user
                })
            }
        )
        .catch(err=>{
            console.log(err)
        })
        
    }
    getDelete (req, res){
        Users.findOneAndDelete({_id: req.params.id})
        .lean()
        .then( ()=>{
            const user = Users.find({})
            .lean()
            .then(
                (user)=>{

                    res.render('list', {
                        auth: req.session.isAuthenticated,
                        role: req.session.role,
                        users: user
                    })
                }
            )
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
        
    }
    getContact (req, res){
        res.render("contact",{
            auth: req.session.isAuthenticated,
            role: req.session.role
        })
    }
    postContact (req, res, next){
        const email = req.body.email;
        console.log(req.body.email)
        const text = req.body.text;
        Users.findOne({ email: email }, (err, user) => {
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
            var mainOptions = {
                from: "Crepp so gud",
                to: "info.haihuynh@gmail.com",
                subject: "Contact",
                text: "text ne",
                html: "<p>Tin nhắn từ: </p>" + email + "<br> <p>Nội dung: <p>" + text

            };
            transporter.sendMail(mainOptions, (err, info) => {
                if (err) {
                console.log(err);
                } else {
                console.log("Sent:" + info.response);
                }
            });
            res.render("home", {
                auth: req.session.isAuthenticated,
                role: req.session.role,
            });
            }
        });
    }
}

module.exports=new authController;

