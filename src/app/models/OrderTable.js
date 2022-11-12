const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const courses = require('./users')
const ObjectId = Schema.Types.ObjectId
mongoose.plugin(slug);

const OrderTable = new Schema(
  {
    user: {type: ObjectId, require: true, ref: "users"},
    name: { type: String, require: true },
    address: { type: String, maxLength: 600 },
    email: { type: String, maxLength: 255 },
    phone: { type: String, maxLength: 255 },
    total: { type: Number },
    products: { type: Array},
    ordertotal: { type: Number},
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

OrderTable.query.sortable=function(req){
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
OrderTable.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});


module.exports=mongoose.model('ordertables',OrderTable); 
