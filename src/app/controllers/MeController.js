const Course=require('../models/Course');
const {mongooseToObject, mutipleMongooseToObject}=require('../../util/mongose');


class MeController{
    //GET/me/stored/courses
    storedCourses(req,res,next){
        Promise.all([Course.find({}).sortable(req), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                    auth: req.session.isAuthenticated,
                    role: req.session.role
                }),
            )
            .catch(next);

    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({}).sortable(req)
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                    auth: req.session.isAuthenticated,
                    role: req.session.role
                }),
            )
            .catch(next);
    }
}

module.exports=new MeController;