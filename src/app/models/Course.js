const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");



mongoose.plugin(slug);

const Course = new Schema(
  {
    name: { type: String, require: true },
    decription: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    gia: { type: Number},
    total: { type: Number},
    pricenow: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name"},
  },
  {
    timestamps: true,
  }
);

//custem query helpers
Course.query.sortable=function(req){
  if(req.query.hasOwnProperty('_sort')){
    const isValidtype=['asc','desc'].includes(req.query.type);
    return this.sort({
        [req.query.column]:isValidtype?req.query.type:'desc',
  });
  }
  return this;
}


// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});


module.exports=mongoose.model('courses',Course); 

