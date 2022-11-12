
class Auth{
    emailVerify (req, res, next) {
        console.log(req.session.auth)
        if (req.session.auth) {
            next();
        }else{
            res.render('verify-email', {
                message: "You need to verify your email",
                auth: req.session.isAuthenticated,
                role: req.session.role
            })
        }
    };
    notLogin(req, res, next){
        if(req.session.isAuthenticated){
            next();
        }else{
            var status = "You need to login first"
            res.render('login', {
                status: status,
                auth: req.session.isAuthenticated,
                role: req.session.role
            });
        }
    }
    isLogin (req, res, next){
        if(req.session.isAuthenticated){
            res.render('home', {
                auth: req.session.isAuthenticated,
                role: req.session.role
            });
        }else{
            next()   
        }
    }
    isAdmin (req, res, next){
        if(req.sesson.role){
            next()
        }else{
            res.render('back',{
                status: "You aren't admin",
                auth: req.session.isAuthenticated,
                role: req.session.role
            });
            
        }
    }
}


module.exports = new Auth;