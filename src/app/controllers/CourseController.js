const Course=require('../models/Course');
const {mongooseToObject}=require('../../util/mongose');



class CourseController{
    //GET/courses/:slug
    show(req,res,next){
        Course.findOne({slug:req.params.slug})
            .then(course=>{
                var quantity;
                var cart = req.session.cart;
                if (req.session.cart) {
                    quantity = cart.length;
                } else {
                    quantity = 0;
                }   
                res.render('courses/show',{
                    course:mongooseToObject(course),
                    quantity,
                    auth: req.session.isAuthenticated,
                    role: req.session.role
                });
            })
            .catch(next);
    }

    //GET/courses/create
    create(req,res,next){
        res.render('courses/create',{
            auth: req.session.isAuthenticated,
            role: req.session.role
        })
    }

    //post/courses/store
    store(req,res,next){
        //res.json(req.body)
        const course=new Course(req.body);
        course.save()
            .then(()=>res.redirect('/me/stored/courses'))
            .catch(error =>{
                
            });
    }

    //get/courses/:id/edit
    edit(req,res,next){
        Course.findById(req.params.id)
            .then(course=>res.render('courses/edit',{
                course:mongooseToObject(course),
                auth: req.session.isAuthenticated,
                role: req.session.role
            }))
            .catch(next);
    }

     //put/courses/:id
    update(req,res,next){
        // Course.updateOne({_id:req.params.id},req.body)
        //     .then(()=>res.redirect('/me/stored/courses'))
        //     .catch(next);
        Course.findOne({_id:req.params.id})
            .then(course=>{
                if(req.body.image ==''){
                    req.body.image == course.image;
                }
                Course.updateOne({_id:req.params.id},req.body)
                    .then(()=>res.redirect('/me/stored/courses'))
                    .catch(next);
            })
            
        }

    //delete/courses/:id
    destroy(req,res,next){
        Course.delete({ _id:req.params.id})
            .then(()=>res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //post/courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action){
            case 'delete':
                Course.delete({ _id:{$in:req.body.courseIds}})
                    .then(()=>res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message:'action is invalid'});
        }
    }

    //post/courses/handle-form-delete-actions
    handleFormDActions(req, res, next) {
        switch(req.body.action){
            case 'delete':
                Course.deleteOne({ _id:{$in:req.body.courseIds}})
                    .then(()=>res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id:{$in:req.body.courseIds}})
                    .then(()=>res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message:'action is invalid'});
        }
    }

}

module.exports=new CourseController;