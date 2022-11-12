class NewsController{
    //GET/news
    index(req,res){
        res.render('news',{
            auth: req.session.isAuthenticated,
            role: req.session.role,
        });
    }

    //GET/news/slug
    show(req,res){
        res.send("new detail",{
            // auth: req.session.isAuthenticated,
            // role: req.session.role,
        })
    }
}

module.exports=new NewsController;