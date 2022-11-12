const Dg =require('../models/dg');
const {mongooseToObject, mutipleMongooseToObject}=require('../../util/mongose');
const Course =require('../models/Course');

class dg{
    
    //GET/dg/:id/create
    create(req,res,next){
         res.render('danhgia/dg',{
            auth: req.session.isAuthenticated,
            role: req.session.role
         })
   }

    
    //post/dg/in
    in(req,res,next){ 
        const dg=new Dg(req.body);
        dg.save()
            .then(()=>res.redirect('/',{
                auth: req.session.isAuthenticated,
            role: req.session.role
            }))    

         
    }

        //get/dg/see
        see(req,res,next){
            Dg.find({})
            .then((dgs) =>
                res.render('danhgia/show', {
                    dgs: mutipleMongooseToObject(dgs),
                    auth: req.session.isAuthenticated,
                    role: req.session.role
                }),
            )
            .catch(next);

    }
        

}

module.exports=new dg;