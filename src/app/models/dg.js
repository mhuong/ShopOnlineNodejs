const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dgSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
    },
    id_courses: {
        type: Object,
        required: false
    }
},{
    timestamps:true,
});


const Dg = mongoose.model('dgs', dgSchema);
module.exports = Dg;